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
        <ResultRow label="Total Loan Amount" value={results.qualifiedLoanAmount} isTotal />
        <ResultRow label="Max Allowable Offer" subtext="For 100% Loan" value={results.maxAllowableOffer} />
        
        {/* LTV/LTARV and LTC Separate Display */}
        <div className="space-y-2 my-2">
          <div className="py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-gray-700">LTV / LTARV</span>
              <HelpTooltip
                title="LTV / LTARV (Loan-to-Value / Loan-to-After-Repair-Value)"
                description="This shows what percentage of the property's After Repair Value (ARV) your loan covers. It's a key metric lenders use to assess risk."
                formula="LTV = (Loan Amount ÷ ARV) × 100"
                examples={[
                  "If your loan is $150,000 and ARV is $200,000, LTV = 75%",
                  "Lenders typically want LTV under 75% for hard money loans",
                  "Higher LTV means more risk for the lender"
                ]}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">% of ARV</span>
              <span className={`text-sm font-bold ${results.ltv > 75 ? 'text-red-600' : 'text-gray-900'}`}>
                {results.ltv.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-gray-700">LTC</span>
              <HelpTooltip
                title="LTC (Loan-to-Cost)"
                description="This shows what percentage of your total project cost (purchase price + rehab) the loan covers. It helps you understand how much of your own cash you need."
                formula="LTC = (Loan Amount ÷ Total Project Cost) × 100"
                examples={[
                  "If loan is $150,000 and total cost is $180,000, LTC = 83.3%",
                  "You'd need $30,000 cash (the remaining 16.7%)",
                  "Lower LTC means you need more cash upfront"
                ]}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">% of Cost</span>
              <span className="text-sm font-bold text-gray-900">
                {results.ltc.toFixed(2)}%
              </span>
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
        <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
        <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
        <FeeBreakdownItem label="Dues (Pro)" value={results.hideoutProratedDues} />
        <FeeBreakdownItem label="City/Town Taxes (Pro)" value={results.roamingwoodProrated} />
        <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />
        <FeeBreakdownItem label="Sewer & Water (Pro)" value={results.sewerWaterProrated} />

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
          <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
          <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
          <FeeBreakdownItem label="Dues (Pro)" value={results.hideoutProratedDues} />
          <FeeBreakdownItem label="City/Town Taxes (Pro)" value={results.roamingwoodProrated} />
          <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />
          <FeeBreakdownItem label="Sewer & Water (Pro)" value={results.sewerWaterProrated} />
          
          <ResultRow label="Gap / Down Payment" value={results.gapAmount} />
          
          <ResultRow label="Seller Concession" value={results.sellerConcessionAmount * -1} />
          <ResultRow label="Earnest Deposit" value={inputs.earnestMoneyDeposit * -1} />
          {results.buyerAgentCommissionCredit > 0 && (
            <ResultRow label="Agent Comm. Credit" value={results.buyerAgentCommissionCredit * -1} highlight />
          )}
          <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-yellow-300 text-gray-900">
            <span>{results.totalCashToClose >= 0 ? 'Due at Closing' : 'Cash to Borrower'}</span>
            <span className={results.totalCashToClose < 0 ? 'text-green-600' : ''}>
              {formatCurrency(Math.abs(results.totalCashToClose))}
            </span>
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
