/**
 * Core calculation modules
 */

import {
  TransferTaxConfig,
  BracketTable,
  DealInput,
  LineItem,
  FeeConfig,
  RecordingProfile,
  TitleProfile,
  SettlementProfile,
} from './types';
import { roundMoney } from './validation';

// ============================================================================
// TRANSFER TAXES
// ============================================================================

export interface TaxAllocation {
  total: number;
  buyer_share: number;
  seller_share: number;
}

/**
 * Calculate transfer tax based on configuration and deal inputs
 */
export function calculateTransferTax(
  config: TransferTaxConfig,
  deal: DealInput,
  index: number
): LineItem {
  const id = `tax_${index}`;
  
  // Determine base amount
  const base_amount = getBaseAmount(config.base_type, deal);
  
  // Calculate tax total
  let tax_total = 0;
  
  if (config.calc_type === 'percent' && config.rate !== undefined) {
    tax_total = base_amount * config.rate;
  } else if (config.calc_type === 'flat' && config.flat_amount !== undefined) {
    tax_total = config.flat_amount;
  } else if (config.calc_type === 'tiered_brackets' && config.brackets) {
    tax_total = calculateBracketPremium(base_amount, config.brackets);
  }
  
  // Allocate to buyer/seller
  const allocation = allocateTax(tax_total, config.payer_default, config.split_buyer_pct, config.split_seller_pct);
  
  return {
    id,
    category: 'Transfer Taxes',
    description: config.description,
    buyer_debit: allocation.buyer_share,
    buyer_credit: 0,
    seller_debit: allocation.seller_share,
    seller_credit: 0,
    notes: `Base: ${config.base_type}, Method: ${config.calc_type}`,
  };
}

/**
 * Get base amount for tax calculation
 */
function getBaseAmount(base_type: string, deal: DealInput): number {
  switch (base_type) {
    case 'price':
      return deal.purchase_price;
    case 'loan':
      return deal.loan_amount;
    case 'deed':
      return deal.purchase_price; // Deed tax typically on sale price
    case 'mortgage':
      return deal.loan_amount; // Mortgage tax on loan amount
    default:
      return deal.purchase_price;
  }
}

/**
 * Calculate premium using tiered brackets
 * Iterates brackets in order, applying rate only to portion in each bracket
 */
export function calculateBracketPremium(amount: number, brackets: BracketTable): number {
  let total = 0;
  
  for (const bracket of brackets.brackets) {
    // Determine portion of amount in this bracket
    const bracket_min = bracket.min_inclusive;
    const bracket_max = bracket.max_inclusive;
    
    let portion_in_bracket = 0;
    
    if (amount <= bracket_min) {
      // Amount doesn't reach this bracket
      portion_in_bracket = 0;
    } else if (bracket_max === null) {
      // Unlimited bracket
      portion_in_bracket = Math.max(0, amount - bracket_min);
    } else if (amount <= bracket_max) {
      // Amount is within this bracket
      portion_in_bracket = Math.max(0, amount - bracket_min);
    } else {
      // Amount exceeds this bracket
      portion_in_bracket = bracket_max - bracket_min;
    }
    
    total += portion_in_bracket * bracket.rate;
  }
  
  return total;
}

/**
 * Allocate tax to buyer and seller based on payer rule
 */
function allocateTax(
  total: number,
  payer_default: string,
  split_buyer_pct?: number,
  split_seller_pct?: number
): TaxAllocation {
  if (payer_default === 'buyer') {
    return { total, buyer_share: total, seller_share: 0 };
  } else if (payer_default === 'seller') {
    return { total, buyer_share: 0, seller_share: total };
  } else if (payer_default === 'split' && split_buyer_pct !== undefined && split_seller_pct !== undefined) {
    const buyer_share = total * (split_buyer_pct / 100);
    const seller_share = total - buyer_share;
    return { total, buyer_share, seller_share };
  }
  
  // Default to seller
  return { total, buyer_share: 0, seller_share: total };
}

// ============================================================================
// RECORDING FEES
// ============================================================================

