"use client";

import { useState, useEffect } from 'react';
import { Accessibility } from 'lucide-react';
import { AccessibilityDrawer } from './AccessibilityDrawer';

export function AccessibilityFab() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-a11y-drawer', handleToggle);
    return () => window.removeEventListener('toggle-a11y-drawer', handleToggle);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary"
        aria-label="Open Accessibility Options (Alt + A)"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      <AccessibilityDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
