import React, { useState } from 'react';

interface HelpTooltipProps {
  title: string;
  description: string;
  examples?: string[];
  formula?: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ title, description, examples, formula }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-amber-600 hover:text-amber-800 focus:outline-none"
        title="Click for help"
        type="button"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Tooltip */}
          <div className="absolute z-50 w-80 bg-white border-2 border-amber-500 rounded-lg shadow-xl p-4 left-0 mt-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-amber-900 text-sm">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-700 mb-3">{description}</p>
            {formula && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 mb-3">
                <p className="text-[10px] font-semibold text-amber-700 mb-1">Formula:</p>
                <p className="text-xs font-mono text-gray-800">{formula}</p>
              </div>
            )}
            {examples && examples.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-gray-600 mb-1">Examples:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  {examples.map((example, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

