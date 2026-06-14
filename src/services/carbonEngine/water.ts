import { WaterInput, EmissionResult } from './types';
import { WATER_FACTOR, DAYS_IN_YEAR, DAYS_IN_MONTH } from './constants';

/**
 * Calculates water usage carbon emissions based on daily litres.
 */
export function calculateWater(input: WaterInput): EmissionResult {
  const dailyEmission = input.dailyLitres * WATER_FACTOR;
  const monthlyEmission = dailyEmission * DAYS_IN_MONTH;
  const annualEmission = dailyEmission * DAYS_IN_YEAR;

  return {
    dailyEmission,
    monthlyEmission,
    annualEmission,
  };
}
