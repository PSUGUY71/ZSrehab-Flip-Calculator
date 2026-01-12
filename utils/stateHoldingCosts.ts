// State-based default estimates for insurance and property tax
// These are rough estimates based on typical market rates

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

export const estimateMonthlyTax = (purchasePrice: number, state: string): number => {
  const stateCosts = getStateHoldingCosts(state);
  if (!stateCosts) return 0;
  // Calculate: (purchasePrice * taxRatePercent / 100) / 12
  return Math.round((purchasePrice * stateCosts.taxRatePercent / 100) / 12);
};

