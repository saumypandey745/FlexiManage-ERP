'use client';

import React from 'react';
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Opportunity, OpportunityStageEnum } from '../../../opportunity-management/schemas/opportunity.schema';

interface PipelineFunnelChartProps {
  opportunities: Opportunity[];
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'];

export function PipelineFunnelChart({ opportunities }: PipelineFunnelChartProps) {
  const stageCounts = OpportunityStageEnum.options.reduce((acc: Record<string, number>, stage) => {
    acc[stage] = 0;
    return acc;
  }, {});

  opportunities.forEach(opp => {
    if (stageCounts[opp.stage] !== undefined) {
      stageCounts[opp.stage]++;
    }
  });

  const data = OpportunityStageEnum.options
    .filter(stage => stage !== 'CLOSED_LOST') // Typically lost deals aren't in the forward funnel
    .map(stage => ({
      name: stage.replace(/_/g, ' '),
      value: stageCounts[stage],
    }))
    .filter(d => d.value > 0);

  if (data.length === 0) {
    return <div className="flex h-64 items-center justify-center text-sm text-gray-500 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800">No Pipeline Data Available</div>;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Pipeline Funnel</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList position="right" fill="#6b7280" stroke="none" dataKey="name" fontSize={12} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
