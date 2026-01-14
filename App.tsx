import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_INPUTS, LoanInputs, SavedDeal, User, LenderOption } from './types';
import { getLoanTypeDefaults, calculatePMI } from './utils/loanTypeDefaults';
import { calculateLoan, formatCurrency, formatPercent } from './utils/calculations';
import { calculateLoanForLender } from './utils/lenderComparison';
import { InputGroup } from './components/InputGroup';
import { ResultRow } from './components/ResultRow';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { getDeals, saveDeal, deleteDeal } from './lib/database';
import { AuthScreen } from './components/AuthScreen';
import { StateSelectionScreen } from './components/StateSelectionScreen';
import { getStateDefaults, applyStateDefaults, getStateName, getAllStateCodes } from './utils/stateDefaults';
import { analyzeRehabBudget } from './utils/rehabBudgetAnalysis';
import {
  EligibilityAlert,
  MaxOfferCard,
  ValuationReturns,
  LoanEstimateCard,
  ProfitTable,
  ClosingProfitCard,
  SensitivityAnalysis,
  SellerNetAnalysis,
  FeeBreakdownItem
} from './components';

const App: React.FC = () => {
  // --- AUTHENTICATION STATE ---
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // --- APP STATE ---
  const [inputs, setInputs] = useState<LoanInputs>(DEFAULT_INPUTS);
  const [lenders, setLenders] = useState<LenderOption[]>([]);
  const [isReportMode, setIsReportMode] = useState(false);
  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [showStateSelection, setShowStateSelection] = useState(false);
  const [stateChangeNotification, setStateChangeNotification] = useState<string | null>(null);

  // Lender Modal State
  const [isLenderModalOpen, setIsLenderModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<LenderOption | null>(null);
  const [appVersion, setAppVersion] = useState<'NORMAL' | 'HIDEOUT' | 'CUSTOM'>('HIDEOUT');

  // --- EFFECTS ---
  useEffect(() => {
    // Load saved state from localStorage on mount
    const savedState = localStorage.getItem('zsrehab_selected_state');
    if (savedState && !inputs.state) {
      const defaults = applyStateDefaults(inputs, savedState, true);
      setInputs(prev => ({ ...prev, state: savedState, ...defaults }));
    }
  }, []); // Only run on mount

  useEffect(() => {
    // Check for existing Supabase session
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCurrentUser({ id: session.user.id, email: session.user.email || '' });
        }
        setIsLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setCurrentUser({ id: session.user.id, email: session.user.email || '' });
        } else {
          setCurrentUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Fallback to localStorage if Supabase not configured
      const sessionUser = localStorage.getItem('zsrehab_session_user');
      if (sessionUser) {
        setCurrentUser({ id: 'local', email: sessionUser });
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadDeals = async () => {
      if (!currentUser) {
        setSavedDeals([]);
        return;
      }

      if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
        try {
          const deals = await getDeals();
          setSavedDeals(deals);
        } catch (error) {
          console.error('Failed to load deals:', error);
          setSavedDeals([]);
        }
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem(`zsrehab_deals_${currentUser.email}`);
        if (stored) {
          try {
            const parsedDeals = JSON.parse(stored);
            const migratedDeals = parsedDeals.map((d: SavedDeal) => ({
              ...d,
              lenders: d.lenders || [],
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
    };

    loadDeals();
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
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError('');
      
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password: authPassword,
          });

          if (error) throw error;
          if (data.user) {
            setCurrentUser({ id: data.user.id, email: data.user.email || '' });
            setAuthEmail('');
            setAuthPassword('');
          }
        } catch (error: any) {
          setAuthError(error.message || 'Invalid email or password.');
        }
      } else {
        // Fallback to localStorage
        const usersStr = localStorage.getItem('zsrehab_users');
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];
        const foundUser = users.find(u => u.email === authEmail && u.password === authPassword);
        if (foundUser) {
          localStorage.setItem('zsrehab_session_user', foundUser.email);
          setCurrentUser({ id: 'local', email: foundUser.email });
          setAuthEmail('');
          setAuthPassword('');
        } else {
          setAuthError('Invalid email or password.');
        }
      }
  };

  const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError('');
      
      if (!authEmail || !authPassword) {
          setAuthError('Please fill in all fields.');
          return;
      }

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: authEmail,
            password: authPassword,
          });

          if (error) throw error;
          if (data.user) {
            setCurrentUser({ id: data.user.id, email: data.user.email || '' });
            setAuthEmail('');
            setAuthPassword('');
          }
        } catch (error: any) {
          setAuthError(error.message || 'Failed to create account.');
        }
      } else {
        // Fallback to localStorage
        const usersStr = localStorage.getItem('zsrehab_users');
        const users: any[] = usersStr ? JSON.parse(usersStr) : [];
        if (users.find(u => u.email === authEmail)) {
          setAuthError('Email already exists.');
          return;
        }
        const newUser = { email: authEmail, password: authPassword, created: new Date().toISOString() };
        users.push(newUser);
        localStorage.setItem('zsrehab_users', JSON.stringify(users));
        localStorage.setItem('zsrehab_session_user', newUser.email);
        setCurrentUser({ id: 'local', email: newUser.email });
        setAuthEmail('');
        setAuthPassword('');
      }
  };

  const handleLogout = async () => {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      } else {
        localStorage.removeItem('zsrehab_session_user');
      }
      setCurrentUser(null);
      setInputs(DEFAULT_INPUTS);
      setLenders([]);
      setSavedDeals([]);
      setIsReportMode(false);
  };

  const handleInputChange = (field: keyof LoanInputs, value: string | number) => {
    setInputs(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-populate state defaults when state changes
      if (field === 'state' && typeof value === 'string' && value) {
        const defaults = applyStateDefaults(prev, value, false);
        Object.entries(defaults).forEach(([key, val]) => {
          (updated as any)[key] = val;
        });
        
        // Save state to localStorage
        localStorage.setItem('zsrehab_selected_state', value);
        
        // Show notification
        const stateName = getStateName(value);
        setStateChangeNotification(`Closing costs updated for ${stateName}. Verify with your lender.`);
        setTimeout(() => setStateChangeNotification(null), 5000);
      }
      
      return updated;
    });
  };

  const handleStateSelect = (stateCode: string) => {
    setShowStateSelection(false);
    const defaults = applyStateDefaults(inputs, stateCode, true);
    setInputs(prev => {
      const updated = { ...prev, state: stateCode, ...defaults };
      localStorage.setItem('zsrehab_selected_state', stateCode);
      return updated;
    });
    setStateChangeNotification(`Closing costs set for ${getStateName(stateCode)}. Verify with your lender.`);
    setTimeout(() => setStateChangeNotification(null), 5000);
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

  const handleSaveDeal = async () => {
    if (!currentUser) return;
    
    // Validation: Prevent saving with $0 holding costs when holding months >= 3
    if (inputs.holdingPeriodMonths >= 3) {
      const monthlyHoldingTotal = results.monthlyPayment + results.monthlyUtilitiesCost;
      if (monthlyHoldingTotal < 500) {
        const confirmSave = window.confirm(
          `WARNING: Your holding costs are very low (${formatCurrency(monthlyHoldingTotal)}/month) for a ${inputs.holdingPeriodMonths}-month hold.\n\n` +
          `This may underestimate your actual expenses. Typical holding costs are $500-$1,000+/month.\n\n` +
          `Do you want to save anyway?`
        );
        if (!confirmSave) {
          return;
        }
      }
    }
    
    const existingDeal = savedDeals.find(d => d.name === (inputs.address || 'Untitled Property'));
    const newDeal: SavedDeal = {
        id: existingDeal?.id || Date.now(),
        name: inputs.address || 'Untitled Property',
        date: new Date().toLocaleDateString(),
        data: inputs,
        lenders: lenders
    };

    if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        await saveDeal(newDeal, currentUser.id);
        setSaveNotification("Property Saved!");
        setTimeout(() => setSaveNotification(null), 2000);
        // Reload deals
        const deals = await getDeals();
        setSavedDeals(deals);
      } catch (error) {
        console.error('Failed to save deal:', error);
        setAuthError('Failed to save deal.');
      }
    } else {
      // Fallback to localStorage
      const existingIndex = savedDeals.findIndex(d => d.name === newDeal.name);
      let updatedDeals;
      if (existingIndex >= 0) {
        updatedDeals = [...savedDeals];
        updatedDeals[existingIndex] = newDeal;
      } else {
        updatedDeals = [newDeal, ...savedDeals];
      }
      setSavedDeals(updatedDeals);
      localStorage.setItem(`zsrehab_deals_${currentUser.email}`, JSON.stringify(updatedDeals));
      setSaveNotification("Property Saved!");
      setTimeout(() => setSaveNotification(null), 2000);
    }
  };

  const handleLoadDeal = (deal: SavedDeal) => {
    // Force Sell strategy when loading if needed, though user requested removal of Refi option from UI
    setInputs({ ...deal.data, exitStrategy: 'SELL' });
    setLenders(deal.lenders || []);
    setIsDealModalOpen(false);
  };

  const handleDeleteDeal = async (id: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;

    if (isSupabaseConfigured && supabase && currentUser.id !== 'local' && typeof id === 'string') {
      try {
        await deleteDeal(id);
        // Reload deals
        const deals = await getDeals();
        setSavedDeals(deals);
      } catch (error) {
        console.error('Failed to delete deal:', error);
        setAuthError('Failed to delete deal.');
      }
    } else {
      // Fallback to localStorage
      const updated = savedDeals.filter(d => d.id !== id);
      setSavedDeals(updated);
      localStorage.setItem(`zsrehab_deals_${currentUser.email}`, JSON.stringify(updated));
    }
  };

  const handleNewDeal = () => {
      if (window.confirm("Start a new deal? Unsaved changes will be lost.")) {
          const savedState = localStorage.getItem('zsrehab_selected_state');
          const newInputs = { ...DEFAULT_INPUTS };
          if (savedState) {
            newInputs.state = savedState;
            // Apply state defaults to new deal
            const defaults = applyStateDefaults(newInputs, savedState, true);
            Object.assign(newInputs, defaults);
          }
          setInputs(newInputs);
          setLenders([]);
          if (!savedState) {
            setShowStateSelection(true);
          }
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

  // --- RENDER: LOGIN ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AuthScreen
        authMode={authMode}
        authEmail={authEmail}
        authPassword={authPassword}
        authError={authError}
        setAuthMode={setAuthMode}
        setAuthEmail={setAuthEmail}
        setAuthPassword={setAuthPassword}
        setAuthError={setAuthError}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    );
  }

  // --- RENDER: STATE SELECTION ---
  if (showStateSelection) {
    return (
      <StateSelectionScreen
        onStateSelect={handleStateSelect}
        currentState={inputs.state}
      />
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
                            <h1 className="text-3xl font-bold text-gray-900 leading-none print:text-xl">ZS Flip Calculator <span className="text-blue-900 ml-2">{appVersion === 'NORMAL' ? 'Normal' : appVersion === 'HIDEOUT' ? 'Hideout' : 'Custom'} Version</span></h1>
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
                        <ProfitTable inputs={inputs} results={results} />
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
                    <ClosingProfitCard inputs={inputs} results={results} />
                 </div>

                 {/* 4. Sensitivity Analysis */}
                 <div className="mt-6 break-inside-avoid print:mt-1">
                    <SensitivityAnalysis results={results} />
                 </div>
                 
                  {/* 5. Seller Net Analysis (New in Report) */}
                 <div className="mt-6 break-inside-avoid print:mt-1">
                    <SellerNetAnalysis inputs={inputs} results={results} />
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
               <h1 className="text-lg font-bold text-gray-900 leading-none">ZS Flip Calculator</h1>
               <div className="flex items-center gap-2">
                   <span className="text-xs text-gray-500 font-medium tracking-wide">100% LOAN QUALIFIER</span>
                   <span className="text-xs text-blue-600 font-medium">User: {currentUser.email}</span>
                   {inputs.state && (
                     <span className="text-xs text-green-600 font-medium">
                       • {getStateName(inputs.state)}
                     </span>
                   )}
               </div>
             </div>
          </div>
          
          {/* State Change Notification */}
          {stateChangeNotification && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
              <span>✓</span>
              <span>{stateChangeNotification}</span>
            </div>
          )}
          
          {/* Centered Version Selector */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
            <select 
              value={appVersion} 
              onChange={(e) => setAppVersion(e.target.value as 'NORMAL' | 'HIDEOUT' | 'CUSTOM')}
              className="bg-blue-50 text-blue-800 px-4 py-1 rounded-full text-xs font-bold border border-blue-100 shadow-sm uppercase tracking-wide appearance-none cursor-pointer hover:bg-blue-100 transition"
            >
              <option value="NORMAL">Normal Version</option>
              <option value="HIDEOUT">Hideout Version</option>
              <option value="CUSTOM">Custom Version</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
             <button 
               onClick={() => setShowStateSelection(true)} 
               className="text-gray-500 hover:text-blue-600 font-medium px-3 py-1 rounded text-sm transition"
               title="Change State"
             >
               {inputs.state ? getStateName(inputs.state) : 'Select State'}
             </button>
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
                            <div className="col-span-1">
                              <label className="text-xs font-semibold text-gray-500 uppercase">State</label>
                              <select 
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 text-sm border pl-3" 
                                value={inputs.state} 
                                onChange={e => handleInputChange('state', e.target.value)}
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
                             <div>
                               <InputGroup label="Rehab Budget" id="rehab" value={inputs.rehabBudget} onChange={v => handleInputChange('rehabBudget', v)} prefix="$" />
                               
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
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <InputGroup label="Est. ARV" id="arv" value={inputs.arv} onChange={v => handleInputChange('arv', v)} prefix="$" />
                                <div className="text-[10px] text-gray-400 text-right mt-1 font-medium">{formatCurrency(results.arvPerSqFt)} / SqFt</div>
                            </div>
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
                        {/* Loan Type Selector */}
                        <div className="mb-4">
                            <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Loan Type</label>
                            <select
                                className="w-full rounded-md border-gray-300 py-2 text-sm border pl-3"
                                value={inputs.loanType || 'HARD_MONEY'}
                                onChange={(e) => {
                                    const newLoanType = e.target.value as 'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO' | 'OTHER';
                                    const oldLoanType = inputs.loanType || 'HARD_MONEY';
                                    
                                    // Show warning if switching types
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
                                            return;
                                        }
                                    }
                                    
                                    handleInputChange('loanType', newLoanType);
                                    
                                    // Auto-update ALL defaults based on loan type
                                    if (newLoanType !== 'OTHER') {
                                        const defaults = getLoanTypeDefaults(newLoanType);
                                        
                                        handleInputChange('interestRate', defaults.rate * 100);
                                        handleInputChange('loanTermMonths', defaults.term);
                                        handleInputChange('interestOnly', defaults.interestOnly === true);
                                        
                                        if (defaults.includesTaxInsurance === true) {
                                            handleInputChange('includePITI', true);
                                        } else if (defaults.includesTaxInsurance === false) {
                                            handleInputChange('includePITI', false);
                                        }
                                        
                                        handleInputChange('prepaymentPenalty', defaults.prepaymentPenalty);
                                        
                                        if (typeof defaults.typicalPoints === 'number') {
                                            handleInputChange('originationPoints', defaults.typicalPoints);
                                        }
                                        
                                        // Calculate typical lender fees
                                        if (inputs.purchasePrice > 0 || inputs.rehabBudget > 0) {
                                            const totalProjectCost = (inputs.purchasePrice || 0) + (inputs.rehabBudget || 0);
                                            const financingPercent = inputs.useCustomFinancing ? inputs.customFinancingPercentage : inputs.financingPercentage;
                                            const estimatedLoanAmount = totalProjectCost * (financingPercent / 100);
                                            const typicalFeesAmount = estimatedLoanAmount * defaults.typicalFees;
                                            
                                            if (newLoanType === 'HARD_MONEY') {
                                                handleInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.4));
                                                handleInputChange('processingFee', Math.round(typicalFeesAmount * 0.3));
                                                handleInputChange('docPrepFee', Math.round(typicalFeesAmount * 0.3));
                                            } else if (newLoanType === 'CONVENTIONAL') {
                                                handleInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.5));
                                                handleInputChange('processingFee', Math.round(typicalFeesAmount * 0.5));
                                            } else if (newLoanType === 'PORTFOLIO') {
                                                handleInputChange('underwritingFee', Math.round(typicalFeesAmount * 0.4));
                                                handleInputChange('processingFee', Math.round(typicalFeesAmount * 0.3));
                                                handleInputChange('docPrepFee', Math.round(typicalFeesAmount * 0.3));
                                            }
                                        }
                                        
                                        // Calculate PMI for conventional loans
                                        const results = calculateLoan(inputs);
                                        if (newLoanType === 'CONVENTIONAL' && results.qualifiedLoanAmount > 0 && inputs.purchasePrice > 0) {
                                            const downPaymentAmount = results.gapAmount || 0;
                                            const downPaymentPercent = (downPaymentAmount / inputs.purchasePrice) * 100;
                                            const monthlyPMI = calculatePMI(results.qualifiedLoanAmount, downPaymentPercent);
                                            handleInputChange('includePMI', monthlyPMI > 0);
                                            handleInputChange('monthlyPMI', monthlyPMI);
                                        } else {
                                            handleInputChange('includePMI', false);
                                            handleInputChange('monthlyPMI', 0);
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
                            <InputGroup label="Rate" id="rate" value={inputs.interestRate} onChange={v => handleInputChange('interestRate', v)} suffix="%" step={0.125} />
                            <InputGroup label="Points" id="pts" value={inputs.originationPoints} onChange={v => handleInputChange('originationPoints', v)} suffix="pts" />
                            <InputGroup label="Term" id="term" value={inputs.loanTermMonths} onChange={v => handleInputChange('loanTermMonths', v)} suffix="mo" />
                        </div>

                        {/* PITI Fields for Conventional Loans */}
                        {inputs.loanType === 'CONVENTIONAL' && (
                            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        id="includePITI"
                                        checked={inputs.includePITI || false}
                                        onChange={(e) => handleInputChange('includePITI', e.target.checked)}
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
                                            onChange={(v) => handleInputChange('monthlyPITITaxes', v)}
                                            prefix="$"
                                            helpText="Monthly property taxes included in payment"
                                        />
                                        <InputGroup
                                            label="Monthly Insurance (PITI)"
                                            id="monthlyPITIInsurance"
                                            value={inputs.monthlyPITIInsurance || 0}
                                            onChange={(v) => handleInputChange('monthlyPITIInsurance', v)}
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
                                                    handleInputChange('includePMI', e.target.checked);
                                                    if (!e.target.checked) {
                                                        handleInputChange('monthlyPMI', 0);
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
                                                    onChange={(v) => handleInputChange('monthlyPMI', v)}
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
                    <EligibilityAlert results={results} />

                    {/* Quick Stats - Max Offer */}
                    <MaxOfferCard inputs={inputs} results={results} />

                    {/* Valuation & Returns Section */}
                    <ValuationReturns results={results} />

                    {/* Loan Estimate Card */}
                    <LoanEstimateCard inputs={inputs} results={results} />

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
                    <ProfitTable inputs={inputs} results={results} />
                    
                    {/* Closing Table Profit (Detailed) */}
                    <ClosingProfitCard inputs={inputs} results={results} />

                    {/* Dedicated ARV Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                        <div className="bg-blue-700 px-6 py-3 text-white font-bold text-sm uppercase flex items-center justify-between">
                            <span>ARV Analysis & Scenarios</span>
                            <span className="text-xs bg-blue-500 px-2 py-1 rounded">{formatCurrency(inputs.arv)}</span>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Current ARV</div>
                                    <div className="text-lg font-bold text-blue-700 mt-1">{formatCurrency(inputs.arv)}</div>
                                    <div className="text-[9px] text-gray-400 mt-1">{formatCurrency(results.arvPerSqFt)} / SqFt</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Max Loan (75%)</div>
                                    <div className="text-lg font-bold text-indigo-700 mt-1">{formatCurrency(results.maxLoanAmountDollars)}</div>
                                    <div className="text-[9px] text-gray-400 mt-1">Based on ARV</div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Max Offer</div>
                                    <div className="text-lg font-bold text-green-700 mt-1">{formatCurrency(results.maxAllowableOffer)}</div>
                                    <div className="text-[9px] text-gray-400 mt-1">100% Loan</div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
                                <div className="bg-blue-100 px-3 py-2 text-xs font-bold uppercase text-center text-blue-900">ARV Sensitivity Scenarios</div>
                                <div className="grid grid-cols-5 text-[10px] font-bold bg-blue-50 text-center border-b border-blue-200">
                                    <div className="p-2">Scenario</div>
                                    <div className="p-2">ARV</div>
                                    <div className="p-2">Net Profit</div>
                                    <div className="p-2">Diff</div>
                                    <div className="p-2">Close Profit</div>
                                </div>
                                {results.profitScenarios.map((s, idx) => (
                                    <div key={idx} className={`grid grid-cols-5 text-xs text-center p-2 border-b border-blue-50 last:border-0 ${s.label === 'Baseline' ? 'bg-blue-100 font-bold' : 'bg-white'}`}>
                                        <div className="font-medium">{s.label}</div>
                                        <div>{formatCurrency(s.arv)}</div>
                                        <div className={s.netProfit > 0 ? 'text-green-700 font-bold' : 'text-red-600 font-bold'}>{formatCurrency(s.netProfit)}</div>
                                        <div className={s.difference >= 0 ? 'text-green-600' : 'text-red-500'}>{formatCurrency(s.difference)}</div>
                                        <div>{formatCurrency(s.closingTableProfit)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dedicated Tax Section */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg border-2 border-red-200 overflow-hidden">
                        <div className="bg-red-700 px-6 py-3 text-white font-bold text-sm uppercase">Tax Breakdown & Analysis</div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-4 border border-red-100">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-3 border-b border-red-100 pb-2">Purchase Taxes</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transfer Tax ({inputs.transferTaxRate}%)</span>
                                            <span className="font-bold text-red-700">{formatCurrency(results.transferTaxCost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Title Insurance ({inputs.titleInsuranceRate}%)</span>
                                            <span className="font-bold text-red-700">{formatCurrency(results.titleInsuranceCost)}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-red-100">
                                            <span className="font-bold text-gray-800">Total Purchase Taxes</span>
                                            <span className="font-bold text-red-800">{formatCurrency(results.transferTaxCost + results.titleInsuranceCost)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg p-4 border border-red-100">
                                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-3 border-b border-red-100 pb-2">Selling Taxes</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transfer Tax ({inputs.sellingTransferTaxRate}%)</span>
                                            <span className="font-bold text-red-700">{formatCurrency(inputs.arv * (inputs.sellingTransferTaxRate / 100))}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Commission ({inputs.sellingCommissionRate}%)</span>
                                            <span className="font-bold text-red-700">{formatCurrency(inputs.arv * (inputs.sellingCommissionRate / 100))}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-red-100">
                                            <span className="font-bold text-gray-800">Total Exit Taxes</span>
                                            <span className="font-bold text-red-800">{formatCurrency(inputs.arv * ((inputs.sellingTransferTaxRate + inputs.sellingCommissionRate) / 100))}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-4 border border-red-100">
                                <h4 className="text-xs font-bold text-gray-700 uppercase mb-3 border-b border-red-100 pb-2">Annual Taxes & Fees (Prorated)</h4>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Hideout Annual</span>
                                        <span className="font-bold text-red-700">{formatCurrency(results.hideoutProratedDues)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Roamingwood Annual</span>
                                        <span className="font-bold text-red-700">{formatCurrency(results.roamingwoodProrated)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">School Tax Annual</span>
                                        <span className="font-bold text-red-700">{formatCurrency(results.schoolTaxProrated)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Days Remaining</span>
                                        <span className="font-bold text-gray-700">{results.daysRemainingInYear} days</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-red-100 rounded-lg p-3 border border-red-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-red-900 uppercase">Total Tax Impact</span>
                                    <span className="text-lg font-bold text-red-900">{formatCurrency(results.transferTaxCost + results.titleInsuranceCost + inputs.arv * ((inputs.sellingTransferTaxRate + inputs.sellingCommissionRate) / 100) + results.hideoutProratedDues + results.roamingwoodProrated + results.schoolTaxProrated)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sensitivity Analysis */}
                    <SensitivityAnalysis results={results} />

                    {/* Seller Net Analysis Result Card */}
                    <SellerNetAnalysis inputs={inputs} results={results} />

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
export default App;