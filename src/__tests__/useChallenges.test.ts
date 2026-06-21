import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChallenges } from '../hooks/useChallenges';
import { DEFAULT_CHALLENGES } from '../constants/challenges';

describe('useChallenges Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with default challenges', () => {
    const { result } = renderHook(() => useChallenges());
    expect(result.current.suggestedChallenges).toEqual(DEFAULT_CHALLENGES);
    expect(result.current.isGenerating).toBe(false);
  });

  it('should generate a new challenge after timeout', () => {
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      result.current.handleGenerate();
    });
    
    expect(result.current.isGenerating).toBe(true);
    
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(result.current.isGenerating).toBe(false);
    expect(result.current.suggestedChallenges.length).toBe(DEFAULT_CHALLENGES.length + 1);
  });

  it('should mark a challenge as joined', () => {
    const { result } = renderHook(() => useChallenges());
    
    expect(result.current.suggestedChallenges[0].joined).toBe(false);
    
    act(() => {
      result.current.handleJoin(0);
    });
    
    expect(result.current.suggestedChallenges[0].joined).toBe(true);
  });
});
