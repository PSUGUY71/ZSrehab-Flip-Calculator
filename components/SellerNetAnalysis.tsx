import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SellerNetAnalysisProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const SellerNetAnalysis: React.FC<SellerNetAnalysisProps> = ({ inputs, results }) => {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded p-4 shadow-sm">
      <div className="flex justify-between items-center border-b border-amber-200 pb-2 mb-2">
        <div className="text-amber-900 font-bold uppercase text-xs">Seller's Estimated Net Proceeds</div>
        <div className="text-amber-900 font-bold text-xl">{formatCurrency(results.sellerNetProceeds)}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs text-amber-800">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="opacity-70">Sale Price</span>
            <span className="font-bold">{formatCurrency(inputs.purchasePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Mortgage Balance</span>
            <span className="font-bold">-{formatCurrency(inputs.sellerMortgageBalance)}</span>
          </div>
          {inputs.sellerLineOfCreditBalance > 0 && (
            <div className="flex justify-between">
              <span className="opacity-70">Line of Credit</span>
              <span className="font-bold">-{formatCurrency(inputs.sellerLineOfCreditBalance)}</span>
            </div>
          )}
          <div className="flex justify-between text-[10px] pt-2 border-t border-amber-200">
            <span className="opacity-70">Original Purchase</span>
            <span className="font-medium text-gray-500">
              {formatCurrency(inputs.sellerOriginalPurchasePrice)}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="opacity-70">Commission</span>
            <span className="font-bold text-amber-600">-{formatCurrency(results.sellerCommissionCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Transfer Tax</span>
            <span className="font-bold text-amber-600">-{formatCurrency(results.sellerTransferTaxCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Concessions</span>
            <span className="font-bold text-amber-600">-{formatCurrency(results.sellerConcessionAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Misc Fees</span>
            <span className="font-bold text-amber-600">-{formatCurrency(inputs.sellerMiscFees)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
