import { describe, it, expect, beforeEach } from 'vitest';
import { useA11yStore } from '../store/a11yStore';

describe('useA11yStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useA11yStore.setState({
      theme: 'default',
      fontSize: 'md',
      fontFamily: 'default',
      readingMode: false,
      reducedMotion: false,
    });
  });

  // Drawer state is managed locally via events, not in this store.

  it('updates theme correctly', () => {
    useA11yStore.getState().setTheme('dark');
    expect(useA11yStore.getState().theme).toBe('dark');
  });

  it('updates font size correctly', () => {
    useA11yStore.getState().setFontSize('xl');
    expect(useA11yStore.getState().fontSize).toBe('xl');
  });

  it('updates reading mode correctly', () => {
    useA11yStore.getState().setReadingMode(true);
    expect(useA11yStore.getState().readingMode).toBe(true);
  });
});
