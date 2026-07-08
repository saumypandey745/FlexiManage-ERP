import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Leave {
  id: string;
  [key: string]: unknown;
}

export function useLeaves(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['hrms', 'leaves', params],
    queryFn: async () => {
      const res = await apiClient.get<Leave[]>('/leaves', { params });
      return res.data;
    },
  });
}

export function useLeave(id: string) {
  return useQuery({
    queryKey: ['hrms', 'leave', id],
    queryFn: async () => {
      const res = await apiClient.get<Leave>(`/leaves/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Leave>('/leaves', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'leaves'] });
    },
  });
}

export function useUpdateLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Leave>(`/leaves/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'leaves'] });
      queryClient.invalidateQueries({ queryKey: ['hrms', 'leave', variables.id] });
    },
  });
}

export function useDeleteLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/leaves/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'leaves'] });
    },
  });
}
