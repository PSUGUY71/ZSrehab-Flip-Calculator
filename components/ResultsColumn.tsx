import React from 'react';
import { LoanInputs, CalculatedResults, LenderOption } from '../types';
import { EligibilityAlert } from './EligibilityAlert';
import { ValuationReturns } from './ValuationReturns';
import { LoanEstimateCard } from './LoanEstimateCard';
import { LenderComparison } from './LenderComparison';
import { ClosingProfitCard } from './ClosingProfitCard';
import { SensitivityAnalysis } from './SensitivityAnalysis';
import { SellerNetAnalysis } from './SellerNetAnalysis';

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

interface ResultsColumnProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  lenders: LenderOption[];
  comparisonData: ComparisonDataItem[];
  bestLenderFees: number | null;
  bestMonthlyPayment: number | null;
  onAddLender: () => void;
  onApplyLender: (lender: LenderOption) => void;
  onEditLender: (lender: LenderOption) => void;
  onDuplicateLender: (lender: LenderOption) => void;
  onDeleteLender: (id: string) => void;
}

export const ResultsColumn: React.FC<ResultsColumnProps> = ({
  inputs,
  results,
  lenders,
  comparisonData,
  bestLenderFees,
  bestMonthlyPayment,
  onAddLender,
  onApplyLender,
  onEditLender,
  onDuplicateLender,
  onDeleteLender,
}) => {
  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="sticky top-24 space-y-6">
        {/* Eligibility Alert */}
        <div className="bg-gray-50 rounded-xl p-2">
          <EligibilityAlert results={results} />
        </div>

        {/* Valuation & Returns Section */}
        <div className="bg-blue-50 rounded-xl p-2">
          <ValuationReturns results={results} />
        </div>

        {/* Loan Estimate Card */}
        <div className="bg-green-50 rounded-xl p-2">
          <LoanEstimateCard inputs={inputs} results={results} />
        </div>

        {/* Lender Comparison Section */}
        <div className="bg-purple-50 rounded-xl p-2">
          <LenderComparison
            inputs={inputs}
            results={results}
            lenders={lenders}
            comparisonData={comparisonData}
            bestLenderFees={bestLenderFees}
            bestMonthlyPayment={bestMonthlyPayment}
            onAddLender={onAddLender}
            onApplyLender={onApplyLender}
            onEditLender={onEditLender}
            onDuplicateLender={onDuplicateLender}
            onDeleteLender={onDeleteLender}
          />
        </div>

        {/* Closing Table Profit (Detailed) */}
        <div className="bg-indigo-50 rounded-xl p-2">
          <ClosingProfitCard inputs={inputs} results={results} />
        </div>

        {/* Sensitivity Analysis */}
        <div className="bg-pink-50 rounded-xl p-2">
          <SensitivityAnalysis results={results} />
        </div>

        {/* Seller Net Analysis */}
        <div className="bg-cyan-50 rounded-xl p-2">
          <SellerNetAnalysis inputs={inputs} results={results} />
        </div>
      </div>
    </div>
  );
};
