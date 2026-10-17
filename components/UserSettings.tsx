import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AIProvider, PROVIDERS, KEY_FIELD, DEFAULT_OMNIROUTE_URL, getAIConfig } from '../utils/aiProvider';
import { listModels } from '../utils/aiClient';

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
  // AI Assistant
  openaiApiKey: string; // OpenAI API key for AI chat
  aiProvider?: AIProvider; // Which AI service the AI features use (default OpenAI)
  xaiApiKey?: string; // xAI (Grok) API key
  anthropicApiKey?: string; // Claude
  geminiApiKey?: string; // Google AI Studio
  openrouterApiKey?: string;
  omnirouteUrl?: string; // OmniRoute base URL (default http://localhost:20128/v1)
  omnirouteApiKey?: string; // key created in the OmniRoute dashboard
  aiModels?: Partial<Record<AIProvider, string>>; // model picked per provider (blank = default)
  // Property Data
  rentcastApiKey?: string; // RentCast property records (free plan 50/month); Philadelphia lookups need no key
  // App Mode
  hideoutModeEnabled: boolean; // Show Hideout version selector in nav
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

  // AI model list for the selected provider (Settings → AI Assistant → Load models)
  const provider: AIProvider = formData.aiProvider && PROVIDERS[formData.aiProvider] ? formData.aiProvider : 'openai';
  const providerInfo = PROVIDERS[provider];
  const ai = getAIConfig(formData);
  const [models, setModels] = useState<string[]>([]);
  const [modelStatus, setModelStatus] = useState('');
  useEffect(() => { setModels([]); setModelStatus(''); }, [provider]);

  const loadModels = async () => {
    setModelStatus('loading');
    try {
      const list = await listModels(ai, formData);
      setModels(list);
      setModelStatus(list.length ? `Connected — ${list.length} models available` : 'Connected, but no models were returned');
    } catch (err) {
      setModels([]);
      setModelStatus(err instanceof TypeError
        ? provider === 'omniroute'
          ? 'Could not reach OmniRoute — is it running at this URL? (Chrome may ask to allow local network access.)'
          : `Could not reach ${providerInfo.label}. Check your internet connection.`
        : (err as Error).message);
    }
  };

  const setModel = (value: string) => {
    setFormData((prev) => ({ ...prev, aiModels: { ...prev.aiModels, [provider]: value } }));
    setHasChanges(true);
  };

  useEffect(() => {
    setFormData(preferences);
    setHasChanges(false);
  }, [preferences]);

  const handleChange = (field: keyof UserPreferences, value: string | number | boolean) => {
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

          {/* App Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">App Mode</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-800">Hideout Version</p>
                <p className="text-xs text-gray-500 mt-0.5">Enables Hideout-specific fees and the version switcher in the nav bar.</p>
              </div>
              <button
                onClick={() => { handleChange('hideoutModeEnabled', !formData.hideoutModeEnabled); }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  formData.hideoutModeEnabled ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  formData.hideoutModeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
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

          {/* AI Assistant */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">AI Assistant</h3>
            <p className="text-xs text-gray-500 -mt-2">Powers the AI chat assistant and Import Lender Docs. Your key is stored locally in this browser and only sent to the AI service you pick.</p>

            <div>
              <span className="block text-xs font-semibold text-gray-700 mb-1">AI Service</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(PROVIDERS) as AIProvider[]).map((value) => {
                  const selected = provider === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange('aiProvider', value)}
                      className={`px-3 py-2 rounded border text-sm font-medium text-left ${selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {selected ? '● ' : '○ '}{PROVIDERS[value].label}
                      {PROVIDERS[value].free && (
                        <span className="ml-1 text-[10px] font-bold uppercase bg-green-100 text-green-700 px-1 rounded">Free</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {providerInfo.free && (
              <p className="text-xs text-green-800 bg-green-50 border border-green-200 rounded p-2">{providerInfo.free}</p>
            )}

            {provider === 'omniroute' && (
              <div>
                <label htmlFor="omnirouteUrl" className="block text-xs font-semibold text-gray-700 mb-1">
                  OmniRoute URL
                </label>
                <input
                  id="omnirouteUrl"
                  type="text"
                  value={formData.omnirouteUrl ?? DEFAULT_OMNIROUTE_URL}
                  onChange={(e) => handleChange('omnirouteUrl', e.target.value)}
                  placeholder={DEFAULT_OMNIROUTE_URL}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  OmniRoute must be running on this computer — the AI features won't work from your phone or another PC.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="aiApiKey" className="block text-xs font-semibold text-gray-700 mb-1">
                {providerInfo.label} API Key
              </label>
              <input
                id="aiApiKey"
                type="password"
                value={(formData[KEY_FIELD[provider]] as string) || ''}
                onChange={(e) => handleChange(KEY_FIELD[provider], e.target.value)}
                placeholder={providerInfo.keyPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {provider === 'omniroute' ? (
                  'Create a key in your OmniRoute dashboard (API keys).'
                ) : (
                  <>
                    Get your key at{' '}
                    <a href={providerInfo.keyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {providerInfo.keyUrl.replace(/^https:\/\//, '')}
                    </a>
                    {provider === 'claude' && ' (an API key from the Claude Console — a Claude.ai Pro/Max chat subscription does not include API use)'}
                    {provider === 'grok' && ' (separate from a SuperGrok / X Premium subscription)'}
                    .
                  </>
                )}
              </p>
              {formData[KEY_FIELD[provider]] && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-700 font-medium">Key configured</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="aiModel" className="block text-xs font-semibold text-gray-700 mb-1">
                Model
              </label>
              <div className="flex gap-2">
                <input
                  id="aiModel"
                  type="text"
                  list="aiModelList"
                  value={formData.aiModels?.[provider] || ''}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder={providerInfo.chatModel ? `default: ${providerInfo.chatModel}` : 'pick or type a model / combo name'}
                  className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <datalist id="aiModelList">
                  {models.map((m) => <option key={m} value={m} />)}
                </datalist>
                <button
                  type="button"
                  onClick={loadModels}
                  disabled={!ai.apiKey || modelStatus === 'loading'}
                  className="px-3 py-2 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 whitespace-nowrap"
                >
                  {modelStatus === 'loading' ? 'Loading…' : 'Load models'}
                </button>
              </div>
              {modelStatus && modelStatus !== 'loading' && (
                <p className={`text-xs mt-1 ${models.length ? 'text-green-700' : 'text-red-600'}`}>{modelStatus}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to use the default{providerInfo.chatModel ? '' : ' (OmniRoute needs a model — click Load models)'}.
                {provider === 'claude' && ' Default is Claude Opus 5.5; claude-haiku-5-5 costs much less.'}
                {provider === 'openrouter' && ' Load models shows only the free ones.'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-800">
              <b>Reading PDFs &amp; images:</b> Import Lender Docs needs a model that can read images or PDFs (“vision”).
              Claude, GPT-4o, Gemini and Grok can. Many free or text-only models (some OpenRouter / OmniRoute models) <b>cannot</b> —
              with those the AI chat still works, but for lender docs paste the terms as text or upload a .txt file instead.
            </div>
          </div>

          {/* Property Data */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2">Property Data</h3>
            <p className="text-xs text-gray-500 -mt-2">
              Looks up each property's real tax bill (and beds, baths, sqft, last sale) from public records when you type
              its address. Philadelphia properties work for free with no key. For everywhere else, add a free RentCast key.
            </p>
            <div>
              <label htmlFor="rentcastApiKey" className="block text-xs font-semibold text-gray-700 mb-1">
                RentCast API Key (optional)
              </label>
              <input
                id="rentcastApiKey"
                type="password"
                value={formData.rentcastApiKey || ''}
                onChange={(e) => handleChange('rentcastApiKey', e.target.value)}
                placeholder="paste your RentCast key"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get a free key at{' '}
                <a href="https://app.rentcast.io/app/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  app.rentcast.io/app/api
                </a>
                {' '}— free plan includes 50 lookups a month (each property is looked up once and remembered for 30 days).
                Without a key, taxes are estimated from the county average.
              </p>
              {formData.rentcastApiKey && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-700 font-medium">Key configured</span>
                </div>
              )}
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
