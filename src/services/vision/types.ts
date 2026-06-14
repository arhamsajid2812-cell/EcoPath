export type ImpactLevel = 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW';
export type SustainabilityGrade = 'A+' | 'A' | 'B' | 'C' | 'D';

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  category: string;
  impactLevel: ImpactLevel;
  estimatedCO2Kg: number;
}

export interface GreenerAlternative {
  originalItem: string;
  alternativeItem: string;
  impactReductionEstimate: number; // kg CO2
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  costImpact: 'CHEAPER' | 'SIMILAR' | 'MORE_EXPENSIVE';
}

export interface VisionAnalysisResult {
  receiptItems: ReceiptItem[];
  carbonScore: number; // Total estimated footprint in kg CO2
  sustainabilityGrade: SustainabilityGrade;
  highestImpactItems: string[];
  greenerAlternatives: GreenerAlternative[];
  recommendations: string[];
  estimatedSavings: number; // Potential savings if alternatives are adopted
}

export interface VisionApiRequest {
  image: string; // Base64 encoded image
  mimeType: string;
}

export interface VisionApiResponse {
  success: boolean;
  data?: VisionAnalysisResult;
  error?: string;
}
