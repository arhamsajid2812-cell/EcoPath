"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Lightbulb } from "lucide-react";

interface SustainabilityInsightsProps {
  highestImpactItems: string[];
  recommendations: string[];
  estimatedSavings: number;
}

export function SustainabilityInsights({ highestImpactItems, recommendations, estimatedSavings }: SustainabilityInsightsProps) {
  return (
    <div className="bg-gradient-to-br from-card to-muted border border-border/80 rounded-2xl shadow-sm overflow-hidden backdrop-blur-xl">
      <div className="p-6 border-b border-border/50 bg-background/30 flex items-center gap-2">
        <Lightbulb className="text-yellow-500 w-5 h-5" />
        <h3 className="text-lg font-semibold">Shopping Insights</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {highestImpactItems.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
            <div className="mt-1 bg-destructive/10 p-2 rounded-lg text-destructive shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">Highest Impact Items</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {highestImpactItems.join(', ')} drove the majority of this receipt's carbon footprint.
              </p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4">
          <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary shrink-0">
            <TrendingDown size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-1">Potential Savings</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Implementing our suggested swaps could save an estimated <span className="font-bold text-foreground">{estimatedSavings.toFixed(1)}kg CO₂</span> on your next trip.
            </p>
          </div>
        </motion.div>

        {recommendations.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-bold text-foreground mb-3">AI Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
