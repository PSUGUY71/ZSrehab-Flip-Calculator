import React, { useState, useMemo, useCallback } from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency } from '../utils/calculations';

// ─── Types ───────────────────────────────────────────────────────────

interface ScenarioWeights {
  profit: number;       // 0-100
  cashFlow: number;     // 0-100
  riskLevel: number;    // 0-100
  timeToReturn: number; // 0-100
  taxEfficiency: number;// 0-100
}

interface ScenarioResult {
  strategy: 'Flip' | 'LTR' | 'STR';
  label: string;
  icon: string;
  profit: number;
  monthlyCashFlow: number;
  roi: number;
  timeToReturnMonths: number;
  riskScore: number;     // 1-10 (10=highest risk)
  taxEfficiency: number; // 1-10 (10=best)
  weightedScore: number;
  pros: string[];
  cons: string[];
  keyMetrics: { label: string; value: string; color?: string }[];
}

interface SavedScenario {
  id: string;
  name: string;
  date: string;
  address: string;
  results: ScenarioResult[];
  weights: ScenarioWeights;
  winner: string;
}

interface ScenarioComparisonModalProps {
  dealInputs: LoanInputs;
  dealResults: CalculatedResults;
  onClose: () => void;
}

// ─── Local Storage ───────────────────────────────────────────────────

const SCENARIOS_KEY = 'zs_saved_scenarios';

