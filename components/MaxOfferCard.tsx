import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface MaxOfferCardProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  maxOfferLTVPercent: number;
  onLTVPercentChange: (percent: number) => void;
}

export const MaxOfferCard: React.FC<MaxOfferCardProps> = ({ inputs, results, maxOfferLTVPercent, onLTVPercentChange }) => {
  const ltvOptions = [
    { label: '60%', value: 0.60 },
    { label: '65%', value: 0.65 },
    { label: '70%', value: 0.70 },
    { label: '75%', value: 0.75 },
  ];

  const exceedsMax = inputs.purchasePrice > results.maxAllowableOffer;
  const financingPct = inputs.useCustomFinancing ? inputs.customFinancingPercentage : inputs.financingPercentage;
  
  // Calculate required ARV for each percentage to make current purchase price work
  // Loan = (financingPct% × purchasePrice) + (100% × rehabBudget)
  // Constraint: Loan ≤ LTV% × ARV
  // Required ARV = ((financingPct% × purchasePrice) + rehabBudget) / LTV%
  const calculateRequiredARV = (ltvPercent: number) => {
    if (inputs.purchasePrice <= 0 || ltvPercent <= 0) return 0;
    const loanAmount = (inputs.purchasePrice * (financingPct / 100)) + (inputs.rehabBudget || 0);
    return loanAmount / ltvPercent;
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm border-2 ${exceedsMax ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-200'}`}>
      <div className="mb-3">
        <span className="text-gray-500 text-sm font-medium block mb-2">Max Allowable Offer</span>
        <div className="flex gap-2">
          {ltvOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onLTVPercentChange(option.value)}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
                maxOfferLTVPercent === option.value
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`text-xl font-bold mb-2 ${exceedsMax ? 'text-amber-600' : 'text-amber-600'}`}>
        {formatCurrency(results.maxAllowableOffer)}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${exceedsMax ? 'bg-amber-500' : 'bg-amber-600'}`}
          style={{
            width: `${Math.min(100, results.maxAllowableOffer > 0 ? (inputs.purchasePrice / results.maxAllowableOffer) * 100 : 0)}%`,
          }}
        ></div>
      </div>
      <div className={`flex justify-between text-xs mt-1 ${exceedsMax ? 'text-amber-600 font-semibold' : 'text-gray-500'}`}>
        <span>Current: {formatCurrency(inputs.purchasePrice)}</span>
        <span>{results.maxAllowableOffer > 0 ? Math.round((inputs.purchasePrice / results.maxAllowableOffer) * 100) : 0}% of Max</span>
      </div>
      {exceedsMax && (
        <div className="mt-2 bg-amber-100 border border-amber-300 rounded p-2 space-y-2">
          <div className="text-xs text-amber-700 font-semibold text-center">
            ⚠️ Exceeds Max Offer
          </div>
          <div className="text-[10px] text-amber-600 font-medium">Required ARV Range:</div>
          <div className="grid grid-cols-2 gap-1.5">
            {ltvOptions.map((option) => {
              const requiredARV = calculateRequiredARV(option.value);
              const currentARV = inputs.arv || 0;
              const difference = requiredARV - currentARV;
              return (
                <div key={option.value} className="bg-white border border-amber-200 rounded p-1.5">
                  <div className="text-[9px] text-amber-600 font-semibold">{option.label} ARV:</div>
                  <div className="text-[10px] text-amber-700 font-bold">{formatCurrency(requiredARV)}</div>
                  {currentARV > 0 && (
                    <div className={`text-[9px] ${difference > 0 ? 'text-amber-500' : difference < 0 ? 'text-amber-600' : 'text-gray-500'}`}>
                      {difference > 0 ? `+${formatCurrency(difference)}` : difference < 0 ? `${formatCurrency(difference)}` : '✓'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {inputs.arv > 0 && (
            <div className="text-[9px] text-amber-600 text-center mt-1">
              Current: {formatCurrency(inputs.arv)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
