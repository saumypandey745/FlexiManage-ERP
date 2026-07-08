import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Announcement {
  id: string;
  [key: string]: unknown;
}

export function useAnnouncements(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['notifications', 'announcements', params],
    queryFn: async () => {
      const res = await apiClient.get<Announcement[]>('/announcements', { params });
      return res.data;
    },
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ['notifications', 'announcement', id],
    queryFn: async () => {
      const res = await apiClient.get<Announcement>(`/announcements/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Announcement>('/announcements', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'announcements'] });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Announcement>(`/announcements/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'announcements'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'announcement', variables.id] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/announcements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'announcements'] });
    },
  });
}
