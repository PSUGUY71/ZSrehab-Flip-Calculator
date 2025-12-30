import React from 'react';
import { CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SensitivityAnalysisProps {
  results: CalculatedResults;
}

export const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 p-2 text-xs font-bold uppercase text-center text-gray-700 border-b border-gray-200">
        ARV Sensitivity Analysis
      </div>
      <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
        <div className="p-2">Scenario</div>
        <div className="p-2">ARV</div>
        <div className="p-2">Net Profit</div>
        <div className="p-2">Diff</div>
        <div className="p-2">Close Profit</div>
      </div>
      {results.profitScenarios.map((s, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-5 text-xs text-center p-2 border-b border-gray-100 last:border-0 ${
            s.label === 'Baseline' ? 'bg-blue-50 font-bold' : ''
          }`}
        >
          <div>{s.label}</div>
          <div>{formatCurrency(s.arv)}</div>
          <div className={s.netProfit > 0 ? 'text-green-700' : 'text-red-600'}>
            {formatCurrency(s.netProfit)}
          </div>
          <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>
            {formatCurrency(s.difference)}
          </div>
          <div>{formatCurrency(s.closingTableProfit)}</div>
        </div>
      ))}
    </div>
  );
};
