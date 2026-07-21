type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function rateLimit(
  key: string,
  {
    windowMs = WINDOW_MS,
    max = MAX_REQUESTS,
  }: { windowMs?: number; max?: number } = {},
) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: max - 1 };
  }

  if (existing.count >= max) {
    return {
      ok: false as const,
      remaining: 0,
      retryAfterMs: existing.resetAt - now,
    };
  }

  existing.count += 1;
  return { ok: true as const, remaining: max - existing.count };
}