export function calculateRecordingFees(
  profile: RecordingProfile,
  deal: DealInput
): LineItem[] {
  const items: LineItem[] = [];
  
  // Deed recording
  if (profile.deed_recording) {
    const deed_fee = calculateDocumentFee(
      profile.deed_recording,
      deal.docs.deed_docs_count,
      deal.docs.deed_pages,
      'Deed Recording'
    );
    items.push({
      id: 'recording_deed',
      category: 'Recording Fees',
      description: 'Deed Recording',
      buyer_debit: 0,
      buyer_credit: 0,
      seller_debit: deed_fee,
      seller_credit: 0,
    });
  }
  
  // Mortgage recording
  if (profile.mortgage_recording) {
    const mortgage_fee = calculateDocumentFee(
      profile.mortgage_recording,
      deal.docs.mortgage_docs_count,
      deal.docs.mortgage_pages,
      'Mortgage Recording'
    );
    items.push({
      id: 'recording_mortgage',
      category: 'Recording Fees',
      description: 'Mortgage Recording',
      buyer_debit: 0,
      buyer_credit: 0,
      seller_debit: mortgage_fee,
      seller_credit: 0,
    });
  }
  
  // Ancillary docs
  if (deal.docs.ancillary && profile.ancillary_recording) {
    for (const anc_doc of deal.docs.ancillary) {
      const schedule = profile.ancillary_recording[anc_doc.name];
      if (schedule) {
        const fee = calculateDocumentFee(
          schedule,
          anc_doc.doc_count,
          anc_doc.page_count,
          anc_doc.name
        );
        items.push({
          id: `recording_${anc_doc.name}`,
          category: 'Recording Fees',
          description: `${anc_doc.name} Recording`,
          buyer_debit: 0,
          buyer_credit: 0,
          seller_debit: fee,
          seller_credit: 0,
        });
      }
    }
  }
  
  return items;
}

export interface FeeSchedule {
  per_document_fee: number;
  per_page_fee: number;
  tiers?: FeeTier[];
}

export interface FeeTier {
  pages_min: number;
  pages_max: number | null;
  per_page_override?: number;
  flat_override?: number;
}

/**
 * Calculate fee for a document type
 */
function calculateDocumentFee(
  schedule: FeeSchedule,
  doc_count: number,
  page_count: number,
  description: string
): number {
  // Check if tiered pricing applies
  if (schedule.tiers && schedule.tiers.length > 0) {
    for (const tier of schedule.tiers) {
      if (page_count >= tier.pages_min && (tier.pages_max === null || page_count <= tier.pages_max)) {
        if (tier.flat_override !== undefined) {
          return tier.flat_override * doc_count;
        }
        if (tier.per_page_override !== undefined) {
          return doc_count * schedule.per_document_fee + page_count * tier.per_page_override;
        }
      }
    }
  }
  
  // Standard pricing
  return doc_count * schedule.per_document_fee + page_count * schedule.per_page_fee;
}

// ============================================================================
// TITLE INSURANCE
// ============================================================================

export function calculateTitleInsurance(
  profile: TitleProfile,
  deal: DealInput
): LineItem[] {
  const items: LineItem[] = [];
  
  // Lender policy
  const lender_premium = calculateTitlePremium(profile.lender_policy, deal, false);
  items.push({
    id: 'title_lender_policy',
    category: 'Title Insurance',
    description: 'Lender Title Insurance Policy',
    buyer_debit: 0,
    buyer_credit: 0,
    seller_debit: lender_premium,
    seller_credit: 0,
  });
  
  // Owner policy (if selected)
  if (deal.selections.owner_policy && profile.owner_policy) {
    let owner_premium = calculateTitlePremium(profile.owner_policy, deal, true);
    
    // Apply simultaneous issue discount if applicable
    if (profile.simultaneous_issue_discount?.applies) {
      owner_premium = owner_premium * (1 - profile.simultaneous_issue_discount.discount_pct / 100);
    }
    
    items.push({
      id: 'title_owner_policy',
      category: 'Title Insurance',
      description: 'Owner Title Insurance Policy',
      buyer_debit: owner_premium,
      buyer_credit: 0,
      seller_debit: 0,
      seller_credit: 0,
    });
  }
  
  // Endorsements
  if (deal.selections.endorsements && deal.selections.endorsements.length > 0 && profile.endorsements) {
    for (const endorsement of deal.selections.endorsements) {
      const cost = profile.endorsements[endorsement] || 0;
      if (cost > 0) {
        items.push({
          id: `title_endorsement_${endorsement}`,
          category: 'Title Insurance',
          description: `Endorsement: ${endorsement}`,
          buyer_debit: 0,
          buyer_credit: 0,
          seller_debit: cost,
          seller_credit: 0,
        });
      }
    }
  }
  
  // CPL
  if (deal.selections.cpl && profile.cpl) {
    items.push({
      id: 'title_cpl',
      category: 'Title Insurance',
      description: 'Closing Protection Letter (CPL)',
      buyer_debit: profile.cpl,
      buyer_credit: 0,
      seller_debit: 0,
      seller_credit: 0,
    });
  }
  
  return items;
}

