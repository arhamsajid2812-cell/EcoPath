"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ImpactComparisonProps {
  currentEmission: number;
  futureEmission: number;
  currentScore: number;
  futureScore: number;
}

export function ImpactComparison({ currentEmission, futureEmission, currentScore, futureScore }: ImpactComparisonProps) {
  const reduction = currentEmission - futureEmission;
  const isReduced = reduction > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <motion.div 
        key={`current-${currentEmission}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Current Lifestyle</h3>
        <div className="text-3xl font-bold text-foreground mb-1">{Math.round(currentEmission).toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kg CO₂/yr</span></div>
        <p className="text-sm text-muted-foreground mt-4">Sustainability Score: <span className="font-bold text-foreground">{currentScore}</span></p>
      </motion.div>

      <div className="flex justify-center hidden md:flex">
        <ArrowRight size={32} className="text-muted-foreground/50" />
      </div>

      <motion.div 
        key={`future-${futureEmission}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`border-2 rounded-2xl p-6 shadow-sm text-center ${isReduced ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Future Trajectory</h3>
        <div className={`text-3xl font-bold mb-1 ${isReduced ? 'text-primary' : 'text-foreground'}`}>
          {Math.round(futureEmission).toLocaleString()} <span className="text-lg font-normal text-foreground/60">kg CO₂/yr</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Sustainability Score: <span className="font-bold text-foreground">{futureScore}</span></p>
      </motion.div>
    </div>
  );
}
