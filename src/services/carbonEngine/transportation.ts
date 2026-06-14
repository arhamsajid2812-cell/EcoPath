import { TransportationInput, EmissionResult } from './types';
import { TRANSPORT_FACTORS, DAYS_IN_YEAR, DAYS_IN_MONTH } from './constants';

/**
 * Calculates transportation carbon emissions based on daily distance and vehicle type.
 */
export function calculateTransportation(input: TransportationInput): EmissionResult {
  const { vehicleType, distanceKm } = input;
  const factor = TRANSPORT_FACTORS[vehicleType];
  
  const dailyEmission = distanceKm * factor;
  const monthlyEmission = dailyEmission * DAYS_IN_MONTH;
  const annualEmission = dailyEmission * DAYS_IN_YEAR;

  return {
    dailyEmission,
    monthlyEmission,
    annualEmission,
  };
}
