// Closing cost lookup table by state
export interface StateClosingCosts {
  titleInsurance: number; // Estimated title insurance cost
  cplFee: number; // CPL fee (Certificate of Property Location)
  transferTaxRate: number; // Transfer tax rate as percentage
}

export const CLOSING_COST_BY_STATE: Record<string, StateClosingCosts> = {
  'PA': { 
    titleInsurance: 1589.30, // Uses PA Title Insurance Rate Table by default
    cplFee: 125, 
    transferTaxRate: 0 
  },
  'NJ': { 
    titleInsurance: 1200, 
    cplFee: 125, 
    transferTaxRate: 0.5 
  },
  'NY': { 
    titleInsurance: 1400, 
    cplFee: 150, 
    transferTaxRate: 0.5 
  },
  'CA': { 
    titleInsurance: 900, 
    cplFee: 0, 
    transferTaxRate: 1.1 
  },
  'TX': { 
    titleInsurance: 600, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'FL': { 
    titleInsurance: 800, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'IL': { 
    titleInsurance: 1000, 
    cplFee: 100, 
    transferTaxRate: 0.5 
  },
  // Add more states as needed
  'MD': { 
    titleInsurance: 1100, 
    cplFee: 125, 
    transferTaxRate: 0.5 
  },
  'VA': { 
    titleInsurance: 950, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'NC': { 
    titleInsurance: 850, 
    cplFee: 0, 
    transferTaxRate: 0.2 
  },
  'SC': { 
    titleInsurance: 800, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'GA': { 
    titleInsurance: 750, 
    cplFee: 0, 
    transferTaxRate: 0.1 
  },
  'OH': { 
    titleInsurance: 900, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'MI': { 
    titleInsurance: 950, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
  'AZ': { 
    titleInsurance: 850, 
    cplFee: 0, 
    transferTaxRate: 0.1 
  },
  'NV': { 
    titleInsurance: 900, 
    cplFee: 0, 
    transferTaxRate: 0 
  },
};

export const getStateClosingCosts = (state: string): StateClosingCosts | null => {
  return CLOSING_COST_BY_STATE[state] || null;
};

