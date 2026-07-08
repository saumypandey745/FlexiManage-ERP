import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  dateFormat: string;
  timeZone: string;
  currency: string;
  language: string;
  updateSettings: (settings: Partial<Omit<SettingsState, 'updateSettings'>>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      dateFormat: 'YYYY-MM-DD',
      timeZone: 'UTC',
      currency: 'USD',
      language: 'en',
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    { name: 'settings-storage' }
  )
);
