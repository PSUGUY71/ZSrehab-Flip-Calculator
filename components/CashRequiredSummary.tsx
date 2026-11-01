import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CashRequiredSummaryProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  onToggleContingency?: () => void;
}

export const CashRequiredSummary: React.FC<CashRequiredSummaryProps> = ({ inputs, results, onToggleContingency }) => {
  // Use results for accurate totals (includes points)
  const totalLenderFees = results.totalLenderFees || 0;
  
  // Calculate holding costs for the holding period
  const holdingCosts = results.totalHoldingCosts || 0;

  // Calculate due at closing (cash to close)
  const dueAtClosing = results.totalCashToClose || 0;

  // Lender proof of funds, from cashPosition(): Gap (before EMD) + Closing Costs + max(15% of rehab, $15k)
  const totalLiquidityNeeded = results.requiredLiquidity || 0;

  // Timeline breakdown calculations
  // 1. Earnest money (pre-offer) - paid before closing
  const earnestMoney = inputs.earnestMoneyDeposit || 0;
  
  // 2. Down payment (at closing) - cash to close (includes gap + closing costs, minus earnest money already paid)
  const downPaymentAtClosing = dueAtClosing;
  
  // 3. Monthly during hold - holding costs (interest + utilities + insurance + taxes)
  const monthlyHoldingCosts = holdingCosts;
  
  // 4. Contingency reserves - automatically calculated at 15% of rehab budget
  const rehabContingency = results.rehabContingency || 0; // max(15% of rehab, $15k)
  const contingencyReserves = rehabContingency;

  // Interest over the hold = sum of the progressive draw schedule (not the full-draw payment × months)
  const totalInterest = (results.monthlyInterestPayments || []).reduce((s, m) => s + m, 0);
  
  // 5. Emergency buffer (suggested, not required by lender)
  const emergencyBuffer5Percent = results.emergencyBuffer5Percent || 0;
  const emergencyBuffer10Percent = results.emergencyBuffer10Percent || 0;
  const totalDealCost = (inputs.purchasePrice || 0) + (inputs.rehabBudget || 0);
  
  // Calculate monthly payment for display
  const monthlyPayment = results.monthlyPayment || 0;
  const holdingMonths = inputs.holdingPeriodMonths || 0;

  // Determine color coding
  const isUnrealistic = inputs.interestRate === 0 || (holdingCosts === 0 && (inputs.holdingPeriodMonths || 0) > 3);
  const hasInsufficientLiquidity = inputs.liquidity > 0 && inputs.liquidity < Math.max(totalLiquidityNeeded, results.totalCashNeeded || 0);
  
  let boxColor = 'border-amber-300 bg-white';
  let titleColor = 'text-gray-900';
  
  if (hasInsufficientLiquidity) {
    boxColor = 'border-gray-400 bg-gray-50';
    titleColor = 'text-red-900';
  } else if (isUnrealistic) {
    boxColor = 'border-gray-400 bg-white';
    titleColor = 'text-yellow-900';
  } else if (totalLiquidityNeeded > 0) {
    boxColor = 'border-gray-400 bg-gray-100';
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
          <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-blue-900 uppercase">1. Earnest Money</div>
                <div className="text-[10px] text-blue-700 mt-0.5">Pre-offer (before closing)</div>
              </div>
              <span className="text-base sm:text-lg font-bold text-blue-900">{formatCurrency(earnestMoney)}</span>
            </div>
            {earnestMoney === 0 && (
              <div className="text-[10px] text-blue-600 italic mt-1">No earnest money deposit entered</div>
            )}
          </div>

          {/* 2. Down Payment (At Closing) */}
          <div className="bg-white border-l-4 border-gray-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-green-900 uppercase">2. Down Payment</div>
                <div className="text-[10px] text-green-700 mt-0.5">Due at closing (gap + closing costs − EMD already paid)</div>
              </div>
              <span className="text-base sm:text-lg font-bold text-green-900">{formatCurrency(downPaymentAtClosing)}</span>
            </div>
            <div className="mt-2 space-y-1 text-[10px] text-green-700">
              <div className="flex justify-between">
                <span>Gap (down payment):</span>
                <span>{formatCurrency(results.gapAmount || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>+ Closing Costs:</span>
                <span>{formatCurrency(results.totalClosingCosts || 0)}</span>
              </div>
              {earnestMoney > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>− Earnest Money (already paid):</span>
                  <span>-{formatCurrency(earnestMoney)}</span>
                </div>
              )}
              {results.sellerConcessionAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>− Seller Concession:</span>
                  <span>-{formatCurrency(results.sellerConcessionAmount)}</span>
                </div>
              )}
              {results.buyerAgentCommissionCredit > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>− Agent Credit:</span>
                  <span>-{formatCurrency(results.buyerAgentCommissionCredit)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-green-200 font-bold">
                <span>= Due at Closing:</span>
                <span>{formatCurrency(downPaymentAtClosing)}</span>
              </div>
            </div>
          </div>

          {/* 2b. Rehab the loan doesn't cover */}
          {results.rehabOutOfPocket > 0 && (
            <div className="bg-white border-l-4 border-gray-400 rounded-r p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-green-900 uppercase">Rehab Not Covered by Loan</div>
                  <div className="text-[10px] text-green-700 mt-0.5">Your share of the rehab, paid as work is done</div>
                </div>
                <span className="text-base sm:text-lg font-bold text-green-900">{formatCurrency(results.rehabOutOfPocket)}</span>
              </div>
            </div>
          )}

          {/* 3. Monthly During Hold */}
          <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-purple-900 uppercase">3. Monthly During Hold</div>
                <div className="text-[10px] text-purple-700 mt-0.5">
                  {holdingMonths > 0 ? `${holdingMonths} months · interest grows as rehab draws are funded` : 'No holding period'}
                </div>
              </div>
              <span className="text-base sm:text-lg font-bold text-purple-900">{formatCurrency(monthlyHoldingCosts)}</span>
            </div>
            {holdingMonths > 0 && (
              <div className="mt-2 space-y-1 text-[10px] text-purple-700">
                <div className="flex justify-between">
                  <span>Interest ({holdingMonths} mo, progressive draws):</span>
                  <span>{formatCurrency(totalInterest)}</span>
                </div>
                {monthlyHoldingCosts > totalInterest && (
                  <div className="flex justify-between">
                    <span>Utilities, Insurance & Taxes:</span>
                    <span>{formatCurrency(monthlyHoldingCosts - totalInterest)}</span>
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
          <div className="bg-white border-l-4 border-gray-400 rounded-r p-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-xs font-bold text-orange-900 uppercase">4. Contingency Reserves</div>
                <div className="text-[10px] text-orange-700 mt-0.5">
                  Automatic: 15% of rehab budget, minimum $15,000 (per lender profile — verify)
                </div>
              </div>
              <span className="text-base sm:text-lg font-bold text-orange-900">{formatCurrency(contingencyReserves)}</span>
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
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r p-3 border-dashed">
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

        {/* Total Cash Needed Over Project — your real requirement */}
        <div className="border-t-2 border-amber-400 pt-4 mt-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold uppercase mb-1">Total Cash Needed Over Project:</span>
                <span className="text-[10px] text-gray-400 mt-1">
                  EMD {formatCurrency(earnestMoney)}
                  {results.totalPaidOut - earnestMoney - dueAtClosing > 0.005 && <> + Other prepaid {formatCurrency(results.totalPaidOut - earnestMoney - dueAtClosing)}</>}
                  {' '}+ Due at closing {formatCurrency(dueAtClosing)} + Rehab not covered {formatCurrency(results.rehabOutOfPocket)} + Holding {formatCurrency(holdingCosts)}
                  {inputs.includeContingencyInCashNeeded && <> + Contingency {formatCurrency(rehabContingency)}</>}
                </span>
                {onToggleContingency && (
                  <label className="text-[10px] text-gray-300 mt-1 flex items-center gap-1 cursor-pointer print:hidden">
                    <input type="checkbox" checked={!!inputs.includeContingencyInCashNeeded} onChange={onToggleContingency} />
                    Include rehab contingency ({formatCurrency(rehabContingency)})
                  </label>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-bold">{formatCurrency(results.totalCashNeeded)}</span>
                <div className="text-xs text-gray-300 mt-1">
                  {inputs.liquidity > 0 && (
                    <span className={inputs.liquidity >= results.totalCashNeeded ? 'text-green-400' : 'text-red-400'}>
                      You have: {formatCurrency(inputs.liquidity)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {inputs.liquidity > 0 && results.cashShortfall > 0 && (
            <div className="mt-3 p-3 bg-red-50 border-2 border-red-400 rounded-lg text-xs text-red-800">
              <div className="font-bold text-sm">⚠️ Short {formatCurrency(results.cashShortfall)} over the project</div>
              <div className="mt-1">
                {results.cashRunwayMonth === 0
                  ? `Your ${formatCurrency(inputs.liquidity)} doesn't cover what's due by closing (${formatCurrency(results.totalPaidOut)}).`
                  : results.cashRunwayMonth
                    ? `Cash runway: your money runs out in month ${results.cashRunwayMonth} of ${holdingMonths} (holding costs + your rehab share after closing).`
                    : 'Your cash lasts through the hold, but not the full total above.'}
              </div>
            </div>
          )}

          {/* Lender minimum — what the lender wants to see, not your total requirement */}
          <div className="mt-3 bg-white border border-gray-300 rounded-lg p-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div>
                <span className="text-sm font-bold text-gray-800">Lender minimum liquidity:</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">
                  Proof of funds the lender asks for — not your total cash requirement. Gap (before EMD) + Closing Costs + max(15% of Rehab, $15k)
                </span>
              </div>
              <span className={`text-lg font-bold ${inputs.liquidity > 0 && inputs.liquidity < totalLiquidityNeeded ? 'text-red-600' : 'text-gray-900'}`}>
                {formatCurrency(totalLiquidityNeeded)}
              </span>
            </div>
          </div>
          
          {/* Optional: With Emergency Buffer */}
          {totalDealCost > 0 && emergencyBuffer5Percent > 0 && (
            <div className="mt-3 bg-white border-2 border-gray-300 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <div>
                  <span className="text-sm font-bold text-yellow-900">With 5% Emergency Buffer:</span>
                  <span className="text-xs text-yellow-700 block mt-0.5">Recommended total cash reserves</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-yellow-900">
                  {formatCurrency(results.totalCashNeeded + emergencyBuffer5Percent)}
                </span>
              </div>
            </div>
          )}
        </div>

        {isUnrealistic && (
          <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700">
            ⚠️ If interest or holding costs show $0, update your rate and utilities above.
          </div>
        )}

        {inputs.liquidity > 0 && inputs.liquidity < totalLiquidityNeeded && (
          <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700">
            ⚠️ Your liquidity ({formatCurrency(inputs.liquidity)}) is below the lender minimum ({formatCurrency(totalLiquidityNeeded)}). Lenders may not approve.
          </div>
        )}
      </div>
    </div>
  );
};

