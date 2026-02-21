import React, { useMemo } from 'react';
import { LoanInputs, SavedDeal } from '../types';
import { calculateLoan, formatCurrency, formatPercent } from '../utils/calculations';

interface SharedDealViewProps {
  dealData: {
    name: string;
    date: string;
    data: LoanInputs;
    sharedBy?: string;
    sharedAt?: string;
  };
  onClose: () => void;
}

export const SharedDealView: React.FC<SharedDealViewProps> = ({ dealData, onClose }) => {
  const results = useMemo(() => calculateLoan(dealData.data), [dealData.data]);
  const inputs = dealData.data;

  const profitColor = results.netProfit >= 0 ? 'text-green-600' : 'text-red-600';
  const profitBg = results.netProfit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="bg-gray-900 text-white rounded-t-xl p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-gray-700 text-white p-2 rounded-lg font-bold tracking-tighter text-xl">ZS</div>
              <div>
                <h1 className="text-2xl font-bold">Shared Deal Analysis</h1>
                <p className="text-amber-300 text-sm font-medium">ZS Rehab Flip Calculator</p>
              </div>
            </div>
            {dealData.sharedBy && (
              <p className="text-gray-400 text-xs mt-2">Shared by: {dealData.sharedBy}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.198-.54-1.214-1.201l.228-2.267m7.144 0h-7.144" />
              </svg>
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Deal Name & Date */}
        <div className="bg-white border-x border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{dealData.name}</h2>
          <p className="text-sm text-gray-500">
            {dealData.date}
            {inputs.address && <span className="ml-2">• {inputs.address}</span>}
            {inputs.selectedState && <span className="ml-2">• {inputs.selectedState}</span>}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="bg-white border-x border-gray-200 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`rounded-lg p-4 border ${profitBg}`}>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Net Profit</div>
            <div className={`text-2xl font-bold ${profitColor}`}>{formatCurrency(results.netProfit)}</div>
          </div>
          <div className="rounded-lg p-4 border bg-blue-50 border-blue-200">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">ROI</div>
            <div className="text-2xl font-bold text-blue-700">{formatPercent(results.roi)}</div>
          </div>
          <div className="rounded-lg p-4 border bg-gray-50 border-gray-200">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Cash Required</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalPaidOut)}</div>
          </div>
          <div className="rounded-lg p-4 border bg-amber-50 border-amber-200">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">ARV</div>
            <div className="text-2xl font-bold text-amber-700">{formatCurrency(inputs.arv)}</div>
          </div>
        </div>

        {/* Deal Details */}
        <div className="bg-white border-x border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Deal Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            <DetailRow label="Purchase Price" value={formatCurrency(inputs.purchasePrice)} />
            <DetailRow label="ARV" value={formatCurrency(inputs.arv)} />
            <DetailRow label="Rehab Budget" value={formatCurrency(inputs.rehabBudget)} />
            <DetailRow label="Sq Ft" value={inputs.sqFt?.toLocaleString() || '—'} />
            <DetailRow label="Beds / Baths" value={`${inputs.beds || '—'} / ${inputs.baths || '—'}`} />
            <DetailRow label="Hold Period" value={`${inputs.rehabMonths || 0} months`} />
          </div>
        </div>

        {/* Financing Details */}
        <div className="bg-white border-x border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Financing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            <DetailRow label="Lender" value={inputs.lenderName || '—'} />
            <DetailRow label="Loan Amount" value={formatCurrency(results.qualifiedLoanAmount)} />
            <DetailRow label="Interest Rate" value={`${inputs.interestRate}%`} />
            <DetailRow label="Loan Points" value={`${inputs.loanPoints} pts`} />
            <DetailRow label="LTV" value={formatPercent(results.ltv)} />
            <DetailRow label="LTC" value={formatPercent(results.ltc)} />
            <DetailRow label="LTARV" value={formatPercent(results.ltarv)} />
            <DetailRow label="Monthly Payment" value={formatCurrency(results.monthlyPayment)} />
          </div>
        </div>

        {/* Costs Breakdown */}
        <div className="bg-white border-x border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Costs Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            <DetailRow label="Total Lender Fees" value={formatCurrency(results.totalLenderFees)} />
            <DetailRow label="Total Third Party Fees" value={formatCurrency(results.totalThirdPartyFees)} />
            <DetailRow label="Total Closing Costs" value={formatCurrency(results.totalClosingCosts)} />
            <DetailRow label="Total Holding Costs" value={formatCurrency(results.totalHoldingCosts)} />
            <DetailRow label="Total Exit Costs" value={formatCurrency(results.totalExitCosts)} />
            <DetailRow label="Cash to Close" value={formatCurrency(results.totalCashToClose)} />
          </div>
        </div>

        {/* Profitability */}
        <div className="bg-white border-x border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Profitability Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            <DetailRow label="Gross Profit" value={formatCurrency(results.closingTableProfit || 0)} highlight />
            <DetailRow label="Net Profit" value={formatCurrency(results.netProfit)} highlight={results.netProfit >= 0} warn={results.netProfit < 0} />
            <DetailRow label="ROI" value={formatPercent(results.roi)} highlight />
            <DetailRow label="70% Rule" value={results.passes70Rule ? '✅ Pass' : '❌ Fail'} />
            <DetailRow label="Max Offer (70%)" value={formatCurrency(results.maxPurchasePrice70Rule)} />
            <DetailRow label="Profit/SqFt" value={inputs.sqFt ? formatCurrency(results.netProfit / inputs.sqFt) : '—'} />
          </div>
        </div>

        {/* Viability */}
        <div className={`border-x border-b rounded-b-xl px-6 py-4 ${results.netProfit >= 25000 ? 'bg-green-50 border-green-200' : results.netProfit >= 0 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {results.netProfit >= 25000 ? '🟢' : results.netProfit >= 0 ? '🟡' : '🔴'}
            </span>
            <div>
              <h3 className="font-bold text-gray-900">
                {results.netProfit >= 25000 ? 'Strong Deal' : results.netProfit >= 0 ? 'Marginal Deal' : 'Unprofitable Deal'}
              </h3>
              <p className="text-sm text-gray-600">
                {results.netProfit >= 25000
                  ? 'This deal meets minimum profit thresholds for a flip.'
                  : results.netProfit >= 0
                    ? 'This deal has thin margins. Review assumptions carefully.'
                    : 'This deal shows a loss at current assumptions.'}
              </p>
            </div>
          </div>
        </div>

        {/* Read-only watermark */}
        <div className="text-center mt-6 text-gray-400 text-xs">
          <p>🔒 This is a read-only shared view. Numbers are recalculated from deal inputs.</p>
          <p className="mt-1">Generated by ZS Rehab Flip Calculator</p>
        </div>
      </div>
    </div>
  );
};

// Helper component
const DetailRow: React.FC<{ label: string; value: string; highlight?: boolean; warn?: boolean }> = ({
  label,
  value,
  highlight,
  warn,
}) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className={`text-sm font-semibold ${warn ? 'text-red-600' : highlight ? 'text-green-700' : 'text-gray-900'}`}>
      {value}
    </span>
  </div>
);
