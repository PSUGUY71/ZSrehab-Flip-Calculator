// Unit tests on the reference deal: rehab financing %, max offer, required ARV, total cash needed / runway, taxes.
// Run: npm test
import { calculateLoan, financingPercents, financedLoan, maxOfferFor, requiredArvFor, taxTreatmentRate } from './calculations';
import { builderRiskAnnualPremium, estimateMonthlyInsurance } from './stateHoldingCosts';
import { computeEstimates, likelyMissingCosts } from './closingEstimates';
import { DEFAULT_INPUTS, LoanInputs } from '../types';

let failed = 0;
const eq = (actual: number, expected: number, msg: string) => {
  const ok = Math.abs(actual - expected) < 0.005;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}: ${actual.toFixed(2)}${ok ? '' : ` (expected ${expected.toFixed(2)})`}`);
};
const is = (ok: boolean, msg: string) => { if (!ok) failed++; console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}`); };

// Purchase $430,000 | Rehab $144,000 | ARV $705,000 | Financing 90% | EMD $10,000 | Rate 9.25% | Points 1.5%
// Hold 12 months | Liquidity $100,000 | Lender fees $8,979 (points $7,749 + $1,230) | Third-party $11,331.52
// (buyer transfer tax 1% $4,300 + tax prorations $2,224 + CPL $125 + title $4,682.52) | Seller-side transfer tax 1% |
// Buyer agent 2.5% at sale | Seller agent 0%. Holding $51,864 = draw interest $45,288 + $548/mo utilities.
export const deal = {
  ...DEFAULT_INPUTS, appVersion: 'NORMAL', state: '',
  purchasePrice: 430000, rehabBudget: 144000, arv: 705000, appraised_value: 0,
  financingPercentage: 90, useCustomFinancing: false, rehabFinancingPercentage: 90,
  earnestMoneyDeposit: 10000, holdingPeriodMonths: 12, liquidity: 100000,
  interestRate: 9.25, originationPoints: 1.5, loanType: 'HARD_MONEY',
  underwritingFee: 0, processingFee: 0, wireFee: 0, docPrepFee: 0, otherLenderFees: 1230,
  transferTaxRate: 1, titleInsuranceRate: 0, titleInsuranceAmount: 4682.52, cplFee: 125, numberOfEndorsements: 0,
  schoolTaxAtClosing: 2224,
  monthlyElectric: 548, monthlyInternet: 0, monthlyPropane: 0,
  sellingCommissionRate: 0, sellingSellerAgentCommissionRate: 0, sellingBuyerAgentCommissionRate: 2.5,
  sellingTransferTaxRate: 1, sellingLegalFees: 0,
  insurancePaymentMode: 'NONE', // the $51,864 holding figure has no insurance
} as LoanInputs;

const r = calculateLoan(deal);
eq(r.totalLenderFees, 8979, 'setup: lender fees');
eq(r.totalClosingCosts - r.totalLenderFees, 11331.52, 'setup: third-party fees');
eq(r.totalHoldingCosts, 51864, 'setup: holding costs');

// --- 1. Rehab financing % ---
const pct = financingPercents(deal);
eq(r.qualifiedLoanAmount, 430000 * 0.9 + 144000 * 0.9, 'loan = price × 90% + rehab × 90%');
eq(financedLoan(430000, 144000, pct), 516600, 'financedLoan helper');
eq(r.maxAllowableOffer, 443500, 'max offer at 90% rehab = (705,000 × 75% − 129,600) ÷ 90%');
is(!(deal.purchasePrice > r.maxAllowableOffer), 'no "over max offer" flag at 90% rehab');
eq(r.ltv, 73.28, 'LTV = 516,600 ÷ 705,000');
is((r.ltv <= 75) === (deal.purchasePrice <= r.maxAllowableOffer), 'LTV note and max-offer flag agree');
eq(r.rehabOutOfPocket, 14400, 'rehab not covered = 144,000 × 10%');
eq(requiredArvFor(430000, 144000, pct, 0.75), 688800, 'required ARV @75% = 516,600 ÷ 0.75');

const full = calculateLoan({ ...deal, rehabFinancingPercentage: 100 });
eq(full.maxAllowableOffer, 427500, 'max offer at 100% rehab');
// 387,000 + 144,000 = 531,000 is over 75% of ARV → loan capped at 528,750; you cover the last 2,250
eq(full.qualifiedLoanAmount, 528750, 'loan at 100% rehab capped at ARV × 75%');
is(deal.purchasePrice > full.maxAllowableOffer && full.ltv > 75, 'at 100% rehab: over max offer AND LTV over 75% (still agree)');
eq(full.rehabOutOfPocket, 2250, 'rehab not covered at 100% = the cap shortfall');
eq(full.monthlyInterestPayments[11], 528750 * 0.0925 / 12, 'draws stop at the capped loan');

