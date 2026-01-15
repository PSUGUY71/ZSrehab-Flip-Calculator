import React, { useRef } from 'react';
import { CalculatedResults, LoanInputs } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { formatIRR } from '../utils/irrCalculation';
import html2pdf from 'html2pdf.js';

interface AssumptionsSummaryProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const AssumptionsSummary: React.FC<AssumptionsSummaryProps> = ({ inputs, results }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const opt = {
      margin: 10,
      filename: `ZS-Deal-Analysis-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' as const, unit: 'mm' as const, format: 'a4' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const dealName = inputs.address || `Deal ${new Date().toLocaleDateString()}`;
  const stateName = inputs.state || 'N/A';

  return (
    <div>
      {/* PDF Export Button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2 transition-colors"
        >
          📥 Export to PDF
        </button>
      </div>

      {/* Assumptions Summary Content (for PDF and display) */}
      <div ref={contentRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="mb-6 pb-4 border-b-2 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900">Deal Analysis Summary</h2>
          <p className="text-sm text-gray-600 mt-1">ZS Calculator - {new Date().toLocaleDateString()}</p>
        </div>

        {/* Deal Overview Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">📍 Deal Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm text-gray-600 font-bold">Property Address</div>
              <div className="text-md font-semibold text-gray-900">{dealName}</div>
              <div className="text-sm text-gray-600 mt-1">{stateName}</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm text-gray-600 font-bold">Holding Period</div>
              <div className="text-md font-semibold text-gray-900">{inputs.holdingPeriodMonths} months</div>
              <div className="text-sm text-gray-600 mt-1">Exit Strategy: {inputs.exitStrategy}</div>
            </div>
          </div>
        </div>

        {/* Key Purchase Numbers */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💰 Key Purchase Numbers</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-xs text-gray-600 font-bold uppercase">Purchase Price</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(inputs.purchasePrice)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-xs text-gray-600 font-bold uppercase">Rehab Budget</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(inputs.rehabBudget)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-xs text-gray-600 font-bold uppercase">ARV (After Repair)</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(inputs.arv)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-xs text-gray-600 font-bold uppercase">Total Project Cost</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(inputs.purchasePrice + inputs.rehabBudget)}
              </div>
            </div>
          </div>
        </div>

        {/* Loan & Financing Details */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">🏦 Loan & Financing</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="text-xs text-blue-700 font-bold uppercase">Financing %</div>
              <div className="text-lg font-bold text-blue-900 mt-1">{inputs.financingPercentage}%</div>
              <div className="text-xs text-blue-600 mt-1">Loan Type: {inputs.loanType}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="text-xs text-blue-700 font-bold uppercase">Qualified Loan</div>
              <div className="text-lg font-bold text-blue-900 mt-1">
                {formatCurrency(results.qualifiedLoanAmount)}
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="text-xs text-blue-700 font-bold uppercase">Down Payment</div>
              <div className="text-lg font-bold text-blue-900 mt-1">
                {formatCurrency(results.gapAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Key Ratios */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Lender Ratios</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <div className="text-xs text-purple-700 font-bold uppercase">LTV</div>
              <div className="text-lg font-bold text-purple-900 mt-1">{formatPercent(results.ltv)}</div>
              <div className="text-xs text-purple-600 mt-1 text-center">Loan / Value</div>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <div className="text-xs text-purple-700 font-bold uppercase">LTC</div>
              <div className="text-lg font-bold text-purple-900 mt-1">{formatPercent(results.ltc)}</div>
              <div className="text-xs text-purple-600 mt-1 text-center">Loan / Cost</div>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <div className="text-xs text-purple-700 font-bold uppercase">LTARV</div>
              <div className="text-lg font-bold text-purple-900 mt-1">{formatPercent(results.ltarv)}</div>
              <div className="text-xs text-purple-600 mt-1 text-center">Loan / ARV</div>
            </div>
            <div className={`p-3 rounded border-2 ${results.passes70Rule ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className={`text-xs font-bold uppercase ${results.passes70Rule ? 'text-green-700' : 'text-red-700'}`}>
                70% Rule
              </div>
              <div className={`text-lg font-bold mt-1 ${results.passes70Rule ? 'text-green-900' : 'text-red-900'}`}>
                {results.passes70Rule ? '✓ PASS' : '✗ FAIL'}
              </div>
            </div>
          </div>
        </div>

        {/* Profitability & Returns (THE KEY RESULTS) */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-2 border-green-400">
          <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Profitability & Returns</h3>
          <div className="grid grid-cols-5 gap-3">
            <div className="bg-white p-3 rounded border border-green-300">
              <div className="text-xs text-gray-700 font-bold uppercase">Gross Profit</div>
              <div className="text-lg font-bold text-green-700 mt-1">
                {formatCurrency(results.netProfit)}
              </div>
              <div className="text-xs text-gray-600 mt-1">Before taxes</div>
            </div>
            <div className="bg-white p-3 rounded border border-green-300">
              <div className="text-xs text-gray-700 font-bold uppercase">After-Tax Profit</div>
              <div className="text-lg font-bold text-green-700 mt-1">
                {formatCurrency(results.netProfitAfterTax)}
              </div>
              <div className="text-xs text-gray-600 mt-1">Tax Rate: {inputs.capitalGainsTaxRate}%</div>
            </div>
            <div className="bg-white p-3 rounded border border-red-400">
              <div className="text-xs text-red-700 font-bold uppercase">IRR</div>
              <div className="text-lg font-bold text-red-700 mt-1">
                {results.irr !== null ? formatIRR(results.irr) : 'N/A'}
              </div>
              <div className="text-xs text-red-600 mt-1">Annualized</div>
            </div>
            <div className="bg-white p-3 rounded border border-blue-300">
              <div className="text-xs text-blue-700 font-bold uppercase">Cash-on-Cash ROI</div>
              <div className="text-lg font-bold text-blue-700 mt-1">{formatPercent(results.roi)}</div>
              <div className="text-xs text-blue-600 mt-1">{inputs.holdingPeriodMonths}-month project</div>
            </div>
            <div className="bg-white p-3 rounded border border-purple-300">
              <div className="text-xs text-purple-700 font-bold uppercase">Net Margin</div>
              <div className="text-lg font-bold text-purple-700 mt-1">{formatPercent(results.netMargin)}</div>
              <div className="text-xs text-purple-600 mt-1">Profit / Sales Price</div>
            </div>
          </div>
        </div>

        {/* Costs Breakdown */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💸 Costs Breakdown</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-l-4 border-orange-400 pl-4">
              <div className="text-sm text-gray-600 font-bold">Acquisition Costs</div>
              <div className="text-md font-semibold text-gray-900 mt-1">
                {formatCurrency(results.totalClosingCosts)}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Lender Fees: {formatCurrency(results.totalLenderFees)}<br />
                Third-Party: {formatCurrency(results.totalThirdPartyFees)}<br />
                Down Payment: {formatCurrency(results.gapAmount)}
              </div>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <div className="text-sm text-gray-600 font-bold">Holding Costs</div>
              <div className="text-md font-semibold text-gray-900 mt-1">
                {formatCurrency(results.totalHoldingCosts)}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                {inputs.holdingPeriodMonths} months × {formatCurrency(results.monthlyHoldingCost)}/mo
              </div>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <div className="text-sm text-gray-600 font-bold">Exit Costs</div>
              <div className="text-md font-semibold text-gray-900 mt-1">
                {formatCurrency(results.totalExitCosts)}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Commission + Transfer Tax + Other
              </div>
            </div>
          </div>
        </div>

        {/* Cash Requirements */}
        <div className="mb-6 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💵 Cash Requirements</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-700 font-bold">Prepaid Costs</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(results.prepaidCosts)}
              </div>
              <div className="text-xs text-gray-600">Inspection, Appraisal, EMD</div>
            </div>
            <div>
              <div className="text-sm text-gray-700 font-bold">Cash to Close</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(results.totalCashToClose)}
              </div>
              <div className="text-xs text-gray-600">Down Payment + Closing</div>
            </div>
            <div>
              <div className="text-sm text-gray-700 font-bold">Total Liquidity Needed</div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(results.totalPaidOut)}
              </div>
              <div className="text-xs text-gray-600">Prepaid + Cash to Close</div>
            </div>
          </div>
        </div>

        {/* Assumptions Used */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Assumptions Used</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Interest Rate</div>
              <div className="text-gray-900">{inputs.interestRate}% ({inputs.originationPoints}% points)</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Loan Term</div>
              <div className="text-gray-900">{inputs.loanTermMonths} months</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Selling Commission</div>
              <div className="text-gray-900">{inputs.sellingSellerAgentCommissionRate}% (Seller) + {inputs.sellingBuyerAgentCommissionRate}% (Buyer)</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Transfer Tax Rate</div>
              <div className="text-gray-900">{inputs.transferTaxRate}%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Capital Gains Tax</div>
              <div className="text-gray-900">{inputs.capitalGainsTaxRate}%</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-bold text-gray-700">Appraisal / Appraised Value</div>
              <div className="text-gray-900">
                {inputs.appraised_value > 0 ? formatCurrency(inputs.appraised_value) : 'Uses purchase price'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer for PDF */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-xs text-gray-600">
          <p>Generated by ZS Calculator • Confidential Deal Analysis</p>
          <p>Date: {new Date().toLocaleDateString()} • Not a professional opinion</p>
        </div>
      </div>
    </div>
  );
};
