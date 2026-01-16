export interface RehabLineItem {
  id: string;
  category: string;
  description: string;
  unitCost: number;
  quantity: number;
}

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

  // Optional. If 0, use current app's loanAmount logic from calculateLoan.
  loanAmountOverride: number;

  // Financing terms
  financingPercentage: number; // 100, 95, 90, 85, 80, or custom
  useCustomFinancing: boolean; // Whether using custom financing percentage
  customFinancingPercentage: number; // Custom financing percentage value
  maxARVPercent: number; // Max allowed ARV percentage (e.g., 75 for 75%)
  maxLoanToCostPercent: number; // Max loan to cost percentage (e.g., 100 for 100%)

  includeInComparison: boolean;
  notes: string;
}

export interface LoanInputs {
  // Lender Info
  lenderName: string;

  // Property Info
  address: string;
  state: string;
  county?: string; // County for 3rd party cost lookups (NORMAL version)
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
  appraised_value: number; // Appraised value for LTV calculation (lender standard; defaults to purchase price if not set)
  rehabBudget: number;
  rehabLineItems: RehabLineItem[]; // Itemized rehab breakdown
  arv: number; // After Repair Value
  financingPercentage: number; // Financing percentage (100, 95, 90, 85, 80, or custom)
  useCustomFinancing: boolean; // Whether using custom financing percentage
  customFinancingPercentage: number; // Custom financing percentage value
  
  // Work-Backward Mode (Max Offer Calculation)
  useWorkBackwardMode: boolean; // Toggle for backward calculation mode
  workBackwardModeType: 'ROI' | 'LTC'; // Which metric to target
  targetRoi: number; // Target ROI percentage (e.g., 20 for 20%)
  targetLTC: number; // Target LTC percentage (e.g., 75 for 75%)
  sellerConcessionRate: number; // Percentage
  earnestMoneyDeposit: number; // New Escrow/Deposit field
  buyerAgentCommissionRate: number; // New: Realtor commission credit
  buyerAgentCommissionBrokerRate: number; // Percentage of buyer agent commission that goes to broker

  // Borrower Info
  ficoScore: number;
  experienceLevel: number; // Number of past deals
  liquidity: number; // Cash on hand

  // Loan Settings (defaults available)
  loanType: 'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO' | 'OTHER';
  interestRate: number; // Percentage
  originationPoints: number; // Percentage
  loanTermMonths: number;
  
  // PITI fields for conventional loans (Principal, Interest, Taxes, Insurance)
  includePITI: boolean; // Whether to include taxes and insurance in monthly payment
  monthlyPITITaxes: number; // Monthly property taxes (if included in payment)
  monthlyPITIInsurance: number; // Monthly insurance (if included in payment)
  
  // PMI (Private Mortgage Insurance) for conventional loans
  includePMI: boolean; // Whether PMI is required (typically if <20% down)
  monthlyPMI: number; // Monthly PMI cost (typically 0.5-1% of loan annually)
  
  // Prepayment penalty
  prepaymentPenalty: boolean; // Whether prepayment penalty applies
  prepaymentPenaltyAmount: number; // Prepayment penalty amount or percentage
  
  // Loan characteristics
  interestOnly: boolean; // Whether loan is interest-only (hard money) or amortized
  
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
  cplFee: number; // CPL (Certificate of Property Location) fee - always $125 payable to Penn Attorneys
  numberOfEndorsements: number; // Number of title endorsements at $100 each
  
  legalSettlementFees: number; // General Legal
  recordingFees: number; // Line 1201
  titleCompanyCharges: number; // Title company charges (for non-Hideout versions)
  
  // Additional Costs
  inspectionCost: number; // Property inspection cost
  appraisalCost: number; // Property appraisal cost
  insuranceCost: number; // Insurance cost
  
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
  monthlyInternet: number;
  monthlyPropane: number;
  includeMonthlyInsurance: boolean;
  monthlyInsurance: number;
  includeMonthlyTaxes: boolean;
  monthlyTaxes: number;
  includeYearlyWater: boolean;
  yearlyWater: number;
  includeYearlyDues: boolean;
  yearlyDues: number;
  