const old = calculateLoan({ ...deal, rehabFinancingPercentage: undefined });
eq(old.qualifiedLoanAmount, r.qualifiedLoanAmount, 'old deal without the field → rehab % = financing %');

eq(maxOfferFor(705000, 0.75, 144000, { purchase: 90, rehab: 80 }), (528750 - 115200) / 0.9, 'max offer at 80% rehab');

// --- 2. Total cash needed vs liquidity ---
eq(r.totalCashToClose, 53310.52, 'due at closing');
eq(r.totalCashNeeded, 129574.52, 'total cash needed = 10,000 + 53,310.52 + 14,400 + 51,864');
eq(r.cashShortfall, 29574.52, 'shortfall vs $100,000');
eq(r.monthlyCashOut.reduce((s, m) => s + m, 0), r.totalCashNeeded - r.totalPaidOut, 'monthly cash out sums to the rest');
// After closing $36,689.48 left; months 1–5 spend $34,553.13 (interest + $548 + $3,600 rehab share in months 2–5),
// month 6 another $4,530.13 → runs out in month 6.
is(r.cashRunwayMonth === 6, `cash runs out in month 6 (got ${r.cashRunwayMonth})`);
eq(r.requiredLiquidity, 84910.52, 'lender minimum liquidity unchanged');
const rich = calculateLoan({ ...deal, liquidity: 200000 });
is(rich.cashShortfall === 0 && rich.cashRunwayMonth === null, 'enough cash → no shortfall, no runway month');
const broke = calculateLoan({ ...deal, liquidity: 50000 });
is(broke.cashRunwayMonth === 0, 'less than due by closing → runway month 0');
const withCont = calculateLoan({ ...deal, includeContingencyInCashNeeded: true });
eq(withCont.totalCashNeeded, 129574.52 + 21600, 'contingency toggle adds 15% of rehab');

// --- 3. Tax treatment ---
eq(r.effectiveTaxRate, 24 + 3.07, '12-month hold defaults to short-term 24% + PA 3.07%');
is(r.taxTreatmentUsed === 'SHORT_TERM', 'treatment = short-term');
eq(r.estimatedCapitalGainsTax, r.netProfit * 0.2707, 'tax = profit × 27.07%');
is(calculateLoan({ ...deal, taxTreatment: 'LONG_TERM' }).taxTreatmentUsed === 'SHORT_TERM', 'long-term not allowed at 12 months');
eq(calculateLoan({ ...deal, holdingPeriodMonths: 13 }).effectiveTaxRate, 15 + 3.07, '13-month hold defaults to long-term 15% + 3.07%');
eq(taxTreatmentRate({ holdingPeriodMonths: 6, taxTreatment: 'DEALER', includeSelfEmploymentTax: true }).rate, 24 + 3.07 + 15.3, 'dealer + SE tax');
eq(taxTreatmentRate({ holdingPeriodMonths: 6, taxTreatment: 'DEALER' }).rate, 27.07, 'dealer without SE tax');

// --- 4. Insurance: builder's risk on (price + rehab), premium at closing ---
eq(builderRiskAnnualPremium(430000, 144000), 4305, "builder's risk premium = 574,000 × 0.75%");
eq(estimateMonthlyInsurance(430000, 144000), 359, 'monthly insurance estimate (was $34 homeowner average)');
eq(estimateMonthlyInsurance(430000, 144000, 1), Math.round(5740 / 12), 'user-editable rate (1%)');
const insured = { ...deal, insurancePaymentMode: 'MONTHLY', includeMonthlyInsurance: true, monthlyInsurance: 359 } as LoanInputs;
eq(calculateLoan(insured).totalHoldingCosts, 51864 + 359 * 12, 'monthly insurance counts in holding');
// Either/or (2026-11-01 v2): a premium typed in the closing field is ignored while paying monthly, and vice versa
const bothEntered = calculateLoan({ ...insured, insuranceCost: 4305 });
eq(bothEntered.totalCashToClose, 53310.52, 'paid monthly → closing premium NOT in Due at Closing');
eq(bothEntered.holdingBreakdown.insurance, 359 * 12, 'paid monthly → monthly insurance only');
const upfront = calculateLoan({ ...insured, insurancePaymentMode: 'UPFRONT', insuranceCost: 4305 });
eq(upfront.totalCashToClose, 53310.52 + 4305, 'paid upfront → premium in Due at Closing');
eq(upfront.holdingBreakdown.insurance, 0, 'paid upfront → no monthly insurance');

