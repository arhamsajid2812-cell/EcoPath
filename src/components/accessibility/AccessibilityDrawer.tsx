"use client";

import { useA11yStore, A11yTheme, A11yFontSize, A11yFontFamily } from '@/store/a11yStore';
import { useTTS } from '@/hooks/useTTS';
import { X, Type, Palette, Eye, Activity, Volume2, BookOpen, Pause, Play, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function AccessibilityDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { supported, errorMsg, play, pause, resume, stop, voices } = useTTS();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleReadSelected = () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      setToastMsg(null);
      play(selectedText);
    } else {
      setToastMsg("Please select text to read aloud.");
      setTimeout(() => setToastMsg(null), 3000);
    }
  };
  const { 
    theme, setTheme, 
    fontSize, setFontSize, 
    fontFamily, setFontFamily, 
    reducedMotion, setReducedMotion, 
    readingMode, setReadingMode, 
    ttsEnabled, setTtsEnabled,
    selectedVoiceURI, setSelectedVoiceURI,
    speechRate, setSpeechRate,
    speechPitch, setSpeechPitch,
    speechVolume, setSpeechVolume,
    resetAll
  } = useA11yStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus the drawer for screen readers
      drawerRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[999] transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility Options Drawer"
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-card shadow-2xl z-[1000] overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-border flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
            Accessibility
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close Accessibility Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* FONT SETTINGS */}
          <section aria-labelledby="a11y-font-heading">
            <h3 id="a11y-font-heading" className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-4">
              <Type className="w-4 h-4" aria-hidden="true" /> Text & Fonts
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2" id="a11y-size-label">Font Size</label>
                <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="a11y-size-label">
                  {(['sm', 'md', 'lg', 'xl'] as A11yFontSize[]).map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      aria-pressed={fontSize === size}
                      className={`p-2 border rounded-md text-sm ${fontSize === size ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted border-border'}`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2" id="a11y-family-label">Font Family</label>
                <div className="flex flex-col gap-2" role="group" aria-labelledby="a11y-family-label">
                  <button 
                    onClick={() => setFontFamily('default')} 
                    aria-pressed={fontFamily === 'default'}
                    className={`p-2 text-left border rounded-md ${fontFamily === 'default' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                  >
                    System Default
                  </button>
                  <button 
                    onClick={() => setFontFamily('hyperlegible')} 
                    aria-pressed={fontFamily === 'hyperlegible'}
                    className={`p-2 text-left border rounded-md font-hyperlegible ${fontFamily === 'hyperlegible' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                  >
                    Atkinson Hyperlegible
                  </button>
                  <button 
                    onClick={() => setFontFamily('dyslexic')} 
                    aria-pressed={fontFamily === 'dyslexic'}
                    className={`p-2 text-left border rounded-md font-dyslexic ${fontFamily === 'dyslexic' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                  >
                    OpenDyslexic
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* THEME & CONTRAST */}
          <section aria-labelledby="a11y-theme-heading">
            <h3 id="a11y-theme-heading" className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4" aria-hidden="true" /> Colors & Contrast
            </h3>
            <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="a11y-theme-heading">
              {(['default', 'high-contrast', 'dark', 'protanopia', 'deuteranopia', 'tritanopia'] as A11yTheme[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={`p-2 border rounded-md text-sm capitalize text-left ${theme === t ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}
                >
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>
          </section>

          {/* READING & ASSISTIVE */}
          <section aria-labelledby="a11y-assistive-heading">
            <h3 id="a11y-assistive-heading" className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4" aria-hidden="true" /> Assistive Tools
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium">Reduced Motion</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={reducedMotion} 
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                  aria-label="Toggle Reduced Motion"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium">Reading Mode</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={readingMode} 
                  onChange={(e) => setReadingMode(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                  aria-label="Toggle Reading Mode (increases line spacing and bounds text width)"
                />
              </label>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium">Text-to-Speech (TTS)</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={ttsEnabled} 
                    onChange={(e) => setTtsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                    aria-label="Enable native Text-to-Speech"
                  />
                </label>

                {/* UI Feedback for TTS */}
                {(!supported || errorMsg) && (
                  <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-md font-medium">
                    {!supported ? "Text-to-Speech is not supported in this browser." : errorMsg}
                  </div>
                )}

                {/* Local Toast Message */}
                {toastMsg && (
                  <div className="p-2 bg-primary/10 text-primary border border-primary/20 text-xs rounded-md font-medium text-center animate-in fade-in duration-300">
                    {toastMsg}
                  </div>
                )}

                {/* Speech Controls */}
                {supported && ttsEnabled && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    {voices.length > 0 ? (
                      <div className="mb-3 space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block" htmlFor="tts-voice-select">
                            Select Voice
                          </label>
                          <select
                            id="tts-voice-select"
                            value={selectedVoiceURI || ''}
                            onChange={(e) => setSelectedVoiceURI(e.target.value || null)}
                            className="w-full p-2 text-sm bg-background border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label="Select Voice"
                          >
                            <option value="">Auto-detect (Recommended)</option>
                            {voices.map(v => (
                              <option key={v.voiceURI} value={v.voiceURI}>
                                {v.name} ({v.lang}){v.default ? ' - Default' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground flex justify-between" htmlFor="tts-rate-slider">
                            <span>Speech Rate</span>
                            <span>{speechRate.toFixed(1)}x</span>
                          </label>
                          <input 
                            id="tts-rate-slider"
                            type="range" 
                            min="0.5" max="2.0" step="0.1" 
                            value={speechRate} 
                            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                            aria-label="Speech Rate"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground flex justify-between" htmlFor="tts-pitch-slider">
                            <span>Speech Pitch</span>
                            <span>{speechPitch.toFixed(1)}</span>
                          </label>
                          <input 
                            id="tts-pitch-slider"
                            type="range" 
                            min="0" max="2" step="0.1" 
                            value={speechPitch} 
                            onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                            aria-label="Speech Pitch"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground flex justify-between" htmlFor="tts-volume-slider">
                            <span>Speech Volume</span>
                            <span>{Math.round(speechVolume * 100)}%</span>
                          </label>
                          <input 
                            id="tts-volume-slider"
                            type="range" 
                            min="0" max="1" step="0.1" 
                            value={speechVolume} 
                            onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
                            className="w-full accent-primary"
                            aria-label="Speech Volume"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-muted text-muted-foreground text-xs rounded-md font-medium text-center">
                        No speech voices available on this device.
                      </div>
                    )}
                    <button
                      onClick={() => play("Hello! Welcome to EcoPath accessibility mode.")}
                      className="w-full py-2 px-3 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-4 h-4" />
                      Test Speech
                    </button>

                    <button
                      onClick={handleReadSelected}
                      className="w-full py-2 px-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Selected Text
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={pause}
                        className="py-2 px-3 bg-background border border-border text-foreground text-xs font-medium rounded-md hover:bg-muted transition-colors flex flex-col items-center justify-center gap-1"
                        aria-label="Pause Speech"
                      >
                        <Pause className="w-4 h-4" />
                        Pause
                      </button>
                      <button
                        onClick={resume}
                        className="py-2 px-3 bg-background border border-border text-foreground text-xs font-medium rounded-md hover:bg-muted transition-colors flex flex-col items-center justify-center gap-1"
                        aria-label="Resume Speech"
                      >
                        <Play className="w-4 h-4" />
                        Resume
                      </button>
                      <button
                        onClick={stop}
                        className="py-2 px-3 bg-destructive/10 text-destructive border border-destructive/20 text-xs font-medium rounded-md hover:bg-destructive/20 transition-colors flex flex-col items-center justify-center gap-1"
                        aria-label="Stop Speech"
                      >
                        <Square className="w-4 h-4" />
                        Stop
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <button 
            onClick={resetAll}
            className="w-full py-2 px-4 bg-background border border-border rounded-md text-sm font-medium hover:bg-muted hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
          >
            Reset All Preferences
          </button>
        </div>
      </div>
    </>
  );
}
