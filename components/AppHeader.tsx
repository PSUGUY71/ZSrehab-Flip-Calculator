import React from 'react';
import { SavedDeal } from '../types';

interface AppHeaderProps {
  currentUser: {
    username?: string | null;
    email?: string | null;
  };
  savedDeals: SavedDeal[];
  saveNotification: string | null;
  appVersion?: 'NORMAL' | 'HIDEOUT' | 'CUSTOM';
  onVersionChange?: (version: 'NORMAL' | 'HIDEOUT' | 'CUSTOM') => void;
  onNewDeal: () => void;
  onSaveDeal: () => void;
  onOpenDealModal: () => void;
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 text-white p-2 rounded font-bold tracking-tighter text-xl">ZS</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">ZS Calculator</h1>
            <div className="flex items-center gap-2">
              {/* 100% LOAN QUALIFIER removed */}
              <span className="text-xs text-blue-600 font-medium">User: {displayName}</span>
            </div>
          </div>
        </div>

        {/* Centered Version Selector */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
          {onVersionChange ? (
            <div className="relative group">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Version:</span>
                <div className="relative">
                  <select 
                    value={appVersion} 
                    onChange={(e) => onVersionChange(e.target.value as 'NORMAL' | 'HIDEOUT' | 'CUSTOM')}
                    className="bg-blue-50 text-blue-800 px-5 py-1.5 pr-8 rounded-full text-xs font-bold border-2 border-blue-200 shadow-sm uppercase tracking-wide appearance-none cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                    title="Click to switch between Normal, Hideout, and Custom versions"
                  >
                    <option value="NORMAL">Normal Version</option>
                    <option value="HIDEOUT">Hideout Version</option>
                    <option value="CUSTOM">Custom Version</option>
                  </select>
                  {/* Dropdown Arrow Icon */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg 
                      className="w-4 h-4 text-blue-600 group-hover:text-blue-800 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {/* Badge showing number of versions */}
                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm border border-white">
                    3
                  </div>
                </div>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded whitespace-nowrap shadow-lg">
                  <div className="font-semibold mb-0.5">Switch Version</div>
                  <div className="text-[10px] text-gray-300">3 versions available: Normal, Hideout, Custom</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 text-blue-800 px-4 py-1 rounded-full text-xs font-bold border border-blue-100 shadow-sm uppercase tracking-wide">
              {appVersion === 'NORMAL' ? 'Normal' : appVersion === 'HIDEOUT' ? 'Hideout' : 'Custom'} Version
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onNewDeal}
            className="text-gray-500 hover:text-blue-600 font-medium px-3 py-1 rounded text-sm transition"
          >
            New
          </button>
          <button
            onClick={onSaveDeal}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2 relative"
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
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-gray-500"
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
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={onReportMode}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-sm"
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
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 font-medium px-2 py-1 rounded text-xs transition"
            title="Log Out"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};
