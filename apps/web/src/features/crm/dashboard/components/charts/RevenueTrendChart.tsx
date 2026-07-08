'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Opportunity } from '../../../opportunity-management/schemas/opportunity.schema';

interface RevenueTrendChartProps {
  opportunities: Opportunity[];
}

export function RevenueTrendChart({ opportunities }: RevenueTrendChartProps) {
  // Aggregate opportunities by month based on createdAt or expectedClose
  // For demonstration of the component, we calculate based on closed deals.
  
  const dataMap = opportunities
    .filter(o => o.stage === 'CLOSED_WON')
    .reduce((acc: Record<string, number>, curr) => {
      const month = new Date(curr.updatedAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + Number(curr.amount);
      return acc;
    }, {});

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    revenue: dataMap[key],
  }));

  if (data.length === 0) {
    return <div className="flex h-64 items-center justify-center text-sm text-gray-500 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">No Closed Won Revenue Data Available</div>;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Revenue Trend (Closed Won)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: unknown) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value)), 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
