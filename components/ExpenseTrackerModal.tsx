import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { RehabLineItem } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

interface ActualExpense {
  lineItemId: string;
  actualCost: number;
  notes: string;
  paidDate: string;
  vendor: string;
  status: 'pending' | 'paid' | 'overbudget';
}

interface ExpenseOverride {
  category: string;        // 'closing_buy' | 'closing_sell' | 'holding' | 'other'
  label: string;
  projected: number;
  actual: number;
  notes: string;
}

export interface ExpenseTrackerData {
  rehabActuals: ActualExpense[];
  overheadExpenses: ExpenseOverride[];
  lastUpdated: string;
}

interface ExpenseTrackerModalProps {
  rehabLineItems: RehabLineItem[];
  totalRehabBudget: number;
  closingCostsBuy: number;
  closingCostsSell: number;
  holdingCosts: number;
  onClose: () => void;
}

// ─── Local Storage ───────────────────────────────────────────────────

const EXPENSE_TRACKER_KEY = 'zs_expense_tracker';

export const loadExpenseTracker = (): ExpenseTrackerData => {
  try {
    const stored = localStorage.getItem(EXPENSE_TRACKER_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { rehabActuals: [], overheadExpenses: [], lastUpdated: '' };
};

const saveExpenseTracker = (data: ExpenseTrackerData) => {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(EXPENSE_TRACKER_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
};

// ─── Component ───────────────────────────────────────────────────────

export const ExpenseTrackerModal: React.FC<ExpenseTrackerModalProps> = ({
  rehabLineItems,
  totalRehabBudget,
  closingCostsBuy,
  closingCostsSell,
  holdingCosts,
  onClose,
}) => {
  const [trackerData, setTrackerData] = useState<ExpenseTrackerData>(() => loadExpenseTracker());
  const [activeTab, setActiveTab] = useState<'rehab' | 'overhead' | 'summary'>('rehab');

  // Initialize overhead expenses with current projected values if empty
  useEffect(() => {
    if (trackerData.overheadExpenses.length === 0) {
      const defaultOverhead: ExpenseOverride[] = [
        { category: 'closing_buy', label: 'Purchase Closing Costs', projected: closingCostsBuy, actual: 0, notes: '' },
        { category: 'closing_sell', label: 'Sale Closing Costs', projected: closingCostsSell, actual: 0, notes: '' },
        { category: 'holding', label: 'Total Holding Costs', projected: holdingCosts, actual: 0, notes: '' },
        { category: 'other', label: 'Misc / Unexpected', projected: 0, actual: 0, notes: '' },
      ];
      setTrackerData(prev => ({ ...prev, overheadExpenses: defaultOverhead }));
    }
  }, []);

  // Get or create actual expense for a rehab line item
  const getActualForItem = useCallback((itemId: string): ActualExpense => {
    return trackerData.rehabActuals.find(a => a.lineItemId === itemId) || {
      lineItemId: itemId,
      actualCost: 0,
      notes: '',
      paidDate: '',
      vendor: '',
      status: 'pending',
    };
  }, [trackerData.rehabActuals]);

  const updateRehabActual = useCallback((itemId: string, field: keyof ActualExpense, value: string | number) => {
    setTrackerData(prev => {
      const existing = prev.rehabActuals.find(a => a.lineItemId === itemId);
      const updated = existing
        ? { ...existing, [field]: value }
        : { lineItemId: itemId, actualCost: 0, notes: '', paidDate: '', vendor: '', status: 'pending' as const, [field]: value };
      
      // Auto-compute status
      const lineItem = rehabLineItems.find(li => li.id === itemId);
      if (lineItem && field === 'actualCost') {
        const projected = lineItem.unitCost * lineItem.quantity;
        const actual = Number(value);
        updated.status = actual === 0 ? 'pending' : actual > projected ? 'overbudget' : 'paid';
      }

      const newActuals = existing
        ? prev.rehabActuals.map(a => a.lineItemId === itemId ? updated : a)
        : [...prev.rehabActuals, updated];
      
      return { ...prev, rehabActuals: newActuals };
    });
  }, [rehabLineItems]);

  const updateOverhead = useCallback((index: number, field: 'actual' | 'notes', value: string | number) => {
    setTrackerData(prev => {
      const newOverhead = [...prev.overheadExpenses];
      newOverhead[index] = { ...newOverhead[index], [field]: value };
      return { ...prev, overheadExpenses: newOverhead };
    });
  }, []);

  // Summary calculations
  const summary = useMemo(() => {
    let projectedRehab = 0;
    let actualRehab = 0;
    rehabLineItems.forEach(item => {
      projectedRehab += item.unitCost * item.quantity;
      const actual = getActualForItem(item.id);
      actualRehab += actual.actualCost;
    });

    let projectedOverhead = 0;
    let actualOverhead = 0;
    trackerData.overheadExpenses.forEach(exp => {
      projectedOverhead += exp.projected;
      actualOverhead += exp.actual;
    });

    const projectedTotal = projectedRehab + projectedOverhead;
    const actualTotal = actualRehab + actualOverhead;
    const variance = actualTotal - projectedTotal;
    const variancePercent = projectedTotal > 0 ? (variance / projectedTotal) * 100 : 0;

    const paidCount = trackerData.rehabActuals.filter(a => a.status === 'paid' || a.status === 'overbudget').length;
    const totalItems = rehabLineItems.length;

    return {
      projectedRehab, actualRehab, rehabVariance: actualRehab - projectedRehab,
      projectedOverhead, actualOverhead, overheadVariance: actualOverhead - projectedOverhead,
      projectedTotal, actualTotal, variance, variancePercent,
      paidCount, totalItems, completionPercent: totalItems > 0 ? (paidCount / totalItems) * 100 : 0,
    };
  }, [rehabLineItems, trackerData, getActualForItem]);

  const handleSave = () => {
    saveExpenseTracker(trackerData);
    onClose();
  };

  const handleReset = () => {
    if (confirm('Reset all actual expenses? This cannot be undone.')) {
      const reset: ExpenseTrackerData = { rehabActuals: [], overheadExpenses: [], lastUpdated: '' };
      setTrackerData(reset);
      saveExpenseTracker(reset);
    }
  };

  const varianceColor = (v: number) => v > 0 ? 'text-red-600' : v < 0 ? 'text-green-600' : 'text-gray-600';
  const varianceBg = (v: number) => v > 0 ? 'bg-red-50 border-red-200' : v < 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">📊 Expense Tracker</h2>
            <p className="text-xs text-gray-300 mt-0.5">Track actual costs vs. pro-forma estimates</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Quick Stats */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-blue-600 uppercase">Projected Total</div>
              <div className="text-lg font-bold text-blue-900">{formatCurrency(summary.projectedTotal)}</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-indigo-600 uppercase">Actual Spent</div>
              <div className="text-lg font-bold text-indigo-900">{formatCurrency(summary.actualTotal)}</div>
            </div>
            <div className={`border rounded-lg p-3 text-center ${varianceBg(summary.variance)}`}>
              <div className="text-[10px] font-semibold text-gray-600 uppercase">Variance</div>
              <div className={`text-lg font-bold ${varianceColor(summary.variance)}`}>
                {summary.variance >= 0 ? '+' : ''}{formatCurrency(summary.variance)}
              </div>
              <div className={`text-[10px] ${varianceColor(summary.variance)}`}>
                ({summary.variancePercent >= 0 ? '+' : ''}{summary.variancePercent.toFixed(1)}%)
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <div className="text-[10px] font-semibold text-amber-600 uppercase">Completion</div>
              <div className="text-lg font-bold text-amber-900">{summary.completionPercent.toFixed(0)}%</div>
              <div className="text-[10px] text-amber-600">{summary.paidCount}/{summary.totalItems} items</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex gap-1 border-b border-gray-200">
            {([
              { key: 'rehab' as const, label: '🔨 Rehab Items', count: rehabLineItems.length },
              { key: 'overhead' as const, label: '💰 Overhead Costs', count: trackerData.overheadExpenses.length },
              { key: 'summary' as const, label: '📈 Summary' },
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
                {tab.label} {'count' in tab ? `(${tab.count})` : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* REHAB TAB */}
          {activeTab === 'rehab' && (
            <div className="space-y-3">
              {rehabLineItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  <p className="text-4xl mb-2">📋</p>
                  <p>No rehab line items yet.</p>
                  <p className="text-xs mt-1">Add items in the Rehab Breakdown section first.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[650px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 py-2 text-left font-semibold text-gray-700">Category</th>
                        <th className="px-2 py-2 text-left font-semibold text-gray-700">Description</th>
                        <th className="px-2 py-2 text-right font-semibold text-blue-700">Projected</th>
                        <th className="px-2 py-2 text-right font-semibold text-indigo-700">Actual</th>
                        <th className="px-2 py-2 text-right font-semibold text-gray-700">Variance</th>
                        <th className="px-2 py-2 text-left font-semibold text-gray-700">Vendor</th>
                        <th className="px-2 py-2 text-center font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rehabLineItems.map(item => {
                        const projected = item.unitCost * item.quantity;
                        const actual = getActualForItem(item.id);
                        const variance = actual.actualCost - projected;
                        return (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-2 py-2 text-gray-700 font-medium">{item.category}</td>
                            <td className="px-2 py-2 text-gray-600">{item.description || '—'}</td>
                            <td className="px-2 py-2 text-right text-blue-700 font-medium">{formatCurrency(projected)}</td>
                            <td className="px-2 py-2 text-right">
                              <input
                                type="number"
                                value={actual.actualCost || ''}
                                onChange={(e) => updateRehabActual(item.id, 'actualCost', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="w-20 text-xs border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            </td>
                            <td className={`px-2 py-2 text-right font-medium ${varianceColor(variance)}`}>
                              {actual.actualCost > 0 ? `${variance >= 0 ? '+' : ''}${formatCurrency(variance)}` : '—'}
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="text"
                                value={actual.vendor}
                                onChange={(e) => updateRehabActual(item.id, 'vendor', e.target.value)}
                                placeholder="Vendor name"
                                className="w-24 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                actual.status === 'paid' ? 'bg-green-100 text-green-800' :
                                actual.status === 'overbudget' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {actual.status === 'paid' ? '✅ Paid' :
                                 actual.status === 'overbudget' ? '🔴 Over' :
                                 '⏳ Pending'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                      <tr>
                        <td colSpan={2} className="px-2 py-2 font-bold text-gray-700">Rehab Totals</td>
                        <td className="px-2 py-2 text-right font-bold text-blue-800">{formatCurrency(summary.projectedRehab)}</td>
                        <td className="px-2 py-2 text-right font-bold text-indigo-800">{formatCurrency(summary.actualRehab)}</td>
                        <td className={`px-2 py-2 text-right font-bold ${varianceColor(summary.rehabVariance)}`}>
                          {summary.rehabVariance >= 0 ? '+' : ''}{formatCurrency(summary.rehabVariance)}
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* OVERHEAD TAB */}
          {activeTab === 'overhead' && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[500px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Expense</th>
                      <th className="px-3 py-2 text-right font-semibold text-blue-700">Projected</th>
                      <th className="px-3 py-2 text-right font-semibold text-indigo-700">Actual</th>
                      <th className="px-3 py-2 text-right font-semibold text-gray-700">Variance</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackerData.overheadExpenses.map((exp, i) => {
                      const variance = exp.actual - exp.projected;
                      return (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-800">{exp.label}</td>
                          <td className="px-3 py-2 text-right text-blue-700 font-medium">{formatCurrency(exp.projected)}</td>
                          <td className="px-3 py-2 text-right">
                            <input
                              type="number"
                              value={exp.actual || ''}
                              onChange={(e) => updateOverhead(i, 'actual', parseFloat(e.target.value) || 0)}
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                              className="w-24 text-xs border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                          <td className={`px-3 py-2 text-right font-medium ${varianceColor(variance)}`}>
                            {exp.actual > 0 ? `${variance >= 0 ? '+' : ''}${formatCurrency(variance)}` : '—'}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={exp.notes}
                              onChange={(e) => updateOverhead(i, 'notes', e.target.value)}
                              placeholder="Add notes..."
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                    <tr>
                      <td className="px-3 py-2 font-bold text-gray-700">Overhead Totals</td>
                      <td className="px-3 py-2 text-right font-bold text-blue-800">{formatCurrency(summary.projectedOverhead)}</td>
                      <td className="px-3 py-2 text-right font-bold text-indigo-800">{formatCurrency(summary.actualOverhead)}</td>
                      <td className={`px-3 py-2 text-right font-bold ${varianceColor(summary.overheadVariance)}`}>
                        {summary.overheadVariance >= 0 ? '+' : ''}{formatCurrency(summary.overheadVariance)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* SUMMARY TAB */}
          {activeTab === 'summary' && (
            <div className="space-y-5">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Rehab Completion</span>
                  <span className="font-bold">{summary.completionPercent.toFixed(0)}% ({summary.paidCount}/{summary.totalItems})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(summary.completionPercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-2 text-right font-semibold text-blue-700">Projected</th>
                      <th className="px-4 py-2 text-right font-semibold text-indigo-700">Actual</th>
                      <th className="px-4 py-2 text-right font-semibold text-gray-700">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 font-medium">🔨 Rehab Costs</td>
                      <td className="px-4 py-2 text-right text-blue-700">{formatCurrency(summary.projectedRehab)}</td>
                      <td className="px-4 py-2 text-right text-indigo-700">{formatCurrency(summary.actualRehab)}</td>
                      <td className={`px-4 py-2 text-right font-medium ${varianceColor(summary.rehabVariance)}`}>
                        {summary.rehabVariance >= 0 ? '+' : ''}{formatCurrency(summary.rehabVariance)}
                      </td>
                    </tr>
                    {trackerData.overheadExpenses.map((exp, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="px-4 py-2 text-gray-600 pl-8">{exp.label}</td>
                        <td className="px-4 py-2 text-right text-blue-600">{formatCurrency(exp.projected)}</td>
                        <td className="px-4 py-2 text-right text-indigo-600">{formatCurrency(exp.actual)}</td>
                        <td className={`px-4 py-2 text-right ${varianceColor(exp.actual - exp.projected)}`}>
                          {exp.actual > 0 ? `${(exp.actual - exp.projected) >= 0 ? '+' : ''}${formatCurrency(exp.actual - exp.projected)}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                    <tr>
                      <td className="px-4 py-3 font-bold text-gray-900">GRAND TOTAL</td>
                      <td className="px-4 py-3 text-right font-bold text-blue-900 text-base">{formatCurrency(summary.projectedTotal)}</td>
                      <td className="px-4 py-3 text-right font-bold text-indigo-900 text-base">{formatCurrency(summary.actualTotal)}</td>
                      <td className={`px-4 py-3 text-right font-bold text-base ${varianceColor(summary.variance)}`}>
                        {summary.variance >= 0 ? '+' : ''}{formatCurrency(summary.variance)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Variance Alert */}
              {summary.actualTotal > 0 && (
                <div className={`border rounded-lg p-4 ${varianceBg(summary.variance)}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{summary.variance > 0 ? '⚠️' : summary.variance < 0 ? '🎉' : '✅'}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {summary.variance > 0 ? 'Over Budget' : summary.variance < 0 ? 'Under Budget' : 'On Budget'}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {summary.variance > 0
                          ? `Your actual costs are ${formatCurrency(summary.variance)} (${summary.variancePercent.toFixed(1)}%) over your projected budget. Consider revising your sale price or identifying cost savings.`
                          : summary.variance < 0
                          ? `You're ${formatCurrency(Math.abs(summary.variance))} under budget so far — great job managing costs! Your actual profit may be higher than projected.`
                          : 'Your actual costs are tracking exactly with your projected budget.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition"
          >
            🗑️ Reset All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm"
            >
              💾 Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
