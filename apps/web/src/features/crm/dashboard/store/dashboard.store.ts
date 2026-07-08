import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WidgetLayout {
  id: string;
  isVisible: boolean;
  order: number;
}

interface DashboardState {
  widgets: Record<string, WidgetLayout>;
  toggleWidget: (id: string) => void;
  reorderWidgets: (newOrder: string[]) => void;
  resetLayout: () => void;
}

const defaultWidgets = {
  summaryCards: { id: 'summaryCards', isVisible: true, order: 0 },
  revenueTrend: { id: 'revenueTrend', isVisible: true, order: 1 },
  pipelineFunnel: { id: 'pipelineFunnel', isVisible: true, order: 2 },
  stageDistribution: { id: 'stageDistribution', isVisible: true, order: 3 },
  winLossRatio: { id: 'winLossRatio', isVisible: true, order: 4 },
  recentActivity: { id: 'recentActivity', isVisible: true, order: 5 },
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      toggleWidget: (id) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [id]: { ...state.widgets[id], isVisible: !state.widgets[id].isVisible },
          },
        })),
      reorderWidgets: (newOrder) =>
        set((state) => {
          const newWidgets = { ...state.widgets };
          newOrder.forEach((id, index) => {
            if (newWidgets[id]) {
              newWidgets[id].order = index;
            }
          });
          return { widgets: newWidgets };
        }),
      resetLayout: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: 'crm-dashboard-layout',
    }
  )
);
