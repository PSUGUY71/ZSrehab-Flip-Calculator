import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface ResultRowProps {
  label: string;
  value: number | string;
  isCurrency?: boolean;
  highlight?: boolean;
  isTotal?: boolean;
  subtext?: string;
}

export const ResultRow: React.FC<ResultRowProps> = ({ 
  label, 
  value, 
  isCurrency = true, 
  highlight = false,
  isTotal = false,
  subtext
}) => {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${highlight ? 'bg-amber-50 -mx-2 px-2 rounded' : ''} ${isTotal ? 'font-bold text-gray-900 bg-amber-50 -mx-2 px-2 mt-2 rounded' : 'text-gray-600'}`}>
      <div className="flex flex-col">
        <span>{label}</span>
        {subtext && <span className="text-xs text-gray-400 font-normal">{subtext}</span>}
      </div>
      <span className={isTotal ? 'text-lg' : ''}>
        {isCurrency && typeof value === 'number' ? formatCurrency(value) : value}
      </span>
    </div>
  );
};