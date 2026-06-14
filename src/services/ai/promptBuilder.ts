/**
 * Purpose: Centralized repository for all Gemini AI prompts.
 * Responsibility: Construct highly specific prompts demanding structured JSON output from the LLM.
 * Future Integrations: Migrate prompts to a CMS or database for dynamic A/B testing and easier localization.
 */

export const SystemPrompts = {
  ECO_COACH: `You are the EcoPath AI Coach, an intelligent sustainability assistant.
Your personality is friendly, motivational, science-based, practical, and non-judgmental.
Your capabilities:
- Explain carbon footprint concepts clearly
- Analyze user habits based on provided context
- Answer sustainability questions with factual, actionable advice
- Recommend practical actions tailored to the user
- Explain the real-world environmental impact of daily choices

Always respond in a helpful, encouraging tone. Avoid making the user feel guilty. Use clear, concise language.`,

  JSON_OUTPUT: `You MUST return your response ONLY as a valid JSON object matching the requested schema. Do not include markdown code blocks (like \`\`\`json) or any other text outside the JSON.`,
};

export function buildAnalysisPrompt(stats: any, profile: any): string {
  return `Analyze the following user carbon emission data and generate a personalized sustainability report.
Data: ${JSON.stringify(stats)}
Profile: ${JSON.stringify(profile)}

Return a JSON object with this EXACT structure:
{
  "summary": "2-3 sentences summarizing their footprint",
  "strongestArea": "Category they are doing best in",
  "weakestArea": "Category needing most improvement",
  "topRecommendations": ["rec1", "rec2", "rec3"],
  "estimatedSavings": Number (estimated kg CO2 savings if recommendations are followed)
}`;
}

export function buildChallengePrompt(weakestArea: string): string {
  return `Generate a personalized 7-day eco-challenge for a user whose weakest sustainability area is ${weakestArea}. Make it creative and realistic.

Return a JSON object with this EXACT structure:
{
  "title": "Short catchy title (e.g., Bike To Work Week)",
  "description": "Clear explanation of the challenge",
  "difficulty": "EASY" or "MEDIUM" or "HARD",
  "expectedImpact": "Qualitative description of impact",
  "duration": 7
}`;
}

export function buildSimulationPrompt(currentEmission: number, currentLifestyle: string, futureChanges: string): string {
  return `Simulate the future carbon impact if the user makes lifestyle changes.
Current Annual Emission: ${currentEmission} kg CO2
Current Lifestyle Context: ${currentLifestyle}
Proposed Changes: ${futureChanges}

Calculate the reduction realistically based on standard emission factors.
Return a JSON object with this EXACT structure:
{
  "currentAnnualEmission": ${currentEmission},
  "projectedAnnualEmission": Number,
  "reductionAmount": Number,
  "reductionPercentage": Number,
  "futureNarrative": "A compelling 3-4 sentence narrative describing the environmental impact of these changes. e.g., 'If you replace 50% of car trips with cycling...'"
}`;
}

export function buildInsightsPrompt(stats: any): string {
  return `Generate quick dashboard insights based on this carbon footprint data:
Data: ${JSON.stringify(stats)}

Return a JSON object with this EXACT structure:
{
  "biggestEmissionSource": "Name of biggest source and brief context",
  "mostImprovedCategory": "Name of best performing category",
  "quickWinOpportunity": "One easy action to take today",
  "longTermRecommendation": "One major lifestyle change to consider"
}`;
}

export function buildRecommendationsPrompt(category: string): string {
  return `Generate 3 dynamic sustainability recommendations specifically for the category: ${category}.

Return a JSON array of objects, where each object has this EXACT structure:
{
  "title": "String",
  "description": "String",
  "difficulty": "EASY" | "MEDIUM" | "HARD",
  "carbonSavingEstimate": Number (kg CO2),
  "timeToImplement": "String (e.g., '10 minutes', '1 month')"
}`;
}
