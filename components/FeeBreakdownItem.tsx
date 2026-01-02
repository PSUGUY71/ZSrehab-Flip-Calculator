import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface FeeBreakdownItemProps {
  label: string;
  value: number;
  subtext?: string;
}

export const FeeBreakdownItem: React.FC<FeeBreakdownItemProps> = ({ label, value, subtext }) => {
  if (value === 0) return null;
  return (
    <div className="pl-3 py-0.5 border-l-2 border-gray-100 ml-1">
      <div className="flex justify-between items-start text-[10px] text-gray-500">
        <div className="flex flex-col">
          <span>{label}</span>
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
