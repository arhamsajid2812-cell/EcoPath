/**
 * Purpose: Global state management for user context.
 * Responsibility: Store and provide access to the authenticated user's profile, settings, and high-level carbon score across the application.
 * Future Integrations: Hydrate state from Supabase Auth session on app load, implement optimistic UI updates for activity logging.
 */

import { create } from 'zustand';
import { UserProfile } from '../lib/types';

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  // Future: add actions like updateScore, addAchievement, etc.
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
