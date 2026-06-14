import { describe, it, expect } from 'vitest';
import { calculateTotalImpact } from '../services/carbonEngine/calculator';

describe('Carbon Engine Calculator', () => {
  it('calculates baseline scenario correctly', () => {
    const input = {
      transportation: { vehicleType: 'CAR' as const, distanceKm: 40 },
      electricity: { monthlyKwh: 300 },
      diet: { dietType: 'MIXED' as const },
      shopping: { monthlySpending: 500, category: 'MISCELLANEOUS' as const },
      water: { dailyLitres: 150 },
    };

    const result = calculateTotalImpact(input);

    expect(result.totalEmission).toBeGreaterThan(0);
    expect(result.categoryBreakdown.transportation).toBeCloseTo(40 * 0.192 * 365, 0);
    expect(result.categoryBreakdown.electricity).toBeCloseTo(300 * 0.4 * 12, 0);
    expect(result.sustainabilityScore).toBeLessThan(100);
  });

  it('calculates zero emission for bike', () => {
    const input = {
      transportation: { vehicleType: 'BIKE' as const, distanceKm: 40 },
      electricity: { monthlyKwh: 0 },
      diet: { dietType: 'VEGAN' as const },
      shopping: { monthlySpending: 0, category: 'MISCELLANEOUS' as const },
      water: { dailyLitres: 0 },
    };

    const result = calculateTotalImpact(input);
    expect(result.categoryBreakdown.transportation).toBe(0);
  });
});
