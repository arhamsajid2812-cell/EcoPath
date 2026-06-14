import { describe, it, expect, vi } from 'vitest';
import { simulateCarbonFuture } from '../services/ai/simulator';

// Mock the external API if it uses the fetch/server action
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: '{"currentAnnualEmission": 1000, "projectedAnnualEmission": 500, "reductionAmount": 500, "reductionPercentage": 50, "futureNarrative": "Great job!"}',
        }),
      },
    })),
  };
});

describe('Simulator AI Insights', () => {
  it('generates a narrative for a successful simulation', async () => {
    const currentInput = {
      transportation: { vehicleType: 'CAR' as const, distanceKm: 40 },
      electricity: { monthlyKwh: 400 },
      diet: { dietType: 'MEAT_HEAVY' as const },
      shopping: { monthlySpending: 800, category: 'MISCELLANEOUS' as const },
      water: { dailyLitres: 200 },
    };

    const futureInput = {
      transportation: { vehicleType: 'BUS' as const, distanceKm: 40 },
      electricity: { monthlyKwh: 200 },
      diet: { dietType: 'VEGETARIAN' as const },
      shopping: { monthlySpending: 400, category: 'MISCELLANEOUS' as const },
      water: { dailyLitres: 100 },
    };

    const response = await simulateCarbonFuture(1000, { 
      currentLifestyle: JSON.stringify(currentInput), 
      futureLifestyleChanges: JSON.stringify(futureInput) 
    });
    
    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data.futureNarrative).toBe("Great job!");
    }
  });
});
