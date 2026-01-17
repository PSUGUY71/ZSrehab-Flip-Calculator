/**
 * Configuration Loader
 * Loads jurisdiction profiles with fallback chain
 */

import { JurisdictionProfile, ClosingCostEngineError } from "./types";

/**
 * Load jurisdiction profile with fallback chain
 * Priority: zip > city > county > state > default
 */
export function loadJurisdictionProfile(
  state: string,
  county?: string,
  city?: string,
  zip?: string,
  configMap?: Record<string, JurisdictionProfile>
): { profile: JurisdictionProfile; matched_path: string } {
  if (!configMap) {
    configMap = getDefaultConfigMap();
  }

  // Try exact matches in priority order
  const paths = [
    zip ? `${state}/${county}/${city}/${zip}` : null,
    city ? `${state}/${county}/${city}` : null,
    county ? `${state}/${county}` : null,
    `${state}`,
    "DEFAULT",
  ].filter(Boolean) as string[];

  for (const path of paths) {
    const profile = configMap[path];
    if (profile) {
      return { profile, matched_path: path };
    }
  }

  throw new ClosingCostEngineError(
    "CONFIG_NOT_FOUND",
    `No jurisdiction profile found for ${state}/${county || ""}/${city || ""}/${zip || ""}`,
    { state, county, city, zip, paths }
  );
}

/**
 * Get default configuration map (in-memory for testing)
 * In production, this would load from JSON files
 */
export function getDefaultConfigMap(): Record<
  string,
  JurisdictionProfile
> {
  return {
    DEFAULT: {
      state: "DEFAULT",
      transfer_taxes: [],
      recording_fees: {
        deed: { per_document_fee: 50, per_page_fee: 1 },
        mortgage: { per_document_fee: 50, per_page_fee: 1 },
      },
      title_insurance: {
        lender_policy_rate: 0.5,
        owner_policy_rate: 0.6,
        simultaneous_issue_discount: 0.25,
        cpl_fee: 100,
      },
      settlement_fees: {
        settlement_fee: 300,
        attorney_fee: 500,
      },
      prorations: {
        day_count_method: "actual_365",
        closing_day_owner: "buyer",
        rounding: "cents",
        default_proration_style: "paid_in_advance_common",
      },
    },
  };
}

/**
 * Merge a profile with defaults (for partial profiles)
 */
export function mergeWithDefaults(
  profile: Partial<JurisdictionProfile>
): JurisdictionProfile {
  const defaultProfile = getDefaultConfigMap()["DEFAULT"];

  return {
    state: profile.state || defaultProfile.state,
    county: profile.county,
    city: profile.city,
    zip: profile.zip,
    transfer_taxes: profile.transfer_taxes || defaultProfile.transfer_taxes,
    recording_fees: profile.recording_fees || defaultProfile.recording_fees,
    title_insurance: profile.title_insurance || defaultProfile.title_insurance,
    settlement_fees: profile.settlement_fees || defaultProfile.settlement_fees,
    prorations: profile.prorations || defaultProfile.prorations,
  };
}

/**
 * Register a custom configuration profile
 */
export function registerProfile(
  path: string,
  profile: JurisdictionProfile
): void {
  // This would be implemented in a singleton or class-based config manager
  // For now, this is a placeholder for the interface
}

/**
 * Build config map from JSON (for production use)
 */
export function buildConfigMapFromJson(jsonConfigs: Record<string, any>): Record<
  string,
  JurisdictionProfile
> {
  const configMap: Record<string, JurisdictionProfile> = {};

  for (const [key, value] of Object.entries(jsonConfigs)) {
    configMap[key] = value as JurisdictionProfile;
  }

  return configMap;
}
