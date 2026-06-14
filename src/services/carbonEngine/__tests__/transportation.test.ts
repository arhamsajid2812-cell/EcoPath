import { calculateTransportation } from '../transportation';
import { TRANSPORT_FACTORS, DAYS_IN_MONTH, DAYS_IN_YEAR } from '../constants';

describe('Transportation Calculator', () => {
  it('should calculate emissions for a car correctly', () => {
    const input = { vehicleType: 'CAR' as const, distanceKm: 10 };
    const result = calculateTransportation(input);

    const expectedDaily = 10 * TRANSPORT_FACTORS['CAR'];
    expect(result.dailyEmission).toBeCloseTo(expectedDaily);
    expect(result.monthlyEmission).toBeCloseTo(expectedDaily * DAYS_IN_MONTH);
    expect(result.annualEmission).toBeCloseTo(expectedDaily * DAYS_IN_YEAR);
  });

  it('should calculate zero emissions for biking', () => {
    const input = { vehicleType: 'BIKE' as const, distanceKm: 20 };
    const result = calculateTransportation(input);

    expect(result.dailyEmission).toBe(0);
    expect(result.monthlyEmission).toBe(0);
    expect(result.annualEmission).toBe(0);
  });
});
