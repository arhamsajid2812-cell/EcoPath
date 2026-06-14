import { ShoppingInput, EmissionResult } from './types';
import { SHOPPING_FACTORS, MONTHS_IN_YEAR } from './constants';

/**
 * Calculates shopping carbon emissions based on monthly spending and category.
 */
export function calculateShopping(input: ShoppingInput): EmissionResult {
  const factor = SHOPPING_FACTORS[input.category];
  const monthlyEmission = input.monthlySpending * factor;
  const annualEmission = monthlyEmission * MONTHS_IN_YEAR;

  return {
    monthlyEmission,
    annualEmission,
  };
}
