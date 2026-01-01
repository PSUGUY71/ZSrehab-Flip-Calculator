import { LoanInputs, CalculatedResults, ProfitScenario } from '../types';
import { calculatePATitleInsurance } from './pennsylvaniaTitleRates';

export const calculateLoan = (inputs: LoanInputs, maxLTVPercent: number = 0.75): CalculatedResults => {
  const {
    purchasePrice,
    rehabBudget,
    arv,
    financingPercentage,
    useCustomFinancing,
    customFinancingPercentage,
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
  
  // Get financing percentage (use custom if enabled, otherwise use selected percentage)
  const financingPercent = useCustomFinancing 
    ? customFinancingPercentage 
    : financingPercentage;
  
  // Calculate loan amount based on financing percentage
  // Loan amount = min(Total Cost × Financing%, ARV × LTV%)
  // This ensures loan doesn't exceed ARV limit, but respects financing percentage
  const loanAmountByFinancing = totalProjectCost * (financingPercent / 100);
  const qualifiedLoanAmount = Math.min(loanAmountByFinancing, maxLoanBasedOnARV);
  
  // Calculate Max Allowable Offer to maintain 100% funding (stay under selected LTV)
  const maxAllowableOffer = maxLoanBasedOnARV - rehabBudget;
  
  // 70% Rule: Maximum Purchase Price = (ARV × 0.70) - Rehab Budget
  // This is a common house flipping rule to ensure profitability
  const maxPurchasePrice70Rule = (arv * 0.70) - rehabBudget;
  const passes70Rule = purchasePrice <= maxPurchasePrice70Rule;
  
  // Gap / Down Payment
  // Gap = Purchase Price - (Purchase Price × Financing %)
  // This represents the cash down payment needed for the purchase price only
  // Example: Purchase $100k at 80% financing = $20k gap
  const loanForPurchasePrice = purchasePrice * (financingPercent / 100);
  const gapAmount = Math.max(0, purchasePrice - loanForPurchasePrice);
  
  const holdbackAmount = rehabBudget;
  const initialFundedAmount = qualifiedLoanAmount - holdbackAmount;

  // 3. Ratios & Metrics
  const ltv = arv > 0 ? (qualifiedLoanAmount / arv) * 100 : 0;
  // LTC = Loan Amount / Total Project Cost
  // Total Project Cost = Purchase Price + Rehab Budget
  // qualifiedLoanAmount = min(totalProjectCost, maxLoanBasedOnARV)
  // If totalProjectCost <= maxLoanBasedOnARV: qualifiedLoanAmount = totalProjectCost, so LTC = 100%
  // If maxLoanBasedOnARV < totalProjectCost: qualifiedLoanAmount = maxLoanBasedOnARV, so LTC < 100%
  const ltc = totalProjectCost > 0 ? (qualifiedLoanAmount / totalProjectCost) * 100 : 0;
  const ltarv = arv > 0 ? (qualifiedLoanAmount / arv) * 100 : 0; // Loan-to-After-Repair-Value (same as LTV for clarity)

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
  const monthlyInterestPayment = monthlyPayment;
  const monthlyUtilitiesCost = totalMonthlyUtilities;
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
  // ARV scenarios based on dollar amounts: -10k, baseline, +10k, +20k, +30k
  const arvVariations = [
      { label: '-$10k', amount: -10000 }, 
      { label: '+$10k', amount: 10000 }, 
      { label: '+$20k', amount: 20000 }, 
      { label: '+$30k', amount: 30000 }
  ];

  // Calculate baseline scenario first (current deal's actual ARV)
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

  // Calculate -$10k scenario first (before baseline)
  const minus10kARV = baselineARV - 10000;
  let minus10kExitCosts = 0;
  if (exitStrategy === 'SELL') {
      minus10kExitCosts = (minus10kARV * (sellingCommissionRate / 100)) + (minus10kARV * (sellingTransferTaxRate / 100));
  } else {
      const minus10kRefiLoan = minus10kARV * (refinanceLTV / 100);
      minus10kExitCosts = (minus10kRefiLoan * (refinancePoints / 100)) + refinanceFixedFees;
  }
  const minus10kTotalCost = baselineFixedCosts + minus10kExitCosts;
  const minus10kProfit = minus10kARV - minus10kTotalCost;
  const minus10kClosingProfit = minus10kProfit + totalHoldingCosts;

  scenarios.push({
      label: '-$10k',
      arv: minus10kARV,
      netProfit: minus10kProfit,
      difference: minus10kProfit - baselineProfit,
      closingTableProfit: minus10kClosingProfit
  });

  // Add baseline scenario
  scenarios.push({
      label: 'Baseline',
      arv: baselineARV,
      netProfit: baselineProfit,
      difference: 0,
      closingTableProfit: baselineClosingProfit
  });

  // Calculate remaining dollar-amount-based scenarios (+10k, +20k, +30k)
  arvVariations.slice(1).forEach(v => {
      const simARV = baselineARV + v.amount;
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
          label: v.label,
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

  // 15. Work-Backward Mode Calculation
  // Calculate max purchase price based on target ROI or LTC
  let workBackwardMaxOffer = 0;
  
  if (inputs.useWorkBackwardMode && arv > 0) {
    if (inputs.workBackwardModeType === 'LTC' && inputs.targetLTC > 0) {
      // LTC-based: Target LTC% = (Loan Amount / Total Project Cost) * 100
      // Loan Amount = min(Total Project Cost, ARV * LTV%)
      // If we want a specific LTC%, solve for Purchase Price:
      // Target LTC = (ARV * LTV% / (Purchase Price + Rehab Budget)) * 100
      // Purchase Price = (ARV * LTV% / (Target LTC / 100)) - Rehab Budget
      const targetLTCDecimal = inputs.targetLTC / 100;
      const maxLoanAtARV = arv * MAX_LTV_PERCENT;
      
      // Calculate purchase price that would give us the target LTC
      // We need: LTC = Loan Amount / (Purchase Price + Rehab Budget)
      // Loan Amount = min(Purchase Price + Rehab Budget, ARV * LTV%)
      // If ARV * LTV% is the limiting factor:
      if (maxLoanAtARV / targetLTCDecimal >= rehabBudget) {
        workBackwardMaxOffer = (maxLoanAtARV / targetLTCDecimal) - rehabBudget;
      } else {
        // If cost is limiting, we can't achieve target LTC with this ARV
        workBackwardMaxOffer = 0;
      }
    } else if (inputs.workBackwardModeType === 'ROI' && inputs.targetRoi > 0) {
      // ROI-based: This is more complex as costs depend on purchase price
      // We'll use an iterative approximation
      // Target ROI = (Net Profit / Total Cash Invested) * 100
      // Net Profit = ARV - Total Project Cost Basis
      // Total Cash Invested = Total Buying Costs + Total Holding Costs
      
      // Simplified approach: Use a binary search or approximation
      // For now, use a simplified formula that estimates based on fixed costs
      // This is an approximation - a full implementation would iterate
      
      // Estimate: Net Profit needed = Target ROI% * Total Cash Invested
      // We'll use current deal structure as baseline and adjust
      // This is a simplified calculation - for accuracy, would need iteration
      
      // Approximate: If we assume costs scale roughly with purchase price,
      // we can estimate: Purchase Price ≈ (ARV - Fixed Costs - (Target ROI% * Estimated Cash)) / (1 + Cost Multiplier)
      // For MVP, we'll use a simpler heuristic based on 70% rule adjusted for ROI
      const estimatedCostMultiplier = 1.15; // Rough estimate of how costs scale
      const estimatedFixedCosts = totalHoldingCosts + totalExitCosts; // Costs that don't depend on purchase price
      const targetNetProfit = (inputs.targetRoi / 100) * (estimatedFixedCosts + (rehabBudget * 0.25)); // Rough estimate
      const estimatedMaxPurchasePrice = (arv - estimatedFixedCosts - targetNetProfit) / estimatedCostMultiplier;
      
      // Ensure it's reasonable (not negative, not above ARV)
      workBackwardMaxOffer = Math.max(0, Math.min(estimatedMaxPurchasePrice, arv * 0.8));
    }
  }

  return {
    maxLTVPercent: MAX_LTV_PERCENT * 100,
    maxLoanAmountDollars: maxLoanBasedOnARV,
    requestedLoanAmount: totalProjectCost,
    qualifiedLoanAmount,
    initialFundedAmount,
    holdbackAmount,
    maxAllowableOffer,
    maxPurchasePrice70Rule,
    passes70Rule,
    workBackwardMaxOffer,
    ltv,
    ltc,
    ltarv,
    
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
    monthlyHoldingCost,
    monthlyInterestPayment,
    monthlyUtilitiesCost,
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