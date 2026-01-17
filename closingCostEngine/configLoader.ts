/**
 * Configuration loading and jurisdiction matching
 */

import * as fs from 'fs';
import * as path from 'path';
import { JurisdictionProfile, EngineOptions, EngineValidationError } from './types';
import { validateJurisdictionProfile } from './validation';

export interface ConfigLoader {
  load_profile(state: string, county?: string, city?: string, zip?: string): JurisdictionProfile;
  all_profiles(): JurisdictionProfile[];
}

export class FileSystemConfigLoader implements ConfigLoader {
  private profiles: Map<string, JurisdictionProfile> = new Map();
  private config_dir: string;
  private debug: boolean;

  constructor(config_dir: string, debug: boolean = false) {
    this.config_dir = config_dir;
    this.debug = debug;
    this.loadAllProfiles();
  }

  private loadAllProfiles(): void {
    // Load all .json files from config_dir
    if (!fs.existsSync(this.config_dir)) {
      if (this.debug) console.warn(`Config directory not found: ${this.config_dir}`);
      return;
    }

    const files = fs.readdirSync(this.config_dir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(this.config_dir, file), 'utf-8');
        const profile = JSON.parse(content) as JurisdictionProfile;

        const errors = validateJurisdictionProfile(profile);
        if (errors.length > 0) {
          console.error(`Invalid profile in ${file}:`, errors);
          continue;
        }

        this.profiles.set(profile.jurisdiction_id, profile);
        if (this.debug) console.log(`Loaded profile: ${profile.jurisdiction_id}`);
      } catch (e) {
        console.error(`Failed to load ${file}:`, e);
      }
    }
  }

  /**
   * Find matching profile with priority:
   * zip > city > county > state > default
   */
  load_profile(state: string, county?: string, city?: string, zip?: string): JurisdictionProfile {
    const matches: Array<{ profile: JurisdictionProfile; score: number }> = [];

    for (const profile of this.profiles.values()) {
      if (profile.state.toUpperCase() !== state.toUpperCase()) continue;

      let score = 0;
      let matched_by: 'zip' | 'city' | 'county' | 'state' = 'state';

      // Check zip (highest priority)
      if (zip && profile.zip === zip) {
        score = 1000;
        matched_by = 'zip';
      }
      // Check city
      else if (city && profile.city && profile.city.toLowerCase() === city.toLowerCase()) {
        score = 750;
        matched_by = 'city';
      }
      // Check county
      else if (county && profile.county && profile.county.toLowerCase() === county.toLowerCase()) {
        score = 500;
        matched_by = 'county';
      }
      // State profile (any unspecified county/city/zip in profile = wildcard)
      else if (!profile.county && !profile.city && !profile.zip) {
        score = 100;
        matched_by = 'state';
      }

      if (score > 0) {
        matches.push({ profile, score });
      }
    }

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    if (matches.length > 0) {
      if (this.debug) console.log(`Selected profile: ${matches[0].profile.jurisdiction_id}`);
      return matches[0].profile;
    }

    // Fallback to default
    const default_profile = this.profiles.get('DEFAULT');
    if (default_profile) {
      if (this.debug) console.log(`Using DEFAULT profile`);
      return default_profile;
    }

    throw new Error(`No matching jurisdiction profile found for ${state}, ${county}, ${city}, ${zip}`);
  }

  all_profiles(): JurisdictionProfile[] {
    return Array.from(this.profiles.values());
  }
}

/**
 * In-memory config loader for testing
 */
export class InMemoryConfigLoader implements ConfigLoader {
  private profiles: Map<string, JurisdictionProfile>;

  constructor(profiles: JurisdictionProfile[]) {
    this.profiles = new Map(profiles.map(p => [p.jurisdiction_id, p]));
  }

  load_profile(state: string, county?: string, city?: string, zip?: string): JurisdictionProfile {
    const matches: Array<{ profile: JurisdictionProfile; score: number }> = [];

    for (const profile of this.profiles.values()) {
      if (profile.state.toUpperCase() !== state.toUpperCase()) continue;

      let score = 0;

      if (zip && profile.zip === zip) score = 1000;
      else if (city && profile.city && profile.city.toLowerCase() === city.toLowerCase()) score = 750;
      else if (county && profile.county && profile.county.toLowerCase() === county.toLowerCase()) score = 500;
      else if (!profile.county && !profile.city && !profile.zip) score = 100;

      if (score > 0) matches.push({ profile, score });
    }

    matches.sort((a, b) => b.score - a.score);

    if (matches.length > 0) return matches[0].profile;

    const default_profile = this.profiles.get('DEFAULT');
    if (default_profile) return default_profile;

    throw new Error(`No matching jurisdiction profile for ${state}`);
  }

  all_profiles(): JurisdictionProfile[] {
    return Array.from(this.profiles.values());
  }
}
