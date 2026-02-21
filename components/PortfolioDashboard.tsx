import React, { useMemo, useState } from 'react';
import { SavedDeal, CalculatedResults } from '../types';
import { calculateLoan, formatCurrency, formatPercent } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

interface DealSummary {
  deal: SavedDeal;
  results: CalculatedResults;
  address: string;
  purchasePrice: number;
  rehabBudget: number;
  arv: number;
  totalCost: number;
  netProfit: number;
  roi: number;
  cashOnCash: number;
  irr: number | null;
  equity: number;
  holdingMonths: number;
  state: string;
  totalCashInvested: number;
}

type SortField = 'name' | 'purchasePrice' | 'rehabBudget' | 'arv' | 'netProfit' | 'roi' | 'totalCost' | 'equity';
type SortDirection = 'asc' | 'desc';

// ─── Props ───────────────────────────────────────────────────────────

interface PortfolioDashboardProps {
  savedDeals: SavedDeal[];
  onClose: () => void;
  onLoadDeal: (deal: SavedDeal) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const KPICard: React.FC<{
  label: string;
  value: string;
  sublabel?: string;
  icon: string;
  color?: string;
}> = ({ label, value, sublabel, icon, color = 'text-gray-900' }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] font-bold text-gray-500 uppercase">{label}</span>
    </div>
    <div className={`text-xl font-black ${color}`}>{value}</div>
    {sublabel && <div className="text-[10px] text-gray-400 mt-0.5">{sublabel}</div>}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({
  savedDeals,
  onClose,
  onLoadDeal,
}) => {
  const [sortField, setSortField] = useState<SortField>('netProfit');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  // Calculate results for each deal
  const dealSummaries: DealSummary[] = useMemo(() => {
    return savedDeals.map((deal) => {
      const data = deal.data;
      let results: CalculatedResults;
      try {
        results = calculateLoan(data);
      } catch {
        // If calculation fails, return a default
        results = calculateLoan({ ...data, purchasePrice: data.purchasePrice || 0 });
      }

      const totalCost = data.purchasePrice + data.rehabBudget;
      const equity = data.arv - totalCost;

      return {
        deal,
        results,
        address: data.address || deal.name || 'Unnamed Deal',
        purchasePrice: data.purchasePrice,
        rehabBudget: data.rehabBudget,
        arv: data.arv,
        totalCost,
        netProfit: results.netProfit,
        roi: results.roi,
        cashOnCash: results.totalCashInvested > 0 ? (results.netProfit / results.totalCashInvested) * 100 : 0,
        irr: results.irr,
        equity,
        holdingMonths: data.holdingPeriodMonths,
        state: data.state,
        totalCashInvested: results.totalCashInvested,
      };
    });
  }, [savedDeals]);

  // Sort deals
  const sortedDeals = useMemo(() => {
    return [...dealSummaries].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sortField) {
        case 'name': aVal = a.address.toLowerCase(); bVal = b.address.toLowerCase(); break;
        case 'purchasePrice': aVal = a.purchasePrice; bVal = b.purchasePrice; break;
        case 'rehabBudget': aVal = a.rehabBudget; bVal = b.rehabBudget; break;
        case 'arv': aVal = a.arv; bVal = b.arv; break;
        case 'netProfit': aVal = a.netProfit; bVal = b.netProfit; break;
        case 'roi': aVal = a.roi; bVal = b.roi; break;
        case 'totalCost': aVal = a.totalCost; bVal = b.totalCost; break;
        case 'equity': aVal = a.equity; bVal = b.equity; break;
        default: aVal = a.netProfit; bVal = b.netProfit;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [dealSummaries, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  // Portfolio-level KPIs
  const kpis = useMemo(() => {
    if (dealSummaries.length === 0) return null;

    const totalInvested = dealSummaries.reduce((s, d) => s + d.totalCost, 0);
    const totalProfit = dealSummaries.reduce((s, d) => s + d.netProfit, 0);
    const totalARV = dealSummaries.reduce((s, d) => s + d.arv, 0);
    const totalEquity = dealSummaries.reduce((s, d) => s + d.equity, 0);
    const avgROI = dealSummaries.reduce((s, d) => s + d.roi, 0) / dealSummaries.length;
    const profitableDeals = dealSummaries.filter(d => d.netProfit > 0).length;
    const bestDeal = [...dealSummaries].sort((a, b) => b.netProfit - a.netProfit)[0];

    return {
      totalInvested,
      totalProfit,
      totalARV,
      totalEquity,
      avgROI,
      profitableDeals,
      totalDeals: dealSummaries.length,
      bestDeal,
    };
  }, [dealSummaries]);

  if (savedDeals.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Deals Yet</h2>
          <p className="text-sm text-gray-500 mb-6">Save some deals first to see your portfolio analysis.</p>
          <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-50 rounded-xl shadow-2xl max-w-6xl w-full max-h-[94vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold">📊 Portfolio Dashboard</h2>
            <p className="text-xs text-gray-300 mt-0.5">{savedDeals.length} deal{savedDeals.length !== 1 ? 's' : ''} analyzed</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          {kpis && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <KPICard icon="💰" label="Total Profit" value={formatCurrency(kpis.totalProfit)} sublabel={`Across ${kpis.totalDeals} deals`} color={kpis.totalProfit >= 0 ? 'text-green-700' : 'text-red-600'} />
              <KPICard icon="📈" label="Avg ROI" value={`${kpis.avgROI.toFixed(1)}%`} sublabel="Per deal average" color={kpis.avgROI >= 15 ? 'text-green-700' : kpis.avgROI >= 0 ? 'text-amber-600' : 'text-red-600'} />
              <KPICard icon="🏠" label="Total Invested" value={formatCurrency(kpis.totalInvested)} sublabel="Purchase + Rehab" />
              <KPICard icon="📊" label="Total ARV" value={formatCurrency(kpis.totalARV)} sublabel="Combined portfolio" />
              <KPICard icon="✅" label="Profitable" value={`${kpis.profitableDeals}/${kpis.totalDeals}`} sublabel="Deals with profit > $0" color={kpis.profitableDeals === kpis.totalDeals ? 'text-green-700' : 'text-amber-600'} />
              <KPICard icon="🏆" label="Best Deal" value={formatCurrency(kpis.bestDeal.netProfit)} sublabel={kpis.bestDeal.address.substring(0, 25)} color="text-green-700" />
            </div>
          )}

          {/* Best Deal Highlight */}
          {kpis && kpis.bestDeal && (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-green-700 uppercase">🏆 Highest Profit Deal</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{kpis.bestDeal.address}</div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {formatCurrency(kpis.bestDeal.purchasePrice)} purchase • {formatCurrency(kpis.bestDeal.rehabBudget)} rehab • {formatCurrency(kpis.bestDeal.arv)} ARV
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-green-700">{formatCurrency(kpis.bestDeal.netProfit)}</div>
                <div className="text-xs text-green-600">{kpis.bestDeal.roi.toFixed(1)}% ROI</div>
                <button
                  onClick={() => { onLoadDeal(kpis.bestDeal.deal); onClose(); }}
                  className="mt-1 text-[10px] font-semibold text-green-700 hover:text-green-900 underline"
                >
                  Open Deal →
                </button>
              </div>
            </div>
          )}

          {/* Sortable Deals Table */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">All Deals</h3>
            <div className="border border-gray-200 rounded-lg overflow-x-auto bg-white">
              <table className="w-full text-xs">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-3 py-2.5 text-left font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('name')}
                    >
                      Deal {sortIcon('name')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('purchasePrice')}
                    >
                      Purchase {sortIcon('purchasePrice')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('rehabBudget')}
                    >
                      Rehab {sortIcon('rehabBudget')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('totalCost')}
                    >
                      Total Cost {sortIcon('totalCost')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('arv')}
                    >
                      ARV {sortIcon('arv')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('equity')}
                    >
                      Equity {sortIcon('equity')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('netProfit')}
                    >
                      Net Profit {sortIcon('netProfit')}
                    </th>
                    <th
                      className="px-3 py-2.5 text-right font-bold text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                      onClick={() => handleSort('roi')}
                    >
                      ROI {sortIcon('roi')}
                    </th>
                    <th className="px-3 py-2.5 text-center font-bold text-gray-700 w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDeals.map((ds, idx) => {
                    const isBest = kpis?.bestDeal.deal.id === ds.deal.id;
                    return (
                      <tr
                        key={ds.deal.id}
                        className={`border-t border-gray-100 hover:bg-gray-50 ${isBest ? 'bg-green-50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            {isBest && <span className="text-xs" title="Best deal">🏆</span>}
                            <div>
                              <div className="font-medium text-gray-900 truncate max-w-[200px]">{ds.address}</div>
                              <div className="text-[9px] text-gray-400">{ds.state} • {ds.holdingMonths}mo hold</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(ds.purchasePrice)}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(ds.rehabBudget)}</td>
                        <td className="px-3 py-2 text-right font-medium text-gray-800">{formatCurrency(ds.totalCost)}</td>
                        <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(ds.arv)}</td>
                        <td className={`px-3 py-2 text-right font-medium ${ds.equity >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {formatCurrency(ds.equity)}
                        </td>
                        <td className={`px-3 py-2 text-right font-bold ${ds.netProfit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {formatCurrency(ds.netProfit)}
                        </td>
                        <td className={`px-3 py-2 text-right font-semibold ${ds.roi >= 15 ? 'text-green-700' : ds.roi >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                          {ds.roi.toFixed(1)}%
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => { onLoadDeal(ds.deal); onClose(); }}
                            className="text-[10px] font-semibold text-amber-700 hover:text-amber-900 underline"
                          >
                            Open
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                  <tr>
                    <td className="px-3 py-2 font-bold text-gray-700">TOTALS ({sortedDeals.length})</td>
                    <td className="px-3 py-2 text-right font-bold text-gray-800">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.purchasePrice, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-800">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.rehabBudget, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-800">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.totalCost, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-800">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.arv, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-green-700">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.equity, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-black text-green-700">
                      {formatCurrency(sortedDeals.reduce((s, d) => s + d.netProfit, 0))}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-gray-800">
                      {(sortedDeals.reduce((s, d) => s + d.roi, 0) / sortedDeals.length).toFixed(1)}%
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Profit Distribution Mini Chart (text-based) */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Profit Distribution</h3>
            <div className="space-y-2">
              {sortedDeals.map((ds) => {
                const maxProfit = Math.max(...sortedDeals.map(d => Math.abs(d.netProfit)), 1);
                const barWidth = Math.max((Math.abs(ds.netProfit) / maxProfit) * 100, 2);
                const isPositive = ds.netProfit >= 0;

                return (
                  <div key={ds.deal.id} className="flex items-center gap-3">
                    <div className="text-[10px] text-gray-600 w-40 truncate font-medium">{ds.address}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isPositive ? 'bg-green-500' : 'bg-red-400'}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <div className={`text-[10px] font-bold w-20 text-right ${isPositive ? 'text-green-700' : 'text-red-600'}`}>
                      {formatCurrency(ds.netProfit)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between items-center">
          <p className="text-[10px] text-gray-400">
            Results recalculated from saved deal data. Click any deal to open it in the editor.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
