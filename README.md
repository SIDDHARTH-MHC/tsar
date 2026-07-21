# TSAR Darbaar

Premium B2B scent-branding landing site for TSAR Darbaar (division of TSAR Perfumes).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scope (current)

Visual + structure pass:

- All 8 landing sections with final blueprint copy
- Header, footer, sticky mobile CTA
- Enquiry form UI (client validation; submits to `/thank-you` without API)
- Thank-you page shell

Not yet: Resend email, reCAPTCHA, analytics, CRM/Sheets, photography, Company Profile PDF.

## Content

All copy lives in [`src/lib/constants.ts`](src/lib/constants.ts). Update contact placeholders (`SITE.phone`, `SITE.email`, `SITE.whatsapp`) before launch.
