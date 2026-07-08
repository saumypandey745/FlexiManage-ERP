import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Payment {
  id: string;
  [key: string]: unknown;
}

export function usePayments(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['finance', 'payments', params],
    queryFn: async () => {
      const res = await apiClient.get<Payment[]>('/payments', { params });
      return res.data;
    },
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ['finance', 'payment', id],
    queryFn: async () => {
      const res = await apiClient.get<Payment>(`/payments/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Payment>('/payments', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'payments'] });
    },
  });
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Payment>(`/payments/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'payments'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'payment', variables.id] });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/payments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'payments'] });
    },
  });
}
