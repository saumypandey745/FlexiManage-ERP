'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Opportunity } from '../../../opportunity-management/schemas/opportunity.schema';

interface WinLossChartProps {
  opportunities: Opportunity[];
}

const COLORS = {
  win: '#22c55e',
  loss: '#ef4444'
};

export function WinLossChart({ opportunities }: WinLossChartProps) {
  const won = opportunities.filter(o => o.stage === 'CLOSED_WON').length;
  const lost = opportunities.filter(o => o.stage === 'CLOSED_LOST').length;

  const data = [
    { name: 'Won', value: won },
    { name: 'Lost', value: lost }
  ].filter(d => d.value > 0);

  if (data.length === 0) {
    return <div className="flex h-64 items-center justify-center text-sm text-gray-500 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">No Closed Deals Available</div>;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Win/Loss Ratio</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === 'Won' ? COLORS.win : COLORS.loss} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
