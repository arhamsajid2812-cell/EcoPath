import { describe, it, expect, vi } from 'vitest';
import { parseReceiptImage } from '../services/vision/receiptParser';

// Mock the Gemini SDK to return predictable JSON for our Zod schema test
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: JSON.stringify({
            receiptItems: [
              { name: "Apple", quantity: 5, price: 2.99, category: "Produce", impactLevel: "VERY_LOW", estimatedCO2Kg: 0.2 },
              { name: "Beef Steak", quantity: 1, price: 15.99, category: "Meat", impactLevel: "VERY_HIGH", estimatedCO2Kg: 20.5 }
            ],
            carbonScore: 20.7,
            sustainabilityGrade: "C",
            highestImpactItems: ["Beef Steak"],
            greenerAlternatives: [
              { originalItem: "Beef Steak", alternativeItem: "Beyond Burger", impactReductionEstimate: 18.0, difficulty: "EASY", costImpact: "SIMILAR" }
            ],
            recommendations: ["Try meatless Mondays"],
            estimatedSavings: 18.0
          }),
        }),
      },
    })),
  };
});

describe('Vision AI Parser', () => {
  it('parses valid AI JSON and returns typed object', async () => {
    const result = await parseReceiptImage('fake-base64', 'image/jpeg');
    
    expect(result.carbonScore).toBe(20.7);
    expect(result.sustainabilityGrade).toBe('C');
    expect(result.receiptItems.length).toBe(2);
    expect(result.greenerAlternatives[0].alternativeItem).toBe('Beyond Burger');
  });

});
