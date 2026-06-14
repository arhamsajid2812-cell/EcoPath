import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type A11yTheme = 'default' | 'high-contrast' | 'dark' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type A11yFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type A11yFontFamily = 'default' | 'dyslexic' | 'hyperlegible';

interface A11yState {
  theme: A11yTheme;
  fontSize: A11yFontSize;
  fontFamily: A11yFontFamily;
  reducedMotion: boolean;
  readingMode: boolean;
  ttsEnabled: boolean;
  speechRate: number;
  speechPitch: number;
  speechVolume: number;
  selectedVoiceURI: string | null;

  setTheme: (theme: A11yTheme) => void;
  setFontSize: (size: A11yFontSize) => void;
  setFontFamily: (font: A11yFontFamily) => void;
  setReducedMotion: (enabled: boolean) => void;
  setReadingMode: (enabled: boolean) => void;
  setTtsEnabled: (enabled: boolean) => void;
  setSelectedVoiceURI: (uri: string | null) => void;
  setSpeechRate: (rate: number) => void;
  setSpeechPitch: (pitch: number) => void;
  setSpeechVolume: (volume: number) => void;
  resetAll: () => void;
}

/**
 * Global store for accessibility settings, persisted to localStorage.
 * Manages themes, fonts, motion, reading mode, and Text-to-Speech (TTS) preferences.
 */
export const useA11yStore = create<A11yState>()(
  persist(
    (set) => ({
      theme: 'default',
      fontSize: 'md',
      fontFamily: 'default',
      reducedMotion: false,
      readingMode: false,
      ttsEnabled: false,
      speechRate: 1,
      speechPitch: 1,
      speechVolume: 1,
      selectedVoiceURI: null,

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setReadingMode: (readingMode) => set({ readingMode }),
      setTtsEnabled: (ttsEnabled) => set({ ttsEnabled }),
      setSelectedVoiceURI: (selectedVoiceURI) => set({ selectedVoiceURI }),
      setSpeechRate: (speechRate) => set({ speechRate }),
      setSpeechPitch: (speechPitch) => set({ speechPitch }),
      setSpeechVolume: (speechVolume) => set({ speechVolume }),
      resetAll: () => set({
        theme: 'default',
        fontSize: 'md',
        fontFamily: 'default',
        reducedMotion: false,
        readingMode: false,
        ttsEnabled: false,
        speechRate: 1,
        speechPitch: 1,
        speechVolume: 1,
        selectedVoiceURI: null,
      }),
    }),
    {
      name: 'ecopath-a11y-storage',
    }
  )
);
