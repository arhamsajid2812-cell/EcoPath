"use client";

import { useEffect, useState } from 'react';

export function SkipLinks() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute top-0 left-0 w-full z-[9999] flex flex-col pointer-events-none">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary pointer-events-auto"
      >
        Skip to Main Content
      </a>
      <a 
        href="#main-nav" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary pointer-events-auto mt-14"
      >
        Skip to Navigation
      </a>
      <a 
        href="/dashboard" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary pointer-events-auto mt-28"
      >
        Skip to Dashboard
      </a>
    </div>
  );
}
