import React, { useState, useEffect } from 'react';

export interface UserPreferences {
  displayName: string;
  email: string;
  defaultFinancingPercentage: number;
  defaultCapitalGainsTaxRate: number;
  defaultHoldingPeriodMonths: number;
  defaultExitStrategy: 'SELL' | 'REFI' | 'RENT';
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">User Settings</h2>
          <button
            onClick={handleCancel}
            className="text-white hover:bg-blue-800 rounded-full p-1 transition"
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
                <span className="text-sm font-bold text-blue-600 w-12 text-right">
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
                <span className="text-sm font-bold text-blue-600 w-12 text-right">
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
                <span className="text-sm font-bold text-blue-600 w-12 text-right">
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
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