  // Selling Scenario
  sellingCommissionRate: number; // Legacy field - total commission (will be calculated from seller + buyer if not used)
  sellingTransferTaxRate: number;
  weAreTheRealEstateAgent: boolean; // If true, add commission back to profit
  sellingCommissionBrokerRate: number; // Percentage of selling commission that goes to broker (e.g., 35%)
  // Separate seller and buyer agent commissions (when selling)
  sellingSellerAgentCommissionRate: number; // Seller's agent commission rate when selling
  sellingBuyerAgentCommissionRate: number; // Buyer's agent commission rate when selling
  sellingSellerAgentBrokerRate: number; // Percentage of seller agent commission that goes to broker

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
  
  // Seller Financing
  sellerBuyBackAmount: number; // Seller holds note/finances part of purchase, reduces down payment
  
  // Tax Settings
  capitalGainsTaxRate: number; // Capital gains tax rate (default 20% for self-employed)
  showAfterTaxProfit: boolean; // Toggle to show/hide after-tax profit calculation
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
  maxPurchasePrice70Rule: number; // 70% Rule: (ARV × 0.70) - Rehab Budget
  passes70Rule: boolean; // True if Purchase Price ≤ Max Purchase Price (70% Rule)
  workBackwardMaxOffer: number; // Max offer calculated backwards from target ROI or LTC

  // Ratios
  ltv: number;
  ltc: number; // Actual LTC based on financing percentage (not capped)
  cappedLTC?: number; // LTC based on qualified loan amount (capped)
  ltarv: number; // Actual LTARV based on financing percentage (not capped)
  cappedLTARV?: number; // LTARV based on qualified loan amount (capped at 75% of ARV)
  
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
  cplFeeCost: number; // CPL fee (always $125 to Penn Attorneys)
  endorsementCost: number; // Endorsement fees ($100 per endorsement)
  legalSettlementCost: number;
  recordingCost: number;
  inspectionCost: number;
  appraisalCost: number;
  insuranceCost: number;
  
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
  prepaidCosts: number; // Inspection + Appraisal + Earnest Money (paid before closing)
  totalPaidOut: number; // Prepaid costs + Cash to Close
  
  // Proof of Funds Requirements
  requiredLiquidity: number;
  rehabContingency: number; // 15% of rehab budget (automatic)
  emergencyBuffer5Percent: number; // 5% of total deal cost (suggested)
  emergencyBuffer10Percent: number; // 10% of total deal cost (suggested)
  
  // Eligibility
  isEligible: boolean;
  eligibilityReasons: string[];

  // Profitability Analysis
  totalHoldingCosts: number;
  monthlyHoldingCost: number; // Monthly total (interest + utilities) - average
  monthlyInterestPayment: number; // Monthly loan interest payment - average
  monthlyUtilitiesCost: number; // Monthly utilities cost
  yearlyWaterCost: number; // Yearly water cost (if included)
  yearlyDuesCost: number; // Yearly dues cost (if included)
  monthlyInterestPayments: number[]; // Array of monthly interest payments (progressive draws)
  totalExitCosts: number;
  netProfit: number;
  closingTableProfit: number;
  
  // Tax Calculations
  estimatedCapitalGainsTax: number; // Estimated tax on profit
  netProfitAfterTax: number; // Net profit after capital gains tax
  
  roi: number;
  projectRoi: number;
  netMargin: number;
  irr: number | null; // Internal Rate of Return (annualized, as decimal, e.g., 0.25 for 25%; null if cannot be calculated)
  
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
  
  // Sensitivity Analysis
  purchaseSensitivityScenarios?: import('./utils/sensitivityAnalysis').PurchaseSensitivityScenario[];
  rehabSensitivityScenarios?: import('./utils/sensitivityAnalysis').RehabSensitivityScenario[];
}

