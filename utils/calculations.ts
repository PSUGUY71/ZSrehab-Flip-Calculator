import { LoanInputs, CalculatedResults, ProfitScenario } from '../types';
import { generatePurchaseSensitivity, generateRehabSensitivity } from './sensitivityAnalysis';
import { calculatePATitleInsurance } from './pennsylvaniaTitleRates';
import { calculateFlipIRR, formatIRR } from './irrCalculation';

export const calculateLoan = (inputs: LoanInputs, maxLTVPercent: number = 0.75): CalculatedResults => {
  const {
    appVersion,
    purchasePrice,
    appraised_value,
    rehabBudget,
    arv,
    financingPercentage,
    useCustomFinancing,
    customFinancingPercentage,
    sellerConcessionRate,
    sellerBuyBackAmount,
    earnestMoneyDeposit,
    buyerAgentCommissionRate,
    buyerAgentCommissionBrokerRate,
    loanType,
    interestRate,
    originationPoints,
    loanTermMonths,
    includePITI,
    monthlyPITITaxes,
    monthlyPITIInsurance,
    includePMI,
    monthlyPMI,
    prepaymentPenalty,
    prepaymentPenaltyAmount,
    interestOnly,
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
    inspectionCost,
    appraisalCost,
    insuranceCost,
    surveyFee,
    pestInspectionCost,
    creditReportFee,
    floodDeterminationFee,
    otherThirdPartyFees,
    walkerDocPrep,
    walkerOvernight,
    walkerWire,
    hideoutTransferFee,
    hideoutAnnualFee,
    titleCompanyCharges,
    roamingwoodAnnual,
    schoolTaxAnnual,
    sewerWaterAnnual,
    closingDate,
    sqFt,
    // Profitability Inputs
    exitStrategy,
    holdingPeriodMonths,
    monthlyElectric,
    monthlyInternet,
    monthlyPropane,
    includeMonthlyInsurance,
    monthlyInsurance,
    includeMonthlyTaxes,
    monthlyTaxes,
    includeYearlyWater,
    yearlyWater,
    includeYearlyDues,
    yearlyDues,
    sellingCommissionRate,
    sellingTransferTaxRate,
    weAreTheRealEstateAgent,
    sellingCommissionBrokerRate,
    sellingSellerAgentCommissionRate,
    sellingBuyerAgentCommissionRate,
    sellingSellerAgentBrokerRate,
    refinanceLTV,
    refinancePoints,
    refinanceFixedFees,
    // Seller Inputs
    sellerMortgageBalance,
    sellerLineOfCreditBalance,
    sellerAgentCommissionRate,
    sellerTransferTaxRate,
    sellerMiscFees,
    capitalGainsTaxRate,
    showAfterTaxProfit
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
  // Gap = Purchase Price - (Purchase Price × Financing %) - EMD - Seller Buy Back Amount
  // This represents the cash down payment needed for the purchase price only
  // EMD (Earnest Money Deposit) reduces the down payment (already paid at offer stage)
  // Seller Buy Back Amount reduces the down payment (seller holds note/finances part)
  // Example: Purchase $100k at 80% financing with $5k EMD and $5k seller buy back = $10k gap
  const loanForPurchasePrice = purchasePrice * (financingPercent / 100);
  const gapAmount = Math.max(0, purchasePrice - loanForPurchasePrice - (earnestMoneyDeposit || 0) - (sellerBuyBackAmount || 0));
  
  const holdbackAmount = rehabBudget;
  const initialFundedAmount = qualifiedLoanAmount - holdbackAmount;

  // 3. Ratios & Metrics
  // LTV = Loan-to-Value = Loan Amount / Appraised Value (lender standard)
  // Use appraised_value if provided; otherwise fall back to purchase price
  const valueForLTV = appraised_value > 0 ? appraised_value : purchasePrice;
  const ltv = valueForLTV > 0 ? (qualifiedLoanAmount / valueForLTV) * 100 : 0;
  
  // LTC = Loan-to-Cost = Loan Amount / Total Project Cost
  // Total Project Cost = Purchase Price + Rehab Budget
  // Calculate actual LTC based on financing percentage (uncapped)
  const actualLTC = totalProjectCost > 0 ? (loanAmountByFinancing / totalProjectCost) * 100 : 0;
  // Capped LTC based on qualified loan amount (for reference)
  const cappedLTC = totalProjectCost > 0 ? (qualifiedLoanAmount / totalProjectCost) * 100 : 0;
  // Use actual LTC (uncapped) as the main LTC value
  const ltc = actualLTC;
  
  // LTARV = Loan-to-After-Repair-Value = Loan Amount / ARV
  // This shows the actual percentage based on financing percentage, not capped at 75%
  // Calculate actual LTARV based on financing percentage loan amount (not the capped qualified amount)
  const actualLoanAmountForLTARV = loanAmountByFinancing; // Use financing-based loan, not capped
  const ltarv = arv > 0 ? (actualLoanAmountForLTARV / arv) * 100 : 0;
  
  // Also calculate the capped LTARV for reference (what the actual qualified loan gives)
  const cappedLTARV = arv > 0 ? (qualifiedLoanAmount / arv) * 100 : 0;

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
  // If titleInsuranceRate is provided (non-zero), use manual calculation instead of chart
  const totalLoanAmount = purchasePrice + rehabBudget;
  let titleInsuranceCost = 0;
  if (titleInsuranceRate && titleInsuranceRate > 0) {
    // Manual override: use percentage rate
    titleInsuranceCost = totalLoanAmount * (titleInsuranceRate / 100);
  } else {
    // Default: use PA Title Insurance Rate Table chart
    titleInsuranceCost = calculatePATitleInsurance(totalLoanAmount);
  }
  
  // Hideout Transfer Fee: Use PA Title Insurance Rate Table chart based on purchase price
  // This uses the same chart as title insurance
  // NOTE: Hideout Transfer is ONLY for HIDEOUT version, not NORMAL
  let calculatedHideoutTransferFee = 0;
  if (appVersion !== 'NORMAL') {
    if (hideoutTransferFee && hideoutTransferFee > 0) {
      // Manual override: use provided value
      calculatedHideoutTransferFee = hideoutTransferFee;
    } else {
      // Default: use PA Title Insurance Rate Table chart based on purchase price
      calculatedHideoutTransferFee = calculatePATitleInsurance(purchasePrice);
    }
  }
  
  // For NORMAL version, also zero out hideout prorated dues
  const finalHideoutProratedDues = appVersion === 'NORMAL' ? 0 : hideoutProratedDues;
  
  // CPL fee is always $125 payable to Penn Attorneys (default if not specified)
  const cplFeeCost = cplFee || 125;
  
  // Endorsement fees are $100 per endorsement
  const endorsementCost = (numberOfEndorsements || 0) * 100;
  
  const totalWalkerFees = (walkerDocPrep || 0) + (walkerOvernight || 0) + (walkerWire || 0);
  
  // Title company charges (for non-HIDEOUT versions)
  const titleCompanyChargesAmount = titleCompanyCharges || 0;

  // Inspection and Appraisal are prepaid before closing, not included in closing costs
  // Note: Walker fees, Hideout Transfer, Dues, and Sewer & Water are only used in HIDEOUT version
  // They will be 0 for NORMAL version (enforced by version checks above)
  const totalThirdPartyFees = 
    (transferTaxCost || 0) + 
    (titleInsuranceCost || 0) + 
    (cplFeeCost || 0) +
    (endorsementCost || 0) +
    (legalSettlementFees || 0) + 
    totalWalkerFees + // Only non-zero in HIDEOUT version
    titleCompanyChargesAmount + // Only non-zero in non-HIDEOUT versions
    (recordingFees || 0) + 
    (insuranceCost || 0) + // Insurance is due at closing
    (surveyFee || 0) + // Property survey fee
    (pestInspectionCost || 0) + // Termite/pest inspection
    (creditReportFee || 0) + // Credit report fee
    (floodDeterminationFee || 0) + // Flood zone determination
    (otherThirdPartyFees || 0) + // Other 3rd party fees
    (calculatedHideoutTransferFee || 0) + // Only non-zero in HIDEOUT version (version checked)
    (finalHideoutProratedDues || 0) + // Only non-zero in HIDEOUT version (version checked)
    (roamingwoodProrated || 0) +
    (schoolTaxProrated || 0) +
    (sewerWaterProrated || 0); // Only non-zero in HIDEOUT version
  
  // Prepaid costs (paid before closing)
  const prepaidCosts = (inspectionCost || 0) + (appraisalCost || 0) + (earnestMoneyDeposit || 0);

  // 7. Credits
  const sellerConcessionAmount = purchasePrice * (sellerConcessionRate / 100);
  // Buyer Agent Commission Credit: If you're the agent, you get commission minus broker split
  // Example: $7k commission, 35% to broker = $4,550 net credit to you
  const totalBuyerAgentCommission = purchasePrice * (buyerAgentCommissionRate / 100);
  const buyerAgentBrokerPortion = totalBuyerAgentCommission * ((buyerAgentCommissionBrokerRate || 0) / 100);
  const buyerAgentCommissionCredit = totalBuyerAgentCommission - buyerAgentBrokerPortion;

  // 8. Total Costs
  const totalClosingCosts = totalLenderFees + totalThirdPartyFees;
  
  // Cash to close = Closing Costs + Gap - Seller Concessions - Earnest Money - Commission Credit
  // We do NOT clamp at 0 anymore, allowing negative values (Cash to Borrower)
  // Note: Seller Buy Back Amount is already subtracted from gapAmount above
  const totalCashToClose = totalClosingCosts + gapAmount - sellerConcessionAmount - earnestMoneyDeposit - buyerAgentCommissionCredit;

  // 9. Interest Calculations
  // Use qualifiedLoanAmount (the actual loan amount that will be funded) for payment calculations
  const annualInterest = qualifiedLoanAmount * (interestRate / 100);
  
  // Monthly Payment Calculation (varies by loan type)
  let monthlyPayment = 0;
  let monthlyPrincipalAndInterest = 0;
  
  if (interestRate > 0 && qualifiedLoanAmount > 0) {
    const L = qualifiedLoanAmount; // Actual loan amount that will be funded
    const r = interestRate / 12 / 100; // Monthly rate as decimal
    
    if (loanType === 'HARD_MONEY') {
      // Hard Money: Interest-only payments
      monthlyPrincipalAndInterest = annualInterest / 12;
      monthlyPayment = monthlyPrincipalAndInterest;
    } else if (loanType === 'CONVENTIONAL') {
      // Conventional: Amortized payments (typically 30-year term)
      const n = loanTermMonths > 0 ? loanTermMonths : 360; // Use loan term or default to 30 years
      
      // Payment = L × r ÷ (1 − (1 + r)^−n)
      const denominator = 1 - Math.pow(1 + r, -n);
      if (denominator > 0) {
        monthlyPrincipalAndInterest = L * (r / denominator);
      } else {
        // Fallback to interest-only if denominator is invalid
        monthlyPrincipalAndInterest = annualInterest / 12;
      }
      
      // Add PITI (Principal, Interest, Taxes, Insurance) if included
      if (includePITI) {
        monthlyPayment = monthlyPrincipalAndInterest + (monthlyPITITaxes || 0) + (monthlyPITIInsurance || 0);
      } else {
        monthlyPayment = monthlyPrincipalAndInterest;
      }
      
      // Add PMI (Private Mortgage Insurance) if required
      if (includePMI && monthlyPMI > 0) {
        monthlyPayment += monthlyPMI;
      }
    } else {
      // Portfolio or Other: Typically amortized, but can vary
      // Default to amortized with specified term
      const n = loanTermMonths > 0 ? loanTermMonths : 360;
      const denominator = 1 - Math.pow(1 + r, -n);
      if (denominator > 0) {
        monthlyPrincipalAndInterest = L * (r / denominator);
      } else {
        monthlyPrincipalAndInterest = annualInterest / 12;
      }
      monthlyPayment = monthlyPrincipalAndInterest;
    }
  } else {
    // Fallback to interest-only if zero interest or zero loan
    monthlyPrincipalAndInterest = annualInterest / 12;
    monthlyPayment = monthlyPrincipalAndInterest;
  }
  
  const perDiemInterest = annualInterest / 360;

  // 10. Profitability Analysis
  // Calculate total monthly utilities and optional costs
  const totalMonthlyUtilities = monthlyElectric + 
    monthlyInternet + 
    monthlyPropane + 
    (includeMonthlyInsurance ? monthlyInsurance : 0) + 
    (includeMonthlyTaxes ? monthlyTaxes : 0);
  
  // Calculate yearly costs (one-time costs added to grand total)
  const yearlyWaterCost = includeYearlyWater ? yearlyWater : 0;
  const yearlyDuesCost = includeYearlyDues ? yearlyDues : 0;
  
  // Calculate monthly interest based on progressive draws
  // For hard money: Interest-only payments based on drawn amount
  // For conventional/portfolio: Use amortized payment calculation
  // Month 1: Purchase price only (based on financing percentage)
  // Month 2: Purchase price + 25% of rehab (both based on financing percentage)
  // Month 3: Purchase price + 50% of rehab (both based on financing percentage)
  // Month 4: Purchase price + 75% of rehab (both based on financing percentage)
  // Month 5+: Purchase price + 100% of rehab (full loan amount based on financing percentage)
  const calculateMonthlyInterest = (month: number): number => {
    // Calculate the loan amount for purchase price based on financing percentage
    const purchaseLoanAmount = purchasePrice * (financingPercent / 100);
    
    // Month 1: Only purchase price loan amount
    let drawnAmount = purchaseLoanAmount;
    
    if (month >= 2) {
      // Calculate rehab draw percentage (25%, 50%, 75%, then 100%)
      const rehabDrawPercent = Math.min((month - 1) * 0.25, 1.0);
      // Rehab loan amount based on financing percentage
      const rehabLoanAmount = rehabBudget * (financingPercent / 100);
      // Total drawn amount = purchase loan + (rehab loan × draw percentage)
      drawnAmount = purchaseLoanAmount + (rehabLoanAmount * rehabDrawPercent);
    }
    
    // Cap at the actual loan amount that will be funded (qualifiedLoanAmount)
    // This ensures we don't calculate interest on more than the actual loan
    drawnAmount = Math.min(drawnAmount, qualifiedLoanAmount);
    
    if (loanType === 'HARD_MONEY') {
      // Hard Money: Interest-only payments
      const annualInterest = drawnAmount * (interestRate / 100);
      return annualInterest / 12;
    } else {
      // Conventional/Portfolio: For progressive draws, use interest-only calculation
      // (The full amortized payment is calculated separately for the total loan)
      // Progressive draws are typically interest-only even for amortized loans
      const annualInterest = drawnAmount * (interestRate / 100);
      return annualInterest / 12;
    }
  };
  
  // Calculate total holding costs with progressive draws
  let totalInterestCosts = 0;
  const monthlyInterestPayments: number[] = [];
  for (let month = 1; month <= holdingPeriodMonths; month++) {
    const monthInterest = calculateMonthlyInterest(month);
    monthlyInterestPayments.push(monthInterest);
    totalInterestCosts += monthInterest;
  }
  
  // Average monthly interest for display (backward compatibility)
  const monthlyInterestPayment = holdingPeriodMonths > 0 
    ? totalInterestCosts / holdingPeriodMonths 
    : 0;
  
  const monthlyUtilitiesCost = totalMonthlyUtilities;
  const monthlyHoldingCost = monthlyInterestPayment + totalMonthlyUtilities;
  // Total holding costs = interest + monthly utilities × months + yearly costs (one-time)
  const totalHoldingCosts = totalInterestCosts + (totalMonthlyUtilities * holdingPeriodMonths) + yearlyWaterCost + yearlyDuesCost;

  let totalExitCosts = 0;
  let refinanceLoanAmount = 0;

  if (exitStrategy === 'SELL') {
    const sellingTransferTax = arv * (sellingTransferTaxRate / 100);
    
    // Calculate commissions: Use separate seller/buyer rates if provided, otherwise use legacy total rate
    let sellerAgentCommission = 0;
    let buyerAgentCommission = 0;
    let totalSellingCommission = 0;
    
    if (sellingSellerAgentCommissionRate > 0 || sellingBuyerAgentCommissionRate > 0) {
      // Use separate seller and buyer agent commission rates
      sellerAgentCommission = arv * (sellingSellerAgentCommissionRate / 100);
      buyerAgentCommission = arv * (sellingBuyerAgentCommissionRate / 100);
      totalSellingCommission = sellerAgentCommission + buyerAgentCommission;
    } else {
      // Legacy: Use single sellingCommissionRate (backward compatibility)
      totalSellingCommission = arv * (sellingCommissionRate / 100);
      // Assume 50/50 split if using legacy rate (or adjust as needed)
      sellerAgentCommission = totalSellingCommission / 2;
      buyerAgentCommission = totalSellingCommission / 2;
    }
    
    // If we are the real estate agent, calculate net commission after broker split
    // Broker split applies to seller agent commission
    if (weAreTheRealEstateAgent) {
      // Calculate broker portion of seller agent commission
      const sellerAgentBrokerPortion = sellerAgentCommission * ((sellingSellerAgentBrokerRate || 0) / 100);
      const sellerAgentNetCommission = sellerAgentCommission - sellerAgentBrokerPortion;
      
      // Total commission cost = Buyer agent commission + Seller agent broker portion (we pay broker)
      // We receive seller agent net commission, so it's not subtracted
      totalExitCosts = buyerAgentCommission + sellerAgentBrokerPortion + sellingTransferTax;
    } else {
      // Not the agent: pay full commissions
      totalExitCosts = totalSellingCommission + sellingTransferTax;
    }
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
  
  // Capital Gains Tax Calculation
  // Capital gains tax is applied to the net profit (gain on sale)
  // Default rate is 20% for self-employed (long-term capital gains)
  const taxRate = inputs.capitalGainsTaxRate || 20;
  const estimatedCapitalGainsTax = netProfit > 0 ? (netProfit * (taxRate / 100)) : 0;
  const netProfitAfterTax = netProfit - estimatedCapitalGainsTax;
  
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
  
  // 4. IRR (Internal Rate of Return)
  // Calculate IRR based on actual cash flows: initial investment, monthly costs, and exit proceeds
  const irrResult = calculateFlipIRR({
    downPayment: gapAmount,                              // Down payment (gap)
    closingCostsAndFees: totalClosingCosts,             // Acquisition closing costs
    rehabBudget: rehabBudget,                            // Rehab (treated as upfront for IRR purposes)
    monthlyHoldingCosts: monthlyHoldingCost,             // Average monthly carrying costs
    holdingMonths: holdingPeriodMonths,                  // How long we hold
    saleProceeds: arv,                                   // Gross ARV
    sellingCosts: totalExitCosts,                        // Selling costs (commission, transfer tax, etc.)
    loanPayoff: qualifiedLoanAmount                      // Loan balance to pay off at sale
  });
  const irr = irrResult; // Will be null if can't calculate, otherwise a decimal
  
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
      const baselineTransferTax = baselineARV * (sellingTransferTaxRate / 100);
      // Use same commission calculation logic as main calculation
      let baselineSellerComm = 0;
      let baselineBuyerComm = 0;
      if (sellingSellerAgentCommissionRate > 0 || sellingBuyerAgentCommissionRate > 0) {
          baselineSellerComm = baselineARV * (sellingSellerAgentCommissionRate / 100);
          baselineBuyerComm = baselineARV * (sellingBuyerAgentCommissionRate / 100);
      } else {
          const totalComm = baselineARV * (sellingCommissionRate / 100);
          baselineSellerComm = totalComm / 2;
          baselineBuyerComm = totalComm / 2;
      }
      if (weAreTheRealEstateAgent) {
          const brokerPortion = baselineSellerComm * ((sellingSellerAgentBrokerRate || 0) / 100);
          baselineExitCosts = baselineBuyerComm + brokerPortion + baselineTransferTax;
      } else {
          baselineExitCosts = baselineSellerComm + baselineBuyerComm + baselineTransferTax;
      }
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
      const minus10kTransferTax = minus10kARV * (sellingTransferTaxRate / 100);
      let minus10kSellerComm = 0;
      let minus10kBuyerComm = 0;
      if (sellingSellerAgentCommissionRate > 0 || sellingBuyerAgentCommissionRate > 0) {
          minus10kSellerComm = minus10kARV * (sellingSellerAgentCommissionRate / 100);
          minus10kBuyerComm = minus10kARV * (sellingBuyerAgentCommissionRate / 100);
      } else {
          const totalComm = minus10kARV * (sellingCommissionRate / 100);
          minus10kSellerComm = totalComm / 2;
          minus10kBuyerComm = totalComm / 2;
      }
      if (weAreTheRealEstateAgent) {
          const brokerPortion = minus10kSellerComm * ((sellingSellerAgentBrokerRate || 0) / 100);
          minus10kExitCosts = minus10kBuyerComm + brokerPortion + minus10kTransferTax;
      } else {
          minus10kExitCosts = minus10kSellerComm + minus10kBuyerComm + minus10kTransferTax;
      }
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
          const simTransferTax = simARV * (sellingTransferTaxRate / 100);
          let simSellerComm = 0;
          let simBuyerComm = 0;
          if (sellingSellerAgentCommissionRate > 0 || sellingBuyerAgentCommissionRate > 0) {
              simSellerComm = simARV * (sellingSellerAgentCommissionRate / 100);
              simBuyerComm = simARV * (sellingBuyerAgentCommissionRate / 100);
          } else {
              const totalComm = simARV * (sellingCommissionRate / 100);
              simSellerComm = totalComm / 2;
              simBuyerComm = totalComm / 2;
          }
          if (weAreTheRealEstateAgent) {
              const brokerPortion = simSellerComm * ((sellingSellerAgentBrokerRate || 0) / 100);
              simExitCosts = simBuyerComm + brokerPortion + simTransferTax;
          } else {
              simExitCosts = simSellerComm + simBuyerComm + simTransferTax;
          }
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
  // REQUIRED LIQUIDITY FORMULA (Lender Requirement):
  // This is the amount of liquid cash the lender requires you to prove you have in bank statements.
  // Formula: Max(Option A, Option B) where:
  //   Option A = (Total Closing Costs + Gap + Per Diem Interest - Commission Credit) + (15% of Rehab Budget)
  //   Option B = (Total Closing Costs + Gap + Per Diem Interest - Commission Credit) + $15,000
  // 
  // Components:
  //   - Total Closing Costs: Lender fees + Third party fees
  //   - Gap: Down payment amount (Purchase Price - Financed Amount - EMD - Seller Buy Back)
  //   - Per Diem Interest: Prepaid interest for days between closing and first payment
  //   - Commission Credit: Reduces cash needed (if you're the agent)
  //   - Buffer: Either 15% of rehab OR $15,000 (whichever is greater)
  //
  // This ensures lenders verify you have sufficient reserves and aren't borrowing the down payment.
  const liquidityClosingCosts = totalClosingCosts + gapAmount + perDiemInterest - buyerAgentCommissionCredit;
  
  // Contingency: 15% of rehab budget (automatic calculation)
  const rehabContingency = rehabBudget * 0.15;
  
  const liquidityOptionA = liquidityClosingCosts + rehabContingency;
  const liquidityOptionB = liquidityClosingCosts + 15000;
  
  const requiredLiquidity = Math.max(liquidityOptionA, liquidityOptionB);
  
  // Emergency buffer: 5-10% of total deal cost (suggested, not required by lender)
  const totalDealCost = purchasePrice + rehabBudget;
  const emergencyBuffer5Percent = totalDealCost * 0.05;
  const emergencyBuffer10Percent = totalDealCost * 0.10;

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
    requestedLoanAmount: loanAmountByFinancing, // Loan amount based on financing percentage
    qualifiedLoanAmount, // Actual loan amount (capped at 75% of ARV if needed)
    initialFundedAmount,
    holdbackAmount,
    maxAllowableOffer,
    maxPurchasePrice70Rule,
    passes70Rule,
    workBackwardMaxOffer,
    ltv,
    ltc,
    cappedLTC,
    ltarv,
    cappedLTARV,
    
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
    inspectionCost: inspectionCost || 0,
    appraisalCost: appraisalCost || 0,
    insuranceCost: insuranceCost || 0,
    surveyFee: surveyFee || 0,
    pestInspectionCost: pestInspectionCost || 0,
    creditReportFee: creditReportFee || 0,
    floodDeterminationFee: floodDeterminationFee || 0,
    otherThirdPartyFees: otherThirdPartyFees || 0,
    
    // Walker
    totalWalkerFees,

    hideoutTransferCost: calculatedHideoutTransferFee,
    hideoutProratedDues: finalHideoutProratedDues,
    
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
    prepaidCosts,
    totalPaidOut: prepaidCosts + totalCashToClose,
    requiredLiquidity,
    rehabContingency,
    emergencyBuffer5Percent,
    emergencyBuffer10Percent,
    isEligible,
    eligibilityReasons,

    // Profitability
    totalHoldingCosts,
    monthlyHoldingCost,
    monthlyInterestPayment,
    monthlyUtilitiesCost,
    monthlyInterestPayments,
    yearlyWaterCost,
    yearlyDuesCost,
    totalExitCosts,
    netProfit,
    estimatedCapitalGainsTax,
    netProfitAfterTax,
    closingTableProfit,
    roi,
    projectRoi,
    netMargin,
    irr,
    totalProjectCostBasis,
    totalCashInvested,
    profitScenarios: scenarios,
    
    // Sensitivity Analysis
    purchaseSensitivityScenarios: generatePurchaseSensitivity(
      purchasePrice,
      netProfit,
      arv,
      rehabBudget,
      totalClosingCosts,
      totalHoldingCosts,
      totalExitCosts,
      financingPercent,
      MAX_LTV_PERCENT
    ),
    rehabSensitivityScenarios: generateRehabSensitivity(
      rehabBudget,
      netProfit,
      arv,
      purchasePrice,
      totalClosingCosts,
      gapAmount,
      totalHoldingCosts,
      totalExitCosts,
      financingPercent,
      MAX_LTV_PERCENT
    ),

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