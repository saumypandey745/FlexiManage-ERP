/* eslint-disable */
import { create } from 'zustand';

interface FilterState {
  activeFilters: Record<string, any>;
  setFilter: (key: string, value: unknown) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: {},
  setFilter: (key, value) => set((state) => ({
    activeFilters: { ...state.activeFilters, [key]: value }
  })),
  clearFilter: (key) => set((state) => {
    const { [key]: _, ...rest } = state.activeFilters;
    return { activeFilters: rest };
  }),
  clearAllFilters: () => set({ activeFilters: {} }),
}));
