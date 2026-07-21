import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { enquirySchema, toLeadPayload } from "@/lib/schema";
import { sendEnquiryEmails } from "@/lib/email";
import { appendLeadToSheet } from "@/lib/crm/sheets";
import { rateLimit } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const recentKeys = new Map<string, number>();
const IDEMPOTENCY_WINDOW_MS = 60_000;

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isDuplicate(key: string) {
  const now = Date.now();
  for (const [k, ts] of recentKeys) {
    if (now - ts > IDEMPOTENCY_WINDOW_MS) recentKeys.delete(k);
  }
  if (recentKeys.has(key)) return true;
  recentKeys.set(key, now);
  return false;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`enquiry:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)),
        },
      },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Validation failed", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.website && data.website.trim().length > 0) {
    console.info("[enquiry] honeypot tripped", { ip });
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyRecaptcha(data.recaptchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { ok: false, error: "Spam check failed. Please try again." },
      { status: 400 },
    );
  }

  const lead = toLeadPayload(data);
  const idempotencyKey = `${lead.email.toLowerCase()}|${lead.company.toLowerCase()}|${lead.phone}`;
  if (isDuplicate(idempotencyKey)) {
    console.info("[enquiry] duplicate suppressed", { email: lead.email });
    return NextResponse.json({ ok: true, duplicate: true });
  }

  console.info("[enquiry:lead]", JSON.stringify(lead));

  try {
    await sendEnquiryEmails(lead);
  } catch (err) {
    console.error("[enquiry] email failed", err);
    Sentry.captureException(err, {
      tags: { route: "/api/enquiry", severity: "p1" },
      extra: { company: lead.company, email: lead.email },
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong on our side. Please try again, or write to us directly.",
      },
      { status: 500 },
    );
  }

  void appendLeadToSheet(lead).catch((err) => {
    console.error("[enquiry] sheets append failed", err);
    Sentry.captureException(err, {
      tags: { route: "/api/enquiry", sink: "sheets" },
    });
  });

  return NextResponse.json({ ok: true });
}
