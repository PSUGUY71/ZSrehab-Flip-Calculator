/**
 * Proration engine for taxes, HOA, and other recurring charges
 */

import { TaxLine, ProrationProfile, LineItem } from './types';
import { parseISODate, roundMoney } from './validation';

export interface ProratedAmount {
  total: number;
  buyer_share: number;
  seller_share: number;
  buyer_days: number;
  seller_days: number;
  daily_rate: number;
}

/**
 * Calculate prorated amount for a tax or HOA line
 */
export function prorateAmount(
  line: TaxLine,
  closing_date: string,
  profile: ProrationProfile
): ProratedAmount {
  const closing = parseISODate(closing_date);
  const period_start = parseISODate(line.period_start);
  const period_end = parseISODate(line.period_end);
  
  // Calculate days in period
  const days_in_period = calculateDaysInPeriod(period_start, period_end, profile.day_count);
  
  // Calculate daily rate
  const daily_rate = line.amount / days_in_period;
  
  // Calculate buyer and seller days
  const { buyer_days, seller_days } = calculateBuyerSellerDays(
    period_start,
    period_end,
    closing,
    profile.closing_day_owner,
    profile.day_count
  );
  
  // Calculate shares
  const buyer_share = daily_rate * buyer_days;
  const seller_share = line.amount - buyer_share;
  
  return {
    total: line.amount,
    buyer_share: roundMoney(buyer_share, profile.rounding),
    seller_share: roundMoney(seller_share, profile.rounding),
    buyer_days,
    seller_days,
    daily_rate: roundMoney(daily_rate, profile.rounding),
  };
}

/**
 * Calculate days in period based on day count method
 */
export function calculateDaysInPeriod(
  start: Date,
  end: Date,
  day_count: 'actual_365' | 'actual_360' | '30_360'
): number {
  if (day_count === 'actual_365' || day_count === 'actual_360') {
    // Actual days between dates
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  }
  
  if (day_count === '30_360') {
    // 30/360 method (each month = 30 days)
    const start_day = Math.min(start.getDate(), 30);
    const end_day = Math.min(end.getDate(), 30);
    
    const start_month = start.getMonth();
    const start_year = start.getFullYear();
    
    const end_month = end.getMonth();
    const end_year = end.getFullYear();
    
    const day_diff = end_day - start_day;
    const month_diff = end_month - start_month;
    const year_diff = end_year - start_year;
    
    return year_diff * 360 + month_diff * 30 + day_diff;
  }
  
  return 0;
}

/**
 * Calculate how many days buyer and seller each own property
 */
export function calculateBuyerSellerDays(
  period_start: Date,
  period_end: Date,
  closing_date: Date,
  closing_day_owner: 'buyer' | 'seller',
  day_count: 'actual_365' | 'actual_360' | '30_360'
): { buyer_days: number; seller_days: number } {
  const total_days = calculateDaysInPeriod(period_start, period_end, day_count);
  
  // How many days from period start to closing (inclusive of closing day)
  const days_to_closing = calculateDaysInPeriod(period_start, closing_date, day_count);
  
  // Determine who owns closing day
  if (closing_day_owner === 'buyer') {
    // Buyer owns closing day
    return {
      buyer_days: Math.max(0, days_to_closing + 1),
      seller_days: Math.max(0, total_days - days_to_closing - 1),
    };
  } else {
    // Seller owns closing day
    return {
      buyer_days: Math.max(0, days_to_closing),
      seller_days: Math.max(0, total_days - days_to_closing),
    };
  }
}

/**
 * Create line items from prorated amounts (HUD-style)
 */
export function createProratedLineItems(
  tax_lines: TaxLine[] | undefined,
  closing_date: string,
  profile: ProrationProfile
): LineItem[] {
  if (!tax_lines || tax_lines.length === 0) {
    return [];
  }
  
  const items: LineItem[] = [];
  
  for (let i = 0; i < tax_lines.length; i++) {
    const line = tax_lines[i];
    const prorated = prorateAmount(line, closing_date, profile);
    
    // Determine HUD treatment based on payment status
    const { buyer_debit, buyer_credit, seller_debit, seller_credit } = determineHUDTreatment(
      line,
      prorated,
      profile
    );
    
    items.push({
      id: `proration_${i}`,
      category: 'Prorations',
      description: line.description,
      buyer_debit,
      buyer_credit,
      seller_debit,
      seller_credit,
      notes: `${prorated.buyer_days} buyer days, ${prorated.seller_days} seller days @ $${prorated.daily_rate.toFixed(2)}/day`,
    });
  }
  
  return items;
}

interface HUDTreatment {
  buyer_debit: number;
  buyer_credit: number;
  seller_debit: number;
  seller_credit: number;
}

/**
 * Determine HUD-style debit/credit treatment
 */
function determineHUDTreatment(
  line: TaxLine,
  prorated: ProratedAmount,
  profile: ProrationProfile
): HUDTreatment {
  let payment_status = line.payment_status;
  
  // Use default if unknown
  if (payment_status === 'unknown') {
    payment_status = profile.default_proration_style === 'paid_in_advance_common' ? 'paid' : 'unpaid';
  }
  
  if (payment_status === 'paid') {
    // Bill was paid in advance by seller
    // Buyer debits seller's share, seller credits back
    return {
      buyer_debit: prorated.seller_share,
      buyer_credit: 0,
      seller_debit: 0,
      seller_credit: prorated.buyer_share,
    };
  } else {
    // Bill unpaid, buyer will pay later
    // Seller debits buyer's share, buyer credits back
    return {
      buyer_debit: 0,
      buyer_credit: prorated.seller_share,
      seller_debit: prorated.buyer_share,
      seller_credit: 0,
    };
  }
}
