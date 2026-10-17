// State-based default estimates for insurance and property tax
// These are rough estimates based on typical market rates
import { getCountyTaxRate } from './countyTaxRates';

export interface StateHoldingCosts {
  insurancePerMonthPer100k: number; // Insurance cost per $100k of purchase price per month
  taxRatePercent: number; // Annual property tax rate as percentage of purchase price
}

export const HOLDING_COSTS_BY_STATE: Record<string, StateHoldingCosts> = {
  'PA': { 
    insurancePerMonthPer100k: 8, // ~$8 per $100k per month (vacant/rehab insurance)
    taxRatePercent: 1.5 // ~1.5% annual property tax
  },
  'NJ': { 
    insurancePerMonthPer100k: 10,
    taxRatePercent: 2.4 // Higher property taxes in NJ
  },
  'NY': { 
    insurancePerMonthPer100k: 12,
    taxRatePercent: 1.8
  },
  'CA': { 
    insurancePerMonthPer100k: 6,
    taxRatePercent: 0.73 // Prop 13 limits
  },
  'TX': { 
    insurancePerMonthPer100k: 15, // Higher insurance due to weather risks
    taxRatePercent: 2.0
  },
  'FL': { 
    insurancePerMonthPer100k: 18, // High insurance due to hurricane risk
    taxRatePercent: 0.98
  },
  'IL': { 
    insurancePerMonthPer100k: 9,
    taxRatePercent: 2.3 // High property taxes
  },
  'MD': { 
    insurancePerMonthPer100k: 8,
    taxRatePercent: 1.1
  },
  'VA': { 
    insurancePerMonthPer100k: 7,
    taxRatePercent: 0.8
  },
  'NC': { 
    insurancePerMonthPer100k: 9,
    taxRatePercent: 0.84
  },
  'SC': { 
    insurancePerMonthPer100k: 10,
    taxRatePercent: 0.57
  },
  'GA': { 
    insurancePerMonthPer100k: 8,
    taxRatePercent: 0.91
  },
  'OH': { 
    insurancePerMonthPer100k: 7,
    taxRatePercent: 1.56
  },
  'MI': { 
    insurancePerMonthPer100k: 8,
    taxRatePercent: 1.78
  },
  'AZ': { 
    insurancePerMonthPer100k: 7,
    taxRatePercent: 0.62
  },
  'NV': { 
    insurancePerMonthPer100k: 6,
    taxRatePercent: 0.6
  },
};

export const getStateHoldingCosts = (state: string): StateHoldingCosts | null => {
  return HOLDING_COSTS_BY_STATE[state] || HOLDING_COSTS_BY_STATE['PA']; // Default to PA if state not found
};

export const estimateMonthlyInsurance = (purchasePrice: number, state: string): number => {
  const stateCosts = getStateHoldingCosts(state);
  if (!stateCosts) return 0;
  // Calculate: (purchasePrice / 100000) * insurancePerMonthPer100k
  return Math.round((purchasePrice / 100000) * stateCosts.insurancePerMonthPer100k);
};

/**
 * Yearly property tax for the deal: the actual bill if the user entered it (from the listing), otherwise
 * price × the county's effective rate (Census ACS), otherwise the state average rate.
 */
export const annualPropertyTax = (inp: { purchasePrice?: number; state?: string; county?: string; annualPropertyTax?: number }) => {
  if ((inp.annualPropertyTax || 0) > 0) return { amount: inp.annualPropertyTax!, source: 'listing' as const };
  const county = getCountyTaxRate(inp.state, inp.county);
  const rate = county ?? getStateHoldingCosts(inp.state || '')?.taxRatePercent ?? 0;
  return { amount: (inp.purchasePrice || 0) * rate / 100, source: county !== undefined ? 'county' as const : 'state' as const, rate };
};

export const estimateMonthlyTax = (purchasePrice: number, state: string, county?: string, actualAnnualTax?: number): number =>
  Math.round(annualPropertyTax({ purchasePrice, state, county, annualPropertyTax: actualAnnualTax }).amount / 12);

// Regional utilities estimates (monthly averages for vacant/rehab properties)
// Northeast: Higher heating costs, South: Lower heating but higher cooling
export const estimateMonthlyUtilities = (state: string): number => {
  const northeastStates = ['PA', 'NJ', 'NY', 'CT', 'MA', 'RI', 'VT', 'NH', 'ME'];
  const southStates = ['TX', 'FL', 'GA', 'NC', 'SC', 'AL', 'MS', 'LA', 'AR', 'TN', 'KY', 'VA', 'WV', 'MD', 'DE'];
  
  if (northeastStates.includes(state)) {
    return 150; // Higher heating costs in winter
  } else if (southStates.includes(state)) {
    return 100; // Lower heating, but AC costs in summer
  } else {
    return 125; // Default for other regions (Midwest, West)
  }
};

// Auto-estimate all holding costs when holding months >= 3
export interface HoldingCostEstimates {
  monthlyInsurance: number;
  monthlyTaxes: number;
  monthlyUtilities: number;
  totalMonthlyEstimate: number;
  isVeryConservative: boolean; // Flag if total monthly < $500
}

export const estimateHoldingCosts = (
  purchasePrice: number,
  state: string,
  existingMonthlyElectric: number = 0,
  county?: string,
  actualAnnualTax?: number,
): HoldingCostEstimates => {
  const monthlyInsurance = estimateMonthlyInsurance(purchasePrice, state);
  const monthlyTaxes = estimateMonthlyTax(purchasePrice, state, county, actualAnnualTax);
  // Use existing electric if provided, otherwise estimate based on region
  const monthlyUtilities = existingMonthlyElectric > 0 
    ? existingMonthlyElectric 
    : estimateMonthlyUtilities(state);
  
  const totalMonthlyEstimate = monthlyInsurance + monthlyTaxes + monthlyUtilities;
  const isVeryConservative = totalMonthlyEstimate < 500;
  
  return {
    monthlyInsurance,
    monthlyTaxes,
    monthlyUtilities,
    totalMonthlyEstimate,
    isVeryConservative
  };
};

