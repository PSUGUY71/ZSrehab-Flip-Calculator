import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface ProfitTableProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const ProfitTable: React.FC<ProfitTableProps> = ({ inputs, results }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-gray-300 break-inside-avoid">
    <div className="bg-green-700 px-4 py-2 text-yellow-100 font-bold text-lg uppercase flex justify-between print-color-adjust-exact print:py-1 print:text-base">
      <span>Profit For House</span>
      <span className="text-sm text-white font-normal opacity-80">{inputs.address}</span>
    </div>
    <div className="text-xs">
      <div className="grid grid-cols-12 bg-green-800 text-white font-bold py-1 px-2 print-color-adjust-exact">
        <div className="col-span-4">Item</div>
        <div className="col-span-3 text-right">Cost</div>
        <div className="col-span-2 text-center">Months</div>
        <div className="col-span-3 text-right">Total</div>
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-12 bg-yellow-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4 font-bold">Sale Price</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.arv)}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right font-bold">{formatCurrency(inputs.arv)}</div>
      </div>

      {/* Purchase Price Row */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Purchase Price</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.purchasePrice)}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.purchasePrice)}</div>
      </div>

      {/* Rehab Row */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Rehab Budget</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.rehabBudget)}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.rehabBudget)}</div>
      </div>

      {/* Holding Rows */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Utilities (Electric)</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.monthlyElectric)}</div>
        <div className="col-span-2 text-center">{inputs.holdingPeriodMonths}</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.monthlyElectric * inputs.holdingPeriodMonths)}</div>
      </div>
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Mortgage Interest</div>
        <div className="col-span-3 text-right">{formatCurrency(results.monthlyPayment)}</div>
        <div className="col-span-2 text-center">{inputs.holdingPeriodMonths}</div>
        <div className="col-span-3 text-right">{formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)}</div>
      </div>

      {/* Exit Costs - Always Sell */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Commission ({inputs.sellingCommissionRate}%)</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingCommissionRate / 100))}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingCommissionRate / 100))}</div>
      </div>
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Transfer Tax ({inputs.sellingTransferTaxRate}%)</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate / 100))}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate / 100))}</div>
      </div>

      {/* Walker Fees Row */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Walker & Walker Fees</div>
        <div className="col-span-3 text-right">{formatCurrency(results.totalWalkerFees)}</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(results.totalWalkerFees)}</div>
      </div>

      {/* Closing Fees Row */}
      <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
        <div className="col-span-4">Down Pmt + Other Fees</div>
        <div className="col-span-3 text-right">-</div>
        <div className="col-span-2 text-center">1</div>
        <div className="col-span-3 text-right">{formatCurrency(results.totalCashToClose - results.totalWalkerFees)}</div>
      </div>

      {/* Net Profit */}
      <div className="grid grid-cols-12 bg-green-200 py-2 px-2 font-bold text-green-900 border-t border-green-300 print-color-adjust-exact items-center print:py-1">
        <div className="col-span-6 text-right pr-4 text-lg print:text-sm">Net Profit</div>
        <div className="col-span-3 text-right text-xs bg-green-100 rounded px-1 py-0.5 text-green-800 border border-green-200 inline-block justify-self-end">
          ROI {formatPercent(results.roi)}
        </div>
        <div className="col-span-3 text-right text-lg print:text-sm">{formatCurrency(results.netProfit)}</div>
      </div>
    </div>
  </div>
);
