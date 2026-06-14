"use client";

import { useEffect, useState } from "react";

export function ImpactCounter() {
  const [impactCounter, setImpactCounter] = useState(1450230);

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactCounter(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-5xl md:text-6xl font-black text-foreground tabular-nums tracking-tighter">
      {impactCounter.toLocaleString('en-US')} <span className="text-3xl text-primary font-bold">kg CO₂</span>
    </span>
  );
}
