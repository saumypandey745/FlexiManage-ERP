import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Expense {
  id: string;
  [key: string]: unknown;
}

export function useExpenses(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['finance', 'expenses', params],
    queryFn: async () => {
      const res = await apiClient.get<Expense[]>('/expenses', { params });
      return res.data;
    },
  });
}

export function useExpense(id: string) {
  return useQuery({
    queryKey: ['finance', 'expense', id],
    queryFn: async () => {
      const res = await apiClient.get<Expense>(`/expenses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Expense>('/expenses', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'expenses'] });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Expense>(`/expenses/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'expenses'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'expense', variables.id] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'expenses'] });
    },
  });
}
