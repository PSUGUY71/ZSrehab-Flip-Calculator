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
import { annualPropertyTax } from './stateHoldingCosts';

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
  'prepaidInterestAtClosing',
  'domesticLienSearch', 'patriotActSearch', 'radonInspection',
] as const;
export type EstimateField = typeof ESTIMATE_FIELDS[number];

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

/** Estimated dollar value for every estimate field, from the current deal. */
export const computeEstimates = (inp: LoanInputs): Record<EstimateField, number> => {
  const c = getCountyThirdPartyCosts(inp.state, inp.county);
  const price = inp.purchasePrice || 0;
  const annualTax = annualPropertyTax(inp).amount; // listing's tax bill, else county rate × price, else state rate
  const left = remaining(inp.closingDate);
  const financing = inp.useCustomFinancing ? inp.customFinancingPercentage : inp.financingPercentage;
  const loanAtClosing = price * ((financing || 0) / 100);
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
    prepaidInterestAtClosing: r(loanAtClosing * ((inp.interestRate || 0) / 100) / 360 * left.monthDays),
    ...FLAT,
  };
};

/**
 * Refresh estimate fields. With `seed`, every estimate field still at $0 becomes an estimate first.
 * No-op in HIDEOUT mode (real HUD numbers) or before a state is chosen.
 */
export const withEstimates = (inp: LoanInputs, seed = false): LoanInputs => {
  if (inp.appVersion === 'HIDEOUT' || !inp.state) return inp;
  const est = new Set(inp.estimatedFields || []);
  if (seed) ESTIMATE_FIELDS.forEach((f) => { if (!(inp as any)[f]) est.add(f); });
  if (est.size === 0 && !inp.estimatedFields) return inp;
  const values = computeEstimates(inp);
  const updated: any = { ...inp, estimatedFields: [...est] };
  est.forEach((f) => { if (f in values) updated[f] = values[f as EstimateField]; });
  return updated;
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
