// Tests for the 2026-11-01 "remaining fixes" round. Run: npm test
// Deal: purchase $430k, rehab $155k, ARV $725k, 90% / 90%, EMD $10k, 9.25%, 1.5 pts, 12 months.
import { readFileSync } from 'fs';
import { calculateLoan, formatCurrency } from './calculations';
import { estimateMonthlyInsurance, legacyHomeownerInsurance } from './stateHoldingCosts';
import { withEstimates, refreshEstimates } from './closingEstimates';
import { dealVerdict, cashShortIssue } from './dealVerdict';
import { sensitivityHeadline } from './sensitivityAnalysis';
import { DEFAULT_INPUTS, LoanInputs } from '../types';

let failed = 0;
const eq = (actual: number, expected: number, msg: string) => {
  const ok = Math.abs(actual - expected) < 0.005;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}: ${actual.toFixed(2)}${ok ? '' : ` (expected ${expected.toFixed(2)})`}`);
};
const is = (ok: boolean, msg: string) => { if (!ok) failed++; console.log(`${ok ? 'OK  ' : 'FAIL'} ${msg}`); };

const deal = {
  ...DEFAULT_INPUTS, appVersion: 'NORMAL', state: 'PA', county: '',
  purchasePrice: 430000, rehabBudget: 155000, arv: 725000, appraised_value: 0,
  financingPercentage: 90, useCustomFinancing: false, rehabFinancingPercentage: 90,
  earnestMoneyDeposit: 10000, interestRate: 9.25, originationPoints: 1.5, loanType: 'HARD_MONEY', holdingPeriodMonths: 12,
  underwritingFee: 0, processingFee: 0, wireFee: 0, docPrepFee: 0, otherLenderFees: 0,
  transferTaxRate: 1, closingDate: '', liquidity: 100000,
} as LoanInputs;

// --- 1. Insurance: builder's risk default, either/or ---
eq(estimateMonthlyInsurance(430000, 155000), 366, "builder's risk = 585,000 × 0.75% ÷ 12");
eq(legacyHomeownerInsurance(430000, 'PA'), 34, 'the old homeowner default was $34');
const legacy = calculateLoan({ ...deal, includeMonthlyInsurance: true, monthlyInsurance: 34 });
eq(legacy.monthlyInsuranceUsed, 366, 'saved $34 → builder\'s-risk $366 used');
is(legacy.insuranceMode === 'MONTHLY', 'old deal with monthly insurance → Paid monthly');
eq(calculateLoan({ ...deal, includeMonthlyInsurance: true, monthlyInsurance: 0 }).monthlyInsuranceUsed, 366, 'blank monthly → estimate');
eq(calculateLoan({ ...deal, includeMonthlyInsurance: true, monthlyInsurance: 250 }).monthlyInsuranceUsed, 250, 'a typed quote is kept');
const monthly = calculateLoan({ ...deal, insurancePaymentMode: 'MONTHLY', insuranceCost: 4000 });
const upfront = calculateLoan({ ...deal, insurancePaymentMode: 'UPFRONT', insuranceCost: 4000 });
eq(monthly.insuranceCost, 0, 'paid monthly → no premium at closing');
eq(monthly.holdingBreakdown.insurance, 366 * 12, 'paid monthly → 12 × $366');
eq(upfront.insuranceCost, 4000, 'paid upfront → premium at closing');
eq(upfront.holdingBreakdown.insurance, 0, 'paid upfront → no monthly');
eq(upfront.totalClosingCosts - monthly.totalClosingCosts, 4000, 'only the closing side differs');
eq(calculateLoan({ ...deal, insurancePaymentMode: 'UPFRONT', insuranceCost: 0 }).insuranceCost, 4388, 'upfront, blank premium → 12-month estimate (4,387.50)');
eq(calculateLoan({ ...deal, insurancePaymentMode: 'NONE', insuranceCost: 4000, monthlyInsurance: 300 }).holdingBreakdown.insurance
  + calculateLoan({ ...deal, insurancePaymentMode: 'NONE', insuranceCost: 4000 }).insuranceCost, 0, 'none → neither');

// --- 2. Prepaid interest auto-estimate ---
const noDate = withEstimates(deal);
eq(noDate.prepaidInterestAtClosing, Math.round(387000 * 0.0925 / 365 * 15), 'blank closing date → 387,000 × 9.25% ÷ 365 × 15 = $1,471');
is(!!noDate.estimatedFields?.includes('prepaidInterestAtClosing'), 'marked EST');
eq(withEstimates({ ...deal, closingDate: '2026-11-21' }).prepaidInterestAtClosing, Math.round(387000 * 0.0925 / 365 * 10), 'Nov 21 → 10 days to month-end');
eq(withEstimates({ ...deal, state: '' }).prepaidInterestAtClosing, 1471, 'works without a state');
const before = calculateLoan({ ...deal, insurancePaymentMode: 'NONE' });
const after = calculateLoan({ ...noDate, insurancePaymentMode: 'NONE' });
eq(after.totalClosingCosts - before.totalClosingCosts, 1471, 'in Closing Costs');
eq(after.totalCashToClose - before.totalCashToClose, 1471, 'in Due at Closing');
eq(after.totalCashNeeded - before.totalCashNeeded, 1471, 'in Total Cash Needed');
eq(withEstimates({ ...deal, prepaidInterestAtClosing: 900 }).prepaidInterestAtClosing, 900, 'a typed amount is kept');
// App runs refreshEstimates() in an effect on every inputs change — it must settle (same object) after one pass
const once = refreshEstimates(deal);
is(refreshEstimates(once) === once, 'refreshEstimates settles after one pass');
const blank = refreshEstimates({ ...DEFAULT_INPUTS, purchasePrice: undefined as any, interestRate: undefined as any });
is(refreshEstimates(blank) === blank, 'settles even with blank (NaN) inputs');

// --- 3. Verdict: cash shortfall → critical issue + RED ---
const r = calculateLoan(noDate);
is(r.cashShortfall > 0 && r.cashRunwayMonth !== null, `deal is short: ${formatCurrency(r.cashShortfall)}, month ${r.cashRunwayMonth}`);
const issue = cashShortIssue(deal.liquidity, r);
is(issue === `Short ${formatCurrency(r.cashShortfall)} — cash runs out in month ${r.cashRunwayMonth}`, `issue text: ${issue}`);
const v = dealVerdict({ profitMargin: 0.5, irr: 1, seventyPercentRuleMet: true, ltv: 50, afterTaxProfit: 1e6, cashIssue: issue });
is(v.status === 'red' && v.issues[0] === issue, 'otherwise-perfect deal goes RED when short on cash');
is(cashShortIssue(1e7, calculateLoan({ ...noDate, liquidity: 1e7 })) === null, 'enough cash → no issue');
is(cashShortIssue(0, r) === null, 'no liquidity entered → no issue');

// --- 4. Sensitivity headers come from the rows ---
const p10 = r.purchaseSensitivityScenarios.find((s) => Math.abs(s.percentChange - 10) < 1e-9)!;
const head = sensitivityHeadline(r.purchaseSensitivityScenarios, 10, 'Overpaying by');
is(head === `Overpaying by 10% = $${Math.round(-p10.profitChange).toLocaleString('en-US')} loss`, `purchase header: ${head}`);
const r20 = r.rehabSensitivityScenarios.find((s) => Math.abs(s.percentChange - 20) < 1e-9)!;
is(sensitivityHeadline(r.rehabSensitivityScenarios, 20, 'Rehab overrun') === `Rehab overrun 20% = $${Math.round(-r20.profitChange).toLocaleString('en-US')} loss`, 'rehab header from the 20% row');
const ui = readFileSync('components/SensitivityAnalysis.tsx', 'utf8');
is(!ui.includes('$15K') && !ui.includes('$8K'), 'no hard-coded $15K / $8K text');

// --- 5. Purchase sensitivity recalculates the whole deal ---
for (const s of r.purchaseSensitivityScenarios) {
  eq(s.profit, calculateLoan({ ...noDate, purchasePrice: s.purchasePrice }).netProfit, `${s.label} row = full recalculation`);
}
// +10% ($43,000): price + 1% buy-side transfer tax + points + interest on the bigger loan
is(-p10.profitChange > 43000 + 430 + 38700 * 0.015, `+10% costs more than 1:1 ($${Math.round(-p10.profitChange).toLocaleString('en-US')})`);

// --- 6. No "positive cash flow" for flips; margin target is a setting (default 12% of ARV) ---
is(!readFileSync('components/RealismCheckPanel.tsx', 'utf8').includes("push('Positive cash flow')"), '"Positive cash flow" removed');
const at = (m: number, target?: number) => dealVerdict({ profitMargin: m, irr: 1, seventyPercentRuleMet: true, ltv: 50, afterTaxProfit: 1, marginTarget: target });
is(at(0.13).status === 'green', '13% margin passes the default 12% target');
is(at(0.11).issues[0] === 'Profit margin 11.0% (target: 12%+ of ARV)', '11% flagged against 12%');
is(at(0.13, 15).issues.length === 1, 'target from Settings (15%) flags 13%');

// --- 7. Labels ---
const src = (f: string) => readFileSync(f, 'utf8');
const loanCard = src('components/LoanEstimateCard.tsx');
const inputsUi = src('components/InputSections.tsx');
const report = src('ReportMode.tsx');
is(!loanCard.includes('Interest + Insurance + Taxes') && loanCard.includes('Monthly Carrying Cost'), '"Monthly Carrying Cost" label');
is(!inputsUi.includes('Grand Total (Annual)') && !report.includes('Grand Total (Annual)'), '"Grand Total (Annual)" gone');
is(inputsUi.includes('Total Over Hold') && report.includes('Total Over Hold'), '"Total Over Hold" label');
is(/yearlyWaterCost > 0 \|\| results\.yearlyDuesCost > 0\) && \(\s*<span[^>]*>Includes one-time fees/.test(inputsUi)
  && /yearlyWaterCost > 0 \|\| results\.yearlyDuesCost > 0\) && \(\s*<span[^>]*>Includes one-time fees/.test(report), '"Includes one-time fees" only with water/dues');
is(inputsUi.includes("inputs.loanType !== 'HARD_MONEY' && inputs.includePITI ? ' (Insurance & Taxes in Payment)'"), 'hard money: no "(Insurance & Taxes in Payment)"');
const cashCard = src('components/CashRequiredSummary.tsx');
is(!cashCard.includes('(lender requirement)') && cashCard.includes('(per lender profile — verify)'), 'contingency label');

if (failed) { console.error(`${failed} check(s) failed`); process.exit(1); }
console.log('All remaining-fixes checks passed');
