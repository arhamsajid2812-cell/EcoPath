"use client";

import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";

const ECO_FACTS = [
  "Turning off the tap while brushing your teeth can save up to 15 liters of water a minute.",
  "Recycling one aluminum can saves enough energy to run a TV for three hours.",
  "If every household replaced one regular bulb with an LED, it would prevent greenhouse gases equivalent to 800,000 cars.",
  "Eating one less meat-based meal a week has a massive impact on your carbon footprint.",
  "A leaky faucet that drips at the rate of one drip per second can waste more than 11,000 liters per year.",
  "Producing one cotton t-shirt requires approximately 2,700 liters of water."
];

export function SustainabilityFactsWidget() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % ECO_FACTS.length);
    }, 10000); // Change fact every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Lightbulb size={80} />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center text-yellow-600">
          <Lightbulb size={16} />
        </div>
        <h3 className="text-sm font-bold text-yellow-700 dark:text-yellow-500">Eco Fact</h3>
      </div>
      
      <p className="text-sm font-medium text-foreground min-h-[60px] animate-in fade-in duration-500 relative z-10" key={factIndex}>
        "{ECO_FACTS[factIndex]}"
      </p>
      
      <div className="flex gap-1 mt-4">
        {ECO_FACTS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === factIndex ? 'w-4 bg-yellow-500' : 'w-1.5 bg-yellow-500/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
