import React, { useState, useCallback } from 'react';
import { LoanInputs } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

interface ComparableSale {
  address: string;
  salePrice: number;
  saleDate: string;
  sqft: number;
  beds: number;
  baths: number;
  daysOnMarket: number;
  pricePerSqft: number;
}

interface PropertyData {
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  foundation: 'Basement' | 'Crawl Space' | 'Slab' | 'Other';
  propertyType: 'SFR' | 'Multi-Family' | 'Mixed-Use';
  lastSalePrice: number;
  lastSaleDate: string;
  estimatedValue: number;
  annualTaxes: number;
  comps: ComparableSale[];
  estimatedARV: number;
}

interface PropertyImportModalProps {
  currentAddress: string;
  onApplyData: (data: Partial<LoanInputs>) => void;
  onClose: () => void;
}

// ─── Local Storage for recent searches ───────────────────────────────

const RECENT_SEARCHES_KEY = 'recent_property_searches';

const loadRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveRecentSearch = (address: string) => {
  try {
    const recent = loadRecentSearches();
    const updated = [address, ...recent.filter(a => a !== address)].slice(0, 10);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
};

// ─── Mock Data Generator ─────────────────────────────────────────────

const generateMockProperty = (searchAddress: string): PropertyData => {
  // Parse address components with some intelligence
  const parts = searchAddress.split(',').map(s => s.trim());
  const street = parts[0] || searchAddress;
  const cityPart = parts[1] || 'Springfield';
  const stateZipPart = parts[2] || '';
  const stateMatch = stateZipPart.match(/([A-Z]{2})\s*(\d{5})?/i);
  const state = stateMatch?.[1]?.toUpperCase() || 'PA';
  const zip = stateMatch?.[2] || '17101';

  // Generate realistic random data based on state
  const basePrice = 150000 + Math.floor(Math.random() * 200000);
  const sqft = 1200 + Math.floor(Math.random() * 1500);
  const beds = Math.floor(Math.random() * 3) + 2;
  const baths = Math.floor(Math.random() * 2) + 1 + (Math.random() > 0.5 ? 0.5 : 0);
  const yearBuilt = 1950 + Math.floor(Math.random() * 60);
  const pricePerSqft = basePrice / sqft;

  // Generate 5 comparable sales
  const comps: ComparableSale[] = [];
  const streets = ['Oak St', 'Maple Ave', 'Pine Rd', 'Cedar Ln', 'Elm Dr', 'Birch Way', 'Walnut Ct'];
  for (let i = 0; i < 5; i++) {
    const compSqft = sqft + Math.floor((Math.random() - 0.5) * 400);
    const compPricePerSqft = pricePerSqft + (Math.random() - 0.5) * 30;
    const compPrice = Math.round(compSqft * compPricePerSqft / 1000) * 1000;
    const daysAgo = 30 + Math.floor(Math.random() * 150);
    const saleDate = new Date();
    saleDate.setDate(saleDate.getDate() - daysAgo);

    comps.push({
      address: `${100 + Math.floor(Math.random() * 900)} ${streets[i % streets.length]}, ${cityPart}`,
      salePrice: compPrice,
      saleDate: saleDate.toLocaleDateString(),
      sqft: compSqft,
      beds: beds + Math.floor((Math.random() - 0.5) * 2),
      baths: baths,
      daysOnMarket: 15 + Math.floor(Math.random() * 60),
      pricePerSqft: Math.round(compPricePerSqft),
    });
  }

  // Sort comps by date (most recent first)
  comps.sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());

  const avgCompPrice = Math.round(comps.reduce((sum, c) => sum + c.salePrice, 0) / comps.length);
  const foundations: ('Basement' | 'Crawl Space' | 'Slab' | 'Other')[] = ['Basement', 'Crawl Space', 'Slab'];
  const foundation = foundations[yearBuilt < 1970 ? 0 : yearBuilt < 1990 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3)];

  return {
    address: street,
    city: cityPart,
    state,
    zip,
    beds,
    baths,
    sqft,
    lotSize: `${(0.15 + Math.random() * 0.5).toFixed(2)} acres`,
    yearBuilt,
    foundation,
    propertyType: 'SFR',
    lastSalePrice: Math.round(basePrice * 0.8 / 1000) * 1000,
    lastSaleDate: (() => { const d = new Date(); d.setFullYear(d.getFullYear() - Math.floor(Math.random() * 10 + 1)); return d.toLocaleDateString(); })(),
    estimatedValue: basePrice,
    annualTaxes: Math.round(basePrice * 0.015),
    comps,
    estimatedARV: avgCompPrice,
  };
};

