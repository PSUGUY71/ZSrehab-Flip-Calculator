import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_INPUTS, LoanInputs, SavedDeal, User, LenderOption } from './types';
import { calculateLoan } from './utils/calculations';
import { calculateLoanForLender } from './utils/lenderComparison';
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
    const usersStr = localStorage.getItem('zsrehab_users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    let usersUpdated = false;

    if (!users.find((u) => u.username === 'admin')) {
      users.push({ username: 'admin', password: 'admin', created: new Date().toISOString() });
      usersUpdated = true;
    }
    if (!users.find((u) => u.username === 'demo')) {
      users.push({ username: 'demo', password: 'demo', created: new Date().toISOString() });
      usersUpdated = true;
    }
    if (usersUpdated) {
      localStorage.setItem('zsrehab_users', JSON.stringify(users));
    }

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
          const migratedDeals = parsedDeals.map((d: SavedDeal) => ({
            ...d,
            lenders: d.lenders || [],
          }));
          setSavedDeals(migratedDeals);
        } catch (e) {
          console.error('Failed to parse saved deals', e);
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
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const usersStr = localStorage.getItem('zsrehab_users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    const foundUser = users.find((u) => u.username === authUsername && u.password === authPassword);
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
    if (users.find((u) => u.username === authUsername)) {
      setAuthError('Username already exists.');
      return;
    }
    const newUser: User = {
      username: authUsername,
      password: authPassword,
      created: new Date().toISOString(),
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

  // --- INPUT HANDLERS ---
  const handleInputChange = (field: keyof LoanInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // --- DEAL HANDLERS ---
  const handleSaveDeal = () => {
    if (!currentUser) return;
    const newDeal: SavedDeal = {
      id: Date.now(),
      name: inputs.address || 'Untitled Property',
      date: new Date().toLocaleDateString(),
      data: inputs,
      lenders: lenders,
    };
    const existingIndex = savedDeals.findIndex((d) => d.name === newDeal.name);
    let updatedDeals;
    if (existingIndex >= 0) {
      updatedDeals = [...savedDeals];
      updatedDeals[existingIndex] = newDeal;
    } else {
      updatedDeals = [newDeal, ...savedDeals];
    }
    setSavedDeals(updatedDeals);
    localStorage.setItem(`zsrehab_deals_${currentUser.username}`, JSON.stringify(updatedDeals));
    setSaveNotification('Property Saved!');
    setTimeout(() => setSaveNotification(null), 2000);
  };

  const handleLoadDeal = (deal: SavedDeal) => {
    setInputs({ ...deal.data, exitStrategy: 'SELL' });
    setLenders(deal.lenders || []);
    setIsDealModalOpen(false);
  };

  const handleDeleteDeal = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    const updated = savedDeals.filter((d) => d.id !== id);
    setSavedDeals(updated);
    localStorage.setItem(`zsrehab_deals_${currentUser.username}`, JSON.stringify(updated));
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

  // --- RENDER: LOGIN ---
  if (!currentUser) {
    return (
      <AuthScreen
        authMode={authMode}
        authUsername={authUsername}
        authPassword={authPassword}
        authError={authError}
        setAuthMode={setAuthMode}
        setAuthUsername={setAuthUsername}
        setAuthPassword={setAuthPassword}
        setAuthError={setAuthError}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    );
  }

  // --- RENDER: REPORT MODE ---
  if (isReportMode) {
    return <ReportMode inputs={inputs} results={results} onClose={() => setIsReportMode(false)} />;
  }

  // --- RENDER: MAIN EDITOR ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      <AppHeader
        currentUser={currentUser}
        savedDeals={savedDeals}
        saveNotification={saveNotification}
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
