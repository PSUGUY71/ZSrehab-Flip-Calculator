import React from 'react';
import { LenderOption } from '../types';
import { InputGroup } from './InputGroup';

interface LenderModalProps {
  editingLender: LenderOption;
  setEditingLender: (lender: LenderOption | null) => void;
  onSave: () => void;
  onClose: () => void;
}

export const LenderModal: React.FC<LenderModalProps> = ({
  editingLender,
  setEditingLender,
  onSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-blue-900 p-6">
          <h3 className="text-white font-bold text-xl">Lender Configuration</h3>
          <p className="text-blue-200 text-xs mt-1">Define financing terms to compare and apply to active deal</p>
        </div>
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Lender Name"
              id="lName"
              type="text"
              value={editingLender.lenderName}
              onChange={(v) => setEditingLender({ ...editingLender, lenderName: v as string })}
            />
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Loan Type</label>
              <select
                className="block w-full rounded-md border-gray-300 py-2 text-sm border pl-3"
                value={editingLender.loanType}
                onChange={(e) =>
                  setEditingLender({ ...editingLender, loanType: e.target.value as any })
                }
              >
                <option value="HARD_MONEY">Hard Money</option>
                <option value="DSCR">DSCR</option>
                <option value="BANK">Bank</option>
                <option value="PRIVATE">Private</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <InputGroup
              label="Int. Rate (%)"
              id="lRate"
              value={editingLender.interestRate}
              min={0}
              max={30}
              step={0.1}
              onChange={(v) =>
                setEditingLender({ ...editingLender, interestRate: Math.min(30, v as number) })
              }
              suffix="%"
            />
            <InputGroup
              label="Orig. Points (%)"
              id="lPts"
              value={editingLender.originationPoints}
              min={0}
              max={10}
              step={0.25}
              onChange={(v) =>
                setEditingLender({ ...editingLender, originationPoints: Math.min(10, v as number) })
              }
              suffix="pts"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <InputGroup
              label="Underwriting Fee"
              id="lUw"
              value={editingLender.underwritingFee}
              min={0}
              onChange={(v) => setEditingLender({ ...editingLender, underwritingFee: v as number })}
              prefix="$"
            />
            <InputGroup
              label="Processing Fee"
              id="lPr"
              value={editingLender.processingFee}
              min={0}
              onChange={(v) => setEditingLender({ ...editingLender, processingFee: v as number })}
              prefix="$"
            />
            <InputGroup
              label="Doc Prep Fee"
              id="lDp"
              value={editingLender.docPrepFee}
              min={0}
              onChange={(v) => setEditingLender({ ...editingLender, docPrepFee: v as number })}
              prefix="$"
            />
            <InputGroup
              label="Wire Fee"
              id="lWi"
              value={editingLender.wireFee}
              min={0}
              onChange={(v) => setEditingLender({ ...editingLender, wireFee: v as number })}
              prefix="$"
            />
            <div className="col-span-2">
              <InputGroup
                label="Other Fees"
                id="lOt"
                value={editingLender.otherFees}
                min={0}
                onChange={(v) => setEditingLender({ ...editingLender, otherFees: v as number })}
                prefix="$"
              />
            </div>
            <InputGroup
              label="Loan Override"
              id="lOv"
              value={editingLender.loanAmountOverride}
              min={0}
              onChange={(v) =>
                setEditingLender({ ...editingLender, loanAmountOverride: v as number })
              }
              prefix="$"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Notes</label>
            <textarea
              className="w-full rounded-md border-gray-300 text-sm border p-2 h-20"
              value={editingLender.notes}
              onChange={(e) => setEditingLender({ ...editingLender, notes: e.target.value })}
              placeholder="Lender specific details..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="lComp"
              checked={editingLender.includeInComparison}
              onChange={(e) =>
                setEditingLender({ ...editingLender, includeInComparison: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="lComp" className="text-xs font-bold text-gray-700">
              Include in Comparison Table
            </label>
          </div>
        </div>
        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-bold text-sm hover:bg-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-lg"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
