export interface LoanTypeDefaults {
  rate: number; // Annual interest rate as decimal (e.g., 0.12 for 12%)
  term: number; // Loan term in months
  interestOnly: boolean | 'optional'; // Whether interest-only payments
  includesTaxInsurance: boolean | 'varies'; // Whether PITI includes taxes/insurance
  pmiRequired: boolean; // Whether PMI is typically required
  prepaymentPenalty: boolean; // Whether prepayment penalty applies
  typicalPoints: number | 'varies'; // Typical origination points
  typicalFees: number; // Typical lender fees as decimal (e.g., 0.03 for 3% of loan)
}

export const loanTypeDefaults: Record<'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO', LoanTypeDefaults> = {
  HARD_MONEY: {
    rate: 0.12, // 12%
    term: 6, // 6 months typical
    interestOnly: true,
    includesTaxInsurance: false,
    pmiRequired: false,
    prepaymentPenalty: true,
    typicalPoints: 1, // 1 point typical
    typicalFees: 0.03 // 3% of loan
  },
  CONVENTIONAL: {
    rate: 0.035, // 3.5%
    term: 360, // 30 years (360 months)
    interestOnly: false,
    includesTaxInsurance: true,
    pmiRequired: true, // If <20% down
    prepaymentPenalty: false,
    typicalPoints: 0, // No points typical
    typicalFees: 0.01 // 1% of loan
  },
  PORTFOLIO: {
    rate: 0.07, // 7%
    term: 60, // 5 years typical (varies)
    interestOnly: 'optional',
    includesTaxInsurance: 'varies',
    pmiRequired: false,
    prepaymentPenalty: false,
    typicalPoints: 'varies',
    typicalFees: 0.02 // 2% of loan
  }
};

/**
 * Get loan type defaults
 */
export function getLoanTypeDefaults(loanType: 'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO'): LoanTypeDefaults {
  return loanTypeDefaults[loanType];
}

/**
 * Calculate PMI for conventional loans
 * PMI is typically 0.5-1% of loan amount annually, divided by 12 for monthly
 * Usually required if down payment < 20%
 */
export function calculatePMI(loanAmount: number, downPaymentPercent: number): number {
  // PMI required if down payment < 20%
  if (downPaymentPercent >= 20) {
    return 0;
  }
  
  // Typical PMI: 0.5-1% of loan annually
  // Use 0.75% as average (0.5% for 15-19% down, 1% for <15% down)
  const pmiRate = downPaymentPercent < 15 ? 0.01 : 0.005;
  const annualPMI = loanAmount * pmiRate;
  return annualPMI / 12; // Monthly PMI
}

