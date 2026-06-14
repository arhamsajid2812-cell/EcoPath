/**
 * Purpose: TypeScript definitions for the AI Sustainability Coach.
 * Responsibility: Ensure strict typing for AI inputs, parsed JSON outputs, and standard API responses.
 * Future Integrations: Expand types as Gemini multimodal capabilities (e.g. image parsing for receipts) are added.
 */

export interface AIAnalysisResult {
  summary: string;
  strongestArea: string;
  weakestArea: string;
  topRecommendations: string[];
  estimatedSavings: number;
}

export interface Recommendation {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  carbonSavingEstimate: number;
  timeToImplement: string;
}

export interface Challenge {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  expectedImpact: string;
  duration: number; // in days
}

export interface SimulationInput {
  currentLifestyle: string;
  futureLifestyleChanges: string;
}

export interface SimulationResult {
  currentAnnualEmission: number;
  projectedAnnualEmission: number;
  reductionAmount: number;
  reductionPercentage: number;
  futureNarrative: string;
}

export interface DashboardInsights {
  biggestEmissionSource: string;
  mostImprovedCategory: string;
  quickWinOpportunity: string;
  longTermRecommendation: string;
}

export interface AIError {
  success: false;
  message: string;
}

export interface AISuccess<T> {
  success: true;
  data: T;
}

export type AIResponse<T> = AISuccess<T> | AIError;
