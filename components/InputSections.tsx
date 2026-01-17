import React, { useMemo, useEffect, useRef } from 'react';
import { LoanInputs, CalculatedResults, RehabLineItem } from '../types';
import { InputGroup } from './InputGroup';
import { formatCurrency } from '../utils/calculations';
import { RehabLineItems } from './RehabLineItems';
import { HelpTooltip } from './HelpTooltip';
import { estimateHoldingCosts } from '../utils/stateHoldingCosts';
import { getAllStateCodes, getStateName, getStateDefaults, applyStateDefaults } from '../utils/stateDefaults';
import { analyzeRehabBudget } from '../utils/rehabBudgetAnalysis';
import { getLoanTypeDefaults, calculatePMI } from '../utils/loanTypeDefaults';
import { validateLoanInputs } from '../utils/inputValidator';
import { getCountiesForState, getCountyThirdPartyCosts, convertCountyCostsToFormData } from '../utils/thirdPartyCosts';
import { ValidationAlert } from './ValidationAlert';

interface InputSectionsProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  maxOfferResults: CalculatedResults;
  maxOfferLTVPercent: number;
  onMaxOfferLTVChange: (percent: number) => void;
  onInputChange: (field: keyof LoanInputs, value: string | number) => void;
  onCaptureBaseline: () => void;
  onRehabLineItemAdd: () => void;
  onRehabLineItemUpdate: (id: string, field: keyof RehabLineItem, value: string | number) => void;
  onRehabLineItemDelete: (id: string) => void;
  appVersion?: 'NORMAL' | 'HIDEOUT';
  hasUserInteracted?: boolean;
}

