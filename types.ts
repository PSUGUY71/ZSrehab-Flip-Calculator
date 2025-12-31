export interface LenderOption {
  id: string;
  lenderName: string;
  loanType: 'HARD_MONEY' | 'DSCR' | 'BANK' | 'PRIVATE' | 'OTHER';
  interestRate: number; // percent, matches LoanInputs.interestRate meaning
  originationPoints: number; // percent, matches LoanInputs.originationPoints meaning

  // Optional lender specific fees. Default 0.
  underwritingFee: number;
  processingFee: number;
  docPrepFee: number;
  wireFee: number;
  otherFees: number;

  // Optional. If 0, use current app’s loanAmount logic from calculateLoan.
  loanAmountOverride: number;

  includeInComparison: boolean;
  notes: string;
}

export interface LoanInputs {
  // Lender Info
  lenderName: string;

  // Property Info
  address: string;
  state: string;
  zipCode: string;
  propertyType: 'SFR' | 'Multi-Family' | 'Mixed-Use';
  units: number;
  
  // Property Specs
  sqFt: number;
  beds: number;
  baths: number;
  foundationType: 'Basement' | 'Crawl Space' | 'Slab' | 'Other';

  // Deal Numbers
  purchasePrice: number;
  asIsValue: number;
  rehabBudget: number;
  arv: number; // After Repair Value
  sellerConcessionRate: number; // Percentage
  earnestMoneyDeposit: number; // New Escrow/Deposit field
  buyerAgentCommissionRate: number; // New: Realtor commission credit
  buyerAgentCommissionBrokerRate: number; // Percentage of buyer agent commission that goes to broker

  // Borrower Info
  ficoScore: number;
  experienceLevel: number; // Number of past deals
  liquidity: number; // Cash on hand

  // Loan Settings (defaults available)
  interestRate: number; // Percentage
  originationPoints: number; // Percentage
  loanTermMonths: number;
  
  // Baseline Lender Fees
  underwritingFee: number;
  processingFee: number;
  docPrepFee: number;
  wireFee: number;
  otherLenderFees: number; // Added field to support "otherFees" from lenders
  
  // Closing Info
  closingDate: string; // YYYY-MM-DD

  // Third Party / Settlement Settings (Detailed Breakdown)
  transferTaxRate: number; // Percentage (e.g., 1.0% in PA)
  
  // Specific HUD Line Items
  titleInsuranceRate: number; // Percentage (0.7%)
  
  legalSettlementFees: number; // General Legal
  recordingFees: number; // Line 1201
  
  // specific fees
  walkerDocPrep: number;
  walkerOvernight: number;
  walkerWire: number;
  
  // Specific Entity Fees
  hideoutTransferFee: number; 
  hideoutAnnualFee: number; 
  
  roamingwoodAnnual: number; // City/town taxes
  schoolTaxAnnual: number;
  sewerWaterAnnual: number; // Sewer and water (quarterly billing)

  // Profitability Assumptions
  exitStrategy: 'SELL' | 'REFI';
  holdingPeriodMonths: number;
  monthlyElectric: number;
  
  // Selling Scenario
  sellingCommissionRate: number;
  sellingTransferTaxRate: number;

  // Refinance Scenario (from PDF)
  refinanceLTV: number; // Default 80%
  refinancePoints: number; // Default 2.0%
  refinanceFixedFees: number; // Default $1795 ($300 Proc + $1495 UW)

  // Deal Notes
  notes: string;

  // Seller Side Analysis
  sellerOriginalPurchasePrice: number;
  sellerMortgageBalance: number;
  sellerLineOfCreditBalance: number;
  sellerAgentCommissionRate: number;
  sellerTransferTaxRate: number;
  sellerMiscFees: number;
}

export interface SavedDeal {
  id: number | string; // Support both number (localStorage) and string (Supabase UUID)
  name: string;
  date: string;
  data: LoanInputs;
  lenders?: LenderOption[];
}

export interface User {
  username: string;
  password: string;
  created: string;
}

export interface ProfitScenario {
    label: string;
    arv: number;
    netProfit: number;
    difference: number;
    closingTableProfit: number;
}

export interface CalculatedResults {
  // Loan Sizing
  maxLTVPercent: number; 
  maxLoanAmountDollars: number;
  requestedLoanAmount: number;
  qualifiedLoanAmount: number;
  initialFundedAmount: number;
  holdbackAmount: number;
  
