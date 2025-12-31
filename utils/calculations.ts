import { LoanInputs, CalculatedResults, ProfitScenario } from '../types';
import { calculatePATitleInsurance } from './pennsylvaniaTitleRates';

export const calculateLoan = (inputs: LoanInputs, maxLTVPercent: number = 0.75): CalculatedResults => {
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
    cplFee,
    numberOfEndorsements,
    legalSettlementFees,
    recordingFees,
    walkerDocPrep,
    walkerOvernight,
    walkerWire,
    hideoutTransferFee,
    hideoutAnnualFee,
    roamingwoodAnnual,
    schoolTaxAnnual,
    sewerWaterAnnual,
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
  const MAX_LTV_PERCENT = maxLTVPercent; // Use provided LTV percent (default 75%)

  // 2. Loan Sizing Logic
  const totalProjectCost = purchasePrice + rehabBudget;
  const maxLoanBasedOnARV = arv * MAX_LTV_PERCENT;
  
  // The Qualified Loan Amount is the lesser of Cost vs. ARV Limit
  const qualifiedLoanAmount = Math.min(totalProjectCost, maxLoanBasedOnARV);
  
  // Calculate Max Allowable Offer to maintain 100% funding (stay under selected LTV)
  const maxAllowableOffer = maxLoanBasedOnARV - rehabBudget;
  
  // Gap / Down Payment
  const gapAmount = Math.max(0, totalProjectCost - qualifiedLoanAmount);
  
  const holdbackAmount = rehabBudget;
  const initialFundedAmount = qualifiedLoanAmount - holdbackAmount;

  // 3. Ratios & Metrics
  const ltv = arv > 0 ? (qualifiedLoanAmount / arv) * 100 : 0;
  const ltc = totalProjectCost > 0 ? (qualifiedLoanAmount / totalProjectCost) * 100 : 0;

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
  // Different proration periods:
  // - City/town taxes (roamingwood): January through December (calendar year)
  // - School taxes: July through June (school year)
  // - Dues (hideout): January through December (calendar year)
  // - Sewer and water: Quarterly billing
  
  let daysRemainingInYear = 0; // For calendar year items (city/town taxes, dues)
  let daysRemainingInSchoolYear = 0; // For school taxes (July-June)
  let sewerWaterProrated = 0; // Quarterly proration
  
  if (closingDate) {
    const start = new Date(closingDate);
    start.setHours(0, 0, 0, 0);
    const year = start.getFullYear();
    const month = start.getMonth(); // 0-11 (Jan = 0, Dec = 11)
    
    // Calendar Year Proration (Jan-Dec): City/town taxes, Dues
    // Formula: DaysRemaining = DaysBetween(ClosingDate, December31OfSameYear) + 1
    const calendarYearEnd = new Date(year, 11, 31); // Dec 31
    calendarYearEnd.setHours(0, 0, 0, 0);
    
    const diffTime = calendarYearEnd.getTime() - start.getTime();
    if (diffTime >= 0) {
      const daysBetween = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysRemainingInYear = daysBetween + 1; // Inclusive
    }
    
    // School Year Proration (July-June): School taxes
    // If closing is Jan-Jun, prorate to June 30 of same year
    // If closing is Jul-Dec, prorate to June 30 of next year
    let schoolYearEnd: Date;
    if (month >= 6) { // July (6) through December (11)
      // Closing in Jul-Dec: prorate to June 30 of next year
      schoolYearEnd = new Date(year + 1, 5, 30); // June 30 of next year
    } else { // January (0) through June (5)
      // Closing in Jan-Jun: prorate to June 30 of same year
      schoolYearEnd = new Date(year, 5, 30); // June 30 of same year
    }
    schoolYearEnd.setHours(0, 0, 0, 0);
    
    const schoolYearDiffTime = schoolYearEnd.getTime() - start.getTime();
    if (schoolYearDiffTime >= 0) {
      const daysBetween = Math.ceil(schoolYearDiffTime / (1000 * 60 * 60 * 24));
      daysRemainingInSchoolYear = daysBetween + 1; // Inclusive
    }
    
    // Quarterly Proration: Sewer and Water
    // Quarters: Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec)
    // Calculate days remaining in the current quarter
    let quarterStart: Date;
    let quarterEnd: Date;
    if (month >= 0 && month <= 2) { // Q1: Jan-Mar
      quarterStart = new Date(year, 0, 1); // January 1
      quarterEnd = new Date(year, 2, 31); // March 31
    } else if (month >= 3 && month <= 5) { // Q2: Apr-Jun
      quarterStart = new Date(year, 3, 1); // April 1
      quarterEnd = new Date(year, 5, 30); // June 30
    } else if (month >= 6 && month <= 8) { // Q3: Jul-Sep
      quarterStart = new Date(year, 6, 1); // July 1
      quarterEnd = new Date(year, 8, 30); // September 30
    } else { // Q4: Oct-Dec
      quarterStart = new Date(year, 9, 1); // October 1
      quarterEnd = new Date(year, 11, 31); // December 31
    }
    quarterStart.setHours(0, 0, 0, 0);
    quarterEnd.setHours(0, 0, 0, 0);
    
    const quarterDiffTime = quarterEnd.getTime() - start.getTime();
    if (quarterDiffTime >= 0) {
      const daysBetween = Math.ceil(quarterDiffTime / (1000 * 60 * 60 * 24));
      const daysRemainingInQuarter = daysBetween + 1; // Inclusive
      // Calculate total days in quarter
      const quarterTotalTime = quarterEnd.getTime() - quarterStart.getTime();
      const daysInQuarter = Math.ceil(quarterTotalTime / (1000 * 60 * 60 * 24)) + 1;
      // Quarterly amount = Annual / 4, then prorate by days remaining
      const quarterlyAmount = (sewerWaterAnnual || 0) / 4;
      sewerWaterProrated = (quarterlyAmount / daysInQuarter) * daysRemainingInQuarter;
    }
  }

  // Prorate Annual Fees based on formula: DailyRate * DaysRemaining
  // City/town taxes (roamingwood): Calendar year (Jan-Dec)
  const roamingwoodProrated = ((roamingwoodAnnual || 0) / 365) * daysRemainingInYear;
  
  // Dues (hideout): Calendar year (Jan-Dec)
  const hideoutProratedDues = ((hideoutAnnualFee || 0) / 365) * daysRemainingInYear;
  
  // School taxes: School year (July-June)
  // Use 365 days for school year calculation (some years have 366, but 365 is standard)
  const schoolTaxProrated = ((schoolTaxAnnual || 0) / 365) * daysRemainingInSchoolYear;

  // 6. Third Party Fees Calculation
  const transferTaxCost = purchasePrice * (transferTaxRate / 100);
  
  // Title Insurance: Use PA Title Insurance Rate Table based on total loan amount (purchase + rehab)
  // Source: https://www.alphaadv.net/patitle/parate25.html
  const totalLoanAmount = purchasePrice + rehabBudget;
  const titleInsuranceCost = calculatePATitleInsurance(totalLoanAmount);
  
  // CPL fee is always $125 payable to Penn Attorneys (default if not specified)
  const cplFeeCost = cplFee || 125;
  
  // Endorsement fees are $100 per endorsement
  const endorsementCost = (numberOfEndorsements || 0) * 100;
  
  const totalWalkerFees = (walkerDocPrep || 0) + (walkerOvernight || 0) + (walkerWire || 0);

  const totalThirdPartyFees = 
    (transferTaxCost || 0) + 
    (titleInsuranceCost || 0) + 
    (cplFeeCost || 0) +
    (endorsementCost || 0) +
    (legalSettlementFees || 0) + 
    totalWalkerFees +
    (recordingFees || 0) + 
    (hideoutTransferFee || 0) + 
    (hideoutProratedDues || 0) +
    (roamingwoodProrated || 0) +
    (schoolTaxProrated || 0) +
    (sewerWaterProrated || 0);

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
  // ARV scenarios based on percentages: 60%, 65%, 70%, 75% of current ARV
  const arvPercentages = [
      { label: '60% ARV', percent: 0.60 }, 
      { label: '65% ARV', percent: 0.65 }, 
      { label: '70% ARV', percent: 0.70 }, 
      { label: '75% ARV', percent: 0.75 }
  ];

  // Calculate baseline scenario first
  const baselineARV = arv;
  let baselineExitCosts = 0;
  if (exitStrategy === 'SELL') {
      baselineExitCosts = (baselineARV * (sellingCommissionRate / 100)) + (baselineARV * (sellingTransferTaxRate / 100));
  } else {
      const baselineRefiLoan = baselineARV * (refinanceLTV / 100);
      baselineExitCosts = (baselineRefiLoan * (refinancePoints / 100)) + refinanceFixedFees;
  }
  const baselineTotalCost = baselineFixedCosts + baselineExitCosts;
  const baselineProfit = baselineARV - baselineTotalCost;
  const baselineClosingProfit = baselineProfit + totalHoldingCosts;

  scenarios.push({
      label: 'Baseline',
      arv: baselineARV,
      netProfit: baselineProfit,
      difference: 0,
      closingTableProfit: baselineClosingProfit
  });

  // Calculate percentage-based scenarios
  arvPercentages.forEach(p => {
      const simARV = arv * p.percent;
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
          label: p.label,
          arv: simARV,
          netProfit: simProfit,
          difference: simProfit - baselineProfit,
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
    cplFeeCost,
    endorsementCost,
    legalSettlementCost: legalSettlementFees,
    recordingCost: recordingFees,
    
    // Walker
    totalWalkerFees,

    hideoutTransferCost: hideoutTransferFee,
    hideoutProratedDues,
    
    roamingwoodProrated,
    schoolTaxProrated,
    sewerWaterProrated,
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
  if (isNaN(val) || !isFinite(val)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatPercent = (val: number) => {
  if (isNaN(val) || !isFinite(val)) {
    return '0.00%';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val / 100);
};