export const InputSections: React.FC<InputSectionsProps> = ({
  inputs,
  results,
  maxOfferResults,
  maxOfferLTVPercent,
  onMaxOfferLTVChange,
  onInputChange,
  onCaptureBaseline,
  onRehabLineItemAdd,
  onRehabLineItemUpdate,
  onRehabLineItemDelete,
  appVersion = 'HIDEOUT',
  hasUserInteracted = false,
}) => {
  const ltvOptions = [
    { label: '60%', value: 0.60 },
    { label: '65%', value: 0.65 },
    { label: '70%', value: 0.70 },
    { label: '75%', value: 0.75 },
  ];

  // Calculate suggested lender fees (3% of loan amount for hard money)
  const suggestedLenderFees = useMemo(() => {
    const financingPercent = inputs.useCustomFinancing ? inputs.customFinancingPercentage : inputs.financingPercentage;
    if (financingPercent > 0 && (inputs.purchasePrice > 0 || inputs.rehabBudget > 0)) {
      const totalProjectCost = inputs.purchasePrice + inputs.rehabBudget;
      const loanAmount = totalProjectCost * (financingPercent / 100);
      const pointsTotal = loanAmount * 0.03; // 3% default
      
      return {
        loanAmount,
        pointsTotal,
        underwriting: pointsTotal * 0.20,  // 20%
        processing: pointsTotal * 0.25,     // 25%
        docPrep: pointsTotal * 0.15,        // 15%
        wireFee: pointsTotal * 0.10,        // 10%
        other: pointsTotal * 0.30,          // 30%
      };
    }
    return null;
  }, [inputs.purchasePrice, inputs.rehabBudget, inputs.financingPercentage, inputs.useCustomFinancing, inputs.customFinancingPercentage]);

  // Check if all lender fees are zero
  const allFeesZero = inputs.underwritingFee === 0 && inputs.processingFee === 0 && 
                      inputs.docPrepFee === 0 && inputs.wireFee === 0 && (inputs.otherLenderFees || 0) === 0;

  // Handler to apply suggested fees
  const handleApplySuggestedFees = () => {
    if (suggestedLenderFees) {
      onInputChange('underwritingFee', Math.round(suggestedLenderFees.underwriting));
      onInputChange('processingFee', Math.round(suggestedLenderFees.processing));
      onInputChange('docPrepFee', Math.round(suggestedLenderFees.docPrep));
      onInputChange('wireFee', Math.round(suggestedLenderFees.wireFee));
      onInputChange('otherLenderFees', Math.round(suggestedLenderFees.other));
    }
  };

  // Auto-estimate holding costs when holding months >= 3
  const hasAutoEstimatedRef = useRef<string>('');
  useEffect(() => {
    // Create a key to track if we've estimated for this specific combination
    const estimateKey = `${inputs.holdingPeriodMonths}-${inputs.state}-${inputs.purchasePrice}`;
    
    // Only auto-estimate if:
    // 1. Holding months >= 3
    // 2. State is selected
    // 3. Purchase price > 0
    // 4. We haven't already auto-estimated for this combination
    if (
      inputs.holdingPeriodMonths >= 3 &&
      inputs.state &&
      inputs.purchasePrice > 0 &&
      hasAutoEstimatedRef.current !== estimateKey
    ) {
      const estimates = estimateHoldingCosts(
        inputs.purchasePrice,
        inputs.state,
        inputs.monthlyElectric
      );

      // Only auto-populate if values are currently zero/unchecked
      if (!inputs.includeMonthlyInsurance && inputs.monthlyInsurance === 0) {
        onInputChange('includeMonthlyInsurance', true);
        onInputChange('monthlyInsurance', estimates.monthlyInsurance);
      }
      
      if (!inputs.includeMonthlyTaxes && inputs.monthlyTaxes === 0) {
        onInputChange('includeMonthlyTaxes', true);
        onInputChange('monthlyTaxes', estimates.monthlyTaxes);
      }

      // Only set utilities if currently zero
      if (inputs.monthlyElectric === 0) {
        onInputChange('monthlyElectric', estimates.monthlyUtilities);
      }

      hasAutoEstimatedRef.current = estimateKey;
    }

    // Reset flag when holding months changes to < 3
    if (inputs.holdingPeriodMonths < 3) {
      hasAutoEstimatedRef.current = '';
    }
  }, [inputs.holdingPeriodMonths, inputs.state, inputs.purchasePrice]);

  // Calculate estimated holding costs for display
  const holdingCostEstimates = useMemo(() => {
    if (inputs.holdingPeriodMonths >= 3 && inputs.state && inputs.purchasePrice > 0) {
      return estimateHoldingCosts(
        inputs.purchasePrice,
        inputs.state,
        inputs.monthlyElectric
      );
    }
    return null;
  }, [inputs.holdingPeriodMonths, inputs.state, inputs.purchasePrice, inputs.monthlyElectric]);

  // Check if holding costs are too low (validation)
  const monthlyHoldingCostTotal = useMemo(() => {
    const interest = results.monthlyPayment || 0;
    const utilities = results.monthlyUtilitiesCost || 0;
    return interest + utilities;
  }, [results.monthlyPayment, results.monthlyUtilitiesCost]);

  const hasInsufficientHoldingCosts = inputs.holdingPeriodMonths >= 3 && monthlyHoldingCostTotal < 500;

  // Compute validation errors and warnings
  const validationErrors = useMemo(() => {
    const allErrors = validateLoanInputs(inputs);
    return allErrors.filter((err) => err.severity === 'error');
  }, [inputs]);

  const validationWarnings = useMemo(() => {
    const allErrors = validateLoanInputs(inputs);
    return allErrors.filter((err) => err.severity === 'warning');
  }, [inputs]);

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Validation Alert - Only show if user has interacted AND there are errors or warnings */}
      {hasUserInteracted && (validationErrors.length > 0 || validationWarnings.length > 0) && (
        <ValidationAlert errors={validationErrors} warnings={validationWarnings} />
      )}

      {/* Property Info */}
      <section className="bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Property Information</h2>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
            Lender: {inputs.lenderName}
          </span>
        </div>
        <div className="p-6 space-y-4">
          <InputGroup 
            label="Property Address" 
            id="address" 
            type="text" 
            value={inputs.address} 
            onChange={(v) => onInputChange('address', v)}
            helpText="Enter the full property address"
          />
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">State</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
                value={inputs.state} 
                onChange={(e) => {
                  const newState = e.target.value;
                  onInputChange('state', newState);
                  
                  // Auto-populate state defaults when state changes
                  if (newState) {
                    const defaults = applyStateDefaults(inputs, newState, false);
                    Object.entries(defaults).forEach(([key, value]) => {
                      onInputChange(key as keyof LoanInputs, value);
                    });
                  }
                }}
              >
                <option value="">Select State</option>
                {getAllStateCodes()
                  .sort((a, b) => getStateName(a).localeCompare(getStateName(b)))
                  .map((code) => (
                    <option key={code} value={code}>
                      {getStateName(code)} ({code})
                    </option>
                  ))}
              </select>
              {inputs.state && getStateDefaults(inputs.state) && (
                <div className="mt-1 text-[10px] text-blue-600 italic">
                  💡 Closing costs set for {getStateName(inputs.state)}. Verify with your lender.
                </div>
              )}
            </div>
            
            {/* County Selector - For 3rd party cost lookups */}
            {inputs.state && (
              <div className="col-span-1">
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">County</label>
                <select 
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
                  value={inputs.county || ''}
                  onChange={(e) => {
                    const county = e.target.value;
                    onInputChange('county', county);
                    
                    // Auto-populate demo data for 3rd party costs when county is selected
                    if (county && inputs.state) {
                      const costs = getCountyThirdPartyCosts(inputs.state, county);
                      const formData = convertCountyCostsToFormData(costs);
                      
                      // Apply all demo data
                      Object.entries(formData).forEach(([field, value]) => {
                        onInputChange(field as keyof LoanInputs, value);
                      });
                    }
                  }}
                >
                  <option value="">Select County (Optional)</option>
                  {getCountiesForState(inputs.state).map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                {inputs.county && (
                  <div className="mt-1 text-[10px] text-green-600 italic">
                    📍 Using {inputs.county} cost averages
                  </div>
                )}
              </div>
            )}
            
            <InputGroup 
              label="Zip Code" 
              id="zip" 
              type="text" 
              value={inputs.zipCode} 
              onChange={(v) => onInputChange('zipCode', v)}
              helpText="Property zip code"
            />
            <div className="col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Type</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
                value={inputs.propertyType} 
                onChange={(e) => onInputChange('propertyType', e.target.value)}
              >
                <option value="SFR">SFR</option>
                <option value="Multi-Family">Multi</option>
                <option value="Mixed-Use">Mixed-Use</option>
              </select>
            </div>
            <InputGroup 
              label="Units" 
              id="units" 
              value={inputs.units} 
              onChange={(v) => onInputChange('units', v)}
              helpText="Number of units in the property"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 pt-2 border-t border-gray-100">
            <InputGroup 
              label="SqFt" 
              id="sqft" 
              value={inputs.sqFt} 
              onChange={(v) => onInputChange('sqFt', v)}
              helpText="Total square footage"
            />
            <InputGroup 
              label="Beds" 
              id="beds" 
              value={inputs.beds} 
              onChange={(v) => onInputChange('beds', v)}
              helpText="Number of bedrooms"
            />
            <InputGroup 
              label="Baths" 
              id="baths" 
              value={inputs.baths} 
              onChange={(v) => onInputChange('baths', v)} 
              step={0.5}
              helpText="Number of bathrooms (can use 0.5 for half baths)"
            />
            <div className="col-span-1">
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Foundation</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
                value={inputs.foundationType} 
                onChange={(e) => onInputChange('foundationType', e.target.value)}
              >
                <option value="Basement">Basement</option>
                <option value="Crawl Space">Crawl Space</option>
                <option value="Slab">Slab</option>
                <option value="Other">Other</option>
              </select>
          </div>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="bg-blue-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Deal Economics</h2>
        </div>
        <div className="p-6 grid grid-cols-1 gap-6">
          {/* Financing Percentage Selector */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-600 block mb-3">Financing Percentage:</label>
            <div className="flex gap-2 mb-3">
              {[100, 95, 90, 85, 80].map((percent) => (
                <button
                  key={percent}
                  onClick={() => {
                    onInputChange('financingPercentage', percent);
                    onInputChange('useCustomFinancing', false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                    !inputs.useCustomFinancing && inputs.financingPercentage === percent
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {percent}%
                </button>
              ))}
              <button
                onClick={() => onInputChange('useCustomFinancing', true)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                  inputs.useCustomFinancing
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Custom
              </button>
            </div>
            {inputs.useCustomFinancing && (
              <div className="mt-2">
                <InputGroup
                  label="Custom Financing %"
                  id="customFinancingPercentage"
                  type="number"
                  value={inputs.customFinancingPercentage}
                  onChange={(v) => {
                    onInputChange('customFinancingPercentage', v);
                    onInputChange('financingPercentage', v);
                  }}
                  suffix="%"
                  helpText="Enter custom financing percentage (0-100)"
                />
              </div>
            )}
        </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputGroup 
                label="Purchase Price" 
                id="purchasePrice" 
                value={inputs.purchasePrice} 
                onChange={(v) => onInputChange('purchasePrice', v)} 
                prefix="$" 
                step={1000}
                helpText="The purchase price of the property"
              />
              <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">
                {formatCurrency(results.purchasePricePerSqFt)} / SqFt
              </div>
            </div>
            <div>
              <InputGroup 
                label="Appraised Value (LTV Basis)" 
                id="appraised_value" 
                value={inputs.appraised_value} 
                onChange={(v) => onInputChange('appraised_value', v)} 
                prefix="$" 
                step={1000}
                helpText="Appraised value used for LTV calculation (leave 0 to use purchase price)"
              />
              <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">
                {inputs.appraised_value > 0 ? `${((inputs.purchasePrice / inputs.appraised_value) * 100).toFixed(1)}% of appraised` : 'Uses purchase price'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputGroup 
                label="Rehab Budget" 
                id="rehab" 
                value={inputs.rehabBudget} 
                onChange={(v) => onInputChange('rehabBudget', v)} 
                prefix="$"
                helpText="Total budget for renovations and repairs"
              />
              
              {/* Rehab Budget Analysis */}
              {(() => {
                const analysis = analyzeRehabBudget(
                  inputs.rehabBudget,
                  inputs.purchasePrice,
                  inputs.sqFt
                );
                
                if (!analysis) return null;
                
                return (
                  <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg space-y-3">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded p-2 border border-blue-100">
                        <div className="text-[10px] text-gray-600 uppercase font-semibold">Cost per SqFt</div>
                        <div className="text-sm font-bold text-blue-900">
                          {formatCurrency(analysis.perSqft)}
                        </div>
                        <div className="text-[9px] text-gray-500 mt-0.5">
                          {analysis.perSqft >= 50 && analysis.perSqft <= 150 ? (
                            <span className="text-green-600">✓ Typical range</span>
                          ) : (
                            <span className="text-orange-600">Outside typical</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white rounded p-2 border border-blue-100">
                        <div className="text-[10px] text-gray-600 uppercase font-semibold">% of Purchase</div>
                        <div className="text-sm font-bold text-blue-900">
                          {analysis.percentOfPurchase.toFixed(1)}%
                        </div>
                        <div className="text-[9px] text-gray-500 mt-0.5">
                          {analysis.percentOfPurchase >= 20 && analysis.percentOfPurchase <= 40 ? (
                            <span className="text-green-600">✓ Typical range</span>
                          ) : (
                            <span className="text-orange-600">Outside typical</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Warnings */}
                    {analysis.warnings.length > 0 && (
                      <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-3 space-y-1">
                        <div className="text-xs font-bold text-yellow-900 uppercase mb-1">Warnings</div>
                        {analysis.warnings.map((warning, idx) => (
                          <div key={idx} className="text-xs text-yellow-800">
                            {warning}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Contingency Recommendations */}
                    <div className="bg-white border border-blue-200 rounded p-3 space-y-2">
                      <div className="text-xs font-bold text-blue-900 uppercase mb-2">Recommended Contingency</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[10px] text-gray-600">15% Contingency</div>
                          <div className="text-sm font-bold text-blue-700">
                            {formatCurrency(analysis.recommendedContingency15)}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-600">20% Contingency</div>
                          <div className="text-sm font-bold text-blue-700">
                            {formatCurrency(analysis.recommendedContingency20)}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-600 italic mt-1">
                        Add this buffer to your budget to account for unexpected costs
                      </div>
                    </div>
                    
                    {/* Profit Impact */}
                    <div className="bg-red-50 border-2 border-red-200 rounded p-3">
                      <div className="text-xs font-bold text-red-900 uppercase mb-1">
                        Profit Impact if 20% Over Budget
                      </div>
                      <div className="text-lg font-bold text-red-700">
                        -{formatCurrency(analysis.profitImpactOf20Over)}
                      </div>
                      <div className="text-[10px] text-red-600 mt-1">
                        Your profit would decrease by this amount if rehab costs exceed budget by 20%
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          
          {/* Itemized Rehab Breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gray-600">Itemized Rehab Breakdown</span>
              <HelpTooltip
                title="Itemized Rehab Breakdown"
                description="Break down your rehab budget into specific line items. This helps you track costs, ensures your budget is realistic, and provides detailed documentation for lenders. The total of all line items should match your Rehab Budget."
                examples={[
                  "Kitchen: New cabinets $5,000, Countertops $3,000, Appliances $4,000 = $12,000",
                  "Bathroom: Tile $2,000, Fixtures $1,500, Vanity $800 = $4,300",
                  "Paint: Interior $3,500, Exterior $2,000 = $5,500",
                  "Total all items should equal your Rehab Budget amount"
                ]}
              />
            </div>
            <RehabLineItems
              lineItems={inputs.rehabLineItems || []}
              onAddItem={onRehabLineItemAdd}
              onUpdateItem={onRehabLineItemUpdate}
              onDeleteItem={onRehabLineItemDelete}
              totalRehabBudget={inputs.rehabBudget}
            />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <InputGroup 
                label="Est. ARV" 
                id="arv" 
                value={inputs.arv} 
                onChange={(v) => onInputChange('arv', v)} 
                prefix="$"
                helpText="After Repair Value - estimated value after renovations"
              />
              <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">
                {formatCurrency(results.arvPerSqFt)} / SqFt
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Est. Closing Date</label>
            <input 
              type="date" 
              value={inputs.closingDate} 
              onChange={(e) => onInputChange('closingDate', e.target.value)} 
              className="block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
            />
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Escrow & Credits</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <InputGroup 
                label="Earnest Money Deposit" 
                id="emd" 
                value={inputs.earnestMoneyDeposit} 
                onChange={(v) => onInputChange('earnestMoneyDeposit', v)} 
                prefix="$"
                helpText="Deposit paid to show good faith"
              />
              <InputGroup 
                label="Seller Concession" 
                id="sellerConcession" 
                value={inputs.sellerConcessionRate} 
                onChange={(v) => onInputChange('sellerConcessionRate', v)} 
                suffix="%" 
                step={0.5}
                helpText="Percentage of purchase price seller contributes to closing costs"
              />
              <InputGroup 
                label="Seller Buy Back Amount" 
                id="sellerBuyBack" 
                value={inputs.sellerBuyBackAmount || 0} 
                onChange={(v) => onInputChange('sellerBuyBackAmount', v)} 
                prefix="$"
                helpText="Amount seller finances/holds note. Reduces down payment needed."
              />
            </div>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
              <InputGroup 
                id="buyerAgentCommissionRate" 
                label="Buyer Agent Commission Credit" 
                suffix="%" 
                value={inputs.buyerAgentCommissionRate} 
                onChange={(v) => onInputChange('buyerAgentCommissionRate', v)} 
                step={0.5}
                helpText="If you are a realtor, this commission is credited towards your closing costs"
              />
              <div className="mt-2">
                <InputGroup 
                  id="buyerAgentCommissionBrokerRate" 
                  label="Buyer Agent Commission % to Broker" 
                  suffix="%" 
                  value={inputs.buyerAgentCommissionBrokerRate || 0} 
                  onChange={(v) => onInputChange('buyerAgentCommissionBrokerRate', v)} 
                  step={0.5}
                  helpText="Percentage of the buyer agent commission that goes to the broker"
                />
              </div>
              <p className="text-[10px] text-yellow-700 mt-1">If you are a realtor, this commission is credited towards your closing costs.</p>
          </div>
          </div>
        </div>
      </section>

      {/* Max Offer Analysis */}
      <section className="bg-purple-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800 uppercase">Max Offer Analysis</h2>
            <HelpTooltip
              title="Max Offer Analysis"
              description="This calculates the maximum purchase price you can offer while still getting 100% financing (no cash down). It's based on your selected ARV percentage and rehab budget."
              formula="Max Offer = (ARV × LTV%) - Rehab Budget"
              examples={[
                "ARV: $200,000, LTV: 75%, Rehab: $30,000 → Max Offer = $120,000",
                "If you offer more than this, you'll need cash for the difference",
                "Use the percentage buttons to see different scenarios"
              ]}
            />
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Work-Backward Mode Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-gray-600">Calculation Mode:</label>
                <HelpTooltip
                  title="Work-Backward Mode"
                  description="Instead of calculating what your max offer is, this mode calculates what purchase price you need to achieve a specific target ROI or LTC. Useful when you know your profit goals."
                  examples={[
                    "Forward Mode: 'What's my max offer?' → Shows $120,000",
                    "Work-Backward Mode: 'I want 25% ROI' → Shows you need to pay $110,000",
                    "Use this to negotiate: 'I can only pay $X to hit my profit target'"
                  ]}
                />
              </div>
              <button
                onClick={() => onInputChange('useWorkBackwardMode', !inputs.useWorkBackwardMode)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  inputs.useWorkBackwardMode
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {inputs.useWorkBackwardMode ? 'Work-Backward' : 'Forward'}
              </button>
            </div>
            {inputs.useWorkBackwardMode && (
              <div className="bg-purple-50 border border-purple-200 rounded p-2 space-y-2 mb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onInputChange('workBackwardModeType', 'ROI')}
                    className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all ${
                      inputs.workBackwardModeType === 'ROI'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 border border-purple-200'
                    }`}
                  >
                    Target ROI
                  </button>
                  <button
                    onClick={() => onInputChange('workBackwardModeType', 'LTC')}
                    className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all ${
                      inputs.workBackwardModeType === 'LTC'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 border border-purple-200'
                    }`}
                  >
                    Target LTC
                  </button>
                </div>
                {inputs.workBackwardModeType === 'ROI' ? (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-xs font-semibold text-gray-600">Target ROI %</label>
                      <HelpTooltip
                        title="Target ROI (Return on Investment)"
                        description="Enter the percentage return you want to make on your cash investment. The calculator will show you what purchase price you need to achieve this return."
                        formula="ROI = (Net Profit ÷ Total Cash Invested) × 100"
                        examples={[
                          "Target 20% ROI: You want to make $20 for every $100 you invest",
                          "If you invest $50,000 cash, you want $10,000 profit (20%)",
                          "The calculator finds the purchase price that gives you this return"
                        ]}
                      />
                    </div>
                    <InputGroup
                      label=""
                      id="targetRoi"
                      type="number"
                      value={inputs.targetRoi}
                      onChange={(v) => onInputChange('targetRoi', v)}
                      suffix="%"
                      helpText="Desired return on investment percentage"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-xs font-semibold text-gray-600">Target LTC %</label>
                      <HelpTooltip
                        title="Target LTC (Loan-to-Cost)"
                        description="Enter the percentage of your total project cost you want the loan to cover. The calculator will show you what purchase price allows this loan-to-cost ratio."
                        formula="LTC = (Loan Amount ÷ Total Project Cost) × 100"
                        examples={[
                          "Target 80% LTC: You want the loan to cover 80% of total cost",
                          "If total cost is $200,000, you want a $160,000 loan",
                          "You'd need $40,000 cash (the remaining 20%)"
                        ]}
                      />
                    </div>
                    <InputGroup
                      label=""
                      id="targetLTC"
                      type="number"
                      value={inputs.targetLTC}
                      onChange={(v) => onInputChange('targetLTC', v)}
                      suffix="%"
                      helpText="Desired loan-to-cost percentage"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-2">Select ARV Percentage:</label>
            <div className="flex gap-2">
              {ltvOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onMaxOfferLTVChange(option.value)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                    maxOfferLTVPercent === option.value
                      ? option.value === 0.75 
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                        : 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} {option.value === 0.75 && '(Main)'}
                </button>
              ))}
            </div>
          </div>
          
          {(() => {
            const exceedsMax = inputs.purchasePrice > maxOfferResults.maxAllowableOffer;
            // Calculate required ARV for each percentage to make current purchase price work
            const calculateRequiredARV = (ltvPercent: number) => {
              if (inputs.purchasePrice <= 0 || ltvPercent <= 0) return 0;
              // Max Allowable Offer = (ARV * LTV%) - Rehab Budget
              // Purchase Price = (ARV * LTV%) - Rehab Budget
              // ARV = (Purchase Price + Rehab Budget) / LTV%
              return (inputs.purchasePrice + inputs.rehabBudget) / ltvPercent;
            };
            
            return (
              <div className={`${exceedsMax ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50 border border-gray-200'} rounded p-3 space-y-2`}>
                {inputs.useWorkBackwardMode ? (
                  // Work-Backward Mode Display
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-purple-700">
                        Work-Backward Max Offer ({inputs.workBackwardModeType === 'ROI' ? `${inputs.targetRoi}% ROI` : `${inputs.targetLTC}% LTC`})
                      </span>
                      <span className={`text-lg font-bold ${maxOfferResults.workBackwardMaxOffer > 0 ? 'text-purple-600' : 'text-red-600'}`}>
                        {maxOfferResults.workBackwardMaxOffer > 0 ? formatCurrency(maxOfferResults.workBackwardMaxOffer) : 'N/A'}
                      </span>
                    </div>
                    {maxOfferResults.workBackwardMaxOffer > 0 && (
                      <div className="text-[10px] text-purple-600 bg-purple-50 border border-purple-200 rounded p-2">
                        {inputs.workBackwardModeType === 'ROI' 
                          ? `Purchase price needed to achieve ${inputs.targetRoi}% ROI based on current deal structure`
                          : `Purchase price needed to achieve ${inputs.targetLTC}% LTC based on ARV and LTV%`}
                      </div>
                    )}
                    {maxOfferResults.workBackwardMaxOffer <= 0 && (
                      <div className="text-[10px] text-red-600 bg-red-50 border border-red-200 rounded p-2">
                        Cannot achieve target {inputs.workBackwardModeType === 'ROI' ? 'ROI' : 'LTC'} with current ARV and parameters
                      </div>
                    )}
                  </>
                ) : (
                  // Forward Mode Display (Original)
                  <>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-semibold ${exceedsMax ? 'text-red-700' : 'text-gray-700'}`}>Max Allowable Offer</span>
                      <span className={`text-lg font-bold ${exceedsMax ? 'text-red-600' : 'text-blue-600'}`}>{formatCurrency(maxOfferResults.maxAllowableOffer)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Max Loan ({Math.round(maxOfferLTVPercent * 100)}% of ARV)</span>
                  <span>{formatCurrency(maxOfferResults.maxLoanAmountDollars)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Less: Rehab Budget</span>
                  <span>-{formatCurrency(inputs.rehabBudget)}</span>
                </div>
                
                {/* Always show current ARV and required ARV for each percentage */}
                <div className={`${exceedsMax ? 'bg-red-100 border border-red-300' : 'bg-blue-50 border border-blue-200'} rounded p-2 space-y-2 mt-2`}>
                  <div className={`text-xs font-semibold text-center ${exceedsMax ? 'text-red-700' : 'text-blue-700'}`}>
                    {exceedsMax ? (
                      <>⚠️ Current Purchase Price ({formatCurrency(inputs.purchasePrice)}) exceeds Max Allowable Offer</>
                    ) : (
                      <>Current Purchase Price: {formatCurrency(inputs.purchasePrice)}</>
                    )}
                  </div>
                  <div className="text-[10px] font-medium text-center border-b pb-1.5 mb-1.5">
                    <span className="font-bold">Current Est. ARV: {formatCurrency(inputs.arv || 0)}</span>
                  </div>
                  <div className="text-[10px] font-medium mt-2">Required ARV for each percentage (Purchase Price: {formatCurrency(inputs.purchasePrice)}):</div>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {ltvOptions.map((option) => {
                      const requiredARV = calculateRequiredARV(option.value);
                      const currentARV = inputs.arv || 0;
                      const difference = requiredARV - currentARV; // How much higher ARV needs to be
                      const isSelected = maxOfferLTVPercent === option.value;
                      return (
                        <div key={option.value} className={`bg-white border rounded p-1.5 ${isSelected ? 'border-blue-400 ring-1 ring-blue-300' : exceedsMax ? 'border-red-200' : 'border-gray-200'}`}>
                          <div className={`text-[9px] font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                            {option.label} ARV: {isSelected && '(Selected)'}
                          </div>
                          <div className={`text-[10px] font-bold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                            {formatCurrency(requiredARV)}
                          </div>
                          {currentARV > 0 && difference !== 0 && (
                            <div className={`text-[9px] font-semibold ${difference > 0 ? 'text-red-500' : 'text-green-600'}`}>
                              {difference > 0 ? `+${formatCurrency(difference)} higher` : `${formatCurrency(Math.abs(difference))} lower`}
                            </div>
                          )}
                          {currentARV > 0 && difference === 0 && (
                            <div className="text-[9px] text-green-600 font-semibold">✓ Current ARV works</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Seller Side Analysis */}
      <section className="bg-cyan-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100">
          <h2 className="text-sm font-bold text-indigo-900 uppercase">Seller Side Analysis</h2>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <InputGroup 
            label="Seller Original Purchase" 
            id="sop" 
            value={inputs.sellerOriginalPurchasePrice || 0} 
            onChange={(v) => onInputChange('sellerOriginalPurchasePrice', v)} 
            prefix="$"
            helpText="Original purchase price when seller bought the property"
          />
          <InputGroup 
            label="Current Mortgage Balance" 
            id="smb" 
            value={inputs.sellerMortgageBalance} 
            onChange={(v) => onInputChange('sellerMortgageBalance', v)} 
            prefix="$"
            helpText="Outstanding mortgage balance on the property"
          />
          <InputGroup 
            label="Line of Credit Balance" 
            id="sloc" 
            value={inputs.sellerLineOfCreditBalance || 0} 
            onChange={(v) => onInputChange('sellerLineOfCreditBalance', v)} 
            prefix="$"
            helpText="Any line of credit balance secured by the property"
          />
          <InputGroup 
            label="Seller Commission %" 
            id="scom" 
            value={inputs.sellerAgentCommissionRate || 0} 
            onChange={(v) => onInputChange('sellerAgentCommissionRate', v)} 
            suffix="%"
            helpText="Commission rate paid to seller's agent"
          />
          <InputGroup 
            label="Seller Transfer Tax %" 
            id="sttx" 
            value={inputs.sellerTransferTaxRate || 0} 
            onChange={(v) => onInputChange('sellerTransferTaxRate', v)} 
            suffix="%"
            helpText="Transfer tax rate paid by seller"
          />
          <InputGroup 
            label="Seller Misc Closing Fees" 
            id="smisc" 
            value={inputs.sellerMiscFees} 
            onChange={(v) => onInputChange('sellerMiscFees', v)} 
            prefix="$"
            helpText="Other miscellaneous closing fees paid by seller"
          />
        </div>
      </section>

      {/* Detailed HUD */}
      <section className="bg-purple-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Detailed HUD Charges</h2>
          {inputs.state && (
            <div className="text-[10px] text-gray-600 mt-1">
              Closing costs updated for {inputs.state}. Adjust if property is in a different county with higher costs.
            </div>
          )}
        </div>
        <div className="p-6 grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Title Ins. Rate" 
              id="title" 
              value={inputs.titleInsuranceRate} 
              onChange={(v) => onInputChange('titleInsuranceRate', v)} 
              suffix="%" 
              step={0.01}
              helpText={`Title insurance rate${inputs.state && getStateDefaults(inputs.state) ? (getStateDefaults(inputs.state)!.titleInsuranceRate === 0 ? ' - ' + getStateName(inputs.state) + ' uses rate table/chart (leave at 0)' : ' - Default ' + getStateDefaults(inputs.state)!.titleInsuranceRate + '% for ' + getStateName(inputs.state)) : ' - Enter percentage or leave at 0 for rate table'}. Enter a percentage to manually override.`}
            />
            <InputGroup
              label="CPL Fee" 
              id="cpl" 
              value={inputs.cplFee} 
              onChange={(v) => onInputChange('cplFee', v)} 
              prefix="$" 
              helpText={`CPL (Certificate of Property Location) fee${inputs.state && getStateDefaults(inputs.state) ? ` - ${getStateDefaults(inputs.state)!.cplFee > 0 ? formatCurrency(getStateDefaults(inputs.state)!.cplFee) + ' for ' + getStateName(inputs.state) : 'Not applicable in ' + getStateName(inputs.state)}` : ' - Varies by state'}`}
            />
            <InputGroup
              label="Number of Endorsements" 
              id="endorsements" 
              value={inputs.numberOfEndorsements} 
              onChange={(v) => onInputChange('numberOfEndorsements', v)} 
              helpText="Number of title endorsements at $100 each"
            />
            <InputGroup 
              label="Legal & Settlement" 
              id="legal" 
              value={inputs.legalSettlementFees} 
              onChange={(v) => onInputChange('legalSettlementFees', v)} 
              prefix="$"
              helpText="Legal and settlement fees"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Govt Recording" 
              id="rec" 
              value={inputs.recordingFees} 
              onChange={(v) => onInputChange('recordingFees', v)} 
              prefix="$"
              helpText="Government recording fees"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Inspection Cost" 
              id="inspectionCost" 
              value={inputs.inspectionCost} 
              onChange={(v) => onInputChange('inspectionCost', v)} 
              prefix="$"
              helpText="Property inspection cost"
            />
            <InputGroup 
              label="Appraisal Cost" 
              id="appraisalCost" 
              value={inputs.appraisalCost} 
              onChange={(v) => onInputChange('appraisalCost', v)} 
              prefix="$"
              helpText="Property appraisal cost"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Insurance Cost" 
              id="insuranceCost" 
              value={inputs.insuranceCost} 
              onChange={(v) => onInputChange('insuranceCost', v)} 
              prefix="$"
              helpText="Insurance cost"
            />
            <InputGroup 
              label="Transfer Tax Rate" 
              id="tt" 
              value={inputs.transferTaxRate} 
              onChange={(v) => onInputChange('transferTaxRate', v)} 
              suffix="%"
              helpText="Transfer tax rate as a percentage of purchase price - auto-populated based on state. Adjust if your county has different rates."
            />
          </div>
          
          {/* Walker Charges - Only show in HIDEOUT version */}
          {appVersion === 'HIDEOUT' && (
            <div className="grid grid-cols-3 gap-4">
              <InputGroup 
                label="Walker Doc" 
                id="wd" 
                value={inputs.walkerDocPrep} 
                onChange={(v) => onInputChange('walkerDocPrep', v)} 
                prefix="$"
                helpText="Walker & Walker document preparation fee"
              />
              <InputGroup 
                label="Walker Overnight" 
                id="wo" 
                value={inputs.walkerOvernight} 
                onChange={(v) => onInputChange('walkerOvernight', v)} 
                prefix="$"
                helpText="Walker & Walker overnight delivery fee"
              />
              <InputGroup 
                label="Walker Wire" 
                id="ww" 
                value={inputs.walkerWire} 
                onChange={(v) => onInputChange('walkerWire', v)} 
                prefix="$"
                helpText="Walker & Walker wire transfer fee"
              />
            </div>
          )}
          
          {/* Title Company Charges - Only show in non-HIDEOUT versions */}
          {appVersion !== 'HIDEOUT' && (
            <div className="grid grid-cols-2 gap-6">
              <InputGroup 
                label="Title Company Charges" 
                id="titleCompany" 
                value={inputs.titleCompanyCharges || 0} 
                onChange={(v) => onInputChange('titleCompanyCharges', v)} 
                prefix="$"
                helpText="Title company charges and fees"
              />
            </div>
          )}
          
          {/* Hideout Transfer and Dues - Only show in HIDEOUT version */}
          {appVersion === 'HIDEOUT' && (
            <div className="grid grid-cols-2 gap-6">
              <InputGroup 
                label="Hideout Transfer" 
                id="ht" 
                value={inputs.hideoutTransferFee} 
                onChange={(v) => onInputChange('hideoutTransferFee', v)} 
                prefix="$"
                helpText="Leave blank (0) to use PA Title Insurance Rate Table chart automatically based on purchase price. Enter a dollar amount to manually override."
              />
              <div>
                <div className="mb-1">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Dues</label>
                    <div className="relative group">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-blue-600 focus:outline-none"
                        onMouseEnter={(e) => {
                          const tooltip = e.currentTarget.nextElementSibling;
                          if (tooltip) tooltip.classList.remove('hidden');
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = e.currentTarget.nextElementSibling;
                          if (tooltip) tooltip.classList.add('hidden');
                        }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="hidden absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        Dues annual amount (prorated Jan-Dec)
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-normal mt-0.5">
                    (calculated January through December)
                  </div>
                </div>
                <InputGroup 
                  label="" 
                  id="ha" 
                  value={inputs.hideoutAnnualFee} 
                  onChange={(v) => onInputChange('hideoutAnnualFee', v)} 
                  prefix="$"
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-1">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">City/Town Taxes</label>
                  <div className="relative group">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-600 focus:outline-none"
                      onMouseEnter={(e) => {
                        const tooltip = e.currentTarget.nextElementSibling;
                        if (tooltip) tooltip.classList.remove('hidden');
                      }}
                      onMouseLeave={(e) => {
                        const tooltip = e.currentTarget.nextElementSibling;
                        if (tooltip) tooltip.classList.add('hidden');
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="hidden absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                      City/town taxes annual amount (prorated Jan-Dec)
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-normal mt-0.5">
                  (calculated January through December)
                </div>
              </div>
              <InputGroup 
                label="" 
                id="ra" 
                value={inputs.roamingwoodAnnual} 
                onChange={(v) => onInputChange('roamingwoodAnnual', v)} 
                prefix="$"
              />
            </div>
            <div>
              <div className="mb-1">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">School Tax</label>
                  <div className="relative group">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-600 focus:outline-none"
                      onMouseEnter={(e) => {
                        const tooltip = e.currentTarget.nextElementSibling;
                        if (tooltip) tooltip.classList.remove('hidden');
                      }}
                      onMouseLeave={(e) => {
                        const tooltip = e.currentTarget.nextElementSibling;
                        if (tooltip) tooltip.classList.add('hidden');
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="hidden absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                      School tax annual amount (prorated Jul-Jun)
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-normal mt-0.5">
                  (calculated July through June)
                </div>
              </div>
              <InputGroup 
                label="" 
                id="sa" 
                value={inputs.schoolTaxAnnual} 
                onChange={(v) => onInputChange('schoolTaxAnnual', v)}
                prefix="$"
              />
            </div>
            {/* Sewer & Water - Only show in HIDEOUT version */}
            {appVersion === 'HIDEOUT' && (
              <div>
                <div className="mb-1">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Sewer & Water</label>
                    <div className="relative group">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-blue-600 focus:outline-none"
                        onMouseEnter={(e) => {
                          const tooltip = e.currentTarget.nextElementSibling;
                          if (tooltip) tooltip.classList.remove('hidden');
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = e.currentTarget.nextElementSibling;
                          if (tooltip) tooltip.classList.add('hidden');
                        }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="hidden absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        Sewer and water annual amount (prorated quarterly)
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-normal mt-0.5">
                    (calculated quarterly)
                  </div>
                </div>
                <InputGroup 
                  label=""
                  id="sewerWaterAnnual"
                  value={inputs.sewerWaterAnnual} 
                  onChange={(v) => onInputChange('sewerWaterAnnual', v)}
                  prefix="$"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exit Strategy */}
      <section className="bg-yellow-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Exit Strategy</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Holding Months" 
              id="hold" 
              value={inputs.holdingPeriodMonths} 
              onChange={(v) => onInputChange('holdingPeriodMonths', v)}
              helpText="Number of months you plan to hold the property"
            />
            <InputGroup 
              label="Mo. Electric" 
              id="elec" 
              value={inputs.monthlyElectric} 
              onChange={(v) => {
                const numValue = typeof v === 'string' ? parseFloat(v) || 0 : v;
                onInputChange('monthlyElectric', Math.max(0, numValue));
              }} 
              prefix="$"
              helpText={`Monthly electric utility cost during holding period. ${holdingCostEstimates && inputs.monthlyElectric === 0 ? `Regional estimate: ${formatCurrency(holdingCostEstimates.monthlyUtilities)}/mo for ${inputs.state}.` : 'Typical range: $100-$300/month for vacant/rehab properties.'}`}
            />
            <InputGroup 
              label="Mo. Internet" 
              id="internet" 
              value={inputs.monthlyInternet || 0} 
              onChange={(v) => onInputChange('monthlyInternet', v)} 
              prefix="$"
              helpText="Monthly internet cost during holding period"
            />
            <InputGroup 
              label="Mo. Propane" 
              id="propane" 
              value={inputs.monthlyPropane || 0} 
              onChange={(v) => onInputChange('monthlyPropane', v)} 
              prefix="$"
              helpText="Monthly propane cost during holding period"
            />
          </div>
          
          {/* Holding Costs Warning & Auto-Estimation */}
          {inputs.holdingPeriodMonths >= 3 && (
            <div className="mt-4 space-y-3">
              {/* Validation Warning - Insufficient Holding Costs */}
              {hasInsufficientHoldingCosts && (
                <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-700 text-xl font-bold">⚠️</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-red-900 mb-1">INSUFFICIENT HOLDING COSTS DETECTED</div>
                      <div className="text-xs text-red-800 mb-2">
                        Your current monthly holding costs ({formatCurrency(monthlyHoldingCostTotal)}) are below $500/month, which is very conservative for a {inputs.holdingPeriodMonths}-month hold.
                      </div>
                      <div className="text-xs text-red-700 mb-2">
                        <strong>Typical monthly costs for vacant/rehab properties:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          <li>Insurance: $150-$200/month (vacant property insurance)</li>
                          <li>Property Tax: Varies by state (typically $100-$400/month)</li>
                          <li>Utilities: $100-$300/month (electric, water, etc.)</li>
                          <li>Total: $500-$1,000+/month is realistic</li>
                        </ul>
                      </div>
                      <div className="text-xs font-semibold text-red-900">
                        👉 Ensure all holding costs are included below to avoid underestimating expenses.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Auto-Estimation Info */}
              {holdingCostEstimates && inputs.state && (
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-700 text-lg font-bold">💡</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-blue-900 mb-1">AUTO-ESTIMATED HOLDING COSTS</div>
                      <div className="text-xs text-blue-800 mb-2">
                        Based on {inputs.state} state averages and property value:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className="bg-white p-2 rounded border border-blue-200">
                          <div className="font-semibold text-blue-900">Insurance</div>
                          <div className="text-blue-700">{formatCurrency(holdingCostEstimates.monthlyInsurance)}/mo</div>
                          <div className="text-[10px] text-blue-600 mt-1">State-based estimate</div>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-200">
                          <div className="font-semibold text-blue-900">Property Tax</div>
                          <div className="text-blue-700">{formatCurrency(holdingCostEstimates.monthlyTaxes)}/mo</div>
                          <div className="text-[10px] text-blue-600 mt-1">State-based estimate</div>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-200">
                          <div className="font-semibold text-blue-900">Utilities</div>
                          <div className="text-blue-700">{formatCurrency(holdingCostEstimates.monthlyUtilities)}/mo</div>
                          <div className="text-[10px] text-blue-600 mt-1">Regional average</div>
                        </div>
                        <div className="bg-blue-100 p-2 rounded border-2 border-blue-300">
                          <div className="font-bold text-blue-900">Total Est.</div>
                          <div className="text-blue-800 font-bold">{formatCurrency(holdingCostEstimates.totalMonthlyEstimate)}/mo</div>
                          {holdingCostEstimates.isVeryConservative && (
                            <div className="text-[10px] text-orange-600 font-semibold mt-1">⚠️ Very conservative</div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-blue-700 italic">
                        These estimates have been auto-populated below. Adjust as needed based on your actual costs.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Missing Insurance/Taxes Warning */}
              {!inputs.includeMonthlyInsurance && !inputs.includeMonthlyTaxes && (
                <div className="p-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-700 text-lg font-bold">⚠️</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-900 mb-1">RECOMMENDED: Add Insurance & Taxes</div>
                      <div className="text-xs text-yellow-800 mb-2">
                        You're planning a {inputs.holdingPeriodMonths}-month hold. Insurance and property taxes are typically required.
                      </div>
                      <div className="text-xs font-semibold text-yellow-900">
                        👉 Check the boxes below to include these costs (estimates provided above).
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Optional Monthly Costs */}
          <div className="mt-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Holding Cost Options</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeMonthlyInsurance"
                checked={inputs.includeMonthlyInsurance}
                onChange={(e) => onInputChange('includeMonthlyInsurance', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeMonthlyInsurance" className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
                Add Monthly Insurance
                {holdingCostEstimates && (
                  <span className="text-xs text-blue-600 font-normal ml-2">
                    (Est: {formatCurrency(holdingCostEstimates.monthlyInsurance)}/mo - {inputs.state} state average)
                  </span>
                )}
              </label>
            </div>
            {inputs.includeMonthlyInsurance && (
              <div className="ml-6">
                <InputGroup 
                  label="Monthly Insurance" 
                  id="monthlyInsurance" 
                  value={inputs.monthlyInsurance} 
                  onChange={(v) => {
                    const numValue = typeof v === 'string' ? parseFloat(v) || 0 : v;
                    onInputChange('monthlyInsurance', Math.max(0, numValue));
                  }} 
                  prefix="$"
                  helpText={`Monthly insurance cost during holding period. ${holdingCostEstimates ? `State-based estimate: ${formatCurrency(holdingCostEstimates.monthlyInsurance)}/mo for ${inputs.state}.` : 'Typical range: $150-$200/month for vacant/rehab properties.'}`}
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeMonthlyTaxes"
                checked={inputs.includeMonthlyTaxes}
                onChange={(e) => onInputChange('includeMonthlyTaxes', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeMonthlyTaxes" className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
                Add Monthly Taxes
                {holdingCostEstimates && (
                  <span className="text-xs text-blue-600 font-normal ml-2">
                    (Est: {formatCurrency(holdingCostEstimates.monthlyTaxes)}/mo - {inputs.state} state average)
                  </span>
                )}
              </label>
            </div>
            {inputs.includeMonthlyTaxes && (
              <div className="ml-6">
                <InputGroup 
                  label="Monthly Taxes" 
                  id="monthlyTaxes" 
                  value={inputs.monthlyTaxes} 
                  onChange={(v) => {
                    const numValue = typeof v === 'string' ? parseFloat(v) || 0 : v;
                    onInputChange('monthlyTaxes', Math.max(0, numValue));
                  }} 
                  prefix="$"
                  helpText={`Monthly property tax cost during holding period. ${holdingCostEstimates ? `State-based estimate: ${formatCurrency(holdingCostEstimates.monthlyTaxes)}/mo for ${inputs.state}.` : 'Varies by state and property value.'}`}
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeYearlyWater"
                checked={inputs.includeYearlyWater || false}
                onChange={(e) => onInputChange('includeYearlyWater', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeYearlyWater" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Add Yearly Water
              </label>
            </div>
            {inputs.includeYearlyWater && (
              <div className="ml-6">
                <InputGroup 
                  label="Yearly Water" 
                  id="yearlyWater" 
                  value={inputs.yearlyWater || 0} 
                  onChange={(v) => onInputChange('yearlyWater', v)} 
                  prefix="$"
                  helpText="Yearly water cost (one-time, added to grand total)"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeYearlyDues"
                checked={inputs.includeYearlyDues || false}
                onChange={(e) => onInputChange('includeYearlyDues', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeYearlyDues" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Add Yearly Dues
              </label>
            </div>
            {inputs.includeYearlyDues && (
              <div className="ml-6">
                <InputGroup 
                  label="Yearly Dues" 
                  id="yearlyDues" 
                  value={inputs.yearlyDues || 0} 
                  onChange={(v) => onInputChange('yearlyDues', v)} 
                  prefix="$"
                  helpText="Yearly dues cost (one-time, added to grand total)"
                />
              </div>
            )}
          </div>
          <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-100">
            <div className="mb-3">
              <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Commission Breakdown</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputGroup 
                label="SELLER AGENT COMMISSION %" 
                id="sellerAgentComm" 
                value={inputs.sellingSellerAgentCommissionRate ?? 3} 
                onChange={(v) => onInputChange('sellingSellerAgentCommissionRate', v)} 
                suffix="%"
                helpText="Seller agent commission: typically 2.5-3% of ARV. This commission is paid from sale proceeds and reduces your profit. If you are the seller's agent, you can add it back to profit."
              />
              <InputGroup 
                label="BUYER AGENT COMMISSION %" 
                id="buyerAgentComm" 
                value={inputs.sellingBuyerAgentCommissionRate ?? 3} 
                onChange={(v) => onInputChange('sellingBuyerAgentCommissionRate', v)} 
                suffix="%"
                helpText="Buyer agent commission: typically 2.5-3% of ARV. This commission is paid from sale proceeds and reduces your profit."
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="weAreAgent"
                checked={inputs.weAreTheRealEstateAgent || false}
                onChange={(e) => onInputChange('weAreTheRealEstateAgent', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="weAreAgent" className="text-xs font-medium text-gray-700">
                We are the seller's agent (add commission back to profit)
              </label>
            </div>
            {inputs.weAreTheRealEstateAgent && (
              <div className="mt-2">
                <InputGroup 
                  label="Seller Agent Broker Split %" 
                  id="sellerAgentBrokerSplit" 
                  value={inputs.sellingSellerAgentBrokerRate || 0} 
                  onChange={(v) => onInputChange('sellingSellerAgentBrokerRate', v)} 
                  suffix="%"
                  helpText="Percentage of seller agent commission that goes to broker (e.g., 35%)"
                />
              </div>
            )}
            <div className="mt-4 pt-3 border-t border-yellow-200">
              <InputGroup 
                label="Transfer Tax %" 
                id="stt" 
                value={inputs.sellingTransferTaxRate} 
                onChange={(v) => onInputChange('sellingTransferTaxRate', v)} 
                suffix="%"
                helpText="Transfer tax rate when selling the property"
              />
            </div>
          </div>
          
          {/* Capital Gains Tax Section */}
          <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="showAfterTaxProfit"
                checked={inputs.showAfterTaxProfit || false}
                onChange={(e) => onInputChange('showAfterTaxProfit', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showAfterTaxProfit" className="text-xs font-bold text-gray-700 cursor-pointer">
                ✓ Show after-tax profit (now default)
              </label>
            </div>
            
            {/* Capital Gains Tax Rate - Always shown (after-tax profit is now default) */}
            <div>
              <InputGroup 
                label="Capital Gains Tax Rate %" 
                id="capitalGainsTaxRate" 
                value={inputs.capitalGainsTaxRate || 20} 
                onChange={(v) => onInputChange('capitalGainsTaxRate', v)} 
                suffix="%"
                helpText="Capital gains tax rate on profit from sale. Default 20% for self-employed (long-term gains). Adjust for your actual tax situation."
              />
            </div>
          </div>
          
          {/* Monthly Holding Cost Summary */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-xs font-bold text-blue-900 uppercase mb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>Monthly Carrying Costs Summary</span>
                <HelpTooltip
                  title="Monthly Carrying Costs"
                  description="These are the ongoing costs you'll pay each month while you own the property. They include loan interest payments and utility bills. This helps you budget and understand total holding costs."
                  examples={[
                    "Monthly Interest: $1,500 × 6 months = $9,000 total",
                    "Monthly Electric: $200 × 6 months = $1,200 total",
                    "Total Carrying Costs: $10,200 over 6 months",
                    "These costs reduce your final profit, so plan accordingly"
                  ]}
                />
              </div>
              <span className="text-blue-700 font-normal text-[10px]">
                {inputs.holdingPeriodMonths} Month{inputs.holdingPeriodMonths !== 1 ? 's' : ''} Total
              </span>
            </h3>
            <div className="space-y-3">
              {/* Monthly Interest Breakdown */}
              {inputs.rehabBudget > 0 ? (
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Loan Interest (Progressive Draws):</div>
                  <div className="bg-white rounded border border-blue-100 p-2 space-y-1 max-h-48 overflow-y-auto">
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
                          <div key={month} className="flex justify-between items-center text-xs">
                            <div className="flex flex-col">
                              <span className="text-gray-700">Month {month}</span>
                              <span className="text-[10px] text-gray-500">{drawDescription}</span>
                            </div>
                            <span className="font-semibold text-gray-900">{formatCurrency(interest)}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-xs text-gray-500">No interest payments</div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-blue-200">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Monthly Mortgage Payment</span>
                      <span className="text-[10px] text-gray-500">
                        {inputs.loanType === 'CONVENTIONAL' && inputs.includePITI 
                          ? 'PITI (Principal + Interest + Taxes + Insurance)'
                          : inputs.loanType === 'HARD_MONEY'
                            ? 'Interest-Only'
                            : 'Principal + Interest'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{formatCurrency(results.monthlyPayment)}</span>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                    {inputs.loanType === 'CONVENTIONAL' && inputs.includePITI && results.monthlyPrincipalAndInterest && (
                      <div className="mt-2 text-[10px] text-gray-600 pl-2 border-l-2 border-blue-200 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Principal + Interest:</span>
                          <span>{formatCurrency(results.monthlyPrincipalAndInterest)}</span>
                        </div>
                        {(inputs.monthlyPITITaxes || 0) > 0 && (
                          <div className="flex justify-between">
                            <span>Property Taxes:</span>
                            <span>{formatCurrency(inputs.monthlyPITITaxes || 0)}</span>
                          </div>
                        )}
                        {(inputs.monthlyPITIInsurance || 0) > 0 && (
                          <div className="flex justify-between">
                            <span>Insurance:</span>
                            <span>{formatCurrency(inputs.monthlyPITIInsurance || 0)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Monthly Mortgage Payment:</div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-blue-200">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Monthly Payment</span>
                      <span className="text-[10px] text-gray-500">Principal + Interest</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{formatCurrency(results.monthlyPayment)}</span>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Utilities and Optional Costs */}
              <div className="space-y-2 pt-2 border-t border-blue-200">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">Utilities (Electric)</span>
                    <span className="text-[10px] text-gray-500">Monthly cost</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyElectric)}</div>
                    <div className="text-[10px] text-gray-600">
                      {formatCurrency(inputs.monthlyElectric * inputs.holdingPeriodMonths)} total
                    </div>
                  </div>
                </div>
                
                {(inputs.monthlyInternet || 0) > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Internet</span>
                      <span className="text-[10px] text-gray-500">Monthly cost</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyInternet || 0)}</div>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency((inputs.monthlyInternet || 0) * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                  </div>
                )}
                
                {(inputs.monthlyPropane || 0) > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Propane</span>
                      <span className="text-[10px] text-gray-500">Monthly cost</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyPropane || 0)}</div>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency((inputs.monthlyPropane || 0) * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                  </div>
                )}
                
                {inputs.includeMonthlyInsurance && (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Insurance</span>
                      <span className="text-[10px] text-gray-500">Monthly cost</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyInsurance)}</div>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency(inputs.monthlyInsurance * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                  </div>
                )}
                
                {inputs.includeMonthlyTaxes && (
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Taxes</span>
                      <span className="text-[10px] text-gray-500">Monthly cost</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(inputs.monthlyTaxes)}</div>
                      <div className="text-[10px] text-gray-600">
                        {formatCurrency(inputs.monthlyTaxes * inputs.holdingPeriodMonths)} total
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm pt-2 border-t border-blue-100">
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">Total Monthly Utilities & Costs</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatCurrency(results.monthlyUtilitiesCost)}</div>
                    <div className="text-[10px] text-gray-600">
                      {formatCurrency(results.monthlyUtilitiesCost * inputs.holdingPeriodMonths)} total
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Total Cost */}
              <div className="flex justify-between items-center text-sm pt-2 border-t border-blue-200">
                <div className="flex flex-col">
                  <span className="text-gray-700 font-semibold">Total Monthly Cost</span>
                  <span className="text-[10px] text-gray-500">Payment + Electric (Insurance & Taxes in Payment)</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600 text-base">
                    {formatCurrency(
                      results.monthlyPayment + 
                      (inputs.includeMonthlyInsurance ? (inputs.monthlyInsurance || 0) : 0) + 
                      (inputs.includeMonthlyTaxes ? (inputs.monthlyTaxes || 0) : 0) +
                      (inputs.monthlyElectric || 0)
                    )}
                  </div>
                  <div className="text-[10px] text-gray-600">
                    per month
                  </div>
                </div>
              </div>
              
              {/* Yearly Costs (if included) */}
              {(results.yearlyWaterCost > 0 || results.yearlyDuesCost > 0) && (
                <div className="space-y-2 pt-2 border-t border-blue-200">
                  {results.yearlyWaterCost > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">Yearly Water</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.yearlyWaterCost)}</span>
                    </div>
                  )}
                  {results.yearlyDuesCost > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">Yearly Dues</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(results.yearlyDuesCost)}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Grand Total */}
              <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-blue-900 uppercase text-sm">Grand Total (Annual)</span>
                  <span className="text-[10px] text-gray-500">Includes one-time fees (water & dues)</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-700 text-lg">{formatCurrency(results.totalHoldingCosts)}</div>
                  <div className="text-xs text-blue-600 font-semibold">
                    Over {inputs.holdingPeriodMonths} month{inputs.holdingPeriodMonths !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Borrower */}
      <section className="bg-indigo-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Borrower & Active Loan</h2>
          <button onClick={onCaptureBaseline} className="text-[10px] text-blue-600 hover:text-blue-500 font-bold transition">
            Snapshot to Comparison
          </button>
        </div>
        <div className="p-6 space-y-4">
          <InputGroup 
            label="Lender Profile Name" 
            id="lenderName" 
            type="text" 
            value={inputs.lenderName} 
            onChange={(v) => onInputChange('lenderName', v)}
            helpText="Name of the lender or loan profile"
          />
          <div className="grid grid-cols-3 gap-4">
            <InputGroup 
              label="FICO" 
              id="fico" 
              value={inputs.ficoScore} 
              onChange={(v) => onInputChange('ficoScore', v)}
              helpText="Borrower's FICO credit score"
            />
            <InputGroup 
              label="Liquidity" 
              id="liq" 
              value={inputs.liquidity} 
              onChange={(v) => onInputChange('liquidity', v)} 
              prefix="$"
              helpText="Available cash on hand"
            />
            <InputGroup 
              label="Exp (Deals)" 
              id="exp" 
              value={inputs.experienceLevel} 
              onChange={(v) => onInputChange('experienceLevel', v)}
              helpText="Number of previous real estate deals completed"
            />
          </div>
          {/* Loan Type Selector */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Loan Type</label>
            <select
              className="w-full rounded-md border-gray-300 py-2 text-sm border pl-3"
              value={inputs.loanType || 'HARD_MONEY'}
              onChange={(e) => {
                const newLoanType = e.target.value as 'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO' | 'OTHER';
                const oldLoanType = inputs.loanType || 'HARD_MONEY';
                
                // Show warning if switching types (unless it's the first selection)
                if (oldLoanType !== newLoanType && oldLoanType !== '') {
                  const confirmed = window.confirm(
                    '⚠️ WARNING: Changing loan type will recalculate your entire deal.\n\n' +
                    'This will update:\n' +
                    '• Interest rate and loan term\n' +
                    '• Monthly payment calculation\n' +
                    '• Holding costs\n' +
                    '• Down payment requirements (PMI if applicable)\n' +
                    '• All profit calculations\n\n' +
                    'Continue?'
                  );
                  if (!confirmed) {
                    return; // Don't change if user cancels
                  }
                }
                
                onInputChange('loanType', newLoanType);
                
                // Auto-update ALL defaults based on loan type
                if (newLoanType !== 'OTHER') {
                  const defaults = getLoanTypeDefaults(newLoanType);
                  
                  // Update interest rate
                  onInputChange('interestRate', defaults.rate * 100);
                  
                  // Update loan term
                  onInputChange('loanTermMonths', defaults.term);
                  
                  // Update interest-only flag
                  onInputChange('interestOnly', defaults.interestOnly === true);
                  
                  // Update PITI inclusion
                  if (defaults.includesTaxInsurance === true) {
                    onInputChange('includePITI', true);
                  } else if (defaults.includesTaxInsurance === false) {
                    onInputChange('includePITI', false);
                  }
                  
                  // Update prepayment penalty
                  onInputChange('prepaymentPenalty', defaults.prepaymentPenalty);
                  
                  // Update typical points
                  if (typeof defaults.typicalPoints === 'number') {
                    onInputChange('originationPoints', defaults.typicalPoints);
                  }
                  
                  // Calculate and update typical lender fees (3% of loan for hard money, etc.)
                  if (inputs.purchasePrice > 0 || inputs.rehabBudget > 0) {
                    const totalProjectCost = (inputs.purchasePrice || 0) + (inputs.rehabBudget || 0);
                    const financingPercent = inputs.useCustomFinancing ? inputs.customFinancingPercentage : inputs.financingPercentage;
                    const estimatedLoanAmount = totalProjectCost * (financingPercent / 100);
                    const typicalFeesAmount = estimatedLoanAmount * defaults.typicalFees;
                    
                    // Distribute typical fees across lender fee fields
                    // For hard money: 3% typically split across underwriting, processing, doc prep
                    if (newLoanType === 'HARD_MONEY') {
                      onInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.4));
                      onInputChange('processingFee', Math.round(typicalFeesAmount * 0.3));
                      onInputChange('docPrepFee', Math.round(typicalFeesAmount * 0.3));
                    } else if (newLoanType === 'CONVENTIONAL') {
                      // Conventional: 1% typically in underwriting/processing
                      onInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.5));
                      onInputChange('processingFee', Math.round(typicalFeesAmount * 0.5));
                    } else if (newLoanType === 'PORTFOLIO') {
                      // Portfolio: 2% typically split
                      onInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.4));
                      onInputChange('processingFee', Math.round(typicalFeesAmount * 0.3));
                      onInputChange('docPrepFee', Math.round(typicalFeesAmount * 0.3));
                    }
                  }
                  
                  // Calculate PMI for conventional loans if down payment < 20%
                  if (newLoanType === 'CONVENTIONAL' && results.qualifiedLoanAmount > 0 && inputs.purchasePrice > 0) {
                    const downPaymentAmount = results.gapAmount || 0;
                    const downPaymentPercent = (downPaymentAmount / inputs.purchasePrice) * 100;
                    const monthlyPMI = calculatePMI(results.qualifiedLoanAmount, downPaymentPercent);
                    onInputChange('includePMI', monthlyPMI > 0);
                    onInputChange('monthlyPMI', monthlyPMI);
                  } else {
                    onInputChange('includePMI', false);
                    onInputChange('monthlyPMI', 0);
                  }
                }
              }}
            >
              <option value="HARD_MONEY">Hard Money (~12%, interest-only, 6-12 mo term)</option>
              <option value="CONVENTIONAL">Conventional (~3.5%, PITI, 30-year amortized)</option>
              <option value="PORTFOLIO">Portfolio Lender (~7%, 5-year term, varies)</option>
              <option value="OTHER">Other (custom terms)</option>
            </select>
            <div className="mt-2 space-y-1">
              {inputs.loanType === 'HARD_MONEY' && (
                <div className="text-[10px] text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                  <strong>Hard Money Assumptions:</strong> Interest-only payments, 6-12 month terms, no property taxes/insurance in payment, prepayment penalty typical, 1 point + 3% fees typical.
                </div>
              )}
              {inputs.loanType === 'CONVENTIONAL' && (
                <div className="text-[10px] text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
                  <strong>Conventional Assumptions:</strong> 30-year amortized payments, PITI includes taxes & insurance, PMI required if &lt;20% down, no prepayment penalty, minimal points/fees.
                </div>
              )}
              {inputs.loanType === 'PORTFOLIO' && (
                <div className="text-[10px] text-gray-600 bg-purple-50 p-2 rounded border border-purple-200">
                  <strong>Portfolio Assumptions:</strong> 5-year term typical (varies), amortized or interest-only (varies), PITI varies by lender, no PMI, no prepayment penalty, 2% fees typical.
                </div>
              )}
              {inputs.loanType === 'OTHER' && (
                <div className="text-[10px] text-gray-500 italic">
                  Custom loan terms. Configure all settings manually below.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <InputGroup 
                label="Rate" 
                id="rate" 
                value={inputs.interestRate} 
                onChange={(v) => onInputChange('interestRate', v)} 
                suffix="%" 
                step={0.125}
                helpText={`Annual interest rate (typical: ${inputs.loanType === 'HARD_MONEY' ? '12%' : inputs.loanType === 'CONVENTIONAL' ? '3.5%' : '6-8%'})`}
              />
              <div 
                className={`mt-2 p-2 rounded text-xs ${inputs.interestRate === 0 ? 'bg-red-100 border border-red-300 text-red-800' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'}`}
              >
                ⚠️ <strong>IMPORTANT:</strong> {inputs.interestRate === 0 
                  ? 'Interest rate is 0% (unrealistic). Monthly payment and holding costs will be $0.'
                  : inputs.loanType === 'HARD_MONEY'
                    ? 'Hard money: Interest-only payments. No property taxes/insurance in payment.'
                    : inputs.loanType === 'CONVENTIONAL'
                      ? 'Conventional: Amortized payments. PITI (taxes + insurance) included if enabled below.'
                      : 'Monthly payment and holding costs will recalculate automatically.'}
              </div>
            </div>
            <InputGroup 
              label="Points" 
              id="pts" 
              value={inputs.originationPoints} 
              onChange={(v) => onInputChange('originationPoints', v)} 
              suffix="pts"
              helpText="Origination points (percentage of loan amount)"
            />
            <InputGroup 
              label="Term" 
              id="term" 
              value={inputs.loanTermMonths} 
              onChange={(v) => onInputChange('loanTermMonths', v)} 
              suffix="mo"
              helpText={`Loan term in months (${inputs.loanType === 'HARD_MONEY' ? 'typically 12' : 'typically 360 for amortized'})`}
            />
          </div>

          {/* PITI Fields for Conventional Loans */}
          {inputs.loanType === 'CONVENTIONAL' && (
            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="includePITI"
                  checked={inputs.includePITI || false}
                  onChange={(e) => onInputChange('includePITI', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="includePITI" className="text-sm font-bold text-blue-900 cursor-pointer">
                  Include PITI in Monthly Payment
                </label>
              </div>
              <div className="text-xs text-blue-800 mb-3">
                PITI = Principal + Interest + Taxes + Insurance. Conventional loans typically include property taxes and insurance in the monthly payment.
              </div>
              {inputs.includePITI && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <InputGroup
                    label="Monthly Property Taxes (PITI)"
                    id="monthlyPITITaxes"
                    value={inputs.monthlyPITITaxes || 0}
                    onChange={(v) => onInputChange('monthlyPITITaxes', v)}
                    prefix="$"
                    helpText="Monthly property taxes included in payment"
                  />
                  <InputGroup
                    label="Monthly Insurance (PITI)"
                    id="monthlyPITIInsurance"
                    value={inputs.monthlyPITIInsurance || 0}
                    onChange={(v) => onInputChange('monthlyPITIInsurance', v)}
                    prefix="$"
                    helpText="Monthly insurance included in payment"
                  />
                </div>
              )}
              
              {/* PMI Section */}
              {results.qualifiedLoanAmount > 0 && inputs.purchasePrice > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-300">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="includePMI"
                      checked={inputs.includePMI || false}
                      onChange={(e) => {
                        onInputChange('includePMI', e.target.checked);
                        if (!e.target.checked) {
                          onInputChange('monthlyPMI', 0);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="includePMI" className="text-sm font-bold text-blue-900 cursor-pointer">
                      Include PMI (Private Mortgage Insurance)
                    </label>
                  </div>
                  <div className="text-xs text-blue-800 mb-2">
                    PMI is typically required if down payment &lt;20%. Rate: 0.5-1% of loan annually.
                  </div>
                  {inputs.includePMI && (
                    <div className="mt-2">
                      <InputGroup
                        label="Monthly PMI"
                        id="monthlyPMI"
                        value={inputs.monthlyPMI || 0}
                        onChange={(v) => onInputChange('monthlyPMI', v)}
                        prefix="$"
                        helpText="Monthly PMI cost (auto-calculated if down payment <20%)"
                      />
                      {results.gapAmount > 0 && (
                        <div className="text-[10px] text-blue-700 mt-1">
                          Down Payment: {formatCurrency(results.gapAmount)} ({((results.gapAmount / inputs.purchasePrice) * 100).toFixed(1)}%)
                          {((results.gapAmount / inputs.purchasePrice) * 100) < 20 && (
                            <span className="text-orange-600 font-semibold ml-2">⚠️ PMI typically required</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Prepayment Penalty Info */}
          {inputs.prepaymentPenalty && (
            <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800">
              ⚠️ <strong>Prepayment Penalty:</strong> This loan type typically includes a prepayment penalty. 
              {inputs.prepaymentPenaltyAmount > 0 && ` Amount: ${formatCurrency(inputs.prepaymentPenaltyAmount)}`}
            </div>
          )}

          {/* Lender Fees */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Lender Upfront Fees</h3>
            
            {/* Suggested Fees Box */}
            {suggestedLenderFees && allFeesZero && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs font-semibold text-blue-900 mb-2">
                  Suggested Lender Fees (based on 3% origination for hard money):
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-2">
                  <div>Underwriting: {formatCurrency(suggestedLenderFees.underwriting)}</div>
                  <div>Processing: {formatCurrency(suggestedLenderFees.processing)}</div>
                  <div>Doc Prep: {formatCurrency(suggestedLenderFees.docPrep)}</div>
                  <div>Wire Fee: {formatCurrency(suggestedLenderFees.wireFee)}</div>
                  <div>Other Lender Fees: {formatCurrency(suggestedLenderFees.other)}</div>
                  <div className="font-bold">TOTAL: {formatCurrency(suggestedLenderFees.pointsTotal)}</div>
                </div>
                <div className="text-[10px] text-blue-700 mb-2">
                  💡 Tip: For conventional financing, reduce to 0.5-1.5%. For portfolio lenders, set to 0%. You can adjust any line item above.
                </div>
                <button
                  type="button"
                  onClick={handleApplySuggestedFees}
                  className="w-full bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Apply Suggested Fees
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                label="Underwriting" 
                id="bUw" 
                value={inputs.underwritingFee} 
                onChange={(v) => onInputChange('underwritingFee', v)} 
                prefix="$"
                helpText="Underwriting fee charged by lender"
              />
              <InputGroup 
                label="Processing" 
                id="bPr" 
                value={inputs.processingFee} 
                onChange={(v) => onInputChange('processingFee', v)} 
                prefix="$"
                helpText="Loan processing fee"
              />
              <InputGroup 
                label="Doc Prep" 
                id="bDp" 
                value={inputs.docPrepFee} 
                onChange={(v) => onInputChange('docPrepFee', v)} 
                prefix="$"
                helpText="Document preparation fee"
              />
              <InputGroup 
                label="Wire Fee" 
                id="bWi" 
                value={inputs.wireFee} 
                onChange={(v) => onInputChange('wireFee', v)} 
                prefix="$"
                helpText="Wire transfer fee"
              />
              <div className="col-span-2">
                <InputGroup 
                  label="Other Lender Fees" 
                  id="bOt" 
                  value={inputs.otherLenderFees || 0} 
                  onChange={(v) => onInputChange('otherLenderFees', v)} 
                  prefix="$"
                  helpText="Any other lender fees not listed above"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-pink-50 rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Notes</h2>
        </div>
        <div className="p-6">
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm border p-3 min-h-[100px]"
            value={inputs.notes}
            onChange={(e) => onInputChange('notes', e.target.value)}
            placeholder="Renovation details..."
          />
        </div>
      </section>
    </div>
  );
};

