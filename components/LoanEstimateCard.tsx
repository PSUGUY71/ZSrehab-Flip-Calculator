import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { ResultRow } from './ResultRow';
import { FeeBreakdownItem } from './FeeBreakdownItem';

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
        <ResultRow
          label="Current LTV"
          subtext="% of ARV"
          value={`${results.ltv.toFixed(2)}%`}
          isCurrency={false}
          highlight={results.ltv > 75}
        />

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
        <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
        <FeeBreakdownItem label="Recording" value={results.recordingCost} />
        <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
        <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
        <FeeBreakdownItem label="Hideout Dues (Pro)" value={results.hideoutProratedDues} />
        <FeeBreakdownItem label="Roamingwood (Pro)" value={results.roamingwoodProrated} />
        <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />

        <div className="my-4 bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 className="font-bold text-gray-800 uppercase mb-2">Cash Required to Close</h3>
          <ResultRow label="Lender Fees" value={results.totalLenderFees} />
          <ResultRow label="Third Party" value={results.totalThirdPartyFees} />
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
