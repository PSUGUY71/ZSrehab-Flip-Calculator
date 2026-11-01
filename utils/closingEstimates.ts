/**
 * Placeholder closing-cost estimates for NORMAL mode.
 *
 * Any field listed in `inputs.estimatedFields` is an estimate: it's (re)computed from the deal
 * (county, price, closing date, rate) on every change and shown with an EST badge. Typing a real
 * number removes the field from the list, so it's never overwritten again.
 */
import { LoanInputs } from '../types';
import { getCountyThirdPartyCosts } from './thirdPartyCosts';
import { getStateDefaults } from './stateDefaults';
import { annualPropertyTax, builderRiskTermPremium, insuranceModeOf, monthlyInsuranceIsEstimate } from './stateHoldingCosts';
import { financingPercents, financedLoan } from './calculations';

// Fields filled from the county cost table
export const COUNTY_FIELDS = [
  'inspectionCost', 'appraisalCost', 'recordingFees', 'legalSettlementFees', 'surveyFee', 'pestInspectionCost',
] as const;

// ponytail: typical PA split of the annual property tax bill (school / county / municipal) and flat
// search/radon averages — placeholders until the user enters real numbers; per-township data would replace them
const TAX_SHARE = { school: 0.68, county: 0.17, municipal: 0.15 };
const FLAT = { domesticLienSearch: 50, patriotActSearch: 25, radonInspection: 150 };

export const ESTIMATE_FIELDS = [
  ...COUNTY_FIELDS,
  'countyTaxProration', 'municipalTaxProration', 'schoolTaxAtClosing',
  'prepaidInterestAtClosing', 'insuranceCost',
  'domesticLienSearch', 'patriotActSearch', 'radonInspection',
] as const;

/**
 * Costs nearly every financed flip pays. Any still at $0 is flagged "not entered — likely due" with a typical range;
 * insurance running on the builder's-risk estimate is flagged "get a quote". Prepaid interest only with a loan and a rate.
 */
export const likelyMissingCosts = (inp: LoanInputs): { field: string; label: string; message: string }[] => {
  const financed = financedLoan(inp.purchasePrice, 0, financingPercents(inp)) > 0 && (inp.interestRate || 0) > 0;
  const mode = insuranceModeOf(inp);
  const insuranceOnEstimate = mode === 'UPFRONT' ? !(inp.insuranceCost > 0) || !!inp.estimatedFields?.includes('insuranceCost')
    : mode === 'MONTHLY' ? monthlyInsuranceIsEstimate(inp) : false;
  const notEntered = (range: string) => `not entered — likely due (${range})`;
  const list = [
    { field: 'appraisalCost', label: 'Appraisal', message: notEntered('typically $450–$800'), missing: !(inp.appraisalCost > 0) },
    { field: 'inspectionCost', label: 'Inspection', message: notEntered('typically $350–$600'), missing: !(inp.inspectionCost > 0) },
    { field: mode === 'UPFRONT' ? 'insuranceCost' : 'monthlyInsurance', label: mode === 'UPFRONT' ? 'Insurance premium at closing' : 'Monthly insurance',
      message: "using builder's-risk estimate — get a quote", missing: insuranceOnEstimate },
    ...(financed ? [{ field: 'prepaidInterestAtClosing', label: 'Prepaid interest', message: notEntered('loan at closing × rate ÷ 365 × days to month-end'), missing: !(inp.prepaidInterestAtClosing > 0) }] : []),
  ];
  return list.filter((c) => c.missing).map(({ missing, ...c }) => c);
};
export type EstimateField = typeof ESTIMATE_FIELDS[number];
// ponytail: a typed $0 in an auto field is re-estimated (can't tell "blank" from "0"); enter $1 to force near-zero.
export const AUTO_FIELDS = ['prepaidInterestAtClosing'] as const;

const DAY = 86_400_000;
const daysInclusive = (from: Date, to: Date) => Math.max(0, Math.round((to.getTime() - from.getTime()) / DAY) + 1);

/** Fraction of the calendar year, school year (Jul–Jun) and current month left after closing. */
const remaining = (closingDate?: string) => {
  const d = closingDate ? new Date(closingDate + 'T00:00:00') : null;
  if (!d || isNaN(d.getTime())) return { year: 0.5, school: 0.5, monthDays: 15 }; // no date yet: assume mid-period
  const y = d.getFullYear();
  const schoolEnd = d.getMonth() >= 6 ? new Date(y + 1, 5, 30) : new Date(y, 5, 30);
  const monthEnd = new Date(y, d.getMonth() + 1, 0);
  return {
    year: daysInclusive(d, new Date(y, 11, 31)) / 365,
    school: daysInclusive(d, schoolEnd) / 365,
    monthDays: daysInclusive(d, monthEnd),
  };
};

