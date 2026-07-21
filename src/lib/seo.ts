import { FAQS, SITE, SOLUTIONS } from "@/lib/constants";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/tsar-logo.png`,
    parentOrganization: {
      "@type": "Organization",
      name: SITE.parent,
      url: SITE.parentUrl,
    },
    sameAs: [SITE.instagram, SITE.linkedin, SITE.parentUrl],
    email: SITE.email,
    telephone: SITE.phone,
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description:
      "Signature scent identities for hotels, offices, retail and wellness spaces across India.",
    url: SITE.url,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    parentOrganization: {
      "@type": "Organization",
      name: SITE.parent,
      url: SITE.parentUrl,
    },
  };
}

export function serviceJsonLd() {
  return SOLUTIONS.plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `TSAR Darbaar ${plan.name}`,
    description: plan.positioning,
    provider: {
      "@type": "Organization",
      name: SITE.name,
    },
    areaServed: "India",
  }));
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function allJsonLd() {
  return [
    organizationJsonLd(),
    professionalServiceJsonLd(),
    ...serviceJsonLd(),
    faqPageJsonLd(),
  ];
}
