/**
 * Purpose: Centralized TypeScript type definitions.
 * Responsibility: Ensure type consistency across the frontend for core domain models (User, CarbonRecord, Challenge).
 * Future Integrations: Replace or extend these with types automatically generated from the Supabase schema using the Supabase CLI.
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export type ActivityCategory = 'TRANSPORT' | 'ENERGY' | 'DIET' | 'SHOPPING' | 'WATER';

export interface CarbonRecord {
  id: string;
  userId: string;
  category: ActivityCategory;
  activityType: string;
  value: number;
  unit: string;
  carbonEmitted: number; // in kg CO2
  logDate: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  points: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface Assessment {
  id: string;
  userId: string;
  transportScore: number;
  energyScore: number;
  dietScore: number;
  totalScore: number;
  assessmentDate: string;
}
