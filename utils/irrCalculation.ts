/**
 * IRR (Internal Rate of Return) Calculation
 * 
 * IRR is the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero.
 * For real estate flips: it's the annualized return rate considering all cash in, cash out, and timing.
 * 
 * Formula: NPV = CF0 + CF1/(1+r) + CF2/(1+r)² + ... + CFn/(1+r)ⁿ = 0
 * We solve for r (the IRR).
 */

export interface CashFlow {
  month: number;      // Month number (0 = initial investment)
  amount: number;     // Cash amount (negative = outflow, positive = inflow)
}

/**
 * Calculate NPV given a discount rate and cash flows
 * @param rate Annual discount rate (as decimal, e.g., 0.20 for 20%)
 * @param cashFlows Array of cash flows with timing
 * @returns Net Present Value
 */
const calculateNPV = (rate: number, cashFlows: CashFlow[]): number => {
  return cashFlows.reduce((npv, cf) => {
    const monthlyRate = Math.pow(1 + rate, cf.month / 12) - 1;
    return npv + cf.amount / Math.pow(1 + monthlyRate + 1, cf.month);
  }, 0);
};

/**
 * Alternative NPV calculation using monthly compounding
 * This is often more accurate for short-term deals
 */
const calculateNPVMonthly = (monthlyRate: number, cashFlows: CashFlow[]): number => {
  return cashFlows.reduce((npv, cf) => {
    return npv + cf.amount / Math.pow(1 + monthlyRate, cf.month);
  }, 0);
};

/**
 * Calculate IRR using Newton-Raphson method
 * This iteratively finds the rate where NPV = 0
 * 
 * @param cashFlows Array of cash flows with timing (months)
 * @param initialGuess Starting guess for IRR (default 0.20 = 20%)
 * @param maxIterations Maximum iterations for convergence
 * @param tolerance Acceptable NPV error
 * @returns Annual IRR as decimal (e.g., 0.25 for 25%)
 */
export const calculateIRRMonthly = (
  cashFlows: CashFlow[],
  initialGuess: number = 0.20,
  maxIterations: number = 100,
  tolerance: number = 0.001
): number | null => {
  // Validate inputs
  if (!cashFlows || cashFlows.length < 2) {
    return null; // Need at least 2 cash flows
  }

  const hasInflow = cashFlows.some(cf => cf.amount > 0);
  const hasOutflow = cashFlows.some(cf => cf.amount < 0);
  
  if (!hasInflow || !hasOutflow) {
    return null; // Need both inflows and outflows
  }

  // Convert annual guess to monthly
  let monthlyRate = initialGuess / 12;
  
  // Newton-Raphson iteration
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPVMonthly(monthlyRate, cashFlows);
    
    // Check if converged
    if (Math.abs(npv) < tolerance) {
      // Convert monthly rate back to annual
      return Math.pow(1 + monthlyRate, 12) - 1;
    }

    // Calculate derivative of NPV with respect to rate
    const delta = 0.00001;
    const npvDelta = calculateNPVMonthly(monthlyRate + delta, cashFlows);
    const derivative = (npvDelta - npv) / delta;

    // Avoid division by zero
    if (Math.abs(derivative) < 1e-10) {
      break;
    }

    // Newton-Raphson update
    monthlyRate = monthlyRate - npv / derivative;

    // Prevent unreasonable rates
    if (monthlyRate < -0.99) monthlyRate = -0.99;
    if (monthlyRate > 1) monthlyRate = 1;
  }

  // If no convergence, try a simpler approach
  return trySimpleIRRMethod(cashFlows);
};

/**
 * Fallback IRR calculation using binary search
 * More robust for edge cases
 */
const trySimpleIRRMethod = (cashFlows: CashFlow[]): number | null => {
  let lowRate = -0.99;
  let highRate = 5; // 500% annual
  const tolerance = 0.001;
  const maxIterations = 50;

  for (let i = 0; i < maxIterations; i++) {
    const midRate = (lowRate + highRate) / 2;
    const monthlyRate = Math.pow(1 + midRate, 1 / 12) - 1;
    const npv = calculateNPVMonthly(monthlyRate, cashFlows);

    if (Math.abs(npv) < tolerance) {
      return midRate;
    }

    if (npv < 0) {
      highRate = midRate;
    } else {
      lowRate = midRate;
    }
  }

  return null;
};

