/**
 * Title Insurance Calculator
 * Handles lender policy, owner policy, simultaneous discount, endorsements, CPL
 */

import { DealInput, TitleProfile, TitleInsuranceResult } from "./types";

/**
 * Calculate title insurance premiums and fees
 */
export function calculateTitleInsurance(
  input: DealInput,
  profile: TitleProfile
): TitleInsuranceResult {
  let lenderPremium = 0;
  let ownerPremium = 0;
  let discount = 0;

  // Calculate lender policy (required if loan exists)
  if (input.loan_amount > 0) {
    lenderPremium = input.loan_amount * (profile.lender_policy_rate / 100);
  }

  // Calculate owner policy (if selected)
  if (input.selections.owner_policy) {
    ownerPremium = input.purchase_price * (profile.owner_policy_rate / 100);
  }

  // Apply simultaneous issue discount (only if both policies exist)
  if (lenderPremium > 0 && ownerPremium > 0) {
    const subtotal = lenderPremium + ownerPremium;
    const discountedAmount = subtotal * (1 - profile.simultaneous_issue_discount);
    discount = subtotal - discountedAmount;
    lenderPremium = discountedAmount * (lenderPremium / subtotal);
    ownerPremium = discountedAmount * (ownerPremium / subtotal);
  }

  // Calculate endorsements
  let endorsementsTotal = 0;
  if (input.selections.endorsements && profile.endorsements) {
    for (const endorsement of input.selections.endorsements) {
      const endorsementFee = profile.endorsements[endorsement];
      if (endorsementFee) {
        endorsementsTotal += endorsementFee;
      }
    }
  }

  // CPL fee
  const cplFee = input.selections.cpl_fee ? profile.cpl_fee : 0;

  const total = lenderPremium + ownerPremium + endorsementsTotal + cplFee;

  return {
    lender_policy_premium: lenderPremium,
    owner_policy_premium: ownerPremium,
    simultaneous_discount_applied: discount,
    endorsements_total: endorsementsTotal,
    cpl_fee: cplFee,
    total,
  };
}

/**
 * Allocate title insurance costs between buyer and seller
 */
export function allocateTitleInsurance(
  result: TitleInsuranceResult,
  ownerPolicySelectedByBuyer: boolean
): { buyer_debit: number; seller_credit: number } {
  let buyerDebit = 0;
  let sellerCredit = 0;

  // Lender policy: always buyer debit
  buyerDebit += result.lender_policy_premium;

  // Owner policy: seller credit (or buyer debit if buyer selected it)
  if (result.owner_policy_premium > 0) {
    if (ownerPolicySelectedByBuyer) {
      buyerDebit += result.owner_policy_premium;
    } else {
      sellerCredit += result.owner_policy_premium;
    }
  }

  // Endorsements: buyer debit
  buyerDebit += result.endorsements_total;

  // CPL: buyer debit
  buyerDebit += result.cpl_fee;

  return { buyer_debit: buyerDebit, seller_credit: sellerCredit };
}

/**
 * Calculate simultaneous issue discount
 */
export function calculateSimultaneousIssueDiscount(
  lenderPremium: number,
  ownerPremium: number,
  discountRate: number
): number {
  const subtotal = lenderPremium + ownerPremium;
  return subtotal * discountRate;
}

/**
 * Get endorsement fee
 */
export function getEndorsementFee(
  endorsementType: string,
  profile: TitleProfile
): number {
  if (!profile.endorsements) return 0;
  return profile.endorsements[endorsementType] || 0;
}

/**
 * Format title insurance breakdown
 */
export function formatTitleInsuranceBreakdown(result: TitleInsuranceResult): string[] {
  const lines: string[] = [];

  if (result.lender_policy_premium > 0) {
    lines.push(`Lender Policy: $${result.lender_policy_premium.toFixed(2)}`);
  }

  if (result.owner_policy_premium > 0) {
    lines.push(`Owner Policy: $${result.owner_policy_premium.toFixed(2)}`);
  }

  if (result.simultaneous_discount_applied > 0) {
    lines.push(
      `Simultaneous Discount: -$${result.simultaneous_discount_applied.toFixed(2)}`
    );
  }

  if (result.endorsements_total > 0) {
    lines.push(`Endorsements: $${result.endorsements_total.toFixed(2)}`);
  }

  if (result.cpl_fee > 0) {
    lines.push(`CPL: $${result.cpl_fee.toFixed(2)}`);
  }

  lines.push(`Total: $${result.total.toFixed(2)}`);

  return lines;
}
