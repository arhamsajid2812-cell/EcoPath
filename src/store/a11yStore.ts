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
  ttsSpeed: number;
  ttsVolume: number;
  ttsVoice: string | null;

  setTheme: (theme: A11yTheme) => void;
  setFontSize: (size: A11yFontSize) => void;
  setFontFamily: (font: A11yFontFamily) => void;
  setReducedMotion: (enabled: boolean) => void;
  setReadingMode: (enabled: boolean) => void;
  setTtsEnabled: (enabled: boolean) => void;
  setTtsSettings: (speed: number, volume: number, voice: string | null) => void;
  resetAll: () => void;
}

export const useA11yStore = create<A11yState>()(
  persist(
    (set) => ({
      theme: 'default',
      fontSize: 'md',
      fontFamily: 'default',
      reducedMotion: false,
      readingMode: false,
      ttsEnabled: false,
      ttsSpeed: 1,
      ttsVolume: 1,
      ttsVoice: null,

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setReadingMode: (readingMode) => set({ readingMode }),
      setTtsEnabled: (ttsEnabled) => set({ ttsEnabled }),
      setTtsSettings: (ttsSpeed, ttsVolume, ttsVoice) => set({ ttsSpeed, ttsVolume, ttsVoice }),
      resetAll: () => set({
        theme: 'default',
        fontSize: 'md',
        fontFamily: 'default',
        reducedMotion: false,
        readingMode: false,
        ttsEnabled: false,
        ttsSpeed: 1,
        ttsVolume: 1,
        ttsVoice: null,
      }),
    }),
    {
      name: 'ecopath-a11y-storage',
    }
  )
);
