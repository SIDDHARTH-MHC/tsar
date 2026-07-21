# TSAR Darbaar

Premium B2B scent-branding landing site for TSAR Darbaar (division of TSAR Perfumes).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 · Framer Motion (LazyMotion)
- React Hook Form + Zod · Resend · reCAPTCHA v3
- GA4 / Meta Pixel / Clarity · Sentry

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without email/reCAPTCHA/Sentry keys, the enquiry API still accepts leads (logs them) and skips those sinks — suitable for local UI testing.

## Scripts

- `npm run dev` — local server
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint

## Env vars

See [`.env.example`](.env.example). Production needs Resend, reCAPTCHA, analytics, and optionally Sentry + Google Sheets.

## Content

All copy lives in [`src/lib/constants.ts`](src/lib/constants.ts). Update contact placeholders before launch.

Place the Company Profile PDF at `public/downloads/TSAR-Darbaar-Company-Profile.pdf` to enable brochure download on `/thank-you`.
