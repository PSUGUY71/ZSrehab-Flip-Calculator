// Self-check: NORMAL mode must not charge HIDEOUT-only HUD items. Run: npx esbuild utils/calculations.check.ts --bundle --platform=node | node
import { calculateLoan } from './calculations';
import { DEFAULT_INPUTS, LoanInputs } from '../types';
import { applyCountyCosts, withEstimates, markReal } from './closingEstimates';

const hideoutLeftovers: Partial<LoanInputs> = {
  state: 'PA', purchasePrice: 200000,
  walkerAttorneyFee: 750, walkerNotaryFee: 140, walkerSettlementFee: 1583.4,
  walkerDocPrep: 175, walkerOvernight: 200, walkerWire: 200,
  titleSearchFee: 180, lendersTitleInsurance: 365.5, ownersTitlePolicy: 35,
  capitalImprovementFee: 50, resaleCertificateFee: 250, hideoutTransferFee: 2160,
  hideoutAnnualFee: 2400, roamingwoodAnnual: 500, schoolTaxAnnual: 1100, sewerWaterAnnual: 1700,
};

const normal = calculateLoan({ ...DEFAULT_INPUTS, ...hideoutLeftovers, appVersion: 'NORMAL' } as LoanInputs);
const hideout = calculateLoan({ ...DEFAULT_INPUTS, ...hideoutLeftovers, appVersion: 'HIDEOUT' } as LoanInputs);

const assert = (cond: boolean, msg: string) => { if (!cond) { console.error('FAIL:', msg); process.exit(1); } };
assert(normal.totalWalkerFees === 0, 'Walker fees zero in NORMAL');
assert(normal.hideoutTransferCost === 0, 'Hideout transfer zero in NORMAL');
for (const k of ['titleSearchFee', 'ownersTitlePolicy', 'capitalImprovementFee', 'resaleCertificateFee'] as const) {
  assert((normal as any)[k] === 0, `${k} zero in NORMAL`);
  assert((hideout as any)[k] > 0, `${k} still charged in HIDEOUT`);
}
assert(normal.titleInsuranceCost !== 365.5, 'NORMAL title uses rate table, not Hideout lender policy');
assert(hideout.titleInsuranceCost === 365.5, 'HIDEOUT title uses lender policy override');
// --- Placeholder estimates (utils/closingEstimates.ts) ---
const base = { ...DEFAULT_INPUTS, appVersion: 'NORMAL', state: 'PA', county: 'Allegheny County',
  purchasePrice: 200000, interestRate: 12, closingDate: '2026-10-15' } as LoanInputs;
let est = applyCountyCosts(base);
assert(est.surveyFee === 433 && est.legalSettlementFees === 764, 'county values filled');
assert(est.municipalTaxProration > 0 && est.schoolTaxAtClosing > 0 && est.prepaidInterestAtClosing > 0, 'blanks filled with averages');
assert(est.estimatedFields!.includes('schoolTaxAtClosing'), 'filled fields tagged as estimates');
const school200k = est.schoolTaxAtClosing;
est = withEstimates({ ...est, purchasePrice: 400000 });
assert(est.schoolTaxAtClosing > school200k, 'estimates follow purchase price');
est = withEstimates({ ...markReal(est, 'surveyFee'), surveyFee: 600 });
est = withEstimates({ ...est, purchasePrice: 300000 });
assert(est.surveyFee === 600 && !est.estimatedFields!.includes('surveyFee'), 'typed real number is kept');
assert(withEstimates({ ...est, appVersion: 'HIDEOUT', surveyFee: 750 } as LoanInputs).surveyFee === 750, 'HIDEOUT untouched');
console.log('OK  estimates (Allegheny, $300k):', Object.fromEntries(est.estimatedFields!.map((f) => [f, (est as any)[f]])));

console.log('OK  NORMAL 3rd party:', normal.totalThirdPartyFees.toFixed(2), '| HIDEOUT 3rd party:', hideout.totalThirdPartyFees.toFixed(2),
  '| NORMAL title (PA table):', normal.titleInsuranceCost.toFixed(2));

// --- PA transfer tax by municipality (utils/paTransferTax.ts) + title quote $ override ---
import { paTransferTaxTotal, paTransferTaxShares } from './paTransferTax';
assert(paTransferTaxTotal('Allegheny County', '').total === 2, 'standard PA town = 2% total');
assert(paTransferTaxTotal('Philadelphia County').total === 4.578, 'Philadelphia 4.578% total');
assert(paTransferTaxTotal('Allegheny County', 'Pittsburgh, City of (Pittsburgh School District)').total === 5, 'Pittsburgh 5% total');
assert(paTransferTaxShares('Berks County', 'Reading, City of').buyerRate === 2.5, 'Reading buyer half = 2.5%');
const quoted = calculateLoan({ ...base, titleInsuranceAmount: 1234 } as LoanInputs);
assert(quoted.titleInsuranceCost === 1234, 'NORMAL uses title $ from quote');
assert(calculateLoan({ ...base, appVersion: 'HIDEOUT', titleInsuranceAmount: 1234, lendersTitleInsurance: 0 } as LoanInputs).titleInsuranceCost === 0, 'quote $ ignored in HIDEOUT');
console.log('OK  PA transfer tax + title quote override');
