import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Notification {
  id: string;
  [key: string]: unknown;
}

export function useNotifications(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['notifications', 'notifications', params],
    queryFn: async () => {
      const res = await apiClient.get<Notification[]>('/inbox', { params });
      return res.data;
    },
  });
}

export function useNotification(id: string) {
  return useQuery({
    queryKey: ['notifications', 'notification', id],
    queryFn: async () => {
      const res = await apiClient.get<Notification>(`/inbox/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Notification>('/inbox', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'notifications'] });
    },
  });
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Notification>(`/inbox/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'notification', variables.id] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/inbox/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'notifications'] });
    },
  });
}
