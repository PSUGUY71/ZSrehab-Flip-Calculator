// Self-check: NORMAL mode must not charge HIDEOUT-only HUD items. Run: npx esbuild utils/calculations.check.ts --bundle --platform=node | node
import { calculateLoan } from './calculations';
import { DEFAULT_INPUTS, LoanInputs } from '../types';

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
console.log('OK  NORMAL 3rd party:', normal.totalThirdPartyFees.toFixed(2), '| HIDEOUT 3rd party:', hideout.totalThirdPartyFees.toFixed(2),
  '| NORMAL title (PA table):', normal.titleInsuranceCost.toFixed(2));
