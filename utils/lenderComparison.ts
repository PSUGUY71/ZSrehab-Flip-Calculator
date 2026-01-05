import { LoanInputs, LenderOption, CalculatedResults } from '../types';
import { calculateLoan } from './calculations';

export const calculateLoanForLender = (baseInputs: LoanInputs, baseResults: CalculatedResults, lender: LenderOption) => {
  // Use lender-specific financing terms if provided, otherwise use base inputs
  const lenderFinancingPercent = lender.useCustomFinancing 
    ? (lender.customFinancingPercentage || 100)
    : (lender.financingPercentage || baseInputs.financingPercentage || 100);
  
  const lenderMaxARVPercent = (lender.maxARVPercent || 75) / 100; // Convert percentage to decimal
  const lenderMaxLoanToCostPercent = lender.maxLoanToCostPercent || 100;

  const lenderInputs: LoanInputs = {
    ...baseInputs,
    interestRate: lender.interestRate,
    originationPoints: lender.originationPoints,
    financingPercentage: lenderFinancingPercent,
    useCustomFinancing: lender.useCustomFinancing || false,
    customFinancingPercentage: lender.customFinancingPercentage || lenderFinancingPercent,
  };

  // Calculate with lender-specific max ARV percentage
  const results = calculateLoan(lenderInputs, lenderMaxARVPercent);
  
  // Apply max loan-to-cost constraint if lender has one
  const totalProjectCost = baseInputs.purchasePrice + baseInputs.rehabBudget;
  const maxLoanByLTC = totalProjectCost * (lenderMaxLoanToCostPercent / 100);
  const maxLoanByARV = baseInputs.arv * lenderMaxARVPercent;
  
  // The qualifiedLoanAmount should respect all three constraints:
  // 1. Financing percentage (already handled in calculateLoan via financingPercent)
  // 2. Max ARV percentage (already handled via lenderMaxARVPercent)
  // 3. Max loan-to-cost percentage (need to apply here)
  // Final loan amount = min(all constraints)
  const originalLoanAmount = results.qualifiedLoanAmount;
  const finalLoanAmount = Math.min(originalLoanAmount, maxLoanByLTC, maxLoanByARV);
  
  if (originalLoanAmount !== finalLoanAmount) {
    // Adjust the loan amount to respect all constraints
    results.qualifiedLoanAmount = finalLoanAmount;
    // Recalculate points cost based on adjusted loan amount
    results.pointsCost = finalLoanAmount * (lender.originationPoints / 100);
    // Recalculate monthly payment (30-year amortized)
    const L = finalLoanAmount; // Loan amount
    const r = lender.interestRate / 12 / 100; // Monthly rate as decimal
    const n = 360; // 30-year loan term (30 × 12 = 360 months)
    const denominator = 1 - Math.pow(1 + r, -n);
    results.monthlyPayment = L * (r / denominator);
    // Recalculate gap amount: down payment on purchase price based on financing percentage
    // Gap is specifically for purchase price, so use financing % directly
    // But also respect max LTC if it's more restrictive than financing %
    const maxLoanForPurchaseByLTC = baseInputs.purchasePrice * (lenderMaxLoanToCostPercent / 100);
    const loanForPurchaseByFinancing = baseInputs.purchasePrice * (lenderFinancingPercent / 100);
    const loanForPurchasePrice = Math.min(loanForPurchaseByFinancing, maxLoanForPurchaseByLTC, baseInputs.purchasePrice * lenderMaxARVPercent);
    results.gapAmount = Math.max(0, baseInputs.purchasePrice - loanForPurchasePrice);
    
    // Recalculate LTV, LTC, and LTARV with the adjusted loan amount
    const propertyValue = baseInputs.asIsValue > 0 ? baseInputs.asIsValue : baseInputs.purchasePrice;
    results.ltv = propertyValue > 0 ? (finalLoanAmount / propertyValue) * 100 : 0;
    results.ltc = totalProjectCost > 0 ? (finalLoanAmount / totalProjectCost) * 100 : 0;
    results.ltarv = baseInputs.arv > 0 ? (finalLoanAmount / baseInputs.arv) * 100 : 0;
  }
  const holdMonths = baseInputs.holdingPeriodMonths;

  let comparisonLoanAmount = results.qualifiedLoanAmount;
  let comparisonPointsCost = results.pointsCost;
  let comparisonMonthlyPayment = results.monthlyPayment;

  if (lender.loanAmountOverride > 0) {
    comparisonLoanAmount = lender.loanAmountOverride;
    comparisonPointsCost = comparisonLoanAmount * (lender.originationPoints / 100);
    
    // interest only style matching existing app's monthlyPayment logic
    const annualInterest = comparisonLoanAmount * (lender.interestRate / 100);
    comparisonMonthlyPayment = annualInterest / 12;
    
    // Recalculate LTV, LTC, and LTARV with the override loan amount
    const propertyValue = baseInputs.asIsValue > 0 ? baseInputs.asIsValue : baseInputs.purchasePrice;
    results.ltv = propertyValue > 0 ? (comparisonLoanAmount / propertyValue) * 100 : 0;
    const totalProjectCost = baseInputs.purchasePrice + baseInputs.rehabBudget;
    results.ltc = totalProjectCost > 0 ? (comparisonLoanAmount / totalProjectCost) * 100 : 0;
    results.ltarv = baseInputs.arv > 0 ? (comparisonLoanAmount / baseInputs.arv) * 100 : 0;
    
    // Also update qualifiedLoanAmount to match override for consistency
    results.qualifiedLoanAmount = comparisonLoanAmount;
  }

  const lenderUpfrontFeesAdjusted = 
    comparisonPointsCost + 
    lender.underwritingFee + 
    lender.processingFee + 
    lender.docPrepFee + 
    lender.wireFee + 
    lender.otherFees;

  const baselineUpfrontFees = 
    baseResults.pointsCost + 
    baseResults.underwritingFee + 
    baseResults.processingFee + 
    baseResults.docPrepFee + 
    baseResults.wireFee;

  const lenderFeesDeltaVsBase = lenderUpfrontFeesAdjusted - baselineUpfrontFees;
  const monthlyPaymentDeltaVsBase = comparisonMonthlyPayment - baseResults.monthlyPayment;

  const totalCostOverHoldDeltaVsBase = 
    (lenderUpfrontFeesAdjusted + comparisonMonthlyPayment * holdMonths) - 
    (baselineUpfrontFees + baseResults.monthlyPayment * holdMonths);

  return {
    ...results,
    lenderUpfrontFeesAdjusted,
    lenderFeesDeltaVsBase,
    monthlyPaymentDeltaVsBase,
    totalCostOverHoldDeltaVsBase,
    comparisonLoanAmount,
    comparisonMonthlyPayment
  };
};
