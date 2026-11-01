import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { cashShortIssue } from '../utils/dealVerdict';

interface RealismCheckPanelProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const RealismCheckPanel: React.FC<RealismCheckPanelProps> = ({ inputs, results }) => {
  // Calculate total lender fees
  const totalLenderFees = results.totalLenderFees || 0;
  const holdingCosts = results.totalHoldingCosts || 0;
  const holdingMonths = inputs.holdingPeriodMonths || 0;

  // Critical Issues
  const criticalIssues: string[] = [];
  const cashIssue = cashShortIssue(inputs.liquidity, results);
  if (cashIssue) criticalIssues.push(cashIssue);
  if (results.ltv > 75) {
    criticalIssues.push(`LTV exceeds 75% (${results.ltv.toFixed(2)}%)`);
  }
  if (inputs.purchasePrice > results.maxAllowableOffer && results.maxAllowableOffer > 0) {
    const overage = inputs.purchasePrice - results.maxAllowableOffer;
    criticalIssues.push(`Purchase price exceeds max allowable offer by ${formatCurrency(overage)}`);
  }

  // Assumptions to verify (yellow warnings)
  const assumptions: string[] = [];
  if (inputs.interestRate === 0) {
    assumptions.push('Interest Rate: 0% (unrealistic) → Typical hard money: 12%');
  }
  if (totalLenderFees === 0 && (inputs.purchasePrice > 0 || inputs.rehabBudget > 0)) {
    assumptions.push('Lender Fees: $0 (unrealistic) → Typical hard money: 3%');
  }
  if (holdingCosts === 0 && holdingMonths > 3) {
    assumptions.push(`Holding Costs: $0 for ${holdingMonths}-month hold (unrealistic) → Add insurance, taxes, utilities`);
  }

  // Deal structure issues
  interface DealStructureIssue {
    message: string;
    details: string;
    currentPrice: string;
    impact: string;
  }
  const dealStructureIssues: DealStructureIssue[] = [];
  if (!results.passes70Rule) {
    const overage = inputs.purchasePrice - results.maxPurchasePrice70Rule;
    dealStructureIssues.push({
      message: `FAILS 70% Rule (over by ${formatCurrency(overage)})`,
      details: `Max price at 70%: ${formatCurrency(results.maxPurchasePrice70Rule)}`,
      currentPrice: `Your price: ${formatCurrency(inputs.purchasePrice)}`,
      impact: 'May affect profit'
    });
  }

  // Good indicators
  const goodIndicators: string[] = [];
  // (No "positive cash flow" here — a flip has no cash flow until it sells)
  if (results.passes70Rule) {
    goodIndicators.push('Passes 70% Rule');
  }
  if (inputs.interestRate >= 8 && inputs.interestRate <= 15) {
    goodIndicators.push('Realistic interest rate');
  }
  if (totalLenderFees > 0) {
    goodIndicators.push('Lender fees included');
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-300">
      <div className="bg-gray-100 px-4 py-3 border-b-2 border-gray-300">
        <h2 className="text-base font-bold uppercase text-gray-900">⚠️ Deal Realism Check</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Critical Issues */}
        <div>
          <div className="text-sm font-bold text-amber-700 mb-2">🔴 CRITICAL ISSUES (Fix these)</div>
          {criticalIssues.length === 0 ? (
            <div className="text-xs text-gray-600">None</div>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-700">
              {criticalIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Assumptions to Verify */}
        {assumptions.length > 0 && (
          <div>
            <div className="text-sm font-bold text-amber-700 mb-2">🟡 ASSUMPTIONS TO VERIFY</div>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-700">
              {assumptions.map((assumption, idx) => (
                <li key={idx}>{assumption}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Deal Structure */}
        <div>
          <div className="text-sm font-bold text-amber-700 mb-2">🔵 DEAL STRUCTURE</div>
          {dealStructureIssues.length === 0 ? (
            <div className="text-xs text-amber-700">✓ Passes 70% Rule</div>
          ) : (
            <div className="space-y-2">
              {dealStructureIssues.map((issue, idx) => (
                <div key={idx} className="text-xs text-amber-700">
                  <div className="font-bold">✗ {issue.message}</div>
                  <div className="ml-4 mt-1 text-gray-600">{issue.details}</div>
                  <div className="ml-4 text-gray-600">{issue.currentPrice}</div>
                  <div className="ml-4 text-gray-600">Impact: {issue.impact}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Good Indicators */}
        {goodIndicators.length > 0 && (
          <div>
            <div className="text-sm font-bold text-amber-700 mb-2">🟢 GOOD</div>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-700">
              {goodIndicators.map((indicator, idx) => (
                <li key={idx}>✓ {indicator}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

