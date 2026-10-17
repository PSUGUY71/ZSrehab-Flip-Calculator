import React, { useState, useCallback } from 'react';
import { LoanInputs } from '../types';
import { formatCurrency } from '../utils/calculations';
import { lookupProperty, looksComplete, PropertyRecord } from '../utils/propertyLookup';

/**
 * Auto-fill property details from REAL public records (utils/propertyLookup.ts):
 * Philadelphia city records for free, RentCast (user's key) everywhere else. Fills address, state, county,
 * beds/baths/sqft, type, foundation and the yearly tax bill. Purchase price and ARV are never overwritten —
 * the value estimate and comparables are shown for reference only.
 */

interface PropertyImportModalProps {
  currentAddress: string;
  county?: string;
  rentcastApiKey?: string;
  onApplyData: (data: Partial<LoanInputs>) => void;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'recent_property_searches';

const loadRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveRecentSearch = (address: string) => {
  try {
    const updated = [address, ...loadRecentSearches().filter((a) => a !== address)].slice(0, 10);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
};

const money = (v?: number) => (v ? formatCurrency(v) : '—');

export const PropertyImportModal: React.FC<PropertyImportModalProps> = ({
  currentAddress,
  county,
  rentcastApiKey,
  onApplyData,
  onClose,
}) => {
  const [searchAddress, setSearchAddress] = useState(currentAddress || '');
  const [isSearching, setIsSearching] = useState(false);
  const [record, setRecord] = useState<PropertyRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [recentSearches] = useState<string[]>(() => loadRecentSearches());

  const handleSearch = useCallback(async () => {
    const addr = searchAddress.trim();
    if (!addr) return;
    if (!looksComplete(addr)) {
      setMessage('Enter the full address: street, city, state and zip (e.g. 1633 S 20th St, Philadelphia, PA 19145).');
      return;
    }
    setIsSearching(true); setMessage(null); setRecord(null);
    try {
      const rec = await lookupProperty(addr, { county, rentcastKey: rentcastApiKey, withValuation: true });
      if (rec) {
        setRecord(rec);
        saveRecentSearch(addr);
      } else {
        setMessage(rentcastApiKey || /philadelphia/i.test(addr)
          ? 'No public record found for this address. Check the spelling, or enter the details by hand.'
          : 'Automatic lookup is free for Philadelphia properties. For other areas, add a free RentCast key in Settings → Property Data.');
      }
    } catch (e: any) {
      setMessage(e?.message || 'Lookup failed. Try again in a moment.');
    } finally {
      setIsSearching(false);
    }
  }, [searchAddress, county, rentcastApiKey]);

  const handleApply = () => {
    if (!record) return;
    const fullAddress = [record.address, record.city, [record.state, record.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const data: Partial<LoanInputs> = {
      ...(fullAddress ? { address: fullAddress } : {}),
      ...(record.state ? { state: record.state } : {}),
      ...(record.county ? { county: record.county } : {}),
      ...(record.zip ? { zipCode: record.zip } : {}),
      ...(record.beds ? { beds: record.beds } : {}),
      ...(record.baths ? { baths: record.baths } : {}),
      ...(record.sqft ? { sqFt: record.sqft } : {}),
      ...(record.propertyType ? { propertyType: record.propertyType } : {}),
      ...(record.foundation ? { foundationType: record.foundation } : {}),
      // tax before its source: typing the tax clears the source, so the source must be applied after
      ...(record.annualTax ? { annualPropertyTax: Math.round(record.annualTax), annualPropertyTaxSource: record.sourceLabel } : {}),
    };
    onApplyData(data);
    onClose();
  };

  const r = record;
  const compAvg = r?.comps?.length ? Math.round(r.comps.reduce((s, c) => s + c.price, 0) / r.comps.length) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">🔍 Auto-Fill Property Data</h2>
            <p className="text-xs text-gray-300 mt-0.5">Look up the property's public records — taxes, beds, baths, square feet and last sale.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Search Bar */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Property Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="1633 S 20th St, Philadelphia, PA 19145"
                className="flex-1 min-w-0 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchAddress.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
              >
                {isSearching ? (
                  <>
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Searching…
                  </>
                ) : '🔍 Search'}
              </button>
            </div>
            {!rentcastApiKey && (
              <p className="text-[10px] text-gray-500 mt-1">
                Free for Philadelphia properties. Other areas need a free RentCast key (Settings → Property Data).
              </p>
            )}
            {recentSearches.length > 0 && !record && (
              <div className="mt-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Recent Searches:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {recentSearches.slice(0, 5).map((addr) => (
                    <button
                      key={addr}
                      onClick={() => setSearchAddress(addr)}
                      className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition truncate max-w-[200px]"
                    >
                      {addr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {message && <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg p-3">{message}</div>}

          {isSearching && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mb-3" />
              <p className="text-sm text-gray-600">Searching public property records…</p>
            </div>
          )}

          {r && !isSearching && (
            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase mb-1">📍 Property Details</h3>
                <p className="text-[10px] text-gray-500 mb-3">Source: {r.sourceLabel}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Field label="Address" value={r.address} />
                  <Field label="City" value={r.city} />
                  <Field label="State / Zip" value={[r.state, r.zip].filter(Boolean).join(' ')} />
                  <Field label="County" value={r.county} />
                  <Field label="Beds" value={r.beds} />
                  <Field label="Baths" value={r.baths} />
                  <Field label="Sq Ft" value={r.sqft?.toLocaleString()} />
                  <Field label="Year Built" value={r.yearBuilt} />
                  <Field label="Type" value={r.propertyType} />
                  <Field label="Foundation" value={r.foundation} />
                  <Field label="Lot Size" value={r.lotSize} />
                  <Field label={`Annual Taxes${r.taxYear ? ` (${r.taxYear})` : ''}`} value={r.annualTax ? formatCurrency(r.annualTax) : undefined} highlight />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-[10px] font-semibold text-blue-600 uppercase">Last Sale</div>
                  <div className="text-xl font-bold text-blue-900 mt-1">{money(r.lastSalePrice)}</div>
                  <div className="text-[10px] text-blue-500 mt-0.5">{r.lastSaleDate || '—'}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-[10px] font-semibold text-green-600 uppercase">
                    {r.source === 'philly-opa' ? 'City Market Value' : 'Estimated As-Is Value'}
                  </div>
                  <div className="text-xl font-bold text-green-900 mt-1">{money(r.estimatedValue)}</div>
                  <div className="text-[10px] text-green-600 mt-0.5">
                    {r.valueLow && r.valueHigh ? `Range ${formatCurrency(r.valueLow)} – ${formatCurrency(r.valueHigh)}` : 'For reference only'}
                  </div>
                </div>
              </div>

              {!!r.comps?.length && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <h3 className="text-xs font-bold text-gray-700 uppercase">🏘️ Nearby Comparables ({r.comps.length}) — average {formatCurrency(compAvg)}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs min-w-[520px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-600">Address</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-600">Price</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-600">Beds/Baths</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-600">Sq Ft</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-600">Miles</th>
                          <th className="px-3 py-2 text-right font-semibold text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.comps.map((c, i) => (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="px-3 py-2 font-medium text-gray-800">{c.address}</td>
                            <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(c.price)}</td>
                            <td className="px-3 py-2 text-center text-gray-600">{c.beds ?? '—'}/{c.baths ?? '—'}</td>
                            <td className="px-3 py-2 text-right text-gray-600">{c.sqft?.toLocaleString() ?? '—'}</td>
                            <td className="px-3 py-2 text-right text-gray-600">{c.distanceMiles != null ? c.distanceMiles.toFixed(1) : '—'}</td>
                            <td className="px-3 py-2 text-right text-gray-500">{c.date || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="px-4 py-2 text-[10px] text-gray-500 bg-gray-50 border-t">
                    These are as-is comparables, not after-repair value — your ARV is not changed.
                  </p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800">
                <b>Use This Data</b> fills: address, state, county, zip, beds, baths, sq ft, type, foundation
                {r.annualTax ? ' and the yearly property tax' : ''}. Your purchase price and ARV stay as you entered them.
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Cancel
          </button>
          {r && (
            <button onClick={handleApply} className="px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition shadow-sm">
              ✅ Use This Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value?: string | number; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div>
    <div className="text-[10px] font-semibold text-gray-500 uppercase">{label}</div>
    <div className={`text-sm font-medium mt-0.5 ${highlight ? 'text-green-700 font-bold' : 'text-gray-900'}`}>{value ?? '—'}</div>
  </div>
);
