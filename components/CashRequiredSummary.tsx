import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CashRequiredSummaryProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const CashRequiredSummary: React.FC<CashRequiredSummaryProps> = ({ inputs, results }) => {
  // Use results for accurate totals (includes points)
  const totalLenderFees = results.totalLenderFees || 0;
  
  // Calculate holding costs for the holding period
  const holdingCosts = results.totalHoldingCosts || 0;

  // Calculate due at closing (cash to close)
  const dueAtClosing = results.totalCashToClose || 0;

  // FIX: Use the same requiredLiquidity calculation as the report
  // This matches the lender requirement formula: Max(ClosingCosts + Gap + PerDiem + 25% Rehab, ClosingCosts + Gap + PerDiem + $15k)
  // The requiredLiquidity is already calculated in utils/calculations.ts and includes:
  // - Total closing costs (lender + third party)
  // - Gap amount (down payment)
  // - Per diem interest (prepaids)
  // - Minus commission credit (reduces cash needed)
  // - Plus buffer: Max(25% of rehab, $15,000)
  const totalLiquidityNeeded = results.requiredLiquidity || 0;

  // Timeline breakdown calculations
  // 1. Earnest money (pre-offer) - paid before closing
  const earnestMoney = inputs.earnestMoneyDeposit || 0;
  
  // 2. Down payment (at closing) - cash to close (includes gap + closing costs, minus earnest money already paid)
  const downPaymentAtClosing = dueAtClosing;
  
  // 3. Monthly during hold - holding costs (interest + utilities + insurance + taxes)
  const monthlyHoldingCosts = holdingCosts;
  
  // 4. Contingency reserves - automatically calculated at 15% of rehab budget
  const rehabContingency = results.rehabContingency || 0;
  const liquidityClosingCosts = (results.totalClosingCosts || 0) + (results.gapAmount || 0) + (results.perDiemInterest || 0) - (results.buyerAgentCommissionCredit || 0);
  const contingencyReserves = totalLiquidityNeeded - liquidityClosingCosts;
  
  // 5. Emergency buffer (suggested, not required by lender)
  const emergencyBuffer5Percent = results.emergencyBuffer5Percent || 0;
  const emergencyBuffer10Percent = results.emergencyBuffer10Percent || 0;
  const totalDealCost = (inputs.purchasePrice || 0) + (inputs.rehabBudget || 0);
  
  // Calculate monthly payment for display
  const monthlyPayment = results.monthlyPayment || 0;
  const holdingMonths = inputs.holdingPeriodMonths || 0;

  // Determine color coding
  const isUnrealistic = inputs.interestRate === 0 || (holdingCosts === 0 && (inputs.holdingPeriodMonths || 0) > 3);
  const hasInsufficientLiquidity = inputs.liquidity > 0 && inputs.liquidity < totalLiquidityNeeded;
  
  let boxColor = 'border-gray-300 bg-white';
  let titleColor = 'text-gray-900';
  
  if (hasInsufficientLiquidity) {
    boxColor = 'border-red-400 bg-red-50';
    titleColor = 'text-red-900';
  } else if (isUnrealistic) {
    boxColor = 'border-yellow-400 bg-yellow-50';
    titleColor = 'text-yellow-900';
  } else if (totalLiquidityNeeded > 0) {
    boxColor = 'border-green-400 bg-green-50';
    titleColor = 'text-green-900';
  }

  return (
    <div className={`rounded-xl shadow-lg border-2 ${boxColor}`}>
      <div className={`px-4 py-3 border-b-2 ${boxColor.replace('bg-', 'border-').replace('-50', '-200')}`}>
        <h2 className={`text-lg font-bold uppercase ${titleColor}`}>Cash You'll Need</h2>
        <div className="text-[10px] text-gray-500 mt-1">
          Complete timeline breakdown: when and how much cash is required
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Timeline Breakdown */}
        <div className="space-y-3">
          {/* 1. Earnest Money (Pre-Offer) */}
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-blue-900 uppercase">1. Earnest Money</div>
                <div className="text-[10px] text-blue-700 mt-0.5">Pre-offer (before closing)</div>
              </div>
              <span className="text-lg font-bold text-blue-900">{formatCurrency(earnestMoney)}</span>
            </div>
            {earnestMoney === 0 && (
              <div className="text-[10px] text-blue-600 italic mt-1">No earnest money deposit entered</div>
            )}
          </div>

          {/* 2. Down Payment (At Closing) */}
          <div className="bg-green-50 border-l-4 border-green-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-green-900 uppercase">2. Down Payment</div>
                <div className="text-[10px] text-green-700 mt-0.5">At closing (gap + closing costs)</div>
              </div>
              <span className="text-lg font-bold text-green-900">{formatCurrency(downPaymentAtClosing)}</span>
            </div>
            <div className="mt-2 space-y-1 text-[10px] text-green-700">
              <div className="flex justify-between">
                <span>Gap Amount:</span>
                <span>{formatCurrency(results.gapAmount || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Closing Costs:</span>
                <span>{formatCurrency(results.totalClosingCosts || 0)}</span>
              </div>
              {results.buyerAgentCommissionCredit > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Less: Agent Credit:</span>
                  <span>-{formatCurrency(results.buyerAgentCommissionCredit)}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Monthly During Hold */}
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-purple-900 uppercase">3. Monthly During Hold</div>
                <div className="text-[10px] text-purple-700 mt-0.5">
                  {holdingMonths > 0 ? `${holdingMonths} months × ${formatCurrency(monthlyPayment)}/mo` : 'No holding period'}
                </div>
              </div>
              <span className="text-lg font-bold text-purple-900">{formatCurrency(monthlyHoldingCosts)}</span>
            </div>
            {holdingMonths > 0 && (
              <div className="mt-2 space-y-1 text-[10px] text-purple-700">
                <div className="flex justify-between">
                  <span>Monthly Payment ({holdingMonths} mo):</span>
                  <span>{formatCurrency(monthlyPayment * holdingMonths)}</span>
                </div>
                {monthlyHoldingCosts > (monthlyPayment * holdingMonths) && (
                  <div className="flex justify-between">
                    <span>Utilities, Insurance & Taxes:</span>
                    <span>{formatCurrency(monthlyHoldingCosts - (monthlyPayment * holdingMonths))}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-purple-200">
                  <span className="font-semibold">Total Holding Costs:</span>
                  <span className="font-bold">{formatCurrency(monthlyHoldingCosts)}</span>
                </div>
              </div>
            )}
          </div>

          {/* 4. Contingency Reserves */}
          <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-orange-900 uppercase">4. Contingency Reserves</div>
                <div className="text-[10px] text-orange-700 mt-0.5">
                  Automatic: 15% of rehab budget (lender requirement)
                </div>
              </div>
              <span className="text-lg font-bold text-orange-900">{formatCurrency(contingencyReserves)}</span>
            </div>
            <div className="mt-2 space-y-1 text-[10px] text-orange-700">
              <div className="flex justify-between">
                <span>15% Rehab Contingency:</span>
                <span>{formatCurrency(rehabContingency)}</span>
              </div>
              <div className="text-orange-600 italic">
                Buffer for unexpected costs and rehab overruns
              </div>
            </div>
          </div>

          {/* 5. Emergency Buffer (Suggested) */}
          {totalDealCost > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r p-3 border-dashed">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="text-xs font-bold text-yellow-900 uppercase">5. Emergency Buffer (Suggested)</div>
                  <div className="text-[10px] text-yellow-700 mt-0.5">
                    Optional: 5-10% of total deal cost
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-yellow-900">{formatCurrency(emergencyBuffer5Percent)}</div>
                  <div className="text-[10px] text-yellow-600">to</div>
                  <div className="text-sm font-bold text-yellow-900">{formatCurrency(emergencyBuffer10Percent)}</div>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-[10px] text-yellow-700">
                <div className="flex justify-between">
                  <span>5% Buffer:</span>
                  <span>{formatCurrency(emergencyBuffer5Percent)}</span>
                </div>
                <div className="flex justify-between">
                  <span>10% Buffer:</span>
                  <span>{formatCurrency(emergencyBuffer10Percent)}</span>
                </div>
                <div className="text-yellow-600 italic mt-1">
                  Extra safety net for major unexpected issues (not required by lender)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Liquidity Needed */}
        <div className="border-t-2 border-gray-400 pt-4 mt-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold uppercase mb-1">YOU NEED THIS MUCH:</span>
                <span className="text-xs text-gray-300 mt-0.5">
                  Minimum liquidity required by lender
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  Formula: Max(Closing + Gap + 15% Rehab, Closing + Gap + $15k)
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold">{formatCurrency(totalLiquidityNeeded)}</span>
                <div className="text-xs text-gray-300 mt-1">
                  {inputs.liquidity > 0 && (
                    <span className={inputs.liquidity >= totalLiquidityNeeded ? 'text-green-400' : 'text-red-400'}>
                      You have: {formatCurrency(inputs.liquidity)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Optional: With Emergency Buffer */}
          {totalDealCost > 0 && emergencyBuffer5Percent > 0 && (
            <div className="mt-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-bold text-yellow-900">With 5% Emergency Buffer:</span>
                  <span className="text-xs text-yellow-700 block mt-0.5">Recommended total cash reserves</span>
                </div>
                <span className="text-xl font-bold text-yellow-900">
                  {formatCurrency(totalLiquidityNeeded + emergencyBuffer5Percent)}
                </span>
              </div>
            </div>
          )}
        </div>

        {isUnrealistic && (
          <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
            ⚠️ If interest or holding costs show $0, update your rate and utilities above.
          </div>
        )}

        {hasInsufficientLiquidity && (
          <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
            ⚠️ Your liquidity ({formatCurrency(inputs.liquidity)}) is below required ({formatCurrency(totalLiquidityNeeded)}). Consider more cash reserves.
          </div>
        )}
      </div>
    </div>
  );
};

