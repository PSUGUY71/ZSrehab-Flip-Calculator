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
  const [currentDealId, setCurrentDealId] = useState<string | number | null>(null); // Track which deal is currently loaded
  const [originalBaselineLenderName, setOriginalBaselineLenderName] = useState<string | null>(DEFAULT_INPUTS.lenderName || null); // Track original baseline lender name
  const [originalBaselineInputs, setOriginalBaselineInputs] = useState<LoanInputs | null>(() => {
    // Initialize with default inputs so we always have a baseline to restore to
    return { ...DEFAULT_INPUTS };
  }); // Store original baseline inputs to restore

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
        setCurrentDealId(null); // Clear current deal ID on login
        console.log('✅ Cleared inputs on login for user:', currentUser.email);
        console.log('✅ Inputs after clear:', JSON.stringify(freshInputs).substring(0, 100));
        
        // Force a second clear after a short delay to catch any race conditions
        setTimeout(() => {
          const freshInputs2 = JSON.parse(JSON.stringify(DEFAULT_INPUTS));
          setInputs(freshInputs2);
          setLenders([]);
          setCurrentDealId(null); // Clear current deal ID again
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
    let isMounted = true; // Flag to prevent state updates if component unmounts
    
    const loadDeals = async () => {
      if (!currentUser) {
        if (isMounted) setSavedDeals([]);
        return;
      }

      // Use Supabase if configured, otherwise fallback to localStorage
      if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
        try {
          const deals = await getDeals();
          console.log('✅ Loaded deals from Supabase:', deals.length, 'Setting state...');
          if (isMounted) {
            setSavedDeals(deals);
            console.log('✅ State set with', deals.length, 'deals');
          }
        } catch (error) {
          console.error('❌ Failed to load deals from Supabase:', error);
          if (isMounted) setSavedDeals([]);
        }
      } else {
        // Fallback to localStorage only when Supabase is not configured
        const stored = localStorage.getItem(`zsrehab_deals_${currentUser.email}`);
        if (stored) {
          try {
            const parsedDeals = JSON.parse(stored);
            const migratedDeals = parsedDeals.map((d: SavedDeal) => ({
              ...d,
              lenders: d.lenders || [],
            }));
            if (isMounted) {
              setSavedDeals(migratedDeals);
              console.log('✅ Loaded deals from localStorage:', migratedDeals.length);
            }
          } catch (e) {
            console.error('❌ Failed to parse saved deals from localStorage', e);
            if (isMounted) setSavedDeals([]);
          }
        } else {
          if (isMounted) setSavedDeals([]);
        }
      }
    };

    loadDeals();
    
    return () => {
      isMounted = false; // Cleanup: prevent state updates after unmount
    };
  }, [currentUser?.id, currentUser?.email]); // Only depend on user ID and email, not the whole object

  // --- CALCULATIONS ---
  const results = useMemo(() => calculateLoan(inputs), [inputs]);
  // Calculate max offer with selected LTV percentage
  const maxOfferResults = useMemo(() => calculateLoan(inputs, maxOfferLTVPercent), [inputs, maxOfferLTVPercent]);
  
  // Calculate baseline results for comparison (always use original baseline inputs if available)
  const baselineResults = useMemo(() => {
    if (originalBaselineInputs) {
      return calculateLoan(originalBaselineInputs);
    }
    return results; // Fallback to current results if no baseline stored
  }, [originalBaselineInputs, results]);

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

  const bestProfit = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allProfits = [results.netProfit, ...comparisonData.map((c) => c.results.netProfit)];
    return Math.max(...allProfits);
  }, [comparisonData, results]);

  const bestDownPayment = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allDownPayments = [results.gapAmount, ...comparisonData.map((c) => c.results.gapAmount)];
    return Math.min(...allDownPayments);
  }, [comparisonData, results]);

  const bestCashToClose = useMemo(() => {
    if (comparisonData.length === 0) return null;
    const allCashToClose = [results.totalCashToClose, ...comparisonData.map((c) => c.results.totalCashToClose)];
    return Math.min(...allCashToClose);
  }, [comparisonData, results]);

  // Determine best overall lender
  // Priority: 1) Highest profit, 2) Lowest down payment, 3) Lowest cash to close
  const bestOverallLender = useMemo(() => {
    if (comparisonData.length === 0) return null;
    
    // Get all lenders with their metrics
    const allLenders = [
      {
        name: inputs.lenderName || 'BASELINE',
        isBaseline: true,
        profit: results.netProfit,
        downPayment: results.gapAmount,
        cashToClose: results.totalCashToClose,
      },
      ...comparisonData.map((c) => ({
        name: c.lender.lenderName,
        isBaseline: false,
        profit: c.results.netProfit,
        downPayment: c.results.gapAmount,
        cashToClose: c.results.totalCashToClose,
      })),
    ];

    // Sort by: profit (desc), then down payment (asc), then cash to close (asc)
    const sorted = [...allLenders].sort((a, b) => {
      // First priority: profit (higher is better)
      if (Math.abs(a.profit - b.profit) > 100) { // If profit difference is significant (>$100)
        return b.profit - a.profit;
      }
      // Second priority: down payment (lower is better)
      if (Math.abs(a.downPayment - b.downPayment) > 100) { // If down payment difference is significant (>$100)
        return a.downPayment - b.downPayment;
      }
      // Third priority: cash to close (lower is better)
      return a.cashToClose - b.cashToClose;
    });

    return sorted[0]?.name || null;
  }, [comparisonData, results, inputs.lenderName]);

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
          // Check if email is verified before allowing login
          if (!data.user.email_confirmed_at) {
            setAuthError('Please verify your email address before logging in. Check your inbox for the verification link.');
            // Optionally resend verification email
            try {
              await supabase.auth.resend({
                type: 'signup',
                email: authEmail,
              });
              setAuthError('Please verify your email address before logging in. A new verification link has been sent to ' + authEmail);
            } catch (resendError) {
              // If resend fails, just show the original message
            }
            return;
          }
          
          // Email is verified, proceed with login
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
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;
        
        if (data.user) {
          // Check if email is verified
          if (data.user.email_confirmed_at) {
            // Email already verified, log them in
            setCurrentUser({ id: data.user.id, email: data.user.email || '' });
            setAuthEmail('');
            setAuthPassword('');
            setInputs(DEFAULT_INPUTS);
            setLenders([]);
          } else {
            // Email not verified yet - require verification
            setAuthError('Please check your email to verify your account before logging in. A verification link has been sent to ' + authEmail);
            setAuthEmail('');
            setAuthPassword('');
            // Don't log them in - they need to verify first
          }
        }
      } catch (error: any) {
        setAuthError(error.message || 'Failed to create account.');
      }
    } else {
      // Fallback to localStorage (no email verification for local storage)
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
    setCurrentDealId(null); // Clear current deal ID on logout
    setIsReportMode(false);
  };

  // --- INPUT HANDLERS ---
  const handleInputChange = (field: keyof LoanInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // --- REHAB LINE ITEM HANDLERS ---
  const handleRehabLineItemAdd = () => {
    setInputs((prev) => ({
      ...prev,
      rehabLineItems: [
        ...(prev.rehabLineItems || []),
        {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          category: 'Other',
          description: '',
          unitCost: 0,
          quantity: 1,
        },
      ],
    }));
  };

  const handleRehabLineItemUpdate = (id: string, field: keyof import('./types').RehabLineItem, value: string | number) => {
    setInputs((prev) => ({
      ...prev,
      rehabLineItems: (prev.rehabLineItems || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleRehabLineItemDelete = (id: string) => {
    setInputs((prev) => ({
      ...prev,
      rehabLineItems: (prev.rehabLineItems || []).filter((item) => item.id !== id),
    }));
  };

  // --- DEAL HANDLERS ---
  const handleSaveDeal = async () => {
    if (!currentUser) return;
    
    const dealName = inputs.address || 'Untitled Property';
    
    // Generate a temporary ID for localStorage (can be any format)
    const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let supabaseSuccess = false;
    let localStorageSuccess = false;
    let finalDealId: string | number = currentDealId || tempId; // Use current deal ID if exists, otherwise temp ID
    
    // If we have a current deal ID, we're updating; otherwise creating new
    const isUpdating = currentDealId !== null;
    
    // Save to Supabase first (if configured and user is not local)
    if (isSupabaseConfigured && supabase && currentUser.id !== 'local') {
      try {
        // Use current deal ID if updating, otherwise let Supabase generate UUID
        const dealForSupabase: SavedDeal = {
          id: isUpdating && typeof currentDealId === 'string' ? currentDealId : '', // Use current ID if updating
          name: dealName,
          date: new Date().toLocaleDateString(),
          data: inputs,
          lenders: lenders,
        };
        const saved = await saveDeal(dealForSupabase, currentUser.id);
        // Use the UUID from Supabase (either existing or newly generated)
        finalDealId = saved.id;
        setCurrentDealId(saved.id); // Update tracked ID
        supabaseSuccess = true;
        console.log(isUpdating ? 'Deal updated in Supabase:' : 'Deal saved to Supabase:', finalDealId);
      } catch (error: any) {
        console.error('Failed to save deal to Supabase:', error);
        // Continue to save locally even if Supabase fails
      }
    }
    
    // Always save to localStorage (for backup and offline access)
    // Use the Supabase UUID if available, otherwise use temp ID
    const dealToSave: SavedDeal = {
      id: finalDealId,
      name: dealName,
      date: new Date().toLocaleDateString(),
      data: inputs,
      lenders: lenders,
    };
    
    try {
      let updatedDeals: SavedDeal[];
      if (isUpdating && currentDealId) {
        // Update existing deal in the list
        updatedDeals = savedDeals.map(deal => 
          deal.id === currentDealId ? dealToSave : deal
        );
        // If deal not found in list, add it
        if (!updatedDeals.find(d => d.id === currentDealId)) {
          updatedDeals = [dealToSave, ...updatedDeals];
        }
      } else {
        // Create new deal
        updatedDeals = [dealToSave, ...savedDeals];
      }
      
      setSavedDeals(updatedDeals);
      localStorage.setItem(`zsrehab_deals_${currentUser.email}`, JSON.stringify(updatedDeals));
      localStorageSuccess = true;
      console.log(isUpdating ? 'Deal updated in localStorage:' : 'Deal saved to localStorage:', finalDealId);
    } catch (error: any) {
      console.error('Failed to save deal to localStorage:', error);
    }
    
    // Show appropriate notification
    if (supabaseSuccess && localStorageSuccess) {
      setSaveNotification(isUpdating ? 'Deal Updated! (Synced to cloud & local)' : 'Property Saved! (Synced to cloud & local)');
    } else if (localStorageSuccess) {
      setSaveNotification(isUpdating ? 'Deal Updated! (Local backup only)' : 'Property Saved! (Local backup only)');
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
    const loadedInputs = { ...DEFAULT_INPUTS, ...deal.data, exitStrategy: 'SELL' };
    setInputs(loadedInputs);
    setLenders(deal.lenders || []);
    setCurrentDealId(deal.id); // Track which deal is currently loaded
    // Set the original baseline lender name and inputs from the loaded deal
    setOriginalBaselineLenderName(deal.data.lenderName || null);
    setOriginalBaselineInputs({ ...loadedInputs }); // Store loaded inputs as baseline
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
      setCurrentDealId(null); // Clear current deal ID when starting new deal
    }
  };

  // --- LENDER HANDLERS ---
  const handleApplyLender = (lender: LenderOption) => {
    // Store baseline inputs before switching if this is the first time switching away from baseline
    // Check if current lender is baseline (not in comparison data)
    const isCurrentlyBaseline = !comparisonData.some(c => c.lender.lenderName === inputs.lenderName);
    
    // Only store baseline if:
    // 1. We're currently on baseline (not a comparison lender)
    // 2. We haven't stored baseline yet
    // 3. We're switching TO a comparison lender (the lender we're switching to IS in comparison)
    const isSwitchingToComparison = comparisonData.some(c => c.lender.id === lender.id);
    
    if (isCurrentlyBaseline && isSwitchingToComparison && !originalBaselineInputs) {
      // We're currently on baseline, about to switch to a comparison lender
      // Store the current inputs as baseline
      setOriginalBaselineInputs({ ...inputs });
      if (!originalBaselineLenderName) {
        setOriginalBaselineLenderName(inputs.lenderName);
      }
      console.log('✅ Stored baseline inputs before switching:', inputs.lenderName);
    }
    
    // Always update inputs with the selected lender's data
    setInputs((prev) => ({
      ...prev,
      lenderName: lender.lenderName, // Use lender's name, not prev.lenderName
      interestRate: lender.interestRate,
      originationPoints: lender.originationPoints,
      underwritingFee: lender.underwritingFee,
      processingFee: lender.processingFee,
      docPrepFee: lender.docPrepFee,
      wireFee: lender.wireFee,
      otherLenderFees: lender.otherFees,
    }));
    
    console.log('🔄 Switched to lender:', lender.lenderName);
  };

  const handleRestoreBaseline = () => {
    // Strategy 1: Restore from stored baseline inputs (most reliable - works even if no baseline lender exists)
    if (originalBaselineInputs) {
      console.log('✅ Restoring baseline from stored inputs:', originalBaselineInputs.lenderName);
      setInputs({ ...originalBaselineInputs });
      return;
    }
    
    // Strategy 2: Find and apply baseline lender (fallback if inputs not stored)
    const currentLenderName = inputs.lenderName;
    console.log('Restoring baseline. Current:', currentLenderName, 'Original baseline:', originalBaselineLenderName);
    console.log('Available lenders:', lenders.map(l => ({ name: l.lenderName, id: l.id, notes: l.notes })));
    
    let baselineLender: LenderOption | undefined;
    
    // Try to find by stored original baseline lender name
    if (originalBaselineLenderName) {
      baselineLender = lenders.find(l => l.lenderName === originalBaselineLenderName && l.lenderName !== currentLenderName);
      console.log('Strategy 2a - Found by original name:', baselineLender?.lenderName);
    }
    
    // Look for a lender with "Captured from deal baseline" in notes
    if (!baselineLender) {
      baselineLender = lenders.find(l => {
        if (l.lenderName === currentLenderName) return false;
        return l.notes?.includes('Captured from deal baseline') || 
               l.notes?.includes('baseline') ||
               l.notes?.includes('Baseline');
      });
      console.log('Strategy 2b - Found by notes:', baselineLender?.lenderName);
    }
    
    // Look for a lender with "Baseline" in the name
    if (!baselineLender) {
      baselineLender = lenders.find(l => {
        if (l.lenderName === currentLenderName) return false;
        return l.lenderName.includes('Baseline') || 
               l.lenderName.includes('BASELINE') || 
               l.lenderName.includes('baseline');
      });
      console.log('Strategy 2c - Found by name:', baselineLender?.lenderName);
    }
    
    // Find any lender that's not the current active one
    if (!baselineLender) {
      baselineLender = lenders.find(l => l.lenderName !== currentLenderName);
      console.log('Strategy 2d - Found any other:', baselineLender?.lenderName);
    }
    
    if (baselineLender) {
      console.log('✅ Applying baseline lender:', baselineLender.lenderName);
      handleApplyLender(baselineLender);
    } else {
      console.error('❌ Could not find baseline lender to restore. Current:', currentLenderName, 'Available:', lenders.map(l => l.lenderName));
      // Last resort: restore to default inputs
      console.log('⚠️ Restoring to default inputs as fallback');
      setInputs({ ...DEFAULT_INPUTS });
      setOriginalBaselineInputs({ ...DEFAULT_INPUTS });
      setOriginalBaselineLenderName(DEFAULT_INPUTS.lenderName || null);
    }
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
      financingPercentage: inputs.financingPercentage || 100,
      useCustomFinancing: inputs.useCustomFinancing || false,
      customFinancingPercentage: inputs.customFinancingPercentage || 100,
      maxARVPercent: 75, // Default to 75% ARV
      maxLoanToCostPercent: 100, // Default to 100% LTC
      includeInComparison: true,
      notes: '',
    };
    setEditingLender(newLender);
    setIsLenderModalOpen(true);
  };

  const handleCaptureBaseline = () => {
    const baselineName = inputs.lenderName || 'Baseline Snapshot';
    const newLender: LenderOption = {
      id: Date.now().toString(),
      lenderName: baselineName,
      loanType: 'HARD_MONEY',
      interestRate: inputs.interestRate,
      originationPoints: inputs.originationPoints,
      underwritingFee: inputs.underwritingFee,
      processingFee: inputs.processingFee,
      docPrepFee: inputs.docPrepFee,
      wireFee: inputs.wireFee,
      otherFees: inputs.otherLenderFees || 0,
      loanAmountOverride: 0,
      financingPercentage: inputs.financingPercentage || 100,
      useCustomFinancing: inputs.useCustomFinancing || false,
      customFinancingPercentage: inputs.customFinancingPercentage || 100,
      maxARVPercent: 75, // Default to 75% ARV
      maxLoanToCostPercent: 100, // Default to 100% LTC
      includeInComparison: true,
      notes: 'Captured from deal baseline',
    };
    setLenders([...lenders, newLender]);
    // Store the original baseline lender name and inputs
    if (!originalBaselineLenderName) {
      setOriginalBaselineLenderName(baselineName);
    }
    // Always store current inputs as baseline when capturing
    setOriginalBaselineInputs({ ...inputs });
    console.log('✅ Captured baseline:', baselineName, 'Stored inputs for restoration');
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
    return (
      <ReportMode 
        inputs={inputs} 
        results={results} 
        appVersion={appVersion}
        lenders={lenders}
        comparisonData={comparisonData}
        bestLenderFees={bestLenderFees}
        bestMonthlyPayment={bestMonthlyPayment}
        bestProfit={bestProfit}
        bestDownPayment={bestDownPayment}
        bestCashToClose={bestCashToClose}
        bestOverallLender={bestOverallLender}
        onClose={() => setIsReportMode(false)} 
      />
    );
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
            onRehabLineItemAdd={handleRehabLineItemAdd}
            onRehabLineItemUpdate={handleRehabLineItemUpdate}
            onRehabLineItemDelete={handleRehabLineItemDelete}
          />

          {/* Right Column - Results */}
          <ResultsColumn
            inputs={inputs}
            results={results}
            baselineResults={baselineResults}
            lenders={lenders}
            comparisonData={comparisonData}
            bestLenderFees={bestLenderFees}
            bestMonthlyPayment={bestMonthlyPayment}
            bestProfit={bestProfit}
            bestDownPayment={bestDownPayment}
            bestCashToClose={bestCashToClose}
            bestOverallLender={bestOverallLender}
            originalBaselineLenderName={originalBaselineLenderName}
            onAddLender={handleAddLender}
            onApplyLender={handleApplyLender}
            onRestoreBaseline={handleRestoreBaseline}
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
