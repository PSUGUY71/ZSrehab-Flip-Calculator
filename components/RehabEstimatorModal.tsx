import React, { useState, useMemo } from 'react';
import { RehabLineItem } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Finish-Grade Definitions ────────────────────────────────────────
// All costs are per-sqft unless noted otherwise.
// "perUnit" items use fixed-count formulas (windows, doors, baths, etc.)

type FinishGrade = 'rental' | 'standard' | 'premium' | 'luxury';

interface GradeConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const GRADE_CONFIG: Record<FinishGrade, GradeConfig> = {
  rental: {
    label: 'Rental Grade',
    description: 'Builder-grade materials, functional updates only. Lowest cost, designed for rental cash-flow properties.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
  },
  standard: {
    label: 'Standard Flip',
    description: 'Mid-range finishes typical of most residential flips. New flooring, paint, updated kitchen & baths.',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
  },
  premium: {
    label: 'Premium Flip',
    description: 'Higher-end finishes: quartz counters, tile backsplash, upgraded fixtures, hardwood in main areas.',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
  },
  luxury: {
    label: 'Luxury Rehab',
    description: 'Top-tier materials: custom cabinetry, premium appliances, high-end tile, designer fixtures throughout.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
  },
};

// Cost tables per category, per grade
interface CategoryCost {
  category: string;
  description: string;
  // "sqft" = cost × sqft, "unit" = cost × computed count, "fixed" = flat cost
  basis: 'sqft' | 'unit' | 'fixed';
  // Function to compute quantity given property details
  getQuantity: (sqFt: number, baths: number, foundationType: string) => number;
  costs: Record<FinishGrade, number>; // cost per unit/sqft/fixed
}

const CATEGORY_COSTS: CategoryCost[] = [
  // ── Kitchen (capped: max 15% of sqft or 250 sqft, whichever is smaller) ──
  {
    category: 'Kitchen',
    description: 'Cabinets, countertops, sink, faucet',
    basis: 'sqft',
    getQuantity: (sqFt) => Math.min(Math.round(sqFt * 0.12), 250),
    costs: { rental: 35, standard: 55, premium: 85, luxury: 130 },
  },
  {
    category: 'Kitchen',
    description: 'Appliance package (range, fridge, dishwasher, microwave)',
    basis: 'fixed',
    getQuantity: () => 1,
    costs: { rental: 2000, standard: 3500, premium: 5500, luxury: 9000 },
  },

  // ── Bathrooms (per bathroom) ──
  {
    category: 'Bathroom',
    description: 'Full bath rehab (tile, vanity, toilet, fixtures)',
    basis: 'unit',
    getQuantity: (_sqFt, baths) => Math.max(baths, 1),
    costs: { rental: 2500, standard: 4500, premium: 7500, luxury: 12000 },
  },

  // ── Flooring (per sqft, common areas) ──
  {
    category: 'Flooring',
    description: 'Flooring throughout (LVP / hardwood / tile)',
    basis: 'sqft',
    getQuantity: (sqFt) => Math.round(sqFt * 0.75), // ~75% of total sqft is floorable
    costs: { rental: 3, standard: 5, premium: 8, luxury: 14 },
  },

  // ── Paint ──
  {
    category: 'Paint',
    description: 'Interior paint (walls & ceilings, 2 coats)',
    basis: 'sqft',
    getQuantity: (sqFt) => sqFt,
    costs: { rental: 1.5, standard: 2.25, premium: 3, luxury: 4.5 },
  },
  {
    category: 'Paint',
    description: 'Exterior paint / siding touch-up',
    basis: 'sqft',
    getQuantity: (sqFt) => Math.round(sqFt * 0.35),
    costs: { rental: 2, standard: 3, premium: 5, luxury: 7 },
  },

  // ── Windows (1 per 150 sqft) ──
  {
    category: 'Windows',
    description: 'Window replacement',
    basis: 'unit',
    getQuantity: (sqFt) => Math.max(Math.round(sqFt / 150), 4),
    costs: { rental: 300, standard: 450, premium: 650, luxury: 950 },
  },

  // ── Doors (1 per 400 sqft, min 2) ──
  {
    category: 'Doors',
    description: 'Interior doors (pre-hung)',
    basis: 'unit',
    getQuantity: (sqFt) => Math.max(Math.round(sqFt / 400), 2),
    costs: { rental: 150, standard: 250, premium: 400, luxury: 650 },
  },
  {
    category: 'Doors',
    description: 'Entry door (exterior)',
    basis: 'fixed',
    getQuantity: () => 1,
    costs: { rental: 400, standard: 800, premium: 1500, luxury: 3000 },
  },

  // ── HVAC ──
  {
    category: 'HVAC',
    description: 'HVAC service / replacement',
    basis: 'fixed',
    getQuantity: () => 1,
    costs: { rental: 1500, standard: 3500, premium: 6000, luxury: 10000 },
  },

  // ── Electrical ──
  {
    category: 'Electrical',
    description: 'Electrical updates (panel, outlets, fixtures)',
    basis: 'sqft',
    getQuantity: (sqFt) => sqFt,
    costs: { rental: 1, standard: 2, premium: 3.5, luxury: 5.5 },
  },

  // ── Plumbing ──
  {
    category: 'Plumbing',
    description: 'Plumbing updates (supply lines, drains, fixtures)',
    basis: 'sqft',
    getQuantity: (sqFt) => sqFt,
    costs: { rental: 0.75, standard: 1.5, premium: 2.5, luxury: 4 },
  },

  // ── Roof ──
  {
    category: 'Roof',
    description: 'Roof repair / replacement',
    basis: 'sqft',
    getQuantity: (sqFt) => Math.round(sqFt * 0.6), // Roof footprint ~60% of sqft (single story approx)
    costs: { rental: 2, standard: 3.5, premium: 5, luxury: 8 },
  },

  // ── Foundation (varies by type) ──
  {
    category: 'Foundation',
    description: 'Foundation / structural repair',
    basis: 'fixed',
    getQuantity: (_sqFt, _baths, foundationType) => {
      // Foundation costs scale with type
      switch (foundationType) {
        case 'Basement': return 1;
        case 'Crawl Space': return 1;
        case 'Slab': return 1;
        default: return 1;
      }
    },
    costs: {
      rental: 500,
      standard: 1500,
      premium: 3000,
      luxury: 5000,
    },
  },

  // ── Landscaping ──
  {
    category: 'Landscaping',
    description: 'Curb appeal (grading, sod, shrubs, mulch)',
    basis: 'fixed',
    getQuantity: () => 1,
    costs: { rental: 1000, standard: 2500, premium: 5000, luxury: 10000 },
  },

  // ── Dumpster / Cleanup ──
  {
    category: 'Other',
    description: 'Dumpster, demo, cleanup',
    basis: 'fixed',
    getQuantity: () => 1,
    costs: { rental: 1500, standard: 2500, premium: 3500, luxury: 5000 },
  },
];

