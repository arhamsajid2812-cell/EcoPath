import { calculateWater } from '../water';
import { WATER_FACTOR, DAYS_IN_MONTH, DAYS_IN_YEAR } from '../constants';

describe('Water Calculator', () => {
  it('should calculate emissions based on daily litres', () => {
    const input = { dailyLitres: 100 };
    const result = calculateWater(input);

    const expectedDaily = 100 * WATER_FACTOR;
    expect(result.dailyEmission).toBeCloseTo(expectedDaily);
    expect(result.monthlyEmission).toBeCloseTo(expectedDaily * DAYS_IN_MONTH);
    expect(result.annualEmission).toBeCloseTo(expectedDaily * DAYS_IN_YEAR);
  });
});
