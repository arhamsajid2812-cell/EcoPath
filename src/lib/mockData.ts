/**
 * Purpose: Provide realistic mock data for UI development before backend integration.
 * Responsibility: Simulate database responses to allow frontend components to be built and styled independently.
 * Future Integrations: Remove or move to a dedicated testing folder once actual Supabase API endpoints are connected.
 */

import { CarbonRecord, UserProfile, Challenge } from './types';

export const mockUser: UserProfile = {
  id: 'user-123',
  name: 'Mia the Student',
  email: 'mia@example.com',
  role: 'USER',
  createdAt: new Date().toISOString(),
};

export const mockCarbonRecords: CarbonRecord[] = [
  {
    id: 'rec-1',
    userId: 'user-123',
    category: 'TRANSPORT',
    activityType: 'Car Commute',
    value: 15,
    unit: 'km',
    carbonEmitted: 2.8,
    logDate: new Date().toISOString(),
  },
  {
    id: 'rec-2',
    userId: 'user-123',
    category: 'DIET',
    activityType: 'Beef Burger',
    value: 1,
    unit: 'meal',
    carbonEmitted: 4.5,
    logDate: new Date().toISOString(),
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: 'chal-1',
    title: 'Meatless Monday',
    description: 'Skip meat for the entire day.',
    durationDays: 1,
    points: 50,
    difficulty: 'EASY',
  },
  {
    id: 'chal-2',
    title: 'Public Transit Pioneer',
    description: 'Use only public transit or bike for a week.',
    durationDays: 7,
    points: 300,
    difficulty: 'MEDIUM',
  }
];