// ─── Props ───────────────────────────────────────────────────────────

interface RehabEstimatorModalProps {
  sqFt: number;
  baths: number;
  foundationType: string;
  onApplyEstimate: (lineItems: RehabLineItem[], totalBudget: number) => void;
  onClose: () => void;
}

export const RehabEstimatorModal: React.FC<RehabEstimatorModalProps> = ({
  sqFt: propSqFt,
  baths: propBaths,
  foundationType: propFoundation,
  onApplyEstimate,
  onClose,
}) => {
  const [grade, setGrade] = useState<FinishGrade>('standard');
  const [localSqFt, setLocalSqFt] = useState(propSqFt || 1200);
  const [localBaths, setLocalBaths] = useState(propBaths || 2);
  const [localFoundation, setLocalFoundation] = useState(propFoundation || 'Basement');
  const [includeContingency, setIncludeContingency] = useState(true);

  // Generate line items for the selected grade
  const generatedItems = useMemo(() => {
    const items: Array<{
      category: string;
      description: string;
      unitCost: number;
      quantity: number;
      total: number;
    }> = [];

    for (const cat of CATEGORY_COSTS) {
      const qty = cat.getQuantity(localSqFt, localBaths, localFoundation);
      const cost = cat.costs[grade];
      if (qty > 0 && cost > 0) {
        items.push({
          category: cat.category,
          description: cat.description,
          unitCost: cost,
          quantity: qty,
          total: cost * qty,
        });
      }
    }

    return items;
  }, [grade, localSqFt, localBaths, localFoundation]);

  const subtotal = useMemo(() => generatedItems.reduce((s, i) => s + i.total, 0), [generatedItems]);
  const contingencyAmount = includeContingency ? Math.round(subtotal * 0.15) : 0;
  const grandTotal = subtotal + contingencyAmount;
  const costPerSqFt = localSqFt > 0 ? grandTotal / localSqFt : 0;

  const handleApply = () => {
    const lineItems: RehabLineItem[] = generatedItems.map((item, i) => ({
      id: `est-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`,
      category: item.category,
      description: item.description,
      unitCost: item.unitCost,
      quantity: item.quantity,
    }));

    // Add contingency as its own line item
    if (includeContingency && contingencyAmount > 0) {
      lineItems.push({
        id: `est-${Date.now()}-cont-${Math.random().toString(36).substr(2, 6)}`,
        category: 'Other',
        description: '15% Contingency Reserve',
        unitCost: contingencyAmount,
        quantity: 1,
      });
    }

    onApplyEstimate(lineItems, grandTotal);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold">🔧 Rehab Auto-Estimator</h2>
            <p className="text-xs text-gray-300 mt-0.5">Select a finish grade to auto-generate your rehab budget</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Specs (editable overrides) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Property Specs</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase">Sq Ft</label>
                <input
                  type="number"
                  value={localSqFt || ''}
                  onChange={(e) => setLocalSqFt(parseInt(e.target.value) || 0)}
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase">Bathrooms</label>
                <input
                  type="number"
                  value={localBaths || ''}
                  onChange={(e) => setLocalBaths(parseFloat(e.target.value) || 0)}
                  step="0.5"
                  min="0"
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 uppercase">Foundation</label>
                <select
                  value={localFoundation}
                  onChange={(e) => setLocalFoundation(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Basement">Basement</option>
                  <option value="Crawl Space">Crawl Space</option>
                  <option value="Slab">Slab</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grade Selector */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Select Finish Grade</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {(Object.entries(GRADE_CONFIG) as [FinishGrade, GradeConfig][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setGrade(key)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    grade === key
                      ? `${cfg.bgColor} ${cfg.borderColor} ring-2 ring-offset-1 ring-${cfg.borderColor.replace('border-', '')}`
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className={`text-sm font-bold ${grade === key ? cfg.color : 'text-gray-700'}`}>
                    {cfg.label}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 leading-tight">{cfg.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cost Preview Table */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Estimated Line Items</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Description</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Unit Cost</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Qty</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedItems.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-1.5 font-medium text-gray-700">{item.category}</td>
                      <td className="px-3 py-1.5 text-gray-600">{item.description}</td>
                      <td className="px-3 py-1.5 text-right text-gray-700">{formatCurrency(item.unitCost)}</td>
                      <td className="px-3 py-1.5 text-right text-gray-700">{item.quantity}</td>
                      <td className="px-3 py-1.5 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  {includeContingency && contingencyAmount > 0 && (
                    <tr className="border-t border-amber-200 bg-amber-50">
                      <td className="px-3 py-1.5 font-medium text-amber-700">Other</td>
                      <td className="px-3 py-1.5 text-amber-600">15% Contingency Reserve</td>
                      <td className="px-3 py-1.5 text-right text-amber-700">{formatCurrency(contingencyAmount)}</td>
                      <td className="px-3 py-1.5 text-right text-amber-700">1</td>
                      <td className="px-3 py-1.5 text-right font-medium text-amber-800">{formatCurrency(contingencyAmount)}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="px-3 py-2 text-right font-bold text-gray-900">Subtotal:</td>
                    <td className="px-3 py-2 text-right font-bold text-gray-900">{formatCurrency(subtotal)}</td>
                  </tr>
                  {includeContingency && contingencyAmount > 0 && (
                    <tr>
                      <td colSpan={4} className="px-3 py-1.5 text-right font-semibold text-amber-700">+ Contingency (15%):</td>
                      <td className="px-3 py-1.5 text-right font-semibold text-amber-700">{formatCurrency(contingencyAmount)}</td>
                    </tr>
                  )}
                  <tr className="border-t border-gray-300">
                    <td colSpan={4} className="px-3 py-2 text-right font-black text-gray-900 text-sm">Grand Total:</td>
                    <td className="px-3 py-2 text-right font-black text-gray-900 text-sm">{formatCurrency(grandTotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`${GRADE_CONFIG[grade].bgColor} border ${GRADE_CONFIG[grade].borderColor} rounded-lg p-3 text-center`}>
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Total Budget</div>
              <div className={`text-lg font-bold ${GRADE_CONFIG[grade].color}`}>{formatCurrency(grandTotal)}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Cost / Sq Ft</div>
              <div className="text-lg font-bold text-gray-800">{formatCurrency(costPerSqFt)}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Line Items</div>
              <div className="text-lg font-bold text-gray-800">{generatedItems.length + (includeContingency ? 1 : 0)}</div>
            </div>
          </div>

          {/* Contingency Toggle */}
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <input
              type="checkbox"
              id="contingency-toggle"
              checked={includeContingency}
              onChange={(e) => setIncludeContingency(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
            />
            <label htmlFor="contingency-toggle" className="text-xs text-amber-800">
              <span className="font-semibold">Include 15% Contingency Reserve</span>
              <span className="text-amber-600 ml-1">({formatCurrency(Math.round(subtotal * 0.15))})</span>
              <span className="block text-[10px] text-amber-600 mt-0.5">Recommended to cover unexpected costs during rehab</span>
            </label>
          </div>

          {/* Warning if no sqft */}
          {localSqFt === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-xs text-red-700">
              ⚠️ Enter square footage above to generate accurate estimates.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex items-center justify-between">
          <p className="text-[10px] text-gray-400 max-w-sm">
            All line items are fully editable after applying. Costs are estimates based on national averages.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={localSqFt === 0}
              className="px-5 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Apply to Rehab Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
