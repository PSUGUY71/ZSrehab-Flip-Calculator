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
  
  // The qualifiedLoanAmount should respect all three constraints:
  // 1. Financing percentage (already handled in calculateLoan via financingPercent)
  // 2. Max ARV percentage (already handled via lenderMaxARVPercent)
  // 3. Max loan-to-cost percentage (need to apply here)
  const originalLoanAmount = results.qualifiedLoanAmount;
  if (originalLoanAmount > maxLoanByLTC) {
    // Adjust the loan amount to respect lender's max LTC
    results.qualifiedLoanAmount = maxLoanByLTC;
    // Recalculate points cost based on adjusted loan amount
    results.pointsCost = maxLoanByLTC * (lender.originationPoints / 100);
    // Recalculate monthly payment
    const annualInterest = maxLoanByLTC * (lender.interestRate / 100);
    results.monthlyPayment = annualInterest / 12;
    // Recalculate gap amount: down payment on purchase price based on financing percentage
    // Gap is specifically for purchase price, so use financing % directly
    // But also respect max LTC if it's more restrictive than financing %
    const maxLoanForPurchaseByLTC = baseInputs.purchasePrice * (lenderMaxLoanToCostPercent / 100);
    const loanForPurchaseByFinancing = baseInputs.purchasePrice * (lenderFinancingPercent / 100);
    const loanForPurchasePrice = Math.min(loanForPurchaseByFinancing, maxLoanForPurchaseByLTC);
    results.gapAmount = Math.max(0, baseInputs.purchasePrice - loanForPurchasePrice);
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
