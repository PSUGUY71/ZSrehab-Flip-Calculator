// State defaults data - comprehensive lookup for all 50 states + DC

export interface StateDefaults {
  name: string;
  cplFee: number;
  titleInsuranceRate: number; // Percentage (0 = use chart/table, >0 = use rate)
  transferTaxRate: number; // Percentage
  typicalClosingCostPercent: number; // Typical closing costs as % of purchase price
  propertyTaxRate: number; // Annual property tax rate as percentage
  insurancePerMonthPer100k: number; // Insurance cost per $100k per month
  utilitiesRegion: 'northeast' | 'south' | 'other';
  note?: string; // Optional note about special handling
}

// Using dynamic import for JSON in Vite/TypeScript
import stateDefaultsDataRaw from '../data/stateDefaults.json';

const stateDefaultsData = stateDefaultsDataRaw as Record<string, StateDefaults>;

export type StateCode = keyof typeof stateDefaultsData;

// Get all state codes
export const getAllStateCodes = (): StateCode[] => {
  return Object.keys(stateDefaultsData) as StateCode[];
};

// Get state defaults
export const getStateDefaults = (stateCode: string): StateDefaults | null => {
  if (!stateCode) return null;
  const state = stateCode.toUpperCase() as StateCode;
  return stateDefaultsData[state] || null;
};

// Get state name
export const getStateName = (stateCode: string): string => {
  const defaults = getStateDefaults(stateCode);
  return defaults?.name || stateCode;
};

// Apply state defaults to form inputs (only if values are at defaults/zero)
export const applyStateDefaults = (
  currentInputs: any,
  stateCode: string,
  forceUpdate: boolean = false
): Partial<any> => {
  const defaults = getStateDefaults(stateCode);
  if (!defaults) return {};

  const updates: Partial<any> = {};

  // Only update if value is at default/zero OR if forceUpdate is true
  if (forceUpdate || currentInputs.cplFee === 0 || currentInputs.cplFee === 125) {
    updates.cplFee = defaults.cplFee;
  }

  // Transfer tax - only update if zero
  if (forceUpdate || currentInputs.transferTaxRate === 0) {
    updates.transferTaxRate = defaults.transferTaxRate;
  }

  // Title insurance rate - only update if zero (PA uses chart, so 0 is correct)
  if (forceUpdate || currentInputs.titleInsuranceRate === 0) {
    updates.titleInsuranceRate = defaults.titleInsuranceRate;
  }

  return updates;
};

// Get utilities estimate based on region
export const getUtilitiesEstimate = (utilitiesRegion: 'northeast' | 'south' | 'other'): number => {
  switch (utilitiesRegion) {
    case 'northeast':
      return 150;
    case 'south':
      return 100;
    case 'other':
    default:
      return 125;
  }
};

