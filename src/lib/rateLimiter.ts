/**
 * Simple in-memory rate limiter for Hackathon scope.
 * In production, replace with Upstash Redis or similar.
 */

interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const limits = new Map<string, RateLimitTracker>();

export function checkRateLimit(ip: string, endpoint: string, maxRequests: number, windowSeconds: number): boolean {
  const now = Date.now();
  const key = `${ip}:${endpoint}`;

  const record = limits.get(key);

  if (!record || now > record.resetAt) {
    // First request or window expired
    limits.set(key, { count: 1, resetAt: now + (windowSeconds * 1000) });
    return true;
  }

  if (record.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  record.count += 1;
  limits.set(key, record);
  return true;
}
