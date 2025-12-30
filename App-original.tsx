import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_INPUTS, LoanInputs, SavedDeal, User, LenderOption } from './types';
import { calculateLoan, formatCurrency, formatPercent } from './utils/calculations';
import { calculateLoanForLender } from './utils/lenderComparison';
import { InputGroup } from './components/InputGroup';
import { ResultRow } from './components/ResultRow';

// Helper component for indented fee breakdown
const FeeBreakdownItem = ({ label, value }: { label: string, value: number }) => {
    if (value === 0) return null;
    return (
        <div className="flex justify-between items-center text-[10px] text-gray-500 pl-3 py-0.5 border-l-2 border-gray-100 ml-1">
            <span>{label}</span>
            <span>{formatCurrency(value)}</span>
        </div>
    );
};

const App: React.FC = () => {
  // --- AUTHENTICATION STATE ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // --- APP STATE ---
  const [inputs, setInputs] = useState<LoanInputs>(DEFAULT_INPUTS);
  const [lenders, setLenders] = useState<LenderOption[]>([]);
  const [isReportMode, setIsReportMode] = useState(false);
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Lender Modal State
  const [isLenderModalOpen, setIsLenderModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<LenderOption | null>(null);

  // --- EFFECTS ---
  useEffect(() => {
    // 1. Seed Default Users if not present
    const usersStr = localStorage.getItem('zsrehab_users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    let usersUpdated = false;
    
    if (!users.find(u => u.username === 'admin')) {
        const adminUser: User = { 
            username: 'admin', 
            password: 'admin', 
            created: new Date().toISOString() 
        };
        users.push(adminUser);
        usersUpdated = true;
    }

    if (!users.find(u => u.username === 'demo')) {
        const demoUser: User = { 
            username: 'demo', 
            password: 'demo', 
            created: new Date().toISOString() 
        };
        users.push(demoUser);
        usersUpdated = true;
    }

    if (usersUpdated) {
        localStorage.setItem('zsrehab_users', JSON.stringify(users));
    }

    // 2. Check Session
    const sessionUser = localStorage.getItem('zsrehab_session_user');
    if (sessionUser) {
        setCurrentUser({ username: sessionUser, password: '', created: '' });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
        const stored = localStorage.getItem(`zsrehab_deals_${currentUser.username}`);
        if (stored) {
            try {
                const parsedDeals = JSON.parse(stored);
                // Migration: ensure lenders property exists
                const migratedDeals = parsedDeals.map((d: SavedDeal) => ({
                  ...d,
                  lenders: d.lenders || []
                }));
                setSavedDeals(migratedDeals);
            } catch (e) {
                console.error("Failed to parse saved deals", e);
                setSavedDeals([]);
            }
        } else {
            setSavedDeals([]);
        }
    }
  }, [currentUser]);

  // --- CALCULATIONS ---
  const results = useMemo(() => calculateLoan(inputs), [inputs]);

  const comparisonData = useMemo(() => {
    return lenders
      .filter(l => l.includeInComparison)
      .map(l => ({
        lender: l,
        results: calculateLoanForLender(inputs, results, l)
      }));
  }, [lenders, inputs, results]);

  // Identify Best Options for Highlighting
  const bestLenderFees = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allFees = [results.totalLenderFees, ...comparisonData.map(c => c.results.lenderUpfrontFeesAdjusted)];
    return Math.min(...allFees);
  }, [comparisonData, results]);

  const bestMonthlyPayment = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allPayments = [results.monthlyPayment, ...comparisonData.map(c => c.results.comparisonMonthlyPayment)];
    return Math.min(...allPayments);
  }, [comparisonData, results]);

  const bestTotalHoldDelta = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allDeltas = [0, ...comparisonData.map(c => c.results.totalCostOverHoldDeltaVsBase)];
    return Math.min(...allDeltas);
  }, [comparisonData]);

  // --- HANDLERS ---
  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError('');
      const usersStr = localStorage.getItem('zsrehab_users');
      const users: User[] = usersStr ? JSON.parse(usersStr) : [];
      const foundUser = users.find(u => u.username === authUsername && u.password === authPassword);
      if (foundUser) {
          localStorage.setItem('zsrehab_session_user', foundUser.username);
          setCurrentUser(foundUser);
          setAuthUsername('');
          setAuthPassword('');
      } else {
          setAuthError('Invalid username or password.');
      }
  };

  const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError('');
      if (!authUsername || !authPassword) {
          setAuthError('Please fill in all fields.');
          return;
      }
      const usersStr = localStorage.getItem('zsrehab_users');
      const users: User[] = usersStr ? JSON.parse(usersStr) : [];
      if (users.find(u => u.username === authUsername)) {
          setAuthError('Username already exists.');
          return;
      }
      const newUser: User = {
          username: authUsername,
          password: authPassword,
          created: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('zsrehab_users', JSON.stringify(users));
      localStorage.setItem('zsrehab_session_user', newUser.username);
      setCurrentUser(newUser);
      setAuthUsername('');
      setAuthPassword('');
  };

  const handleLogout = () => {
      localStorage.removeItem('zsrehab_session_user');
      setCurrentUser(null);
      setInputs(DEFAULT_INPUTS);
      setLenders([]);
      setSavedDeals([]);
      setIsReportMode(false);
  };

  const handleInputChange = (field: keyof LoanInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyLender = (lender: LenderOption) => {
    setInputs(prev => ({
      ...prev,
      lenderName: lender.lenderName,
      interestRate: lender.interestRate,
      originationPoints: lender.originationPoints,
      underwritingFee: lender.underwritingFee,
      processingFee: lender.processingFee,
      docPrepFee: lender.docPrepFee,
      wireFee: lender.wireFee,
      otherLenderFees: lender.otherFees
    }));
  };

  const handleSaveDeal = () => {
    if (!currentUser) return;
    const newDeal: SavedDeal = {
        id: Date.now(),
        name: inputs.address || 'Untitled Property',
        date: new Date().toLocaleDateString(),
        data: inputs,
        lenders: lenders
    };
    const existingIndex = savedDeals.findIndex(d => d.name === newDeal.name);
    let updatedDeals;
    if (existingIndex >= 0) {
        updatedDeals = [...savedDeals];
        updatedDeals[existingIndex] = newDeal;
    } else {
        updatedDeals = [newDeal, ...savedDeals];
    }
    setSavedDeals(updatedDeals);
    localStorage.setItem(`zsrehab_deals_${currentUser.username}`, JSON.stringify(updatedDeals));
    setSaveNotification("Property Saved!");
    setTimeout(() => setSaveNotification(null), 2000);
  };

  const handleLoadDeal = (deal: SavedDeal) => {
    // Force Sell strategy when loading if needed, though user requested removal of Refi option from UI
    setInputs({ ...deal.data, exitStrategy: 'SELL' });
    setLenders(deal.lenders || []);
    setIsDealModalOpen(false);
  };

  const handleDeleteDeal = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    const updated = savedDeals.filter(d => d.id !== id);
    setSavedDeals(updated);
    localStorage.setItem(`zsrehab_deals_${currentUser.username}`, JSON.stringify(updated));
  };

  const handleNewDeal = () => {
      if (window.confirm("Start a new deal? Unsaved changes will be lost.")) {
          setInputs(DEFAULT_INPUTS);
          setLenders([]);
      }
  };

  // --- LENDER ACTIONS ---
  const handleAddLender = () => {
    const newLender: LenderOption = {
      id: Date.now().toString(),
      lenderName: 'New Lender',
      loanType: 'HARD_MONEY',
      interestRate: inputs.interestRate,
      originationPoints: inputs.originationPoints,
      underwritingFee: 500,
      processingFee: 500,
      docPrepFee: 1499,
      wireFee: 45,
      otherFees: 0,
      loanAmountOverride: 0,
      includeInComparison: true,
      notes: ''
    };
    setEditingLender(newLender);
    setIsLenderModalOpen(true);
  };

  const handleCaptureBaseline = () => {
    const newLender: LenderOption = {
      id: Date.now().toString(),
      lenderName: inputs.lenderName || 'Baseline Snapshot',
      loanType: 'HARD_MONEY',
      interestRate: inputs.interestRate,
      originationPoints: inputs.originationPoints,
      underwritingFee: inputs.underwritingFee,
      processingFee: inputs.processingFee,
      docPrepFee: inputs.docPrepFee,
      wireFee: inputs.wireFee,
      otherFees: inputs.otherLenderFees || 0,
      loanAmountOverride: 0,
      includeInComparison: true,
      notes: 'Captured from deal baseline'
    };
    setLenders([...lenders, newLender]);
  };

  const handleEditLender = (lender: LenderOption) => {
    setEditingLender(lender);
    setIsLenderModalOpen(true);
  };

  const handleDuplicateLender = (lender: LenderOption) => {
    const dup: LenderOption = {
      ...lender,
      id: Date.now().toString(),
      lenderName: `${lender.lenderName} (Copy)`
    };
    setLenders([...lenders, dup]);
  };

  const handleDeleteLender = (id: string) => {
    if (window.confirm("Delete this lender?")) {
      setLenders(lenders.filter(l => l.id !== id));
    }
  };

  const handleSaveLender = () => {
    if (!editingLender) return;
    if (lenders.find(l => l.id === editingLender.id)) {
      setLenders(lenders.map(l => l.id === editingLender.id ? editingLender : l));
    } else {
      setLenders([...lenders, editingLender]);
    }
    setIsLenderModalOpen(false);
    setEditingLender(null);
  };

  // --- COMPONENT: PROFIT TABLE (Shared) ---
  const ProfitTable = () => (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-gray-300 break-inside-avoid">
          <div className="bg-green-700 px-4 py-2 text-yellow-100 font-bold text-lg uppercase flex justify-between print-color-adjust-exact print:py-1 print:text-base">
            <span>Profit For House</span>
            <span className="text-sm text-white font-normal opacity-80">{inputs.address}</span>
          </div>
          <div className="text-xs">
              <div className="grid grid-cols-12 bg-green-800 text-white font-bold py-1 px-2 print-color-adjust-exact">
                  <div className="col-span-4">Item</div>
                  <div className="col-span-3 text-right">Cost</div>
                  <div className="col-span-2 text-center">Months</div>
                  <div className="col-span-3 text-right">Total</div>
              </div>
              
              {/* Revenue */}
              <div className="grid grid-cols-12 bg-yellow-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4 font-bold">Sale Price</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.arv)}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right font-bold">{formatCurrency(inputs.arv)}</div>
              </div>

               {/* Purchase Price Row */}
               <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Purchase Price</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.purchasePrice)}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.purchasePrice)}</div>
              </div>

              {/* Rehab Row */}
               <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Rehab Budget</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.rehabBudget)}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.rehabBudget)}</div>
              </div>

              {/* Holding Rows */}
              <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Utilities (Electric)</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.monthlyElectric)}</div>
                  <div className="col-span-2 text-center">{inputs.holdingPeriodMonths}</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.monthlyElectric * inputs.holdingPeriodMonths)}</div>
              </div>
              <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Mortgage Interest</div>
                  <div className="col-span-3 text-right">{formatCurrency(results.monthlyPayment)}</div>
                  <div className="col-span-2 text-center">{inputs.holdingPeriodMonths}</div>
                  <div className="col-span-3 text-right">{formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)}</div>
              </div>

              {/* Exit Costs - Always Sell */}
              <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Commission ({inputs.sellingCommissionRate}%)</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingCommissionRate/100))}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingCommissionRate/100))}</div>
              </div>
              <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Transfer Tax ({inputs.sellingTransferTaxRate}%)</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate/100))}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate/100))}</div>
              </div>

               {/* Walker Fees Row */}
               <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Walker & Walker Fees</div>
                  <div className="col-span-3 text-right">{formatCurrency(results.totalWalkerFees)}</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(results.totalWalkerFees)}</div>
              </div>
              
              {/* Closing Fees Row */}
               <div className="grid grid-cols-12 bg-blue-100 border-b border-white py-1 px-2 items-center print-color-adjust-exact text-gray-900">
                  <div className="col-span-4">Down Pmt + Other Fees</div>
                  <div className="col-span-3 text-right">-</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-3 text-right">{formatCurrency(results.totalCashToClose - results.totalWalkerFees)}</div>
              </div>

              {/* Net Profit */}
              <div className="grid grid-cols-12 bg-green-200 py-2 px-2 font-bold text-green-900 border-t border-green-300 print-color-adjust-exact items-center print:py-1">
                  <div className="col-span-6 text-right pr-4 text-lg print:text-sm">Net Profit</div>
                  <div className="col-span-3 text-right text-xs bg-green-100 rounded px-1 py-0.5 text-green-800 border border-green-200 inline-block justify-self-end">
                      ROI {formatPercent(results.roi)}
                  </div>
                  <div className="col-span-3 text-right text-lg print:text-sm">{formatCurrency(results.netProfit)}</div>
              </div>
          </div>
      </div>
  );
  
  // --- COMPONENT: CLOSING TABLE PROFIT CARD (Shared) ---
  const ClosingProfitCard = () => (
     <div className="bg-teal-50 border border-teal-500 rounded p-4 shadow-sm break-inside-avoid print-color-adjust-exact print:p-2">
        <div className="flex justify-between items-center border-b border-teal-200 pb-2 mb-2 print:pb-1 print:mb-1">
             <div className="text-teal-900 font-bold uppercase text-xs">Net Profit (Projected)</div>
             <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full shadow-sm border border-teal-300">{formatPercent(results.roi)} ROI</span>
                <span className="text-teal-900 font-bold text-xl print:text-base">{formatCurrency(results.netProfit)}</span>
             </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs text-teal-800 print:gap-y-1">
            <div className="flex justify-between"><span className="opacity-70">Revenue</span><span className="font-bold">{formatCurrency(inputs.arv)}</span></div>
            <div className="flex justify-between"><span className="opacity-70">Ln. Payoff</span><span className="font-bold text-red-600">-{formatCurrency(results.qualifiedLoanAmount)}</span></div>
            
            {/* Walker Fees */}
            <div className="flex justify-between"><span className="opacity-70">Walker Fees</span><span className="font-bold text-red-600">-{formatCurrency(results.totalWalkerFees)}</span></div>
            
            {/* Other Buying Costs */}
            <div className="flex justify-between"><span className="opacity-70">Other Cash Inv.</span><span className="font-bold text-red-600">-{formatCurrency(results.totalBuyingCosts - results.totalWalkerFees)}</span></div>

            {/* Exit Costs Breakdown - Always Sell */}
            <div className="flex justify-between"><span className="opacity-70">Commission</span><span className="font-bold text-red-600">-{formatCurrency(inputs.arv * (inputs.sellingCommissionRate/100))}</span></div>
            <div className="flex justify-between"><span className="opacity-70">Transfer Tax</span><span className="font-bold text-red-600">-{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate/100))}</span></div>
        </div>

        {/* Detailed Holding Cost Section */}
        <div className="mt-3 bg-teal-100/60 rounded p-2 border border-teal-200 print:mt-1 print:p-1">
             <div className="text-[10px] font-bold uppercase text-teal-800 mb-1 flex justify-between items-center">
                <span>Holding Costs Breakdown</span>
                <span className="text-teal-600 font-normal">{inputs.holdingPeriodMonths} Months</span>
             </div>
             <div className="space-y-1 text-xs text-teal-800">
                 <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="opacity-70">Loan Interest</span>
                        <span className="text-[10px] opacity-50">({formatCurrency(results.monthlyPayment)} / mo)</span>
                    </div>
                    <span className="font-medium text-red-600">-{formatCurrency(results.monthlyPayment * inputs.holdingPeriodMonths)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="opacity-70">Utilities</span>
                        <span className="text-[10px] opacity-50">({formatCurrency(inputs.monthlyElectric)} / mo)</span>
                    </div>
                    <span className="font-medium text-red-600">-{formatCurrency(inputs.monthlyElectric * inputs.holdingPeriodMonths)}</span>
                 </div>
                 <div className="border-t border-teal-300 pt-1 mt-1 flex justify-between font-bold">
                    <span>Total Holding</span>
                    <span className="text-red-700">-{formatCurrency(results.totalHoldingCosts)}</span>
                 </div>
             </div>
        </div>

        <div className="mt-3 pt-2 border-t border-teal-200 text-[10px] text-teal-600 flex justify-between print:mt-1 print:pt-1">
            <span>Closing Table Check (Before Holding):</span>
            <span className="font-bold">{formatCurrency(results.closingTableProfit)}</span>
        </div>
     </div>
  );

  // --- RENDER: LOGIN ---
  if (!currentUser) {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
                  <div className="bg-blue-900 p-8 text-center">
                      <div className="inline-block bg-white text-blue-900 p-3 rounded-lg font-bold text-3xl mb-4 shadow-lg">ZS</div>
                      <h1 className="text-2xl font-bold text-white mb-1">ZSrehab Flip Calculator</h1>
                      <div className="text-blue-200 text-sm font-medium">Hideout Version</div>
                      <p className="text-blue-300 text-xs mt-1 opacity-80">Real Estate Investment Platform</p>
                  </div>
                  <div className="p-8">
                      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{authMode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}</h2>
                      {authError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-100">{authError}</div>}
                      <form onSubmit={authMode === 'LOGIN' ? handleLogin : handleSignup} className="space-y-4">
                          <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
                              <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="Enter username" />
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
                              <input type="password" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Enter password" />
                          </div>
                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition shadow-md mt-2">{authMode === 'LOGIN' ? 'Log In' : 'Sign Up'}</button>
                      </form>
                      <div className="mt-6 text-center">
                          <button onClick={() => { setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN'); setAuthError(''); setAuthUsername(''); setAuthPassword(''); }} className="text-sm text-blue-600 hover:text-blue-800 font-medium">{authMode === 'LOGIN' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}</button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDER: REPORT MODE (Physical Sheet Metaphor) ---
  if (isReportMode) {
    return (
        <div className="min-h-screen bg-gray-200 font-sans text-slate-800 py-8 print:bg-white print:py-0">
            {/* Toolbar - Hidden on Print */}
            <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50 shadow-md no-print">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsReportMode(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-bold flex items-center gap-2">← Back to Editor</button>
                    <span className="text-sm text-gray-300">Previewing Printable Report</span>
                </div>
                <button onClick={() => window.print()} className="text-sm bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold border border-blue-500 shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Print Report
                </button>
            </div>

            {/* The Physical Sheet */}
            <div className="sheet shadow-2xl print:shadow-none print:pb-12">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-blue-900 pb-4 mb-6 print:pb-1 print:mb-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-900 text-white p-3 rounded font-bold text-2xl print-color-adjust-exact print:p-2 print:text-lg">ZS</div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 leading-none print:text-xl">ZSrehab Flip Calculator <span className="text-blue-900 ml-2">Hideout Version</span></h1>
                            <span className="text-sm text-gray-500 font-medium tracking-wide block mt-1 print:text-xs">INVESTMENT DEAL ANALYSIS • {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="text-right text-sm print:text-xs">
                        <div className="font-bold text-lg print:text-base">{inputs.address}</div>
                        <div>{inputs.state} {inputs.zipCode}</div>
                        <div className="text-gray-600 mt-1">{inputs.beds} Beds • {inputs.baths} Baths • {inputs.sqFt.toLocaleString()} SqFt</div>
                    </div>
                </div>

                {/* 1. Top Summary Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8 break-inside-avoid print:gap-2 print:mb-1">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
                        <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Deal Structure</h3>
                        <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
                            <div className="flex justify-between"><span>Purchase:</span> <span className="font-medium">{formatCurrency(inputs.purchasePrice)}</span></div>
                            <div className="flex justify-between text-gray-500 text-xs pl-2 print:text-[9px]"><span>Price/SqFt:</span> <span>{formatCurrency(results.purchasePricePerSqFt)}</span></div>

                            <div className="flex justify-between"><span>Rehab:</span> <span className="font-medium">{formatCurrency(inputs.rehabBudget)}</span></div>
                            <div className="flex justify-between text-blue-800 font-bold text-base mt-2 pt-2 border-t border-gray-200 print:text-[10px] print:mt-1 print:pt-1"><span>Total Cost:</span> <span>{formatCurrency(inputs.purchasePrice + inputs.rehabBudget)}</span></div>
                            
                            <div className="flex justify-between"><span>Est. ARV:</span> <span className="font-bold text-base print:text-[10px]">{formatCurrency(inputs.arv)}</span></div>
                            <div className="flex justify-between text-gray-500 text-xs pl-2 print:text-[9px]"><span>ARV/SqFt:</span> <span>{formatCurrency(results.arvPerSqFt)}</span></div>
                            
                            <div className="flex justify-between mt-1 text-xs text-gray-500 print:text-[9px]"><span>Max Allowable Offer:</span> <span className="font-medium">{formatCurrency(results.maxAllowableOffer)}</span></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
                        <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Borrower & Terms</h3>
                         <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
                            <div className="flex justify-between"><span>FICO / Exp:</span> <span className="font-medium">{inputs.ficoScore} / {inputs.experienceLevel}</span></div>
                            <div className="flex justify-between"><span>Liquidity:</span> <span className="font-bold text-base print:text-[10px]">{formatCurrency(inputs.liquidity)}</span></div>
                            <div className="flex justify-between"><span>Rate:</span> <span className="font-medium">{inputs.interestRate}%</span></div>
                            <div className="flex justify-between"><span>Points:</span> <span className="font-medium">{inputs.originationPoints} pts</span></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 print-color-adjust-exact break-inside-avoid shadow-sm print:p-1">
                         <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Assumptions</h3>
                         <div className="space-y-2 text-sm print:space-y-1 print:text-[10px]">
                            <div className="flex justify-between"><span>Strategy:</span> <span className="font-bold">Sell</span></div>
                            <div className="flex justify-between"><span>Holding:</span> <span className="font-medium">{inputs.holdingPeriodMonths} mo</span></div>
                            <div className="flex justify-between"><span>Transfer Tax:</span> <span className="font-medium">{inputs.transferTaxRate}%</span></div>
                            <div className="flex justify-between"><span>Title Rate:</span> <span className="font-medium">{inputs.titleInsuranceRate}%</span></div>
                        </div>
                    </div>
                </div>

                 {/* Notes if any */}
                 {inputs.notes && (
                    <div className="mb-6 bg-yellow-50 p-3 border border-yellow-200 rounded print-color-adjust-exact text-xs break-inside-avoid print:mb-1 print:p-1">
                        <span className="font-bold text-gray-900 uppercase mr-2">Notes:</span>
                        {inputs.notes}
                    </div>
                )}

                {/* 2. Main Tables (Side by Side) */}
                <div className="grid grid-cols-2 gap-8 break-inside-avoid print:gap-2">
                    
                    {/* LEFT: Loan Estimate */}
                    <div className="border border-gray-300 break-inside-avoid">
                        <div className="bg-gray-800 text-white font-bold p-1 text-center text-xs uppercase print-color-adjust-exact">Loan Estimate</div>
                        <div className="p-2 space-y-3 text-xs print:space-y-1 print:p-1">
                             <div>
                                <h4 className="font-bold text-gray-500 uppercase mb-1 text-[10px] print:mb-0">Funds</h4>
                                <ResultRow label="Total Loan" value={results.qualifiedLoanAmount} />
                                <ResultRow label="Initial Funding" value={results.initialFundedAmount} />
                                <ResultRow label="Rehab Holdback" value={results.holdbackAmount} />
                                <div className="flex justify-between pt-1"><span>LTV</span> <span className="font-bold">{results.ltv.toFixed(2)}%</span></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-500 uppercase mb-1 text-[10px] print:mb-0">Costs</h4>
                                <ResultRow label="Lender Fees" value={results.totalLenderFees} />
                                {/* Detailed Lender Fee Breakdown */}
                                <FeeBreakdownItem label={`Points (${inputs.originationPoints}%)`} value={results.pointsCost} />
                                <FeeBreakdownItem label="Underwriting" value={results.underwritingFee} />
                                <FeeBreakdownItem label="Processing" value={results.processingFee} />
                                <FeeBreakdownItem label="Doc Prep" value={results.docPrepFee} />
                                <FeeBreakdownItem label="Wire" value={results.wireFee} />

                                <ResultRow label="Third Party Fees" value={results.totalThirdPartyFees} />
                                {/* Detailed Third Party Fee Breakdown */}
                                <FeeBreakdownItem label="Transfer Tax" value={results.transferTaxCost} />
                                <FeeBreakdownItem label="Title Insurance" value={results.titleInsuranceCost} />
                                {/* Corrected Results Mapping */}
                                <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
                                <FeeBreakdownItem label="Recording" value={results.recordingCost} />
                                <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
                                <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
                                <FeeBreakdownItem label="Hideout Dues (Pro)" value={results.hideoutProratedDues} />
                                <FeeBreakdownItem label="Roamingwood (Pro)" value={results.roamingwoodProrated} />
                                <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />

                                <ResultRow label="Seller Credit" value={results.sellerConcessionAmount * -1} />
                                <ResultRow label="Earnest Deposit" value={inputs.earnestMoneyDeposit * -1} />
                                {results.buyerAgentCommissionCredit > 0 && (
                                     <ResultRow label="Agent Comm. Credit" value={results.buyerAgentCommissionCredit * -1} />
                                )}
                                <div className="flex justify-between border-t border-gray-300 pt-1 mt-1 font-bold text-sm print:text-xs">
                                    <span>{results.totalCashToClose >= 0 ? 'Cash to Close' : 'Cash Back'}</span>
                                    <span>{formatCurrency(Math.abs(results.totalCashToClose))}</span>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                    <span>Req. Liquidity:</span>
                                    <span className={inputs.liquidity >= results.requiredLiquidity ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{formatCurrency(results.requiredLiquidity)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Detailed Profit Table */}
                    <div>
                        <ProfitTable />
                    </div>
                </div>
                 
                 {/* Valuation & Returns (New in Report) */}
                 <div className="mt-6 break-inside-avoid print:mt-1">
                    <h3 className="font-bold text-gray-900 text-sm uppercase border-b border-gray-300 pb-2 mb-3 print:mb-1 print:pb-1 print:text-[10px]">Valuation & Returns</h3>
                    <div className="grid grid-cols-5 gap-4 print:gap-1">
                         {/* SqFt Metrics */}
                        <div className="bg-gray-50 rounded p-3 text-center border border-gray-200 print:p-1">
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wide print:text-[9px]">Buy / SqFt</div>
                            <div className="text-lg font-bold text-gray-900 mt-1 print:text-[10px]">
                                {formatCurrency(results.purchasePricePerSqFt)}
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded p-3 text-center border border-blue-200 print:p-1">
                            <div className="text-xs text-blue-600 font-bold uppercase tracking-wide print:text-[9px]">Sell / SqFt</div>
                            <div className="text-lg font-bold text-blue-700 mt-1 print:text-[10px]">
                                {formatCurrency(results.arvPerSqFt)}
                            </div>
                        </div>

                        {/* ROIs */}
                         <div className="bg-green-50 rounded p-3 text-center border border-green-200 print:p-1">
                            <div className="text-xs text-green-700 font-bold uppercase tracking-wide print:text-[9px]">Cash ROI</div>
                            <div className="text-lg font-bold text-green-700 mt-1 print:text-[10px]">
                                {formatPercent(results.roi)}
                            </div>
                            <div className="text-[10px] text-green-600 mt-0.5 print:text-[8px]">Cash on Cash</div>
                        </div>
                        
                        <div className="bg-purple-50 rounded p-3 text-center border border-purple-200 print:p-1">
                            <div className="text-xs text-purple-700 font-bold uppercase tracking-wide print:text-[9px]">Proj. ROI</div>
                            <div className="text-lg font-bold text-purple-700 mt-1 print:text-[10px]">
                                {formatPercent(results.projectRoi)}
                            </div>
                            <div className="text-[10px] text-purple-600 mt-0.5 print:text-[8px]">Return on Cost</div>
                        </div>

                        <div className="bg-indigo-50 rounded p-3 text-center border border-indigo-200 print:p-1">
                            <div className="text-xs text-indigo-700 font-bold uppercase tracking-wide print:text-[9px]">Net Margin</div>
                            <div className="text-lg font-bold text-indigo-700 mt-1 print:text-[10px]">
                                {formatPercent(results.netMargin)}
                            </div>
                            <div className="text-[10px] text-indigo-600 mt-0.5 print:text-[8px]">Return on Sales</div>
                        </div>
                    </div>
                 </div>

                 {/* 3. Closing Table Profit Card (Detailed) */}
                 <div className="mt-6 break-inside-avoid print:mt-1">
                    <ClosingProfitCard />
                 </div>

                 {/* 4. Sensitivity Analysis */}
                 <div className="mt-6 border border-gray-300 rounded overflow-hidden break-inside-avoid print-color-adjust-exact print:mt-1">
                     <div className="bg-gray-100 p-2 text-xs font-bold uppercase text-center text-gray-700 print:p-1 print:text-[10px]">ARV Sensitivity Analysis</div>
                     <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
                         <div className="p-1">Scenario</div>
                         <div className="p-1">ARV</div>
                         <div className="p-1">Net Profit</div>
                         <div className="p-1">Diff</div>
                         <div className="p-1">Close Profit</div>
                     </div>
                     {results.profitScenarios.map((s, idx) => (
                         <div key={idx} className={`grid grid-cols-5 text-[10px] text-center p-1 border-b border-gray-100 last:border-0 ${s.label === 'Baseline' ? 'bg-blue-50 font-bold' : ''} print:text-[9px] print:p-0`}>
                             <div>{s.label}</div>
                             <div>{formatCurrency(s.arv)}</div>
                             <div className={s.netProfit > 0 ? 'text-green-700' : 'text-red-600'}>{formatCurrency(s.netProfit)}</div>
                             <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>{formatCurrency(s.difference)}</div>
                             <div>{formatCurrency(s.closingTableProfit)}</div>
                         </div>
                     ))}
                 </div>
                 
                  {/* 5. Seller Net Analysis (New in Report) */}
                 <div className="mt-6 border border-indigo-300 rounded bg-indigo-50 p-3 print-color-adjust-exact break-inside-avoid print:mt-1 print:p-1">
                     <div className="flex justify-between items-center border-b border-indigo-200 pb-2 mb-2 print:pb-1 print:mb-1">
                        <div className="text-indigo-900 font-bold uppercase text-xs">Seller's Estimated Net Proceeds</div>
                        <div className="text-indigo-900 font-bold text-xl print:text-sm">{formatCurrency(results.sellerNetProceeds)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs print:gap-2 print:text-[10px]">
                        <div className="space-y-1">
                            <div className="flex justify-between"><span className="opacity-70">Sale Price</span> <span className="font-bold">{formatCurrency(inputs.purchasePrice)}</span></div>
                            <div className="flex justify-between"><span className="opacity-70">Mortgage Balance</span> <span className="font-bold">-{formatCurrency(inputs.sellerMortgageBalance)}</span></div>
                            {inputs.sellerLineOfCreditBalance > 0 && (
                                <div className="flex justify-between"><span className="opacity-70">Line of Credit</span> <span className="font-bold">-{formatCurrency(inputs.sellerLineOfCreditBalance)}</span></div>
                            )}
                            <div className="flex justify-between text-[10px] pt-2 border-t border-indigo-200"><span className="opacity-70">Original Purchase</span> <span className="font-medium text-gray-500">{formatCurrency(inputs.sellerOriginalPurchasePrice)}</span></div>
                        </div>
                        <div className="space-y-1">
                             <div className="flex justify-between"><span className="opacity-70">Commission</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerCommissionCost)}</span></div>
                             <div className="flex justify-between"><span className="opacity-70">Transfer Tax</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerTransferTaxCost)}</span></div>
                             <div className="flex justify-between"><span className="opacity-70">Concessions</span> <span className="font-bold text-red-600">-{formatCurrency(results.sellerConcessionAmount)}</span></div>
                             <div className="flex justify-between"><span className="opacity-70">Misc Fees</span> <span className="font-bold text-red-600">-{formatCurrency(inputs.sellerMiscFees)}</span></div>
                        </div>
                    </div>
                 </div>

            </div>
        </div>
    );
  }

  // --- RENDER: MAIN EDITOR ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
             <div className="bg-blue-900 text-white p-2 rounded font-bold tracking-tighter text-xl">ZS</div>
             <div>
               <h1 className="text-lg font-bold text-gray-900 leading-none">ZSrehab Flip Calculator</h1>
               <div className="flex items-center gap-2">
                   <span className="text-xs text-gray-500 font-medium tracking-wide">100% LOAN QUALIFIER</span>
                   <span className="text-xs text-blue-600 font-medium">User: {currentUser.username}</span>
               </div>
             </div>
          </div>
          
          {/* Centered Hideout Version */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="bg-blue-50 text-blue-800 px-4 py-1 rounded-full text-xs font-bold border border-blue-100 shadow-sm uppercase tracking-wide">
                Hideout Version
            </div>
          </div>

          <div className="flex items-center space-x-2">
             <button onClick={handleNewDeal} className="text-gray-500 hover:text-blue-600 font-medium px-3 py-1 rounded text-sm transition">New</button>
             <button onClick={handleSaveDeal} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2 relative">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                 Save
                 {saveNotification && <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow whitespace-nowrap z-50">{saveNotification}</div>}
             </button>
             <button onClick={() => setIsDealModalOpen(true)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500"><path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75H2.75A.75.75 0 012 16.25V3.75zm1.5 1.5v11h13v-11h-13z" clipRule="evenodd" /><path d="M6.25 6.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 3.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" /></svg>
                 My Deals ({savedDeals.length})
             </button>
             <div className="h-6 w-px bg-gray-300 mx-2"></div>
             <button type="button" onClick={() => setIsReportMode(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.198-.54-1.214-1.201l.228-2.267m7.144 0h-7.144m7.144 0l-7.144 0M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 9.148A4.689 4.689 0 015.65 8.5m15.75 0a48.868 48.868 0 01-.001 4.726C21.402 11.965 20.208 12 18.75 12m-13.5 0c-1.261 0-2.614-.034-3.808.138m3.808-.138c.344-.982 1.009-1.875 1.938-2.618 3.562-2.832 8.796-2.834 12.378 0 .966.772 1.637 1.745 1.938 2.79m-9.435-10.825a1.033 1.033 0 011.055-.003 3.84 3.84 0 002.3.755 3.84 3.84 0 002.3-.755 1.033 1.033 0 011.055.003c.969.673 1.527 2.22 1.09 3.443C15.844 7.07 14.118 8 12 8c-2.118 0-3.844-.93-4.902-2.396-.437-1.223.12-2.77 1.09-3.443z" /></svg>
               Report
             </button>
             <div className="h-6 w-px bg-gray-300 mx-2"></div>
             <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 font-medium px-2 py-1 rounded text-xs transition" title="Log Out">Log Out</button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* ... Inputs Column ... */}
            <div className="w-full lg:w-1/2 space-y-6">
                 {/* Property Info */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-sm font-bold text-gray-800 uppercase">Property Information</h2>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Lender: {inputs.lenderName}</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <InputGroup label="Property Address" id="address" value={inputs.address} onChange={v => handleInputChange('address', v)} type="text" />
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1"><label className="text-xs font-semibold text-gray-500 uppercase">State</label><select className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" value={inputs.state} onChange={e => handleInputChange('state', e.target.value)}><option value="PA">PA</option><option value="NJ">NJ</option><option value="NY">NY</option></select></div>
                            <div className="col-span-1"><InputGroup label="Zip" id="zip" value={inputs.zipCode} onChange={v => handleInputChange('zipCode', v)} type="text" /></div>
                            <div className="col-span-1"><label className="text-xs font-semibold text-gray-500 uppercase">Type</label><select className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" value={inputs.propertyType} onChange={e => handleInputChange('propertyType', e.target.value)}><option value="SFR">SFR</option><option value="Multi-Family">Multi</option></select></div>
                            <div className="col-span-1"><InputGroup label="Units" id="units" value={inputs.units} onChange={v => handleInputChange('units', v)} /></div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 pt-2 border-t border-gray-100">
                             <InputGroup label="SqFt" id="sqft" value={inputs.sqFt} onChange={v => handleInputChange('sqFt', v)} />
                             <InputGroup label="Beds" id="beds" value={inputs.beds} onChange={v => handleInputChange('beds', v)} />
                             <InputGroup label="Baths" id="baths" value={inputs.baths} onChange={v => handleInputChange('baths', v)} />
                             <div className="col-span-1"><label className="text-xs font-semibold text-gray-500 uppercase">Foundation</label><select className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" value={inputs.foundationType} onChange={e => handleInputChange('foundationType', e.target.value)}><option value="Basement">Basement</option><option value="Crawl Space">Crawl Space</option><option value="Slab">Slab</option></select></div>
                        </div>
                    </div>
                </section>
                
                {/* Economics */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200"><h2 className="text-sm font-bold text-gray-800 uppercase">Deal Economics</h2></div>
                    <div className="p-6 grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-6">
                             <div>
                                <InputGroup label="Purchase Price" id="purchasePrice" value={inputs.purchasePrice} onChange={v => handleInputChange('purchasePrice', v)} prefix="$" step={1000} />
                                <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">{formatCurrency(results.purchasePricePerSqFt)} / SqFt</div>
                                <div className="mt-4 bg-blue-50 border border-blue-100 rounded p-3 text-xs space-y-2">
                                    <div className="flex justify-between font-bold text-blue-900 uppercase border-b border-blue-200 pb-1 mb-1">
                                        <span>Max Offer Analysis (75% LTV)</span>
                                        <span>{formatCurrency(results.maxAllowableOffer)}</span>
                                    </div>
                                    <div className="flex justify-between text-blue-800 opacity-80">
                                        <span>Max Loan (75% of ARV)</span>
                                        <span>{formatCurrency(results.maxLoanAmountDollars)}</span>
                                    </div>
                                    <div className="flex justify-between text-blue-800 opacity-80">
                                        <span>Less: Rehab Budget</span>
                                        <span>-{formatCurrency(inputs.rehabBudget)}</span>
                                    </div>
                                    <div className="pt-2 text-center">
                                         <button onClick={() => handleInputChange('purchasePrice', Math.max(0, results.maxAllowableOffer))} className="text-blue-600 font-bold hover:underline bg-white px-2 py-1 rounded border border-blue-200 shadow-sm w-full transition hover:shadow">
                                            Apply Max Offer to Purchase Price
                                        </button>
                                    </div>
                                </div>
                             </div>
                             <InputGroup label="Rehab Budget" id="rehab" value={inputs.rehabBudget} onChange={v => handleInputChange('rehabBudget', v)} prefix="$" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputGroup label="Est. ARV" id="arv" value={inputs.arv} onChange={v => handleInputChange('arv', v)} prefix="$" />
                                <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">{formatCurrency(results.arvPerSqFt)} / SqFt</div>
                            </div>
                            <InputGroup label="As-Is Value" id="asis" value={inputs.asIsValue} onChange={v => handleInputChange('asIsValue', v)} prefix="$" />
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                             <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Est. Closing Date</label>
                             <input type="date" value={inputs.closingDate} onChange={(e) => handleInputChange('closingDate', e.target.value)} className="block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" />
                        </div>
                         <div className="border-t border-gray-100 pt-4">
                             <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Escrow & Credits</h3>
                             <div className="grid grid-cols-2 gap-6 mb-4">
                                <InputGroup label="Earnest Money Deposit" id="emd" value={inputs.earnestMoneyDeposit} onChange={v => handleInputChange('earnestMoneyDeposit', v)} prefix="$" />
                                <InputGroup label="Seller Concession" id="sellerConcession" value={inputs.sellerConcessionRate} onChange={v => handleInputChange('sellerConcessionRate', v)} suffix="%" step={0.5} />
                             </div>
                             
                             {/* NEW FIELD: Buyer Agent Commission Credit */}
                             <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                                <InputGroup 
                                    id="buyerAgentCommissionRate" 
                                    label="Buyer Agent Commission Credit" 
                                    suffix="%" 
                                    value={inputs.buyerAgentCommissionRate} 
                                    onChange={(v) => handleInputChange('buyerAgentCommissionRate', v)} 
                                    step={0.5} 
                                />
                                <p className="text-[10px] text-yellow-700 mt-1">If you are a realtor, this commission is credited towards your closing costs.</p>
                            </div>
                         </div>
                    </div>
                </section>
                
                 {/* Seller Side Analysis (New) */}
                 <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100"><h2 className="text-sm font-bold text-indigo-900 uppercase">Seller Side Analysis</h2></div>
                    <div className="p-6 grid grid-cols-2 gap-6">
                         <InputGroup label="Seller Original Purchase" id="sop" value={inputs.sellerOriginalPurchasePrice} onChange={v => handleInputChange('sellerOriginalPurchasePrice', v)} prefix="$" />
                         <InputGroup label="Current Mortgage Balance" id="smb" value={inputs.sellerMortgageBalance} onChange={v => handleInputChange('sellerMortgageBalance', v)} prefix="$" />
                         <InputGroup label="Line of Credit Balance" id="sloc" value={inputs.sellerLineOfCreditBalance} onChange={v => handleInputChange('sellerLineOfCreditBalance', v)} prefix="$" />
                         <InputGroup label="Seller Commission %" id="scom" value={inputs.sellerAgentCommissionRate} onChange={v => handleInputChange('sellerAgentCommissionRate', v)} suffix="%" />
                         <InputGroup label="Seller Transfer Tax %" id="sttx" value={inputs.sellerTransferTaxRate} onChange={v => handleInputChange('sellerTransferTaxRate', v)} suffix="%" />
                         <InputGroup label="Seller Misc Closing Fees" id="smisc" value={inputs.sellerMiscFees} onChange={v => handleInputChange('sellerMiscFees', v)} prefix="$" />
                    </div>
                </section>
                
                {/* Detailed HUD */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200"><h2 className="text-sm font-bold text-gray-800 uppercase">Detailed HUD Charges</h2></div>
                    <div className="p-6 grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Title Ins. Rate" id="title" value={inputs.titleInsuranceRate} onChange={v => handleInputChange('titleInsuranceRate', v)} suffix="%" step={0.01} />
                            <InputGroup label="Legal & Settlement" id="legal" value={inputs.legalSettlementFees} onChange={v => handleInputChange('legalSettlementFees', v)} prefix="$" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Govt Recording" id="rec" value={inputs.recordingFees} onChange={v => handleInputChange('recordingFees', v)} prefix="$" />
                            <InputGroup label="Transfer Tax Rate" id="tt" value={inputs.transferTaxRate} onChange={v => handleInputChange('transferTaxRate', v)} suffix="%" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                             <InputGroup label="Walker Doc" id="wd" value={inputs.walkerDocPrep} onChange={v => handleInputChange('walkerDocPrep', v)} prefix="$" />
                             <InputGroup label="Walker Overnight" id="wo" value={inputs.walkerOvernight} onChange={v => handleInputChange('walkerOvernight', v)} prefix="$" />
                             <InputGroup label="Walker Wire" id="ww" value={inputs.walkerWire} onChange={v => handleInputChange('walkerWire', v)} prefix="$" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Hideout Transfer" id="ht" value={inputs.hideoutTransferFee} onChange={v => handleInputChange('hideoutTransferFee', v)} prefix="$" />
                            <InputGroup label="Hideout Annual" id="ha" value={inputs.hideoutAnnualFee} onChange={v => handleInputChange('hideoutAnnualFee', v)} prefix="$" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                             <InputGroup label="Roamingwood (Ann.)" id="ra" value={inputs.roamingwoodAnnual} onChange={v => handleInputChange('roamingwoodAnnual', v)} prefix="$" />
                             <InputGroup label="School Tax (Ann.)" id="sa" value={inputs.schoolTaxAnnual} onChange={v => handleInputChange('schoolTaxAnnual', v)} prefix="$" />
                        </div>
                    </div>
                </section>
                
                {/* Profit/Strategy */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                     <div className="bg-gray-50 px-6 py-3 border-b border-gray-200"><h2 className="text-sm font-bold text-gray-800 uppercase">Exit Strategy</h2></div>
                     <div className="p-6">
                        {/* Refinance Toggle Removed - Default to Sell */}
                        <div className="grid grid-cols-2 gap-4">
                             <InputGroup label="Holding Months" id="hold" value={inputs.holdingPeriodMonths} onChange={v => handleInputChange('holdingPeriodMonths', v)} />
                             <InputGroup label="Mo. Electric" id="elec" value={inputs.monthlyElectric} onChange={v => handleInputChange('monthlyElectric', v)} prefix="$" />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded border border-yellow-100">
                            <InputGroup label="Commission %" id="comm" value={inputs.sellingCommissionRate} onChange={v => handleInputChange('sellingCommissionRate', v)} suffix="%" />
                            <InputGroup label="Transfer Tax %" id="stt" value={inputs.sellingTransferTaxRate} onChange={v => handleInputChange('sellingTransferTaxRate', v)} suffix="%" />
                        </div>
                     </div>
                </section>
                
                {/* Borrower */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                     <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-sm font-bold text-gray-800 uppercase">Borrower & Active Loan</h2>
                        <button onClick={handleCaptureBaseline} className="text-[10px] text-blue-600 hover:text-blue-500 font-bold transition">Snapshot to Comparison</button>
                     </div>
                     <div className="p-6 space-y-4">
                        <InputGroup 
                            label="Lender Profile Name" 
                            id="lenderName" 
                            type="text" 
                            value={inputs.lenderName} 
                            onChange={v => handleInputChange('lenderName', v)} 
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <InputGroup label="FICO" id="fico" value={inputs.ficoScore} onChange={v => handleInputChange('ficoScore', v)} />
                            <InputGroup label="Liquidity" id="liq" value={inputs.liquidity} onChange={v => handleInputChange('liquidity', v)} prefix="$" />
                            <InputGroup label="Exp (Deals)" id="exp" value={inputs.experienceLevel} onChange={v => handleInputChange('experienceLevel', v)} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <InputGroup label="Rate" id="rate" value={inputs.interestRate} onChange={v => handleInputChange('interestRate', v)} suffix="%" step={0.125} />
                            <InputGroup label="Points" id="pts" value={inputs.originationPoints} onChange={v => handleInputChange('originationPoints', v)} suffix="pts" />
                            <InputGroup label="Term" id="term" value={inputs.loanTermMonths} onChange={v => handleInputChange('loanTermMonths', v)} suffix="mo" />
                        </div>
                        
                        {/* DYNAMIC LENDER FEES FOR BASELINE */}
                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Lender Upfront Fees</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Underwriting" id="bUw" value={inputs.underwritingFee} onChange={v => handleInputChange('underwritingFee', v)} prefix="$" />
                                <InputGroup label="Processing" id="bPr" value={inputs.processingFee} onChange={v => handleInputChange('processingFee', v)} prefix="$" />
                                <InputGroup label="Doc Prep" id="bDp" value={inputs.docPrepFee} onChange={v => handleInputChange('docPrepFee', v)} prefix="$" />
                                <InputGroup label="Wire Fee" id="bWi" value={inputs.wireFee} onChange={v => handleInputChange('wireFee', v)} prefix="$" />
                                <div className="col-span-2">
                                  <InputGroup label="Other Lender Fees" id="bOt" value={inputs.otherLenderFees || 0} onChange={v => handleInputChange('otherLenderFees', v)} prefix="$" />
                                </div>
                            </div>
                        </div>
                     </div>
                </section>
                
                 {/* Notes */}
                 <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                     <div className="bg-gray-50 px-6 py-3 border-b border-gray-200"><h2 className="text-sm font-bold text-gray-800 uppercase">Notes</h2></div>
                     <div className="p-6"><textarea className="w-full rounded-md border-gray-300 shadow-sm border p-3 min-h-[100px]" value={inputs.notes} onChange={e => handleInputChange('notes', e.target.value)} placeholder="Renovation details..." /></div>
                 </section>

            </div>

            {/* ... Results Column ... */}
            <div className="w-full lg:w-1/2 space-y-6">
                 <div className="sticky top-24 space-y-6">
                    
                    {/* Eligibility Alert */}
                    {!results.isEligible && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Review Deal Eligibility</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            {results.eligibilityReasons.map((reason, idx) => (
                                                <li key={idx}>{reason}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats - Max Offer */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 text-sm font-medium">Max Allowable Offer</span>
                            <span className="text-xl font-bold text-blue-600">{formatCurrency(results.maxAllowableOffer)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (inputs.purchasePrice / results.maxAllowableOffer) * 100)}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Current: {formatCurrency(inputs.purchasePrice)}</span>
                            <span>{Math.round((inputs.purchasePrice / results.maxAllowableOffer) * 100)}% of Max</span>
                        </div>
                    </div>

                    {/* Valuation & Returns Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Valuation & Returns</h3>
                        <div className="grid grid-cols-2 gap-3 mb-3 border-b border-gray-100 pb-3">
                             {/* SqFt Metrics */}
                            <div className="bg-gray-50 rounded p-2 text-center border border-gray-100">
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Buy / SqFt</div>
                                <div className="text-sm font-bold text-gray-900 mt-1">
                                    {formatCurrency(results.purchasePricePerSqFt)}
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded p-2 text-center border border-blue-100">
                                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Sell / SqFt</div>
                                <div className="text-sm font-bold text-blue-700 mt-1">
                                    {formatCurrency(results.arvPerSqFt)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {/* Cash on Cash (Existing) */}
                            <div className="bg-green-50 rounded p-2 text-center border border-green-100">
                                <div className="text-[10px] text-green-600 font-bold uppercase tracking-wide">Cash ROI</div>
                                <div className="text-sm font-bold text-green-700 mt-1">
                                    {formatPercent(results.roi)}
                                </div>
                                <div className="text-[9px] text-green-500 mt-0.5">Cash on Cash</div>
                            </div>
                            
                            {/* Project ROI (Total Cost) */}
                            <div className="bg-purple-50 rounded p-2 text-center border border-purple-100">
                                <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wide">Proj. ROI</div>
                                <div className="text-sm font-bold text-purple-700 mt-1">
                                    {formatPercent(results.projectRoi)}
                                </div>
                                <div className="text-[9px] text-purple-500 mt-0.5">Return on Cost</div>
                            </div>

                            {/* Net Margin (Sales Price) */}
                            <div className="bg-indigo-50 rounded p-2 text-center border border-indigo-100">
                                <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">Margin</div>
                                <div className="text-sm font-bold text-indigo-700 mt-1">
                                    {formatPercent(results.netMargin)}
                                </div>
                                <div className="text-[9px] text-indigo-500 mt-0.5">Return on Sales</div>
                            </div>
                        </div>
                    </div>

                    {/* Loan Estimate Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                         <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white rounded-t-xl">
                             <h2 className="text-lg font-bold uppercase">{inputs.lenderName || 'BASELINE'} ESTIMATE</h2>
                             <div className="text-right"><div className="text-xs opacity-70">QUALIFIED LOAN</div><div className="text-2xl font-bold text-green-400">{formatCurrency(results.qualifiedLoanAmount)}</div></div>
                         </div>
                         <div className="p-6">
                             <ResultRow label="Total Loan Amount" value={results.qualifiedLoanAmount} isTotal />
                             <ResultRow label="Max Allowable Offer" subtext="For 100% Loan" value={results.maxAllowableOffer} />
                             <ResultRow label="Current LTV" subtext="% of ARV" value={`${results.ltv.toFixed(2)}%`} isCurrency={false} highlight={results.ltv > 75} />
                             
                             <ResultRow label="Lender Fees" value={results.totalLenderFees} />
                             {/* Detailed Lender Fee Breakdown */}
                             <FeeBreakdownItem label={`Points (${inputs.originationPoints}%)`} value={results.pointsCost} />
                             <FeeBreakdownItem label="Underwriting" value={results.underwritingFee} />
                             <FeeBreakdownItem label="Processing" value={results.processingFee} />
                             <FeeBreakdownItem label="Doc Prep" value={results.docPrepFee} />
                             <FeeBreakdownItem label="Wire" value={results.wireFee} />
                             <FeeBreakdownItem label="Other Lender Fees" value={results.otherLenderFees} />

                             <ResultRow label="Third Party Fees" value={results.totalThirdPartyFees} />
                             {/* Detailed Third Party Fee Breakdown Corrected */}
                             <FeeBreakdownItem label="Transfer Tax" value={results.transferTaxCost} />
                             <FeeBreakdownItem label="Title Insurance" value={results.titleInsuranceCost} />
                             <FeeBreakdownItem label="Legal & Settlement" value={results.legalSettlementCost} />
                             <FeeBreakdownItem label="Recording" value={results.recordingCost} />
                             <FeeBreakdownItem label="Walker & Walker Fees" value={results.totalWalkerFees} />
                             <FeeBreakdownItem label="Hideout Transfer" value={results.hideoutTransferCost} />
                             <FeeBreakdownItem label="Hideout Dues (Pro)" value={results.hideoutProratedDues} />
                             <FeeBreakdownItem label="Roamingwood (Pro)" value={results.roamingwoodProrated} />
                             <FeeBreakdownItem label="School Tax (Pro)" value={results.schoolTaxProrated} />

                             <div className="my-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                                 <h3 className="font-bold text-gray-800 uppercase mb-2">Cash Required to Close</h3>
                                 <ResultRow label="Lender Fees" value={results.totalLenderFees} />
                                 <ResultRow label="Third Party" value={results.totalThirdPartyFees} />
                                 <ResultRow label="Seller Concession" value={results.sellerConcessionAmount * -1} />
                                 <ResultRow label="Earnest Deposit" value={inputs.earnestMoneyDeposit * -1} />
                                 {results.buyerAgentCommissionCredit > 0 && (
                                     <ResultRow label="Agent Comm. Credit" value={results.buyerAgentCommissionCredit * -1} highlight />
                                 )}
                                 <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-yellow-300 text-gray-900">
                                     <span>{results.totalCashToClose >= 0 ? 'Due at Closing' : 'Cash to Borrower'}</span>
                                     <span className={results.totalCashToClose < 0 ? 'text-green-600' : ''}>{formatCurrency(Math.abs(results.totalCashToClose))}</span>
                                 </div>
                                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                     <span>Required Liquidity Evidence:</span>
                                     <span className={`font-bold ${inputs.liquidity >= results.requiredLiquidity ? 'text-green-600' : 'text-red-600'}`}>
                                       {formatCurrency(results.requiredLiquidity)}
                                     </span>
                                  </div>
                             </div>
                         </div>
                    </div>

                    {/* LENDER COMPARISON SECTION */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden no-print">
                        <div className="bg-blue-900 px-6 py-3 flex justify-between items-center text-white">
                            <h2 className="text-sm font-bold uppercase tracking-wider">Lender Comparison</h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleAddLender}
                                    className="bg-blue-600 hover:bg-blue-500 text-xs font-bold px-3 py-1 rounded transition shadow-sm"
                                >
                                    Add New Lender
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            {/* Lender Cards List */}
                            <div className="grid gap-3">
                                {lenders.map(l => (
                                    <div key={l.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center group transition hover:border-blue-300">
                                        <div className="flex flex-col">
                                            <div className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                                {l.lenderName}
                                                {inputs.lenderName === l.lenderName && <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Active</span>}
                                            </div>
                                            <div className="text-[10px] text-gray-500">{l.interestRate}% Rate • {l.originationPoints} pts</div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <button 
                                              onClick={() => handleApplyLender(l)} 
                                              className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm hover:bg-green-700 transition"
                                            >
                                              Use Numbers
                                            </button>
                                            <button onClick={() => handleEditLender(l)} className="text-blue-600 text-[10px] font-bold px-2 py-1 bg-blue-50 rounded hover:bg-blue-100">Edit</button>
                                            <button onClick={() => handleDeleteLender(l.id)} className="text-red-500 text-[10px] font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100">Del</button>
                                        </div>
                                    </div>
                                ))}
                                {lenders.length === 0 && (
                                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-xs">
                                        No comparison lenders added. Use "Snapshot" from active loan section or add new.
                                    </div>
                                )}
                            </div>

                            {/* Comparison Table */}
                            {comparisonData.length > 0 && (
                                <div className="mt-4 border border-gray-100 rounded-lg overflow-x-auto">
                                    <table className="w-full text-[10px] text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase">
                                            <tr>
                                                <th className="px-2 py-2">Quick View</th>
                                                <th className="px-2 py-2 border-l">ACTIVE</th>
                                                {comparisonData.map(c => (
                                                    <th key={c.lender.id} className="px-2 py-2 border-l bg-blue-50/30 font-bold">{c.lender.lenderName}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="px-2 py-1.5 font-medium">Lender Fees</td>
                                                <td className="px-2 py-1.5 border-l">{formatCurrency(results.totalLenderFees)}</td>
                                                {comparisonData.map(c => (
                                                    <td key={c.lender.id} className={`px-2 py-1.5 border-l ${c.results.lenderUpfrontFeesAdjusted === bestLenderFees ? 'bg-green-50 font-bold' : ''}`}>{formatCurrency(c.results.lenderUpfrontFeesAdjusted)}</td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-1.5 font-medium">Monthly Pmt</td>
                                                <td className="px-2 py-1.5 border-l">{formatCurrency(results.monthlyPayment)}</td>
                                                {comparisonData.map(c => (
                                                    <td key={c.lender.id} className={`px-2 py-1.5 border-l ${c.results.comparisonMonthlyPayment === bestMonthlyPayment ? 'bg-green-50 font-bold' : ''}`}>{formatCurrency(c.results.comparisonMonthlyPayment)}</td>
                                                ))}
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-2 py-1.5 font-bold">Proj. Profit</td>
                                                <td className="px-2 py-1.5 border-l font-bold">{formatCurrency(results.netProfit)}</td>
                                                {comparisonData.map(c => (
                                                    <td key={c.lender.id} className="px-2 py-1.5 border-l font-bold">
                                                        <div className="flex flex-col">
                                                            <span className={c.results.netProfit > results.netProfit ? 'text-green-600' : 'text-red-600'}>
                                                                {formatCurrency(c.results.netProfit)}
                                                            </span>
                                                            <button onClick={() => handleApplyLender(c.lender)} className="text-[8px] text-blue-600 underline mt-0.5 text-left hover:text-blue-800">Apply terms</button>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Profit Table */}
                    <ProfitTable />
                    
                    {/* Closing Table Profit (Detailed) */}
                    <ClosingProfitCard />

                    {/* Sensitivity Analysis */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-100 p-2 text-xs font-bold uppercase text-center text-gray-700 border-b border-gray-200">ARV Sensitivity Analysis</div>
                        <div className="grid grid-cols-5 text-[10px] font-bold bg-white text-center border-b border-gray-200">
                            <div className="p-2">Scenario</div>
                            <div className="p-2">ARV</div>
                            <div className="p-2">Net Profit</div>
                            <div className="p-2">Diff</div>
                            <div className="p-2">Close Profit</div>
                        </div>
                        {results.profitScenarios.map((s, idx) => (
                            <div key={idx} className={`grid grid-cols-5 text-xs text-center p-2 border-b border-gray-100 last:border-0 ${s.label === 'Baseline' ? 'bg-blue-50 font-bold' : ''}`}>
                                <div>{s.label}</div>
                                <div>{formatCurrency(s.arv)}</div>
                                <div className={s.netProfit > 0 ? 'text-green-700' : 'text-red-600'}>{formatCurrency(s.netProfit)}</div>
                                <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>{formatCurrency(s.difference)}</div>
                                <div>{formatCurrency(s.closingTableProfit)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Seller Net Analysis Result Card */}
                    <div className="bg-indigo-50 border border-indigo-300 rounded p-4 shadow-sm">
                        <div className="flex justify-between items-center border-b border-indigo-200 pb-2 mb-2">
                             <div className="text-indigo-900 font-bold uppercase text-xs">Seller's Estimated Net Proceeds</div>
                             <div className="text-indigo-900 font-bold text-xl">{formatCurrency(results.sellerNetProceeds)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-indigo-800">
                            <div className="space-y-1">
                                <div className="flex justify-between"><span className="opacity-70">Sale Price</span><span className="font-bold">{formatCurrency(inputs.purchasePrice)}</span></div>
                                <div className="flex justify-between"><span className="opacity-70">Mortgage Balance</span><span className="font-bold">-{formatCurrency(inputs.sellerMortgageBalance)}</span></div>
                                {inputs.sellerLineOfCreditBalance > 0 && (
                                    <div className="flex justify-between"><span className="opacity-70">Line of Credit</span><span className="font-bold">-{formatCurrency(inputs.sellerLineOfCreditBalance)}</span></div>
                                )}
                                <div className="flex justify-between text-[10px] pt-2 border-t border-indigo-200"><span className="opacity-70">Original Purchase</span><span className="font-medium text-gray-500">{formatCurrency(inputs.sellerOriginalPurchasePrice)}</span></div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between"><span className="opacity-70">Commission</span><span className="font-bold text-red-600">-{formatCurrency(results.sellerCommissionCost)}</span></div>
                                <div className="flex justify-between"><span className="opacity-70">Transfer Tax</span><span className="font-bold text-red-600">-{formatCurrency(results.sellerTransferTaxCost)}</span></div>
                                <div className="flex justify-between"><span className="opacity-70">Concessions</span><span className="font-bold text-red-600">-{formatCurrency(results.sellerConcessionAmount)}</span></div>
                                <div className="flex justify-between"><span className="opacity-70">Misc Fees</span><span className="font-bold text-red-600">-{formatCurrency(inputs.sellerMiscFees)}</span></div>
                            </div>
                        </div>
                     </div>

                 </div>
            </div>
        </div>
      </main>

      {/* Modals (Deal Manager) */}
      {isDealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 no-print">
            <div className="bg-white rounded p-6 w-96 shadow-2xl">
                <h3 className="font-bold mb-4">Saved Deals</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                    {savedDeals.map(d => (
                        <div key={d.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50 group">
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm font-bold truncate text-gray-800">{d.name}</span>
                              <span className="text-[10px] text-gray-400">{d.date}</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleLoadDeal(d)} className="text-blue-600 text-xs font-bold px-2 py-1 bg-blue-50 rounded hover:bg-blue-100">Load</button>
                              <button onClick={(e) => handleDeleteDeal(d.id, e)} className="text-red-600 text-xs font-bold px-2 py-1 bg-red-50 rounded hover:bg-red-100">Delete</button>
                            </div>
                        </div>
                    ))}
                    {savedDeals.length === 0 && <div className="text-sm text-gray-500 text-center py-4">No deals saved.</div>}
                </div>
                <button onClick={() => setIsDealModalOpen(false)} className="w-full bg-gray-200 hover:bg-gray-300 transition rounded py-2 text-sm font-bold">Close</button>
            </div>
        </div>
      )}

      {/* Lender Entry Modal */}
      {isLenderModalOpen && editingLender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 no-print">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-blue-900 p-6">
              <h3 className="text-white font-bold text-xl">Lender Configuration</h3>
              <p className="text-blue-200 text-xs mt-1">Define financing terms to compare and apply to active deal</p>
            </div>
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup 
                  label="Lender Name" 
                  id="lName" 
                  type="text" 
                  value={editingLender.lenderName} 
                  onChange={v => setEditingLender({...editingLender, lenderName: v as string})} 
                />
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Loan Type</label>
                  <select 
                    className="block w-full rounded-md border-gray-300 py-2 text-sm border pl-3"
                    value={editingLender.loanType}
                    onChange={e => setEditingLender({...editingLender, loanType: e.target.value as any})}
                  >
                    <option value="HARD_MONEY">Hard Money</option>
                    <option value="DSCR">DSCR</option>
                    <option value="BANK">Bank</option>
                    <option value="PRIVATE">Private</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <InputGroup 
                  label="Int. Rate (%)" 
                  id="lRate" 
                  value={editingLender.interestRate} 
                  min={0} max={30} step={0.1}
                  onChange={v => setEditingLender({...editingLender, interestRate: Math.min(30, v as number)})} 
                  suffix="%"
                />
                <InputGroup 
                  label="Orig. Points (%)" 
                  id="lPts" 
                  value={editingLender.originationPoints} 
                  min={0} max={10} step={0.25}
                  onChange={v => setEditingLender({...editingLender, originationPoints: Math.min(10, v as number)})} 
                  suffix="pts"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <InputGroup label="Underwriting Fee" id="lUw" value={editingLender.underwritingFee} min={0} onChange={v => setEditingLender({...editingLender, underwritingFee: v as number})} prefix="$" />
                <InputGroup label="Processing Fee" id="lPr" value={editingLender.processingFee} min={0} onChange={v => setEditingLender({...editingLender, processingFee: v as number})} prefix="$" />
                <InputGroup label="Doc Prep Fee" id="lDp" value={editingLender.docPrepFee} min={0} onChange={v => setEditingLender({...editingLender, docPrepFee: v as number})} prefix="$" />
                <InputGroup label="Wire Fee" id="lWi" value={editingLender.wireFee} min={0} onChange={v => setEditingLender({...editingLender, wireFee: v as number})} prefix="$" />
                <div className="col-span-2">
                  <InputGroup label="Other Fees" id="lOt" value={editingLender.otherFees} min={0} onChange={v => setEditingLender({...editingLender, otherFees: v as number})} prefix="$" />
                </div>
                <InputGroup label="Loan Override" id="lOv" value={editingLender.loanAmountOverride} min={0} onChange={v => setEditingLender({...editingLender, loanAmountOverride: v as number})} prefix="$" />
              </div>

              <div className="pt-4 border-t border-gray-100">
                 <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Notes</label>
                 <textarea 
                  className="w-full rounded-md border-gray-300 text-sm border p-2 h-20"
                  value={editingLender.notes}
                  onChange={e => setEditingLender({...editingLender, notes: e.target.value})}
                  placeholder="Lender specific details..."
                 />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="lComp" 
                  checked={editingLender.includeInComparison} 
                  onChange={e => setEditingLender({...editingLender, includeInComparison: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="lComp" className="text-xs font-bold text-gray-700">Include in Comparison Table</label>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex gap-4">
              <button 
                onClick={() => { setIsLenderModalOpen(false); setEditingLender(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-bold text-sm hover:bg-white transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveLender}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-lg"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;