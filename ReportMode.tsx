import React from 'react';
import { LoanInputs, CalculatedResults, LenderOption } from './types';
import { formatCurrency, formatPercent } from './utils/calculations';
import { ResultRow } from './components/ResultRow';
import { FeeBreakdownItem } from './components/FeeBreakdownItem';
import { ClosingProfitCard } from './components/ClosingProfitCard';
import { EligibilityAlert } from './components/EligibilityAlert';
import { ValuationReturns } from './components/ValuationReturns';

interface LenderComparisonResult {
  lenderUpfrontFeesAdjusted: number;
  comparisonMonthlyPayment: number;
  totalCostOverHoldDeltaVsBase: number;
  netProfit: number;
}

interface ComparisonDataItem {
  lender: LenderOption;
  results: LenderComparisonResult;
}

interface ReportModeProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  appVersion?: 'NORMAL' | 'HIDEOUT' | 'CUSTOM';
  lenders?: LenderOption[];
  comparisonData?: ComparisonDataItem[];
  bestLenderFees?: number | null;
  bestMonthlyPayment?: number | null;
  onClose: () => void;
}

export const ReportMode: React.FC<ReportModeProps> = ({ 
  inputs, 
  results, 
  appVersion = 'HIDEOUT', 
  lenders = [],
  comparisonData = [],
  bestLenderFees = null,
  bestMonthlyPayment = null,
  onClose 
}) => {
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
                ZSrehab Flip Calculator <span className="text-blue-900 ml-2">{appVersion === 'NORMAL' ? 'Normal' : appVersion === 'HIDEOUT' ? 'Hideout' : 'Custom'} Version</span>
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
              {inputs.rehabLineItems && inputs.rehabLineItems.length > 0 && (
                <div className="text-[9px] text-gray-500 pl-2 print:text-[8px]">
                  ({inputs.rehabLineItems.length} line item{inputs.rehabLineItems.length !== 1 ? 's' : ''})
                </div>
              )}
              <div className="flex justify-between text-blue-800 font-bold text-base mt-2 pt-2 border-t border-gray-200 print:text-[10px] print:mt-1 print:pt-1">
                <span>Total Cost:</span> <span>{formatCurrency(inputs.purchasePrice + inputs.rehabBudget)}</span>
              </div>
              <div className="flex justify-between"><span>Est. ARV:</span> <span className="font-bold text-base print:text-[10px]">{formatCurrency(inputs.arv)}</span></div>
              <div className="flex justify-between text-gray-500 text-xs pl-2 print:text-[9px]"><span>ARV/SqFt:</span> <span>{formatCurrency(results.arvPerSqFt)}</span></div>
              <div className="flex justify-between mt-1 text-xs text-gray-500 print:text-[9px]"><span>Max Allowable Offer:</span> <span className="font-medium">{formatCurrency(results.maxAllowableOffer)}</span></div>
              <div className="flex justify-between mt-1 text-xs print:text-[9px]">
                <span className={results.passes70Rule ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                  70% Rule Max {results.passes70Rule ? '✓' : '✗'}
                </span>
                <span className={`font-bold ${results.passes70Rule ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(results.maxPurchasePrice70Rule)}
                </span>
              </div>
              {inputs.useWorkBackwardMode && results.workBackwardMaxOffer > 0 && (
                <div className="flex justify-between mt-1 text-xs print:text-[9px]">
                  <span className="text-purple-700 font-semibold">
                    Work-Backward Max ({inputs.workBackwardModeType === 'ROI' ? `${inputs.targetRoi}% ROI` : `${inputs.targetLTC}% LTC`})
                  </span>
                  <span className="font-bold text-purple-600">
                    {formatCurrency(results.workBackwardMaxOffer)}
                  </span>
                </div>
              )}
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

        {/* Eligibility Alert */}
        <div className="mb-6 break-inside-avoid print:mb-1">
          <EligibilityAlert results={results} />
        </div>

        {/* 70% Rule Analysis */}
        <div className="mb-6 border border-gray-300 rounded break-inside-avoid print:mb-1 print-color-adjust-exact">
          <div className="bg-gray-800 px-4 py-2 text-white font-bold text-xs uppercase print-color-adjust-exact print:py-1 print:text-[10px] flex justify-between items-center">
            <span>70% Rule Analysis</span>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase print:text-[9px] ${
              results.passes70Rule 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {results.passes70Rule ? '✓ Pass' : '✗ Fail'}
            </div>
          </div>
          <div className="p-3 space-y-2 text-xs print:text-[10px] print:p-1 print:space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">70% Rule Max Purchase Price</span>
              <span className={`text-base font-bold print:text-sm ${results.passes70Rule ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(results.maxPurchasePrice70Rule)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-600 print:text-[9px]">
              <span>Your Purchase Price</span>
              <span className="font-medium">{formatCurrency(inputs.purchasePrice)}</span>
            </div>
            {!results.passes70Rule && (
              <div className="bg-red-50 border border-red-200 rounded p-2 print:p-1">
                <div className="text-[10px] text-red-700 font-semibold print:text-[9px]">
                  ⚠️ You are {formatCurrency(Math.abs(inputs.purchasePrice - results.maxPurchasePrice70Rule))} over the 70% Rule
                </div>
                <div className="text-[9px] text-red-600 mt-1 print:text-[8px]">
                  This may impact profitability. Review your numbers carefully.
                </div>
              </div>
            )}
            {results.passes70Rule && (
              <div className="bg-green-50 border border-green-200 rounded p-2 print:p-1">
                <div className="text-[10px] text-green-700 font-semibold print:text-[9px]">
                  ✓ Purchase price is within the 70% Rule guideline
                </div>
              </div>
            )}
            <div className="text-[9px] text-gray-500 pt-2 border-t border-gray-200 print:text-[8px] print:pt-1">
              Formula: (ARV × 70%) - Rehab Budget
            </div>
          </div>
        </div>

        {/* 2. Loan Estimate */}
        <div className="border border-gray-300 break-inside-avoid">
          <div className="bg-gray-800 text-white font-bold p-1 text-center text-xs uppercase print-color-adjust-exact">Loan Estimate</div>
          <div className="p-2 space-y-3 text-xs print:space-y-1 print:p-1">
            <div>
              <h4 className="font-bold text-gray-500 uppercase mb-1 text-[10px] print:mb-0">Funds</h4>
              <ResultRow label="Total Loan" value={results.qualifiedLoanAmount} />
              <ResultRow label="Initial Funding" value={results.initialFundedAmount} />
              <ResultRow label="Rehab Holdback" value={results.holdbackAmount} />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex justify-between">
                  <span>LTV / LTARV</span>
                  <span className={`font-bold ${results.ltv > 75 ? 'text-red-600' : ''}`}>{results.ltv.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>LTC</span>
                  <span className="font-bold">{results.ltc.toFixed(2)}%</span>
                </div>
              </div>
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
              <FeeBreakdownItem label="CPL Fee (Penn Attorneys)" value={results.cplFeeCost} />
              <FeeBreakdownItem label={`Endorsements (${inputs.numberOfEndorsements || 0} @ $100)`} value={results.endorsementCost} />
              <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
              <FeeBreakdownItem label="Recording" value={results.recordingCost} />
              <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
              <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
              <FeeBreakdownItem 
                label="Dues (Pro)" 
                value={results.hideoutProratedDues}
                subtext="(calculated January through December)"
              />
              <FeeBreakdownItem 
                label="City/Town Taxes (Pro)" 
                value={results.roamingwoodProrated}
                subtext="(calculated January through December)"
              />
              <FeeBreakdownItem 
                label="School Tax (Pro)" 
                value={results.schoolTaxProrated}
                subtext="(calculated July through June)"
              />
              <FeeBreakdownItem 
                label="Sewer & Water (Pro)" 
                value={results.sewerWaterProrated}
                subtext="(calculated quarterly)"
              />

              <ResultRow 
                label="Gap / Down Payment" 
                value={results.gapAmount}
                subtext="Purchase Price - (Purchase Price × Financing%)"
              />
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

        {/* Monthly Holding Cost Summary */}
        <div className="mt-6 border border-gray-300 rounded break-inside-avoid print:mt-1">
          <div className="bg-blue-900 px-4 py-2 text-white font-bold text-xs uppercase print-color-adjust-exact print:py-1 print:text-[10px]">
            Monthly Carrying Costs Summary ({inputs.holdingPeriodMonths} Month{inputs.holdingPeriodMonths !== 1 ? 's' : ''} Total)
          </div>
          <div className="p-3 space-y-3 text-xs print:text-[10px] print:p-1 print:space-y-1">
            {/* Monthly Interest Breakdown */}
            <div>
              <div className="text-[10px] font-semibold text-gray-700 mb-2 print:text-[9px] print:mb-1">Loan Interest (Progressive Draws):</div>
              <div className="bg-white rounded border border-gray-200 p-2 space-y-1 max-h-48 overflow-y-auto print:p-1 print:max-h-none">
                {results.monthlyInterestPayments && results.monthlyInterestPayments.length > 0 ? (
                  results.monthlyInterestPayments.map((interest, index) => {
                    const month = index + 1;
                    let drawDescription = '';
                    if (month === 1) {
                      drawDescription = 'Purchase price only';
                    } else if (month === 2) {
                      drawDescription = 'Purchase + 25% rehab';
                    } else if (month === 3) {
                      drawDescription = 'Purchase + 50% rehab';
                    } else if (month === 4) {
                      drawDescription = 'Purchase + 75% rehab';
                    } else {
                      drawDescription = 'Purchase + 100% rehab (full)';
                    }
                    return (
                      <div key={month} className="flex justify-between items-center text-[10px] print:text-[9px]">
                        <div className="flex flex-col">
                          <span className="text-gray-700 font-medium">Month {month}</span>
                          <span className="text-[9px] text-gray-500 print:text-[8px]">{drawDescription}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrency(interest)}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[10px] text-gray-500 print:text-[9px]">No interest payments</div>
                )}
              </div>
              <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-gray-200 print:text-[10px] print:mt-1 print:pt-1">
                <span className="text-gray-700 font-semibold">Total Interest</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(results.monthlyInterestPayments?.reduce((sum, val) => sum + val, 0) || 0)}
                </span>
              </div>
            </div>
            
            {/* Utilities */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 print:pt-1">
              <div>
                <div className="font-semibold text-gray-700">Utilities (Electric)</div>
                <div className="text-[9px] text-gray-500 print:text-[8px]">Monthly cost</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{formatCurrency(results.monthlyUtilitiesCost)}</div>
                <div className="text-[9px] text-gray-600 print:text-[8px]">
                  {formatCurrency(results.monthlyUtilitiesCost * inputs.holdingPeriodMonths)} total
                </div>
              </div>
            </div>
            
            {/* Grand Total */}
            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between items-center">
              <span className="font-bold text-blue-900 uppercase">Grand Total</span>
              <div className="text-right">
                <div className="font-bold text-blue-700 text-sm print:text-xs">{formatCurrency(results.totalHoldingCosts)}</div>
                <div className="text-[9px] text-blue-600 font-semibold print:text-[8px]">
                  Over {inputs.holdingPeriodMonths} month{inputs.holdingPeriodMonths !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Rehab Breakdown */}
        {inputs.rehabLineItems && inputs.rehabLineItems.length > 0 && (
          <div className="mt-6 border border-gray-300 rounded break-inside-avoid print:mt-1">
            <div className="bg-gray-800 px-4 py-2 text-white font-bold text-xs uppercase print-color-adjust-exact print:py-1 print:text-[10px]">
              Rehab Breakdown
            </div>
            <div className="p-3 overflow-x-auto print:p-1">
              <table className="w-full text-xs print:text-[9px]">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-2 py-1 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-700">Description</th>
                    <th className="px-2 py-1 text-right font-semibold text-gray-700">Unit Cost</th>
                    <th className="px-2 py-1 text-right font-semibold text-gray-700">Qty</th>
                    <th className="px-2 py-1 text-right font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {inputs.rehabLineItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-2 py-1 text-gray-700">{item.category}</td>
                      <td className="px-2 py-1 text-gray-700">{item.description || '-'}</td>
                      <td className="px-2 py-1 text-right text-gray-700">{formatCurrency(item.unitCost)}</td>
                      <td className="px-2 py-1 text-right text-gray-700">{item.quantity}</td>
                      <td className="px-2 py-1 text-right font-semibold text-gray-900">
                        {formatCurrency(item.unitCost * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="px-2 py-1 text-right font-bold text-gray-900">
                      Total:
                    </td>
                    <td className="px-2 py-1 text-right font-bold text-gray-900">
                      {formatCurrency(
                        inputs.rehabLineItems.reduce((sum, item) => sum + item.unitCost * item.quantity, 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Valuation & Returns */}
        <div className="mt-6 break-inside-avoid print:mt-1">
          <ValuationReturns results={results} />
        </div>

        {/* Lender Comparison */}
        {lenders.length > 0 && comparisonData.length > 0 && (
          <div className="mt-6 border border-gray-300 rounded overflow-hidden break-inside-avoid print-color-adjust-exact print:mt-1">
            <div className="bg-blue-900 px-4 py-2 text-white font-bold text-xs uppercase print-color-adjust-exact print:py-1 print:text-[10px]">Lender Comparison</div>
            <div className="p-2">
              {/* All Lenders List */}
              <div className="mb-3 text-[10px] print:text-[9px]">
                <div className="font-bold text-gray-700 mb-2 print:mb-1">All Lenders:</div>
                <div className="space-y-1.5 print:space-y-1">
                  {/* Active/Baseline Lender */}
                  <div className="flex items-center gap-2 bg-green-50 p-1.5 rounded border border-green-200 print:p-1">
                    <span className="font-bold text-gray-800">{inputs.lenderName || 'BASELINE'}</span>
                    <span className="text-[8px] bg-green-500 text-white px-1.5 py-0.5 rounded-full uppercase font-bold print:text-[7px]">ACTIVE</span>
                    <span className="text-gray-600">({inputs.interestRate}% Rate • {inputs.originationPoints} pts)</span>
                  </div>
                  {/* Comparison Lenders */}
                  {lenders.filter(l => l.includeInComparison).map((l) => (
                    <div key={l.id} className="flex items-center gap-2 bg-blue-50 p-1.5 rounded border border-blue-200 print:p-1">
                      <span className="font-bold text-gray-800">{l.lenderName}</span>
                      {inputs.lenderName === l.lenderName && (
                        <span className="text-[8px] bg-green-500 text-white px-1.5 py-0.5 rounded-full uppercase font-bold print:text-[7px]">Active</span>
                      )}
                      <span className="text-gray-600">({l.interestRate}% Rate • {l.originationPoints} pts)</span>
                    </div>
                  ))}
                  {/* Lenders not in comparison */}
                  {lenders.filter(l => !l.includeInComparison).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="text-[9px] text-gray-500 mb-1 print:text-[8px]">Not in comparison:</div>
                      {lenders.filter(l => !l.includeInComparison).map((l) => (
                        <div key={l.id} className="flex items-center gap-2 text-gray-500 print:text-[8px]">
                          <span className="font-medium">{l.lenderName}</span>
                          <span className="text-gray-400">({l.interestRate}% Rate • {l.originationPoints} pts)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="border border-gray-100 rounded-lg overflow-x-auto">
                <table className="w-full text-[10px] text-left print:text-[9px]">
                  <thead className="bg-gray-50 text-gray-500 uppercase">
                    <tr>
                      <th className="px-2 py-2">Quick View</th>
                      <th className="px-2 py-2 border-l font-bold">
                        {inputs.lenderName || 'BASELINE'}
                        <div className="text-[8px] text-green-600 font-normal print:text-[7px]">(ACTIVE)</div>
                      </th>
                      {comparisonData.map((c) => (
                        <th key={c.lender.id} className="px-2 py-2 border-l bg-blue-50/30 font-bold">
                          {c.lender.lenderName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-2 py-1.5 font-medium">Lender Fees</td>
                      <td className="px-2 py-1.5 border-l">{formatCurrency(results.totalLenderFees)}</td>
                      {comparisonData.map((c) => (
                        <td
                          key={c.lender.id}
                          className={`px-2 py-1.5 border-l ${
                            c.results.lenderUpfrontFeesAdjusted === bestLenderFees
                              ? 'bg-green-50 font-bold'
                              : ''
                          }`}
                        >
                          {formatCurrency(c.results.lenderUpfrontFeesAdjusted)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-2 py-1.5 font-medium">Monthly Pmt</td>
                      <td className="px-2 py-1.5 border-l">{formatCurrency(results.monthlyPayment)}</td>
                      {comparisonData.map((c) => (
                        <td
                          key={c.lender.id}
                          className={`px-2 py-1.5 border-l ${
                            c.results.comparisonMonthlyPayment === bestMonthlyPayment
                              ? 'bg-green-50 font-bold'
                              : ''
                          }`}
                        >
                          {formatCurrency(c.results.comparisonMonthlyPayment)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-2 py-1.5 font-bold">Proj. Profit</td>
                      <td className="px-2 py-1.5 border-l font-bold">
                        {formatCurrency(results.netProfit)}
                      </td>
                      {comparisonData.map((c) => (
                        <td key={c.lender.id} className="px-2 py-1.5 border-l font-bold">
                          <span
                            className={
                              c.results.netProfit > results.netProfit
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {formatCurrency(c.results.netProfit)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

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
            <div className="p-1">Closing Table Profit</div>
            <div className="p-1">Diff</div>
            <div className="p-1">Net Profit</div>
          </div>
          {results.profitScenarios.map((s, idx) => (
            <div key={idx} className={`grid grid-cols-5 text-[10px] text-center p-1 border-b border-gray-100 last:border-0 ${s.label === 'Baseline' ? 'bg-blue-50 font-bold' : ''} print:text-[9px] print:p-0`}>
              <div>{s.label}</div>
              <div>{formatCurrency(s.arv)}</div>
              <div className={s.closingTableProfit > 0 ? 'text-green-700' : 'text-red-600'}>{formatCurrency(s.closingTableProfit)}</div>
              <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>{formatCurrency(s.difference)}</div>
              <div>{formatCurrency(s.netProfit)}</div>
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
