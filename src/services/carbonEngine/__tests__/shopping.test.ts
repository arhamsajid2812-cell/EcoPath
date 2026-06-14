import { calculateShopping } from '../shopping';
import { SHOPPING_FACTORS, MONTHS_IN_YEAR } from '../constants';

describe('Shopping Calculator', () => {
  it('should calculate emissions for clothing', () => {
    const input = { monthlySpending: 100, category: 'CLOTHING' as const };
    const result = calculateShopping(input);

    const expectedMonthly = 100 * SHOPPING_FACTORS['CLOTHING'];
    expect(result.monthlyEmission).toBeCloseTo(expectedMonthly);
    expect(result.annualEmission).toBeCloseTo(expectedMonthly * MONTHS_IN_YEAR);
  });
});
