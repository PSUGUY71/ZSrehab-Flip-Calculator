/**
 * Main Closing Cost Engine
 * Orchestrates all calculations and returns HUD-formatted results
 */

import { DealInput, JurisdictionProfile, ClosingCostResult } from "./types";
import { validateDealInput, throwIfValidationErrors } from "./validators";
import { loadJurisdictionProfile } from "./configLoader";
import { calculateTransferTaxes } from "./taxCalculator";
import { calculateRecordingFees } from "./recordingFeesCalculator";
import { calculateTitleInsurance } from "./titleInsuranceCalculator";
import { calculateProrations } from "./prorationsCalculator";
import { buildHUDOutput } from "./hudOutputFormatter";

/**
 * Main entry point for closing cost calculation
 */
export class ClosingCostEngine {
  private configMap?: Record<string, JurisdictionProfile>;

  constructor(configMap?: Record<string, JurisdictionProfile>) {
    this.configMap = configMap;
  }

  /**
   * Calculate closing costs for a deal
   */
  public calculate(input: DealInput): ClosingCostResult {
    // 1. Validate input
    const validationErrors = validateDealInput(input);
    throwIfValidationErrors(validationErrors);

    // 2. Load jurisdiction profile
    const { profile, matched_path } = loadJurisdictionProfile(
      input.property.state,
      input.property.county,
      input.property.city,
      input.property.zip,
      this.configMap
    );

    // 3. Calculate all components
    const taxResult = calculateTransferTaxes(input, profile);
    const recordingResult = calculateRecordingFees(
      input,
      profile.recording_fees
    );
    const titleResult = calculateTitleInsurance(input, profile.title_insurance);
    const prorationsResult = calculateProrations(
      [...(input.tax_lines || []), ...(input.hoa_lines || [])],
      profile.prorations
    );

    // 4. Apply flat fee overrides
    let settlementFees = { ...profile.settlement_fees };
    if (input.flat_fee_overrides) {
      settlementFees = {
        ...settlementFees,
        ...input.flat_fee_overrides,
      };
    }

    // 5. Build HUD output
    const result = buildHUDOutput(
      taxResult,
      recordingResult,
      titleResult,
      prorationsResult,
      settlementFees
    );

    // 6. Add debug info
    result.debug.jurisdiction_profile_matched = matched_path;
    result.debug.calculation_details = {
      transfer_taxes: taxResult,
      recording_fees: recordingResult,
      title_insurance: titleResult,
      prorations: prorationsResult,
    };

    return result;
  }

  /**
   * Set or update configuration
   */
  public setConfig(configMap: Record<string, JurisdictionProfile>): void {
    this.configMap = configMap;
  }

  /**
   * Get current configuration
   */
  public getConfig(): Record<string, JurisdictionProfile> | undefined {
    return this.configMap;
  }
}

/**
 * Factory function to create an engine with default config
 */
export function createClosingCostEngine(
  configMap?: Record<string, JurisdictionProfile>
): ClosingCostEngine {
  return new ClosingCostEngine(configMap);
}

/**
 * Default export for ease of import
 */
export default ClosingCostEngine;
