import { describe, it, expect } from 'vitest';
import { generateMockEcoResponse } from '../services/ai/mockEcoResponse';

describe('mockEcoResponse Utility', () => {
  it('should return a greeting when input contains hi', () => {
    const response = generateMockEcoResponse("hi there");
    expect(response).toContain("Hello there!");
  });

  it('should return a challenge suggestion when input contains challenge', () => {
    const response = generateMockEcoResponse("give me a challenge");
    expect(response).toContain("Challenges are a great way");
  });

  it('should return transport advice when input contains car', () => {
    const response = generateMockEcoResponse("I drive a car");
    expect(response).toContain("Transportation is a major emission source");
  });

  it('should return diet advice when input contains meat', () => {
    const response = generateMockEcoResponse("eating meat");
    expect(response).toContain("Diet plays a huge role");
  });

  it('should return a generic fallback for unknown input', () => {
    const response = generateMockEcoResponse("what color is the sky");
    // The fallbacks array has specific phrases. We check if the response is one of them by ensuring it doesn't match the specific ones above.
    expect(response).not.toContain("Hello there!");
    expect(response).not.toContain("Transportation is a major emission source");
    expect(response.length).toBeGreaterThan(10);
  });
});
