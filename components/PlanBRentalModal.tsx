import React, { useState, useMemo } from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

type StrategyTab = 'ltr' | 'str';

interface RentalInputs {
  // LTR (Long-Term Rental)
  monthlyRent: number;
  vacancyRate: number; // percent
  managementFeeRate: number; // percent
  monthlyRepairsMaintenance: number;
  monthlyCapEx: number; // Capital expenditures reserve
  annualInsurance: number;
  annualPropertyTax: number;
  monthlyHOA: number;
  monthlyUtilitiesLandlord: number; // Utilities paid by landlord

  // STR (Short-Term Rental)
  nightlyRate: number;
  avgOccupancyRate: number; // percent
  platformFeeRate: number; // percent (Airbnb ~3%, VRBO ~5%)
  monthlyCleaningCost: number;
  monthlySupplies: number; // Linens, toiletries, etc.
  monthlyUtilitiesSTR: number; // Higher utilities for STR
  annualInsuranceSTR: number; // STR-specific insurance (higher)
  annualPropertyTaxSTR: number;
  monthlyHOASTR: number;
  monthlyManagementSTR: number; // STR management (if applicable)
  monthlyWifi: number;
  furnishingBudget: number; // One-time furnishing cost
}

const DEFAULT_RENTAL_INPUTS: RentalInputs = {
  // LTR defaults
  monthlyRent: 0,
  vacancyRate: 8,
  managementFeeRate: 10,
  monthlyRepairsMaintenance: 150,
  monthlyCapEx: 100,
  annualInsurance: 1200,
  annualPropertyTax: 2400,
  monthlyHOA: 0,
  monthlyUtilitiesLandlord: 0,

  // STR defaults
  nightlyRate: 0,
  avgOccupancyRate: 65,
  platformFeeRate: 3,
  monthlyCleaningCost: 400,
  monthlySupplies: 100,
  monthlyUtilitiesSTR: 250,
  annualInsuranceSTR: 2400,
  annualPropertyTaxSTR: 2400,
  monthlyHOASTR: 0,
  monthlyManagementSTR: 0,
  monthlyWifi: 75,
  furnishingBudget: 5000,
};

// ─── Props ───────────────────────────────────────────────────────────

interface PlanBRentalModalProps {
  dealInputs: LoanInputs;
  dealResults: CalculatedResults;
  onClose: () => void;
}

// ─── Helper ──────────────────────────────────────────────────────────

const InputField: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
  hint?: string;
}> = ({ label, value, onChange, prefix, suffix, step = '1', hint }) => (
  <div>
    <label className="text-[10px] font-semibold text-gray-500 uppercase block">{label}</label>
    <div className="flex items-center mt-1">
      {prefix && <span className="text-xs text-gray-500 mr-1">{prefix}</span>}
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        min="0"
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      {suffix && <span className="text-xs text-gray-500 ml-1">{suffix}</span>}
    </div>
    {hint && <div className="text-[9px] text-gray-400 mt-0.5">{hint}</div>}
  </div>
);

