import React from 'react';
import { CalculatedResults, LoanInputs } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CostsBreakdownProps {
  results: CalculatedResults;
  inputs: LoanInputs;
}

const Row: React.FC<{ label: string; value: number }> = ({ label, value }) =>
  Math.abs(value) > 0.005 ? (
    <div className="flex justify-between text-gray-600 gap-2">
      <span className="min-w-0">{label}</span>
      <span className="font-mono">{value < 0 ? `-${formatCurrency(-value)}` : formatCurrency(value)}</span>
    </div>
  ) : null;

export const CostsBreakdown: React.FC<CostsBreakdownProps> = ({ results, inputs }) => {
  // All three totals come from calculateLoan(), the same numbers net profit uses — so Total Project Costs
  // always equals the "Total Costs" in the Profit Calculation line below.
  const a = results.acquisitionBreakdown;
  const h = results.holdingBreakdown;
  const totalAcquisitionCosts = results.totalAcquisitionCosts || 0;
  const totalHoldingCosts = results.totalHoldingCosts || 0;
  const totalDispositionCosts = results.totalExitCosts || 0;
  const transfer = results.sellingTransferTaxCost || 0;
  const legal = results.sellingLegalFees || 0;
  const hideout = results.sellingHideoutTransferFee || 0;
  const totalProjectCosts = totalAcquisitionCosts + totalHoldingCosts + totalDispositionCosts;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-amber-200 space-y-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Costs Breakdown (Transparent)</h3>

      {/* Acquisition Costs */}
      <div className="border-l-4 border-orange-500 pl-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
          <h4 className="text-sm font-bold text-gray-800">🏠 Acquisition Costs (At Purchase Closing)</h4>
          <span className="text-base sm:text-lg font-bold text-orange-700">{formatCurrency(totalAcquisitionCosts)}</span>
        </div>
        <div className="space-y-1 text-xs">
          <Row label="Lender Fees (points, origination, etc.)" value={a.lenderFees} />
          <Row label="Transfer Tax (buying side)" value={a.transferTax} />
          <Row label="Title Insurance" value={a.titleInsurance} />
          <Row label="Tax Prorations (school, county, municipal)" value={a.taxProrations} />
          <Row label="Insurance Premium (paid at closing)" value={a.insurancePremium} />
          <Row label="Other Closing Fees (CPL, recording, legal, endorsements, etc.)" value={a.otherClosing} />
          <Row label="Paid Before Closing (inspection, appraisal, tests)" value={a.prepaidInspections} />
          <Row label="Less: Seller Concession" value={a.sellerConcession} />
        </div>
      </div>

      {/* Holding Costs — every component of the total */}
      <div className="border-l-4 border-amber-500 pl-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
          <h4 className="text-sm font-bold text-gray-800">📅 Holding Costs ({inputs.holdingPeriodMonths || 0} months)</h4>
          <span className="text-base sm:text-lg font-bold text-blue-700">{formatCurrency(totalHoldingCosts)}</span>
        </div>
        <div className="space-y-1 text-xs">
          <Row label="Loan Interest (progressive draws)" value={h.interest} />
          <Row label="Utilities (electric, internet, propane)" value={h.utilities} />
          <Row label={`Insurance${results.insuranceMonthsPrepaid > 0 ? ` (after ${results.insuranceMonthsPrepaid} mo prepaid at closing)` : ''}`} value={h.insurance} />
          <Row label="Property Taxes" value={h.taxes} />
          <Row label="Water / Sewer (yearly)" value={h.water} />
          <Row label="Dues (yearly)" value={h.dues} />
        </div>
      </div>

      {/* Disposition Costs */}
      <div className="border-l-4 border-red-500 pl-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
          <h4 className="text-sm font-bold text-gray-800">🏡 Disposition Costs (At Sale/Exit)</h4>
          <span className="text-base sm:text-lg font-bold text-red-700">{formatCurrency(totalDispositionCosts)}</span>
        </div>
        <div className="space-y-1 text-xs">
          {inputs.exitStrategy === 'SELL' ? (
            <>
              <Row label="Real Estate Commission (net of any you earn)" value={totalDispositionCosts - transfer - legal - hideout} />
              <Row label="Transfer Tax (selling side)" value={transfer} />
              <Row label="Legal / Settlement (selling side)" value={legal} />
              <Row label="Hideout Transfer (selling side)" value={hideout} />
            </>
          ) : (
            <Row label="Refinance points + fees" value={totalDispositionCosts} />
          )}
          {totalDispositionCosts === 0 && <div className="text-gray-400 italic">No disposition costs found</div>}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-3 rounded-lg border border-gray-200">
        <div className="space-y-1 text-xs">
          <div className="flex justify-between font-semibold text-gray-800"><span>Total Acquisition Costs</span><span>{formatCurrency(totalAcquisitionCosts)}</span></div>
          <div className="flex justify-between font-semibold text-gray-800"><span>Total Holding Costs</span><span>{formatCurrency(totalHoldingCosts)}</span></div>
          <div className="flex justify-between font-semibold text-gray-800"><span>Total Disposition Costs</span><span>{formatCurrency(totalDispositionCosts)}</span></div>
          <div className="flex justify-between font-bold text-gray-900 text-sm mt-2 pt-2 border-t border-gray-300">
            <span>Total Project Costs</span>
            <span className="text-base sm:text-lg">{formatCurrency(totalProjectCosts)}</span>
          </div>
        </div>
      </div>

      {/* Formula Display */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
        <div className="font-bold text-blue-900 mb-2">Profit Calculation:</div>
        <div className="space-y-1 text-blue-800 font-mono text-[11px] break-all">
          <div>Profit = ARV − Purchase Price − Rehab Budget − Total Project Costs</div>
          <div>
            Profit = {formatCurrency(inputs.arv)} − {formatCurrency(inputs.purchasePrice)} − {formatCurrency(inputs.rehabBudget)} − {formatCurrency(totalProjectCosts)}
            {' '}= <b>{formatCurrency(results.netProfit)}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
