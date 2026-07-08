import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Milestone {
  id: string;
  [key: string]: unknown;
}

export function useMilestones(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['projects', 'milestones', params],
    queryFn: async () => {
      const res = await apiClient.get<Milestone[]>('/milestones', { params });
      return res.data;
    },
  });
}

export function useMilestone(id: string) {
  return useQuery({
    queryKey: ['projects', 'milestone', id],
    queryFn: async () => {
      const res = await apiClient.get<Milestone>(`/milestones/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Milestone>('/milestones', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'milestones'] });
    },
  });
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Milestone>(`/milestones/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'milestones'] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'milestone', variables.id] });
    },
  });
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/milestones/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'milestones'] });
    },
  });
}
