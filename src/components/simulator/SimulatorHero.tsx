"use client";

import { motion } from "framer-motion";

export function SimulatorHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/20 via-background to-secondary/10 border border-border/50 rounded-3xl p-8 mb-8 text-center shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground relative z-10">
        Carbon Time Travel <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Simulator</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
        Experiment with lifestyle changes and discover how your choices affect the future. Small adjustments today can lead to massive environmental impact tomorrow.
      </p>
    </motion.div>
  );
}
