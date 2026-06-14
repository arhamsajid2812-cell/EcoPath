/**
 * Purpose: Generate dynamic, personalized weekly eco-challenges.
 * Responsibility: Query Gemini with the user's weakest area and parse the resulting JSON challenge object.
 * Future Integrations: Automatically insert generated challenges into the Supabase 'Challenges' database.
 */

import { GoogleGenAI } from '@google/genai';
import { Challenge, AIResponse } from './types';
import { buildChallengePrompt, SystemPrompts } from './promptBuilder';

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateWeeklyChallenge(weakestArea: string): Promise<AIResponse<Challenge>> {
  try {
    const ai = getAiClient();
    const prompt = buildChallengePrompt(weakestArea);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt + '\n\n' + SystemPrompts.JSON_OUTPUT,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (!response.text) throw new Error("Empty response from Gemini");
    
    // Attempt to parse JSON. Use fallback handling if the AI injected markdown.
    let cleanJson = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson) as Challenge;
    
    return { success: true, data: parsed };
  } catch (error: any) {
    console.error("Challenge Generator Error:", error);
    return { success: false, message: error.message || "Failed to generate challenge." };
  }
}
