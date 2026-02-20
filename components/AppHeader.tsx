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
  onNewDeal: () => void;
  onSaveDeal: () => void;
  onOpenDealModal: () => void;
  onOpenSettings: () => void;
  onReportMode: () => void;
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentUser,
  savedDeals,
  saveNotification,
  appVersion = 'HIDEOUT',
  onVersionChange,
  onNewDeal,
  onSaveDeal,
  onOpenDealModal,
  onOpenSettings,
  onReportMode,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="hidden md:flex items-center gap-2">
          {/* Version Selector */}
          <select
            value={appVersion}
            onChange={(e) => onVersionChange?.(e.target.value as 'NORMAL' | 'HIDEOUT')}
            className="border border-gray-400 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            title="Switch between version modes"
          >
            <option value="NORMAL">NORMAL</option>
            <option value="HIDEOUT">HIDEOUT</option>
          </select>

          <div className="h-6 w-px bg-gray-600 mx-1" />

          <button onClick={onNewDeal} className="text-amber-200 hover:text-amber-300 font-medium px-3 py-1 rounded-lg text-sm transition">
            New
          </button>

          <button
            onClick={onSaveDeal}
            className="bg-gray-700 border border-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Save
            {saveNotification && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow whitespace-nowrap z-50">
                {saveNotification}
              </div>
            )}
          </button>

          <button
            onClick={onOpenDealModal}
            className="bg-gray-800 border border-amber-400 hover:bg-gray-700 text-amber-400 px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75H2.75A.75.75 0 012 16.25V3.75zm1.5 1.5v11h13v-11h-13z" clipRule="evenodd" />
              <path d="M6.25 6.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 3.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" />
            </svg>
            My Deals ({savedDeals.length})
          </button>

          <div className="h-6 w-px bg-amber-300 mx-1" />

          <button onClick={onReportMode} className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.198-.54-1.214-1.201l.228-2.267m7.144 0h-7.144" />
            </svg>
            Report
          </button>

          <div className="h-6 w-px bg-amber-300 mx-1" />

          <button onClick={onOpenSettings} className="text-amber-200 hover:text-amber-300 font-medium px-2 py-1 rounded-lg text-xs transition flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>

          <div className="h-6 w-px bg-amber-300 mx-1" />

          <button onClick={onLogout} className="text-amber-200 hover:text-red-400 font-medium px-2 py-1 rounded-lg text-xs transition">
            Log Out
          </button>
        </div>

        {/* Mobile: Version selector + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <select
            value={appVersion}
            onChange={(e) => onVersionChange?.(e.target.value as 'NORMAL' | 'HIDEOUT')}
            className="border border-gray-400 rounded px-2 py-1 text-xs font-medium text-gray-900 bg-gray-100"
          >
            <option value="NORMAL">NORMAL</option>
            <option value="HIDEOUT">HIDEOUT</option>
          </select>
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


interface AppHeaderProps {
  currentUser: {
    username?: string | null;
    email?: string | null;
  };
  savedDeals: SavedDeal[];
  saveNotification: string | null;
  appVersion?: 'NORMAL' | 'HIDEOUT';
  onVersionChange?: (version: 'NORMAL' | 'HIDEOUT') => void;
  onNewDeal: () => void;
  onSaveDeal: () => void;
  onOpenDealModal: () => void;
  onOpenSettings: () => void;
  onReportMode: () => void;
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentUser,
  savedDeals,
  saveNotification,
  appVersion = 'HIDEOUT',
  onVersionChange,
  onNewDeal,
  onSaveDeal,
  onOpenDealModal,
  onOpenSettings,
  onReportMode,
  onLogout,
}) => {
  // Debug: Log the count when component renders
  React.useEffect(() => {
    console.log('📊 AppHeader: savedDeals count =', savedDeals.length, 'deals:', savedDeals.map(d => ({ id: d.id, name: d.name })));
  }, [savedDeals]);

  const displayName = currentUser?.username?.trim()
    || currentUser?.email?.trim()
    || 'Guest';

  return (
    <header className="bg-gray-900 border-b border-amber-200 sticky top-0 z-30 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="bg-gray-700 text-white p-2 rounded-lg font-bold tracking-tighter text-xl">ZS</div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">ZS Calculator</h1>
            <div className="flex items-center gap-2">
              {/* 100% LOAN QUALIFIER removed */}
              <span className="text-xs text-amber-300 font-medium">User: {displayName}</span>
            </div>
          </div>
        </div>

        {/* Version Selector */}
        <div className="flex items-center gap-3">
          <select
            value={appVersion}
            onChange={(e) => onVersionChange?.(e.target.value as 'NORMAL' | 'HIDEOUT')}
            className="border border-gray-400 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            title="Switch between version modes"
          >
            <option value="NORMAL">NORMAL</option>
            <option value="HIDEOUT">HIDEOUT</option>
          </select>
          <span className="text-xs text-amber-200">Version</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onNewDeal}
            className="text-amber-200 hover:text-amber-300 font-medium px-3 py-1 rounded-lg text-sm transition"
          >
            New
          </button>
          <button
            onClick={onSaveDeal}
            className="bg-gray-700 border border-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-2 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-gray-500"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Save
            {saveNotification && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow whitespace-nowrap z-50">
                {saveNotification}
              </div>
            )}
          </button>
          <button
            onClick={onOpenDealModal}
            className="bg-gray-800 border border-amber-400 hover:bg-gray-700 text-amber-400 px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75H2.75A.75.75 0 012 16.25V3.75zm1.5 1.5v11h13v-11h-13z"
                clipRule="evenodd"
              />
              <path d="M6.25 6.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 3.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" />
            </svg>
            My Deals ({savedDeals.length})
          </button>
          <div className="h-6 w-px bg-amber-300 mx-2"></div>
          <button
            type="button"
            onClick={onReportMode}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.198-.54-1.214-1.201l.228-2.267m7.144 0h-7.144m7.144 0l-7.144 0M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 9.148A4.689 4.689 0 015.65 8.5m15.75 0a48.868 48.868 0 01-.001 4.726C21.402 11.965 20.208 12 18.75 12m-13.5 0c-1.261 0-2.614-.034-3.808.138m3.808-.138c.344-.982 1.009-1.875 1.938-2.618 3.562-2.832 8.796-2.834 12.378 0 .966.772 1.637 1.745 1.938 2.79m-9.435-10.825a1.033 1.033 0 011.055-.003 3.84 3.84 0 002.3.755 3.84 3.84 0 002.3-.755 1.033 1.033 0 011.055.003c.969.673 1.527 2.22 1.09 3.443C15.844 7.07 14.118 8 12 8c-2.118 0-3.844-.93-4.902-2.396-.437-1.223.12-2.77 1.09-3.443z"
              />
            </svg>
            Report
          </button>
          <div className="h-6 w-px bg-amber-300 mx-2"></div>
          <button
            onClick={onOpenSettings}
            className="text-amber-200 hover:text-amber-300 font-medium px-2 py-1 rounded-lg text-xs transition flex items-center gap-1"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94m-9.474 0a23.474 23.474 0 07.5 0m0 0a20.614 20.614 0 003.946 2.764A12.012 12.012 0 0112 9.25c4.1 0 7.625-2.087 9.738-5.493a20.615 20.615 0 003.946-2.764m-9.474 0c.054-.337.112-.662.184-.974m5.858 5.408a3 3 0 11-6 0 3 3 0 016 0zm12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Settings
          </button>
          <div className="h-6 w-px bg-amber-300 mx-2"></div>
          <button
            onClick={onLogout}
            className="text-amber-200 hover:text-red-400 font-medium px-2 py-1 rounded-lg text-xs transition"
            title="Log Out"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
