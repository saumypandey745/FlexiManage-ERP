/* eslint-disable */
'use client';

import React, { useMemo } from 'react';
import { useGetOpportunities, useMoveOpportunity } from '../api/opportunity.hooks';
import { Opportunity, OpportunityStageEnum, OpportunityStage } from '../schemas/opportunity.schema';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ItemTypes = {
  CARD: 'card',
};

interface CardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<CardProps> = ({ opportunity }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: opportunity.id, currentStage: opportunity.stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => { drag(node); }}
      className={`rounded-md border bg-white p-3 shadow-sm cursor-grab active:cursor-grabbing mb-3 dark:bg-gray-900 dark:border-gray-800 transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="font-medium text-sm">{opportunity.name}</div>
      <div className="text-xs text-gray-500 mt-1">{opportunity.customer?.name || 'No Customer'}</div>
      <div className="flex justify-between items-center mt-3">
        <div className="text-sm font-semibold">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(opportunity.amount)}
        </div>
        <Badge variant="secondary" className="text-[10px]">{opportunity.probability}%</Badge>
      </div>
    </div>
  );
};

interface ColumnProps {
  stage: OpportunityStage;
  opportunities: Opportunity[];
}

const PipelineColumn: React.FC<ColumnProps> = ({ stage, opportunities }) => {
  const { mutateAsync: moveOpportunity } = useMoveOpportunity();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: async (item: { id: string, currentStage: OpportunityStage }) => {
      if (item.currentStage !== stage) {
        try {
          await moveOpportunity({ id: item.id, stage });
          toast.success(`Moved to ${stage.replace(/_/g, ' ')}`);
        } catch (error: any) {
          toast.error(error?.message || 'Failed to move opportunity');
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const totalAmount = opportunities.reduce((sum, opp) => sum + Number(opp.amount), 0);

  return (
    <div 
      ref={(node) => { drop(node); }} 
      className={`flex flex-col flex-shrink-0 w-72 rounded-lg bg-gray-50/50 p-2 dark:bg-gray-950 transition-colors border ${isOver ? 'border-blue-400 bg-blue-50/20' : 'border-transparent'}`}
    >
      <div className="mb-3 px-2 py-1">
        <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
          {stage.replace(/_/g, ' ')}
        </h3>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
          <span>{opportunities.length} Deals</span>
          <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalAmount)}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {opportunities.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
    </div>
  );
};

export function PipelineBoard() {
  const { data: opportunities, isLoading, isError } = useGetOpportunities();

  const columns = useMemo(() => {
    if (!opportunities) return {};
    
    const acc: Record<string, Opportunity[]> = {};
    OpportunityStageEnum.options.forEach(stage => acc[stage] = []);
    
    opportunities.forEach(opp => {
      if (acc[opp.stage]) {
        acc[opp.stage].push(opp);
      }
    });
    
    return acc;
  }, [opportunities]);

  if (isLoading) {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-[600px] w-72 flex-shrink-0 rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load pipeline.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 overflow-x-auto pb-4 h-[calc(100vh-160px)] items-start">
        {OpportunityStageEnum.options.map(stage => (
          <PipelineColumn 
            key={stage} 
            stage={stage} 
            opportunities={columns[stage] || []} 
          />
        ))}
      </div>
    </DndProvider>
  );
}
