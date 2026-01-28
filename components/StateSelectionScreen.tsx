import React, { useState } from 'react';
import { getAllStateCodes, getStateName, getStateDefaults } from '../utils/stateDefaults';
import { formatCurrency } from '../utils/calculations';

interface StateSelectionScreenProps {
  onStateSelect: (stateCode: string) => void;
  currentState?: string;
}

export const StateSelectionScreen: React.FC<StateSelectionScreenProps> = ({
  onStateSelect,
  currentState,
}) => {
  const [selectedState, setSelectedState] = useState<string>(currentState || '');
  const [showPreview, setShowPreview] = useState(false);

  const allStates = getAllStateCodes().sort((a, b) => 
    getStateName(a).localeCompare(getStateName(b))
  );

  const handleContinue = () => {
    if (selectedState) {
      onStateSelect(selectedState);
    }
  };

  const previewDefaults = selectedState ? getStateDefaults(selectedState) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8 text-center">
          <div className="inline-block bg-white text-blue-900 p-3 rounded-lg font-bold text-3xl mb-4 shadow-lg">ZS</div>
          <h1 className="text-2xl font-bold text-white mb-2">Select Your State</h1>
          <p className="text-blue-200 text-sm">We'll auto-populate closing cost defaults based on your state</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select State <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setShowPreview(true);
              }}
              className="w-full rounded-lg border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
              size={10}
            >
              <option value="">-- Select a State --</option>
              {allStates.map((code) => (
                <option key={code} value={code}>
                  {getStateName(code)} ({code})
                </option>
              ))}
            </select>
          </div>

          {/* Preview of Defaults */}
          {showPreview && previewDefaults && (
            <div className="mb-6 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg">
              <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase">
                Estimated Closing Cost Defaults for {previewDefaults.name}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">CPL/Attorney Fee:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {previewDefaults.cplFee > 0 ? formatCurrency(previewDefaults.cplFee) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Title Insurance Rate:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {previewDefaults.titleInsuranceRate > 0 
                      ? `${previewDefaults.titleInsuranceRate}%` 
                      : 'Uses Rate Table'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Transfer Tax Rate:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {previewDefaults.transferTaxRate > 0 
                      ? `${previewDefaults.transferTaxRate}%` 
                      : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Typical Closing Costs:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {previewDefaults.typicalClosingCostPercent}% of purchase
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Property Tax Rate:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    {previewDefaults.propertyTaxRate}% annually
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Insurance Est.:</span>
                  <span className="font-bold text-gray-900 ml-2">
                    ${previewDefaults.insurancePerMonthPer100k}/mo per $100k
                  </span>
                </div>
              </div>
              {previewDefaults.note && (
                <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-800">
                  <strong>Note:</strong> {previewDefaults.note}
                </div>
              )}
              <div className="mt-3 text-xs text-blue-700 italic">
                💡 All values can be adjusted after selection. These are starting estimates.
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedState}
            className={`w-full py-3 px-4 rounded-md font-bold text-lg transition shadow-lg ${
              selectedState
                ? 'bg-gray-700 hover:bg-gray-800 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue with {selectedState ? getStateName(selectedState) : 'State Selection'}
          </button>

          <div className="mt-4 text-center text-xs text-gray-500">
            You can change the state anytime from the property information section
          </div>
        </div>
      </div>
    </div>
  );
};

