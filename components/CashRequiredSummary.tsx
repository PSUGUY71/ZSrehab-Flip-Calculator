import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CashRequiredSummaryProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const CashRequiredSummary: React.FC<CashRequiredSummaryProps> = ({ inputs, results }) => {
  // Use results for accurate totals (includes points)
  const totalLenderFees = results.totalLenderFees || 0;
  
  // Calculate holding costs for the holding period
  const holdingCosts = results.totalHoldingCosts || 0;

  // Calculate due at closing (cash to close)
  const dueAtClosing = results.totalCashToClose || 0;

  // FIX: Use the same requiredLiquidity calculation as the report
  // This matches the lender requirement formula: Max(ClosingCosts + Gap + PerDiem + 25% Rehab, ClosingCosts + Gap + PerDiem + $15k)
  // The requiredLiquidity is already calculated in utils/calculations.ts and includes:
  // - Total closing costs (lender + third party)
  // - Gap amount (down payment)
  // - Per diem interest (prepaids)
  // - Minus commission credit (reduces cash needed)
  // - Plus buffer: Max(25% of rehab, $15,000)
  const totalLiquidityNeeded = results.requiredLiquidity || 0;

  // Determine color coding
  const isUnrealistic = inputs.interestRate === 0 || (holdingCosts === 0 && (inputs.holdingPeriodMonths || 0) > 3);
  const hasInsufficientLiquidity = inputs.liquidity > 0 && inputs.liquidity < totalLiquidityNeeded;
  
  let boxColor = 'border-gray-300 bg-white';
  let titleColor = 'text-gray-900';
  
  if (hasInsufficientLiquidity) {
    boxColor = 'border-red-400 bg-red-50';
    titleColor = 'text-red-900';
  } else if (isUnrealistic) {
    boxColor = 'border-yellow-400 bg-yellow-50';
    titleColor = 'text-yellow-900';
  } else if (totalLiquidityNeeded > 0) {
    boxColor = 'border-green-400 bg-green-50';
    titleColor = 'text-green-900';
  }

  return (
    <div className={`rounded-xl shadow-lg border-2 ${boxColor}`}>
      <div className={`px-4 py-3 border-b-2 ${boxColor.replace('bg-', 'border-').replace('-50', '-200')}`}>
        <h2 className={`text-lg font-bold uppercase ${titleColor}`}>Cash You'll Need</h2>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Down Payment (Gap):</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(results.gapAmount || 0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Closing Costs:</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(results.totalClosingCosts || 0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Lender Fees:</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(totalLenderFees)}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Due at Closing:</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(dueAtClosing)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              Holding Costs ({inputs.holdingPeriodMonths || 0} mo):
            </span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(holdingCosts)}</span>
          </div>
          <div className="border-t-2 border-gray-300 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900">TOTAL LIQUIDITY NEEDED:</span>
                <span className="text-[10px] text-gray-500 mt-0.5">
                  (Lender requirement: Max(Closing + Gap + 25% Rehab, Closing + Gap + $15k))
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(totalLiquidityNeeded)}</span>
            </div>
          </div>
        </div>

        {isUnrealistic && (
          <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
            ⚠️ If interest or holding costs show $0, update your rate and utilities above.
          </div>
        )}

        {hasInsufficientLiquidity && (
          <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
            ⚠️ Your liquidity ({formatCurrency(inputs.liquidity)}) is below required ({formatCurrency(totalLiquidityNeeded)}). Consider more cash reserves.
          </div>
        )}
      </div>
    </div>
  );
};

