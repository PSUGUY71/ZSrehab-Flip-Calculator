import React from 'react';
import { LoanInputs, CalculatedResults, LenderOption } from '../types';
import { EligibilityAlert } from './EligibilityAlert';
import { ValuationReturns } from './ValuationReturns';
import { LoanEstimateCard } from './LoanEstimateCard';
import { SeventyPercentRuleCard } from './SeventyPercentRuleCard';
import { LenderComparison } from './LenderComparison';
import { ClosingProfitCard } from './ClosingProfitCard';
import { SensitivityAnalysis } from './SensitivityAnalysis';
import { SellerNetAnalysis } from './SellerNetAnalysis';
import { CashRequiredSummary } from './CashRequiredSummary';
import { RealismCheckPanel } from './RealismCheckPanel';

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
  bestProfit?: number | null;
  bestDownPayment?: number | null;
  bestCashToClose?: number | null;
  bestOverallLender?: string | null;
  originalBaselineLenderName?: string | null;
  onAddLender: () => void;
  onApplyLender: (lender: LenderOption) => void;
  onRestoreBaseline?: () => void;
  onEditLender: (lender: LenderOption) => void;
  onDuplicateLender: (lender: LenderOption) => void;
  onDeleteLender: (id: string) => void;
}

export const ResultsColumn: React.FC<ResultsColumnProps> = ({
  inputs,
  results,
  baselineResults,
  lenders,
  comparisonData,
  bestLenderFees,
  bestMonthlyPayment,
  bestProfit,
  bestDownPayment,
  bestCashToClose,
  bestOverallLender,
  originalBaselineLenderName,
  onAddLender,
  onApplyLender,
  onRestoreBaseline,
  onEditLender,
  onDuplicateLender,
  onDeleteLender,
}) => {
  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="sticky top-24 space-y-6">
        {/* Cash Required Summary */}
        <CashRequiredSummary inputs={inputs} results={results} />

        {/* Eligibility Alert */}
        <div className="bg-gray-50 rounded-xl p-2">
          <EligibilityAlert results={results} />
        </div>

        {/* Realism Check Panel */}
        <RealismCheckPanel inputs={inputs} results={results} />

        {/* Valuation & Returns Section */}
        <div className="bg-blue-50 rounded-xl p-2">
          <ValuationReturns inputs={inputs} results={results} />
        </div>

        {/* Loan Estimate Card */}
        <div className="bg-green-50 rounded-xl p-2">
          <LoanEstimateCard inputs={inputs} results={results} />
        </div>

        {/* 70% Rule Card */}
        <div className="bg-orange-50 rounded-xl p-2">
          <SeventyPercentRuleCard inputs={inputs} results={results} />
        </div>

        {/* Lender Comparison Section */}
        <div className="bg-purple-50 rounded-xl p-2">
          <LenderComparison
            inputs={inputs}
            results={results}
            baselineResults={baselineResults}
            lenders={lenders}
            comparisonData={comparisonData}
            bestLenderFees={bestLenderFees}
            bestMonthlyPayment={bestMonthlyPayment}
            bestProfit={bestProfit}
            bestDownPayment={bestDownPayment}
            bestCashToClose={bestCashToClose}
            bestOverallLender={bestOverallLender}
            originalBaselineLenderName={originalBaselineLenderName}
            onAddLender={onAddLender}
            onApplyLender={onApplyLender}
            onRestoreBaseline={onRestoreBaseline}
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
