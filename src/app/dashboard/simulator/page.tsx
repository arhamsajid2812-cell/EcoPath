"use client";

import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SimulatorHero } from "@/components/simulator/SimulatorHero";
import { HabitControls, SimulatorState } from "@/components/simulator/HabitControls";
import { ImpactComparison } from "@/components/simulator/ImpactComparison";
import { FutureNarrativeCard } from "@/components/simulator/FutureNarrativeCard";
import { SavingsBreakdown } from "@/components/simulator/SavingsBreakdown";
import { SimulatorResults } from "@/components/simulator/SimulatorResults";
import dynamic from 'next/dynamic';

const EmissionProjectionChart = dynamic(() => import("@/components/simulator/EmissionProjectionChart").then(mod => mod.EmissionProjectionChart), { ssr: false, loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">Loading Projections...</div> });

import { calculateTotalImpact } from "@/services/carbonEngine/calculator";
import { CalculatorInput, VehicleType } from "@/services/carbonEngine/types";
import { useEcoStore } from "@/store/ecoStore";

function stateToEngineInput(state: SimulatorState): CalculatorInput {
  let primaryVehicle: VehicleType = 'CAR';
  if (state.publicPercent > state.carPercent) primaryVehicle = 'BUS';
  if (state.bikePercent > state.publicPercent && state.bikePercent > state.carPercent) primaryVehicle = 'BIKE';

  return {
    transportation: { vehicleType: primaryVehicle, distanceKm: state.transportDistance },
    electricity: { monthlyKwh: state.electricityKwh },
    diet: { dietType: state.diet },
    shopping: { monthlySpending: state.shoppingSpend, category: 'MISCELLANEOUS' },
    water: { dailyLitres: state.waterLitres },
  };
}

const FALLBACK_INITIAL_STATE: SimulatorState = {
  transportDistance: 40, // 40km daily
  carPercent: 80,
  publicPercent: 20,
  bikePercent: 0,
  walkPercent: 0,
  electricityKwh: 300,
  diet: 'MIXED',
  shoppingSpend: 500,
  waterLitres: 150,
};

export default function SimulatorPage() {
  const simulatorBaseline = useEcoStore(state => state.simulatorBaseline);

  const [currentState, setCurrentState] = useState<SimulatorState>((simulatorBaseline as SimulatorState) || FALLBACK_INITIAL_STATE);
  const [futureState, setFutureState] = useState<SimulatorState>((simulatorBaseline as SimulatorState) || FALLBACK_INITIAL_STATE);

  const [aiNarrative, setAiNarrative] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Compute Results
  const currentResult = useMemo(() => calculateTotalImpact(stateToEngineInput(currentState)), [currentState]);
  const futureResult = useMemo(() => calculateTotalImpact(stateToEngineInput(futureState)), [futureState]);

  const totalSaved = currentResult.totalEmission - futureResult.totalEmission;
  const reductionPercentage = currentResult.totalEmission > 0
    ? (totalSaved / currentResult.totalEmission) * 100
    : 0;

  const savings = {
    transportation: Math.max(0, currentResult.categoryBreakdown.transportation - futureResult.categoryBreakdown.transportation),
    electricity: Math.max(0, currentResult.categoryBreakdown.electricity - futureResult.categoryBreakdown.electricity),
    diet: Math.max(0, currentResult.categoryBreakdown.diet - futureResult.categoryBreakdown.diet),
    shopping: Math.max(0, currentResult.categoryBreakdown.shopping - futureResult.categoryBreakdown.shopping),
    water: Math.max(0, currentResult.categoryBreakdown.water - futureResult.categoryBreakdown.water),
  };

  // Debounced AI call simulation
  useEffect(() => {
    if (totalSaved <= 0) {
      setAiNarrative(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsSimulating(true);
      // Mocking the AI call for client-side UI demo. In production, fetch from /api/simulate
      setTimeout(() => {
        setAiNarrative(`By reducing your carbon footprint by ${Math.round(reductionPercentage)}%, you are making a tangible difference. Shifting away from ${currentState.diet} to ${futureState.diet} and adjusting your commute prevents ${Math.round(totalSaved)}kg of CO2 from entering the atmosphere annually. If your whole community did this, the local air quality would improve significantly.`);
        setIsSimulating(false);
      }, 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [futureState, totalSaved, reductionPercentage, currentState]);

  return (
    <DashboardLayout>
      <SimulatorHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-1">
          <HabitControls state={futureState} onChange={setFutureState} />
        </div>

        {/* Right Column: Visualizations */}
        <div className="lg:col-span-2 space-y-8">
          <ImpactComparison
            currentEmission={currentResult.totalEmission}
            futureEmission={futureResult.totalEmission}
            currentScore={currentResult.sustainabilityScore}
            futureScore={futureResult.sustainabilityScore}
          />

          {totalSaved > 0 && (
            <SimulatorResults
              totalSavedKg={totalSaved}
              reductionPercentage={reductionPercentage}
            />
          )}

          <EmissionProjectionChart
            currentAnnual={currentResult.totalEmission}
            futureAnnual={futureResult.totalEmission}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SavingsBreakdown savings={savings} totalSaved={totalSaved} />
            <FutureNarrativeCard narrative={aiNarrative} isLoading={isSimulating} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
