import React from 'react';
import { LenderOption, LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface LenderComparisonResult {
  lenderUpfrontFeesAdjusted: number;
  comparisonMonthlyPayment: number;
  totalCostOverHoldDeltaVsBase: number;
  netProfit: number;
}

interface ComparisonDataItem {
  lender: LenderOption;
  results: LenderComparisonResult;
}

interface LenderComparisonProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  lenders: LenderOption[];
  comparisonData: ComparisonDataItem[];
  bestLenderFees: number | null;
  bestMonthlyPayment: number | null;
  originalBaselineLenderName?: string | null;
  onAddLender: () => void;
  onApplyLender: (lender: LenderOption) => void;
  onRestoreBaseline?: () => void;
  onEditLender: (lender: LenderOption) => void;
  onDuplicateLender: (lender: LenderOption) => void;
  onDeleteLender: (id: string) => void;
}

export const LenderComparison: React.FC<LenderComparisonProps> = ({
  inputs,
  results,
  lenders,
  comparisonData,
  bestLenderFees,
  bestMonthlyPayment,
  originalBaselineLenderName,
  onAddLender,
  onApplyLender,
  onRestoreBaseline,
  onEditLender,
  onDuplicateLender,
  onDeleteLender,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden no-print">
      <div className="bg-blue-900 px-6 py-3 flex justify-between items-center text-white">
        <h2 className="text-sm font-bold uppercase tracking-wider">Lender Comparison</h2>
        <div className="flex gap-2">
          <button
            onClick={onAddLender}
            className="bg-blue-600 hover:bg-blue-500 text-xs font-bold px-3 py-1 rounded transition shadow-sm"
          >
            Add New Lender
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Lender Cards List */}
        <div className="grid gap-3">
          {lenders.map((l) => (
            <div
              key={l.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center group transition hover:border-blue-300"
            >
              <div className="flex flex-col">
                <div className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  {l.lenderName}
                  {inputs.lenderName === l.lenderName && (
                    <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-500">
                  {l.interestRate}% Rate • {l.originationPoints} pts
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onApplyLender(l)}
                  className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm hover:bg-green-700 transition"
                >
                  Use Numbers
                </button>
                <button
                  onClick={() => onEditLender(l)}
                  className="text-blue-600 text-[10px] font-bold px-2 py-1 bg-blue-50 rounded hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDuplicateLender(l)}
                  className="text-purple-600 text-[10px] font-bold px-2 py-1 bg-purple-50 rounded hover:bg-purple-100"
                  title="Duplicate this lender"
                >
                  Dup
                </button>
                <button
                  onClick={() => onDeleteLender(l.id)}
                  className="text-red-500 text-[10px] font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100"
                >
                  Del
                </button>
              </div>
            </div>
          ))}
          {lenders.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-xs">
              No comparison lenders added. Use "Snapshot" from active loan section or add new.
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {comparisonData.length > 0 && (
          <div className="mt-4 border border-gray-100 rounded-lg overflow-x-auto">
            <table className="w-full text-[10px] text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase">
                <tr>
                  <th className="px-2 py-2">Quick View</th>
                  <th className={`px-2 py-2 border-l ${
                    !comparisonData.some(c => inputs.lenderName === c.lender.lenderName) 
                      ? 'bg-green-50' 
                      : 'bg-gray-100'
                  }`}>
                    <div className="flex flex-col items-center">
                      <span className="font-bold">{inputs.lenderName || 'BASELINE'}</span>
                      {!comparisonData.some(c => inputs.lenderName === c.lender.lenderName) && (
                        <span className="text-[8px] text-green-600 font-normal">(ACTIVE)</span>
                      )}
                    </div>
                  </th>
                  {comparisonData.map((c) => {
                    const isActive = inputs.lenderName === c.lender.lenderName;
                    return (
                      <th 
                        key={c.lender.id} 
                        className={`px-2 py-2 border-l font-bold ${
                          isActive ? 'bg-green-50' : 'bg-blue-50/30'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{c.lender.lenderName}</span>
                          {isActive && (
                            <span className="text-[8px] text-green-600 font-normal">(ACTIVE)</span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-2 py-1.5 font-medium">Lender Fees</td>
                  <td className={`px-2 py-1.5 border-l ${
                    !comparisonData.some(c => inputs.lenderName === c.lender.lenderName)
                      ? 'bg-green-50/30'
                      : ''
                  }`}>
                    {formatCurrency(results.totalLenderFees)}
                  </td>
                  {comparisonData.map((c) => {
                    const isActive = inputs.lenderName === c.lender.lenderName;
                    return (
                      <td
                        key={c.lender.id}
                        className={`px-2 py-1.5 border-l ${
                          isActive
                            ? 'bg-green-50/30'
                            : c.results.lenderUpfrontFeesAdjusted === bestLenderFees
                            ? 'bg-green-50 font-bold'
                            : ''
                        }`}
                      >
                        {formatCurrency(c.results.lenderUpfrontFeesAdjusted)}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-medium">Monthly Pmt</td>
                  <td className={`px-2 py-1.5 border-l ${
                    !comparisonData.some(c => inputs.lenderName === c.lender.lenderName)
                      ? 'bg-green-50/30'
                      : ''
                  }`}>
                    {formatCurrency(results.monthlyPayment)}
                  </td>
                  {comparisonData.map((c) => {
                    const isActive = inputs.lenderName === c.lender.lenderName;
                    return (
                      <td
                        key={c.lender.id}
                        className={`px-2 py-1.5 border-l ${
                          isActive
                            ? 'bg-green-50/30'
                            : c.results.comparisonMonthlyPayment === bestMonthlyPayment
                            ? 'bg-green-50 font-bold'
                            : ''
                        }`}
                      >
                        {formatCurrency(c.results.comparisonMonthlyPayment)}
                      </td>
                    );
                  })}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1.5 font-bold">Proj. Profit</td>
                  <td className={`px-2 py-1.5 border-l font-bold ${
                    !comparisonData.some(c => inputs.lenderName === c.lender.lenderName)
                      ? 'bg-green-50/30'
                      : ''
                  }`}>
                    {formatCurrency(results.netProfit)}
                  </td>
                  {comparisonData.map((c) => {
                    const isActive = inputs.lenderName === c.lender.lenderName;
                    return (
                      <td 
                        key={c.lender.id} 
                        className={`px-2 py-1.5 border-l font-bold ${
                          isActive ? 'bg-green-50/30' : ''
                        }`}
                      >
                        <span
                          className={
                            c.results.netProfit > results.netProfit
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {formatCurrency(c.results.netProfit)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="bg-gray-100 border-t-2 border-gray-300">
                  <td className="px-2 py-2 font-bold">Switch Lender</td>
                  <td className="px-2 py-2 border-l">
                    {(() => {
                      // Check if baseline is active: 
                      // 1. Current lenderName matches original baseline name, OR
                      // 2. Current lenderName is NOT in comparisonData
                      const isBaselineActive = 
                        (originalBaselineLenderName && inputs.lenderName === originalBaselineLenderName) ||
                        !comparisonData.some(c => inputs.lenderName === c.lender.lenderName);
                      
                      return (
                        <button
                          onClick={() => {
                            if (isBaselineActive) {
                              // Already active, do nothing
                              return;
                            }
                            // Try to restore baseline - always use the restore function
                            if (onRestoreBaseline) {
                              onRestoreBaseline();
                            }
                          }}
                          className={`w-full text-[9px] font-bold px-2 py-1.5 rounded transition ${
                            isBaselineActive
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isBaselineActive ? '✓ Active' : 'Switch →'}
                        </button>
                      );
                    })()}
                  </td>
                  {comparisonData.map((c) => {
                    const isActive = inputs.lenderName === c.lender.lenderName;
                    return (
                      <td 
                        key={c.lender.id} 
                        className="px-2 py-2 border-l"
                      >
                        <button
                          onClick={() => onApplyLender(c.lender)}
                          className={`w-full text-[9px] font-bold px-2 py-1.5 rounded transition ${
                            isActive
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isActive ? '✓ Active' : 'Switch →'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
