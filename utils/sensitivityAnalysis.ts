export interface PurchaseSensitivityScenario {
  label: string;
  purchasePrice: number;
  percentChange: number;
  profit: number;
  profitChange: number;
  margin: number; // Profit margin as percentage
  isBelowThreshold: boolean; // True if margin < 15%
}

export interface RehabSensitivityScenario {
  label: string;
  rehabCost: number;
  percentChange: number;
  profit: number;
  profitChange: number;
  margin: number; // Profit margin as percentage
  isBelowThreshold: boolean; // True if margin < 15%
}

// Net profit = ARV − price − rehab − costs (financing only moves who pays, not the total), so every extra dollar of
// price or rehab is a dollar less profit. The 0% row therefore equals calculateLoan()'s netProfit exactly.
// ponytail: closing costs, points and interest are held at the base deal's values; re-run calculateLoan per row if
// transfer-tax/title/interest drift on a ±20% price change ever matters.
const scenario = (base: number, baseProfit: number, arv: number, percent: number, atLabel: string) => {
  const value = base * (1 + percent);
  const profit = baseProfit - (value - base);
  const margin = arv > 0 ? (profit / arv) * 100 : 0;
  const label = percent > 0 ? `Over ${(percent * 100).toFixed(0)}%` : percent < 0 ? `Under ${Math.abs(percent * 100).toFixed(0)}%` : atLabel;
  return { label, value, percentChange: percent * 100, profit, profitChange: profit - baseProfit, margin, isBelowThreshold: margin < 15 };
};

/** How profit changes when the purchase price varies. */
export function generatePurchaseSensitivity(basePurchasePrice: number, baseProfit: number, arv: number): PurchaseSensitivityScenario[] {
  return [-0.05, -0.02, 0, 0.05, 0.10, 0.15, 0.20].map((p) => {
    const { value, ...s } = scenario(basePurchasePrice, baseProfit, arv, p, 'At Price');
    return { ...s, purchasePrice: value };
  });
}

/** How profit changes when rehab costs vary (an overrun costs its full amount, even when the loan is capped). */
export function generateRehabSensitivity(baseRehabBudget: number, baseProfit: number, arv: number): RehabSensitivityScenario[] {
  return [-0.20, -0.10, -0.05, 0, 0.10, 0.20, 0.30].map((p) => {
    const { value, ...s } = scenario(baseRehabBudget, baseProfit, arv, p, 'At Budget');
    return { ...s, rehabCost: value };
  });
}
