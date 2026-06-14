"use client";

import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

interface FutureNarrativeCardProps {
  narrative: string | null;
  isLoading: boolean;
}

export function FutureNarrativeCard({ narrative, isLoading }: FutureNarrativeCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-card to-secondary/5 border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={64} />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-secondary w-5 h-5" />
        <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          AI Future Vision
        </h3>
      </div>

      <div className="relative z-10 min-h-[100px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Simulating your future impact...</span>
          </div>
        ) : (
          <p className="text-foreground/80 leading-relaxed italic text-lg">
            "{narrative || "Adjust the controls to see how your choices shape the future."}"
          </p>
        )}
      </div>
    </motion.div>
  );
}
