import React, { useState, useCallback } from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

type ExportFormat = 'csv' | 'json' | 'html';

interface WebhookConfig {
  url: string;
  secret: string;
  events: string[];
  enabled: boolean;
}

interface ExportIntegrationModalProps {
  dealInputs: LoanInputs;
  dealResults: CalculatedResults;
  onClose: () => void;
}

// ─── Local Storage ───────────────────────────────────────────────────

const WEBHOOK_KEY = 'zs_webhook_config';

const loadWebhookConfig = (): WebhookConfig => {
  try {
    const stored = localStorage.getItem(WEBHOOK_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { url: '', secret: '', events: ['deal_saved', 'deal_exported'], enabled: false };
};

const saveWebhookConfig = (config: WebhookConfig) => {
  try {
    localStorage.setItem(WEBHOOK_KEY, JSON.stringify(config));
  } catch { /* ignore */ }
};

// ─── Export Generators ───────────────────────────────────────────────

const generateCSV = (inputs: LoanInputs, results: CalculatedResults): string => {
  const rows: [string, string][] = [
    ['Field', 'Value'],
    ['--- PROPERTY ---', ''],
    ['Address', inputs.address || ''],
    ['State', inputs.state || ''],
    ['Purchase Price', String(inputs.purchasePrice)],
    ['ARV', String(inputs.arv)],
    ['Rehab Budget', String(inputs.rehabBudget)],
    ['Property Type', inputs.propertyType || 'SFR'],
    ['SqFt', String(inputs.sqFt || 0)],
    ['Beds', String(inputs.beds || 0)],
    ['Baths', String(inputs.baths || 0)],
    ['--- LOAN ---', ''],
    ['Lender', inputs.lenderName || ''],
    ['Interest Rate', `${inputs.interestRate}%`],
    ['Loan Term (months)', String(inputs.loanTermMonths || 12)],
    ['Down Payment %', `${inputs.downPaymentPercent}%`],
    ['Origination Points', `${inputs.originationPoints}%`],
    ['--- RESULTS ---', ''],
    ['Loan Amount', String(results.loanAmount || 0)],
    ['Monthly Payment', String(results.monthlyPayment || 0)],
    ['Total Closing Costs', String(results.totalClosingCosts || 0)],
    ['Total Holding Costs', String(results.totalHoldingCosts || 0)],
    ['Total Exit Costs', String(results.totalExitCosts || 0)],
    ['Net Profit', String(results.netProfit || 0)],
    ['ROI', `${(results.roi || 0).toFixed(2)}%`],
    ['Cash to Close', String(results.totalCashToClose || 0)],
    ['Holding Period (months)', String(inputs.holdingPeriod || 6)],
  ];

  return rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
};

const generateJSON = (inputs: LoanInputs, results: CalculatedResults): string => {
  return JSON.stringify({
    exportDate: new Date().toISOString(),
    version: '1.13.26',
    property: {
      address: inputs.address,
      state: inputs.state,
      zipCode: inputs.zipCode,
      propertyType: inputs.propertyType,
      sqFt: inputs.sqFt,
      beds: inputs.beds,
      baths: inputs.baths,
      foundationType: inputs.foundationType,
    },
    financials: {
      purchasePrice: inputs.purchasePrice,
      arv: inputs.arv,
      rehabBudget: inputs.rehabBudget,
      downPaymentPercent: inputs.downPaymentPercent,
      interestRate: inputs.interestRate,
      loanTermMonths: inputs.loanTermMonths,
      holdingPeriod: inputs.holdingPeriod,
      originationPoints: inputs.originationPoints,
    },
    results: {
      loanAmount: results.loanAmount,
      monthlyPayment: results.monthlyPayment,
      totalClosingCosts: results.totalClosingCosts,
      totalHoldingCosts: results.totalHoldingCosts,
      totalExitCosts: results.totalExitCosts,
      totalCashToClose: results.totalCashToClose,
      netProfit: results.netProfit,
      roi: results.roi,
      netMargin: results.netMargin,
      irr: results.irr,
    },
    rehabLineItems: inputs.rehabLineItems.map(item => ({
      category: item.category,
      description: item.description,
      unitCost: item.unitCost,
      quantity: item.quantity,
      total: item.unitCost * item.quantity,
    })),
  }, null, 2);
};

const generateHTML = (inputs: LoanInputs, results: CalculatedResults): string => {
  const profit = results.netProfit || 0;
  const profitColor = profit >= 0 ? '#16a34a' : '#dc2626';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deal Report - ${inputs.address || 'Property'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #1e293b; }
    h1 { color: #1e293b; border-bottom: 3px solid #f59e0b; padding-bottom: 10px; }
    h2 { color: #475569; margin-top: 24px; font-size: 16px; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }
    .value { font-size: 20px; font-weight: 700; margin-top: 4px; }
    .profit { color: ${profitColor}; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    th { background: #f1f5f9; font-weight: 600; color: #475569; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <h1>🏠 Deal Analysis Report</h1>
  <p style="color: #64748b; font-size: 14px;">${inputs.address || 'Property Address'} · Generated ${new Date().toLocaleDateString()}</p>

  <h2>Key Metrics</h2>
  <div class="grid">
    <div class="card">
      <div class="label">Purchase Price</div>
      <div class="value">${formatCurrency(inputs.purchasePrice)}</div>
    </div>
    <div class="card">
      <div class="label">After Repair Value</div>
      <div class="value">${formatCurrency(inputs.arv)}</div>
    </div>
    <div class="card">
      <div class="label">Rehab Budget</div>
      <div class="value">${formatCurrency(inputs.rehabBudget)}</div>
    </div>
    <div class="card">
      <div class="label">Net Profit</div>
      <div class="value profit">${formatCurrency(profit)}</div>
    </div>
  </div>

  <h2>Financial Summary</h2>
  <table>
    <tr><th>Metric</th><th>Value</th></tr>
    <tr><td>Loan Amount</td><td>${formatCurrency(results.loanAmount || 0)}</td></tr>
    <tr><td>Monthly Payment</td><td>${formatCurrency(results.monthlyPayment || 0)}</td></tr>
    <tr><td>Cash to Close</td><td>${formatCurrency(results.totalCashToClose || 0)}</td></tr>
    <tr><td>Total Closing Costs</td><td>${formatCurrency(results.totalClosingCosts || 0)}</td></tr>
    <tr><td>Total Holding Costs</td><td>${formatCurrency(results.totalHoldingCosts || 0)}</td></tr>
    <tr><td>Total Exit Costs</td><td>${formatCurrency(results.totalExitCosts || 0)}</td></tr>
    <tr><td>ROI</td><td>${(results.roi || 0).toFixed(1)}%</td></tr>
    <tr><td>Holding Period</td><td>${inputs.holdingPeriod || 6} months</td></tr>
  </table>

  ${inputs.rehabLineItems.length > 0 ? `
  <h2>Rehab Breakdown</h2>
  <table>
    <tr><th>Category</th><th>Description</th><th style="text-align:right">Cost</th></tr>
    ${inputs.rehabLineItems.map(item => `
    <tr><td>${item.category}</td><td>${item.description}</td><td style="text-align:right">${formatCurrency(item.unitCost * item.quantity)}</td></tr>
    `).join('')}
    <tr style="font-weight:700;border-top:2px solid #94a3b8"><td colspan="2">Total</td><td style="text-align:right">${formatCurrency(inputs.rehabLineItems.reduce((s, i) => s + i.unitCost * i.quantity, 0))}</td></tr>
  </table>` : ''}

  <div class="footer">
    Generated by ZS Rehab Flip Calculator v1.13.26 · ${new Date().toLocaleString()}
  </div>
</body>
</html>`;
};

// ─── Download Helper ─────────────────────────────────────────────────

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ─── Component ───────────────────────────────────────────────────────

export const ExportIntegrationModal: React.FC<ExportIntegrationModalProps> = ({
  dealInputs,
  dealResults,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'webhooks' | 'api'>('export');
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>(() => loadWebhookConfig());
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [previewFormat, setPreviewFormat] = useState<ExportFormat | null>(null);

  const handleExport = useCallback((format: ExportFormat) => {
    const address = dealInputs.address?.replace(/[^a-zA-Z0-9]/g, '_') || 'deal';
    const dateStr = new Date().toISOString().split('T')[0];

    switch (format) {
      case 'csv':
        downloadFile(generateCSV(dealInputs, dealResults), `${address}_${dateStr}.csv`, 'text/csv');
        break;
      case 'json':
        downloadFile(generateJSON(dealInputs, dealResults), `${address}_${dateStr}.json`, 'application/json');
        break;
      case 'html':
        downloadFile(generateHTML(dealInputs, dealResults), `${address}_${dateStr}.html`, 'text/html');
        break;
    }
    setExportSuccess(`${format.toUpperCase()} file downloaded successfully!`);
    setTimeout(() => setExportSuccess(null), 3000);
  }, [dealInputs, dealResults]);

  const handleSaveWebhook = useCallback(() => {
    saveWebhookConfig(webhookConfig);
    setExportSuccess('Webhook configuration saved!');
    setTimeout(() => setExportSuccess(null), 3000);
  }, [webhookConfig]);

  const handleTestWebhook = useCallback(async () => {
    if (!webhookConfig.url) return;
    setExportSuccess('Sending test webhook...');
    // Simulate webhook test (in production, this would be a real POST)
    setTimeout(() => {
      setExportSuccess('✅ Test webhook sent! (Demo mode — no actual request made)');
      setTimeout(() => setExportSuccess(null), 3000);
    }, 1000);
  }, [webhookConfig.url]);

  const previewContent = previewFormat === 'csv' 
    ? generateCSV(dealInputs, dealResults)
    : previewFormat === 'json' 
    ? generateJSON(dealInputs, dealResults)
    : previewFormat === 'html'
    ? '(HTML preview — click Export to download)'
    : '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">🔌 Export & Integrations</h2>
            <p className="text-xs text-gray-300 mt-0.5">Export deal data and configure third-party integrations</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Success Banner */}
        {exportSuccess && (
          <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-lg p-3 flex items-center gap-2 animate-pulse">
            <span>✅</span> {exportSuccess}
          </div>
        )}

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex gap-1 border-b border-gray-200">
            {([
              { key: 'export' as const, label: '📤 Export Data' },
              { key: 'webhooks' as const, label: '🔗 Webhooks' },
              { key: 'api' as const, label: '🔑 API Reference' },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
                  activeTab === tab.key
                    ? 'bg-white border border-gray-200 border-b-white -mb-px text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* EXPORT TAB */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              {/* Export Format Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([
                  { format: 'csv' as ExportFormat, icon: '📊', label: 'CSV', desc: 'Spreadsheet-compatible. Opens in Excel, Google Sheets.', color: 'bg-green-50 border-green-200 hover:border-green-400' },
                  { format: 'json' as ExportFormat, icon: '📋', label: 'JSON', desc: 'Structured data for developers & API integrations.', color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
                  { format: 'html' as ExportFormat, icon: '🌐', label: 'HTML Report', desc: 'Formatted report. Opens in any browser, ready to print.', color: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
                ]).map(opt => (
                  <div key={opt.format} className={`border-2 rounded-xl p-4 text-center transition cursor-pointer ${opt.color}`}>
                    <span className="text-3xl block mb-2">{opt.icon}</span>
                    <div className="text-sm font-bold text-gray-900">{opt.label}</div>
                    <p className="text-[10px] text-gray-600 mt-1 mb-3">{opt.desc}</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleExport(opt.format)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition"
                      >
                        ⬇ Download
                      </button>
                      <button
                        onClick={() => setPreviewFormat(previewFormat === opt.format ? null : opt.format)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition"
                      >
                        👁 Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Panel */}
              {previewFormat && previewContent && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700">Preview: {previewFormat.toUpperCase()}</span>
                    <button
                      onClick={() => setPreviewFormat(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <pre className="p-4 text-[10px] text-gray-700 bg-gray-50 overflow-x-auto max-h-[300px] overflow-y-auto font-mono whitespace-pre-wrap">
                    {previewContent}
                  </pre>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h4 className="text-[10px] font-bold text-gray-600 uppercase mb-2">Export Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="font-medium truncate max-w-[120px]">{dealInputs.address || 'N/A'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Purchase</span><span className="font-medium">{formatCurrency(dealInputs.purchasePrice)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Net Profit</span><span className={`font-bold ${dealResults.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatCurrency(dealResults.netProfit)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Line Items</span><span className="font-medium">{dealInputs.rehabLineItems.length}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* WEBHOOKS TAB */}
          {activeTab === 'webhooks' && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
                <span className="text-amber-500 shrink-0">ℹ️</span>
                <div>
                  <p className="font-semibold">Demo Mode</p>
                  <p className="mt-0.5 text-amber-700">Webhook configuration is saved locally. In production, webhooks would fire real HTTP POST requests to your endpoint when events occur.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Webhook URL</label>
                  <input
                    type="url"
                    value={webhookConfig.url}
                    onChange={(e) => setWebhookConfig(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://your-app.com/api/webhook"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Secret Key (for verification)</label>
                  <input
                    type="password"
                    value={webhookConfig.secret}
                    onChange={(e) => setWebhookConfig(prev => ({ ...prev, secret: e.target.value }))}
                    placeholder="whsec_..."
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Events</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['deal_saved', 'deal_exported', 'deal_shared', 'scenario_compared'].map(event => (
                      <label key={event} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={webhookConfig.events.includes(event)}
                          onChange={(e) => {
                            const events = e.target.checked
                              ? [...webhookConfig.events, event]
                              : webhookConfig.events.filter(ev => ev !== event);
                            setWebhookConfig(prev => ({ ...prev, events }));
                          }}
                          className="rounded border-gray-300"
                        />
                        {event.replace(/_/g, ' ')}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700">Webhook Enabled</span>
                  </div>
                  <button
                    onClick={() => setWebhookConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${webhookConfig.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${webhookConfig.enabled ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveWebhook}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    💾 Save Configuration
                  </button>
                  <button
                    onClick={handleTestWebhook}
                    disabled={!webhookConfig.url}
                    className="px-5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition disabled:opacity-50"
                  >
                    🧪 Test Webhook
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API REFERENCE TAB */}
          {activeTab === 'api' && (
            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">🔑 API Integration Guide</h4>
                <p className="text-xs text-gray-600 mb-3">
                  The ZS Calculator exposes deal data via localStorage and export functions. For production API integration, connect via Supabase REST endpoints.
                </p>
              </div>

              {/* Endpoints */}
              <div className="space-y-3">
                {([
                  {
                    method: 'GET',
                    path: '/api/deals',
                    desc: 'List all saved deals',
                    status: 'localStorage',
                    color: 'bg-green-100 text-green-800',
                  },
                  {
                    method: 'POST',
                    path: '/api/deals',
                    desc: 'Create a new deal analysis',
                    status: 'localStorage',
                    color: 'bg-blue-100 text-blue-800',
                  },
                  {
                    method: 'GET',
                    path: '/api/deals/:id/export',
                    desc: 'Export deal in CSV/JSON/HTML format',
                    status: 'Available',
                    color: 'bg-green-100 text-green-800',
                  },
                  {
                    method: 'POST',
                    path: '/api/webhooks',
                    desc: 'Configure webhook notifications',
                    status: 'Demo',
                    color: 'bg-amber-100 text-amber-800',
                  },
                  {
                    method: 'GET',
                    path: '/api/scenarios/:id',
                    desc: 'Retrieve saved scenario comparison',
                    status: 'localStorage',
                    color: 'bg-green-100 text-green-800',
                  },
                  {
                    method: 'POST',
                    path: '/api/import/property',
                    desc: 'Import property data from MLS/Zillow',
                    status: 'Mock',
                    color: 'bg-purple-100 text-purple-800',
                  },
                ]).map((endpoint, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-xs font-mono text-gray-800">{endpoint.path}</code>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto ${endpoint.color}`}>
                        {endpoint.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500">{endpoint.desc}</p>
                  </div>
                ))}
              </div>

              {/* Integration Partners */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-gray-800 uppercase mb-3">🔌 Integration Partners (Planned)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {([
                    { name: 'Zillow', icon: '🏠', status: 'Planned' },
                    { name: 'Redfin', icon: '📊', status: 'Planned' },
                    { name: 'MLS Direct', icon: '🔍', status: 'Planned' },
                    { name: 'QuickBooks', icon: '📒', status: 'Planned' },
                    { name: 'Zapier', icon: '⚡', status: 'Planned' },
                    { name: 'Slack', icon: '💬', status: 'Planned' },
                  ]).map(partner => (
                    <div key={partner.name} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                      <span className="text-xl block mb-1">{partner.icon}</span>
                      <div className="text-xs font-bold text-gray-800">{partner.name}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{partner.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
