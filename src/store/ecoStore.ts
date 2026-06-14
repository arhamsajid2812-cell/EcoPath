import { create } from 'zustand';
import { DEMO_DATA } from './demoData';

interface EcoState {
  isDemoMode: boolean;
  profile: typeof DEMO_DATA.profile | null;
  simulatorBaseline: typeof DEMO_DATA.simulatorBaseline | null;
  trendData: typeof DEMO_DATA.trendData;
  categoryData: typeof DEMO_DATA.categoryData;
  aiInsights: typeof DEMO_DATA.aiInsights | null;
  activeChallenges: typeof DEMO_DATA.activeChallenges;
  receiptHistory: typeof DEMO_DATA.receiptHistory;
  
  activateDemoMode: () => void;
  clearState: () => void;
}

export const useEcoStore = create<EcoState>((set) => ({
  isDemoMode: false,
  profile: null,
  simulatorBaseline: null,
  trendData: [],
  categoryData: [],
  aiInsights: null,
  activeChallenges: [],
  receiptHistory: [],

  activateDemoMode: () => set({
    isDemoMode: true,
    ...DEMO_DATA
  }),

  clearState: () => set({
    isDemoMode: false,
    profile: null,
    simulatorBaseline: null,
    trendData: [],
    categoryData: [],
    aiInsights: null,
    activeChallenges: [],
    receiptHistory: [],
  })
}));
