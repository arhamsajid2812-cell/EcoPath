/**
 * Purpose: Generate structured insights and recommendations based on user carbon data.
 * Responsibility: Query Gemini using the prompts from promptBuilder, parse JSON responses safely, and handle API errors.
 * Future Integrations: Add retry logic with exponential backoff for rate limiting. Trigger these generations asynchronously in the background.
 */

import { GoogleGenAI } from '@google/genai';
import { 
  DashboardInsights, 
  Recommendation, 
  AIAnalysisResult, 
  AIResponse 
} from './types';
import { 
  buildInsightsPrompt, 
  buildRecommendationsPrompt, 
  buildAnalysisPrompt, 
  SystemPrompts 
} from './promptBuilder';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Generic helper to call Gemini and strictly parse JSON responses.
 */
async function generateJson<T>(prompt: string): Promise<AIResponse<T>> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt + '\n\n' + SystemPrompts.JSON_OUTPUT,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (!response.text) throw new Error("Empty response from Gemini");
    
    let cleanJson = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson) as T;
    
    return { success: true, data: parsed };
  } catch (error: any) {
    console.error("AI Insight Generator Error:", error);
    return { success: false, message: error.message || "Failed to generate AI insights." };
  }
}

/**
 * Generates quick insights for the main dashboard widgets.
 */
export async function generateDashboardInsights(stats: any): Promise<AIResponse<DashboardInsights>> {
  const prompt = buildInsightsPrompt(stats);
  return generateJson<DashboardInsights>(prompt);
}

/**
 * Generates dynamic, category-specific recommendations.
 */
export async function generateRecommendations(category: string): Promise<AIResponse<Recommendation[]>> {
  const prompt = buildRecommendationsPrompt(category);
  return generateJson<Recommendation[]>(prompt);
}

/**
 * Generates a comprehensive personalized carbon analysis report.
 */
export async function analyzeFootprint(stats: any, profile: any): Promise<AIResponse<AIAnalysisResult>> {
  const prompt = buildAnalysisPrompt(stats, profile);
  return generateJson<AIAnalysisResult>(prompt);
}
