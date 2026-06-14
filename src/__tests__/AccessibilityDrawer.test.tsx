import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityDrawer } from '@/components/accessibility/AccessibilityDrawer';
import { useA11yStore } from '@/store/a11yStore';
import { useTTS } from '@/hooks/useTTS';

vi.mock('@/store/a11yStore');
vi.mock('@/hooks/useTTS');

describe('AccessibilityDrawer', () => {
  beforeEach(() => {
    vi.mocked(useA11yStore).mockReturnValue({
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
      setTheme: vi.fn(),
      setFontSize: vi.fn(),
      setFontFamily: vi.fn(),
      setReducedMotion: vi.fn(),
      setReadingMode: vi.fn(),
      setTtsEnabled: vi.fn(),
      setSelectedVoiceURI: vi.fn(),
      setSpeechRate: vi.fn(),
      setSpeechPitch: vi.fn(),
      setSpeechVolume: vi.fn(),
      resetAll: vi.fn(),
    } as any);

    vi.mocked(useTTS).mockReturnValue({
      supported: true,
      errorMsg: null,
      isSpeaking: false,
      isPaused: false,
      voices: [],
      play: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      stop: vi.fn()
    });
  });

  it('renders correctly', () => {
    const onClose = vi.fn();
    render(<AccessibilityDrawer isOpen={true} onClose={onClose} />);
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('toggles TTS correctly', () => {
    const setTtsEnabled = vi.fn();
    vi.mocked(useA11yStore).mockReturnValue({
      theme: 'default',
      fontSize: 'md',
      fontFamily: 'default',
      reducedMotion: false,
      readingMode: false,
      speechRate: 1,
      speechPitch: 1,
      speechVolume: 1,
      selectedVoiceURI: null,
      setTheme: vi.fn(),
      setFontSize: vi.fn(),
      setFontFamily: vi.fn(),
      setReducedMotion: vi.fn(),
      setReadingMode: vi.fn(),
      setSelectedVoiceURI: vi.fn(),
      setSpeechRate: vi.fn(),
      setSpeechPitch: vi.fn(),
      setSpeechVolume: vi.fn(),
      resetAll: vi.fn(),
      ttsEnabled: false,
      setTtsEnabled,
    } as any);

    const onClose = vi.fn();
    render(<AccessibilityDrawer isOpen={true} onClose={onClose} />);
    
    expect(screen.getByText('Text-to-Speech (TTS)')).toBeInTheDocument();
  });
});
