import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Warehouse {
  id: string;
  [key: string]: unknown;
}

export function useWarehouses(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['inventory', 'warehouses', params],
    queryFn: async () => {
      const res = await apiClient.get<Warehouse[]>('/warehouses', { params });
      return res.data;
    },
  });
}

export function useWarehouse(id: string) {
  return useQuery({
    queryKey: ['inventory', 'warehouse', id],
    queryFn: async () => {
      const res = await apiClient.get<Warehouse>(`/warehouses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<Warehouse>('/warehouses', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'warehouses'] });
    },
  });
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<Warehouse>(`/warehouses/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'warehouses'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'warehouse', variables.id] });
    },
  });
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/warehouses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'warehouses'] });
    },
  });
}
