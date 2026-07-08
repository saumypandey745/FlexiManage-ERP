import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Task {
  id: string;
  [key: string]: unknown;
}

export function useTasks(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['projects', 'tasks', params],
    queryFn: async () => {
      const res = await apiClient.get<Task[]>('/tasks', { params });
      return res.data;
    },
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ['projects', 'task', id],
    queryFn: async () => {
      const res = await apiClient.get<Task>(`/tasks/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Task>('/tasks', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Task>(`/tasks/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'task', variables.id] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'tasks'] });
    },
  });
}
