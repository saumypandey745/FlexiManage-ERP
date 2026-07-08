import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TenantState {
  activeTenantId: string | null;
  setActiveTenant: (tenantId: string) => void;
  clearTenant: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      activeTenantId: null,
      setActiveTenant: (activeTenantId) => set({ activeTenantId }),
      clearTenant: () => set({ activeTenantId: null }),
    }),
    { name: 'tenant-storage' }
  )
);
