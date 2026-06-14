import { ElectricityInput, EmissionResult } from './types';
import { ELECTRICITY_FACTOR, MONTHS_IN_YEAR } from './constants';

/**
 * Calculates electricity carbon emissions based on monthly kWh usage.
 */
export function calculateElectricity(input: ElectricityInput): EmissionResult {
  const monthlyEmission = input.monthlyKwh * ELECTRICITY_FACTOR;
  const annualEmission = monthlyEmission * MONTHS_IN_YEAR;

  return {
    monthlyEmission,
    annualEmission,
  };
}
