import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface StockMovement {
  id: string;
  [key: string]: unknown;
}

export function useStockMovements(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['inventory', 'stockmovements', params],
    queryFn: async () => {
      const res = await apiClient.get<StockMovement[]>('/stock-movements', { params });
      return res.data;
    },
  });
}

export function useStockMovement(id: string) {
  return useQuery({
    queryKey: ['inventory', 'stockmovement', id],
    queryFn: async () => {
      const res = await apiClient.get<StockMovement>(`/stock-movements/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateStockMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiClient.post<StockMovement>('/stock-movements', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stockmovements'] });
    },
  });
}

export function useUpdateStockMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const res = await apiClient.patch<StockMovement>(`/stock-movements/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stockmovements'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stockmovement', variables.id] });
    },
  });
}

export function useDeleteStockMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/stock-movements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stockmovements'] });
    },
  });
}