/** Days of prepaid interest: closing date through month-end, or 15 with no date. */
export const prepaidInterestDays = (closingDate?: string) => remaining(closingDate).monthDays;
export const prepaidInterestDaysLabel = (closingDate?: string) =>
  `${prepaidInterestDays(closingDate)} days${isNaN(new Date(closingDate + 'T00:00:00').getTime()) ? ', no closing date' : ' to month-end'}`;

/** Estimated dollar value for every estimate field, from the current deal. */
export const computeEstimates = (inp: LoanInputs): Record<EstimateField, number> => {
  const c = getCountyThirdPartyCosts(inp.state, inp.county);
  const price = inp.purchasePrice || 0;
  const annualTax = annualPropertyTax(inp).amount; // listing's tax bill, else county rate × price, else state rate
  const left = remaining(inp.closingDate);
  // Loan funded at closing = the purchase part only (rehab comes later in draws)
  const loanAtClosing = financedLoan(price, 0, financingPercents(inp));
  const r = Math.round;
  return {
    inspectionCost: c.inspectionCost,
    appraisalCost: c.appraisalCost,
    recordingFees: c.recordingFees,
    legalSettlementFees: c.lawyerFee,
    surveyFee: c.surveyFee,
    pestInspectionCost: c.pestInspectionCost,
    countyTaxProration: r(annualTax * TAX_SHARE.county * left.year),
    municipalTaxProration: r(annualTax * TAX_SHARE.municipal * left.year),
    schoolTaxAtClosing: r(annualTax * TAX_SHARE.school * left.school),
    // Loan at closing × rate ÷ 365 × days to month-end (15 days when no closing date yet)
    prepaidInterestAtClosing: r(loanAtClosing * ((inp.interestRate || 0) / 100) / 365 * left.monthDays),
    insuranceCost: builderRiskTermPremium(price, inp.rehabBudget, inp.insuranceRatePercent, inp.holdingPeriodMonths),
    ...FLAT,
  };
};

/**
 * Refresh estimate fields. With `seed`, every estimate field still at $0 becomes an estimate first.
 * No-op in HIDEOUT mode (real HUD numbers) or before a state is chosen.
 */
export const withEstimates = (inp: LoanInputs, seed = false): LoanInputs => {
  if (inp.appVersion === 'HIDEOUT') return inp;
  const est = new Set(inp.estimatedFields || []);
  // Auto fields estimate themselves whenever blank — no state needed (prepaid interest is just loan × rate × days)
  AUTO_FIELDS.forEach((f) => { if (!(inp as any)[f]) est.add(f); });
  if (!inp.state) {
    // Without a state only the auto fields can be estimated
    [...est].forEach((f) => { if (!(AUTO_FIELDS as readonly string[]).includes(f)) est.delete(f); });
  } else if (seed) ESTIMATE_FIELDS.forEach((f) => { if (!(inp as any)[f]) est.add(f); });
  if (est.size === 0 && !inp.estimatedFields) return inp;
  const values = computeEstimates(inp);
  const updated: any = { ...inp, estimatedFields: [...est] };
  est.forEach((f) => { if (f in values) updated[f] = values[f as EstimateField]; });
  return updated;
};

/** withEstimates(), but returns the SAME object when nothing changed — safe to run from an effect on every render. */
export const refreshEstimates = (inp: LoanInputs): LoanInputs => {
  const next = withEstimates(inp);
  if (next === inp) return inp;
  const same = (next.estimatedFields || []).join() === (inp.estimatedFields || []).join() &&
    ESTIMATE_FIELDS.every((f) => Object.is((next as any)[f], (inp as any)[f])); // Object.is: NaN = NaN, no effect loop
  return same ? inp : next;
};

/** Field typed by the user → it's a real number now. */
export const markReal = (inp: LoanInputs, field: string): LoanInputs =>
  inp.estimatedFields?.includes(field)
    ? { ...inp, estimatedFields: inp.estimatedFields.filter((f) => f !== field) }
    : inp;

/**
 * County picked / switched into NORMAL: county-table fields become estimates (replacing any leftover
 * HIDEOUT/Walker amounts) and every other blank closing field gets an average.
 */
export const applyCountyCosts = (inp: LoanInputs): LoanInputs => {
  if (!inp.state) return inp;
  const c = getCountyThirdPartyCosts(inp.state, inp.county);
  // States with a filed rate table (e.g. PA) keep titleInsuranceRate = 0 so the table is used
  const usesTitleRate = (getStateDefaults(inp.state)?.titleInsuranceRate || 0) > 0;
  return withEstimates({
    ...inp,
    estimatedFields: [...new Set([...(inp.estimatedFields || []), ...COUNTY_FIELDS])],
    ...(usesTitleRate ? { titleInsuranceRate: +(c.titleInsuranceCost * 100).toFixed(2) } : {}),
  }, true);
};
