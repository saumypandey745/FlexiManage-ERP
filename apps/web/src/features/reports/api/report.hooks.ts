import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Report {
  id: string;
  [key: string]: unknown;
}

export function useReports(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['reports', 'reports', params],
    queryFn: async () => {
      const res = await apiClient.get<Report[]>('/saved', { params });
      return res.data;
    },
  });
}

export function useReport(id: string) {
  return useQuery({
    queryKey: ['reports', 'report', id],
    queryFn: async () => {
      const res = await apiClient.get<Report>(`/saved/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Report>('/saved', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'reports'] });
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Report>(`/saved/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'reports'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'report', variables.id] });
    },
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/saved/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'reports'] });
    },
  });
}
