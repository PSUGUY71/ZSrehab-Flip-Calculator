import React from 'react';
import { SavedDeal } from '../types';
import { formatCurrency } from '../utils/calculations';

interface DealModalProps {
  savedDeals: SavedDeal[];
  onLoadDeal: (deal: SavedDeal) => void;
  onDeleteDeal: (id: number | string, e: React.MouseEvent) => void;
  onCloneDeal: (deal: SavedDeal) => void;
  onClose: () => void;
}

export const DealModal: React.FC<DealModalProps> = ({
  savedDeals,
  onLoadDeal,
  onDeleteDeal,
  onCloneDeal,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 no-print">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border border-amber-200">
        <h3 className="font-bold mb-4 text-gray-900">Saved Deals</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {savedDeals.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors"
              onClick={() => onLoadDeal(d)}
            >
              <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                <span className="text-sm font-bold truncate text-gray-800">{d.name}</span>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] text-gray-400">{d.date}</span>
                  {d.data.arv && typeof d.data.arv === 'number' && d.data.arv > 0 && (
                    <>
                      <span className="text-[10px] text-gray-300">•</span>
                      <span className="text-[10px] font-semibold text-amber-600">
                        ARV: {formatCurrency(d.data.arv)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onLoadDeal(d)}
                  className="text-gray-700 text-xs font-bold px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Load this deal"
                >
                  Load
                </button>
                <button
                  onClick={() => onCloneDeal(d)}
                  className="text-gray-700 text-xs font-bold px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Clone/duplicate this deal"
                >
                  Clone
                </button>
                <button
                  onClick={(e) => onDeleteDeal(d.id, e)}
                  className="text-gray-700 text-xs font-bold px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  title="Delete this deal"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {savedDeals.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">No deals saved.</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 hover:bg-gray-300 transition rounded-lg py-2 text-sm font-bold text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};
