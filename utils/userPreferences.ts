import { UserPreferences } from '../components/UserSettings';

const STORAGE_KEY = 'zsrehab_user_preferences';

export const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: 'Investor',
  email: '',
  defaultFinancingPercentage: 75,
  defaultCapitalGainsTaxRate: 20,
  defaultHoldingPeriodMonths: 6,
  defaultExitStrategy: 'SELL',
  // Branding defaults
  companyName: '',
  companyTagline: '',
  contactPhone: '',
  contactEmail: '',
  logoUrl: '',
  brandColor: '#1e3a5f',
};

/**
 * Load user preferences from localStorage
 */
export const loadUserPreferences = (email: string): UserPreferences => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${email}`);
    if (stored) {
      return {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(stored),
        email,
      };
    }
  } catch (error) {
    console.error('Failed to load user preferences:', error);
  }
  return {
    ...DEFAULT_PREFERENCES,
    email,
  };
};

/**
 * Save user preferences to localStorage
 */
export const saveUserPreferences = (email: string, preferences: UserPreferences): void => {
  try {
    localStorage.setItem(
      `${STORAGE_KEY}_${email}`,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error('Failed to save user preferences:', error);
  }
};

/**
 * Clear user preferences when logging out
 */
export const clearUserPreferences = (email: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${email}`);
  } catch (error) {
    console.error('Failed to clear user preferences:', error);
  }
};
