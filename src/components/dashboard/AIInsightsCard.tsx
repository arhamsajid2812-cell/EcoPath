"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDownRight, Zap, Target } from "lucide-react";

interface AIInsightsCardProps {
  biggestEmissionSource: string;
  mostImprovedCategory: string;
  quickWinOpportunity: string;
}

import React from "react";

export const AIInsightsCard = React.memo(function AIInsightsCard({ 
  biggestEmissionSource, 
  mostImprovedCategory, 
  quickWinOpportunity 
}: AIInsightsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-card to-muted border border-border/80 rounded-2xl p-6 shadow-sm relative overflow-hidden backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Sparkles size={100} />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-primary w-5 h-5" />
        <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Gemini Insights
        </h3>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
          <div className="p-2 bg-destructive/10 text-destructive rounded-lg mt-1">
            <ArrowDownRight size={16} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Focus Area</p>
            <p className="text-sm font-medium">{biggestEmissionSource}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
          <div className="p-2 bg-primary/10 text-primary rounded-lg mt-1">
            <Target size={16} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Great Job</p>
            <p className="text-sm font-medium">{mostImprovedCategory}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
          <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg mt-1">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Quick Win</p>
            <p className="text-sm font-medium">{quickWinOpportunity}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
