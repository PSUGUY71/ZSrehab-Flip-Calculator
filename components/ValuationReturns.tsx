import React from 'react';
import { CalculatedResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface ValuationReturnsProps {
  results: CalculatedResults;
}

export const ValuationReturns: React.FC<ValuationReturnsProps> = ({ results }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Valuation & Returns</h3>
      <div className="grid grid-cols-2 gap-3 mb-3 border-b border-gray-100 pb-3">
        {/* SqFt Metrics */}
        <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Buy / SqFt</div>
          <div className="text-sm font-bold text-gray-900 mt-1">
            {formatCurrency(results.purchasePricePerSqFt)}
          </div>
        </div>
        <div className="bg-blue-50 rounded p-2 text-center border border-blue-100">
          <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Sell / SqFt</div>
          <div className="text-sm font-bold text-blue-700 mt-1">
            {formatCurrency(results.arvPerSqFt)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Cash on Cash (Existing) */}
        <div className="bg-green-50 rounded p-2 text-center border border-green-100">
          <div className="text-[10px] text-green-600 font-bold uppercase tracking-wide">Cash ROI</div>
          <div className="text-sm font-bold text-green-700 mt-1">{formatPercent(results.roi)}</div>
          <div className="text-[9px] text-green-500 mt-0.5">Cash on Cash</div>
        </div>

        {/* Project ROI (Total Cost) */}
        <div className="bg-purple-50 rounded p-2 text-center border border-purple-100">
          <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wide">Proj. ROI</div>
          <div className="text-sm font-bold text-purple-700 mt-1">{formatPercent(results.projectRoi)}</div>
          <div className="text-[9px] text-purple-500 mt-0.5">Return on Cost</div>
        </div>

        {/* Net Margin (Sales Price) */}
        <div className="bg-indigo-50 rounded p-2 text-center border border-indigo-100">
          <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">Margin</div>
          <div className="text-sm font-bold text-indigo-700 mt-1">{formatPercent(results.netMargin)}</div>
          <div className="text-[9px] text-indigo-500 mt-0.5">Return on Sales</div>
        </div>
      </div>
    </div>
  );
};
