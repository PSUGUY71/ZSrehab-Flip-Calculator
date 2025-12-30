import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CalculatedResults, LoanInputs } from '../types';

interface VisualsProps {
  inputs: LoanInputs;
  results: CalculatedResults;
}

export const Visuals: React.FC<VisualsProps> = ({ inputs, results }) => {
  const capitalStackData = [
    { name: 'Initial Loan', value: results.initialFundedAmount, color: '#3b82f6' },
    { name: 'Rehab Holdback', value: results.holdbackAmount, color: '#8b5cf6' }, // Purple
    { name: 'Cash to Close', value: Math.max(0, results.totalCashToClose), color: '#f59e0b' },
  ];

  const profitData = [
    {
      name: 'Deal Economics',
      Cost: results.totalProjectCostBasis,
      Profit: results.netProfit,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:grid print:grid-cols-2 print:gap-4 break-inside-avoid print:mb-4">
      {/* Capital Stack Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 print:shadow-none print:border-gray-300 break-inside-avoid mb-6 print:mb-0 print:p-1">
        <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 text-center print:mb-1 print:text-[10px]">Funds Usage Breakdown</h3>
        <div className="h-64 print:h-32 report-chart-height">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={capitalStackData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={false} // Important for Print
              >
                {capitalStackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={20} wrapperStyle={{ fontSize: '8px' }} iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profitability Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 print:shadow-none print:border-gray-300 break-inside-avoid mb-6 print:mb-0 print:p-1">
        <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 text-center print:mb-1 print:text-[10px]">Estimated Profit</h3>
        <div className="h-64 print:h-32 report-chart-height">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={profitData}
              margin={{ top: 15, right: 15, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis tickFormatter={(val) => `$${val / 1000}k`} tick={{ fontSize: 8 }} width={30} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: '8px' }} height={20} iconSize={8} />
              <Bar dataKey="Cost" stackId="a" fill="#94a3b8" isAnimationActive={false} />
              <Bar dataKey="Profit" stackId="a" fill="#10b981" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500 print:mt-0 print:text-[8px]">
            Based on ARV: ${inputs.arv.toLocaleString()}
        </div>
      </div>
    </div>
  );
};