  // Max Offer Helper
  maxAllowableOffer: number;

  // Ratios
  ltv: number;
  ltc: number;
  
  // Metrics
  purchasePricePerSqFt: number;
  arvPerSqFt: number;

  // Lender Fees
  underwritingFee: number;
  processingFee: number;
  wireFee: number;
  docPrepFee: number;
  otherLenderFees: number; // Added
  pointsCost: number;
  totalLenderFees: number;

  // Third Party Fees (Detailed)
  transferTaxCost: number;
  titleInsuranceCost: number;
  legalSettlementCost: number;
  recordingCost: number;
  
  // Walker Specifics
  totalWalkerFees: number;
  
  hideoutTransferCost: number;
    hideoutProratedDues: number;
    roamingwoodProrated: number; // City/town taxes prorated
    schoolTaxProrated: number;
    sewerWaterProrated: number; // Sewer and water prorated (quarterly)
    daysRemainingInYear: number;
  
  totalThirdPartyFees: number;

  // Credits
  sellerConcessionAmount: number;
  buyerAgentCommissionCredit: number;
  
  // Interest
  perDiemInterest: number;
  monthlyPayment: number;
  
  // Totals
  totalClosingCosts: number;
  totalCashToClose: number;
  gapAmount: number;
  
  // Proof of Funds Requirements
  requiredLiquidity: number;
  
  // Eligibility
  isEligible: boolean;
  eligibilityReasons: string[];

  // Profitability Analysis
  totalHoldingCosts: number;
  totalExitCosts: number;
  netProfit: number;
  closingTableProfit: number;
  
  roi: number;
  projectRoi: number;
  netMargin: number;
  
  totalProjectCostBasis: number;
  totalCashInvested: number; // Added
  
  // Scenarios
  profitScenarios: ProfitScenario[];

  // Refi Specifics
  refinanceLoanAmount: number;

  // Seller Side Analysis Results
  sellerNetProceeds: number;
  sellerTotalCostToClose: number;
  sellerCommissionCost: number;
  sellerTransferTaxCost: number;
  totalBuyingCosts: number;
}

export const DEFAULT_INPUTS: LoanInputs = {
  lenderName: 'ZSrehab',
  address: '2773 Rockway Road',
  state: 'PA',
  zipCode: '18436',
  propertyType: 'SFR',
  units: 1,
  
  sqFt: 2000,
  beds: 3,
  baths: 2,
  foundationType: 'Basement',

  purchasePrice: 130000, 
  asIsValue: 130000,
  rehabBudget: 50000,
  arv: 300000,
  sellerConcessionRate: 0,
  earnestMoneyDeposit: 1000,
  buyerAgentCommissionRate: 0,
  buyerAgentCommissionBrokerRate: 0,

  ficoScore: 720,
  experienceLevel: 3,
  liquidity: 100000,
  interestRate: 10.99,
  originationPoints: 2.0,
  loanTermMonths: 9,
  
  underwritingFee: 500,
  processingFee: 500,
  docPrepFee: 1499,
  wireFee: 45,
  otherLenderFees: 0,
  
  closingDate: '2025-02-28',
  
  transferTaxRate: 1.0, 
  titleInsuranceRate: 0.70,
  legalSettlementFees: 1675.00,
  
  walkerDocPrep: 625.00,
  walkerOvernight: 75.00,
  walkerWire: 50.00,
  
  recordingFees: 221.75,

  hideoutTransferFee: 2170.00,
  hideoutAnnualFee: 2070.00,

  roamingwoodAnnual: 1600.00, // City/town taxes
  schoolTaxAnnual: 3000.00,
  sewerWaterAnnual: 0.00, // Sewer and water (quarterly)

  exitStrategy: 'SELL',
  holdingPeriodMonths: 6,
  monthlyElectric: 300,
  sellingCommissionRate: 5.0,
  sellingTransferTaxRate: 1.0,

  refinanceLTV: 80.0,
  refinancePoints: 2.0,
  refinanceFixedFees: 1795.00,

  notes: '',

  sellerOriginalPurchasePrice: 80000,
  sellerMortgageBalance: 60000,
  sellerLineOfCreditBalance: 0,
  sellerAgentCommissionRate: 5.0,
  sellerTransferTaxRate: 1.0,
  sellerMiscFees: 500
};