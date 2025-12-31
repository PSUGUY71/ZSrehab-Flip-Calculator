import React from 'react';
import { LoanInputs, CalculatedResults, LenderOption } from '../types';
import { EligibilityAlert } from './EligibilityAlert';
import { MaxOfferCard } from './MaxOfferCard';
import { ValuationReturns } from './ValuationReturns';
import { LoanEstimateCard } from './LoanEstimateCard';
import { LenderComparison } from './LenderComparison';
import { ProfitTable } from './ProfitTable';
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
        <EligibilityAlert results={results} />

        {/* Quick Stats - Max Offer */}
        <MaxOfferCard inputs={inputs} results={results} />

        {/* Valuation & Returns Section */}
        <ValuationReturns results={results} />

        {/* Loan Estimate Card */}
        <LoanEstimateCard inputs={inputs} results={results} />

        {/* Lender Comparison Section */}
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

        {/* Detailed Profit Table */}
        <ProfitTable inputs={inputs} results={results} />

        {/* Closing Table Profit (Detailed) */}
        <ClosingProfitCard inputs={inputs} results={results} />

        {/* Sensitivity Analysis */}
        <SensitivityAnalysis results={results} />

        {/* Seller Net Analysis */}
        <SellerNetAnalysis inputs={inputs} results={results} />
      </div>
    </div>
  );
};
