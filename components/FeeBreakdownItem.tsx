import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface FeeBreakdownItemProps {
  label: string;
  value: number;
}

export const FeeBreakdownItem: React.FC<FeeBreakdownItemProps> = ({ label, value }) => {
  if (value === 0) return null;
  return (
    <div className="flex justify-between items-center text-[10px] text-gray-500 pl-3 py-0.5 border-l-2 border-gray-100 ml-1">
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );
};
