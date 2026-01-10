import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { ResultRow } from './ResultRow';
import { FeeBreakdownItem } from './FeeBreakdownItem';
import { HelpTooltip } from './HelpTooltip';

interface LoanEstimateCardProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const LoanEstimateCard: React.FC<LoanEstimateCardProps> = ({ inputs, results }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white rounded-t-xl">
        <h2 className="text-lg font-bold uppercase">{inputs.lenderName || 'BASELINE'} ESTIMATE</h2>
        <div className="text-right">
          <div className="text-xs opacity-70">QUALIFIED LOAN</div>
          <div className="text-2xl font-bold text-green-400">
            {formatCurrency(results.qualifiedLoanAmount)}
          </div>
        </div>
      </div>
      <div className="p-6">
        <ResultRow 
          label="Total Loan Amount" 
          value={results.requestedLoanAmount} 
          isTotal 
          subtext="Total Cost × Financing% (actual loan based on financing terms)"
        />
        {results.qualifiedLoanAmount !== results.requestedLoanAmount && (
          <div className="text-xs text-gray-500 italic mb-2">
            Qualified Loan (capped): {formatCurrency(results.qualifiedLoanAmount)}
          </div>
        )}
        <ResultRow 
          label="Max Allowable Offer" 
          subtext="(ARV × LTV%) - Rehab Budget" 
          value={results.maxAllowableOffer} 
        />
        
        {/* Monthly Payment */}
        <div className="my-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">Monthly Payment</span>
                <span className="text-[10px] text-gray-500">Interest + Insurance + Taxes</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(
                    results.monthlyPayment + 
                    (inputs.includeMonthlyInsurance ? (inputs.monthlyInsurance || 0) : 0) + 
                    (inputs.includeMonthlyTaxes ? (inputs.monthlyTaxes || 0) : 0)
                  )}
                </span>
                <div className="text-[10px] text-gray-500 mt-1">
                  / month
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-blue-200 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Interest</span>
                <span className="text-gray-700 font-medium">{formatCurrency(results.monthlyPayment)}</span>
              </div>
              {inputs.includeMonthlyInsurance && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Insurance</span>
                  <span className="text-gray-700 font-medium">{formatCurrency(inputs.monthlyInsurance || 0)}</span>
                </div>
              )}
              {inputs.includeMonthlyTaxes && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-700 font-medium">{formatCurrency(inputs.monthlyTaxes || 0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* LTV/LTARV and LTC Separate Display */}
        <div className="space-y-2 my-2">
          <div className="py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-gray-700">LTV / LTARV</span>
              <HelpTooltip
                title="LTV / LTARV (Loan-to-Value / Loan-to-After-Repair-Value)"
                description="This shows what percentage of the property's After Repair Value (ARV) your loan covers based on your financing percentage. This is the actual percentage, not capped at 75%."
                formula="LTARV = (Loan Amount from Financing% ÷ ARV) × 100"
                examples={[
                  "If your loan is $150,000 and ARV is $200,000, LTARV = 75%",
                  "This shows the actual percentage based on your financing terms",
                  "Not constrained by the 75% rule - shows real numbers"
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Current ARV</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {formatCurrency(inputs.arv || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">% of ARV</span>
                  <span className="text-[10px] text-gray-300">(Loan from Financing% ÷ ARV) × 100</span>
                </div>
                <span className={`text-sm font-bold ${results.ltarv > 75 ? 'text-red-600' : 'text-gray-900'}`}>
                  {results.ltarv ? results.ltarv.toFixed(2) : '0.00'}%
                </span>
              </div>
              {results.cappedLTARV !== undefined && results.cappedLTARV !== results.ltarv && (
                <div className="text-[10px] text-gray-500 italic">
                  (Capped at 75% rule: {results.cappedLTARV.toFixed(2)}%)
                </div>
              )}
            </div>
          </div>
        </div>

        <ResultRow label="Lender Fees" value={results.totalLenderFees} />
        {/* Detailed Lender Fee Breakdown */}
        <FeeBreakdownItem label={`Points (${inputs.originationPoints}%)`} value={results.pointsCost} />
        <FeeBreakdownItem label="Underwriting" value={results.underwritingFee} />
        <FeeBreakdownItem label="Processing" value={results.processingFee} />
        <FeeBreakdownItem label="Doc Prep" value={results.docPrepFee} />
        <FeeBreakdownItem label="Wire" value={results.wireFee} />
        <FeeBreakdownItem label="Other Lender Fees" value={results.otherLenderFees} />

        <ResultRow label="Third Party Fees" value={results.totalThirdPartyFees} />
        {/* Detailed Third Party Fee Breakdown Corrected */}
        <FeeBreakdownItem label="Transfer Tax" value={results.transferTaxCost} />
        <FeeBreakdownItem label="Title Insurance" value={results.titleInsuranceCost} />
        <FeeBreakdownItem label="CPL Fee (Penn Attorneys)" value={results.cplFeeCost} />
        <FeeBreakdownItem label={`Endorsements (${inputs.numberOfEndorsements || 0} @ $100)`} value={results.endorsementCost} />
        <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
        <FeeBreakdownItem label="Recording" value={results.recordingCost} />
        <FeeBreakdownItem label="Insurance" value={results.insuranceCost} />
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

        <div className="my-4 bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 className="font-bold text-gray-800 uppercase mb-2">Cash Required to Close</h3>
          <ResultRow label="Lender Fees" value={results.totalLenderFees} />
          {/* Detailed Lender Fee Breakdown in Cash Required */}
          <FeeBreakdownItem label={`Points (${inputs.originationPoints}%)`} value={results.pointsCost} />
          <FeeBreakdownItem label="Underwriting" value={results.underwritingFee} />
          <FeeBreakdownItem label="Processing" value={results.processingFee} />
          <FeeBreakdownItem label="Doc Prep" value={results.docPrepFee} />
          <FeeBreakdownItem label="Wire" value={results.wireFee} />
          <FeeBreakdownItem label="Other Lender Fees" value={results.otherLenderFees} />
          
          <ResultRow label="Third Party" value={results.totalThirdPartyFees} />
          {/* Detailed Third Party Fee Breakdown in Cash Required */}
          <FeeBreakdownItem label="Transfer Tax" value={results.transferTaxCost} />
          <FeeBreakdownItem label="Title Insurance" value={results.titleInsuranceCost} />
          <FeeBreakdownItem label="CPL Fee (Penn Attorneys)" value={results.cplFeeCost} />
          <FeeBreakdownItem label={`Endorsements (${inputs.numberOfEndorsements || 0} @ $100)`} value={results.endorsementCost} />
          <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
          <FeeBreakdownItem label="Recording" value={results.recordingCost} />
          <FeeBreakdownItem label="Inspection" value={results.inspectionCost} />
          <FeeBreakdownItem label="Appraisal" value={results.appraisalCost} />
          <FeeBreakdownItem label="Insurance" value={results.insuranceCost} />
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
            subtext="Purchase Price - (Purchase Price × Financing%) - Seller Buy Back"
            value={results.gapAmount} 
          />
          
          {inputs.sellerBuyBackAmount > 0 && (
            <ResultRow 
              label="Seller Buy Back" 
              subtext="Seller financing amount (reduces down payment)"
              value={inputs.sellerBuyBackAmount * -1} 
              highlight
            />
          )}
          
          <ResultRow label="Seller Concession" value={results.sellerConcessionAmount * -1} />
          {results.buyerAgentCommissionCredit > 0 && (
            <ResultRow label="Agent Comm. Credit" value={results.buyerAgentCommissionCredit * -1} highlight />
          )}
          <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-yellow-300 text-gray-900">
            <span>{results.totalCashToClose >= 0 ? 'Due at Closing' : 'Cash to Borrower'}</span>
            <span className={results.totalCashToClose < 0 ? 'text-green-600' : ''}>
              {formatCurrency(Math.abs(results.totalCashToClose))}
            </span>
          </div>
          
          {/* Prepaid Costs Section */}
          <div className="mt-4 pt-4 border-t border-yellow-300">
            <div className="text-xs font-semibold text-gray-600 uppercase mb-2">Prepaid Before Closing</div>
            <FeeBreakdownItem label="Inspection" value={results.inspectionCost} />
            <FeeBreakdownItem label="Appraisal" value={results.appraisalCost} />
            <FeeBreakdownItem label="Earnest Money Deposit" value={inputs.earnestMoneyDeposit} />
            <div className="flex justify-between font-bold text-base pt-2 mt-2 border-t border-yellow-200 text-gray-800">
              <span>Total Prepaid</span>
              <span>{formatCurrency(results.prepaidCosts)}</span>
            </div>
          </div>
          
          {/* Total Paid Out */}
          <div className="mt-4 pt-4 border-t-2 border-yellow-400">
            <div className="flex justify-between font-bold text-xl pt-2 text-gray-900">
              <span>Total Paid Out</span>
              <span className="text-blue-600">
                {formatCurrency(results.totalPaidOut)}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              (Prepaid + Due at Closing)
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Required Liquidity Evidence:</span>
            <span
              className={`font-bold ${
                inputs.liquidity >= results.requiredLiquidity ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(results.requiredLiquidity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
