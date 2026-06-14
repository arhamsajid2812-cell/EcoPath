import { VehicleType, DietType, ShoppingCategory } from './types';

// Transportation factors in kg CO2/km
export const TRANSPORT_FACTORS: Record<VehicleType, number> = {
  CAR: 0.192,
  BUS: 0.089,
  TRAIN: 0.041,
  BIKE: 0,
  WALKING: 0,
};

// Electricity factor in kg CO2/kWh
export const ELECTRICITY_FACTOR = 0.4;

// Diet factors in annual kg CO2
export const DIET_FACTORS: Record<DietType, number> = {
  VEGAN: 1055,
  VEGETARIAN: 1390,
  MIXED: 2050,
  MEAT_HEAVY: 2630,
};

// Shopping factors in kg CO2 per unit of local currency ($)
export const SHOPPING_FACTORS: Record<ShoppingCategory, number> = {
  CLOTHING: 0.5,
  ELECTRONICS: 0.8,
  HOUSEHOLD: 0.3,
  MISCELLANEOUS: 0.4,
};

// Water factor in kg CO2/Litre
export const WATER_FACTOR = 0.001;

// Time Constants
export const DAYS_IN_YEAR = 365;
export const MONTHS_IN_YEAR = 12;
export const DAYS_IN_MONTH = 30.41; // Average days in a month
