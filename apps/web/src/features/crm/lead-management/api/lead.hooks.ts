import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { Lead, CreateLeadDto, UpdateLeadDto } from '../schemas/lead.schema';

const LEADS_KEY = ['crm', 'leads'];

export const useGetLeads = () => {
  return useApiQuery<Lead[]>(LEADS_KEY, '/crm/leads');
};

export const useGetLead = (id: string) => {
  return useApiQuery<Lead>([...LEADS_KEY, id], `/crm/leads/${id}`, {
    enabled: !!id,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useApiMutation<Lead, CreateLeadDto>('/crm/leads', 'POST', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
    },
  });
};

export const useUpdateLead = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Lead, UpdateLeadDto>(`/crm/leads/${id}`, 'PATCH', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
      queryClient.invalidateQueries({ queryKey: [...LEADS_KEY, id] });
    },
  });
};

export const useDeleteLead = (id: string) => {
  const queryClient = useQueryClient();
  return useApiMutation<Lead, void>(`/crm/leads/${id}`, 'DELETE', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
    },
  });
};
