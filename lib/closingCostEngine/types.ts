/**
 * Core TypeScript types for the Closing Cost Engine
 * Zero external dependencies, full type safety
 */

// ============================================================================
// INPUT TYPES
// ============================================================================

/**
 * Main input for closing cost calculation
 */
export interface DealInput {
  property: {
    state: string;
    county?: string;
    city?: string;
    zip?: string;
  };
  purchase_price: number;
  loan_amount: number;
  closing_date: string; // ISO 8601: "2026-02-15"
  docs: {
    deed_docs_count: number;
    deed_pages: number;
    mortgage_docs_count: number;
    mortgage_pages: number;
    ancillary: AncillaryDoc[];
  };
  selections: {
    owner_policy: boolean;
    endorsements: string[]; // e.g., ["survey", "septic"]
    cpl_fee: boolean;
  };
  flat_fee_overrides?: {
    settlement_fee?: number;
    attorney_fee?: number;
    notary?: number;
    wire?: number;
    courier?: number;
    payoff_statement_fee?: number;
  };
  tax_lines: TaxLineInput[];
  hoa_lines?: TaxLineInput[];
}

export interface AncillaryDoc {
  doc_type: string; // e.g., "assignment", "affidavit"
  count: number;
  pages: number;
}

export interface TaxLineInput {
  description: string; // e.g., "Property Taxes"
  amount: number;
  period_start: string; // ISO 8601
  period_end: string; // ISO 8601
  closing_date: string; // ISO 8601
  payment_status: "paid" | "unpaid" | "unknown";
  payer_of_bill: "seller" | "buyer" | "unknown";
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Complete jurisdiction profile (state, county, city, or zip level)
 */
export interface JurisdictionProfile {
  state: string;
  county?: string;
  city?: string;
  zip?: string;
  transfer_taxes: TransferTaxItem[];
  recording_fees: RecordingProfile;
  title_insurance: TitleProfile;
  settlement_fees: SettlementFeesProfile;
  prorations: ProrationsProfile;
}

/**
 * Single transfer tax item (can stack multiple per jurisdiction)
 */
export interface TransferTaxItem {
  name: string;
  description: string;
  base_type: "price" | "loan" | "deed" | "mortgage";
  calc_type: "percent" | "flat" | "tiered_brackets";
  payer_default: "buyer" | "seller" | "split";
  split_buyer_pct?: number; // if payer_default === "split"
  split_seller_pct?: number; // if payer_default === "split"
  rate?: number; // for percent (e.g., 1.0 for 1%)
  flat_amount?: number; // for flat calculation
  brackets?: BracketTable[]; // for tiered_brackets
  exemptions?: ExemptionRule[];
  enabled: boolean; // allow disabling a tax
}

export interface BracketTable {
  min_inclusive: number;
  max_inclusive: number | null; // null means no upper limit
  rate: number; // as percentage (e.g., 0.5 for 0.5%)
}

export interface ExemptionRule {
  condition: string; // e.g., "new_construction"
  description: string;
}

export interface RecordingProfile {
  deed: RecordingFeeStructure;
  mortgage: RecordingFeeStructure;
  ancillary?: Record<string, RecordingFeeStructure>;
}

export interface RecordingFeeStructure {
  per_document_fee: number;
  per_page_fee: number;
}

export interface TitleProfile {
  lender_policy_rate: number; // percent of loan amount (e.g., 0.5 for 0.5%)
  owner_policy_rate: number; // percent of purchase price
  simultaneous_issue_discount: number; // e.g., 0.25 for 25% off
  endorsements?: Record<string, number>; // flat fee per endorsement type
  cpl_fee: number; // flat fee
}

export interface SettlementFeesProfile {
  settlement_fee?: number;
  attorney_fee?: number;
  notary?: number;
  wire?: number;
  courier?: number;
  payoff_statement_fee?: number;
  title_search?: number;
  title_examination?: number;
}

export interface ProrationsProfile {
  day_count_method: "actual_365" | "actual_360" | "30_360";
  closing_day_owner: "buyer" | "seller";
  rounding: "cents" | "whole_dollars";
  default_proration_style: "paid_in_advance_common" | "arrears_common";
}

// ============================================================================
// OUTPUT TYPES
// ============================================================================

/**
 * Complete result of closing cost calculation
 */
export interface ClosingCostResult {
  line_items_by_category: LineItemGroup[];
  buyer: SideCalculation;
  seller: SideCalculation;
  debug: DebugInfo;
}

export interface SideCalculation {
  debits: LineItem[];
  credits: LineItem[];
  total_debits: number;
  total_credits: number;
  net: number; // debits - credits (positive = owes money)
}

export interface LineItemGroup {
  category: string; // e.g., "Transfer Taxes", "Recording Fees", "Title Insurance"
  items: LineItem[];
  subtotal: number;
}

export interface LineItem {
  description: string;
  amount: number;
  category: string;
}

export interface DebugInfo {
  jurisdiction_profile_matched: string; // path to matched config file
  calculation_details: Record<string, any>;
  validation_warnings: string[];
}

// ============================================================================
// INTERNAL CALCULATION TYPES
// ============================================================================

/**
 * Result of tax calculation before allocation
 */
export interface TaxCalculationResult {
  items: TaxLineItemResult[];
  total: number;
}

export interface TaxLineItemResult {
  tax_name: string;
  description: string;
  base_amount: number;
  calculated_amount: number;
  payer_default: "buyer" | "seller" | "split";
  split_buyer_pct?: number;
  split_seller_pct?: number;
}

/**
 * Result of recording fees calculation
 */
export interface RecordingFeesResult {
  deed_fee: number;
  mortgage_fee: number;
  ancillary_fees: number;
  total: number;
  breakdown: Record<string, number>;
}

/**
 * Result of title insurance calculation
 */
export interface TitleInsuranceResult {
  lender_policy_premium: number;
  owner_policy_premium: number;
  simultaneous_discount_applied: number;
  endorsements_total: number;
  cpl_fee: number;
  total: number;
}

/**
 * Result of prorations calculation
 */
export interface ProrationsResult {
  line_items: ProratedLineItem[];
  total_prorated: number;
}

export interface ProratedLineItem {
  description: string;
  original_amount: number;
  buyer_share: number;
  seller_share: number;
  buyer_is_debited: boolean;
  seller_is_debited: boolean;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export class ClosingCostEngineError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "ClosingCostEngineError";
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DayCountMethod = "actual_365" | "actual_360" | "30_360";
export type ClosingDayOwner = "buyer" | "seller";
export type PaymentStatus = "paid" | "unpaid" | "unknown";
export type PayerType = "buyer" | "seller" | "split" | "unknown";
export type CalcType = "percent" | "flat" | "tiered_brackets";
export type BaseType = "price" | "loan" | "deed" | "mortgage";
