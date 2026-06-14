import { 
  calculateTotalImpact, 
  calculateSustainabilityScore, 
  determineImpactLevel 
} from '../calculator';
import { CalculatorInput } from '../types';

describe('Master Calculator', () => {
  it('should determine correct impact levels', () => {
    expect(determineImpactLevel(3000)).toBe('LOW');
    expect(determineImpactLevel(6000)).toBe('MODERATE');
    expect(determineImpactLevel(12000)).toBe('HIGH');
  });

  it('should calculate a correct sustainability score bounded 0-100', () => {
    expect(calculateSustainabilityScore(0)).toBe(100);
    expect(calculateSustainabilityScore(10000)).toBe(50);
    expect(calculateSustainabilityScore(25000)).toBe(0); // Clamped at 0
  });

  it('should combine all categories to calculate total emission', () => {
    const mockInput: CalculatorInput = {
      transportation: { vehicleType: 'CAR', distanceKm: 0 }, // 0
      electricity: { monthlyKwh: 0 }, // 0
      diet: { dietType: 'VEGAN' }, // 1055
      shopping: { monthlySpending: 0, category: 'CLOTHING' }, // 0
      water: { dailyLitres: 0 }, // 0
    };

    const result = calculateTotalImpact(mockInput);
    
    expect(result.totalEmission).toBe(1055);
    expect(result.categoryBreakdown.diet).toBe(1055);
    expect(result.impactLevel).toBe('LOW');
  });
});