const MetricCard: React.FC<{
  label: string;
  value: string;
  sublabel?: string;
  color?: string;
}> = ({ label, value, sublabel, color = 'text-gray-900' }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
    <div className="text-[10px] font-semibold text-gray-500 uppercase">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
    {sublabel && <div className="text-[9px] text-gray-400 mt-0.5">{sublabel}</div>}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────

export const PlanBRentalModal: React.FC<PlanBRentalModalProps> = ({
  dealInputs,
  dealResults,
  onClose,
}) => {
  const [tab, setTab] = useState<StrategyTab>('ltr');
  const [rental, setRental] = useState<RentalInputs>(() => ({
    ...DEFAULT_RENTAL_INPUTS,
    annualPropertyTax: dealInputs.monthlyTaxes ? dealInputs.monthlyTaxes * 12 : 2400,
    annualInsurance: dealInputs.monthlyInsurance ? dealInputs.monthlyInsurance * 12 : 1200,
    annualPropertyTaxSTR: dealInputs.monthlyTaxes ? dealInputs.monthlyTaxes * 12 : 2400,
    annualInsuranceSTR: dealInputs.monthlyInsurance ? dealInputs.monthlyInsurance * 12 * 1.5 : 2400,
  }));

  const updateRental = (field: keyof RentalInputs, value: number) => {
    setRental(prev => ({ ...prev, [field]: value }));
  };

  // ─── LTR Calculations ───
  const ltrMetrics = useMemo(() => {
    const grossMonthlyRent = rental.monthlyRent;
    const grossAnnualRent = grossMonthlyRent * 12;

    const vacancyLoss = grossAnnualRent * (rental.vacancyRate / 100);
    const effectiveGrossIncome = grossAnnualRent - vacancyLoss;

    const managementFee = effectiveGrossIncome * (rental.managementFeeRate / 100);
    const annualRepairs = rental.monthlyRepairsMaintenance * 12;
    const annualCapEx = rental.monthlyCapEx * 12;
    const annualHOA = rental.monthlyHOA * 12;
    const annualLandlordUtilities = rental.monthlyUtilitiesLandlord * 12;

    const totalOperatingExpenses =
      rental.annualInsurance +
      rental.annualPropertyTax +
      managementFee +
      annualRepairs +
      annualCapEx +
      annualHOA +
      annualLandlordUtilities;

    const noi = effectiveGrossIncome - totalOperatingExpenses;
    const monthlyNOI = noi / 12;

    // Debt service (from current deal's loan)
    const annualDebtService = dealResults.monthlyPayment * 12;
    const monthlyCashFlow = monthlyNOI - dealResults.monthlyPayment;
    const annualCashFlow = monthlyCashFlow * 12;

    // Ratios
    const totalInvestment = dealInputs.purchasePrice + dealInputs.rehabBudget;
    const capRate = totalInvestment > 0 ? (noi / totalInvestment) * 100 : 0;
    const cashOnCash = dealResults.totalCashInvested > 0 ? (annualCashFlow / dealResults.totalCashInvested) * 100 : 0;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
    const grm = grossAnnualRent > 0 ? totalInvestment / grossAnnualRent : 0;
    const expenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
    const onePercentRule = totalInvestment > 0 ? (grossMonthlyRent / totalInvestment) * 100 : 0;
    const breakEvenOccupancy = grossAnnualRent > 0
      ? ((totalOperatingExpenses + annualDebtService) / grossAnnualRent) * 100
      : 0;

    return {
      grossMonthlyRent,
      grossAnnualRent,
      vacancyLoss,
      effectiveGrossIncome,
      managementFee,
      annualRepairs,
      annualCapEx,
      annualHOA,
      annualLandlordUtilities,
      totalOperatingExpenses,
      noi,
      monthlyNOI,
      annualDebtService,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCash,
      dscr,
      grm,
      expenseRatio,
      onePercentRule,
      breakEvenOccupancy,
      totalInvestment,
    };
  }, [rental, dealResults, dealInputs]);

  // ─── STR Calculations ───
  const strMetrics = useMemo(() => {
    const daysPerMonth = 30.44;
    const bookedNightsPerMonth = daysPerMonth * (rental.avgOccupancyRate / 100);
    const grossMonthlyRevenue = rental.nightlyRate * bookedNightsPerMonth;
    const grossAnnualRevenue = grossMonthlyRevenue * 12;

    const platformFees = grossAnnualRevenue * (rental.platformFeeRate / 100);
    const effectiveGrossIncome = grossAnnualRevenue - platformFees;

    const annualCleaning = rental.monthlyCleaningCost * 12;
    const annualSupplies = rental.monthlySupplies * 12;
    const annualUtilities = rental.monthlyUtilitiesSTR * 12;
    const annualHOA = rental.monthlyHOASTR * 12;
    const annualManagement = rental.monthlyManagementSTR * 12;
    const annualWifi = rental.monthlyWifi * 12;

    const totalOperatingExpenses =
      rental.annualInsuranceSTR +
      rental.annualPropertyTaxSTR +
      annualCleaning +
      annualSupplies +
      annualUtilities +
      annualHOA +
      annualManagement +
      annualWifi;

    const noi = effectiveGrossIncome - totalOperatingExpenses;
    const monthlyNOI = noi / 12;

    const annualDebtService = dealResults.monthlyPayment * 12;
    const monthlyCashFlow = monthlyNOI - dealResults.monthlyPayment;
    const annualCashFlow = monthlyCashFlow * 12;

    const totalInvestment = dealInputs.purchasePrice + dealInputs.rehabBudget + rental.furnishingBudget;
    const capRate = totalInvestment > 0 ? (noi / totalInvestment) * 100 : 0;
    const cashOnCash = dealResults.totalCashInvested > 0
      ? (annualCashFlow / (dealResults.totalCashInvested + rental.furnishingBudget)) * 100 : 0;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
    const expenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
    const revenuePerNight = rental.nightlyRate;
    const bookedNightsPerYear = Math.round(bookedNightsPerMonth * 12);
    const breakEvenNightlyRate = bookedNightsPerYear > 0
      ? (totalOperatingExpenses + annualDebtService + platformFees) / bookedNightsPerYear
      : 0;

    return {
      bookedNightsPerMonth: Math.round(bookedNightsPerMonth),
      bookedNightsPerYear,
      grossMonthlyRevenue,
      grossAnnualRevenue,
      platformFees,
      effectiveGrossIncome,
      annualCleaning,
      annualSupplies,
      annualUtilities,
      annualHOA,
      annualManagement,
      annualWifi,
      totalOperatingExpenses,
      noi,
      monthlyNOI,
      annualDebtService,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCash,
      dscr,
      expenseRatio,
      totalInvestment,
      revenuePerNight,
      breakEvenNightlyRate,
    };
  }, [rental, dealResults, dealInputs]);

  // ─── Comparison Summary ───
  const comparison = useMemo(() => {
    const flipProfit = dealResults.netProfit;
    const flipROI = dealResults.roi;
    const flipTimeline = dealInputs.holdingPeriodMonths;
    const ltrAnnual = ltrMetrics.annualCashFlow;
    const strAnnual = strMetrics.annualCashFlow;
    const yearsToMatchFlip_LTR = ltrAnnual > 0 ? flipProfit / ltrAnnual : Infinity;
    const yearsToMatchFlip_STR = strAnnual > 0 ? flipProfit / strAnnual : Infinity;

    return { flipProfit, flipROI, flipTimeline, ltrAnnual, strAnnual, yearsToMatchFlip_LTR, yearsToMatchFlip_STR };
  }, [dealResults, dealInputs, ltrMetrics, strMetrics]);

  const activeMetrics = tab === 'ltr' ? ltrMetrics : strMetrics;
  const cashFlowColor = (tab === 'ltr' ? ltrMetrics.monthlyCashFlow : strMetrics.monthlyCashFlow) >= 0 ? 'text-green-700' : 'text-red-600';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold">📊 Plan B — Rental & STR Analysis</h2>
            <p className="text-xs text-gray-300 mt-0.5">
              What if you hold instead of flip? Compare long-term rental vs. short-term rental strategies.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tab Switcher */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setTab('ltr')}
              className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                tab === 'ltr' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏠 Long-Term Rental (LTR)
            </button>
            <button
              onClick={() => setTab('str')}
              className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                tab === 'str' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏖️ Short-Term Rental (STR)
            </button>
          </div>

          {/* LTR Tab */}
          {tab === 'ltr' && (
            <div className="space-y-5">
              {/* Income Inputs */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-green-800 uppercase mb-3">Rental Income</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <InputField label="Monthly Rent" value={rental.monthlyRent} onChange={(v) => updateRental('monthlyRent', v)} prefix="$" hint="Market rent for this property" />
                  <InputField label="Vacancy Rate" value={rental.vacancyRate} onChange={(v) => updateRental('vacancyRate', v)} suffix="%" step="0.5" hint="8% typical" />
                  <InputField label="Management Fee" value={rental.managementFeeRate} onChange={(v) => updateRental('managementFeeRate', v)} suffix="%" step="0.5" hint="8-12% typical" />
                </div>
              </div>

              {/* Operating Expenses */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Operating Expenses</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <InputField label="Annual Insurance" value={rental.annualInsurance} onChange={(v) => updateRental('annualInsurance', v)} prefix="$" />
                  <InputField label="Annual Property Tax" value={rental.annualPropertyTax} onChange={(v) => updateRental('annualPropertyTax', v)} prefix="$" />
                  <InputField label="Monthly Repairs" value={rental.monthlyRepairsMaintenance} onChange={(v) => updateRental('monthlyRepairsMaintenance', v)} prefix="$" hint="Maintenance reserve" />
                  <InputField label="Monthly CapEx" value={rental.monthlyCapEx} onChange={(v) => updateRental('monthlyCapEx', v)} prefix="$" hint="Roof, HVAC, etc." />
                  <InputField label="Monthly HOA/Dues" value={rental.monthlyHOA} onChange={(v) => updateRental('monthlyHOA', v)} prefix="$" />
                  <InputField label="Monthly Utilities" value={rental.monthlyUtilitiesLandlord} onChange={(v) => updateRental('monthlyUtilitiesLandlord', v)} prefix="$" hint="If landlord-paid" />
                </div>
              </div>
            </div>
          )}

          {/* STR Tab */}
          {tab === 'str' && (
            <div className="space-y-5">
              {/* Revenue Inputs */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-purple-800 uppercase mb-3">STR Revenue</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <InputField label="Nightly Rate" value={rental.nightlyRate} onChange={(v) => updateRental('nightlyRate', v)} prefix="$" hint="Average nightly price" />
                  <InputField label="Occupancy Rate" value={rental.avgOccupancyRate} onChange={(v) => updateRental('avgOccupancyRate', v)} suffix="%" step="1" hint="65% avg on Airbnb" />
                  <InputField label="Platform Fee" value={rental.platformFeeRate} onChange={(v) => updateRental('platformFeeRate', v)} suffix="%" step="0.5" hint="Airbnb ~3%, VRBO ~5%" />
                </div>
              </div>

              {/* STR Operating Expenses */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Operating Expenses</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <InputField label="Annual Insurance" value={rental.annualInsuranceSTR} onChange={(v) => updateRental('annualInsuranceSTR', v)} prefix="$" hint="STR insurance (higher)" />
                  <InputField label="Annual Property Tax" value={rental.annualPropertyTaxSTR} onChange={(v) => updateRental('annualPropertyTaxSTR', v)} prefix="$" />
                  <InputField label="Monthly Cleaning" value={rental.monthlyCleaningCost} onChange={(v) => updateRental('monthlyCleaningCost', v)} prefix="$" hint="Turnover cleaning" />
                  <InputField label="Monthly Supplies" value={rental.monthlySupplies} onChange={(v) => updateRental('monthlySupplies', v)} prefix="$" hint="Linens, toiletries" />
                  <InputField label="Monthly Utilities" value={rental.monthlyUtilitiesSTR} onChange={(v) => updateRental('monthlyUtilitiesSTR', v)} prefix="$" hint="All utilities (higher)" />
                  <InputField label="Monthly Wifi/Cable" value={rental.monthlyWifi} onChange={(v) => updateRental('monthlyWifi', v)} prefix="$" />
                  <InputField label="Monthly HOA" value={rental.monthlyHOASTR} onChange={(v) => updateRental('monthlyHOASTR', v)} prefix="$" />
                  <InputField label="Monthly Management" value={rental.monthlyManagementSTR} onChange={(v) => updateRental('monthlyManagementSTR', v)} prefix="$" hint="If using STR manager" />
                  <InputField label="Furnishing Budget" value={rental.furnishingBudget} onChange={(v) => updateRental('furnishingBudget', v)} prefix="$" hint="One-time cost" />
                </div>
              </div>
            </div>
          )}

          {/* KPI Cards */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">
              {tab === 'ltr' ? '🏠 LTR Key Metrics' : '🏖️ STR Key Metrics'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricCard
                label="Monthly Cash Flow"
                value={formatCurrency(tab === 'ltr' ? ltrMetrics.monthlyCashFlow : strMetrics.monthlyCashFlow)}
                sublabel="After debt service"
                color={cashFlowColor}
              />
              <MetricCard
                label="Annual NOI"
                value={formatCurrency(activeMetrics.noi)}
                sublabel="Net Operating Income"
                color={activeMetrics.noi >= 0 ? 'text-green-700' : 'text-red-600'}
              />
              <MetricCard
                label="Cap Rate"
                value={`${activeMetrics.capRate.toFixed(2)}%`}
                sublabel="NOI / Total Investment"
                color={activeMetrics.capRate >= 6 ? 'text-green-700' : activeMetrics.capRate >= 4 ? 'text-amber-600' : 'text-red-600'}
              />
              <MetricCard
                label="Cash-on-Cash"
                value={`${activeMetrics.cashOnCash.toFixed(2)}%`}
                sublabel="Annual CF / Cash Invested"
                color={activeMetrics.cashOnCash >= 8 ? 'text-green-700' : activeMetrics.cashOnCash >= 4 ? 'text-amber-600' : 'text-red-600'}
              />
            </div>
          </div>

          {/* Income Statement Breakdown */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-gray-700" colSpan={2}>
                    {tab === 'ltr' ? 'LTR Income Statement (Annual)' : 'STR Income Statement (Annual)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Gross Income */}
                <tr className="border-t border-gray-100 bg-green-50">
                  <td className="px-4 py-1.5 font-semibold text-green-800">
                    {tab === 'ltr' ? 'Gross Annual Rent' : 'Gross Annual Revenue'}
                  </td>
                  <td className="px-4 py-1.5 text-right font-bold text-green-800">
                    {formatCurrency(tab === 'ltr' ? ltrMetrics.grossAnnualRent : strMetrics.grossAnnualRevenue)}
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-1.5 text-gray-600 pl-8">
                    − {tab === 'ltr' ? `Vacancy (${rental.vacancyRate}%)` : `Platform Fees (${rental.platformFeeRate}%)`}
                  </td>
                  <td className="px-4 py-1.5 text-right text-red-600">
                    ({formatCurrency(tab === 'ltr' ? ltrMetrics.vacancyLoss : strMetrics.platformFees)})
                  </td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-1.5 font-semibold text-gray-800">Effective Gross Income</td>
                  <td className="px-4 py-1.5 text-right font-bold text-gray-800">
                    {formatCurrency(activeMetrics.effectiveGrossIncome)}
                  </td>
                </tr>

                {/* Operating Expenses */}
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-1.5 text-gray-600 pl-8">− Insurance</td>
                  <td className="px-4 py-1.5 text-right text-gray-600">
                    ({formatCurrency(tab === 'ltr' ? rental.annualInsurance : rental.annualInsuranceSTR)})
                  </td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-1.5 text-gray-600 pl-8">− Property Tax</td>
                  <td className="px-4 py-1.5 text-right text-gray-600">
                    ({formatCurrency(tab === 'ltr' ? rental.annualPropertyTax : rental.annualPropertyTaxSTR)})
                  </td>
                </tr>
                {tab === 'ltr' ? (
                  <>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Management ({rental.managementFeeRate}%)</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(ltrMetrics.managementFee)})</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Repairs & Maintenance</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(ltrMetrics.annualRepairs)})</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− CapEx Reserve</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(ltrMetrics.annualCapEx)})</td>
                    </tr>
                    {ltrMetrics.annualHOA > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-1.5 text-gray-600 pl-8">− HOA/Dues</td>
                        <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(ltrMetrics.annualHOA)})</td>
                      </tr>
                    )}
                    {ltrMetrics.annualLandlordUtilities > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-1.5 text-gray-600 pl-8">− Landlord Utilities</td>
                        <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(ltrMetrics.annualLandlordUtilities)})</td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Cleaning</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualCleaning)})</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Supplies</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualSupplies)})</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Utilities</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualUtilities)})</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-1.5 text-gray-600 pl-8">− Wifi/Cable</td>
                      <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualWifi)})</td>
                    </tr>
                    {strMetrics.annualManagement > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-1.5 text-gray-600 pl-8">− STR Management</td>
                        <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualManagement)})</td>
                      </tr>
                    )}
                    {strMetrics.annualHOA > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-1.5 text-gray-600 pl-8">− HOA/Dues</td>
                        <td className="px-4 py-1.5 text-right text-gray-600">({formatCurrency(strMetrics.annualHOA)})</td>
                      </tr>
                    )}
                  </>
                )}

                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-1.5 font-semibold text-gray-800">Total Operating Expenses</td>
                  <td className="px-4 py-1.5 text-right font-bold text-red-600">
                    ({formatCurrency(activeMetrics.totalOperatingExpenses)})
                  </td>
                </tr>

                {/* NOI */}
                <tr className="border-t-2 border-gray-300 bg-blue-50">
                  <td className="px-4 py-2 font-bold text-blue-900">Net Operating Income (NOI)</td>
                  <td className="px-4 py-2 text-right font-black text-blue-900">
                    {formatCurrency(activeMetrics.noi)}
                  </td>
                </tr>

                {/* Debt Service */}
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-1.5 text-gray-600 pl-8">− Annual Debt Service</td>
                  <td className="px-4 py-1.5 text-right text-gray-600">
                    ({formatCurrency(activeMetrics.annualDebtService)})
                  </td>
                </tr>

                {/* Cash Flow */}
                <tr className="border-t-2 border-gray-300 bg-amber-50">
                  <td className="px-4 py-2 font-black text-gray-900">Annual Cash Flow</td>
                  <td className={`px-4 py-2 text-right font-black ${activeMetrics.annualCashFlow >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {formatCurrency(activeMetrics.annualCashFlow)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Ratios */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard
              label="DSCR"
              value={activeMetrics.dscr.toFixed(2)}
              sublabel="Debt Service Coverage"
              color={activeMetrics.dscr >= 1.25 ? 'text-green-700' : activeMetrics.dscr >= 1 ? 'text-amber-600' : 'text-red-600'}
            />
            {tab === 'ltr' ? (
              <>
                <MetricCard
                  label="GRM"
                  value={ltrMetrics.grm.toFixed(1)}
                  sublabel="Gross Rent Multiplier"
                  color={ltrMetrics.grm <= 10 ? 'text-green-700' : ltrMetrics.grm <= 15 ? 'text-amber-600' : 'text-red-600'}
                />
                <MetricCard
                  label="1% Rule"
                  value={`${ltrMetrics.onePercentRule.toFixed(2)}%`}
                  sublabel="Rent / Purchase Price"
                  color={ltrMetrics.onePercentRule >= 1 ? 'text-green-700' : ltrMetrics.onePercentRule >= 0.8 ? 'text-amber-600' : 'text-red-600'}
                />
                <MetricCard
                  label="Break-Even"
                  value={`${ltrMetrics.breakEvenOccupancy.toFixed(0)}%`}
                  sublabel="Occupancy needed"
                  color={ltrMetrics.breakEvenOccupancy <= 75 ? 'text-green-700' : ltrMetrics.breakEvenOccupancy <= 90 ? 'text-amber-600' : 'text-red-600'}
                />
              </>
            ) : (
              <>
                <MetricCard
                  label="Booked Nights"
                  value={`${strMetrics.bookedNightsPerYear}/yr`}
                  sublabel={`${strMetrics.bookedNightsPerMonth}/mo avg`}
                />
                <MetricCard
                  label="Break-Even Rate"
                  value={formatCurrency(strMetrics.breakEvenNightlyRate)}
                  sublabel="Min nightly to break even"
                  color={rental.nightlyRate >= strMetrics.breakEvenNightlyRate ? 'text-green-700' : 'text-red-600'}
                />
                <MetricCard
                  label="Expense Ratio"
                  value={`${activeMetrics.expenseRatio.toFixed(0)}%`}
                  sublabel="OpEx / EGI"
                  color={activeMetrics.expenseRatio <= 45 ? 'text-green-700' : activeMetrics.expenseRatio <= 60 ? 'text-amber-600' : 'text-red-600'}
                />
              </>
            )}
          </div>

          {/* Strategy Comparison */}
          <div className="bg-gray-900 text-white rounded-lg p-5">
            <h3 className="text-xs font-bold uppercase text-gray-300 mb-4">📊 Flip vs. Hold Comparison</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase">Flip Profit</div>
                <div className={`text-lg font-bold ${comparison.flipProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(comparison.flipProfit)}
                </div>
                <div className="text-[9px] text-gray-500">{comparison.flipTimeline} mo timeline</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase">LTR Annual</div>
                <div className={`text-lg font-bold ${comparison.ltrAnnual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(comparison.ltrAnnual)}
                </div>
                <div className="text-[9px] text-gray-500">
                  {comparison.yearsToMatchFlip_LTR === Infinity
                    ? 'Never matches flip'
                    : `${comparison.yearsToMatchFlip_LTR.toFixed(1)} yrs to match flip`}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase">STR Annual</div>
                <div className={`text-lg font-bold ${comparison.strAnnual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(comparison.strAnnual)}
                </div>
                <div className="text-[9px] text-gray-500">
                  {comparison.yearsToMatchFlip_STR === Infinity
                    ? 'Never matches flip'
                    : `${comparison.yearsToMatchFlip_STR.toFixed(1)} yrs to match flip`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between items-center">
          <p className="text-[10px] text-gray-400 max-w-sm">
            Estimates for comparison only. Does not account for appreciation, tax benefits, or equity buildup.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
