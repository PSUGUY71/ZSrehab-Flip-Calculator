import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface FeeBreakdownItemProps {
  label: string;
  value: number;
  subtext?: string;
  alwaysShow?: boolean;
  estimated?: boolean; // placeholder average, not a real number yet
}

export const FeeBreakdownItem: React.FC<FeeBreakdownItemProps> = ({ label, value, subtext, alwaysShow, estimated }) => {
  if (value === 0 && !alwaysShow) return null;
  return (
    <div className="pl-3 py-0.5 border-l-2 border-gray-100 ml-1">
      <div className="flex justify-between items-start text-[10px] text-gray-500">
        <div className="flex flex-col">
          <span>{label}{estimated && <span className="text-amber-600 italic"> (est.)</span>}</span>
          {subtext && (
            <span className="text-xs text-gray-400 mt-0.5">
              {subtext}
            </span>
          )}
        </div>
        <span className="mt-0">{formatCurrency(value)}</span>
      </div>
    </div>
  );
};
