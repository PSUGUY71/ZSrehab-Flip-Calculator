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

// The 0% row always equals calculateLoan()'s netProfit. Purchase rows get `profitAt` (a full deal recalculation:
// loan, points, buy-side transfer tax, title, interest all move with price). Rehab rows stay 1:1 — every extra rehab
// dollar is a dollar less profit.
// ponytail: rehab rows hold points/interest at the base deal; pass profitAt to generateRehabSensitivity if that matters.
const scenario = (base: number, baseProfit: number, arv: number, percent: number, atLabel: string, profitAt?: (v: number) => number) => {
  const value = base * (1 + percent);
  const profit = percent === 0 ? baseProfit : profitAt ? profitAt(value) : baseProfit - (value - base);
  const margin = arv > 0 ? (profit / arv) * 100 : 0;
  const label = percent > 0 ? `Over ${(percent * 100).toFixed(0)}%` : percent < 0 ? `Under ${Math.abs(percent * 100).toFixed(0)}%` : atLabel;
  return { label, value, percentChange: percent * 100, profit, profitChange: profit - baseProfit, margin, isBelowThreshold: margin < 15 };
};

/** How profit changes when the purchase price varies. */
export function generatePurchaseSensitivity(basePurchasePrice: number, baseProfit: number, arv: number, profitAt?: (price: number) => number): PurchaseSensitivityScenario[] {
  return [-0.05, -0.02, 0, 0.05, 0.10, 0.15, 0.20].map((p) => {
    const { value, ...s } = scenario(basePurchasePrice, baseProfit, arv, p, 'At Price', profitAt);
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

/** Table header from the rows themselves: "<prefix> <pct>% = $X loss" using that row's profit change. */
export const sensitivityHeadline = (rows: { percentChange: number; profitChange: number }[], pct: number, prefix: string) => {
  const row = rows.find((r) => Math.abs(r.percentChange - pct) < 1e-9);
  if (!row) return '';
  const amt = '$' + Math.round(Math.abs(row.profitChange)).toLocaleString('en-US');
  return `${prefix} ${pct}% = ${amt} ${row.profitChange <= 0 ? 'loss' : 'gain'}`;
};
