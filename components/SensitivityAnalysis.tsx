import React from 'react';
import { CalculatedResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface SensitivityAnalysisProps {
  results: CalculatedResults;
}

export const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {/* Purchase Price Sensitivity */}
      {results.purchaseSensitivityScenarios && results.purchaseSensitivityScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 overflow-hidden">
          <div className="bg-amber-100 p-2 text-xs font-bold uppercase text-center text-amber-900 border-b-2 border-amber-300">
            ⚠️ Purchase Price Sensitivity (MOST CRITICAL)
          </div>
          <div className="bg-amber-50 p-2 text-[10px] text-amber-800 text-center border-b border-amber-200">
            Overpaying by 10% = $15K loss. Purchase mistakes are MORE CRITICAL than ARV misses.
          </div>
          <div className="overflow-x-auto">
          <div className="min-w-[420px]">
          <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
            <div className="p-2">Scenario</div>
            <div className="p-2">Purchase Price</div>
            <div className="p-2">Net Profit</div>
            <div className="p-2">Profit Change</div>
            <div className="p-2">Margin</div>
          </div>
          {results.purchaseSensitivityScenarios.map((s, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-5 text-xs text-center p-2 border-b border-gray-100 last:border-0 ${
                s.percentChange === 0 
                  ? 'bg-amber-50 font-bold' 
                  : s.isBelowThreshold 
                    ? 'bg-amber-100 border-l-4 border-amber-500' 
                    : ''
              }`}
            >
              <div className={s.isBelowThreshold ? 'font-bold text-amber-900' : ''}>{s.label}</div>
              <div>{formatCurrency(s.purchasePrice)}</div>
              <div className={s.profit > 0 ? 'text-amber-700 font-semibold' : 'text-amber-600 font-semibold'}>
                {formatCurrency(s.profit)}
              </div>
              <div className={s.profitChange >= 0 ? 'text-amber-600' : 'text-amber-500 font-semibold'}>
                {s.profitChange >= 0 ? '+' : ''}{formatCurrency(s.profitChange)}
              </div>
              <div className={s.isBelowThreshold ? 'text-amber-700 font-bold' : s.margin >= 15 ? 'text-amber-700' : 'text-amber-600'}>
                {formatPercent(s.margin)}
                {s.isBelowThreshold && <span className="text-[9px] block text-amber-600">⚠️ Below 15%</span>}
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
      )}

      {/* Rehab Cost Sensitivity */}
      {results.rehabSensitivityScenarios && results.rehabSensitivityScenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 overflow-hidden">
          <div className="bg-amber-100 p-2 text-xs font-bold uppercase text-center text-amber-900 border-b-2 border-amber-300">
            Rehab Cost Sensitivity
          </div>
          <div className="bg-amber-50 p-2 text-[10px] text-amber-800 text-center border-b border-amber-200">
            Rehab overrun 20% = $8K loss (manageable with contingency)
          </div>
          <div className="overflow-x-auto">
          <div className="min-w-[420px]">
          <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
            <div className="p-2">Scenario</div>
            <div className="p-2">Rehab Cost</div>
            <div className="p-2">Net Profit</div>
            <div className="p-2">Profit Change</div>
            <div className="p-2">Margin</div>
          </div>
          {results.rehabSensitivityScenarios.map((s, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-5 text-xs text-center p-2 border-b border-gray-100 last:border-0 ${
                s.percentChange === 0 
                  ? 'bg-amber-50 font-bold' 
                  : s.isBelowThreshold 
                    ? 'bg-amber-100 border-l-4 border-amber-500' 
                    : ''
              }`}
            >
              <div className={s.isBelowThreshold ? 'font-bold text-amber-900' : ''}>{s.label}</div>
              <div>{formatCurrency(s.rehabCost)}</div>
              <div className={s.profit > 0 ? 'text-amber-700 font-semibold' : 'text-amber-600 font-semibold'}>
                {formatCurrency(s.profit)}
              </div>
              <div className={s.profitChange >= 0 ? 'text-amber-600' : 'text-amber-500 font-semibold'}>
                {s.profitChange >= 0 ? '+' : ''}{formatCurrency(s.profitChange)}
              </div>
              <div className={s.isBelowThreshold ? 'text-amber-700 font-bold' : s.margin >= 15 ? 'text-amber-700' : 'text-amber-600'}>
                {formatPercent(s.margin)}
                {s.isBelowThreshold && <span className="text-[9px] block text-amber-600">⚠️ Below 15%</span>}
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
      )}

      {/* ARV Sensitivity (Existing) */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden">
        <div className="bg-gray-100 p-2 text-xs font-bold uppercase text-center text-gray-900 border-b border-gray-200">
          ARV Sensitivity Analysis
        </div>
        <div className="overflow-x-auto">
        <div className="min-w-[420px]">
        <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
          <div className="p-2">Scenario</div>
          <div className="p-2">ARV</div>
          <div className="p-2">Closing Table Profit</div>
          <div className="p-2">Diff</div>
          <div className="p-2">Net Profit</div>
        </div>
        {results.profitScenarios.map((s, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-5 text-xs text-center p-2 border-b border-gray-100 last:border-0 ${
              s.label === 'Baseline' ? 'bg-gray-50 font-bold' : ''
            }`}
          >
            <div>{s.label}</div>
            <div>{formatCurrency(s.arv)}</div>
            <div className={s.closingTableProfit > 0 ? 'text-amber-700' : 'text-amber-600'}>
              {formatCurrency(s.closingTableProfit)}
            </div>
            <div className={s.difference >= 0 ? 'text-amber-600' : 'text-amber-500'}>
              {formatCurrency(s.difference)}
            </div>
            <div>{formatCurrency(s.netProfit)}</div>
          </div>
        ))}
        </div>
        </div>
      </div>
    </div>
  );
};
