import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Analytics {
  id: string;
  [key: string]: unknown;
}

export function useAnalyticss(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['reports', 'analyticss', params],
    queryFn: async () => {
      const res = await apiClient.get<Analytics[]>('/analytics', { params });
      return res.data;
    },
  });
}

export function useAnalytics(id: string) {
  return useQuery({
    queryKey: ['reports', 'analytics', id],
    queryFn: async () => {
      const res = await apiClient.get<Analytics>(`/analytics/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateAnalytics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Analytics>('/analytics', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'analyticss'] });
    },
  });
}

export function useUpdateAnalytics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Analytics>(`/analytics/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'analyticss'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'analytics', variables.id] });
    },
  });
}

export function useDeleteAnalytics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/analytics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'analyticss'] });
    },
  });
}
