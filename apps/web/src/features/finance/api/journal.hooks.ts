import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Journal {
  id: string;
  [key: string]: unknown;
}

export function useJournals(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['finance', 'journals', params],
    queryFn: async () => {
      const res = await apiClient.get<Journal[]>('/journals', { params });
      return res.data;
    },
  });
}

export function useJournal(id: string) {
  return useQuery({
    queryKey: ['finance', 'journal', id],
    queryFn: async () => {
      const res = await apiClient.get<Journal>(`/journals/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Journal>('/journals', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'journals'] });
    },
  });
}

export function useUpdateJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Journal>(`/journals/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'journals'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'journal', variables.id] });
    },
  });
}

export function useDeleteJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/journals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'journals'] });
    },
  });
}
