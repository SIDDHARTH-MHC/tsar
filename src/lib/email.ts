import { Resend } from "resend";
import type { LeadPayload } from "@/lib/schema";
import { SITE } from "@/lib/constants";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRows(lead: LeadPayload) {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Industry", lead.industry],
    ["City", lead.city],
    ["Locations", lead.locations],
    ["Plan", lead.plan],
    ["Message", lead.message],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
    ["Page", lead.page_url],
    ["Submitted", lead.submitted_at],
  ];

  return rows
    .filter(([, v]) => Boolean(v))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#8F1425;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#16090C;">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");
}

export async function sendEnquiryEmails(lead: LeadPayload) {
  const resend = getResend();
  const to = process.env.ENQUIRY_TO_EMAIL ?? "hello@darbaarbytsar.com";
  const from =
    process.env.ENQUIRY_FROM_EMAIL ??
    `Darbaar by tsar <no-reply@darbaarbytsar.com>`;

  if (!resend) {
    console.info("[email] RESEND_API_KEY missing - skipping send", {
      company: lead.company,
      email: lead.email,
    });
    return { skipped: true as const };
  }

  const subject = `New enquiry · ${lead.company} · ${lead.industry ?? "-"} · ${lead.city ?? "-"}`;

  // 1) Notify the team
  const internal = await resend.emails.send({
    from,
    to: [to],
    replyTo: lead.email,
    subject,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#16090C;">
        <h1 style="font-size:22px;font-weight:400;">New Darbaar by tsar enquiry</h1>
        <table style="width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">
          ${fieldRows(lead)}
        </table>
      </div>
    `,
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  // 2) Confirmation to the person who submitted the form
  const ack = await resend.emails.send({
    from,
    to: [lead.email],
    replyTo: to,
    subject: "We've received your enquiry — Darbaar by tsar",
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#16090C;background:#F7F3F3;padding:32px;">
        <p style="font-size:22px;margin:0 0 16px;letter-spacing:0.04em;">Darbaar <span style="color:#8F1425;">by tsar</span></p>
        <h1 style="font-size:24px;font-weight:400;margin:0 0 12px;">We've received your enquiry</h1>
        <p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#6A5C5E;">
          Thank you, ${escapeHtml(lead.name)}. Our team will respond within one business day.
        </p>
        <p style="font-family:system-ui,sans-serif;font-size:14px;color:#6A5C5E;margin-top:24px;">
          Prefer to talk sooner?<br/>
          <a href="mailto:${SITE.email}" style="color:#8F1425;">${SITE.email}</a>
          ·
          <a href="${SITE.phoneHref}" style="color:#8F1425;">${SITE.phone}</a>
        </p>
      </div>
    `,
  });

  if (ack.error) {
    throw new Error(`Confirmation email failed: ${ack.error.message}`);
  }

  return {
    skipped: false as const,
    id: internal.data?.id,
    confirmationId: ack.data?.id,
  };
}
