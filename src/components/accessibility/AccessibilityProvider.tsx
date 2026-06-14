"use client";

import { useEffect, useState } from 'react';
import { useA11yStore } from '@/store/a11yStore';
import { useTTS } from '@/hooks/useTTS';
import { SelectionTTS } from './SelectionTTS';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, fontSize, fontFamily, readingMode, reducedMotion, setTheme } = useA11yStore();
  const { play } = useTTS();

  useEffect(() => {
    setMounted(true);
  }, []);

  // System Preferences Detection
  useEffect(() => {
    if (!mounted) return;
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      // If user hasn't strictly overridden it, respect system
      if (!useA11yStore.getState().reducedMotion) {
         useA11yStore.getState().setReducedMotion(e.matches);
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkChange = (e: MediaQueryListEvent) => {
       if (useA11yStore.getState().theme === 'default') {
         // Auto switch to dark if default theme is active
         // Not strictly enforcing to avoid overriding user's specific a11y theme
       }
    };
    darkQuery.addEventListener('change', handleDarkChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      darkQuery.removeEventListener('change', handleDarkChange);
    };
  }, [mounted]);

  // Apply CSS Classes to HTML element
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    
    // Apply Font Size via data attribute for robust CSS custom property scaling
    html.dataset.fontSize = fontSize;

    // Apply Theme
    // Remove old themes first to prevent conflicts
    html.classList.remove('dark', 'high-contrast', 'protanopia', 'deuteranopia', 'tritanopia');
    if (theme === 'dark') html.classList.add('dark');
    else if (theme !== 'default') html.classList.add(theme);

    // Apply Font Family
    html.classList.remove('font-dyslexic', 'font-hyperlegible');
    if (fontFamily !== 'default') html.classList.add(`font-${fontFamily}`);

    // Apply Reading Mode
    html.classList.toggle('reading-mode', readingMode);

    // Apply Reduced Motion
    html.classList.toggle('reduced-motion', reducedMotion);

  }, [mounted, theme, fontSize, fontFamily, readingMode, reducedMotion]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + D: Toggle Dark Mode
      if (e.altKey && e.key.toLowerCase() === 'd') {
        const currentTheme = useA11yStore.getState().theme;
        setTheme(currentTheme === 'dark' ? 'default' : 'dark');
      }
      
      // Alt + T: Read page / section
      if (e.altKey && e.key.toLowerCase() === 't') {
         // For a global read, we grab text from <main>
         const main = document.querySelector('main');
         if (main) {
           play(main.innerText);
         }
      }

      // Alt + A: Open Accessibility Drawer (handled in the Drawer component via Zustand)
      if (e.altKey && e.key.toLowerCase() === 'a') {
         // We can dispatch an event or set a state.
         window.dispatchEvent(new CustomEvent('toggle-a11y-drawer'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, setTheme, play]);

// Prevent flash of unstyled content
  if (!mounted) return <>{children}</>;

  return (
    <>
      <SelectionTTS />
      {children}
    </>
  );
}
