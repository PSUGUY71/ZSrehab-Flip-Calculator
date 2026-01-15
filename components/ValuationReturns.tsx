import React from 'react';
import { CalculatedResults, LoanInputs } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { formatIRR } from '../utils/irrCalculation';
import { HelpTooltip } from './HelpTooltip';

interface ValuationReturnsProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const ValuationReturns: React.FC<ValuationReturnsProps> = ({ inputs, results }) => {
  // Calculate per-sqft difference for ARV validation
  const sqftDifference = results.arvPerSqFt - results.purchasePricePerSqFt;
  const showARVWarning = inputs.sqFt > 0 && (sqftDifference > 200 || sqftDifference < 20);
  
  // Calculate annualized ROI (assuming 6-month hold as default, but use actual holding period)
  const holdingMonths = inputs.holdingPeriodMonths || 6;
  const annualizedCashROI = holdingMonths > 0 ? (results.roi / holdingMonths) * 12 : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Valuation & Returns</h3>
      <div className="grid grid-cols-2 gap-3 mb-3 border-b border-gray-100 pb-3">
        {/* SqFt Metrics with ARV Validation */}
        <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Buy / SqFt</div>
          <div className="text-sm font-bold text-gray-900 mt-1">
            {formatCurrency(results.purchasePricePerSqFt)}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5">Purchase Price ÷ SqFt</div>
        </div>
        <div className="bg-blue-50 rounded p-2 text-center border border-blue-100">
          <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Sell / SqFt</div>
          <div className="text-sm font-bold text-blue-700 mt-1">
            {formatCurrency(results.arvPerSqFt)}
          </div>
          <div className="text-[9px] text-blue-400 mt-0.5">ARV ÷ SqFt</div>
          {inputs.sqFt > 0 && (
            <div className={`text-[9px] mt-1 font-semibold ${
              sqftDifference > 0 && sqftDifference <= 200 && sqftDifference >= 20 
                ? 'text-green-600' 
                : showARVWarning 
                  ? 'text-red-600' 
                  : 'text-gray-500'
            }`}>
              {sqftDifference > 0 ? '+' : ''}{formatCurrency(sqftDifference)}/sqft
            </div>
          )}
        </div>
      </div>

      {/* ARV Validation Warning */}
      {showARVWarning && inputs.sqFt > 0 && (
        <div className={`mb-3 p-2 rounded border-2 ${
          sqftDifference > 200 
            ? 'bg-red-50 border-red-300 text-red-800' 
            : 'bg-yellow-50 border-yellow-300 text-yellow-800'
        }`}>
          <div className="text-xs font-bold mb-1">
            ⚠️ ARV Validation Warning
          </div>
          <div className="text-[10px]">
            {sqftDifference > 200 
              ? `You're buying at ${formatCurrency(results.purchasePricePerSqFt)}/sqft and selling at ${formatCurrency(results.arvPerSqFt)}/sqft (+${formatCurrency(sqftDifference)}/sqft). This ${formatCurrency(sqftDifference)}/sqft increase seems unusually high - please verify your ARV comps.`
              : `You're buying at ${formatCurrency(results.purchasePricePerSqFt)}/sqft and selling at ${formatCurrency(results.arvPerSqFt)}/sqft (${formatCurrency(sqftDifference)}/sqft). This small difference may indicate an error in your ARV estimate.`
            }
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {/* IRR - MOST IMPORTANT METRIC FOR INVESTORS */}
        <div className="bg-red-50 rounded p-2 text-center border-2 border-red-300">
          <div className="text-[10px] text-red-700 font-bold uppercase tracking-wide">
            Internal Rate of Return
          </div>
          <div className="text-lg font-bold text-red-700 mt-1">
            {results.irr !== null && results.irr !== undefined 
              ? formatIRR(results.irr)
              : 'N/A'
            }
          </div>
          <div className="text-[9px] text-red-600 mt-0.5">Annualized Return</div>
          <div className="text-[9px] text-red-500 mt-1 italic">
            {results.irr !== null 
              ? 'Lender/Partner standard metric' 
              : 'Check inputs'}
          </div>
        </div>

        {/* Cash on Cash Return */}
        <div className="bg-green-50 rounded p-2 text-center border border-green-100">
          <div className="text-[10px] text-green-600 font-bold uppercase tracking-wide">
            Cash-on-Cash Return ({holdingMonths}-month project)
          </div>
          <div className="text-sm font-bold text-green-700 mt-1">{formatPercent(results.roi)}</div>
          <div className="text-[9px] text-green-500 mt-0.5">(Net Profit ÷ Cash) × 100</div>
          <div className="text-[9px] text-green-400 mt-0.5 italic">
            This is project-level return, not annualized
          </div>
          {holdingMonths > 0 && (
            <div className="text-[9px] text-green-600 mt-1 font-semibold">
              Annualized: ~{formatPercent(annualizedCashROI)}
            </div>
          )}
        </div>

        {/* Return on Total Cost */}
        <div className="bg-purple-50 rounded p-2 text-center border border-purple-100">
          <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wide">Return on Total Cost</div>
          <div className="text-sm font-bold text-purple-700 mt-1">{formatPercent(results.projectRoi)}</div>
          <div className="text-[9px] text-purple-500 mt-0.5">(Net Profit ÷ Total Cost) × 100</div>
          <div className="text-[9px] text-purple-400 mt-0.5 italic">
            This is project-level return, not annualized
          </div>
        </div>

        {/* Net Margin (Sales Price) */}
        <div className="bg-indigo-50 rounded p-2 text-center border border-indigo-100">
          <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">Margin</div>
          <div className="text-sm font-bold text-indigo-700 mt-1">{formatPercent(results.netMargin)}</div>
          <div className="text-[9px] text-indigo-500 mt-0.5">Return on Sales</div>
          <div className="text-[9px] text-indigo-400 mt-0.5">(Net Profit ÷ ARV) × 100</div>
        </div>
      </div>
    </div>
  );
};
