import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { HelpTooltip } from './HelpTooltip';

interface ClosingProfitCardProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const ClosingProfitCard: React.FC<ClosingProfitCardProps> = ({ inputs, results }) => (
  <div className="bg-teal-50 border border-teal-500 rounded p-4 shadow-sm break-inside-avoid print-color-adjust-exact print:p-2">
    <div className="flex justify-between items-center border-b border-teal-200 pb-2 mb-2 print:pb-1 print:mb-1">
      <div className="flex flex-col">
        <div className="text-teal-900 font-bold uppercase text-xs">Net Profit (Projected)</div>
        <div className="text-[9px] text-teal-600 mt-0.5">ARV - Loan - Costs - Exit - Holding</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full shadow-sm border border-teal-300">
          {formatPercent(results.roi)} ROI
        </span>
        <span className="text-teal-900 font-bold text-xl print:text-base">{formatCurrency(results.netProfit)}</span>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs text-teal-800 print:gap-y-1">
      <div className="flex justify-between">
        <span className="opacity-70">Revenue (Sale)</span>
        <span className="font-bold">{formatCurrency(inputs.arv)}</span>
      </div>
      
      {/* Exit Costs Breakdown - Commissions shown prominently */}
      {(() => {
        // Calculate commissions using new separate rates or legacy rate
        let sellerComm = 0;
        let buyerComm = 0;
        if (inputs.sellingSellerAgentCommissionRate > 0 || inputs.sellingBuyerAgentCommissionRate > 0) {
          sellerComm = inputs.arv * ((inputs.sellingSellerAgentCommissionRate || 0) / 100);
          buyerComm = inputs.arv * ((inputs.sellingBuyerAgentCommissionRate || 0) / 100);
        } else {
          // Legacy: use total commission rate
          const totalComm = inputs.arv * ((inputs.sellingCommissionRate || 0) / 100);
          sellerComm = totalComm / 2;
          buyerComm = totalComm / 2;
        }
        
        return (
          <>
            <div className="flex justify-between border-t border-teal-300 pt-1 mt-1">
              <span className="opacity-70 font-semibold">Buyer's Agent Commission ({inputs.sellingBuyerAgentCommissionRate || 0}%)</span>
              <span className="font-bold text-red-600">-{formatCurrency(buyerComm)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70 font-semibold">Seller's Agent Commission ({inputs.sellingSellerAgentCommissionRate || 0}%)</span>
              {inputs.weAreTheRealEstateAgent ? (
                (() => {
                  const brokerPortion = sellerComm * ((inputs.sellingSellerAgentBrokerRate || 0) / 100);
                  const netCommission = sellerComm - brokerPortion;
                  return (
                    <span className="font-bold text-green-600">
                      +{formatCurrency(netCommission)} (Credit)
                      {brokerPortion > 0 && (
                        <span className="text-[9px] text-gray-500 block">Net after {inputs.sellingSellerAgentBrokerRate}% broker split</span>
                      )}
                    </span>
                  );
                })()
              ) : (
                <span className="font-bold text-red-600">-{formatCurrency(sellerComm)}</span>
              )}
            </div>
          </>
        );
      })()}
      
      <div className="flex justify-between">
        <span className="opacity-70">Ln. Payoff</span>
        <span className="font-bold text-red-600">-{formatCurrency(results.qualifiedLoanAmount)}</span>
      </div>

      {/* Walker Fees */}
      <div className="flex justify-between">
        <span className="opacity-70">Walker Fees</span>
        <span className="font-bold text-red-600">-{formatCurrency(results.totalWalkerFees)}</span>
      </div>

      {/* Other Buying Costs */}
      <div className="flex justify-between">
        <span className="opacity-70">Other Cash Inv.</span>
        <span className="font-bold text-red-600">-{formatCurrency(results.totalBuyingCosts - results.totalWalkerFees)}</span>
      </div>
      <div className="flex justify-between">
        <span className="opacity-70">Transfer Tax</span>
        <span className="font-bold text-red-600">-{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate / 100))}</span>
      </div>
    </div>

    {/* Detailed Holding Cost Section */}
    <div className="mt-3 bg-teal-100/60 rounded p-2 border border-teal-200 print:mt-1 print:p-1">
      <div className="text-[10px] font-bold uppercase text-teal-800 mb-1 flex justify-between items-center">
        <span>Holding Costs Breakdown</span>
        <span className="text-teal-600 font-normal">{inputs.holdingPeriodMonths} Months</span>
      </div>
      <div className="space-y-1 text-xs text-teal-800">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="opacity-70">Loan Interest</span>
            <span className="text-[10px] opacity-50">({formatCurrency(results.monthlyPayment)} / mo)</span>
          </div>
          <span className="font-medium text-red-600">-{formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="opacity-70">Utilities</span>
            <span className="text-[10px] opacity-50">({formatCurrency(inputs.monthlyElectric)} / mo)</span>
          </div>
          <span className="font-medium text-red-600">-{formatCurrency(inputs.monthlyElectric * inputs.holdingPeriodMonths)}</span>
        </div>
        <div className="border-t border-teal-300 pt-1 mt-1 flex justify-between font-bold">
          <span>Total Holding</span>
          <span className="text-red-700">-{formatCurrency(results.totalHoldingCosts)}</span>
        </div>
      </div>
    </div>

    <div className="mt-3 pt-2 border-t border-teal-200 text-[10px] text-teal-600 flex justify-between items-center print:mt-1 print:pt-1">
      <div className="flex flex-col">
        <span>Closing Table Check (Before Holding):</span>
        <span className="text-[9px] text-teal-500">Net Profit + Holding Costs</span>
      </div>
      <span className="font-bold">{formatCurrency(results.closingTableProfit)}</span>
    </div>

    {/* After-Tax Profit Section */}
    {inputs.showAfterTaxProfit && results.estimatedCapitalGainsTax > 0 && (
      <div className="mt-3 pt-2 border-t-2 border-teal-300 bg-teal-100/40 rounded p-2 print:mt-1 print:pt-1">
        <div className="text-xs font-bold text-teal-900 uppercase mb-2">NET PROFIT AFTER TAXES</div>
        <div className="space-y-1 text-xs text-teal-800">
          <div className="flex justify-between">
            <span className="opacity-70">Net Profit (Before Tax):</span>
            <span className="font-bold">{formatCurrency(results.netProfit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Est. Capital Gains Tax ({inputs.capitalGainsTaxRate || 20}%):</span>
            <span className="font-bold text-red-600">-{formatCurrency(results.estimatedCapitalGainsTax)}</span>
          </div>
          <div className="border-t border-teal-300 pt-1 mt-1 flex justify-between font-bold text-teal-900">
            <span>Net After Taxes:</span>
            <span>{formatCurrency(results.netProfitAfterTax)}</span>
          </div>
        </div>
      </div>
    )}
  </div>
);
