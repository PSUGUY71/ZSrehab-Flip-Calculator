import { LoanInputs, CalculatedResults } from '../types';

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

/**
 * Generate purchase price sensitivity analysis
 * Shows how profit changes when purchase price varies
 */
export function generatePurchaseSensitivity(
  basePurchasePrice: number,
  baseProfit: number,
  arv: number,
  baseRehabBudget: number,
  totalClosingCosts: number,
  totalHoldingCosts: number,
  totalExitCosts: number,
  financingPercent: number,
  maxLTVPercent: number = 0.75
): PurchaseSensitivityScenario[] {
  const scenarios = [-0.05, -0.02, 0, 0.05, 0.10, 0.15, 0.20];
  
  return scenarios.map(percent => {
    const adjustedPurchasePrice = basePurchasePrice * (1 + percent);
    
    // Calculate total project cost (purchase + rehab)
    const adjustedTotalProjectCost = adjustedPurchasePrice + baseRehabBudget;
    
    // Calculate loan amount based on financing percentage
    const loanByFinancing = adjustedTotalProjectCost * (financingPercent / 100);
    const loanByLTV = arv * maxLTVPercent;
    const adjustedLoan = Math.min(loanByFinancing, loanByLTV);
    
    // Calculate gap (down payment) - only for purchase price portion
    const purchaseLoanPortion = Math.min(adjustedPurchasePrice * (financingPercent / 100), adjustedLoan);
    const adjustedGap = Math.max(0, adjustedPurchasePrice - purchaseLoanPortion);
    
    // Total buying costs = closing costs + gap
    // Note: Closing costs may change slightly with purchase price (transfer tax, etc.)
    // For simplicity, we'll keep closing costs constant and only adjust gap
    const adjustedBuyingCosts = totalClosingCosts + adjustedGap;
    
    // Total project cost basis = loan + buying costs + holding costs + exit costs
    // Note: Loan already includes purchase price and rehab budget (up to financing %)
    const adjustedTotalCostBasis = adjustedLoan + adjustedBuyingCosts + totalHoldingCosts + totalExitCosts;
    
    // Net profit = ARV - total cost basis
    const adjustedProfit = arv - adjustedTotalCostBasis;
    
    const profitChange = adjustedProfit - baseProfit;
    const margin = arv > 0 ? (adjustedProfit / arv) * 100 : 0;
    
    let label: string;
    if (percent > 0) {
      label = `Over ${(percent * 100).toFixed(0)}%`;
    } else if (percent < 0) {
      label = `Under ${Math.abs(percent * 100).toFixed(0)}%`;
    } else {
      label = 'At Price';
    }
    
    return {
      label,
      purchasePrice: adjustedPurchasePrice,
      percentChange: percent * 100,
      profit: adjustedProfit,
      profitChange,
      margin,
      isBelowThreshold: margin < 15
    };
  });
}

/**
 * Generate rehab cost sensitivity analysis
 * Shows how profit changes when rehab costs vary
 */
export function generateRehabSensitivity(
  baseRehabBudget: number,
  baseProfit: number,
  arv: number,
  purchasePrice: number,
  totalClosingCosts: number,
  gapAmount: number,
  totalHoldingCosts: number,
  totalExitCosts: number,
  financingPercent: number,
  maxLTVPercent: number = 0.75
): RehabSensitivityScenario[] {
  const scenarios = [-0.20, -0.10, -0.05, 0, 0.10, 0.20, 0.30];
  
  return scenarios.map(percent => {
    const adjustedRehabBudget = baseRehabBudget * (1 + percent);
    
    // Calculate total project cost (purchase + adjusted rehab)
    const adjustedTotalProjectCost = purchasePrice + adjustedRehabBudget;
    
    // Calculate loan amount based on financing percentage
    const loanByFinancing = adjustedTotalProjectCost * (financingPercent / 100);
    const loanByLTV = arv * maxLTVPercent;
    const adjustedLoan = Math.min(loanByFinancing, loanByLTV);
    
    // Total buying costs = closing costs + gap (gap doesn't change with rehab)
    const totalBuyingCosts = totalClosingCosts + gapAmount;
    
    // Total project cost basis = loan + buying costs + holding costs + exit costs
    // Note: Loan already includes purchase price and rehab budget (up to financing %)
    const adjustedTotalCostBasis = adjustedLoan + totalBuyingCosts + totalHoldingCosts + totalExitCosts;
    
    // Net profit = ARV - total cost basis
    const adjustedProfit = arv - adjustedTotalCostBasis;
    
    const profitChange = adjustedProfit - baseProfit;
    const margin = arv > 0 ? (adjustedProfit / arv) * 100 : 0;
    
    let label: string;
    if (percent > 0) {
      label = `Over ${(percent * 100).toFixed(0)}%`;
    } else if (percent < 0) {
      label = `Under ${Math.abs(percent * 100).toFixed(0)}%`;
    } else {
      label = 'At Budget';
    }
    
    return {
      label,
      rehabCost: adjustedRehabBudget,
      percentChange: percent * 100,
      profit: adjustedProfit,
      profitChange,
      margin,
      isBelowThreshold: margin < 15
    };
  });
}

