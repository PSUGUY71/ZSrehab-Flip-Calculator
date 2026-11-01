// Tests for the 2026-11-01 "remaining fixes" round. Run: npm test
// Deal: purchase $430k, rehab $155k, ARV $725k, 90% / 90%, EMD $10k, 9.25%, 1.5 pts, 12 months.
import { readFileSync } from 'fs';
import { calculateLoan, formatCurrency } from './calculations';
import { estimateMonthlyInsurance, legacyHomeownerInsurance } from './stateHoldingCosts';
import { withEstimates, refreshEstimates, likelyMissingCosts, prepaidInterestDaysLabel } from './closingEstimates';
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
  // full recalculation incl. the app's estimate refresh (prepaid interest follows the row's loan)
  eq(s.profit, calculateLoan(withEstimates({ ...noDate, purchasePrice: s.purchasePrice })).netProfit, `${s.label} row = full recalculation`);
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

// ===== Round 2 (same deal, as saved in the app: monthly insurance on with the old $34, taxes $364/mo, electric $150) =====
const saved = withEstimates({ ...deal, includeMonthlyInsurance: true, monthlyInsurance: 34, includeMonthlyTaxes: true, monthlyTaxes: 364, monthlyElectric: 150 } as LoanInputs);
const s2 = calculateLoan(saved);
const row = (label: string) => s2.purchaseSensitivityScenarios.find((x) => x.label === label)!;

// --- R2.1 Purchase sensitivity: $34 was only recognised as the old default at the base price ---
const over5 = -row('Over 5%').profitChange, under5 = row('Under 5%').profitChange;
is(over5 > 21500, `Over 5% loss ${formatCurrency(over5)} > $21,500 price change`);
is(over5 > 21500 + 215, 'Over 5% loss > price change + 1% buy-side transfer tax');
eq(row('At Price').profit, s2.netProfit, '"At Price" row === main net profit');
for (const p of [408500, 451500]) {
  eq(calculateLoan({ ...saved, purchasePrice: p }, 0.75, false).monthlyInsuranceUsed, 34, `(the bug) $34 read as a real quote at ${p}`);
}
eq(calculateLoan(withEstimates({ ...saved, purchasePrice: 451500, monthlyInsuranceEstimated: true }), 0.75, false).netProfit, row('Over 5%').profit, 'Over 5% row = deal at $451,500 on the $379 estimate');
// Under 5% gain vs Over 5% loss: equal except where the lender's 75%-of-ARV cap binds ($543,750). Over 5% wants
// $545,850, so $2,100 is paid in cash with no points/interest — overpaying costs that much less in profit.
eq(calculateLoan({ ...saved, purchasePrice: 451500 }).qualifiedLoanAmount, 543750, 'Over 5% loan is capped at 75% of ARV');
is(Math.abs(under5 - over5) < 250, `mirror: Under 5% gain ${formatCurrency(under5)} ≈ Over 5% loss ${formatCurrency(over5)} (cap effect)`);
const uncapped = calculateLoan(withEstimates({ ...saved, arv: 780000 }));
const u = (l: string) => uncapped.purchaseSensitivityScenarios.find((x) => x.label === l)!.profitChange;
is(Math.abs(u('Under 5%') + u('Over 5%')) <= 12, `cap not hit (ARV $780k): Under ${formatCurrency(u('Under 5%'))} mirrors Over ${formatCurrency(-u('Over 5%'))} (≤ $12 whole-dollar insurance rounding)`);

// --- R2.2 Insurance display reads the same value as the totals ---
eq(s2.monthlyInsuranceUsed, 366, 'insurance used = $366, not the saved $34');
eq(s2.holdingBreakdown.insurance, 366 * 12, 'totals use $366 × 12');
const carrying = s2.monthlyPayment + s2.monthlyInsuranceUsed + saved.monthlyTaxes; // LoanEstimateCard "Monthly Carrying Cost"
eq(carrying, 4788.44, 'Monthly Carrying Cost = 4,058.44 + 366 + 364');
eq(carrying + saved.monthlyElectric, 4938.44, 'Total Monthly Cost = carrying + $150 electric');
for (const f of ['components/LoanEstimateCard.tsx', 'components/InputSections.tsx', 'ReportMode.tsx']) {
  is(!/formatCurrency\(inputs\.monthlyInsurance|\(inputs\.monthlyInsurance \|\| 0\) :/.test(src(f)), `${f}: no display reads the raw saved monthlyInsurance`);
}

// --- R2.3 Prepaid interest: blank closing date → 15 days, day count in the label ---
is(DEFAULT_INPUTS.closingDate === '', 'new deals start with a blank closing date (was today → days from today)');
eq(withEstimates({ ...DEFAULT_INPUTS, ...deal, closingDate: DEFAULT_INPUTS.closingDate } as LoanInputs).prepaidInterestAtClosing, 1471, 'new deal → 15 days = $1,471');
is(prepaidInterestDaysLabel('') === '15 days, no closing date', `label: ${prepaidInterestDaysLabel('')}`);
is(prepaidInterestDaysLabel('2026-11-21') === '10 days to month-end', `label: ${prepaidInterestDaysLabel('2026-11-21')}`);
is(src('components/InputSections.tsx').includes('prepaidInterestDaysLabel(inputs.closingDate)') && loanCard.includes('prepaidInterestDaysLabel(inputs.closingDate)'), 'day count shown in both labels');

// --- R2.4 Likely-costs warning: estimate in use → "get a quote", not "not entered" ---
const ins = likelyMissingCosts(saved).find((m) => m.field === 'monthlyInsurance');
is(!!ins && `${ins.label}: ${ins.message}` === "Monthly insurance: using builder's-risk estimate — get a quote", `warning: ${ins && ins.label + ': ' + ins.message}`);
is(!likelyMissingCosts({ ...saved, monthlyInsurance: 250 }).some((m) => m.field === 'monthlyInsurance'), 'a typed quote → no insurance warning');
is(likelyMissingCosts(saved).find((m) => m.field === 'appraisalCost')!.message === 'not entered — likely due (typically $450–$800)', 'blank costs still say "not entered"');

if (failed) { console.error(`${failed} check(s) failed`); process.exit(1); }
console.log('All remaining-fixes checks passed');
