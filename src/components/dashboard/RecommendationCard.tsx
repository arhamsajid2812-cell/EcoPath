"use client";

import { motion } from "framer-motion";
import { Check, Clock, CloudOff } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  carbonSavingEstimate: number;
  timeToImplement: string;
}

import React from "react";

export const RecommendationCard = React.memo(function RecommendationCard({
  title,
  description,
  difficulty,
  carbonSavingEstimate,
  timeToImplement
}: RecommendationCardProps) {
  
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'EASY': return 'bg-primary/10 text-primary';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-500';
      case 'HARD': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-foreground pr-4 leading-tight">{title}</h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-foreground/70 mb-4">
        <div className="flex items-center gap-1">
          <CloudOff size={14} className="text-primary" />
          <span>-{carbonSavingEstimate}kg CO₂</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{timeToImplement}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-1">
          <Check size={14} /> Accept
        </button>
        <button className="flex-1 bg-muted text-foreground text-xs font-semibold py-2 rounded-lg hover:bg-muted/80 transition-colors">
          Save for Later
        </button>
      </div>
    </motion.div>
  );
});
