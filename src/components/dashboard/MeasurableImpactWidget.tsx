"use client";

import { Droplets, Car, TreePine, TrendingDown } from "lucide-react";
import { useEcoStore } from "@/store/ecoStore";

export function MeasurableImpactWidget() {
  const profile = useEcoStore((state) => state.profile);

  if (!profile) return null;

  // Derive metrics (mock math for hackathon impact visibility)
  const co2Saved = profile.totalSavedKg;
  const treesEquivalent = Math.floor(co2Saved / 21); // ~21kg CO2 per tree per year
  const carKmEquivalent = Math.floor(co2Saved * 4); // ~4km per 1kg CO2
  const waterSavedLiters = Math.floor(co2Saved * 15); // Rough water footprint correlation
  
  const weeklyStreak = profile.sustainabilityScore > 80 ? 3 : 1;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center text-primary">
          <TrendingDown size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Your Real-World Impact</h2>
          <p className="text-xs text-muted-foreground">Tangible sustainability metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <TreePine className="text-green-500 mb-2" size={24} />
          <span className="text-2xl font-bold">{treesEquivalent}</span>
          <span className="text-xs text-muted-foreground">Trees Saved (Eq)</span>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Car className="text-blue-500 mb-2" size={24} />
          <span className="text-2xl font-bold">{carKmEquivalent} km</span>
          <span className="text-xs text-muted-foreground">Car Travel Avoided</span>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Droplets className="text-cyan-500 mb-2" size={24} />
          <span className="text-2xl font-bold">{waterSavedLiters} L</span>
          <span className="text-xs text-muted-foreground">Water Saved (Est)</span>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-orange-500 mb-2 font-bold text-xl">🔥 {weeklyStreak}</div>
          <span className="text-2xl font-bold">{co2Saved} kg</span>
          <span className="text-xs text-muted-foreground">Total CO₂ Reduced</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground italic">
          "Reducing 1 kg CO₂ is similar to avoiding a 4 km car trip."
        </p>
      </div>
    </div>
  );
}
