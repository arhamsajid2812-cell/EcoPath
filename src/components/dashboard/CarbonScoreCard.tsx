"use client";

import { motion } from "framer-motion";

interface CarbonScoreCardProps {
  annualEmission: number;
  sustainabilityScore: number;
  impactLevel: 'LOW' | 'MODERATE' | 'HIGH';
}

import React from "react";

export const CarbonScoreCard = React.memo(function CarbonScoreCard({ annualEmission, sustainabilityScore, impactLevel }: CarbonScoreCardProps) {
  const getImpactColor = (level: string) => {
    switch(level) {
      case 'LOW': return 'text-primary';
      case 'MODERATE': return 'text-yellow-500';
      case 'HIGH': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  const getGradient = (level: string) => {
    switch(level) {
      case 'LOW': return 'from-primary/20 to-primary/5';
      case 'MODERATE': return 'from-yellow-500/20 to-yellow-500/5';
      case 'HIGH': return 'from-destructive/20 to-destructive/5';
      default: return 'from-primary/20 to-primary/5';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${getGradient(impactLevel)} border border-border/50 rounded-2xl p-6 shadow-sm relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-medium text-foreground/80">Total Annual Emission</h2>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight mt-1 flex items-baseline gap-1"
          >
            {annualEmission.toLocaleString()} <span className="text-xl text-foreground/60 font-normal">kg CO₂e</span>
          </motion.div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/50 dark:bg-black/20 ${getImpactColor(impactLevel)}`}>
          {impactLevel} IMPACT
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/70 mb-1">Sustainability Score</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{sustainabilityScore}</span>
            <span className="text-sm text-foreground/50 mb-1">/ 100</span>
          </div>
        </div>
        
        <div className="w-1/2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${sustainabilityScore}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className={`h-full ${sustainabilityScore > 70 ? 'bg-primary' : sustainabilityScore > 40 ? 'bg-yellow-500' : 'bg-destructive'}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});
