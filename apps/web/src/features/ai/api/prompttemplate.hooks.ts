import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface PromptTemplate {
  id: string;
  [key: string]: unknown;
}

export function usePromptTemplates(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['ai', 'prompttemplates', params],
    queryFn: async () => {
      const res = await apiClient.get<PromptTemplate[]>('/templates', { params });
      return res.data;
    },
  });
}

export function usePromptTemplate(id: string) {
  return useQuery({
    queryKey: ['ai', 'prompttemplate', id],
    queryFn: async () => {
      const res = await apiClient.get<PromptTemplate>(`/templates/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreatePromptTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<PromptTemplate>('/templates', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'prompttemplates'] });
    },
  });
}

export function useUpdatePromptTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<PromptTemplate>(`/templates/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'prompttemplates'] });
      queryClient.invalidateQueries({ queryKey: ['ai', 'prompttemplate', variables.id] });
    },
  });
}

export function useDeletePromptTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/templates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'prompttemplates'] });
    },
  });
}
