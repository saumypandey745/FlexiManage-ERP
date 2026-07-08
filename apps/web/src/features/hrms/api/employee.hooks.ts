import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Employee {
  id: string;
  [key: string]: unknown;
}

export function useEmployees(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['hrms', 'employees', params],
    queryFn: async () => {
      const res = await apiClient.get<Employee[]>('/employees', { params });
      return res.data;
    },
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: ['hrms', 'employee', id],
    queryFn: async () => {
      const res = await apiClient.get<Employee>(`/employees/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Employee>('/employees', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'employees'] });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Employee>(`/employees/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'employees'] });
      queryClient.invalidateQueries({ queryKey: ['hrms', 'employee', variables.id] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hrms', 'employees'] });
    },
  });
}
