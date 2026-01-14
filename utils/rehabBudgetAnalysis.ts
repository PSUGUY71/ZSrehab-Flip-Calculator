export interface RehabBudgetAnalysis {
  perSqft: number;
  percentOfPurchase: number;
  warnings: string[];
  recommendedContingency15: number;
  recommendedContingency20: number;
  profitImpactOf20Over: number;
}

export function analyzeRehabBudget(
  budget: number,
  purchasePrice: number,
  sqft: number
): RehabBudgetAnalysis | null {
  // Return null if we don't have enough data
  if (!budget || budget <= 0 || !sqft || sqft <= 0) {
    return null;
  }

  const perSqft = budget / sqft;
  const percentOfPurchase = purchasePrice > 0 ? (budget / purchasePrice) * 100 : 0;
  const contingency15 = budget * 0.15;
  const contingency20 = budget * 0.20;
  const overrunImpact = contingency20; // Reduces profit by this amount

  const warnings: string[] = [];

  if (perSqft < 30) {
    warnings.push(
      `⚠️ $${perSqft.toFixed(2)}/sqft is cosmetic-only. Typical full rehab: $50-150/sqft`
    );
  }
  if (perSqft > 150) {
    warnings.push(
      `⚠️ $${perSqft.toFixed(2)}/sqft is high-end. Verify scope aligns with ARV.`
    );
  }
  if (percentOfPurchase < 10 && purchasePrice > 0) {
    warnings.push(
      `⚠️ Rehab is ${percentOfPurchase.toFixed(1)}% of purchase. Typical range: 20-40%. Is this cosmetic-only?`
    );
  }
  if (percentOfPurchase > 50 && purchasePrice > 0) {
    warnings.push(
      `⚠️ Rehab is ${percentOfPurchase.toFixed(1)}% of purchase. High cost. Verify ARV justifies it.`
    );
  }

  return {
    perSqft,
    percentOfPurchase,
    warnings,
    recommendedContingency15: contingency15,
    recommendedContingency20: contingency20,
    profitImpactOf20Over: overrunImpact,
  };
}

