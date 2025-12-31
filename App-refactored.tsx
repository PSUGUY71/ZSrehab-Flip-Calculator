import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_INPUTS, LoanInputs, SavedDeal, User, LenderOption } from './types';
import { calculateLoan } from './utils/calculations';
import { calculateLoanForLender } from './utils/lenderComparison';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { getDeals, saveDeal, deleteDeal } from './lib/database';
import { ReportMode } from './ReportMode';

import {
  AuthScreen,
  AppHeader,
  DealModal,
  LenderModal,
  InputSections,
  ResultsColumn,
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
  const [isClearingOnLogin, setIsClearingOnLogin] = useState(false); // Flag to prevent deal loading during login

  // Lender Modal State
  const [isLenderModalOpen, setIsLenderModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<LenderOption | null>(null);
  
  // Version State
  const [appVersion, setAppVersion] = useState<'NORMAL' | 'HIDEOUT' | 'CUSTOM'>('HIDEOUT');
  
  // Max Offer Analysis - ARV Percentage Selection (75% is the main/default)
  const [maxOfferLTVPercent, setMaxOfferLTVPercent] = useState<number>(0.75); // Default 75% (main ARV)

  // --- EFFECTS ---
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

  // Clear inputs whenever user changes (login/logout)
  // This MUST run after user is set to ensure inputs are cleared
  useEffect(() => {
    if (currentUser) {
      // Set flag to prevent any deal loading during login
      setIsClearingOnLogin(true);
      
      // Force reset to default inputs when user logs in
      // Use a longer timeout to ensure this runs AFTER all other effects (deal loading, etc.)
      const timeoutId = setTimeout(() => {
        const freshInputs = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
        setInputs(freshInputs);
        setLenders([]);
        console.log('✅ Cleared inputs on login for user:', currentUser.email);
        console.log('✅ Inputs after clear:', JSON.stringify(freshInputs).substring(0, 100));
        
        // Force a second clear after a short delay to catch any race conditions
        setTimeout(() => {
          const freshInputs2 = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
          setInputs(freshInputs2);
          setLenders([]);
          console.log('✅ Double-check: Cleared inputs again for user:', currentUser.email);
          // Clear the flag after we're done clearing
          setTimeout(() => {
            setIsClearingOnLogin(false);
            console.log('✅ Login clearing complete, inputs should be blank');
          }, 100);
        }, 200);
      }, 300); // Longer delay to ensure it runs after deal loading
      
      return () => clearTimeout(timeoutId);
    } else {
      // Clear everything when user logs out
      const freshInputs = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
      setInputs(freshInputs);
      setLenders([]);
      setIsClearingOnLogin(false);
    }
  }, [currentUser?.id, currentUser?.email]); // Trigger when user ID or email changes (login/logout)

  useEffect(() => {
    const loadDeals = async () => {
      if (!currentUser) {
        setSavedDeals([]);
        return;
      }

      // Load from both Supabase and localStorage, then merge
      let supabaseDeals: SavedDeal[] = [];
      let localDeals: SavedDeal[] = [];

      // Load from Supabase (if configured and user is not local)
      if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
        try {
          supabaseDeals = await getDeals();
          console.log('Loaded deals from Supabase:', supabaseDeals.length);
        } catch (error) {
          console.error('Failed to load deals from Supabase:', error);
          // Continue to load from localStorage
        }
      }

      // Always load from localStorage (for backup and offline access)
      const stored = localStorage.getItem(`zsrehab_deals_${currentUser.email}`);
      if (stored) {
        try {
          const parsedDeals = JSON.parse(stored);
          localDeals = parsedDeals.map((d: SavedDeal) => ({
            ...d,
            lenders: d.lenders || [],
          }));
          console.log('Loaded deals from localStorage:', localDeals.length);
        } catch (e) {
          console.error('Failed to parse saved deals from localStorage', e);
        }
      }

      // Merge deals: prefer Supabase (cloud) but include unique local deals
      // Use a Map to deduplicate by ID
      const dealsMap = new Map<string | number, SavedDeal>();
      
      // First add Supabase deals (cloud is source of truth)
      supabaseDeals.forEach(deal => {
        dealsMap.set(deal.id, deal);
      });
      
      // Then add local deals that don't exist in Supabase
      localDeals.forEach(deal => {
        if (!dealsMap.has(deal.id)) {
          dealsMap.set(deal.id, deal);
        }
      });

      const mergedDeals = Array.from(dealsMap.values());
      setSavedDeals(mergedDeals);
      console.log('Total merged deals:', mergedDeals.length);
    };

    loadDeals();
  }, [currentUser]);

  // --- CALCULATIONS ---
  const results = useMemo(() => calculateLoan(inputs), [inputs]);
  // Calculate max offer with selected LTV percentage
  const maxOfferResults = useMemo(() => calculateLoan(inputs, maxOfferLTVPercent), [inputs, maxOfferLTVPercent]);

  const comparisonData = useMemo(() => {
    return lenders
      .filter((l) => l.includeInComparison)
      .map((l) => ({
        lender: l,
        results: calculateLoanForLender(inputs, results, l),
      }));
  }, [lenders, inputs, results]);

  const bestLenderFees = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allFees = [results.totalLenderFees, ...comparisonData.map((c) => c.results.lenderUpfrontFeesAdjusted)];
    return Math.min(...allFees);
  }, [comparisonData, results]);

  const bestMonthlyPayment = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allPayments = [results.monthlyPayment, ...comparisonData.map((c) => c.results.comparisonMonthlyPayment)];
    return Math.min(...allPayments);
  }, [comparisonData, results]);

  // --- AUTH HANDLERS ---
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
          // Clear inputs FIRST, then set user (so useEffect can also clear if needed)
          const freshInputs = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
          setInputs(freshInputs);
          setLenders([]);
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
        // Clear inputs FIRST, then set user (so useEffect can also clear if needed)
        const freshInputs = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
        setInputs(freshInputs);
        setLenders([]);
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
          // Clear all form inputs when signing up
          setInputs(DEFAULT_INPUTS);
          setLenders([]);
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
      // Clear all form inputs when signing up
      setInputs(DEFAULT_INPUTS);
      setLenders([]);
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

  // --- INPUT HANDLERS ---
  const handleInputChange = (field: keyof LoanInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // --- DEAL HANDLERS ---
  const handleSaveDeal = async () => {
    if (!currentUser) return;
    
    const dealName = inputs.address || 'Untitled Property';
    
    // Generate a temporary ID for localStorage (can be any format)
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let supabaseSuccess = false;
    let localStorageSuccess = false;
    let finalDealId: string | number = tempId; // Default to temp ID
    
    // Save to Supabase first (if configured and user is not local)
    if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        // Create deal without ID - let Supabase generate UUID
        const dealForSupabase: SavedDeal = {
          id: '', // Empty ID - Supabase will generate UUID
          name: dealName,
          date: new Date().toLocaleDateString(),
          data: inputs,
          lenders: lenders,
        };
        const saved = await saveDeal(dealForSupabase, currentUser.id);
        // Use the UUID from Supabase
        finalDealId = saved.id;
        supabaseSuccess = true;
        console.log('Deal saved to Supabase successfully with ID:', finalDealId);
      } catch (error: any) {
        console.error('Failed to save deal to Supabase:', error);
        // Continue to save locally even if Supabase fails
      }
    }
    
    // Always save to localStorage (for backup and offline access)
    // Use the Supabase UUID if available, otherwise use temp ID
    const newDeal: SavedDeal = {
      id: finalDealId,
      name: dealName,
      date: new Date().toLocaleDateString(),
      data: inputs,
      lenders: lenders,
    };
    
    try {
      const updatedDeals = [newDeal, ...savedDeals];
      setSavedDeals(updatedDeals);
      localStorage.setItem(`zsrehab_deals_${currentUser.email}`, JSON.stringify(updatedDeals));
      localStorageSuccess = true;
      console.log('Deal saved to localStorage successfully');
    } catch (error: any) {
      console.error('Failed to save deal to localStorage:', error);
    }
    
    // Show appropriate notification
    if (supabaseSuccess && localStorageSuccess) {
      setSaveNotification('Property Saved! (Synced to cloud & local)');
    } else if (localStorageSuccess) {
      setSaveNotification('Property Saved! (Local backup only)');
    } else {
      setSaveNotification('Failed to save deal');
    }
    
    // Reload deals from Supabase if it succeeded
    if (supabaseSuccess && isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        const deals = await getDeals();
        setSavedDeals(deals);
      } catch (error) {
        console.error('Failed to reload deals from Supabase:', error);
        // Keep the local state we just set
      }
    }
    
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleLoadDeal = (deal: SavedDeal) => {
    // Don't load deal if we're in the middle of clearing on login
    if (isClearingOnLogin) {
      console.log('⚠️ Prevented loading deal during login clear');
      return;
    }
    // Merge with DEFAULT_INPUTS to ensure all fields are present (especially new fields added after deal was saved)
    setInputs({ ...DEFAULT_INPUTS, ...deal.data, exitStrategy: 'SELL' });
    setLenders(deal.lenders || []);
    setIsDealModalOpen(false);
  };

  const handleDeleteDeal = async (id: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    if (!window.confirm('Are you sure you want to delete this deal? This cannot be undone.')) {
      return;
    }
    
    let supabaseSuccess = false;
    
    // Delete from Supabase (if configured and user is not local)
    if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        await deleteDeal(id.toString());
        supabaseSuccess = true;
        console.log('Deal deleted from Supabase successfully');
      } catch (error) {
        console.error('Failed to delete deal from Supabase:', error);
        // Continue to delete locally even if Supabase fails
      }
    }
    
    // Always delete from localStorage
    try {
      const updated = savedDeals.filter((d) => d.id !== id);
      setSavedDeals(updated);
      localStorage.setItem(`zsrehab_deals_${currentUser.email}`, JSON.stringify(updated));
      console.log('Deal deleted from localStorage successfully');
    } catch (error) {
      console.error('Failed to delete deal from localStorage:', error);
      alert('Failed to delete deal');
      return;
    }
    
    // Reload deals from Supabase if it succeeded
    if (supabaseSuccess && isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        const deals = await getDeals();
        setSavedDeals(deals);
      } catch (error) {
        console.error('Failed to reload deals from Supabase:', error);
        // Keep the local state we just set
      }
    }
  };

  const handleNewDeal = () => {
    if (window.confirm('Start a new deal? Unsaved changes will be lost.')) {
      setInputs(DEFAULT_INPUTS);
      setLenders([]);
    }
  };

  // --- LENDER HANDLERS ---
  const handleApplyLender = (lender: LenderOption) => {
    setInputs((prev) => ({
      ...prev,
      lenderName: lender.lenderName,
      interestRate: lender.interestRate,
      originationPoints: lender.originationPoints,
      underwritingFee: lender.underwritingFee,
      processingFee: lender.processingFee,
      docPrepFee: lender.docPrepFee,
      wireFee: lender.wireFee,
      otherLenderFees: lender.otherFees,
    }));
  };

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
      notes: '',
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
      notes: 'Captured from deal baseline',
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
    if (window.confirm('Delete this lender?')) {
      setLenders(lenders.filter((l) => l.id !== id));
    }
  };

  const handleSaveLender = () => {
    if (!editingLender) return;
    if (lenders.find((l) => l.id === editingLender.id)) {
      setLenders(lenders.map((l) => (l.id === editingLender.id ? editingLender : l)));
    } else {
      setLenders([...lenders, editingLender]);
    }
    setIsLenderModalOpen(false);
    setEditingLender(null);
  };

  // --- RENDER: LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // --- RENDER: LOGIN ---
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

  // --- RENDER: REPORT MODE ---
  if (isReportMode) {
    return <ReportMode inputs={inputs} results={results} appVersion={appVersion} onClose={() => setIsReportMode(false)} />;
  }

  // --- RENDER: MAIN EDITOR ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      <AppHeader
        currentUser={currentUser}
        savedDeals={savedDeals}
        saveNotification={saveNotification}
        appVersion={appVersion}
        onVersionChange={setAppVersion}
        onNewDeal={handleNewDeal}
        onSaveDeal={handleSaveDeal}
        onOpenDealModal={() => setIsDealModalOpen(true)}
        onReportMode={() => setIsReportMode(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Inputs */}
          <InputSections
            inputs={inputs}
            results={results}
            maxOfferResults={maxOfferResults}
            maxOfferLTVPercent={maxOfferLTVPercent}
            onMaxOfferLTVChange={setMaxOfferLTVPercent}
            onInputChange={handleInputChange}
            onCaptureBaseline={handleCaptureBaseline}
          />

          {/* Right Column - Results */}
          <ResultsColumn
            inputs={inputs}
            results={results}
            lenders={lenders}
            comparisonData={comparisonData}
            bestLenderFees={bestLenderFees}
            bestMonthlyPayment={bestMonthlyPayment}
            onAddLender={handleAddLender}
            onApplyLender={handleApplyLender}
            onEditLender={handleEditLender}
            onDuplicateLender={handleDuplicateLender}
            onDeleteLender={handleDeleteLender}
          />
        </div>
      </main>

      {/* Deal Modal */}
      {isDealModalOpen && (
        <DealModal
          savedDeals={savedDeals}
          onLoadDeal={handleLoadDeal}
          onDeleteDeal={handleDeleteDeal}
          onClose={() => setIsDealModalOpen(false)}
        />
      )}

      {/* Lender Modal */}
      {isLenderModalOpen && editingLender && (
        <LenderModal
          editingLender={editingLender}
          setEditingLender={setEditingLender}
          onSave={handleSaveLender}
          onClose={() => {
            setIsLenderModalOpen(false);
            setEditingLender(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
