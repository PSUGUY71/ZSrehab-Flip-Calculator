import React, { useState, useEffect, useRef } from 'react';

const BRANDING_STORAGE_KEY = 'zs_branding_settings';

export interface BrandingSettings {
  companyName: string;
  agentName: string;
  logoBase64: string;
  phone: string;
  email: string;
  website: string;
  colorTheme: string;
  reportSubtitle: string;
  disclaimerText: string;
}

export const DEFAULT_BRANDING: BrandingSettings = {
  companyName: '',
  agentName: '',
  logoBase64: '',
  phone: '',
  email: '',
  website: '',
  colorTheme: '#1a2332',
  reportSubtitle: '',
  disclaimerText: 'This analysis is for informational purposes only and does not constitute professional advice. Not a professional opinion.',
};

const COLOR_THEMES = [
  { name: 'Dark Navy', color: '#1a2332' },
  { name: 'Professional Blue', color: '#1e3a5f' },
  { name: 'Forest Green', color: '#1a3d2b' },
  { name: 'Burgundy', color: '#4a1528' },
  { name: 'Charcoal Gray', color: '#2d2d2d' },
];

export const loadBrandingSettings = (): BrandingSettings => {
  try {
    const stored = localStorage.getItem(BRANDING_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_BRANDING, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load branding settings:', e);
  }
  return { ...DEFAULT_BRANDING };
};

export const saveBrandingSettings = (settings: BrandingSettings): void => {
  try {
    localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save branding settings:', e);
  }
};

interface BrandingModalProps {
  onClose: () => void;
  onSave: (settings: BrandingSettings) => void;
}

export const BrandingModal: React.FC<BrandingModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<BrandingSettings>(() => loadBrandingSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [logoError, setLogoError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ phone?: string; email?: string; website?: string }>({});

  const handleChange = (field: keyof BrandingSettings, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
    // Clear validation error for this field
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLogoError('');
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      setLogoError('Please upload a JPG, PNG, or SVG file.');
      return;
    }

    // Validate file size (500KB max)
    if (file.size > 500 * 1024) {
      setLogoError('Logo must be under 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      handleChange('logoBase64', base64);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    handleChange('logoBase64', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateFields = (): boolean => {
    const newErrors: { phone?: string; email?: string; website?: string } = {};

    if (form.phone && !/^[\d\s\-\(\)\+\.]{7,20}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (form.website && !/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+/.test(form.website)) {
      newErrors.website = 'Please enter a valid URL.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields()) return;
    saveBrandingSettings(form);
    onSave(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all branding settings to default? This cannot be undone.')) {
      setForm({ ...DEFAULT_BRANDING });
      saveBrandingSettings({ ...DEFAULT_BRANDING });
      if (fileInputRef.current) fileInputRef.current.value = '';
      setErrors({});
      setLogoError('');
      onSave({ ...DEFAULT_BRANDING });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">🎨 Customize Report</h2>
            <p className="text-xs text-gray-300 mt-0.5">Brand your reports with your company info, logo, and color theme.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* SECTION A: Company Branding */}
          <section>
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">A</span>
              Company Branding
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Your Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name / Agent Name</label>
                <input
                  type="text"
                  value={form.agentName}
                  onChange={(e) => handleChange('agentName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Logo Upload</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition flex items-center gap-2">
                    📁 Choose File
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/svg+xml"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-gray-500">JPG, PNG, or SVG • Max 500KB</span>
                </div>
                {logoError && (
                  <p className="text-xs text-red-600 mt-1">⚠️ {logoError}</p>
                )}
                {form.logoBase64 && (
                  <div className="mt-3 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <img src={form.logoBase64} alt="Logo preview" className="h-12 max-w-[160px] object-contain" />
                    <div className="flex-1">
                      <span className="text-xs text-green-600 font-medium">✓ Logo uploaded</span>
                    </div>
                    <button onClick={removeLogo} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION B: Contact Information */}
          <section>
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">B</span>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="deals@company.com"
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://www.yourcompany.com"
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.website ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
              </div>
            </div>
          </section>

          {/* SECTION C: Report Appearance */}
          <section>
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-bold">C</span>
              Report Appearance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Report Color Theme</label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.color}
                      onClick={() => handleChange('colorTheme', theme.color)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all ${
                        form.colorTheme === theme.color
                          ? 'border-amber-500 shadow-md scale-105'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-inner"
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-[10px] font-medium text-gray-600">{theme.name}</span>
                      {form.colorTheme === theme.color && (
                        <span className="text-[9px] text-amber-600 font-bold">✓ Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Report Subtitle</label>
                <input
                  type="text"
                  value={form.reportSubtitle}
                  onChange={(e) => handleChange('reportSubtitle', e.target.value)}
                  placeholder="Confidential Investment Analysis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </section>

          {/* SECTION D: Legal & Disclaimers */}
          <section>
            <h3 className="text-sm font-bold uppercase text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">D</span>
              Legal &amp; Disclaimers
            </h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Disclaimer Text</label>
              <textarea
                value={form.disclaimerText}
                onChange={(e) => handleChange('disclaimerText', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
                placeholder="This analysis is for informational purposes only..."
              />
              <p className="text-xs text-gray-400 mt-1">Appears at the bottom of every printed report.</p>
            </div>
          </section>

          {/* Live Preview */}
          <section className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Live Preview</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between border-b-2 pb-3" style={{ borderColor: form.colorTheme }}>
                <div className="flex items-center gap-3">
                  {form.logoBase64 ? (
                    <img src={form.logoBase64} alt="Logo" className="h-8 max-w-[80px] object-contain" />
                  ) : (
                    <div className="text-white px-2 py-1 rounded font-bold text-sm" style={{ backgroundColor: form.colorTheme }}>
                      {form.companyName ? form.companyName.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase() : 'ZS'}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {form.companyName || form.agentName || 'ZS Flip Calculator'}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {form.reportSubtitle || 'INVESTMENT DEAL ANALYSIS'} • {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                  {form.phone && <div>{form.phone}</div>}
                  {form.email && <div>{form.email}</div>}
                  {form.website && <div>{form.website}</div>}
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-400 italic border-t border-gray-100 pt-2">
                {form.disclaimerText || 'Disclaimer text will appear here...'}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-3">
          {saveSuccess && (
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span className="text-green-500">✓</span> Branding saved successfully!
            </div>
          )}
          {!saveSuccess && <div />}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition"
            >
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
            >
              Save Branding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
