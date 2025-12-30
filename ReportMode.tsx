import React from 'react';
import { LoanInputs, CalculatedResults } from './types';
import { formatCurrency, formatPercent } from './utils/calculations';
import { ResultRow } from './components/ResultRow';
import { FeeBreakdownItem } from './components/FeeBreakdownItem';
import { ProfitTable } from './components/ProfitTable';
import { ClosingProfitCard } from './components/ClosingProfitCard';

interface ReportModeProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  onClose: () => void;
}

export const ReportMode: React.FC<ReportModeProps> = ({ inputs, results, onClose }) => {
  return (
    <div className="min-h-screen bg-gray-200 font-sans text-slate-800 py-8 print:bg-white print:py-0">
      {/* Toolbar - Hidden on Print */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50 shadow-md no-print">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-bold flex items-center gap-2">
            ← Back to Editor
          </button>
          <span className="text-sm text-gray-300">Previewing Printable Report</span>
        </div>
        <button onClick={() => window.print()} className="text-sm bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold border border-blue-500 shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Report
        </button>
      </div>

      {/* The Physical Sheet */}
      <div className="sheet shadow-2xl print:shadow-none print:pb-12">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-blue-900 pb-4 mb-6 print:pb-1 print:mb-1">
          <div className="flex items-center gap-4">
            <div className="bg-blue-900 text-white p-3 rounded font-bold text-2xl print-color-adjust-exact print:p-2 print:text-lg">ZS</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-none print:text-xl">
                ZSrehab Flip Calculator <span className="text-blue-900 ml-2">Hideout Version</span>
              </h1>
              <span className="text-sm text-gray-500 font-medium tracking-wide block mt-1 print:text-xs">
                INVESTMENT DEAL ANALYSIS • {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-right text-sm print:text-xs">
            <div className="font-bold text-lg print:text-base">{inputs.address}</div>
            <div>{inputs.state} {inputs.zipCode}</div>
            <div className="text-gray-600 mt-1">{inputs.beds} Beds • {inputs.baths} Baths • {inputs.sqFt.toLocaleString()} SqFt</div>
          </div>
        </div>

        {/* 1. Top Summary Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8 break-inside-avoid print:gap-2 print:mb-1">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
            <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Deal Structure</h3>
            <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
              <div className="flex justify-between"><span>Purchase:</span> <span className="font-medium">{formatCurrency(inputs.purchasePrice)}</span></div>
              <div className="flex justify-between text-gray-500 text-xs pl-2 print:text-[9px]"><span>Price/SqFt:</span> <span>{formatCurrency(results.purchasePricePerSqFt)}</span></div>
              <div className="flex justify-between"><span>Rehab:</span> <span className="font-medium">{formatCurrency(inputs.rehabBudget)}</span></div>
              <div className="flex justify-between text-blue-800 font-bold text-base mt-2 pt-2 border-t border-gray-200 print:text-[10px] print:mt-1 print:pt-1">
                <span>Total Cost:</span> <span>{formatCurrency(inputs.purchasePrice + inputs.rehabBudget)}</span>
              </div>
              <div className="flex justify-between"><span>Est. ARV:</span> <span className="font-bold text-base print:text-[10px]">{formatCurrency(inputs.arv)}</span></div>
              <div className="flex justify-between text-gray-500 text-xs pl-2 print:text-[9px]"><span>ARV/SqFt:</span> <span>{formatCurrency(results.arvPerSqFt)}</span></div>
              <div className="flex justify-between mt-1 text-xs text-gray-500 print:text-[9px]"><span>Max Allowable Offer:</span> <span className="font-medium">{formatCurrency(results.maxAllowableOffer)}</span></div>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
            <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Borrower & Terms</h3>
            <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
              <div className="flex justify-between"><span>FICO / Exp:</span> <span className="font-medium">{inputs.ficoScore} / {inputs.experienceLevel}</span></div>
              <div className="flex justify-between"><span>Liquidity:</span> <span className="font-bold text-base print:text-[10px]">{formatCurrency(inputs.liquidity)}</span></div>
              <div className="flex justify-between"><span>Rate:</span> <span className="font-medium">{inputs.interestRate}%</span></div>
              <div className="flex justify-between"><span>Points:</span> <span className="font-medium">{inputs.originationPoints} pts</span></div>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
            <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Assumptions</h3>
            <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
              <div className="flex justify-between"><span>Strategy:</span> <span className="font-bold">Sell</span></div>
              <div className="flex justify-between"><span>Holding:</span> <span className="font-medium">{inputs.holdingPeriodMonths} mo</span></div>
              <div className="flex justify-between"><span>Transfer Tax:</span> <span className="font-medium">{inputs.transferTaxRate}%</span></div>
              <div className="flex justify-between"><span>Title Rate:</span> <span className="font-medium">{inputs.titleInsuranceRate}%</span></div>
            </div>
          </div>
        </div>

        {/* Notes if any */}
        {inputs.notes && (
          <div className="mb-6 bg-yellow-50 p-3 border border-yellow-200 rounded print-color-adjust-exact text-xs break-inside-avoid print:mb-1 print:p-1">
            <span className="font-bold text-gray-900 uppercase mr-2">Notes:</span>
            {inputs.notes}
          </div>
        )}

        {/* 2. Main Tables (Side by Side) */}
        <div className="grid grid-cols-2 gap-8 break-inside-avoid print:gap-2">
          {/* LEFT: Loan Estimate */}
          <div className="border border-gray-300 break-inside-avoid">
            <div className="bg-gray-800 text-white font-bold p-1 text-center text-xs uppercase print-color-adjust-exact">Loan Estimate</div>
            <div className="p-2 space-y-3 text-xs print:space-y-1 print:p-1">
              <div>
                <h4 className="font-bold text-gray-500 uppercase mb-1 text-[10px] print:mb-0">Funds</h4>
                <ResultRow label="Total Loan" value={results.qualifiedLoanAmount} />
                <ResultRow label="Initial Funding" value={results.initialFundedAmount} />
                <ResultRow label="Rehab Holdback" value={results.holdbackAmount} />
                <div className="flex justify-between pt-1"><span>LTV</span> <span className="font-bold">{results.ltv.toFixed(2)}%</span></div>
              </div>
              <div>
                <h4 className="font-bold text-gray-500 uppercase mb-1 text-[10px] print:mb-0">Costs</h4>
                <ResultRow label="Lender Fees" value={results.totalLenderFees} />
                <FeeBreakdownItem label={`Points (${inputs.originationPoints}%)`} value={results.pointsCost} />
                <FeeBreakdownItem label="Underwriting" value={results.underwritingFee} />
                <FeeBreakdownItem label="Processing" value={results.processingFee} />
                <FeeBreakdownItem label="Doc Prep" value={results.docPrepFee} />
                <FeeBreakdownItem label="Wire" value={results.wireFee} />

                <ResultRow label="Third Party Fees" value={results.totalThirdPartyFees} />
                <FeeBreakdownItem label="Transfer Tax" value={results.transferTaxCost} />
                <FeeBreakdownItem label="Title Insurance" value={results.titleInsuranceCost} />
                <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
                <FeeBreakdownItem label="Recording" value={results.recordingCost} />
                <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
                <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
                <FeeBreakdownItem label="Hideout Dues (Pro)" value={results.hideoutProratedDues} />
                <FeeBreakdownItem label="Roamingwood (Pro)" value={results.roamingwoodProrated} />
                <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />

                <ResultRow label="Seller Credit" value={results.sellerConcessionAmount * -1} />
                <ResultRow label="Earnest Deposit" value={inputs.earnestMoneyDeposit * -1} />
                {results.buyerAgentCommissionCredit > 0 && (
                  <ResultRow label="Agent Comm. Credit" value={results.buyerAgentCommissionCredit * -1} />
                )}
                <div className="flex justify-between border-t border-gray-300 pt-1 mt-1 font-bold text-sm print:text-xs">
                  <span>{results.totalCashToClose >= 0 ? 'Cash to Close' : 'Cash Back'}</span>
                  <span>{formatCurrency(Math.abs(results.totalCashToClose))}</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>Req. Liquidity:</span>
                  <span className={inputs.liquidity >= results.requiredLiquidity ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                    {formatCurrency(results.requiredLiquidity)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Profit Table */}
          <div>
            <ProfitTable inputs={inputs} results={results} />
          </div>
        </div>

        {/* Valuation & Returns */}
        <div className="mt-6 break-inside-avoid print:mt-1">
          <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Valuation & Returns</h3>
          <div className="grid grid-cols-5 gap-4 print:gap-1">
            <div className="bg-gray-50 rounded p-3 text-center border border-gray-200 print:p-1">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide print:text-[9px]">Buy / SqFt</div>
              <div className="text-lg font-bold text-gray-900 mt-1 print:text-[10px]">{formatCurrency(results.purchasePricePerSqFt)}</div>
            </div>
            <div className="bg-blue-50 rounded p-3 text-center border border-blue-200 print:p-1">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wide print:text-[9px]">Sell / SqFt</div>
              <div className="text-lg font-bold text-blue-700 mt-1 print:text-[10px]">{formatCurrency(results.arvPerSqFt)}</div>
            </div>
            <div className="bg-green-50 rounded p-3 text-center border border-green-200 print:p-1">
              <div className="text-xs text-green-700 font-bold uppercase tracking-wide print:text-[9px]">Cash ROI</div>
              <div className="text-lg font-bold text-green-700 mt-1 print:text-[10px]">{formatPercent(results.roi)}</div>
              <div className="text-[10px] text-green-600 mt-0.5 print:text-[8px]">Cash on Cash</div>
            </div>
            <div className="bg-purple-50 rounded p-3 text-center border border-purple-200 print:p-1">
              <div className="text-xs text-purple-700 font-bold uppercase tracking-wide print:text-[9px]">Proj. ROI</div>
              <div className="text-lg font-bold text-purple-700 mt-1 print:text-[10px]">{formatPercent(results.projectRoi)}</div>
              <div className="text-[10px] text-purple-600 mt-0.5 print:text-[8px]">Return on Cost</div>
            </div>
            <div className="bg-indigo-50 rounded p-3 text-center border border-indigo-200 print:p-1">
              <div className="text-xs text-indigo-700 font-bold uppercase tracking-wide print:text-[9px]">Net Margin</div>
              <div className="text-lg font-bold text-indigo-700 mt-1 print:text-[10px]">{formatPercent(results.netMargin)}</div>
              <div className="text-[10px] text-indigo-600 mt-0.5 print:text-[8px]">Return on Sales</div>
            </div>
          </div>
        </div>

        {/* 3. Closing Table Profit Card */}
        <div className="mt-6 break-inside-avoid print:mt-1">
          <ClosingProfitCard inputs={inputs} results={results} />
        </div>

        {/* 4. Sensitivity Analysis */}
        <div className="mt-6 border border-gray-300 rounded overflow-hidden break-inside-avoid print-color-adjust-exact print:mt-1">
          <div className="bg-gray-100 p-2 text-xs font-bold uppercase text-center text-gray-700 print:p-1 print:text-[10px]">ARV Sensitivity Analysis</div>
          <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
            <div className="p-1">Scenario</div>
            <div className="p-1">ARV</div>
            <div className="p-1">Net Profit</div>
            <div className="p-1">Diff</div>
            <div className="p-1">Close Profit</div>
          </div>
          {results.profitScenarios.map((s, idx) => (
            <div key={idx} className={`grid grid-cols-5 text-[10px] text-center p-1 border-b border-gray-100 last:border-0 ${s.label === 'Baseline' ? 'bg-blue-50 font-bold' : ''} print:text-[9px] print:p-0`}>
              <div>{s.label}</div>
              <div>{formatCurrency(s.arv)}</div>
              <div className={s.netProfit > 0 ? 'text-green-700' : 'text-red-600'}>{formatCurrency(s.netProfit)}</div>
              <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>{formatCurrency(s.difference)}</div>
              <div>{formatCurrency(s.closingTableProfit)}</div>
            </div>
          ))}
        </div>

        {/* 5. Seller Net Analysis */}
        <div className="mt-6 border border-indigo-300 rounded bg-indigo-50 p-3 print-color-adjust-exact break-inside-avoid print:mt-1 print:p-1">
          <div className="flex justify-between items-center border-b border-indigo-200 pb-2 mb-2 print:pb-1 print:mb-1">
            <div className="text-indigo-900 font-bold uppercase text-xs">Seller's Estimated Net Proceeds</div>
            <div className="text-indigo-900 font-bold text-xl print:text-sm">{formatCurrency(results.sellerNetProceeds)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs print:gap-2 print:text-[10px]">
            <div className="space-y-1">
              <div className="flex justify-between"><span className="opacity-70">Sale Price</span> <span className="font-bold">{formatCurrency(inputs.purchasePrice)}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Mortgage Balance</span> <span className="font-bold">-{formatCurrency(inputs.sellerMortgageBalance)}</span></div>
              {inputs.sellerLineOfCreditBalance > 0 && (
                <div className="flex justify-between"><span className="opacity-70">Line of Credit</span> <span className="font-bold">-{formatCurrency(inputs.sellerLineOfCreditBalance)}</span></div>
              )}
              <div className="flex justify-between text-[10px] pt-2 border-t border-indigo-200">
                <span className="opacity-70">Original Purchase</span> <span className="font-medium text-gray-500">{formatCurrency(inputs.sellerOriginalPurchasePrice)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="opacity-70">Commission</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerCommissionCost)}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Transfer Tax</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerTransferTaxCost)}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Concessions</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerConcessionAmount)}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Misc Fees</span> <span className="font-bold text-red-600">-{formatCurrency(inputs.sellerMiscFees)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
