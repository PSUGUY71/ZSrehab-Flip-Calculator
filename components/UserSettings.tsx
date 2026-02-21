import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserPreferences {
  displayName: string;
  email: string;
  defaultFinancingPercentage: number;
  defaultCapitalGainsTaxRate: number;
  defaultHoldingPeriodMonths: number;
  defaultExitStrategy: 'SELL' | 'REFI' | 'RENT';
  // Branding
  companyName: string;
  companyTagline: string;
  contactPhone: string;
  contactEmail: string;
  logoUrl: string; // URL or data-URI for logo image
  brandColor: string; // Hex color for report accent
}

interface UserSettingsProps {
  currentUser: { email?: string; username?: string } | null;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
  onClose: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  currentUser,
  preferences,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<UserPreferences>(preferences);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    setFormData(preferences);
    setHasChanges(false);
  }, [preferences]);

  const handleChange = (field: keyof UserPreferences, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSave(formData);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(preferences);
    setHasChanges(false);
    onClose();
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setPasswordError('Password change requires Supabase. Not available in local mode.');
      return;
    }
    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordError(error.message);
      } else {
        setPasswordSuccess('Password updated successfully!');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordError('An unexpected error occurred.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">User Settings</h2>
          <button
            onClick={handleCancel}
            className="text-white hover:bg-amber-800 rounded-full p-1 transition"
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">Account</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label htmlFor="displayName" className="block text-xs font-semibold text-gray-700 mb-1">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Change Password Section */}
          {isSupabaseConfigured && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">Change Password</h3>

              <div>
                <label htmlFor="newPassword" className="block text-xs font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); setPasswordSuccess(''); }}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); setPasswordSuccess(''); }}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {passwordError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">✓ {passwordSuccess}</p>
              )}

              <button
                onClick={handlePasswordChange}
                disabled={isChangingPassword || !newPassword || !confirmPassword}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}

          {/* Report Branding */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">Report Branding</h3>
            <p className="text-xs text-gray-500 -mt-2">Customize how your printed reports look. Your brand appears on the report header.</p>

            <div>
              <label htmlFor="companyName" className="block text-xs font-semibold text-gray-700 mb-1">
                Company / Team Name
              </label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="e.g. Zenith Capital Group"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="companyTagline" className="block text-xs font-semibold text-gray-700 mb-1">
                Tagline
              </label>
              <input
                id="companyTagline"
                type="text"
                value={formData.companyTagline || ''}
                onChange={(e) => handleChange('companyTagline', e.target.value)}
                placeholder="e.g. Real Estate Investment Analysis"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="contactPhone" className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone || ''}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="contactEmailBrand" className="block text-xs font-semibold text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  id="contactEmailBrand"
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="deals@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-xs font-semibold text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                id="logoUrl"
                type="url"
                value={formData.logoUrl || ''}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Direct URL to your logo image (PNG, JPG, or SVG)</p>
              {formData.logoUrl && (
                <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded flex items-center gap-2">
                  <img
                    src={formData.logoUrl as string}
                    alt="Logo preview"
                    className="h-8 max-w-[120px] object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="text-[10px] text-gray-400">Preview</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="brandColor" className="block text-xs font-semibold text-gray-700 mb-1">
                Brand Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="brandColor"
                  type="color"
                  value={formData.brandColor || '#1e3a5f'}
                  onChange={(e) => handleChange('brandColor', e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.brandColor || '#1e3a5f'}
                  onChange={(e) => handleChange('brandColor', e.target.value)}
                  placeholder="#1e3a5f"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for report header and accent elements</p>
            </div>
          </div>

          {/* Default Calculation Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">Calculation Defaults</h3>

            <div>
              <label htmlFor="financing" className="block text-xs font-semibold text-gray-700 mb-1">
                Default Financing % (Loan to Value)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="financing"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.defaultFinancingPercentage}
                  onChange={(e) => handleChange('defaultFinancingPercentage', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-bold text-amber-600 w-12 text-right">
                  {formData.defaultFinancingPercentage}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Applied to all new deals</p>
            </div>

            <div>
              <label htmlFor="taxRate" className="block text-xs font-semibold text-gray-700 mb-1">
                Capital Gains Tax Rate (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="taxRate"
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={formData.defaultCapitalGainsTaxRate}
                  onChange={(e) => handleChange('defaultCapitalGainsTaxRate', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-bold text-amber-600 w-12 text-right">
                  {formData.defaultCapitalGainsTaxRate}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for after-tax profit calculations</p>
            </div>

            <div>
              <label htmlFor="holding" className="block text-xs font-semibold text-gray-700 mb-1">
                Default Holding Period (Months)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="holding"
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={formData.defaultHoldingPeriodMonths}
                  onChange={(e) => handleChange('defaultHoldingPeriodMonths', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-bold text-amber-600 w-12 text-right">
                  {formData.defaultHoldingPeriodMonths}m
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Typical hold time for flips</p>
            </div>

            <div>
              <label htmlFor="strategy" className="block text-xs font-semibold text-gray-700 mb-1">
                Default Exit Strategy
              </label>
              <select
                id="strategy"
                value={formData.defaultExitStrategy}
                onChange={(e) => handleChange('defaultExitStrategy', e.target.value as 'SELL' | 'REFI' | 'RENT')}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SELL">Flip & Sell</option>
                <option value="REFI">BRRR (Buy, Rehab, Rent, Refinance)</option>
                <option value="RENT">Long-term Rental</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Used for holding cost auto-population</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>
            <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="px-4 py-2 bg-amber-600 text-white rounded text-sm font-medium hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
