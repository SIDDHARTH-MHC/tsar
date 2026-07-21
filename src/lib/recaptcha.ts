const THRESHOLD = 0.5;

export async function verifyRecaptcha(token: string | undefined, ip?: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Allow local/dev without keys; require token when secret is configured
  if (!secret) {
    console.info("[recaptcha] secret missing - skipping verify");
    return { ok: true as const, score: 1, skipped: true as const };
  }

  if (!token) {
    return { ok: false as const, score: 0, skipped: false as const };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = (await res.json()) as {
    success: boolean;
    score?: number;
    action?: string;
  };

  const score = json.score ?? 0;
  const ok = Boolean(json.success) && score >= THRESHOLD;

  return { ok, score, skipped: false as const };
}
