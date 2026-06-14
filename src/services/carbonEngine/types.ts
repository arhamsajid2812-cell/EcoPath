export type VehicleType = 'CAR' | 'BUS' | 'TRAIN' | 'BIKE' | 'WALKING';
export type DietType = 'VEGAN' | 'VEGETARIAN' | 'MIXED' | 'MEAT_HEAVY';
export type ShoppingCategory = 'CLOTHING' | 'ELECTRONICS' | 'HOUSEHOLD' | 'MISCELLANEOUS';
export type ImpactLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface TransportationInput {
  vehicleType: VehicleType;
  distanceKm: number; // daily
}

export interface ElectricityInput {
  monthlyKwh: number;
}

export interface DietInput {
  dietType: DietType;
}

export interface ShoppingInput {
  monthlySpending: number;
  category: ShoppingCategory;
}

export interface WaterInput {
  dailyLitres: number;
}

export interface EmissionResult {
  dailyEmission?: number; 
  monthlyEmission: number;
  annualEmission: number;
}

export interface CalculatorInput {
  transportation: TransportationInput;
  electricity: ElectricityInput;
  diet: DietInput;
  shopping: ShoppingInput;
  water: WaterInput;
}

export interface CalculatorResult {
  totalEmission: number; // Annual kg CO2
  categoryBreakdown: {
    transportation: number;
    electricity: number;
    diet: number;
    shopping: number;
    water: number;
  };
  sustainabilityScore: number; // 0-100
  impactLevel: ImpactLevel;
}
