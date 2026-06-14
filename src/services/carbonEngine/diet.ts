import { DietInput, EmissionResult } from './types';
import { DIET_FACTORS, MONTHS_IN_YEAR, DAYS_IN_YEAR } from './constants';

/**
 * Calculates diet carbon emissions based on diet type.
 */
export function calculateDiet(input: DietInput): EmissionResult {
  const annualEmission = DIET_FACTORS[input.dietType];
  const monthlyEmission = annualEmission / MONTHS_IN_YEAR;
  const dailyEmission = annualEmission / DAYS_IN_YEAR;

  return {
    dailyEmission,
    monthlyEmission,
    annualEmission,
  };
}
