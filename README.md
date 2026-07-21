# TSAR Darbaar

Premium B2B scent-branding landing site for TSAR Darbaar (division of TSAR Perfumes).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion
- React Hook Form + Zod
- Resend (enquiry email)
- GA4 / Meta Pixel / Clarity

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without `RESEND_API_KEY` / reCAPTCHA keys, the enquiry API still accepts leads (logs them) and skips email/captcha — suitable for local UI testing.

## Env vars

See [`.env.example`](.env.example). Required for production:

- `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
- Analytics IDs as needed
- Optional Google Sheets credentials for interim CRM

## Content

All copy lives in [`src/lib/constants.ts`](src/lib/constants.ts). Update contact placeholders (`SITE.phone`, `SITE.email`, `SITE.whatsapp`) before launch.

Place the Company Profile PDF at `public/downloads/TSAR-Darbaar-Company-Profile.pdf` to enable brochure download on `/thank-you` (otherwise a cancellable 5s redirect to tsarperfumes.com is shown).
