import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Attendance {
  id: string;
  [key: string]: unknown;
}

export function useAttendances(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['hrms', 'attendances', params],
    queryFn: async () => {
      const res = await apiClient.get<Attendance[]>('/attendance', { params });
      return res.data;
    },
  });
}

export function useAttendance(id: string) {
  return useQuery({
    queryKey: ['hrms', 'attendance', id],
    queryFn: async () => {
      const res = await apiClient.get<Attendance>(`/attendance/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Attendance>('/attendance', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'attendances'] });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Attendance>(`/attendance/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'attendances'] });
      queryClient.invalidateQueries({ queryKey: ['hrms', 'attendance', variables.id] });
    },
  });
}

export function useDeleteAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/attendance/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'attendances'] });
    },
  });
}
