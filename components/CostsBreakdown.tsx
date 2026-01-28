import React from 'react';
import { CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { HelpTooltip } from './HelpTooltip';

interface CostsBreakdownProps {
  results: CalculatedResults;
}

export const CostsBreakdown: React.FC<CostsBreakdownProps> = ({ results }) => {
  // ACQUISITION COSTS (buying side - paid at closing)
  const acquisitionCosts = {
    lenderFees: results.totalLenderFees || 0,
    transferTax: results.transferTaxCost || 0,
    titleInsurance: results.titleInsuranceCost || 0,
    closingCosts: (results.cplFeeCost || 0) + (results.endorsementCost || 0) + (results.legalSettlementCost || 0) + (results.recordingCost || 0),
    thirdPartyFees: (results.inspectionCost || 0) + (results.appraisalCost || 0) + (results.insuranceCost || 0),
  };
  
  const totalAcquisitionCosts = Object.values(acquisitionCosts).reduce((a, b) => a + b, 0);

  // DISPOSITION COSTS (selling side - paid at sale)
  const dispositionCosts = {
    sellingCommission: results.totalSellingCommissionCost || 0,
    transferTax: results.sellingTransferTaxCost || 0,
    closingCosts: 0, // Usually minimal on sell side
  };
  
  const totalDispositionCosts = Object.values(dispositionCosts).reduce((a, b) => a + b, 0);

  // HOLDING COSTS (carrying costs during ownership)
  const totalHoldingCosts = results.totalHoldingCosts || 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-amber-200 space-y-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Costs Breakdown (Transparent)</h3>

      {/* Acquisition Costs */}
      <div className="border-l-4 border-orange-500 pl-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-gray-800">🏠 Acquisition Costs (At Purchase Closing)</h4>
          <span className="text-lg font-bold text-orange-700">
            {formatCurrency(totalAcquisitionCosts)}
          </span>
        </div>
        <div className="space-y-1 text-xs">
          {acquisitionCosts.lenderFees > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Lender Fees (points, origination, etc.)</span>
              <span className="font-mono">{formatCurrency(acquisitionCosts.lenderFees)}</span>
            </div>
          )}
          {acquisitionCosts.transferTax > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Transfer Tax (buying side)</span>
              <span className="font-mono">{formatCurrency(acquisitionCosts.transferTax)}</span>
            </div>
          )}
          {acquisitionCosts.titleInsurance > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Title Insurance</span>
              <span className="font-mono">{formatCurrency(acquisitionCosts.titleInsurance)}</span>
            </div>
          )}
          {acquisitionCosts.closingCosts > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Closing Fees (CPL, recording, legal, endorsements)</span>
              <span className="font-mono">{formatCurrency(acquisitionCosts.closingCosts)}</span>
            </div>
          )}
          {acquisitionCosts.thirdPartyFees > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Third-Party Fees (inspection, appraisal, insurance)</span>
              <span className="font-mono">{formatCurrency(acquisitionCosts.thirdPartyFees)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Holding Costs */}
      <div className="border-l-4 border-amber-500 pl-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-gray-800">📅 Holding Costs (Monthly Carrying)</h4>
          <span className="text-lg font-bold text-blue-700">
            {formatCurrency(totalHoldingCosts)}
          </span>
        </div>
        <div className="space-y-1 text-xs">
          {results.monthlyHoldingCost > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Monthly Avg. (interest, utilities, taxes, insurance)</span>
              <span className="font-mono">{formatCurrency(results.monthlyHoldingCost)}</span>
            </div>
          )}
          {results.holdingPeriodMonths && (
            <div className="flex justify-between text-gray-600">
              <span>Holding Period</span>
              <span className="font-mono">{results.holdingPeriodMonths} months</span>
            </div>
          )}
        </div>
      </div>

      {/* Disposition Costs */}
      <div className="border-l-4 border-red-500 pl-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-gray-800">🏡 Disposition Costs (At Sale/Exit)</h4>
          <span className="text-lg font-bold text-red-700">
            {formatCurrency(totalDispositionCosts)}
          </span>
        </div>
        <div className="space-y-1 text-xs">
          {dispositionCosts.sellingCommission > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Real Estate Commission (seller + buyer agent)</span>
              <span className="font-mono">{formatCurrency(dispositionCosts.sellingCommission)}</span>
            </div>
          )}
          {dispositionCosts.transferTax > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Transfer Tax (selling side)</span>
              <span className="font-mono">{formatCurrency(dispositionCosts.transferTax)}</span>
            </div>
          )}
          {totalDispositionCosts === 0 && (
            <div className="text-gray-400 italic">No disposition costs found</div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-3 rounded-lg border border-gray-200">
        <div className="space-y-1 text-xs">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Acquisition Costs</span>
            <span>{formatCurrency(totalAcquisitionCosts)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Holding Costs</span>
            <span>{formatCurrency(totalHoldingCosts)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Disposition Costs</span>
            <span>{formatCurrency(totalDispositionCosts)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-sm mt-2 pt-2 border-t border-gray-300">
            <span>Total Project Costs</span>
            <span className="text-lg">{formatCurrency(totalAcquisitionCosts + totalHoldingCosts + totalDispositionCosts)}</span>
          </div>
        </div>
      </div>

      {/* Formula Display */}
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs">
        <div className="font-bold text-blue-900 mb-2">Profit Calculation:</div>
        <div className="space-y-1 text-blue-800 font-mono text-[11px]">
          <div>Profit = ARV - Purchase Price - Rehab Budget - Total Costs</div>
          <div>Profit = {formatCurrency(results.arv)} - {formatCurrency(0)} - {formatCurrency(0)} - {formatCurrency(totalAcquisitionCosts + totalHoldingCosts + totalDispositionCosts)}</div>
        </div>
      </div>
    </div>
  );
};