// ─── Component ───────────────────────────────────────────────────────

export const PropertyImportModal: React.FC<PropertyImportModalProps> = ({
  currentAddress,
  onApplyData,
  onClose,
}) => {
  const [searchAddress, setSearchAddress] = useState(currentAddress || '');
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [recentSearches] = useState<string[]>(() => loadRecentSearches());
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<PropertyData | null>(null);

  const handleSearch = useCallback(() => {
    if (!searchAddress.trim()) return;
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const data = generateMockProperty(searchAddress);
      setPropertyData(data);
      setEditData({ ...data });
      saveRecentSearch(searchAddress);
      setIsSearching(false);
    }, 1200 + Math.random() * 800);
  }, [searchAddress]);

  const handleApply = () => {
    const data = editMode ? editData : propertyData;
    if (!data) return;

    const autoFill: Partial<LoanInputs> = {
      address: `${data.address}, ${data.city}, ${data.state} ${data.zip}`,
      state: data.state,
      zipCode: data.zip,
      beds: data.beds,
      baths: data.baths,
      sqFt: data.sqft,
      foundationType: data.foundation,
      propertyType: data.propertyType,
      purchasePrice: data.estimatedValue,
      arv: data.estimatedARV,
    };

    onApplyData(autoFill);
    onClose();
  };

  const activeData = editMode ? editData : propertyData;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">🔍 Auto-Fill Property Data</h2>
            <p className="text-xs text-gray-300 mt-0.5">Search an address to auto-populate property details and comparable sales.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Demo Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
            <span className="text-amber-500 shrink-0">ℹ️</span>
            <div>
              <p className="font-semibold">Demo Mode — Mock Data</p>
              <p className="mt-0.5 text-amber-700">This returns simulated data for demonstration purposes. For production, integrate with Zillow API, Redfin API, or MLS system (requires API key).</p>
            </div>
          </div>

          {/* Search Bar */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Property Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="123 Main St, Springfield, PA 17101"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchAddress.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
              >
                {isSearching ? (
                  <>
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Searching...
                  </>
                ) : (
                  '🔍 Search'
                )}
              </button>
            </div>
            {/* Recent Searches */}
            {recentSearches.length > 0 && !propertyData && (
              <div className="mt-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Recent Searches:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {recentSearches.slice(0, 5).map((addr, i) => (
                    <button
                      key={i}
                      onClick={() => { setSearchAddress(addr); }}
                      className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition truncate max-w-[200px]"
                    >
                      {addr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mb-3" />
              <p className="text-sm text-gray-600">Searching property records...</p>
              <p className="text-xs text-gray-400 mt-1">Querying comparable sales and tax records</p>
            </div>
          )}

          {/* Results */}
          {propertyData && !isSearching && (
            <div className="space-y-5">
              {/* Property Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800 uppercase flex items-center gap-2">
                    📍 Property Details
                  </h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`text-xs font-medium px-3 py-1 rounded-lg transition ${editMode ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {editMode ? '✏️ Editing' : '✏️ Adjust Manually'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <DetailField label="Address" value={activeData!.address} editable={editMode} onChange={(v) => editData && setEditData({...editData, address: v})} />
                  <DetailField label="City" value={activeData!.city} editable={editMode} onChange={(v) => editData && setEditData({...editData, city: v})} />
                  <DetailField label="State" value={activeData!.state} editable={editMode} onChange={(v) => editData && setEditData({...editData, state: v})} />
                  <DetailField label="Zip" value={activeData!.zip} editable={editMode} onChange={(v) => editData && setEditData({...editData, zip: v})} />
                  <DetailField label="Beds" value={String(activeData!.beds)} type="number" editable={editMode} onChange={(v) => editData && setEditData({...editData, beds: Number(v)})} />
                  <DetailField label="Baths" value={String(activeData!.baths)} type="number" editable={editMode} onChange={(v) => editData && setEditData({...editData, baths: Number(v)})} />
                  <DetailField label="Sqft" value={String(activeData!.sqft)} type="number" editable={editMode} onChange={(v) => editData && setEditData({...editData, sqft: Number(v)})} />
                  <DetailField label="Year Built" value={String(activeData!.yearBuilt)} editable={false} />
                  <DetailField label="Lot Size" value={activeData!.lotSize} editable={false} />
                  <DetailField label="Foundation" value={activeData!.foundation} editable={false} />
                  <DetailField label="Type" value={activeData!.propertyType} editable={false} />
                  <DetailField label="Annual Taxes" value={formatCurrency(activeData!.annualTaxes)} editable={false} />
                </div>
              </div>

              {/* Valuation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-[10px] font-semibold text-blue-600 uppercase">Last Sale Price</div>
                  <div className="text-xl font-bold text-blue-900 mt-1">{formatCurrency(activeData!.lastSalePrice)}</div>
                  <div className="text-[10px] text-blue-500 mt-0.5">{activeData!.lastSaleDate}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-[10px] font-semibold text-green-600 uppercase">Estimated Value</div>
                  <div className="text-xl font-bold text-green-900 mt-1">{formatCurrency(activeData!.estimatedValue)}</div>
                  <div className="text-[10px] text-green-500 mt-0.5">Current market estimate</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="text-[10px] font-semibold text-purple-600 uppercase">Estimated ARV</div>
                  <div className="text-xl font-bold text-purple-900 mt-1">{formatCurrency(activeData!.estimatedARV)}</div>
                  <div className="text-[10px] text-purple-500 mt-0.5">Average of {activeData!.comps.length} comps</div>
                </div>
              </div>

              {/* Comparable Sales */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                  <h3 className="text-xs font-bold text-gray-700 uppercase">🏘️ Comparable Sales ({activeData!.comps.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[550px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">Address</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-600">Sale Price</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-600">$/SqFt</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-600">Beds/Baths</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-600">SqFt</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-600">DOM</th>
                        <th className="px-3 py-2 text-right font-semibold text-gray-600">Sale Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeData!.comps.map((comp, i) => (
                        <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-800">{comp.address}</td>
                          <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(comp.salePrice)}</td>
                          <td className="px-3 py-2 text-right text-gray-600">${comp.pricePerSqft}</td>
                          <td className="px-3 py-2 text-center text-gray-600">{comp.beds}/{comp.baths}</td>
                          <td className="px-3 py-2 text-right text-gray-600">{comp.sqft.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right text-gray-600">{comp.daysOnMarket}d</td>
                          <td className="px-3 py-2 text-right text-gray-500">{comp.saleDate}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                      <tr>
                        <td className="px-3 py-2 font-bold text-gray-700">Average</td>
                        <td className="px-3 py-2 text-right font-bold text-gray-900">
                          {formatCurrency(Math.round(activeData!.comps.reduce((s, c) => s + c.salePrice, 0) / activeData!.comps.length))}
                        </td>
                        <td className="px-3 py-2 text-right font-bold text-gray-700">
                          ${Math.round(activeData!.comps.reduce((s, c) => s + c.pricePerSqft, 0) / activeData!.comps.length)}
                        </td>
                        <td colSpan={2}></td>
                        <td className="px-3 py-2 text-right font-bold text-gray-700">
                          {Math.round(activeData!.comps.reduce((s, c) => s + c.daysOnMarket, 0) / activeData!.comps.length)}d
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Auto-fill Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-green-800 uppercase mb-2">📋 Fields That Will Be Auto-Filled</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-600">Address</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">State/Zip</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Beds/Baths</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">SqFt</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Foundation</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Property Type</span><span className="font-medium">✓</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Purchase Price</span><span className="font-medium text-green-700">{formatCurrency(activeData!.estimatedValue)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">ARV</span><span className="font-medium text-green-700">{formatCurrency(activeData!.estimatedARV)}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between items-center">
          <p className="text-[10px] text-gray-400 max-w-sm hidden sm:block">Demo data only. Real MLS data requires API integration.</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            {propertyData && (
              <button
                onClick={handleApply}
                className="px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition shadow-sm flex items-center gap-2"
              >
                ✅ Use This Data
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Helper Component ────────────────────────────────────────────────

const DetailField: React.FC<{
  label: string;
  value: string;
  type?: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}> = ({ label, value, type = 'text', editable = false, onChange }) => (
  <div>
    <label className="text-[10px] font-semibold text-gray-500 uppercase block">{label}</label>
    {editable && onChange ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-0.5 px-2 py-1 text-sm border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-amber-50"
      />
    ) : (
      <div className="text-sm font-medium text-gray-900 mt-0.5">{value}</div>
    )}
  </div>
);
