/**
 * Holding cost templates by exit strategy
 * Auto-populates reasonable estimates to reduce guesswork
 */

export interface HoldingCostTemplate {
  monthlyElectric: number;
  monthlyInternet: number;
  monthlyPropane: number;
  monthlyInsurance: number;
  monthlyTaxes: number;
  yearlyWater: number;
  yearlyDues: number;
}

/**
 * Get holding cost template based on exit strategy and property value
 */
export const getHoldingCostTemplate = (
  exitStrategy: 'SELL' | 'REFI',
  propertyValue: number = 100000
): HoldingCostTemplate => {
  if (exitStrategy === 'SELL') {
    // Standard flip - assume property is occupied/maintained for sale
    return {
      monthlyElectric: 120,      // $120/mo typical
      monthlyInternet: 50,       // Keep internet if showing
      monthlyPropane: 80,        // Minimal if not occupied
      monthlyInsurance: 100,     // $100/mo typical vacancy insurance
      monthlyTaxes: (propertyValue / 100000) * 300, // Prorated monthly taxes
      yearlyWater: 200,          // Minimal water/sewer
      yearlyDues: 0,             // No HOA for typical flip
    };
  } else {
    // REFI / BRRR strategy - property will be tenanted
    return {
      monthlyElectric: 120,      // Tenant pays or average
      monthlyInternet: 0,        // Not landlord's responsibility
      monthlyPropane: 80,        // If furnished heating
      monthlyInsurance: 150,     // Landlord liability insurance
      monthlyTaxes: (propertyValue / 100000) * 300, // Monthly prorated
      yearlyWater: 600,          // Common area water/sewer
      yearlyDues: 0,             // No HOA typical
    };
  }
};

/**
 * Get display label for exit strategy
 */
export const getExitStrategyLabel = (exitStrategy: 'SELL' | 'REFI'): string => {
  return exitStrategy === 'SELL' ? 'Flip (Sell)' : 'BRRR (Refi/Hold)';
};
