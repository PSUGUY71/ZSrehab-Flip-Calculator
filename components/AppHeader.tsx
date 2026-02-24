import React, { useState } from 'react';
import { SavedDeal } from '../types';

interface AppHeaderProps {
  currentUser: {
    username?: string | null;
    email?: string | null;
  };
  savedDeals: SavedDeal[];
  saveNotification: string | null;
  appVersion?: 'NORMAL' | 'HIDEOUT';
  onVersionChange?: (version: 'NORMAL' | 'HIDEOUT') => void;
  showVersionSelector?: boolean;
  onNewDeal: () => void;
  onSaveDeal: () => void;
  onOpenDealModal: () => void;
  onOpenSettings: () => void;
  onReportMode: () => void;
  onPlanBRental?: () => void;
  onPortfolioDashboard?: () => void;
  onShareDeal?: () => void;
  onExpenseTracker?: () => void;
  onScenarioComparison?: () => void;
  onTeamManagement?: () => void;
  onExportIntegration?: () => void;
  onAIChat?: () => void;
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentUser,
  savedDeals,
  saveNotification,
  appVersion = 'HIDEOUT',
  onVersionChange,
  showVersionSelector = false,
  onNewDeal,
  onSaveDeal,
  onOpenDealModal,
  onOpenSettings,
  onReportMode,
  onPlanBRental,
  onPortfolioDashboard,
  onShareDeal,
  onExpenseTracker,
  onScenarioComparison,
  onTeamManagement,
  onExportIntegration,
  onAIChat,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    console.log('📊 AppHeader: savedDeals count =', savedDeals.length);
  }, [savedDeals]);

  const displayName = currentUser?.username?.trim()
    || currentUser?.email?.trim()
    || 'Guest';

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gray-900 border-b border-amber-200 sticky top-0 z-30 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">

        {/* Logo + User */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-gray-700 text-white p-2 rounded-lg font-bold tracking-tighter text-xl shrink-0">ZS</div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white leading-none truncate">ZS Calculator</h1>
            <span className="text-xs text-amber-300 font-medium truncate block">User: {displayName}</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {/* Version Selector — only shown when Hideout Mode is enabled in Settings */}
          {showVersionSelector && (
            <>
              <select
                value={appVersion}
                onChange={(e) => onVersionChange?.(e.target.value as 'NORMAL' | 'HIDEOUT')}
                className="border border-gray-600 rounded-lg px-2 py-1 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                title="Switch between version modes"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="HIDEOUT">HIDEOUT</option>
              </select>
              <div className="h-6 w-px bg-gray-600 mx-1" />
            </>
          )}

          {/* Shared button style: bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium */}
          <button onClick={onNewDeal} className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition relative">
            New
          </button>

          <button onClick={onSaveDeal} className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition relative">
            Save
            {saveNotification && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow whitespace-nowrap z-50">
                {saveNotification}
              </div>
            )}
          </button>

          <button onClick={onOpenDealModal} className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
            My Deals ({savedDeals.length})
          </button>

          <div className="h-6 w-px bg-gray-600 mx-1" />

          {/* Features Dropdown */}
          <div className="relative" ref={featuresRef}>
            <button
              onClick={() => setFeaturesOpen((o) => !o)}
              className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1.5"
            >
              Features
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {featuresOpen && (
              <div className="absolute left-0 top-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl min-w-[180px] z-50 py-1 overflow-hidden">
                {onPlanBRental && (
                  <button onClick={() => { onPlanBRental(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Plan B Rental
                  </button>
                )}
                {onPortfolioDashboard && (
                  <button onClick={() => { onPortfolioDashboard(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Portfolio
                  </button>
                )}
                {onShareDeal && (
                  <button onClick={() => { onShareDeal(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Share Deal
                  </button>
                )}
                <div className="border-t border-gray-600 my-1" />
                {onExpenseTracker && (
                  <button onClick={() => { onExpenseTracker(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Expense Tracker
                  </button>
                )}
                {onScenarioComparison && (
                  <button onClick={() => { onScenarioComparison(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Compare Strategies
                  </button>
                )}
                {onTeamManagement && (
                  <button onClick={() => { onTeamManagement(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Team
                  </button>
                )}
                {onExportIntegration && (
                  <button onClick={() => { onExportIntegration(); setFeaturesOpen(false); }} className="w-full text-left text-white hover:bg-gray-700 px-4 py-2 text-sm font-medium transition">
                    Export & API
                  </button>
                )}
              </div>
            )}
          </div>

          <button onClick={onReportMode} className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
            Report
          </button>

          {/* AI — intentionally distinct */}
          {onAIChat && (
            <button onClick={onAIChat} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 py-1 rounded-lg text-sm font-medium transition border border-purple-500/40">
              🤖 AI
            </button>
          )}

          <div className="h-6 w-px bg-gray-600 mx-1" />

          <button onClick={onOpenSettings} className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
            Settings
          </button>

          <button onClick={onLogout} className="bg-gray-700 border border-gray-600 hover:bg-red-900/60 hover:border-red-600 hover:text-red-300 text-white px-3 py-1 rounded-lg text-sm font-medium transition">
            Log Out
          </button>
        </div>

        {/* Mobile: Version selector + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {showVersionSelector && (
            <select
              value={appVersion}
              onChange={(e) => onVersionChange?.(e.target.value as 'NORMAL' | 'HIDEOUT')}
              className="border border-gray-400 rounded px-2 py-1 text-xs font-medium text-gray-900 bg-gray-100"
            >
              <option value="NORMAL">NORMAL</option>
              <option value="HIDEOUT">HIDEOUT</option>
            </select>
          )}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-white p-2 rounded-lg hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 flex flex-col gap-1">
          <button onClick={() => { onNewDeal(); closeMenu(); }} className="text-left text-amber-200 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
            New Deal
          </button>
          <button
            onClick={() => { onSaveDeal(); closeMenu(); }}
            className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition relative"
          >
            Save Deal
            {saveNotification && (
              <span className="ml-2 text-xs text-amber-300">{saveNotification}</span>
            )}
          </button>
          <button onClick={() => { onOpenDealModal(); closeMenu(); }} className="text-left text-amber-400 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
            My Deals ({savedDeals.length})
          </button>
          <div className="border-t border-gray-600 my-1" />
          <p className="px-3 pt-1 pb-0.5 text-xs font-bold text-amber-400 uppercase tracking-wider">Features</p>
          {onPlanBRental && (
            <button onClick={() => { onPlanBRental(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Plan B Rental
            </button>
          )}
          {onPortfolioDashboard && (
            <button onClick={() => { onPortfolioDashboard(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Portfolio
            </button>
          )}
          {onShareDeal && (
            <button onClick={() => { onShareDeal(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Share Deal
            </button>
          )}
          {onExpenseTracker && (
            <button onClick={() => { onExpenseTracker(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Expense Tracker
            </button>
          )}
          {onScenarioComparison && (
            <button onClick={() => { onScenarioComparison(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Compare Strategies
            </button>
          )}
          {onTeamManagement && (
            <button onClick={() => { onTeamManagement(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Team
            </button>
          )}
          {onExportIntegration && (
            <button onClick={() => { onExportIntegration(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              Export & API
            </button>
          )}
          {onAIChat && (
            <button onClick={() => { onAIChat(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
              🤖 AI Assistant
            </button>
          )}
          <button onClick={() => { onReportMode(); closeMenu(); }} className="text-left text-white hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
            Report
          </button>
          <button onClick={() => { onOpenSettings(); closeMenu(); }} className="text-left text-amber-200 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
            Settings
          </button>
          <div className="border-t border-gray-600 my-1" />
          <button onClick={() => { onLogout(); closeMenu(); }} className="text-left text-red-400 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition">
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};
