"use client";

import { motion } from "framer-motion";
import { TreePine, Smartphone, Car, Lightbulb, Award } from "lucide-react";

interface SimulatorResultsProps {
  totalSavedKg: number;
  reductionPercentage: number;
}

import React from "react";

export const SimulatorResults = React.memo(function SimulatorResults({ totalSavedKg, reductionPercentage }: SimulatorResultsProps) {
  if (totalSavedKg <= 0) return null;

  // Environmental Equivalents (Approximations)
  const treesPlanted = Math.round(totalSavedKg / 21); // ~21kg CO2 per tree per year
  const phonesCharged = Math.round(totalSavedKg * 121); // ~121 phone charges per 1kg CO2
  const kmNotDriven = Math.round(totalSavedKg / 0.192); // ~0.192kg CO2 per km

  const milestones = [10, 25, 50, 75];
  const unlockedMilestone = milestones.slice().reverse().find(m => reductionPercentage >= m);

  return (
    <div className="space-y-6">
      {/* Equivalents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
          <TreePine className="text-primary mb-2 w-8 h-8" />
          <span className="text-2xl font-bold">{treesPlanted}</span>
          <span className="text-xs text-muted-foreground">Trees Planted</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
          <Smartphone className="text-blue-500 mb-2 w-8 h-8" />
          <span className="text-2xl font-bold">{phonesCharged.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Phones Charged</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
          <Car className="text-yellow-500 mb-2 w-8 h-8" />
          <span className="text-2xl font-bold">{kmNotDriven.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Km Not Driven</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
          <Lightbulb className="text-secondary mb-2 w-8 h-8" />
          <span className="text-2xl font-bold">{Math.round(totalSavedKg * 2.5)}</span>
          <span className="text-xs text-muted-foreground">kWh Energy</span>
        </div>
      </div>

      {/* Achievement Banner */}
      {unlockedMilestone && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-500/20 to-primary/20 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-4"
        >
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <Award size={24} />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Milestone Unlocked!</h4>
            <p className="text-sm text-muted-foreground">You&apos;ve reached a {unlockedMilestone}% footprint reduction projection.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
});
