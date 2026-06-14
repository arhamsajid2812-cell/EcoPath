/**
 * Purpose: "Carbon Time Travel" simulation engine.
 * Responsibility: Pass current lifestyle and proposed changes to Gemini to generate realistic projections and an inspiring narrative.
 * Future Integrations: Cache common simulation results to reduce API costs. Integrate with Recharts to plot the projected vs current curves.
 */

import { GoogleGenAI } from '@google/genai';
import { SimulationResult, SimulationInput, AIResponse } from './types';
import { buildSimulationPrompt, SystemPrompts } from './promptBuilder';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function simulateCarbonFuture(currentEmission: number, input: SimulationInput): Promise<AIResponse<SimulationResult>> {
  try {
    const prompt = buildSimulationPrompt(currentEmission, input.currentLifestyle, input.futureLifestyleChanges);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt + '\n\n' + SystemPrompts.JSON_OUTPUT,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (!response.text) throw new Error("Empty response from Gemini");
    
    let cleanJson = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson) as SimulationResult;
    
    return { success: true, data: parsed };
  } catch (error: any) {
    console.error("Simulator Error:", error);
    return { success: false, message: error.message || "Failed to run simulation." };
  }
}
