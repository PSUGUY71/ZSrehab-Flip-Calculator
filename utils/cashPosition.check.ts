// Unit tests: EMD applied once, cash position, net profit, liquidity, LTV, sensitivity, interest.
// Run: npm test   (or: node_modules/.bin/esbuild utils/cashPosition.check.ts --bundle --platform=node | node)
import { calculateLoan, cashPosition } from './calculations';
import { DEFAULT_INPUTS, LoanInputs } from '../types';

let failed = 0;
const eq = (actual: number, expected: number, msg: string) => {
  const ok = Math.abs(actual - expected) < 0.005;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}: ${actual.toFixed(2)}${ok ? '' : ` (expected ${expected.toFixed(2)})`}`);
};

// The reported deal: $430k price, $144k rehab, 90% financing, $10k EMD, $705k ARV, 12-month hold.
// Closing $20,310.52 = lender $8,979 + third-party $11,331.52; holding + selling = $76,539 (implied by the report's
// figures). Built from explicit fees so the totals are exact.
const deal = {
  ...DEFAULT_INPUTS, appVersion: 'NORMAL', state: '',
  purchasePrice: 430000, rehabBudget: 144000, arv: 705000, appraised_value: 0,
  financingPercentage: 90, useCustomFinancing: false, earnestMoneyDeposit: 10000, holdingPeriodMonths: 12,
  originationPoints: 0, underwritingFee: 0, processingFee: 0, wireFee: 0, docPrepFee: 0, otherLenderFees: 8979,
  transferTaxRate: 0, titleInsuranceRate: 0, titleInsuranceAmount: 11206.52, cplFee: 125, numberOfEndorsements: 0,
  interestRate: 0,
  sellingCommissionRate: 0, sellingSellerAgentCommissionRate: 0, sellingBuyerAgentCommissionRate: 0,
  sellingTransferTaxRate: 0, sellingLegalFees: 76539,
  insurancePaymentMode: 'NONE', // this deal's holding figure has no insurance
} as LoanInputs;

const r = calculateLoan(deal);
eq(r.totalClosingCosts, 20310.52, 'setup: closing costs');
eq(r.totalHoldingCosts + r.totalExitCosts, 76539, 'setup: holding + selling');
eq(r.qualifiedLoanAmount, 516600, 'loan = 90% of (price + rehab)');

eq(r.gapAmount, 43000, 'gap = price − financed purchase (EMD NOT subtracted)');
eq(r.totalCashToClose, 53310.52, 'due at closing = gap + closing − EMD');
eq(r.totalPaidOut, 63310.52, 'total paid out = EMD + due at closing');
eq(r.rehabOutOfPocket, 14400, 'rehab not covered by loan = 144,000 + 387,000 − 516,600');
// The report expected $48,550.48, which counted the gap + closing ($63,310.52) but not the $14,400 of rehab
// the loan doesn't fund. Every dollar of price + rehab + costs is in here: 705,000 − 430,000 − 144,000 − 20,310.52 − 76,539.
eq(r.netProfit, 705000 - 430000 - 144000 - 20310.52 - 76539, 'net profit = ARV − price − rehab − all costs');
eq(r.netProfit, 34150.48, 'net profit');
eq(r.purchaseSensitivityScenarios.find((s) => s.label === 'At Price')!.profit, r.netProfit, '"At Price" sensitivity row = net profit');
eq(r.requiredLiquidity, 84910.52, 'required liquidity = gap 43,000 + closing 20,310.52 + 15% rehab 21,600');
eq(r.ltv, 73.28, 'LTV = loan ÷ ARV (one definition)');
eq(r.ltarv, r.ltv, 'LTV and LTARV agree');

// Rehab overruns: each step costs its full amount, even once the loan hits the 75%-of-ARV cap
const rows = r.rehabSensitivityScenarios;
const over = (p: string) => rows.find((s) => s.label === p)!.profit;
eq(over('Over 10%') - over('Over 20%'), 14400, 'rehab +10% → +20% costs $14,400');
eq(over('Over 20%') - over('Over 30%'), 14400, 'rehab +20% → +30% costs $14,400');
const capped = calculateLoan({ ...deal, rehabBudget: 144000 * 1.3 });
eq(capped.netProfit, over('Over 30%'), 'rehab +30% row = full recalculation (loan capped at $528,750)');

// EMD = 0: due at closing carries the whole gap; profit unchanged (EMD is part of the price, not a cost)
const noEmd = calculateLoan({ ...deal, earnestMoneyDeposit: 0 });
eq(noEmd.totalCashToClose, 63310.52, 'EMD 0 → due at closing');
eq(noEmd.totalPaidOut, 63310.52, 'EMD 0 → total paid out');
eq(noEmd.netProfit, r.netProfit, 'EMD 0 → same net profit');

// Seller concession 3% ($12,900): lowers due at closing and paid out, raises profit by the same amount
const conc = calculateLoan({ ...deal, sellerConcessionRate: 3 });
eq(conc.totalCashToClose, 53310.52 - 12900, 'concession → due at closing');
eq(conc.totalPaidOut, 63310.52 - 12900, 'concession → total paid out');
eq(conc.netProfit, r.netProfit + 12900, 'concession → net profit');

// Shared helper on its own
const c = cashPosition({ gap: 43000, closingCosts: 20310.52, earnestMoneyDeposit: 10000, rehabBudget: 144000 });
eq(c.dueAtClosing, 53310.52, 'cashPosition: due at closing');
eq(c.totalPaidOut, 63310.52, 'cashPosition: total paid out');

// Interest over the hold = sum of the progressive draw schedule, not the full-draw payment × 12
const withRate = calculateLoan({ ...deal, interestRate: 9.25 });
const scheduleSum = withRate.monthlyInterestPayments.reduce((s, m) => s + m, 0);
eq(withRate.totalInterestCosts, scheduleSum, 'interest = sum of draw schedule');
console.log(`     (full-draw payment × 12 would be ${(withRate.monthlyPayment * 12).toFixed(2)})`);

if (failed) { console.error(`${failed} check(s) failed`); process.exit(1); }
console.log('All cash-position checks passed');
