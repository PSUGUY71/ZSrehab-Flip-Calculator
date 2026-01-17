/**
 * Core types for the Closing Cost Engine
 * Defines all input/output structures and configuration schemas
 */

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface DealInput {
  /** Property location */
  property: {
    state: string;
    county?: string;
    city?: string;
    zip?: string;
  };
  
  /** Deal financial inputs */
  purchase_price: number;
  loan_amount: number;
  closing_date: string; // ISO format YYYY-MM-DD
  
  /** Document details */
  docs: {
    deed_docs_count: number;
    deed_pages: number;
    mortgage_docs_count: number;
    mortgage_pages: number;
    ancillary?: AncillaryDoc[];
  };
  
  /** User selections */
  selections: {
    owner_policy: boolean;
    endorsements: string[];
    cpl: boolean; // CPL = Closing Protection Letter
  };
  
  /** Override flat fees */
  flat_fees?: {
    settlement_fee?: number;
    attorney_fee?: number;
    notary_fee?: number;
    wire_fee?: number;
    courier_fee?: number;
    payoff_statement_fee?: number;
  };
  
  /** Tax lines for prorations */
  tax_lines?: TaxLine[];
  
  /** HOA dues for prorations */
  hoa_lines?: TaxLine[];
  
  /** Whether buyer or seller pays each line */
  payers?: Record<string, 'buyer' | 'seller' | 'split'>;
}

export interface AncillaryDoc {
  name: string;
  doc_count: number;
  page_count: number;
}

export interface TaxLine {
  id: string;
  description: string;
  amount: number;
  period_start: string; // ISO format YYYY-MM-DD
  period_end: string;
  payment_status: 'paid' | 'unpaid' | 'unknown';
  payer_of_bill: 'seller' | 'buyer' | 'unknown';
}

// ============================================================================
// OUTPUT TYPES
// ============================================================================

export interface ClosingCostOutput {
  /** Buyer side */
  buyer_debits: LineItem[];
  buyer_credits: LineItem[];
  buyer_total_debit: number;
  buyer_total_credit: number;
  buyer_net: number; // positive means buyer pays
  
  /** Seller side */
  seller_debits: LineItem[];
  seller_credits: LineItem[];
  seller_total_debit: number;
  seller_total_credit: number;
  seller_net: number; // positive means seller pays
  
  /** All line items grouped by category */
  all_items_by_category: Record<string, LineItem[]>;
  
  /** Diagnostic info */
  diagnostics: {
    jurisdiction_selected: string;
    config_path: string;
    profile_matched_by: 'zip' | 'city' | 'county' | 'state' | 'default';
    debug_info?: Record<string, unknown>;
  };
}

export interface LineItem {
  id: string;
  category: string;
  description: string;
  buyer_debit: number;
  buyer_credit: number;
  seller_debit: number;
  seller_credit: number;
  notes?: string;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface JurisdictionProfile {
  jurisdiction_id: string; // e.g., "PA", "PA_ALLEGHENY", "PA_ALLEGHENY_PITTSBURGH"
  level: 'state' | 'county' | 'city' | 'zip'; // Determines match priority
  state: string;
  county?: string;
  city?: string;
  zip?: string;
  
  description?: string;
  
  /** Tax configurations */
  transfer_taxes?: TransferTaxConfig[];
  
  /** Recording fees config */
  recording?: RecordingProfile;
  
  /** Title insurance config */
  title?: TitleProfile;
  
  /** Settlement and flat fees */
  settlement?: SettlementProfile;
  
  /** Proration rules */
  proration?: ProrationProfile;
  
  /** Customization */
  custom_rules?: Record<string, unknown>;
}

export interface TransferTaxConfig {
  id: string;
  description: string;
  
  /** What the tax is calculated on */
  base_type: 'price' | 'loan' | 'deed' | 'mortgage';
  
  /** How to calculate */
  calc_type: 'percent' | 'flat' | 'tiered_brackets';
  
  /** Default payer */
  payer_default: 'buyer' | 'seller' | 'split';
  split_buyer_pct?: number; // 0-100, only if payer_default is 'split'
  split_seller_pct?: number;
  
  /** For percent-based */
  rate?: number; // 0.005 = 0.5%
  
  /** For flat */
  flat_amount?: number;
  
  /** For tiered */
  brackets?: BracketTable;
  
  /** Exemption logic */
  exemption_rule?: {
    description: string;
    applies_when?: Record<string, unknown>;
    exemption_amount?: number;
  };
}

export interface BracketTable {
  brackets: Bracket[];
}

export interface Bracket {
  min_inclusive: number;
  max_inclusive: number | null; // null = unlimited
  rate: number;
}

export interface RecordingProfile {
  id: string;
  
  /** Per-document fees */
  deed_recording?: FeeSchedule;
  mortgage_recording?: FeeSchedule;
  
  /** Per-page fees (applied to document fees) */
  ancillary_recording?: Record<string, FeeSchedule>;
  
  /** Optional flat surcharge */
  flat_surcharge?: number;
}

export interface FeeSchedule {
  per_document_fee: number;
  per_page_fee: number;
  // Optional: tiered fees based on page count
  tiers?: FeeTier[];
}

export interface FeeTier {
  pages_min: number;
  pages_max: number | null;
  per_page_override?: number;
  flat_override?: number;
}

export interface TitleProfile {
  id: string;
  
  /** Pricing method */
  pricing_method: 'rate_table' | 'percent' | 'flat';
  
  /** Lender policy */
  lender_policy: {
    base_on: 'loan_amount' | 'purchase_price';
    percent?: number; // e.g., 0.005 = 0.5%
    flat?: number;
    rate_table?: RateTable;
  };
  
  /** Owner policy */
  owner_policy?: {
    base_on: 'loan_amount' | 'purchase_price';
    percent?: number;
    flat?: number;
    rate_table?: RateTable;
  };
  
  /** Simultaneous issue discount */
  simultaneous_issue_discount?: {
    applies: boolean;
    discount_pct: number; // e.g., 25 means 25% discount
  };
  
  /** Endorsements */
  endorsements?: Record<string, number>; // e.g., { "ALTA-1": 100, "ALTA-2": 150 }
  
  /** CPL - Closing Protection Letter */
  cpl?: number; // flat fee if enabled
}

export interface RateTable {
  entries: RateTableEntry[];
}

export interface RateTableEntry {
  loan_min: number;
  loan_max: number | null;
  rate: number;
  // or
  flat?: number;
}

export interface SettlementProfile {
  settlement_fee?: FeeConfig;
  attorney_fee?: FeeConfig;
  notary_fee?: FeeConfig;
  wire_fee?: FeeConfig;
  courier_fee?: FeeConfig;
  payoff_statement_fee?: FeeConfig;
  [key: string]: FeeConfig | undefined;
}

export interface FeeConfig {
  amount: number;
  payer: 'buyer' | 'seller' | 'split';
  split_buyer_pct?: number;
  split_seller_pct?: number;
}

export interface ProrationProfile {
  id: string;
  
  /** Day count method */
  day_count: 'actual_365' | 'actual_360' | '30_360';
  
  /** Who owns closing day */
  closing_day_owner: 'buyer' | 'seller';
  
  /** Rounding method */
  rounding: 'cents' | 'whole_dollars';
  
  /** Default for unknown bills */
  default_proration_style: 'paid_in_advance_common' | 'arrears_common';
}

// ============================================================================
// ENGINE STATE AND ERRORS
// ============================================================================

export interface EngineValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface EngineOptions {
  config_dir: string;
  strict_validation?: boolean; // throws on missing configs if true
  debug?: boolean;
}
