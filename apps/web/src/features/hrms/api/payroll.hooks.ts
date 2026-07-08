import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Payroll {
  id: string;
  [key: string]: unknown;
}

export function usePayrolls(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['hrms', 'payrolls', params],
    queryFn: async () => {
      const res = await apiClient.get<Payroll[]>('/payroll', { params });
      return res.data;
    },
  });
}

export function usePayroll(id: string) {
  return useQuery({
    queryKey: ['hrms', 'payroll', id],
    queryFn: async () => {
      const res = await apiClient.get<Payroll>(`/payroll/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreatePayroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Payroll>('/payroll', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'payrolls'] });
    },
  });
}

export function useUpdatePayroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Payroll>(`/payroll/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['hrms', 'payroll', variables.id] });
    },
  });
}

export function useDeletePayroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/payroll/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'payrolls'] });
    },
  });
}
