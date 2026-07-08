'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Opportunity, OpportunityStageEnum } from '../../../opportunity-management/schemas/opportunity.schema';

interface StageDistributionChartProps {
  opportunities: Opportunity[];
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'];

export function StageDistributionChart({ opportunities }: StageDistributionChartProps) {
  const stageCounts = OpportunityStageEnum.options.reduce((acc: Record<string, number>, stage) => {
    acc[stage] = 0;
    return acc;
  }, {});

  opportunities.forEach(opp => {
    if (stageCounts[opp.stage] !== undefined) {
      stageCounts[opp.stage] += Number(opp.amount);
    }
  });

  const data = OpportunityStageEnum.options
    .filter(stage => stage !== 'CLOSED_LOST' && stage !== 'CLOSED_WON')
    .map(stage => ({
      name: stage.replace(/_/g, ' '),
      value: stageCounts[stage],
    }))
    .filter(d => d.value > 0);

  if (data.length === 0) {
    return <div className="flex h-64 items-center justify-center text-sm text-gray-500 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">No Open Opportunities Available</div>;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Revenue by Stage (Open)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: unknown) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value)), 'Revenue']}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
