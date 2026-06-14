"use client";

import { motion } from "framer-motion";
import { VisionAnalysisResult } from "@/services/vision/types";

interface ReceiptAnalysisCardProps {
  result: VisionAnalysisResult | null;
}

export function ReceiptAnalysisCard({ result }: ReceiptAnalysisCardProps) {
  if (!result) return null;

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-emerald-500';
    if (grade.includes('B')) return 'text-primary';
    if (grade.includes('C')) return 'text-yellow-500';
    if (grade.includes('D')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getGradeDescription = (grade: string) => {
    if (grade.includes('A')) return 'Excellent';
    if (grade.includes('B')) return 'Good';
    if (grade.includes('C')) return 'Needs Improvement';
    if (grade.includes('D')) return 'High Carbon Basket';
    return 'Unknown';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Estimated Footprint</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">{result.carbonScore.toFixed(2)}</span>
          <span className="text-lg text-muted-foreground font-normal">kg CO₂e</span>
        </div>
      </div>

      <div className="h-16 w-px bg-border hidden md:block"></div>

      <div className="text-center md:text-right">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Carbon Basket Score</h3>
        <div className="flex items-center md:justify-end gap-3">
          <span className="text-lg font-medium text-muted-foreground">{getGradeDescription(result.sustainabilityGrade)}</span>
          <span className={`text-4xl font-bold ${getGradeColor(result.sustainabilityGrade)}`}>
            {result.sustainabilityGrade}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
