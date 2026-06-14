import { GoogleGenAI } from '@google/genai';
import { VisionAnalysisResult } from './types';
import { VisionAnalysisResultSchema } from './schema';

// Initialize SDK (must only be called server-side)
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const VISION_PROMPT = `
You are an expert environmental sustainability analyst.
Analyze the provided receipt/invoice image.

1. Extract all purchased items, quantities, and prices.
2. Estimate the carbon footprint (kg CO2) for each item.
3. Classify the impact level of each item (VERY_HIGH, HIGH, MEDIUM, LOW, VERY_LOW). Examples: Beef -> VERY_HIGH, Chicken -> MEDIUM, Local Produce -> VERY_LOW.
4. Calculate the total "Carbon Basket Score" (total kg CO2 for the receipt).
5. Assign a Sustainability Grade (A+, A, B, C, D) based on the overall impact of the basket. A+ is excellent/low impact, D is very high impact.
6. Identify the highest impact items.
7. Generate "Greener Alternatives" for the high-impact items. Ensure you include the difficulty of the swap and the cost impact.
8. Provide general recommendations and the total estimated savings if the user adopts your alternatives.

You MUST return ONLY a valid JSON object matching the following structure exactly. Do not include any markdown formatting like \`\`\`json.
{
  "receiptItems": [
    {
      "name": "String",
      "quantity": Number,
      "price": Number,
      "category": "String",
      "impactLevel": "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | "VERY_LOW",
      "estimatedCO2Kg": Number
    }
  ],
  "carbonScore": Number,
  "sustainabilityGrade": "A+" | "A" | "B" | "C" | "D",
  "highestImpactItems": ["ItemName1", "ItemName2"],
  "greenerAlternatives": [
    {
      "originalItem": "String",
      "alternativeItem": "String",
      "impactReductionEstimate": Number,
      "difficulty": "EASY" | "MEDIUM" | "HARD",
      "costImpact": "CHEAPER" | "SIMILAR" | "MORE_EXPENSIVE"
    }
  ],
  "recommendations": ["Rec1", "Rec2"],
  "estimatedSavings": Number
}
`;

export async function parseReceiptImage(base64Image: string, mimeType: string): Promise<VisionAnalysisResult> {
  try {
    const ai = getAiClient();
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: "user",
          parts: [
            { text: VISION_PROMPT },
            { inlineData: { data: base64Data, mimeType } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini Vision API");
    }

    const cleanJson = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);
    
    // Zod validation provides absolute type safety
    return VisionAnalysisResultSchema.parse(parsedData);
    
  } catch (error) {
    console.error("Gemini Vision Parsing Error:", error);
    
    // Return safe fallback instead of crashing the UI
    return {
      receiptItems: [{
        name: "Unknown Item (Analysis Failed)",
        quantity: 1,
        price: 0,
        category: "UNKNOWN",
        impactLevel: "MEDIUM",
        estimatedCO2Kg: 5.0
      }],
      carbonScore: 5.0,
      sustainabilityGrade: "C",
      highestImpactItems: ["Unknown Item"],
      greenerAlternatives: [],
      recommendations: ["We encountered an error analyzing your receipt. Please try uploading a clearer image."],
      estimatedSavings: 0
    };
  }
}
