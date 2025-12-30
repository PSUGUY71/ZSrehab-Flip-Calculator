import { LoanInputs, CalculatedResults, ProfitScenario } from '../types';

export const calculateLoan = (inputs: LoanInputs): CalculatedResults => {
  const {
    purchasePrice,
    rehabBudget,
    arv,
    sellerConcessionRate,
    earnestMoneyDeposit,
    buyerAgentCommissionRate,
    interestRate,
    originationPoints,
    liquidity,
    ficoScore,
    experienceLevel,
    underwritingFee,
    processingFee,
    docPrepFee,
    wireFee,
    otherLenderFees,
    transferTaxRate,
    titleInsuranceRate,
    legalSettlementFees,
    recordingFees,
    walkerDocPrep,
    walkerOvernight,
    walkerWire,
    hideoutTransferFee,
    hideoutAnnualFee,
    roamingwoodAnnual,
    schoolTaxAnnual,
    closingDate,
    sqFt,
    // Profitability Inputs
    exitStrategy,
    holdingPeriodMonths,
    monthlyElectric,
    sellingCommissionRate,
    sellingTransferTaxRate,
    refinanceLTV,
    refinancePoints,
    refinanceFixedFees,
    // Seller Inputs
    sellerMortgageBalance,
    sellerLineOfCreditBalance,
    sellerAgentCommissionRate,
    sellerTransferTaxRate,
    sellerMiscFees
  } = inputs;

  // 1. Constants from PDF/RFG Rules
  const MAX_LTV_PERCENT = 0.75; // 75% of ARV

  // 2. Loan Sizing Logic
  const totalProjectCost = purchasePrice + rehabBudget;
  const maxLoanBasedOnARV = arv * MAX_LTV_PERCENT;
  
  // The Qualified Loan Amount is the lesser of Cost vs. ARV Limit
  const qualifiedLoanAmount = Math.min(totalProjectCost, maxLoanBasedOnARV);
  
  // Calculate Max Allowable Offer to maintain 100% funding (stay under 75% LTV)
  const maxAllowableOffer = maxLoanBasedOnARV - rehabBudget;
  
  // Gap / Down Payment
  const gapAmount = Math.max(0, totalProjectCost - qualifiedLoanAmount);
  
  const holdbackAmount = rehabBudget;
  const initialFundedAmount = qualifiedLoanAmount - holdbackAmount;

  // 3. Ratios & Metrics
  const ltv = (qualifiedLoanAmount / arv) * 100;
  const ltc = (qualifiedLoanAmount / totalProjectCost) * 100;

  const purchasePricePerSqFt = sqFt > 0 ? purchasePrice / sqFt : 0;
  const arvPerSqFt = sqFt > 0 ? arv / sqFt : 0;

  // 4. Lender Fees Calculation
  // Points are calculated on the Total Loan Amount (Qualified Loan Amount) per standard lending practice.
  const pointsCost = qualifiedLoanAmount * (originationPoints / 100);
  
  const totalLenderFees = 
    pointsCost + 
    underwritingFee + 
    processingFee + 
    wireFee + 
    docPrepFee +
    (otherLenderFees || 0);

  // 5. Date Proration Logic
  // Formula: DaysRemaining = DaysBetween(ClosingDate, December31OfSameYear) + 1
  let daysRemainingInYear = 0;
  if (closingDate) {
    const start = new Date(closingDate);
    const year = start.getFullYear();
    const end = new Date(year, 11, 31); // Dec 31
    
    // Normalize to midnight to avoid hours affecting calculation
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    const diffTime = end.getTime() - start.getTime();
    if (diffTime >= 0) {
        // Calculate days difference
        const daysBetween = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Add 1 as requested (inclusive)
        daysRemainingInYear = daysBetween + 1;
    }
  }

  // Prorate Annual Fees based on formula: DailyRate * DaysRemaining
  // DailyRate = AnnualFee / 365
  const hideoutProratedDues = (hideoutAnnualFee / 365) * daysRemainingInYear;
  const roamingwoodProrated = (roamingwoodAnnual / 365) * daysRemainingInYear;
  const schoolTaxProrated = (schoolTaxAnnual / 365) * daysRemainingInYear;

  // 6. Third Party Fees Calculation
  const transferTaxCost = purchasePrice * (transferTaxRate / 100);
  const titleInsuranceCost = purchasePrice * (titleInsuranceRate / 100);
  
  const totalWalkerFees = walkerDocPrep + walkerOvernight + walkerWire;

  const totalThirdPartyFees = 
    transferTaxCost + 
    titleInsuranceCost + 
    legalSettlementFees + 
    totalWalkerFees +
    recordingFees + 
    hideoutTransferFee + 
    hideoutProratedDues +
    roamingwoodProrated +
    schoolTaxProrated;

  // 7. Credits
  const sellerConcessionAmount = purchasePrice * (sellerConcessionRate / 100);
  const buyerAgentCommissionCredit = purchasePrice * (buyerAgentCommissionRate / 100);

  // 8. Total Costs
  const totalClosingCosts = totalLenderFees + totalThirdPartyFees;
  
  // Cash to close = Closing Costs + Gap - Seller Concessions - Earnest Money - Commission Credit
  // We do NOT clamp at 0 anymore, allowing negative values (Cash to Borrower)
  const totalCashToClose = totalClosingCosts + gapAmount - sellerConcessionAmount - earnestMoneyDeposit - buyerAgentCommissionCredit;

  // 9. Interest Calculations
  const annualInterest = qualifiedLoanAmount * (interestRate / 100);
  const monthlyPayment = annualInterest / 12;
  const perDiemInterest = annualInterest / 360;

  // 10. Profitability Analysis
  const totalMonthlyUtilities = monthlyElectric;
  const monthlyHoldingCost = monthlyPayment + totalMonthlyUtilities;
  const totalHoldingCosts = monthlyHoldingCost * holdingPeriodMonths;

  let totalExitCosts = 0;
  let refinanceLoanAmount = 0;

  if (exitStrategy === 'SELL') {
    const sellingCommission = arv * (sellingCommissionRate / 100);
    const sellingTransferTax = arv * (sellingTransferTaxRate / 100);
    totalExitCosts = sellingCommission + sellingTransferTax;
  } else {
    // REFINANCE STRATEGY
    // Loan Amount = 80% of ARV (Refi LTV)
    refinanceLoanAmount = arv * (refinanceLTV / 100);
    
    // Refi Costs (Based on PDF)
    // Points (2%) on the NEW Refi Loan Amount
    const refiPointsCost = refinanceLoanAmount * (refinancePoints / 100);
    
    // Fixed Lender Fees ($1795 from PDF)
    // No Third Party Fees included per request
    totalExitCosts = refiPointsCost + refinanceFixedFees;
  }

  // Total Project Outflow = Payoff Old Loan + Cash Invested (Closing Costs + Gap) + Holding Costs + Exit Costs
  // Note: Cash Invested includes the EMD (money out of pocket previously) + Cash To Close (money out of pocket now).
  // Total Buying Cost = Closing Costs + Gap - Concessions (Net Cost)
  
  const totalBuyingCosts = totalClosingCosts + gapAmount - sellerConcessionAmount;
  const totalProjectCostBasis = qualifiedLoanAmount + totalBuyingCosts + totalHoldingCosts + totalExitCosts;
  
  // Net Profit (Sell) = ARV - Total Cost Basis
  // Net Equity (Refi) = ARV - Total Cost Basis (This represents equity retained after paying everything)
  const netProfit = arv - totalProjectCostBasis;
  
  // Closing Table Profit = Net Profit + Holding Costs (Adding it back because we assume we don't count it for this metric)
  // Essentially: ARV - Payoff - BuyingCosts - SellingCosts
  const closingTableProfit = netProfit + totalHoldingCosts;

  // 1. Cash on Cash ROI (Total Cash Invested)
  const totalCashInvested = totalBuyingCosts + totalHoldingCosts;
  const roi = totalCashInvested > 0 ? (netProfit / totalCashInvested) * 100 : 0;
  
  // 2. Project ROI (Return on Cost)
  const projectRoi = totalProjectCostBasis > 0 ? (netProfit / totalProjectCostBasis) * 100 : 0;
  
  // 3. Net Margin (Return on Sales)
  const netMargin = arv > 0 ? (netProfit / arv) * 100 : 0;
  
  // 11. Scenarios Calculation
  const baselineFixedCosts = qualifiedLoanAmount + totalBuyingCosts + totalHoldingCosts;
  
  const scenarios: ProfitScenario[] = [];
  const deltas = [
      { label: '- $10k', val: -10000 }, 
      { label: 'Baseline', val: 0 }, 
      { label: '+ $10k', val: 10000 }, 
      { label: '+ $20k', val: 20000 }, 
      { label: '+ $30k', val: 30000 }
  ];

  deltas.forEach(d => {
      const simARV = arv + d.val;
      let simExitCosts = 0;
      
      if (exitStrategy === 'SELL') {
          simExitCosts = (simARV * (sellingCommissionRate / 100)) + (simARV * (sellingTransferTaxRate / 100));
      } else {
          // Refi Costs change because loan amount (80% LTV) changes with ARV
          const simRefiLoan = simARV * (refinanceLTV / 100);
          simExitCosts = (simRefiLoan * (refinancePoints / 100)) + refinanceFixedFees;
      }
      
      const simTotalCost = baselineFixedCosts + simExitCosts;
      const simProfit = simARV - simTotalCost;
      const simClosingProfit = simProfit + totalHoldingCosts;
      
      scenarios.push({
          label: d.label,
          arv: simARV,
          netProfit: simProfit,
          difference: simProfit - netProfit,
          closingTableProfit: simClosingProfit
      });
  });

  // 12. Proof of Funds / Liquidity Logic
  // Based on the specific formula provided by user:
  // Option A: Closing Cost + 25% of Rehab
  // Option B: Closing Cost + $15,000
  // Result: Greater of A or B
  
  // FIX: Include all closing costs (Lender + Third Party) + Gap + Per Diem Interest (Prepaids)
  // Also subtracting commission credit as it reduces cash needed.
  const liquidityClosingCosts = totalClosingCosts + gapAmount + perDiemInterest - buyerAgentCommissionCredit;
  
  const liquidityOptionA = liquidityClosingCosts + (rehabBudget * 0.25);
  const liquidityOptionB = liquidityClosingCosts + 15000;
  
  const requiredLiquidity = Math.max(liquidityOptionA, liquidityOptionB);

  // 13. Seller Analysis Logic
  const sellerCommissionCost = purchasePrice * (sellerAgentCommissionRate / 100);
  const sellerTransferTaxCost = purchasePrice * (sellerTransferTaxRate / 100);
  
  // Total costs seller pays to close
  const sellerTotalCostToClose = 
      sellerCommissionCost + 
      sellerTransferTaxCost + 
      sellerMiscFees + 
      sellerConcessionAmount; // This is a cost to the seller (credit to buyer)

  // Net Proceeds = Sale Price (Our Purchase Price) - Payoff - Costs
  const sellerNetProceeds = purchasePrice - sellerMortgageBalance - sellerLineOfCreditBalance - sellerTotalCostToClose;

  // 14. Eligibility Checks
  const eligibilityReasons: string[] = [];
  let isEligible = true;

  if (ficoScore < 650) {
    isEligible = false;
    eligibilityReasons.push("Credit Score below 650 minimum.");
  }
  
  if (ltv > 75) {
    isEligible = false;
    eligibilityReasons.push("LTV exceeds 75% program limit.");
  }

  if (liquidity < requiredLiquidity) {
    isEligible = false;
    eligibilityReasons.push(`Insufficient liquidity. Need $${requiredLiquidity.toLocaleString()}.`);
  }

  if (experienceLevel < 0) {
    isEligible = false;
    eligibilityReasons.push("Experience cannot be negative.");
  }

  return {
    maxLTVPercent: MAX_LTV_PERCENT * 100,
    maxLoanAmountDollars: maxLoanBasedOnARV,
    requestedLoanAmount: totalProjectCost,
    qualifiedLoanAmount,
    initialFundedAmount,
    holdbackAmount,
    maxAllowableOffer,
    ltv,
    ltc,
    
    // Metrics
    purchasePricePerSqFt,
    arvPerSqFt,
    
    // Lender Fees
    underwritingFee: underwritingFee,
    processingFee: processingFee,
    wireFee: wireFee,
    docPrepFee: docPrepFee,
    otherLenderFees: otherLenderFees || 0,
    pointsCost,
    totalLenderFees,

    // Third Party Fees
    transferTaxCost,
    titleInsuranceCost,
    legalSettlementCost: legalSettlementFees,
    recordingCost: recordingFees,
    
    // Walker
    totalWalkerFees,

    hideoutTransferCost: hideoutTransferFee,
    hideoutProratedDues,
    
    roamingwoodProrated,
    schoolTaxProrated,
    daysRemainingInYear,
    totalThirdPartyFees,

    // Credits
    sellerConcessionAmount,
    buyerAgentCommissionCredit,

    // General
    perDiemInterest,
    monthlyPayment,
    totalClosingCosts,
    totalCashToClose,
    gapAmount,
    requiredLiquidity,
    isEligible,
    eligibilityReasons,

    // Profitability
    totalHoldingCosts,
    totalExitCosts,
    netProfit,
    closingTableProfit,
    roi,
    projectRoi,
    netMargin,
    totalProjectCostBasis,
    totalCashInvested,
    profitScenarios: scenarios,

    // Refi
    refinanceLoanAmount,

    // Seller Analysis
    sellerNetProceeds,
    sellerTotalCostToClose,
    sellerCommissionCost,
    sellerTransferTaxCost,
    totalBuyingCosts
  };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatPercent = (val: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val / 100);
};