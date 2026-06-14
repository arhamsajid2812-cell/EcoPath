"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { Volume2, X, Pause, Play, Square } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectionPos {
  x: number;
  y: number;
  text: string;
}

export function SelectionTTS() {
  const { supported, play, pause, resume, stop, isSpeaking, isPaused } = useTTS();
  const [selection, setSelection] = useState<SelectionPos | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle global text selection
  const handleSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      // Small delay before hiding to allow clicking the button
      hideTimeoutRef.current = setTimeout(() => setSelection(null), 150);
      return;
    }

    const text = sel.toString().trim();
    if (!text || text.length === 0) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position the floating button slightly above and to the right of the selection
    setSelection({
      x: rect.right,
      y: rect.top - 40,
      text
    });
  }, []);

  useEffect(() => {
    if (!supported) return;

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('selectionchange', handleSelection);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [handleSelection, supported]);

  // Handle global keyboard shortcut (Alt + R)
  useEffect(() => {
    if (!supported) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        
        const selText = window.getSelection()?.toString().trim();
        if (selText) {
          play(selText);
          setSelection(null);
        } else {
          // If no text is selected, try to read the main content
          const mainContent = document.querySelector('main')?.innerText;
          if (mainContent) {
            play(mainContent);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [play, supported]);

  if (!supported) return null;

  return (
    <>
      <div className="sr-only" aria-live="polite">
        {isSpeaking ? "Reading selected text." : ""}
      </div>

      <AnimatePresence>
        {selection && !isSpeaking && !isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: Math.min(selection.x, window.innerWidth - 150) + 'px',
              top: Math.max(selection.y, 10) + 'px',
              zIndex: 9999
            }}
            className="flex items-center gap-1 bg-primary text-primary-foreground shadow-xl rounded-full px-3 py-1.5 cursor-pointer hover:bg-primary/90 transition-colors"
            onMouseDown={(e) => {
              // Prevent losing selection when clicking the button
              e.preventDefault(); 
              play(selection.text);
              setSelection(null);
            }}
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-medium">Read Aloud</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global TTS Player Controls when speaking */}
      <AnimatePresence>
        {(isSpeaking || isPaused) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-[9999] bg-card border border-border shadow-2xl rounded-full px-4 py-2 flex items-center gap-4"
          >
            <div className="flex items-center gap-2 pr-4 border-r border-border">
              <Volume2 className={`w-4 h-4 text-primary ${isSpeaking ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                {isSpeaking ? 'Reading...' : 'Paused'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isPaused ? (
                <button onClick={resume} className="p-2 hover:bg-muted rounded-full text-foreground" aria-label="Resume speech">
                  <Play className="w-4 h-4" fill="currentColor" />
                </button>
              ) : (
                <button onClick={pause} className="p-2 hover:bg-muted rounded-full text-foreground" aria-label="Pause speech">
                  <Pause className="w-4 h-4" fill="currentColor" />
                </button>
              )}
              <button onClick={stop} className="p-2 hover:bg-destructive/20 text-destructive rounded-full" aria-label="Stop speech">
                <Square className="w-4 h-4" fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
