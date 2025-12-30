import { LoanInputs, LenderOption, CalculatedResults } from '../types';
import { calculateLoan } from './calculations';

export const calculateLoanForLender = (baseInputs: LoanInputs, baseResults: CalculatedResults, lender: LenderOption) => {
  const lenderInputs: LoanInputs = {
    ...baseInputs,
    interestRate: lender.interestRate,
    originationPoints: lender.originationPoints
  };

  const results = calculateLoan(lenderInputs);
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
