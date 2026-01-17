/**
 * Transfer tax calculator
 * Supports: percent, flat, tiered brackets
 * Supports: stacked multiple taxes, buyer/seller/split allocation
 */

import {
  TransferTaxItem,
  BracketTable,
  TaxCalculationResult,
  TaxLineItemResult,
  DealInput,
  JurisdictionProfile,
} from "./types";

/**
 * Calculate all transfer taxes for a deal
 */
export function calculateTransferTaxes(
  input: DealInput,
  profile: JurisdictionProfile
): TaxCalculationResult {
  const items: TaxLineItemResult[] = [];
  let total = 0;

  // Get base amounts for each tax type
  const baseAmounts = {
    price: input.purchase_price,
    loan: input.loan_amount,
    deed: input.purchase_price, // Usually same as price
    mortgage: input.loan_amount, // Usually same as loan
  };

  // Process each transfer tax in the profile
  for (const taxItem of profile.transfer_taxes) {
    if (!taxItem.enabled) continue;

    const baseAmount = baseAmounts[taxItem.base_type];

    let calculatedAmount = 0;

    if (taxItem.calc_type === "percent" && taxItem.rate !== undefined) {
      // Percent: amount = base * (rate / 100)
      calculatedAmount = baseAmount * (taxItem.rate / 100);
    } else if (
      taxItem.calc_type === "flat" &&
      taxItem.flat_amount !== undefined
    ) {
      // Flat: amount = flat_amount
      calculatedAmount = taxItem.flat_amount;
    } else if (
      taxItem.calc_type === "tiered_brackets" &&
      taxItem.brackets
    ) {
      // Tiered: iterate brackets, apply rate to portion in each bracket
      calculatedAmount = calculateBracketPremium(baseAmount, taxItem.brackets);
    }

    // Add to results
    const result: TaxLineItemResult = {
      tax_name: taxItem.name,
      description: taxItem.description,
      base_amount: baseAmount,
      calculated_amount: calculatedAmount,
      payer_default: taxItem.payer_default,
      split_buyer_pct: taxItem.split_buyer_pct,
      split_seller_pct: taxItem.split_seller_pct,
    };

    items.push(result);
    total += calculatedAmount;
  }

  return { items, total };
}

/**
 * Calculate tax using tiered bracket method
 *
 * Example: PA school tax
 * Brackets:
 * - $0-100k @ 0.5%
 * - $100k-500k @ 1%
 * - $500k+ @ 1.5%
 *
 * For $300k property:
 * - $0-100k: $100k * 0.5% = $500
 * - $100k-300k: $200k * 1% = $2,000
 * - Total: $2,500
 */
export function calculateBracketPremium(
  baseAmount: number,
  brackets: BracketTable[]
): number {
  let total = 0;

  for (const bracket of brackets) {
    // Determine the amount that falls into this bracket
    const minInBracket = Math.max(baseAmount, bracket.min_inclusive);
    const maxInBracket =
      bracket.max_inclusive === null ? baseAmount : bracket.max_inclusive;

    if (minInBracket >= bracket.min_inclusive && minInBracket <= maxInBracket) {
      const portionInBracket = Math.min(baseAmount, maxInBracket) -
        Math.max(0, bracket.min_inclusive);

      if (portionInBracket > 0) {
        total += portionInBracket * (bracket.rate / 100);
      }
    }
  }

  return total;
}

/**
 * Allocate tax amount between buyer and seller
 */
export function allocateTaxAmount(
  taxAmount: number,
  payer: "buyer" | "seller" | "split",
  buyerPct?: number,
  sellerPct?: number
): { buyer_debit: number; seller_debit: number } {
  if (payer === "buyer") {
    return { buyer_debit: taxAmount, seller_debit: 0 };
  }

  if (payer === "seller") {
    return { buyer_debit: 0, seller_debit: taxAmount };
  }

  if (payer === "split" && buyerPct !== undefined && sellerPct !== undefined) {
    const buyerShare = taxAmount * (buyerPct / 100);
    const sellerShare = taxAmount * (sellerPct / 100);
    return { buyer_debit: buyerShare, seller_debit: sellerShare };
  }

  // Default to buyer if allocation can't be determined
  return { buyer_debit: taxAmount, seller_debit: 0 };
}

/**
 * Example: Process full tax calculation for a deal
 */
export function processTaxesForDeal(
  input: DealInput,
  profile: JurisdictionProfile
): { buyer_tax_debits: number; seller_tax_debits: number; items: any[] } {
  const taxResult = calculateTransferTaxes(input, profile);

  let buyerDebits = 0;
  let sellerDebits = 0;
  const allocatedItems: any[] = [];

  for (const taxItem of taxResult.items) {
    const allocation = allocateTaxAmount(
      taxItem.calculated_amount,
      taxItem.payer_default,
      taxItem.split_buyer_pct,
      taxItem.split_seller_pct
    );

    buyerDebits += allocation.buyer_debit;
    sellerDebits += allocation.seller_debit;

    allocatedItems.push({
      name: taxItem.tax_name,
      description: taxItem.description,
      amount: taxItem.calculated_amount,
      buyer_share: allocation.buyer_debit,
      seller_share: allocation.seller_debit,
    });
  }

  return {
    buyer_tax_debits: buyerDebits,
    seller_tax_debits: sellerDebits,
    items: allocatedItems,
  };
}
