import React, { useState, useCallback } from 'react';
import { LoanInputs, SavedDeal } from '../types';

interface ShareDealModalProps {
  dealName: string;
  dealInputs: LoanInputs;
  currentUser: { email?: string | null; username?: string | null } | null;
  savedDeals: SavedDeal[];
  onClose: () => void;
}

// Encode deal data to a URL-safe base64 string
const encodeDealData = (payload: object): string => {
  const json = JSON.stringify(payload);
  // Use TextEncoder for binary → base64
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Decode a URL-safe base64 string back to an object
export const decodeDealData = (encoded: string): any => {
  // Restore base64 standard chars
  let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding
  while (b64.length % 4) b64 += '=';
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
};

export const ShareDealModal: React.FC<ShareDealModalProps> = ({
  dealName,
  dealInputs,
  currentUser,
  savedDeals,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | number | null>(null);
  const [shareMode, setShareMode] = useState<'current' | 'saved'>('current');

  // Build the share payload — minimal data needed
  const getSharePayload = useCallback(() => {
    if (shareMode === 'saved' && selectedDealId !== null) {
      const deal = savedDeals.find((d) => d.id === selectedDealId);
      if (deal) {
        return {
          name: deal.name,
          date: deal.date,
          data: deal.data,
          sharedBy: currentUser?.email || currentUser?.username || 'Anonymous',
          sharedAt: new Date().toISOString(),
        };
      }
    }
    return {
      name: dealName || 'Untitled Deal',
      date: new Date().toLocaleDateString(),
      data: dealInputs,
      sharedBy: currentUser?.email || currentUser?.username || 'Anonymous',
      sharedAt: new Date().toISOString(),
    };
  }, [shareMode, selectedDealId, savedDeals, dealName, dealInputs, currentUser]);

  const generateShareUrl = useCallback(() => {
    const payload = getSharePayload();
    const encoded = encodeDealData(payload);
    return `${window.location.origin}${window.location.pathname}#share=${encoded}`;
  }, [getSharePayload]);

  const handleCopy = useCallback(async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [generateShareUrl]);

  const shareUrl = generateShareUrl();
  const urlLength = shareUrl.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 no-print">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 border border-amber-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <div>
              <h2 className="text-lg font-bold">Share Deal</h2>
              <p className="text-gray-400 text-xs">Generate a read-only link to share this deal analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Share Mode Toggle */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">What to share:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setShareMode('current')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition border ${
                  shareMode === 'current'
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                📝 Current Deal
              </button>
              <button
                onClick={() => setShareMode('saved')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition border ${
                  shareMode === 'saved'
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                💾 Saved Deal
              </button>
            </div>
          </div>

          {/* Saved Deal Selector */}
          {shareMode === 'saved' && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Select a saved deal:</label>
              {savedDeals.length > 0 ? (
                <select
                  value={selectedDealId?.toString() || ''}
                  onChange={(e) => setSelectedDealId(e.target.value || null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  <option value="">— Select a deal —</option>
                  {savedDeals.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.date})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
                  No saved deals. Save a deal first or share the current deal.
                </div>
              )}
            </div>
          )}

          {/* Deal Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sharing:</span>
              <span className="text-sm font-bold text-gray-900">
                {shareMode === 'saved' && selectedDealId
                  ? savedDeals.find((d) => d.id === selectedDealId)?.name || 'Unknown Deal'
                  : dealName || 'Current Deal'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {shareMode === 'current' ? (
                <>
                  <span>Purchase: ${dealInputs.purchasePrice?.toLocaleString() || '0'}</span>
                  <span>ARV: ${dealInputs.arv?.toLocaleString() || '0'}</span>
                  <span>Rehab: ${dealInputs.rehabBudget?.toLocaleString() || '0'}</span>
                  <span>State: {dealInputs.selectedState || '—'}</span>
                </>
              ) : selectedDealId ? (
                (() => {
                  const d = savedDeals.find((dd) => dd.id === selectedDealId);
                  return d ? (
                    <>
                      <span>Purchase: ${d.data.purchasePrice?.toLocaleString() || '0'}</span>
                      <span>ARV: ${d.data.arv?.toLocaleString() || '0'}</span>
                      <span>Rehab: ${d.data.rehabBudget?.toLocaleString() || '0'}</span>
                      <span>State: {d.data.selectedState || '—'}</span>
                    </>
                  ) : null;
                })()
              ) : (
                <span className="col-span-2 text-gray-400 italic">Select a deal above</span>
              )}
            </div>
          </div>

          {/* Share URL */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Share Link:</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 font-mono truncate"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1 shrink-0 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-gray-900'
                }`}
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              URL length: {urlLength.toLocaleString()} chars • Deal data is embedded in the URL (no server required)
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            <div className="flex gap-2">
              <span className="text-blue-500 shrink-0">ℹ️</span>
              <div>
                <p className="font-semibold mb-1">How sharing works:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• The link contains all deal data — no account required to view</li>
                  <li>• Recipients see a <strong>read-only</strong> view with key metrics</li>
                  <li>• They can print the analysis directly from the shared view</li>
                  <li>• Your private deals remain private — only shared links are accessible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
