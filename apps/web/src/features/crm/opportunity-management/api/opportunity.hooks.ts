/* eslint-disable */
import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Opportunity, CreateOpportunityDto, UpdateOpportunityDto, OpportunityStage } from '../schemas/opportunity.schema';

const OPPORTUNITIES_KEY = ['crm', 'opportunities'];

export const useGetOpportunities = () => {
  return useApiQuery<Opportunity[]>(OPPORTUNITIES_KEY, '/crm/opportunities');
};

export const useGetOpportunity = (id: string) => {
  return useApiQuery<Opportunity>([...OPPORTUNITIES_KEY, id], `/crm/opportunities/${id}`, {
    enabled: !!id,
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  return useApiMutation<Opportunity, CreateOpportunityDto>('/crm/opportunities', 'POST', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OPPORTUNITIES_KEY });
    },
  });
};

export const useUpdateOpportunity = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Opportunity, UpdateOpportunityDto>(`/crm/opportunities/${id}`, 'PATCH', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OPPORTUNITIES_KEY });
      queryClient.invalidateQueries({ queryKey: [...OPPORTUNITIES_KEY, id] });
    },
  });
};

export const useDeleteOpportunity = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Opportunity, void>(`/crm/opportunities/${id}`, 'DELETE', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OPPORTUNITIES_KEY });
    },
  });
};

export const useMoveOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation<Opportunity, any, { id: string; stage: OpportunityStage }>(
    {
      mutationFn: async (variables) => {
        const { data } = await apiClient.patch(`/crm/opportunities/${variables.id}`, { stage: variables.stage });
        return data;
      },
      onMutate: async (newOpportunity) => {
        await queryClient.cancelQueries({ queryKey: OPPORTUNITIES_KEY });
        const previous = queryClient.getQueryData<Opportunity[]>(OPPORTUNITIES_KEY);
        
        if (previous) {
          queryClient.setQueryData<Opportunity[]>(OPPORTUNITIES_KEY, previous.map(opp => 
            opp.id === newOpportunity.id ? { ...opp, stage: newOpportunity.stage } : opp
          ));
        }
        return { previous };
      },
      onError: (err, newOpportunity, context: any) => {
        if (context?.previous) {
          queryClient.setQueryData(OPPORTUNITIES_KEY, context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: OPPORTUNITIES_KEY });
      },
    }
  );
};
