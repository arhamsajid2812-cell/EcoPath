"use client";

import { motion } from "framer-motion";
import { TreePine, Sprout, Leaf } from "lucide-react";

interface ImpactTreeProps {
  totalSavedKg: number;
}

import React from "react";

export const ImpactTree = React.memo(function ImpactTree({ totalSavedKg }: ImpactTreeProps) {
  // Determine Stage
  let stageName = "Seed";
  let progress = 0;
  let nextGoal = 50;
  let Icon = Sprout;

  if (totalSavedKg >= 5000) {
    stageName = "Forest Guardian";
    progress = 100;
    nextGoal = totalSavedKg;
    Icon = TreePine;
  } else if (totalSavedKg >= 1000) {
    stageName = "Mature Tree";
    progress = ((totalSavedKg - 1000) / 4000) * 100;
    nextGoal = 5000;
    Icon = TreePine;
  } else if (totalSavedKg >= 250) {
    stageName = "Young Tree";
    progress = ((totalSavedKg - 250) / 750) * 100;
    nextGoal = 1000;
    Icon = TreePine;
  } else if (totalSavedKg >= 50) {
    stageName = "Sapling";
    progress = ((totalSavedKg - 50) / 200) * 100;
    nextGoal = 250;
    Icon = Leaf;
  } else {
    stageName = "Seed";
    progress = (totalSavedKg / 50) * 100;
    nextGoal = 50;
    Icon = Sprout;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <TreePine size={150} />
      </div>

      <h3 className="text-lg font-semibold w-full text-left mb-6 z-10">Your Impact Tree</h3>

      <div className="relative w-32 h-32 mb-4 z-10">
        {/* Simple Animated Tree Representation */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20"
        >
          <Icon size={48} className="text-primary" />
        </motion.div>
        
        {/* Circular Progress (CSS Hack) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="64" cy="64" r="60" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="transparent" 
            className="text-muted"
          />
          <motion.circle 
            cx="64" cy="64" r="60" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="transparent" 
            strokeDasharray={377}
            initial={{ strokeDashoffset: 377 }}
            animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-primary"
          />
        </svg>
      </div>

      <h4 className="text-xl font-bold text-primary mb-1 z-10">{stageName}</h4>
      <p className="text-sm text-muted-foreground z-10">
        {totalSavedKg.toLocaleString()} kg CO₂ saved
      </p>
      
      {stageName !== "Forest Guardian" && (
        <p className="text-xs text-muted-foreground mt-4 bg-muted px-3 py-1 rounded-full z-10">
          {Math.round(nextGoal - totalSavedKg)} kg to next stage
        </p>
      )}
    </motion.div>
  );
});
