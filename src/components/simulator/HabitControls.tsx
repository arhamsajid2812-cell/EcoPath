"use client";

import { DietType } from "@/services/carbonEngine/types";

export interface SimulatorState {
  transportDistance: number;
  carPercent: number;
  publicPercent: number;
  bikePercent: number;
  walkPercent: number;
  electricityKwh: number;
  diet: DietType;
  shoppingSpend: number;
  waterLitres: number;
}

interface HabitControlsProps {
  state: SimulatorState;
  onChange: (newState: SimulatorState) => void;
}

export function HabitControls({ state, onChange }: HabitControlsProps) {
  const handleChange = (key: keyof SimulatorState, value: any) => {
    onChange({ ...state, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Transportation</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="carPercent" className="flex justify-between text-sm font-medium mb-1">
              <span>Car Usage</span>
              <span className="text-muted-foreground">{state.carPercent}%</span>
            </label>
            <input 
              id="carPercent"
              type="range" 
              min="0" max="100" 
              value={state.carPercent} 
              onChange={(e) => handleChange('carPercent', Number(e.target.value))} 
              className="w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
              aria-label="Car Usage Percentage"
              aria-valuenow={state.carPercent}
              aria-valuetext={`${state.carPercent} percent`}
            />
          </div>
          <div>
            <label htmlFor="publicPercent" className="flex justify-between text-sm font-medium mb-1">
              <span>Public Transit</span>
              <span className="text-muted-foreground">{state.publicPercent}%</span>
            </label>
            <input 
              id="publicPercent"
              type="range" 
              min="0" max="100" 
              value={state.publicPercent} 
              onChange={(e) => handleChange('publicPercent', Number(e.target.value))} 
              className="w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
              aria-label="Public Transit Percentage"
              aria-valuenow={state.publicPercent}
              aria-valuetext={`${state.publicPercent} percent`}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Electricity</h3>
        <div>
          <label htmlFor="electricityKwh" className="flex justify-between text-sm font-medium mb-1">
            <span>Monthly Usage (kWh)</span>
            <span className="text-muted-foreground">{state.electricityKwh}</span>
          </label>
          <input 
            id="electricityKwh"
            type="range" 
            min="50" max="1000" 
            value={state.electricityKwh} 
            onChange={(e) => handleChange('electricityKwh', Number(e.target.value))} 
            className="w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
            aria-label="Monthly Electricity Usage in Kilowatt hours"
            aria-valuenow={state.electricityKwh}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Diet</h3>
        <select 
          id="dietType"
          className="w-full bg-background border border-input rounded-md p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          value={state.diet}
          onChange={(e) => handleChange('diet', e.target.value as DietType)}
          aria-label="Diet Type Selection"
        >
          <option value="MEAT_HEAVY">Meat-Heavy</option>
          <option value="MIXED">Mixed</option>
          <option value="VEGETARIAN">Vegetarian</option>
          <option value="VEGAN">Vegan</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Consumption</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="shoppingSpend" className="flex justify-between text-sm font-medium mb-1">
              <span>Monthly Shopping ($)</span>
              <span className="text-muted-foreground">${state.shoppingSpend}</span>
            </label>
            <input 
              id="shoppingSpend"
              type="range" 
              min="0" max="2000" 
              value={state.shoppingSpend} 
              onChange={(e) => handleChange('shoppingSpend', Number(e.target.value))} 
              className="w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
              aria-label="Monthly Shopping Spend in Dollars"
              aria-valuenow={state.shoppingSpend}
            />
          </div>
          <div>
            <label htmlFor="waterLitres" className="flex justify-between text-sm font-medium mb-1">
              <span>Daily Water (Litres)</span>
              <span className="text-muted-foreground">{state.waterLitres} L</span>
            </label>
            <input 
              id="waterLitres"
              type="range" 
              min="50" max="500" 
              value={state.waterLitres} 
              onChange={(e) => handleChange('waterLitres', Number(e.target.value))} 
              className="w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
              aria-label="Daily Water Usage in Litres"
              aria-valuenow={state.waterLitres}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
