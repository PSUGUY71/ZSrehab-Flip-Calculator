/**
 * Prorations Calculator
 * Handles day count methods, buyer/seller splits, HUD-style accounting
 */

import {
  TaxLineInput,
  ProrationsProfile,
  DayCountMethod,
  ClosingDayOwner,
  ProrationsResult,
  ProratedLineItem,
} from "./types";
import { parseISODate, roundMoney } from "./validators";

/**
 * Calculate prorations for tax and HOA lines
 */
export function calculateProrations(
  lines: TaxLineInput[],
  profile: ProrationsProfile
): ProrationsResult {
  const proratedItems: ProratedLineItem[] = [];
  let totalProrated = 0;

  for (const line of lines) {
    const item = prorateAmount(line, profile);
    proratedItems.push(item);
    totalProrated += item.buyer_share + item.seller_share;
  }

  return {
    line_items: proratedItems,
    total_prorated: totalProrated,
  };
}

/**
 * Prorate a single amount (property tax, HOA, etc.)
 */
export function prorateAmount(
  line: TaxLineInput,
  profile: ProrationsProfile
): ProratedLineItem {
  const closingDate = parseISODate(line.closing_date);
  const periodStart = parseISODate(line.period_start);
  const periodEnd = parseISODate(line.period_end);

  // Calculate days in period
  const daysInPeriod = calculateDaysInPeriod(
    periodStart,
    periodEnd,
    profile.day_count_method
  );

  // Daily rate
  const dailyRate = line.amount / daysInPeriod;

  // Calculate buyer and seller days
  const { buyerDays, sellerDays } = calculateBuyerSellerDays(
    periodStart,
    closingDate,
    daysInPeriod,
    profile.closing_day_owner,
    profile.day_count_method
  );

  // Calculate shares
  const buyerShare = dailyRate * buyerDays;
  const sellerShare = dailyRate * sellerDays;

  // Apply rounding
  const roundedBuyerShare = roundMoney(buyerShare, profile.rounding);
  const roundedSellerShare = roundMoney(sellerShare, profile.rounding);

  // Determine HUD treatment (debit/credit based on payment status)
  let buyerIsDebited = false;
  let sellerIsDebited = false;

  if (line.payment_status === "paid") {
    // Seller paid the bill in advance
    // Buyer reimburses seller for buyer's share (HUD: buyer debit, seller credit)
    buyerIsDebited = true;
    sellerIsDebited = false;
  } else if (line.payment_status === "unpaid") {
    // Bill will be paid after closing (typically by new buyer)
    // Seller reimburses buyer for seller's share (HUD: seller debit, buyer credit)
    buyerIsDebited = false;
    sellerIsDebited = true;
  } else {
    // "unknown" - use config default
    buyerIsDebited =
      profile.default_proration_style === "paid_in_advance_common";
    sellerIsDebited =
      profile.default_proration_style === "arrears_common";
  }

  return {
    description: line.description,
    original_amount: line.amount,
    buyer_share: roundedBuyerShare,
    seller_share: roundedSellerShare,
    buyer_is_debited: buyerIsDebited,
    seller_is_debited: sellerIsDebited,
  };
}

/**
 * Calculate number of days between two dates using specified method
 */
export function calculateDaysInPeriod(
  start: Date,
  end: Date,
  method: DayCountMethod
): number {
  if (method === "actual_365") {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((end.getTime() - start.getTime()) / msPerDay);
  }

  if (method === "actual_360") {
    const msPerDay = 1000 * 60 * 60 * 24;
    const actualDays = Math.floor((end.getTime() - start.getTime()) / msPerDay);
    return actualDays;
  }

  if (method === "30_360") {
    // 30/360 method (American): each month is 30 days, year is 360 days
    return calculateDays30_360(start, end);
  }

  return 365; // fallback
}

/**
 * Calculate buyer and seller days
 */
export function calculateBuyerSellerDays(
  periodStart: Date,
  closingDate: Date,
  totalDays: number,
  closingDayOwner: ClosingDayOwner,
  method: DayCountMethod
): { buyerDays: number; sellerDays: number } {
  let buyerDays = 0;

  if (closingDayOwner === "buyer") {
    // Buyer owns the closing day
    buyerDays = calculateDaysInPeriod(periodStart, closingDate, method) + 1;
  } else {
    // Seller owns the closing day
    buyerDays = calculateDaysInPeriod(periodStart, closingDate, method);
  }

  const sellerDays = totalDays - buyerDays;

  return { buyerDays, sellerDays };
}

/**
 * 30/360 day count method
 * Used in commercial real estate
 */
export function calculateDays30_360(start: Date, end: Date): number {
  let startDay = start.getDate();
  let startMonth = start.getMonth() + 1; // JS months are 0-11
  let startYear = start.getFullYear();

  let endDay = end.getDate();
  let endMonth = end.getMonth() + 1;
  let endYear = end.getFullYear();

  // Adjust for end of month
  if (endDay === 31 && startDay >= 30) {
    endDay = 30;
  }

  if (startDay === 31) {
    startDay = 30;
  }

  const days =
    (endYear - startYear) * 360 +
    (endMonth - startMonth) * 30 +
    (endDay - startDay);

  return Math.max(days, 0);
}

/**
 * Allocate prorated amounts to buyer and seller
 */
export function allocateProratedAmounts(
  items: ProratedLineItem[]
): { buyer_debits: number; buyer_credits: number; seller_debits: number; seller_credits: number } {
  let buyerDebits = 0;
  let buyerCredits = 0;
  let sellerDebits = 0;
  let sellerCredits = 0;

  for (const item of items) {
    if (item.buyer_is_debited) {
      buyerDebits += item.buyer_share;
    } else {
      buyerCredits += item.buyer_share;
    }

    if (item.seller_is_debited) {
      sellerDebits += item.seller_share;
    } else {
      sellerCredits += item.seller_share;
    }
  }

  return { buyer_debits: buyerDebits, buyer_credits: buyerCredits, seller_debits: sellerDebits, seller_credits: sellerCredits };
}

/**
 * Format prorations for display
 */
export function formatProrationsBreakdown(items: ProratedLineItem[]): string[] {
  const lines: string[] = [];

  for (const item of items) {
    lines.push(`${item.description}:`);
    lines.push(`  Original: $${item.original_amount.toFixed(2)}`);
    lines.push(`  Buyer: $${item.buyer_share.toFixed(2)}`);
    lines.push(`  Seller: $${item.seller_share.toFixed(2)}`);
  }

  return lines;
}
