/**
 * Sample Deal Inputs for Testing
 */

import { DealInput } from "../../types";

/**
 * Pennsylvania Residential Deal
 * - Purchase price: $200,000
 * - Loan amount: $150,000
 */
export const PA_RESIDENTIAL_DEAL: DealInput = {
  property: {
    state: "PA",
    county: "Allegheny",
    city: "Pittsburgh",
    zip: "15206",
  },
  purchase_price: 200000,
  loan_amount: 150000,
  closing_date: "2024-06-15",
  docs: {
    deed_docs_count: 1,
    deed_pages: 3,
    mortgage_docs_count: 1,
    mortgage_pages: 5,
    ancillary: [],
  },
  selections: {
    owner_policy: true,
    endorsements: [],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 1200,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-06-15",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * Texas Commercial Deal
 * - Purchase price: $500,000
 * - Loan amount: $350,000
 */
export const TX_COMMERCIAL_DEAL: DealInput = {
  property: {
    state: "TX",
    county: "Harris",
    city: "Houston",
    zip: "77002",
  },
  purchase_price: 500000,
  loan_amount: 350000,
  closing_date: "2024-03-20",
  docs: {
    deed_docs_count: 1,
    deed_pages: 4,
    mortgage_docs_count: 1,
    mortgage_pages: 8,
    ancillary: [{ doc_type: "assignment", count: 1, pages: 2 }],
  },
  selections: {
    owner_policy: false,
    endorsements: ["ALTA-8", "ALTA-9"],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 3250,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-03-20",
      payment_status: "paid",
      payer_of_bill: "seller",
    },
  ],
  hoa_lines: [
    {
      description: "HOA Dues Proration",
      amount: 300,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-03-20",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * New York City Deal
 * - Purchase price: $750,000
 * - Loan amount: $562,500
 */
export const NY_NYC_DEAL: DealInput = {
  property: {
    state: "NY",
    county: "New York",
    city: "New York",
    zip: "10001",
  },
  purchase_price: 750000,
  loan_amount: 562500,
  closing_date: "2024-09-01",
  docs: {
    deed_docs_count: 1,
    deed_pages: 6,
    mortgage_docs_count: 1,
    mortgage_pages: 10,
    ancillary: [],
  },
  selections: {
    owner_policy: true,
    endorsements: ["ALTA-8"],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 6000,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-09-01",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * California Residential Deal
 * - Purchase price: $600,000
 * - Loan amount: $420,000
 */
export const CA_RESIDENTIAL_DEAL: DealInput = {
  property: {
    state: "CA",
    county: "Los Angeles",
    city: "Los Angeles",
    zip: "90001",
  },
  purchase_price: 600000,
  loan_amount: 420000,
  closing_date: "2024-12-10",
  docs: {
    deed_docs_count: 1,
    deed_pages: 4,
    mortgage_docs_count: 1,
    mortgage_pages: 8,
    ancillary: [],
  },
  selections: {
    owner_policy: true,
    endorsements: [],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 3600,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-12-10",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
  hoa_lines: [
    {
      description: "HOA Dues Proration",
      amount: 150,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-12-10",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * Flat Fee Deal
 * - Fixed closing costs instead of percentage-based
 */
export const FLAT_FEE_DEAL: DealInput = {
  property: {
    state: "TX",
    county: "Dallas",
    city: "Dallas",
    zip: "75201",
  },
  purchase_price: 350000,
  loan_amount: 262500,
  closing_date: "2024-11-01",
  docs: {
    deed_docs_count: 1,
    deed_pages: 3,
    mortgage_docs_count: 1,
    mortgage_pages: 6,
    ancillary: [],
  },
  selections: {
    owner_policy: true,
    endorsements: [],
    cpl_fee: false,
  },
  flat_fee_overrides: {
    settlement_fee: 500,
    attorney_fee: 400,
    wire: 150,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 2100,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-11-01",
      payment_status: "paid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * Minimal Deal (Default everything)
 * - Smallest required inputs
 */
export const MINIMAL_DEAL: DealInput = {
  property: {
    state: "TX",
    county: "Travis",
    city: "Austin",
    zip: "78701",
  },
  purchase_price: 100000,
  loan_amount: 80000,
  closing_date: "2024-07-15",
  docs: {
    deed_docs_count: 1,
    deed_pages: 1,
    mortgage_docs_count: 1,
    mortgage_pages: 1,
    ancillary: [],
  },
  selections: {
    owner_policy: false,
    endorsements: [],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 600,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-07-15",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};

/**
 * Complex Mid-Year Proration Deal
 * - Closing day ownership matters
 * - Multiple tax lines
 */
export const PRORATION_HEAVY_DEAL: DealInput = {
  property: {
    state: "PA",
    county: "Chester",
    city: "Downingtown",
    zip: "19335",
  },
  purchase_price: 275000,
  loan_amount: 206250,
  closing_date: "2024-06-30",
  docs: {
    deed_docs_count: 1,
    deed_pages: 3,
    mortgage_docs_count: 1,
    mortgage_pages: 5,
    ancillary: [],
  },
  selections: {
    owner_policy: true,
    endorsements: [],
    cpl_fee: false,
  },
  tax_lines: [
    {
      description: "Property Tax Proration",
      amount: 1500,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-06-30",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
  hoa_lines: [
    {
      description: "HOA Dues Proration",
      amount: 900,
      period_start: "2024-01-01",
      period_end: "2024-12-31",
      closing_date: "2024-06-30",
      payment_status: "unpaid",
      payer_of_bill: "seller",
    },
  ],
};
