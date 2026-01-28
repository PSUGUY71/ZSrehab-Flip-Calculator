import React, { useState } from 'react';
import { RehabLineItem } from '../types';
import { formatCurrency } from '../utils/calculations';
import { HelpTooltip } from './HelpTooltip';

interface RehabLineItemsProps {
  lineItems: RehabLineItem[];
  onAddItem: () => void;
  onUpdateItem: (id: string, field: keyof RehabLineItem, value: string | number) => void;
  onDeleteItem: (id: string) => void;
  totalRehabBudget: number;
}

export const RehabLineItems: React.FC<RehabLineItemsProps> = ({
  lineItems,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  totalRehabBudget,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateLineItemTotal = (item: RehabLineItem) => {
    return item.unitCost * item.quantity;
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + calculateLineItemTotal(item), 0);
  };

  const lineItemsTotal = calculateTotal();
  const difference = totalRehabBudget - lineItemsTotal;
  const isMatching = Math.abs(difference) < 0.01; // Allow small floating point differences

  const commonCategories = [
    'Kitchen',
    'Bathroom',
    'Flooring',
    'Paint',
    'Roof',
    'HVAC',
    'Electrical',
    'Plumbing',
    'Windows',
    'Doors',
    'Landscaping',
    'Foundation',
    'Other',
  ];

  return (
    <div className="mt-3 border border-amber-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 flex justify-between items-center transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 uppercase">Rehab Breakdown</span>
          <span className="text-[10px] text-gray-500">
            ({lineItems.length} item{lineItems.length !== 1 ? 's' : ''})
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isExpanded && (
            <div className={`text-xs font-semibold ${isMatching ? 'text-amber-600' : 'text-amber-600'}`}>
              {isMatching ? '✓ Matches' : `Diff: ${formatCurrency(Math.abs(difference))}`}
            </div>
          )}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white space-y-3">
          {/* Summary Row */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-700">Line Items Total:</span>
            <span className={`font-bold ${isMatching ? 'text-amber-600' : 'text-amber-600'}`}>
              {formatCurrency(lineItemsTotal)}
            </span>
          </div>
          {!isMatching && (
            <div className={`text-xs p-2 rounded ${difference > 0 ? 'bg-gray-50 text-gray-700 border border-gray-200' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
              {difference > 0 
                ? `⚠️ Line items total is ${formatCurrency(difference)} less than Rehab Budget`
                : `⚠️ Line items total is ${formatCurrency(Math.abs(difference))} more than Rehab Budget`}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-2 py-2 text-left font-semibold text-gray-700">Description</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">Unit Cost</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">Qty</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">Total</th>
                  <th className="px-2 py-2 text-center font-semibold text-gray-700 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-2 py-2">
                      <select
                        value={item.category}
                        onChange={(e) => onUpdateItem(item.id, 'category', e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {commonCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        className="w-full text-xs border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.unitCost || ''}
                        onChange={(e) => onUpdateItem(item.id, 'unitCost', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full text-xs border border-gray-300 rounded px-2 py-0.5 text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.quantity || ''}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        placeholder="1"
                        step="1"
                        min="0"
                        className="w-full text-xs border border-gray-300 rounded px-2 py-0.5 text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2 text-right font-medium text-gray-900">
                      {formatCurrency(calculateLineItemTotal(item))}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="text-amber-600 hover:text-amber-800 text-sm font-bold"
                        title="Delete item"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                <tr>
                  <td colSpan={4} className="px-2 py-2 text-right font-bold text-gray-900">
                    Total:
                  </td>
                  <td className="px-2 py-2 text-right font-bold text-gray-900">
                    {formatCurrency(lineItemsTotal)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Add Item Button */}
          <button
            onClick={onAddItem}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold rounded transition-colors"
          >
            + Add Line Item
          </button>
        </div>
      )}
    </div>
  );
};

