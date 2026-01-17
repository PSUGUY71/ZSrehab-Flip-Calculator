/**
 * Sample Jurisdiction Configurations for Testing
 */

import { JurisdictionProfile } from "../../types";

/**
 * Pennsylvania Default Configuration
 * - Multi-tax state with state + school district taxes
 * - Recording fees per deed/mortgage
 * - Title insurance with lender/owner policies
 */
export const PA_DEFAULT_CONFIG: JurisdictionProfile = {
  state: "PA",
  transfer_taxes: [
    {
      name: "PA State Transfer Tax",
      description: "Pennsylvania statewide transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "seller",
      rate: 1.0,
      enabled: true,
    },
    {
      name: "School District Tax",
      description: "Local school district transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "seller",
      rate: 0.5,
      enabled: true,
    },
  ],
  recording_fees: {
    deed: {
      per_document_fee: 50,
      per_page_fee: 1.5,
    },
    mortgage: {
      per_document_fee: 75,
      per_page_fee: 1.5,
    },
  },
  title_insurance: {
    lender_policy_rate: 0.5,
    owner_policy_rate: 0.6,
    simultaneous_issue_discount: 0.25,
    endorsements: {
      "ALTA-8": 75,
      "ALTA-9": 100,
    },
    cpl_fee: 150,
  },
  settlement_fees: {
    settlement_fee: 400,
    attorney_fee: 350,
    notary: 50,
    wire: 20,
    courier: 25,
    payoff_statement_fee: 50,
  },
  prorations: {
    day_count_method: "actual_365",
    closing_day_owner: "buyer",
    rounding: "cents",
    default_proration_style: "paid_in_advance_common",
  },
};

/**
 * Texas Default Configuration
 * - No state transfer tax (per Texas law)
 * - County recording fees
 * - Title insurance with endorsements
 */
export const TX_DEFAULT_CONFIG: JurisdictionProfile = {
  state: "TX",
  transfer_taxes: [],
  recording_fees: {
    deed: {
      per_document_fee: 40,
      per_page_fee: 1.25,
    },
    mortgage: {
      per_document_fee: 60,
      per_page_fee: 1.25,
    },
  },
  title_insurance: {
    lender_policy_rate: 0.4,
    owner_policy_rate: 0.5,
    simultaneous_issue_discount: 0.2,
    endorsements: {
      "ALTA-8": 50,
      "ALTA-9": 75,
    },
    cpl_fee: 125,
  },
  settlement_fees: {
    settlement_fee: 350,
    attorney_fee: 300,
    notary: 40,
    wire: 15,
    courier: 20,
    payoff_statement_fee: 40,
  },
  prorations: {
    day_count_method: "actual_360",
    closing_day_owner: "seller",
    rounding: "cents",
    default_proration_style: "paid_in_advance_common",
  },
};

/**
 * New York City Configuration
 * - NY State transfer tax + NYC surcharge
 * - Higher title insurance rates
 * - Bracket-based recording fees
 */
export const NY_NYC_CONFIG: JurisdictionProfile = {
  state: "NY",
  county: "New York",
  city: "New York",
  transfer_taxes: [
    {
      name: "NY State Transfer Tax",
      description: "New York State transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "buyer",
      rate: 0.65,
      enabled: true,
    },
    {
      name: "NYC Surcharge",
      description: "New York City surcharge on transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "buyer",
      rate: 1.25,
      enabled: true,
    },
  ],
  recording_fees: {
    deed: {
      per_document_fee: 75,
      per_page_fee: 2.0,
    },
    mortgage: {
      per_document_fee: 100,
      per_page_fee: 2.0,
    },
  },
  title_insurance: {
    lender_policy_rate: 0.55,
    owner_policy_rate: 0.65,
    simultaneous_issue_discount: 0.25,
    endorsements: {
      "ALTA-8": 100,
      "ALTA-9": 125,
    },
    cpl_fee: 200,
  },
  settlement_fees: {
    settlement_fee: 500,
    attorney_fee: 500,
    notary: 75,
    wire: 30,
    courier: 40,
    payoff_statement_fee: 60,
  },
  prorations: {
    day_count_method: "actual_365",
    closing_day_owner: "buyer",
    rounding: "cents",
    default_proration_style: "paid_in_advance_common",
  },
};

/**
 * California Default Configuration
 * - Percentage-based transfer tax
 * - Title company friendly rates
 * - HOA proration common
 */
export const CA_DEFAULT_CONFIG: JurisdictionProfile = {
  state: "CA",
  transfer_taxes: [
    {
      name: "CA Transfer Tax",
      description: "California transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "split",
      split_buyer_pct: 50,
      split_seller_pct: 50,
      rate: 0.11,
      enabled: true,
    },
  ],
  recording_fees: {
    deed: {
      per_document_fee: 65,
      per_page_fee: 1.75,
    },
    mortgage: {
      per_document_fee: 85,
      per_page_fee: 1.75,
    },
  },
  title_insurance: {
    lender_policy_rate: 0.45,
    owner_policy_rate: 0.55,
    simultaneous_issue_discount: 0.25,
    endorsements: {
      "ALTA-8": 80,
      "ALTA-9": 110,
    },
    cpl_fee: 160,
  },
  settlement_fees: {
    settlement_fee: 425,
    attorney_fee: 350,
    notary: 50,
    wire: 25,
    courier: 30,
    payoff_statement_fee: 50,
  },
  prorations: {
    day_count_method: "actual_360",
    closing_day_owner: "buyer",
    rounding: "cents",
    default_proration_style: "paid_in_advance_common",
  },
};

/**
 * Generic Default Configuration
 * - Used as fallback for any state not specifically configured
 * - Conservative, reasonable defaults
 */
export const GENERIC_DEFAULT_CONFIG: JurisdictionProfile = {
  state: "DEFAULT",
  transfer_taxes: [
    {
      name: "Transfer Tax",
      description: "Generic transfer tax",
      base_type: "price",
      calc_type: "percent",
      payer_default: "seller",
      rate: 0.5,
      enabled: true,
    },
  ],
  recording_fees: {
    deed: {
      per_document_fee: 50,
      per_page_fee: 1.0,
    },
    mortgage: {
      per_document_fee: 75,
      per_page_fee: 1.0,
    },
  },
  title_insurance: {
    lender_policy_rate: 0.5,
    owner_policy_rate: 0.6,
    simultaneous_issue_discount: 0.25,
    endorsements: {
      "ALTA-8": 75,
      "ALTA-9": 100,
    },
    cpl_fee: 150,
  },
  settlement_fees: {
    settlement_fee: 400,
    attorney_fee: 350,
    notary: 50,
    wire: 20,
    courier: 25,
    payoff_statement_fee: 50,
  },
  prorations: {
    day_count_method: "actual_365",
    closing_day_owner: "buyer",
    rounding: "cents",
    default_proration_style: "paid_in_advance_common",
  },
};

/**
 * Build configuration map for testing
 */
export function buildTestConfigMap(): Record<string, JurisdictionProfile> {
  return {
    "PA:DEFAULT": PA_DEFAULT_CONFIG,
    "TX:DEFAULT": TX_DEFAULT_CONFIG,
    "NY:NEW YORK:NEW YORK": NY_NYC_CONFIG,
    "CA:DEFAULT": CA_DEFAULT_CONFIG,
    DEFAULT: GENERIC_DEFAULT_CONFIG,
  };
}
