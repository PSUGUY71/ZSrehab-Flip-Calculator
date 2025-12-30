import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface MaxOfferCardProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const MaxOfferCard: React.FC<MaxOfferCardProps> = ({ inputs, results }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 text-sm font-medium">Max Allowable Offer</span>
        <span className="text-xl font-bold text-blue-600">{formatCurrency(results.maxAllowableOffer)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${Math.min(100, (inputs.purchasePrice / results.maxAllowableOffer) * 100)}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Current: {formatCurrency(inputs.purchasePrice)}</span>
        <span>{Math.round((inputs.purchasePrice / results.maxAllowableOffer) * 100)}% of Max</span>
      </div>
    </div>
  );
};
