import { CalculatorInput, CalculatorResult, ImpactLevel } from './types';
import { calculateTransportation } from './transportation';
import { calculateElectricity } from './electricity';
import { calculateDiet } from './diet';
import { calculateShopping } from './shopping';
import { calculateWater } from './water';

/**
 * Determines the impact level based on total annual emissions (in kg CO2).
 */
export function determineImpactLevel(totalAnnualEmission: number): ImpactLevel {
  // Thresholds can be adjusted. E.g., < 4000kg is Low, > 10000kg is High.
  if (totalAnnualEmission < 4000) return 'LOW';
  if (totalAnnualEmission < 10000) return 'MODERATE';
  return 'HIGH';
}

/**
 * Calculates a sustainability score from 0 to 100.
 * 100 is perfectly sustainable (0 emissions), 0 is extremely high emissions (> 20000kg).
 */
export function calculateSustainabilityScore(totalAnnualEmission: number): number {
  const MAX_EMISSION_CAP = 20000;
  let score = 100 - (totalAnnualEmission / MAX_EMISSION_CAP) * 100;
  
  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));
  return Math.round(score);
}

/**
 * Master calculator that combines all categories to generate total footprint and score.
 */
export function calculateTotalImpact(input: CalculatorInput): CalculatorResult {
  const transport = calculateTransportation(input.transportation);
  const electricity = calculateElectricity(input.electricity);
  const diet = calculateDiet(input.diet);
  const shopping = calculateShopping(input.shopping);
  const water = calculateWater(input.water);

  const categoryBreakdown = {
    transportation: transport.annualEmission,
    electricity: electricity.annualEmission,
    diet: diet.annualEmission,
    shopping: shopping.annualEmission,
    water: water.annualEmission,
  };

  const totalEmission = Object.values(categoryBreakdown).reduce((sum, val) => sum + val, 0);

  return {
    totalEmission,
    categoryBreakdown,
    sustainabilityScore: calculateSustainabilityScore(totalEmission),
    impactLevel: determineImpactLevel(totalEmission),
  };
}
