"use client";

import { motion } from "framer-motion";

interface ActiveChallengesProps {
  title: string;
  progress: number;
  expectedImpact: string;
}

export function ActiveChallenges({ title, progress, expectedImpact }: ActiveChallengesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-xl p-5 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">Expected impact: {expectedImpact}</p>
        </div>
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-primary h-full"
        />
      </div>
    </motion.div>
  );
}