/**
 * Build cash flow array for a flip deal
 * 
 * @param initialInvestment Total cash invested at month 0 (negative number)
 * @param monthlyHoldingCosts Array of monthly costs (negative numbers)
 * @param exitCashFlow Final cash received at exit (positive number, month where exit occurs)
 * @param holdingMonths Total months until exit
 * @returns Array of CashFlow objects with proper timing
 */
export const buildFlipCashFlows = (
  initialInvestment: number,  // e.g., -50000 (cash out)
  monthlyHoldingCosts: number, // e.g., -2000 per month
  exitCashFlow: number,         // e.g., 85000 (net proceeds from sale)
  holdingMonths: number         // e.g., 6
): CashFlow[] => {
  const flows: CashFlow[] = [];

  // Initial investment at month 0
  if (initialInvestment !== 0) {
    flows.push({ month: 0, amount: initialInvestment });
  }

  // Monthly holding costs (if any)
  for (let month = 1; month <= holdingMonths; month++) {
    if (monthlyHoldingCosts !== 0) {
      flows.push({ month, amount: monthlyHoldingCosts });
    }
  }

  // Exit proceeds
  if (exitCashFlow !== 0) {
    flows.push({ month: holdingMonths, amount: exitCashFlow });
  }

  return flows.length > 0 ? flows : [];
};

/**
 * Calculate IRR for a simple flip scenario
 * 
 * Usage example:
 * const irr = calculateFlipIRR({
 *   downPayment: 25000,
 *   closingCostsAndFees: 15000,
 *   rehabBudget: 30000,
 *   monthlyHoldingCosts: 2000,
 *   holdingMonths: 6,
 *   saleProceeds: 130000,
 *   sellingCosts: 8000
 * });
 */
export interface FlipIRRInputs {
  downPayment: number;         // Initial cash down payment
  closingCostsAndFees: number; // Acquisition closing costs
  rehabBudget: number;         // Total rehab spending
  monthlyHoldingCosts: number; // Average monthly carrying costs
  holdingMonths: number;       // How many months to hold
  saleProceeds: number;        // Gross sale price (ARV)
  sellingCosts: number;        // Selling closing costs, commissions, etc.
  loanPayoff?: number;         // Loan balance at sale (if not fully drawn)
}

export const calculateFlipIRR = (inputs: FlipIRRInputs): number | null => {
  const {
    downPayment,
    closingCostsAndFees,
    rehabBudget,
    monthlyHoldingCosts,
    holdingMonths,
    saleProceeds,
    sellingCosts,
    loanPayoff = 0
  } = inputs;

  // Total initial investment (month 0)
  const totalInitialInvestment = -(
    downPayment +           // Money out for down payment
    closingCostsAndFees +   // Acquisition closing costs
    rehabBudget             // Rehab spending (often funded gradually, but we treat as upfront for simplicity)
  );

  // Total monthly costs throughout holding period
  const totalMonthlyHoldingCosts = -monthlyHoldingCosts;

  // Net proceeds at sale
  const netSaleProceeds = saleProceeds - sellingCosts - loanPayoff;

  // Build cash flows
  const cashFlows = buildFlipCashFlows(
    totalInitialInvestment,
    totalMonthlyHoldingCosts,
    netSaleProceeds,
    holdingMonths
  );

  // Calculate IRR
  return calculateIRRMonthly(cashFlows);
};

/**
 * Format IRR as a percentage for display
 * @param irr Annual IRR as decimal (e.g., 0.25)
 * @returns Formatted percentage string (e.g., "25.0%")
 */
export const formatIRR = (irr: number | null): string => {
  if (irr === null || isNaN(irr) || !isFinite(irr)) {
    return 'N/A';
  }
  
  // Handle negative IRR
  if (irr < 0) {
    return `${(irr * 100).toFixed(1)}%`;
  }
  
  // Cap display at 1000% to avoid unrealistic-looking numbers
  const displayIRR = Math.min(irr * 100, 1000);
  return `${displayIRR.toFixed(1)}%`;
};
