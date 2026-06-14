import { calculateElectricity } from '../electricity';
import { ELECTRICITY_FACTOR, MONTHS_IN_YEAR } from '../constants';

describe('Electricity Calculator', () => {
  it('should calculate monthly and annual electricity emissions', () => {
    const input = { monthlyKwh: 150 };
    const result = calculateElectricity(input);

    const expectedMonthly = 150 * ELECTRICITY_FACTOR;
    expect(result.monthlyEmission).toBeCloseTo(expectedMonthly);
    expect(result.annualEmission).toBeCloseTo(expectedMonthly * MONTHS_IN_YEAR);
  });
});
