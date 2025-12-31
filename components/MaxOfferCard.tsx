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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-3">
        <span className="text-gray-500 text-sm font-medium block mb-2">Max Allowable Offer</span>
        <div className="flex gap-2">
          {ltvOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onLTVPercentChange(option.value)}
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
                maxOfferLTVPercent === option.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xl font-bold text-blue-600 mb-2">{formatCurrency(results.maxAllowableOffer)}</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${Math.min(100, results.maxAllowableOffer > 0 ? (inputs.purchasePrice / results.maxAllowableOffer) * 100 : 0)}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Current: {formatCurrency(inputs.purchasePrice)}</span>
        <span>{results.maxAllowableOffer > 0 ? Math.round((inputs.purchasePrice / results.maxAllowableOffer) * 100) : 0}% of Max</span>
      </div>
    </div>
  );
};
