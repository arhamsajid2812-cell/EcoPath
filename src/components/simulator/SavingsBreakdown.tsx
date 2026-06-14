"use client";

import { motion } from "framer-motion";

interface SavingsBreakdownProps {
  savings: {
    transportation: number;
    electricity: number;
    diet: number;
    shopping: number;
    water: number;
  };
  totalSaved: number;
}

export function SavingsBreakdown({ savings, totalSaved }: SavingsBreakdownProps) {
  const categories = [
    { name: "Transportation", value: savings.transportation, color: "bg-primary" },
    { name: "Electricity", value: savings.electricity, color: "bg-yellow-500" },
    { name: "Diet", value: savings.diet, color: "bg-secondary" },
    { name: "Shopping", value: savings.shopping, color: "bg-blue-500" },
    { name: "Water", value: savings.water, color: "bg-cyan-500" },
  ].filter(c => c.value > 0).sort((a, b) => b.value - a.value);

  if (totalSaved <= 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Where You're Saving</h3>
      <div className="space-y-4">
        {categories.map((cat, index) => {
          const percent = Math.round((cat.value / totalSaved) * 100);
          return (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{cat.name}</span>
                <span className="text-muted-foreground">{Math.round(cat.value)} kg ({percent}%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full ${cat.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
