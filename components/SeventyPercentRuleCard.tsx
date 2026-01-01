import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { HelpTooltip } from './HelpTooltip';

interface SeventyPercentRuleCardProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const SeventyPercentRuleCard: React.FC<SeventyPercentRuleCardProps> = ({ inputs, results }) => {
  const difference = inputs.purchasePrice - results.maxPurchasePrice70Rule;
  const isOver = difference > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gray-900 px-6 py-3 flex justify-between items-center text-white rounded-t-xl">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase">70% Rule Analysis</h2>
          <HelpTooltip
            title="70% Rule"
            description="A quick rule of thumb used by house flippers to estimate the maximum purchase price for a profitable deal. If your purchase price exceeds this, the deal may be less profitable."
            formula="70% Rule Max = (ARV × 70%) - Rehab Budget"
            examples={[
              "ARV: $200,000, Rehab: $30,000 → 70% Rule Max = $110,000",
              "If you pay $120,000, you're $10,000 over the rule",
              "This is a guideline, not a hard limit - use it as a starting point"
            ]}
          />
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
          results.passes70Rule 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {results.passes70Rule ? '✓ Pass' : '✗ Fail'}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">70% Rule Max Purchase Price</span>
          <span className={`text-lg font-bold ${results.passes70Rule ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(results.maxPurchasePrice70Rule)}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>Your Purchase Price</span>
          <span className="font-medium">{formatCurrency(inputs.purchasePrice)}</span>
        </div>
        {!results.passes70Rule && (
          <div className="bg-red-50 border border-red-200 rounded p-2">
            <div className="text-xs text-red-700 font-semibold">
              ⚠️ You are {formatCurrency(Math.abs(difference))} over the 70% Rule
            </div>
            <div className="text-[10px] text-red-600 mt-1">
              This may impact profitability. Review your numbers carefully.
            </div>
          </div>
        )}
        {results.passes70Rule && (
          <div className="bg-green-50 border border-green-200 rounded p-2">
            <div className="text-xs text-green-700 font-semibold">
              ✓ Purchase price is within the 70% Rule guideline
            </div>
          </div>
        )}
        <div className="text-[10px] text-gray-500 pt-2 border-t border-gray-200">
          Formula: (ARV × 70%) - Rehab Budget
        </div>
      </div>
    </div>
  );
};