// --- 5. Closing cost gaps ---
const pa = { ...deal, state: 'PA' } as LoanInputs;
eq(computeEstimates({ ...pa, closingDate: '2026-11-21' }).prepaidInterestAtClosing, Math.round(387000 * 0.0925 / 365 * 10), 'prepaid interest = 387,000 × 9.25% ÷ 365 × 10 days (Nov 21–30)');
eq(computeEstimates({ ...pa, closingDate: '' }).prepaidInterestAtClosing, Math.round(387000 * 0.0925 / 365 * 15), 'no closing date → 15 days');
eq(computeEstimates(pa).insuranceCost, 4305, 'insurance premium estimate');
const withPrepaid = calculateLoan({ ...deal, prepaidInterestAtClosing: 1471 });
eq(withPrepaid.totalCashToClose, 53310.52 + 1471, 'prepaid interest is in Due at Closing');
const missing = likelyMissingCosts(deal).map((m) => m.field).sort().join(',');
is(missing === 'appraisalCost,inspectionCost,prepaidInterestAtClosing', `3 likely costs not entered with insurance set to None (${missing})`);
is(likelyMissingCosts({ ...deal, insurancePaymentMode: 'UPFRONT' }).some((m) => m.field === 'insuranceCost'), 'upfront premium not entered → flagged');
is(likelyMissingCosts({ ...deal, insurancePaymentMode: 'MONTHLY' }).some((m) => m.field === 'monthlyInsurance'), 'monthly on the estimate → flagged');
is(likelyMissingCosts({ ...deal, insurancePaymentMode: 'UPFRONT', appraisalCost: 600, inspectionCost: 450, insuranceCost: 4305, prepaidInterestAtClosing: 1471 }).length === 0, 'none flagged once entered');
is(!likelyMissingCosts({ ...deal, interestRate: 0 }).some((m) => m.field === 'prepaidInterestAtClosing'), 'no prepaid interest flag without a rate');

// --- 6. Total Project Costs = costs in the Profit Calculation ---
const projectCosts = (x: typeof r) => x.totalAcquisitionCosts + x.totalHoldingCosts + x.totalExitCosts;
eq(r.acquisitionBreakdown.taxProrations, 2224, 'tax prorations are their own acquisition line');
eq(r.totalAcquisitionCosts, 20310.52, 'acquisition = closing costs (incl. the $2,224 prorations the old card dropped)');
eq(projectCosts(r), 96849.52, 'Total Project Costs = 20,310.52 + 51,864 + 24,675');
eq(projectCosts(r), 705000 - 430000 - 144000 - r.netProfit, 'Total Project Costs = ARV − price − rehab − profit');
eq(r.netProfit, 34150.48, 'net profit');
// Messier deal: concession, prepaid inspections, insurance, dues, agent split — still adds up
const messy = calculateLoan({ ...deal, sellerConcessionRate: 2, appraisalCost: 600, inspectionCost: 450, radonInspection: 150,
  insurancePaymentMode: 'MONTHLY', insuranceCost: 4305, includeMonthlyInsurance: true, monthlyInsurance: 359, holdingPeriodMonths: 15,
  includeYearlyDues: true, yearlyDues: 1200, includeMonthlyTaxes: true, monthlyTaxes: 360, weAreTheRealEstateAgent: true } as LoanInputs);
eq(projectCosts(messy), 705000 - 430000 - 144000 - messy.netProfit, 'messy deal: Total Project Costs still = ARV − price − rehab − profit');
// Prepaid inspection/appraisal are your cash — they now come out of profit (they were in Total Paid Out only)
eq(calculateLoan({ ...deal, appraisalCost: 600 }).netProfit, r.netProfit - 600, 'appraisal paid before closing reduces profit');

// --- 7. Holding breakdown lists every component of the total ---
const hb = messy.holdingBreakdown;
eq(hb.interest + hb.utilities + hb.insurance + hb.taxes + hb.water + hb.dues, messy.totalHoldingCosts, 'holding components sum to Total Holding');
eq(hb.insurance, 359 * 15, 'insurance paid monthly all 15 months (closing premium ignored)');
eq(hb.taxes, 360 * 15, 'taxes line');
eq(hb.dues, 1200, 'dues line');
eq(r.holdingBreakdown.interest + r.holdingBreakdown.utilities, 51864, 'reference: interest 45,288 + utilities 6,576');

if (failed) { console.error(`${failed} check(s) failed`); process.exit(1); }
console.log('All deal-case checks passed');