const loadSavedScenarios = (): SavedScenario[] => {
  try {
    const stored = localStorage.getItem(SCENARIOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveScenariosToStorage = (scenarios: SavedScenario[]) => {
  try {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios.slice(0, 20)));
  } catch { /* ignore */ }
};

// ─── Default Weights ─────────────────────────────────────────────────

const DEFAULT_WEIGHTS: ScenarioWeights = {
  profit: 30,
  cashFlow: 25,
  riskLevel: 20,
  timeToReturn: 15,
  taxEfficiency: 10,
};

// ─── Component ───────────────────────────────────────────────────────

export const ScenarioComparisonModal: React.FC<ScenarioComparisonModalProps> = ({
  dealInputs,
  dealResults,
  onClose,
}) => {
  const [weights, setWeights] = useState<ScenarioWeights>({ ...DEFAULT_WEIGHTS });
  const [activeTab, setActiveTab] = useState<'compare' | 'details' | 'saved'>('compare');
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(() => loadSavedScenarios());
  const [selectedDetail, setSelectedDetail] = useState<'Flip' | 'LTR' | 'STR'>('Flip');

  // LTR Assumptions
  const [ltrMonthlyRent, setLtrMonthlyRent] = useState(() => {
    const arv = dealInputs.arv || 250000;
    return Math.round(arv * 0.008 / 50) * 50; // ~0.8% of ARV rule of thumb
  });
  const [ltrVacancyRate] = useState(8); // percent
  const [ltrPropertyMgmt] = useState(10); // percent
  const [ltrCapexRate] = useState(5); // percent of rent

  // STR Assumptions
  const [strNightlyRate, setStrNightlyRate] = useState(() => {
    const arv = dealInputs.arv || 250000;
    return Math.round(arv * 0.001 / 5) * 5; // ~0.1% of ARV per night
  });
  const [strOccupancy] = useState(65); // percent
  const [strMgmtFee] = useState(20); // percent
  const [strCleaningPerTurn] = useState(150);

  // ─── Calculate Scenarios ─────────────────────────────────────────

  const scenarios = useMemo<ScenarioResult[]>(() => {
    const purchasePrice = dealInputs.purchasePrice || 0;
    const arv = dealInputs.arv || 0;
    const rehabBudget = dealInputs.rehabBudget || 0;
    const totalInvestment = purchasePrice + rehabBudget + dealResults.totalClosingCosts;
    const holdingMonths = dealInputs.holdingPeriod || 6;

    // ── FLIP ──
    const flipProfit = dealResults.netProfit;
    const flipRoi = dealResults.roi;
    const flipTimeMonths = holdingMonths;

    // ── LTR ──
    const ltrGrossMonthly = ltrMonthlyRent;
    const ltrVacancyLoss = ltrGrossMonthly * (ltrVacancyRate / 100);
    const ltrMgmtCost = ltrGrossMonthly * (ltrPropertyMgmt / 100);
    const ltrCapex = ltrGrossMonthly * (ltrCapexRate / 100);
    const ltrInsurance = dealInputs.monthlyInsurance || 150;
    const ltrTax = dealInputs.monthlyTax || 200;
    const ltrMortgage = dealResults.monthlyPayment || 0;
    const ltrNetMonthly = ltrGrossMonthly - ltrVacancyLoss - ltrMgmtCost - ltrCapex - ltrInsurance - ltrTax - ltrMortgage;
    const ltrAnnualCashFlow = ltrNetMonthly * 12;
    const ltrCashOnCash = totalInvestment > 0 ? (ltrAnnualCashFlow / totalInvestment) * 100 : 0;
    const ltrTimeToReturn = ltrNetMonthly > 0 ? Math.ceil(totalInvestment / ltrNetMonthly) : 999;
    const ltrEquityGain = arv - purchasePrice; // Potential equity from rehab

    // ── STR ──
    const strGrossMonthly = strNightlyRate * 30 * (strOccupancy / 100);
    const strTurns = Math.round(30 * (strOccupancy / 100) / 3); // ~1 turn per 3 guest-nights
    const strCleaningTotal = strTurns * strCleaningPerTurn;
    const strMgmtCost = strGrossMonthly * (strMgmtFee / 100);
    const strNetMonthly = strGrossMonthly - strCleaningTotal - strMgmtCost - ltrInsurance * 1.3 - ltrTax - ltrMortgage;
    const strAnnualCashFlow = strNetMonthly * 12;
    const strCashOnCash = totalInvestment > 0 ? (strAnnualCashFlow / totalInvestment) * 100 : 0;
    const strTimeToReturn = strNetMonthly > 0 ? Math.ceil(totalInvestment / strNetMonthly) : 999;

    const results: ScenarioResult[] = [
      {
        strategy: 'Flip',
        label: 'Fix & Flip',
        icon: '🏠',
        profit: flipProfit,
        monthlyCashFlow: flipProfit / Math.max(flipTimeMonths, 1),
        roi: flipRoi,
        timeToReturnMonths: flipTimeMonths,
        riskScore: 6,
        taxEfficiency: 3, // Short-term capital gains
        weightedScore: 0,
        pros: [
          'Quick return on capital',
          'No long-term management',
          'Profit realized at sale',
          'Capital freed for next deal',
        ],
        cons: [
          'High tax rate (short-term gains)',
          'Market timing risk',
          'Rehab cost overrun risk',
          'No passive income stream',
        ],
        keyMetrics: [
          { label: 'Net Profit', value: formatCurrency(flipProfit), color: flipProfit > 0 ? 'text-green-700' : 'text-red-700' },
          { label: 'ROI', value: `${flipRoi.toFixed(1)}%`, color: flipRoi > 0 ? 'text-green-700' : 'text-red-700' },
          { label: 'Timeline', value: `${flipTimeMonths} months` },
          { label: 'Total Investment', value: formatCurrency(totalInvestment) },
          { label: 'Sale Price (ARV)', value: formatCurrency(arv) },
          { label: 'Exit Costs', value: formatCurrency(dealResults.totalExitCosts) },
        ],
      },
      {
        strategy: 'LTR',
        label: 'Long-Term Rental',
        icon: '🏘️',
        profit: ltrAnnualCashFlow,
        monthlyCashFlow: ltrNetMonthly,
        roi: ltrCashOnCash,
        timeToReturnMonths: Math.min(ltrTimeToReturn, 999),
        riskScore: 3,
        taxEfficiency: 8, // Depreciation + long-term gains
        weightedScore: 0,
        pros: [
          'Steady passive income',
          'Tax benefits (depreciation)',
          'Equity appreciation over time',
          'Lower risk profile',
        ],
        cons: [
          'Tenant management required',
          'Capital tied up long-term',
          'Maintenance & vacancy costs',
          'Slower return on capital',
        ],
        keyMetrics: [
          { label: 'Monthly Cash Flow', value: formatCurrency(ltrNetMonthly), color: ltrNetMonthly > 0 ? 'text-green-700' : 'text-red-700' },
          { label: 'Annual Cash Flow', value: formatCurrency(ltrAnnualCashFlow) },
          { label: 'Cash-on-Cash ROI', value: `${ltrCashOnCash.toFixed(1)}%` },
          { label: 'Gross Monthly Rent', value: formatCurrency(ltrGrossMonthly) },
          { label: 'Equity Gain from Rehab', value: formatCurrency(ltrEquityGain) },
          { label: 'Payback Period', value: ltrTimeToReturn < 999 ? `${Math.round(ltrTimeToReturn / 12)} years` : 'N/A' },
        ],
      },
      {
        strategy: 'STR',
        label: 'Short-Term Rental',
        icon: '🏖️',
        profit: strAnnualCashFlow,
        monthlyCashFlow: strNetMonthly,
        roi: strCashOnCash,
        timeToReturnMonths: Math.min(strTimeToReturn, 999),
        riskScore: 7,
        taxEfficiency: 6,
        weightedScore: 0,
        pros: [
          'Higher revenue potential',
          'Flexible personal use',
          'Premium pricing in peak seasons',
          'Growing market demand',
        ],
        cons: [
          'Higher management intensity',
          'Seasonal income variability',
          'Regulatory/zoning risks',
          'Higher insurance & furnishing costs',
        ],
        keyMetrics: [
          { label: 'Monthly Cash Flow', value: formatCurrency(strNetMonthly), color: strNetMonthly > 0 ? 'text-green-700' : 'text-red-700' },
          { label: 'Annual Cash Flow', value: formatCurrency(strAnnualCashFlow) },
          { label: 'Cash-on-Cash ROI', value: `${strCashOnCash.toFixed(1)}%` },
          { label: 'Nightly Rate', value: formatCurrency(strNightlyRate) },
          { label: 'Occupancy', value: `${strOccupancy}%` },
          { label: 'Payback Period', value: strTimeToReturn < 999 ? `${Math.round(strTimeToReturn / 12)} years` : 'N/A' },
        ],
      },
    ];

    // ── Calculate weighted scores ──
    const maxProfit = Math.max(...results.map(r => Math.abs(r.profit)), 1);
    const maxCashFlow = Math.max(...results.map(r => Math.abs(r.monthlyCashFlow)), 1);
    const maxTime = Math.max(...results.map(r => r.timeToReturnMonths), 1);

    results.forEach(r => {
      const profitScore = (r.profit / maxProfit) * 10;
      const cashFlowScore = (r.monthlyCashFlow / maxCashFlow) * 10;
      const riskScore = (10 - r.riskScore); // Invert: lower risk = higher score
      const timeScore = (1 - r.timeToReturnMonths / maxTime) * 10;
      const taxScore = r.taxEfficiency;

      const totalWeight = weights.profit + weights.cashFlow + weights.riskLevel + weights.timeToReturn + weights.taxEfficiency;
      r.weightedScore = totalWeight > 0
        ? ((profitScore * weights.profit + cashFlowScore * weights.cashFlow + riskScore * weights.riskLevel + timeScore * weights.timeToReturn + taxScore * weights.taxEfficiency) / totalWeight) * 10
        : 0;
    });

    // Sort by weighted score (highest first)
    results.sort((a, b) => b.weightedScore - a.weightedScore);
    return results;
  }, [dealInputs, dealResults, weights, ltrMonthlyRent, ltrVacancyRate, ltrPropertyMgmt, ltrCapexRate, strNightlyRate, strOccupancy, strMgmtFee, strCleaningPerTurn]);

  const winner = scenarios[0];

  const handleSaveScenario = useCallback(() => {
    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name: dealInputs.address || `Scenario ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleDateString(),
      address: dealInputs.address || 'Unknown',
      results: scenarios,
      weights,
      winner: winner.strategy,
    };
    const updated = [scenario, ...savedScenarios].slice(0, 20);
    setSavedScenarios(updated);
    saveScenariosToStorage(updated);
  }, [scenarios, weights, winner, dealInputs.address, savedScenarios]);

  const handleDeleteScenario = (id: string) => {
    const updated = savedScenarios.filter(s => s.id !== id);
    setSavedScenarios(updated);
    saveScenariosToStorage(updated);
  };

  const updateWeight = (key: keyof ScenarioWeights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const strategyColors: Record<string, string> = {
    Flip: 'from-amber-500 to-orange-500',
    LTR: 'from-blue-500 to-indigo-500',
    STR: 'from-purple-500 to-pink-500',
  };

  const strategyBorders: Record<string, string> = {
    Flip: 'border-amber-300',
    LTR: 'border-blue-300',
    STR: 'border-purple-300',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">⚖️ Scenario Comparison Engine</h2>
            <p className="text-xs text-gray-300 mt-0.5">Compare Flip vs. Long-Term Rental vs. Short-Term Rental strategies</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1">
            {([
              { key: 'compare' as const, label: '⚖️ Compare' },
              { key: 'details' as const, label: '📋 Details' },
              { key: 'saved' as const, label: `💾 Saved (${savedScenarios.length})` },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
                  activeTab === tab.key
                    ? 'bg-white border border-gray-200 border-b-white -mb-px text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* COMPARE TAB */}
          {activeTab === 'compare' && (
            <div className="space-y-6">
              {/* Winner Banner */}
              <div className={`bg-gradient-to-r ${strategyColors[winner.strategy]} text-white rounded-xl p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{winner.icon}</span>
                  <div>
                    <div className="text-xs font-medium opacity-80 uppercase">Recommended Strategy</div>
                    <div className="text-xl font-bold">{winner.label}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-80">Weighted Score</div>
                  <div className="text-2xl font-bold">{winner.weightedScore.toFixed(1)}<span className="text-sm opacity-70">/10</span></div>
                </div>
              </div>

              {/* Strategy Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((s, i) => (
                  <div
                    key={s.strategy}
                    className={`border-2 rounded-xl p-4 transition cursor-pointer hover:shadow-lg ${
                      i === 0 ? `${strategyBorders[s.strategy]} shadow-md` : 'border-gray-200'
                    }`}
                    onClick={() => { setSelectedDetail(s.strategy); setActiveTab('details'); }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <div className="font-bold text-sm text-gray-900">{s.label}</div>
                          {i === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">👑 BEST</span>}
                        </div>
                      </div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${strategyColors[s.strategy]} bg-clip-text text-transparent`}>
                        {s.weightedScore.toFixed(1)}
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`bg-gradient-to-r ${strategyColors[s.strategy]} h-2 rounded-full transition-all`}
                        style={{ width: `${Math.min(s.weightedScore * 10, 100)}%` }}
                      />
                    </div>

                    {/* Key numbers */}
                    <div className="space-y-1.5">
                      {s.keyMetrics.slice(0, 3).map((m, j) => (
                        <div key={j} className="flex justify-between text-xs">
                          <span className="text-gray-600">{m.label}</span>
                          <span className={`font-bold ${m.color || 'text-gray-900'}`}>{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedDetail(s.strategy); setActiveTab('details'); }}
                      className="mt-3 w-full text-xs text-center text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>

              {/* Priority Weighting Sliders */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase mb-3 flex items-center gap-2">
                  🎛️ Priority Weighting
                  <span className="text-[10px] font-normal text-gray-500">(Adjust to match your investment goals)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {([
                    { key: 'profit' as const, label: '💰 Profit', color: 'accent-green-600' },
                    { key: 'cashFlow' as const, label: '💵 Cash Flow', color: 'accent-blue-600' },
                    { key: 'riskLevel' as const, label: '🛡️ Low Risk', color: 'accent-amber-600' },
                    { key: 'timeToReturn' as const, label: '⏱️ Speed', color: 'accent-purple-600' },
                    { key: 'taxEfficiency' as const, label: '📋 Tax', color: 'accent-red-600' },
                  ]).map(w => (
                    <div key={w.key} className="text-center">
                      <label className="text-[10px] font-semibold text-gray-600 block mb-1">{w.label}</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={weights[w.key]}
                        onChange={(e) => updateWeight(w.key, Number(e.target.value))}
                        className={`w-full h-2 rounded-lg cursor-pointer ${w.color}`}
                      />
                      <div className="text-xs font-bold text-gray-800 mt-0.5">{weights[w.key]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adjustable Assumptions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-xs font-bold text-blue-800 uppercase mb-3">📊 Rental Assumptions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-600 block mb-1">LTR Monthly Rent</label>
                    <input
                      type="number"
                      value={ltrMonthlyRent}
                      onChange={(e) => setLtrMonthlyRent(Number(e.target.value))}
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-600 block mb-1">STR Nightly Rate</label>
                    <input
                      type="number"
                      value={strNightlyRate}
                      onChange={(e) => setStrNightlyRate(Number(e.target.value))}
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-center">
                    <label className="text-[10px] font-semibold text-gray-600 block mb-1">STR Occupancy</label>
                    <div className="text-sm font-bold text-gray-800">{strOccupancy}%</div>
                  </div>
                  <div className="text-center">
                    <label className="text-[10px] font-semibold text-gray-600 block mb-1">LTR Vacancy</label>
                    <div className="text-sm font-bold text-gray-800">{ltrVacancyRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === 'details' && (
            <div className="space-y-5">
              {/* Strategy selector */}
              <div className="flex gap-2">
                {scenarios.map(s => (
                  <button
                    key={s.strategy}
                    onClick={() => setSelectedDetail(s.strategy)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                      selectedDetail === s.strategy
                        ? `bg-gradient-to-r ${strategyColors[s.strategy]} text-white shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>

              {(() => {
                const detail = scenarios.find(s => s.strategy === selectedDetail) || scenarios[0];
                return (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${strategyColors[detail.strategy]} text-white rounded-xl p-5`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{detail.icon}</span>
                        <h3 className="text-xl font-bold">{detail.label}</h3>
                      </div>
                      <div className="text-sm opacity-90">
                        Weighted Score: <span className="font-bold text-lg">{detail.weightedScore.toFixed(1)}/10</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {detail.keyMetrics.map((m, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <div className="text-[10px] font-semibold text-gray-500 uppercase">{m.label}</div>
                          <div className={`text-lg font-bold mt-0.5 ${m.color || 'text-gray-900'}`}>{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-green-800 uppercase mb-2">✅ Pros</h4>
                        <ul className="space-y-1">
                          {detail.pros.map((p, i) => (
                            <li key={i} className="text-xs text-green-700 flex items-start gap-1.5">
                              <span className="text-green-500 shrink-0">•</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="text-xs font-bold text-red-800 uppercase mb-2">⚠️ Cons</h4>
                        <ul className="space-y-1">
                          {detail.cons.map((c, i) => (
                            <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                              <span className="text-red-500 shrink-0">•</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Risk & Tax Gauges */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Risk Level</span>
                          <span className="font-bold">{detail.riskScore}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${detail.riskScore > 6 ? 'bg-red-500' : detail.riskScore > 3 ? 'bg-amber-500' : 'bg-green-500'}`}
                            style={{ width: `${detail.riskScore * 10}%` }}
                          />
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Tax Efficiency</span>
                          <span className="font-bold">{detail.taxEfficiency}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${detail.taxEfficiency * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SAVED TAB */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {savedScenarios.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-4xl mb-2">📂</p>
                  <p className="text-sm">No saved scenarios yet.</p>
                  <p className="text-xs mt-1">Run a comparison and save it for reference.</p>
                </div>
              ) : (
                savedScenarios.map(s => (
                  <div key={s.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{s.date} · Winner: {s.winner}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteScenario(s.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    <div className="flex gap-3 mt-2">
                      {s.results.map((r, i) => (
                        <div key={r.strategy} className={`text-xs px-2 py-1 rounded ${i === 0 ? 'bg-green-50 text-green-800 font-bold' : 'bg-gray-50 text-gray-600'}`}>
                          {r.icon} {r.strategy}: {r.weightedScore.toFixed(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between items-center">
          <div className="text-[10px] text-gray-400 hidden sm:block">Based on current deal inputs and rental assumptions.</div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveScenario}
              className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
            >
              💾 Save Scenario
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
