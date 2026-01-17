/**
 * HUD Output Formatter
 * Formats closing costs into HUD-1 / Closing Disclosure structure
 * Groups by category and organizes buyer/seller debits and credits
 */

import {
  ClosingCostResult,
  LineItem,
  LineItemGroup,
  SideCalculation,
  TaxCalculationResult,
  RecordingFeesResult,
  TitleInsuranceResult,
  ProrationsResult,
  SettlementFeesProfile,
} from "./types";

/**
 * Build complete HUD output
 */
export function buildHUDOutput(
  taxResult: TaxCalculationResult,
  recordingResult: RecordingFeesResult,
  titleResult: TitleInsuranceResult,
  prorationsResult: ProrationsResult,
  settlementFees: SettlementFeesProfile
): ClosingCostResult {
  const buyerLineItems: LineItem[] = [];
  const sellerLineItems: LineItem[] = [];

  let buyerDebits = 0;
  let buyerCredits = 0;
  let sellerDebits = 0;
  let sellerCredits = 0;

  // ========== TRANSFER TAXES ==========
  for (const taxItem of taxResult.items) {
    const allocation = calculateTaxAllocation(taxItem);

    if (allocation.buyer_debit > 0) {
      buyerLineItems.push({
        description: taxItem.tax_name,
        amount: allocation.buyer_debit,
        category: "Transfer Taxes",
      });
      buyerDebits += allocation.buyer_debit;
    }

    if (allocation.seller_debit > 0) {
      sellerLineItems.push({
        description: taxItem.tax_name,
        amount: allocation.seller_debit,
        category: "Transfer Taxes",
      });
      sellerDebits += allocation.seller_debit;
    }
  }

  // ========== RECORDING FEES ==========
  if (recordingResult.deed_fee > 0) {
    buyerLineItems.push({
      description: "Deed Recording",
      amount: recordingResult.deed_fee,
      category: "Recording Fees",
    });
    buyerDebits += recordingResult.deed_fee;
  }

  if (recordingResult.mortgage_fee > 0) {
    buyerLineItems.push({
      description: "Mortgage Recording",
      amount: recordingResult.mortgage_fee,
      category: "Recording Fees",
    });
    buyerDebits += recordingResult.mortgage_fee;
  }

  if (recordingResult.ancillary_fees > 0) {
    buyerLineItems.push({
      description: "Ancillary Recording",
      amount: recordingResult.ancillary_fees,
      category: "Recording Fees",
    });
    buyerDebits += recordingResult.ancillary_fees;
  }

  // ========== TITLE INSURANCE ==========
  if (titleResult.lender_policy_premium > 0) {
    buyerLineItems.push({
      description: "Lender Title Policy",
      amount: titleResult.lender_policy_premium,
      category: "Title Insurance",
    });
    buyerDebits += titleResult.lender_policy_premium;
  }

  if (titleResult.owner_policy_premium > 0) {
    // Note: seller usually gets credit for owner policy
    sellerLineItems.push({
      description: "Owner Title Policy",
      amount: titleResult.owner_policy_premium,
      category: "Title Insurance",
    });
    sellerCredits += titleResult.owner_policy_premium;
  }

  if (titleResult.endorsements_total > 0) {
    buyerLineItems.push({
      description: "Title Endorsements",
      amount: titleResult.endorsements_total,
      category: "Title Insurance",
    });
    buyerDebits += titleResult.endorsements_total;
  }

  if (titleResult.cpl_fee > 0) {
    buyerLineItems.push({
      description: "CPL (Closing Protection Letter)",
      amount: titleResult.cpl_fee,
      category: "Title Insurance",
    });
    buyerDebits += titleResult.cpl_fee;
  }

  // ========== SETTLEMENT FEES ==========
  if (settlementFees.settlement_fee && settlementFees.settlement_fee > 0) {
    buyerLineItems.push({
      description: "Settlement Fee",
      amount: settlementFees.settlement_fee,
      category: "Settlement Fees",
    });
    buyerDebits += settlementFees.settlement_fee;
  }

  if (settlementFees.attorney_fee && settlementFees.attorney_fee > 0) {
    buyerLineItems.push({
      description: "Attorney Fees",
      amount: settlementFees.attorney_fee,
      category: "Settlement Fees",
    });
    buyerDebits += settlementFees.attorney_fee;
  }

  if (settlementFees.notary && settlementFees.notary > 0) {
    buyerLineItems.push({
      description: "Notary",
      amount: settlementFees.notary,
      category: "Settlement Fees",
    });
    buyerDebits += settlementFees.notary;
  }

  if (settlementFees.wire && settlementFees.wire > 0) {
    buyerLineItems.push({
      description: "Wire Fee",
      amount: settlementFees.wire,
      category: "Settlement Fees",
    });
    buyerDebits += settlementFees.wire;
  }

  if (settlementFees.courier && settlementFees.courier > 0) {
    buyerLineItems.push({
      description: "Courier",
      amount: settlementFees.courier,
      category: "Settlement Fees",
    });
    buyerDebits += settlementFees.courier;
  }

  // ========== PRORATIONS ==========
  for (const proration of prorationsResult.line_items) {
    if (proration.buyer_is_debited && proration.buyer_share > 0) {
      buyerLineItems.push({
        description: proration.description,
        amount: proration.buyer_share,
        category: "Prorations",
      });
      buyerDebits += proration.buyer_share;
    } else if (!proration.buyer_is_debited && proration.buyer_share > 0) {
      buyerLineItems.push({
        description: proration.description,
        amount: -proration.buyer_share, // Credit (negative)
        category: "Prorations",
      });
      buyerCredits += proration.buyer_share;
    }

    if (proration.seller_is_debited && proration.seller_share > 0) {
      sellerLineItems.push({
        description: proration.description,
        amount: proration.seller_share,
        category: "Prorations",
      });
      sellerDebits += proration.seller_share;
    } else if (!proration.seller_is_debited && proration.seller_share > 0) {
      sellerLineItems.push({
        description: proration.description,
        amount: -proration.seller_share, // Credit (negative)
        category: "Prorations",
      });
      sellerCredits += proration.seller_share;
    }
  }

  // ========== BUILD OUTPUT ==========
  const allItems = [...buyerLineItems, ...sellerLineItems];
  const lineItemsByCategory = groupByCategory(allItems);

  const buyerSide: SideCalculation = {
    debits: buyerLineItems.filter((item) => item.amount > 0),
    credits: buyerLineItems.filter((item) => item.amount < 0),
    total_debits: buyerDebits,
    total_credits: buyerCredits,
    net: buyerDebits - buyerCredits,
  };

  const sellerSide: SideCalculation = {
    debits: sellerLineItems.filter((item) => item.amount > 0),
    credits: sellerLineItems.filter((item) => item.amount < 0),
    total_debits: sellerDebits,
    total_credits: sellerCredits,
    net: sellerDebits - sellerCredits,
  };

  return {
    line_items_by_category: lineItemsByCategory,
    buyer: buyerSide,
    seller: sellerSide,
    debug: {
      jurisdiction_profile_matched: "unknown",
      calculation_details: {},
      validation_warnings: [],
    },
  };
}