interface TitlePolicyConfig {
  base_on: 'loan_amount' | 'purchase_price';
  percent?: number;
  flat?: number;
  rate_table?: any;
}

function calculateTitlePremium(config: TitlePolicyConfig, deal: DealInput, is_owner: boolean): number {
  const base_amount = config.base_on === 'loan_amount' ? deal.loan_amount : deal.purchase_price;
  
  if (config.percent !== undefined) {
    return base_amount * config.percent;
  }
  
  if (config.flat !== undefined) {
    return config.flat;
  }
  
  if (config.rate_table) {
    for (const entry of config.rate_table.entries) {
      if (base_amount >= entry.loan_min && (entry.loan_max === null || base_amount <= entry.loan_max)) {
        if (entry.flat !== undefined) return entry.flat;
        if (entry.rate !== undefined) return base_amount * entry.rate;
      }
    }
  }
  
  return 0;
}

// ============================================================================
// SETTLEMENT AND FLAT FEES
// ============================================================================

export function calculateSettlementFees(
  profile: SettlementProfile | undefined,
  fee_overrides: Record<string, number> | undefined
): LineItem[] {
  const items: LineItem[] = [];
  
  const fees_to_process: Record<string, FeeConfig> = {};
  
  // Start with profile defaults
  if (profile) {
    for (const [key, config] of Object.entries(profile)) {
      if (config && typeof config === 'object' && 'amount' in config) {
        fees_to_process[key] = config as FeeConfig;
      }
    }
  }
  
  // Apply overrides
  if (fee_overrides) {
    for (const [key, amount] of Object.entries(fee_overrides)) {
      if (fees_to_process[key]) {
        fees_to_process[key].amount = amount;
      } else {
        fees_to_process[key] = {
          amount,
          payer: 'seller',
        };
      }
    }
  }
  
  // Create line items
  for (const [fee_key, config] of Object.entries(fees_to_process)) {
    const allocation = allocateFee(config.amount, config.payer, config.split_buyer_pct, config.split_seller_pct);
    
    items.push({
      id: `fee_${fee_key}`,
      category: 'Settlement & Attorney Fees',
      description: formatFeeDescription(fee_key),
      buyer_debit: allocation.buyer_debit,
      buyer_credit: 0,
      seller_debit: allocation.seller_debit,
      seller_credit: 0,
    });
  }
  
  return items;
}

function allocateFee(
  amount: number,
  payer: string,
  split_buyer_pct?: number,
  split_seller_pct?: number
): { buyer_debit: number; seller_debit: number } {
  if (payer === 'buyer') {
    return { buyer_debit: amount, seller_debit: 0 };
  } else if (payer === 'split' && split_buyer_pct !== undefined && split_seller_pct !== undefined) {
    return {
      buyer_debit: amount * (split_buyer_pct / 100),
      seller_debit: amount * (split_seller_pct / 100),
    };
  }
  
  // Default to seller
  return { buyer_debit: 0, seller_debit: amount };
}

function formatFeeDescription(fee_key: string): string {
  return fee_key
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
