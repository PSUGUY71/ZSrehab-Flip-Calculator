import React from 'react';
import { LoanInputs } from '../types';
import { InputGroup } from './InputGroup';

interface InputSectionsProps {
  inputs: LoanInputs;
  onInputChange: (field: keyof LoanInputs, value: string | number) => void;
  onCaptureBaseline: () => void;
}

export const InputSections: React.FC<InputSectionsProps> = ({
  inputs,
  onInputChange,
  onCaptureBaseline,
}) => {
  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Property Info */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Property Information</h2>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
            Lender: {inputs.lenderName}
          </span>
        </div>
        <div className="p-6 space-y-4">
          <InputGroup label="Property Address" id="address" type="text" value={inputs.address} onChange={(v) => onInputChange('address', v)} />
          <div className="grid grid-cols-3 gap-4">
            <InputGroup label="State" id="state" type="text" value={inputs.state} onChange={(v) => onInputChange('state', v)} />
            <InputGroup label="Zip Code" id="zip" type="text" value={inputs.zipCode} onChange={(v) => onInputChange('zipCode', v)} />
            <InputGroup label="Sq. Footage" id="sqft" value={inputs.sqFt} onChange={(v) => onInputChange('sqFt', v)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputGroup label="Beds" id="beds" value={inputs.beds} onChange={(v) => onInputChange('beds', v)} />
            <InputGroup label="Baths" id="baths" value={inputs.baths} onChange={(v) => onInputChange('baths', v)} step={0.5} />
            <InputGroup label="Units" id="units" value={inputs.units} onChange={(v) => onInputChange('units', v)} />
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Economics</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup label="Purchase Price" id="pp" value={inputs.purchasePrice} onChange={(v) => onInputChange('purchasePrice', v)} prefix="$" />
            <InputGroup label="After Repair Value" id="arv" value={inputs.arv} onChange={(v) => onInputChange('arv', v)} prefix="$" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup label="Rehab Budget" id="rehab" value={inputs.rehabBudget} onChange={(v) => onInputChange('rehabBudget', v)} prefix="$" />
            <InputGroup label="As-Is Value" id="aiv" value={inputs.asIsValue} onChange={(v) => onInputChange('asIsValue', v)} prefix="$" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <InputGroup label="Seller Concession" id="sc" value={inputs.sellerConcessionRate} onChange={(v) => onInputChange('sellerConcessionRate', v)} suffix="%" step={0.5} />
            <InputGroup label="Earnest Deposit" id="emd" value={inputs.earnestMoneyDeposit} onChange={(v) => onInputChange('earnestMoneyDeposit', v)} prefix="$" />
            <InputGroup label="Buyer Agent Comm." id="bac" value={inputs.buyerAgentCommissionRate} onChange={(v) => onInputChange('buyerAgentCommissionRate', v)} suffix="%" step={0.25} />
          </div>
        </div>
      </section>

      {/* Seller Side Analysis */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Seller Side Analysis</h2>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <InputGroup label="Seller Mortgage Bal." id="smb" value={inputs.sellerMortgageBalance} onChange={(v) => onInputChange('sellerMortgageBalance', v)} prefix="$" />
          <InputGroup label="Seller Misc Fees" id="smf" value={inputs.sellerMiscFees} onChange={(v) => onInputChange('sellerMiscFees', v)} prefix="$" />
        </div>
      </section>

      {/* Detailed HUD */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Detailed HUD / Settlement</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup label="Transfer Tax %" id="tt" value={inputs.transferTaxRate} onChange={(v) => onInputChange('transferTaxRate', v)} suffix="%" />
            <InputGroup label="Title Ins. %" id="ti" value={inputs.titleInsuranceRate} onChange={(v) => onInputChange('titleInsuranceRate', v)} suffix="%" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputGroup label="Legal/Settlement" id="ls" value={inputs.legalSettlementFees} onChange={(v) => onInputChange('legalSettlementFees', v)} prefix="$" />
            <InputGroup label="Recording" id="rec" value={inputs.recordingFees} onChange={(v) => onInputChange('recordingFees', v)} prefix="$" />
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Walker & Walker Fees</h3>
            <div className="grid grid-cols-3 gap-4">
              <InputGroup label="Doc Prep" id="wdp" value={inputs.walkerDocPrep} onChange={(v) => onInputChange('walkerDocPrep', v)} prefix="$" />
              <InputGroup label="Overnight" id="won" value={inputs.walkerOvernight} onChange={(v) => onInputChange('walkerOvernight', v)} prefix="$" />
              <InputGroup label="Wire" id="wwi" value={inputs.walkerWire} onChange={(v) => onInputChange('walkerWire', v)} prefix="$" />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">HOA / Community Fees</h3>
            <div className="grid grid-cols-2 gap-6">
              <InputGroup label="Hideout Transfer" id="ht" value={inputs.hideoutTransferFee} onChange={(v) => onInputChange('hideoutTransferFee', v)} prefix="$" />
              <InputGroup label="Hideout Annual" id="ha" value={inputs.hideoutAnnualFee} onChange={(v) => onInputChange('hideoutAnnualFee', v)} prefix="$" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputGroup label="Roamingwood (Ann.)" id="ra" value={inputs.roamingwoodAnnual} onChange={(v) => onInputChange('roamingwoodAnnual', v)} prefix="$" />
              <InputGroup label="School Tax (Ann.)" id="sa" value={inputs.schoolTaxAnnual} onChange={(v) => onInputChange('schoolTaxAnnual', v)} prefix="$" />
            </div>
          </div>
        </div>
      </section>

      {/* Exit Strategy */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Exit Strategy</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Holding Months" id="hold" value={inputs.holdingPeriodMonths} onChange={(v) => onInputChange('holdingPeriodMonths', v)} />
            <InputGroup label="Mo. Electric" id="elec" value={inputs.monthlyElectric} onChange={(v) => onInputChange('monthlyElectric', v)} prefix="$" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-100">
            <InputGroup label="Commission %" id="comm" value={inputs.sellingCommissionRate} onChange={(v) => onInputChange('sellingCommissionRate', v)} suffix="%" />
            <InputGroup label="Transfer Tax %" id="stt" value={inputs.sellingTransferTaxRate} onChange={(v) => onInputChange('sellingTransferTaxRate', v)} suffix="%" />
          </div>
        </div>
      </section>

      {/* Borrower */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800 uppercase">Borrower & Active Loan</h2>
          <button onClick={onCaptureBaseline} className="text-[10px] text-blue-600 hover:text-blue-500 font-bold transition">
            Snapshot to Comparison
          </button>
        </div>
        <div className="p-6 space-y-4">
          <InputGroup label="Lender Profile Name" id="lenderName" type="text" value={inputs.lenderName} onChange={(v) => onInputChange('lenderName', v)} />
          <div className="grid grid-cols-3 gap-4">
            <InputGroup label="FICO" id="fico" value={inputs.ficoScore} onChange={(v) => onInputChange('ficoScore', v)} />
            <InputGroup label="Liquidity" id="liq" value={inputs.liquidity} onChange={(v) => onInputChange('liquidity', v)} prefix="$" />
            <InputGroup label="Exp (Deals)" id="exp" value={inputs.experienceLevel} onChange={(v) => onInputChange('experienceLevel', v)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputGroup label="Rate" id="rate" value={inputs.interestRate} onChange={(v) => onInputChange('interestRate', v)} suffix="%" step={0.125} />
            <InputGroup label="Points" id="pts" value={inputs.originationPoints} onChange={(v) => onInputChange('originationPoints', v)} suffix="pts" />
            <InputGroup label="Term" id="term" value={inputs.loanTermMonths} onChange={(v) => onInputChange('loanTermMonths', v)} suffix="mo" />
          </div>

          {/* Lender Fees */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Lender Upfront Fees</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Underwriting" id="bUw" value={inputs.underwritingFee} onChange={(v) => onInputChange('underwritingFee', v)} prefix="$" />
              <InputGroup label="Processing" id="bPr" value={inputs.processingFee} onChange={(v) => onInputChange('processingFee', v)} prefix="$" />
              <InputGroup label="Doc Prep" id="bDp" value={inputs.docPrepFee} onChange={(v) => onInputChange('docPrepFee', v)} prefix="$" />
              <InputGroup label="Wire Fee" id="bWi" value={inputs.wireFee} onChange={(v) => onInputChange('wireFee', v)} prefix="$" />
              <div className="col-span-2">
                <InputGroup label="Other Lender Fees" id="bOt" value={inputs.otherLenderFees || 0} onChange={(v) => onInputChange('otherLenderFees', v)} prefix="$" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
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

