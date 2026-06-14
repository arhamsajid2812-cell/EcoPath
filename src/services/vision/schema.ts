import { z } from "zod";

export const ReceiptItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  category: z.string(),
  impactLevel: z.enum(['VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW']),
  estimatedCO2Kg: z.number(),
});

export const GreenerAlternativeSchema = z.object({
  originalItem: z.string(),
  alternativeItem: z.string(),
  impactReductionEstimate: z.number(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  costImpact: z.enum(['CHEAPER', 'SIMILAR', 'MORE_EXPENSIVE']),
});

export const VisionAnalysisResultSchema = z.object({
  receiptItems: z.array(ReceiptItemSchema),
  carbonScore: z.number(),
  sustainabilityGrade: z.enum(['A+', 'A', 'B', 'C', 'D']),
  highestImpactItems: z.array(z.string()),
  greenerAlternatives: z.array(GreenerAlternativeSchema),
  recommendations: z.array(z.string()),
  estimatedSavings: z.number(),
});
