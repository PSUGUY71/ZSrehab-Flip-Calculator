import React from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { InputGroup } from './InputGroup';
import { formatCurrency } from '../utils/calculations';

interface InputSectionsProps {
  inputs: LoanInputs;
  results: CalculatedResults;
  maxOfferResults: CalculatedResults;
  maxOfferLTVPercent: number;
  onMaxOfferLTVChange: (percent: number) => void;
  onInputChange: (field: keyof LoanInputs, value: string | number) => void;
  onCaptureBaseline: () => void;
}

export const InputSections: React.FC<InputSectionsProps> = ({
  inputs,
  results,
  maxOfferResults,
  maxOfferLTVPercent,
  onMaxOfferLTVChange,
  onInputChange,
  onCaptureBaseline,
}) => {
  const ltvOptions = [
    { label: '60%', value: 0.60 },
    { label: '65%', value: 0.65 },
    { label: '70%', value: 0.70 },
    { label: '75%', value: 0.75 },
  ];
  return (
    <div className="w-full lg:w-1/2 space-y-6">
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
                onChange={(e) => onInputChange('state', e.target.value)}
              >
                <option value="PA">PA</option>
                <option value="NJ">NJ</option>
                <option value="NY">NY</option>
              </select>
            </div>
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
            <InputGroup 
              label="Rehab Budget" 
              id="rehab" 
              value={inputs.rehabBudget} 
              onChange={(v) => onInputChange('rehabBudget', v)} 
              prefix="$"
              helpText="Total budget for renovations and repairs"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
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
            <InputGroup 
              label="As-Is Value" 
              id="asis" 
              value={inputs.asIsValue} 
              onChange={(v) => onInputChange('asIsValue', v)} 
              prefix="$"
              helpText="Current value of the property before renovations"
            />
          </div>
          {/* Max Offer Analysis */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Max Offer Analysis (75% Main ARV)</h3>
            <div className="mb-3">
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
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${exceedsMax ? 'text-red-700' : 'text-gray-700'}`}>Max Allowable Offer</span>
                    <span className={`text-lg font-bold ${exceedsMax ? 'text-red-600' : 'text-blue-600'}`}>{formatCurrency(maxOfferResults.maxAllowableOffer)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Max Loan ({Math.round(maxOfferLTVPercent * 100)}% of ARV)</span>
                    <span>{formatCurrency(maxOfferResults.maxLoanAmountDollars)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Less: Rehab Budget</span>
                    <span>-{formatCurrency(inputs.rehabBudget)}</span>
                  </div>
                  {exceedsMax && (
                    <div className="bg-red-100 border border-red-300 rounded p-2 space-y-2">
                      <div className="text-xs text-red-700 font-semibold text-center">
                        ⚠️ Current Purchase Price ({formatCurrency(inputs.purchasePrice)}) exceeds Max Allowable Offer
                      </div>
                      <div className="text-[10px] text-red-600 font-medium mt-2">Required ARV to make this deal work (Purchase Price: {formatCurrency(inputs.purchasePrice)}):</div>
                      <div className="grid grid-cols-2 gap-1.5 mt-1">
                        {ltvOptions.map((option) => {
                          const requiredARV = calculateRequiredARV(option.value);
                          const currentARV = inputs.arv || 0;
                          const difference = requiredARV - currentARV; // How much higher ARV needs to be
                          return (
                            <div key={option.value} className="bg-white border border-red-200 rounded p-1.5">
                              <div className="text-[9px] text-red-600 font-semibold">{option.label} ARV:</div>
                              <div className="text-[10px] text-red-700 font-bold">{formatCurrency(requiredARV)}</div>
                              {currentARV > 0 && difference !== 0 && (
                                <div className={`text-[9px] font-semibold ${difference > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                  {difference > 0 ? `+${formatCurrency(difference)} higher` : `${formatCurrency(difference)} lower`}
                                </div>
                              )}
                              {currentARV > 0 && difference === 0 && (
                                <div className="text-[9px] text-green-600 font-semibold">✓ Current ARV works</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-[9px] text-red-600 mt-1.5 text-center border-t border-red-200 pt-1.5">
                        Current Est. ARV: {formatCurrency(inputs.arv || 0)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
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
              helpText="Note: Title insurance is now calculated using PA Title Insurance Rate Table based on total loan amount (purchase + rehab). This field is kept for reference only."
            />
            <InputGroup
              label="CPL Fee" 
              id="cpl" 
              value={inputs.cplFee} 
              onChange={(v) => onInputChange('cplFee', v)} 
              prefix="$" 
              helpText="CPL (Certificate of Property Location) fee - always $125 payable directly to Penn Attorneys"
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
            <InputGroup 
              label="Transfer Tax Rate" 
              id="tt" 
              value={inputs.transferTaxRate} 
              onChange={(v) => onInputChange('transferTaxRate', v)} 
              suffix="%"
              helpText="Transfer tax rate as a percentage of purchase price"
            />
          </div>
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
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="Hideout Transfer" 
              id="ht" 
              value={inputs.hideoutTransferFee} 
              onChange={(v) => onInputChange('hideoutTransferFee', v)} 
              prefix="$"
              helpText="Hideout community transfer fee"
            />
            <InputGroup 
              label="Dues (Ann.)" 
              id="ha" 
              value={inputs.hideoutAnnualFee} 
              onChange={(v) => onInputChange('hideoutAnnualFee', v)} 
              prefix="$"
              helpText="Dues annual amount (prorated Jan-Dec)"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup 
              label="City/Town Taxes (Ann.)" 
              id="ra" 
              value={inputs.roamingwoodAnnual} 
              onChange={(v) => onInputChange('roamingwoodAnnual', v)} 
              prefix="$"
              helpText="City/town taxes annual amount (prorated Jan-Dec)"
            />
            <InputGroup 
              label="School Tax (Ann.)" 
              id="sa" 
              value={inputs.schoolTaxAnnual} 
              onChange={(v) => onInputChange('schoolTaxAnnual', v)}
              prefix="$"
              helpText="School tax annual amount (prorated Jul-Jun)"
            />
            <InputGroup
              label="Sewer & Water (Ann.)"
              id="sewerWaterAnnual"
              value={inputs.sewerWaterAnnual} 
              onChange={(v) => onInputChange('sewerWaterAnnual', v)}
              prefix="$"
              helpText="Sewer and water annual amount (prorated quarterly)"
            />
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
              onChange={(v) => onInputChange('monthlyElectric', v)} 
              prefix="$"
              helpText="Monthly electric utility cost during holding period"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-100">
            <InputGroup 
              label="Commission %" 
              id="comm" 
              value={inputs.sellingCommissionRate} 
              onChange={(v) => onInputChange('sellingCommissionRate', v)} 
              suffix="%"
              helpText="Real estate commission rate when selling"
            />
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
          <div className="grid grid-cols-3 gap-4">
            <InputGroup 
              label="Rate" 
              id="rate" 
              value={inputs.interestRate} 
              onChange={(v) => onInputChange('interestRate', v)} 
              suffix="%" 
              step={0.125}
              helpText="Annual interest rate on the loan"
            />
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
              helpText="Loan term in months"
            />
          </div>

          {/* Lender Fees */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Lender Upfront Fees</h3>
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