/**
 * Group line items by category
 */
export function groupByCategory(items: LineItem[]): LineItemGroup[] {
  const categories: Record<string, LineItem[]> = {};

  for (const item of items) {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  }

  const groups: LineItemGroup[] = [];
  for (const [category, categoryItems] of Object.entries(categories)) {
    const subtotal = categoryItems.reduce((sum, item) => sum + item.amount, 0);
    groups.push({
      category,
      items: categoryItems,
      subtotal,
    });
  }

  return groups;
}

/**
 * Calculate tax allocation from tax item
 */
function calculateTaxAllocation(taxItem: any): {
  buyer_debit: number;
  seller_debit: number;
} {
  if (taxItem.payer_default === "buyer") {
    return { buyer_debit: taxItem.calculated_amount, seller_debit: 0 };
  } else if (taxItem.payer_default === "seller") {
    return { buyer_debit: 0, seller_debit: taxItem.calculated_amount };
  } else if (taxItem.payer_default === "split") {
    const buyerShare =
      taxItem.calculated_amount * (taxItem.split_buyer_pct / 100);
    const sellerShare =
      taxItem.calculated_amount * (taxItem.split_seller_pct / 100);
    return { buyer_debit: buyerShare, seller_debit: sellerShare };
  }

  return { buyer_debit: taxItem.calculated_amount, seller_debit: 0 };
}
