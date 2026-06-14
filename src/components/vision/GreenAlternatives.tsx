"use client";

import { motion } from "framer-motion";
import { GreenerAlternative } from "@/services/vision/types";
import { ArrowRight, Leaf, TrendingDown, CircleDollarSign } from "lucide-react";

interface GreenAlternativesProps {
  alternatives: GreenerAlternative[];
}

export function GreenAlternatives({ alternatives }: GreenAlternativesProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Leaf className="text-primary w-5 h-5" /> 
        Suggested Greener Swaps
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alternatives.map((alt, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="bg-card border border-primary/20 rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-xs text-destructive font-medium mb-1 line-through opacity-70">{alt.originalItem}</p>
                <p className="text-base font-bold text-foreground">{alt.alternativeItem}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <ArrowRight size={20} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 mt-2">
              <div className="text-center">
                <div className="flex justify-center mb-1 text-primary"><TrendingDown size={14} /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Saved</p>
                <p className="text-sm font-bold">{alt.impactReductionEstimate}kg</p>
              </div>
              <div className="text-center border-l border-r border-border">
                <div className="flex justify-center mb-1 text-muted-foreground"><Leaf size={14} /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Effort</p>
                <p className="text-sm font-bold">{alt.difficulty}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-1 text-muted-foreground"><CircleDollarSign size={14} /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Cost</p>
                <p className="text-sm font-bold text-[10px]">{alt.costImpact.replace('_', ' ')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