export const DEFAULT_INPUTS: LoanInputs = {
  lenderName: '',
  address: '',
  state: '',
  county: '',
  zipCode: '',
  propertyType: 'SFR',
  units: 1,
  
  sqFt: 0,
  beds: 0,
  baths: 0,
  foundationType: 'Basement',

  purchasePrice: 0, 
  appraised_value: 0, // Defaults to purchase price if 0 in calculations
  rehabBudget: 0,
  rehabLineItems: [],
  arv: 0,
  financingPercentage: 100, // Default 100% financing
  useCustomFinancing: false,
  customFinancingPercentage: 100,
  useWorkBackwardMode: false,
  workBackwardModeType: 'ROI',
  targetRoi: 20, // Default 20% ROI target
  targetLTC: 75, // Default 75% LTC target
  sellerConcessionRate: 0,
  earnestMoneyDeposit: 0,
  buyerAgentCommissionRate: 0,
  buyerAgentCommissionBrokerRate: 0,

  ficoScore: 720,
  experienceLevel: 0,
  liquidity: 100000, // Default liquidity to avoid eligibility errors on blank form
  loanType: 'HARD_MONEY', // Default to hard money
  interestRate: 12, // Default to 12% (typical hard money rate)
  originationPoints: 1, // Typical hard money points
  loanTermMonths: 6, // Typical hard money term (6 months)
  includePITI: false, // Hard money doesn't include PITI
  monthlyPITITaxes: 0,
  monthlyPITIInsurance: 0,
  includePMI: false, // Hard money doesn't have PMI
  monthlyPMI: 0,
  prepaymentPenalty: true, // Hard money typically has prepayment penalty
  prepaymentPenaltyAmount: 0,
  interestOnly: true, // Hard money is interest-only
  
  underwritingFee: 0,
  processingFee: 0,
  docPrepFee: 0,
  wireFee: 0,
  otherLenderFees: 0,
  
  closingDate: new Date().toISOString().split('T')[0], // Today's date
  
  transferTaxRate: 0, 
  titleInsuranceRate: 0,
  cplFee: 125, // Default $125 for CPL fee
  numberOfEndorsements: 0, // Default 0 endorsements
  legalSettlementFees: 0,
  
  walkerDocPrep: 0,
  walkerOvernight: 0,
  walkerWire: 0,
  
  recordingFees: 0,
  titleCompanyCharges: 0, // Title company charges (for non-Hideout versions)
  
  // Additional Costs
  inspectionCost: 0,
  appraisalCost: 0,
  insuranceCost: 0,

  hideoutTransferFee: 0,
  hideoutAnnualFee: 0,

  roamingwoodAnnual: 0, // City/town taxes
  schoolTaxAnnual: 0,
  sewerWaterAnnual: 0, // Sewer and water (quarterly)

  exitStrategy: 'SELL',
  holdingPeriodMonths: 6,
  monthlyElectric: 0,
  monthlyInternet: 0,
  monthlyPropane: 0,
  includeMonthlyInsurance: false,
  monthlyInsurance: 0,
  includeMonthlyTaxes: false,
  monthlyTaxes: 0,
  includeYearlyWater: false,
  yearlyWater: 0,
  includeYearlyDues: false,
  yearlyDues: 0,
  sellingCommissionRate: 0,
  sellingTransferTaxRate: 0,
  weAreTheRealEstateAgent: false,
  sellingCommissionBrokerRate: 0,
  sellingSellerAgentCommissionRate: 3, // Default to 3% (typical commission rate)
  sellingBuyerAgentCommissionRate: 3, // Default to 3% (typical commission rate)
  sellingSellerAgentBrokerRate: 0,

  refinanceLTV: 80.0,
  refinancePoints: 2.0,
  refinanceFixedFees: 0,

  notes: '',

  sellerOriginalPurchasePrice: 0,
  sellerMortgageBalance: 0,
  sellerLineOfCreditBalance: 0,
  sellerAgentCommissionRate: 0,
  sellerTransferTaxRate: 0,
  sellerMiscFees: 0,
  
  sellerBuyBackAmount: 0,
  
  // Tax Settings
  capitalGainsTaxRate: 20, // Default 20% for self-employed
  showAfterTaxProfit: false, // Default to false (show toggle)
};