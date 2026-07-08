import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface ChatHistory {
  id: string;
  [key: string]: unknown;
}

export function useChatHistorys(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['ai', 'chathistorys', params],
    queryFn: async () => {
      const res = await apiClient.get<ChatHistory[]>('/history', { params });
      return res.data;
    },
  });
}

export function useChatHistory(id: string) {
  return useQuery({
    queryKey: ['ai', 'chathistory', id],
    queryFn: async () => {
      const res = await apiClient.get<ChatHistory>(`/history/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateChatHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<ChatHistory>('/history', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'chathistorys'] });
    },
  });
}

export function useUpdateChatHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<ChatHistory>(`/history/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'chathistorys'] });
      queryClient.invalidateQueries({ queryKey: ['ai', 'chathistory', variables.id] });
    },
  });
}

export function useDeleteChatHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'chathistorys'] });
    },
  });
}
