export const SITE = {
  name: "TSAR Darbaar",
  parent: "TSAR Perfumes",
  parentUrl: "https://tsarperfumes.com",
  url: "https://darbaar.tsarperfumes.com",
  email: "admin@perfumesbytsar.com",
  phone: "+91 98100 89673",
  phoneHref: "tel:+919810089673",
  whatsapp: "919810089673",
  whatsappMessage:
    "Hi TSAR Darbaar, I'd like to discuss scenting for my business.",
  address: "2/350, 2nd Floor, Nirankari Colony, Delhi - 110009",
  city: "Delhi",
  gstin: "07CASPC9241B1ZS",
  instagram: "https://www.instagram.com/perfumesbytsar/",
  linkedin: "https://linkedin.com/company/tsarperfumes",
} as const;

export function whatsappHref(message = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Why Scent", href: "#why-scent-branding" },
  { label: "Industries", href: "#industries" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const HERO = {
  eyebrow: "SCENT BRANDING BY TSAR PERFUMES",
  headline: "Your space has a story. Give it a scent.",
  subheadline:
    "TSAR Darbaar creates signature scent identities for hotels, offices, retail spaces and wellness environments - designed by perfumers, installed and maintained by professionals, across India.",
  primaryCta: { label: "Request a Consultation", href: "#enquiry" },
  secondaryCta: { label: "Explore Our Plans", href: "#plans" },
} as const;

export const LEGACY = {
  bandLine:
    "Built on the perfumery of TSAR - fragrances crafted in India, for Indian spaces and seasons.",
  credentials: [
    {
      title: "In-house perfumery",
      copy: "every fragrance composed by our own house, not resold.",
    },
    {
      title: "50+ commercial-grade fragrances",
      copy: "a library curated for large spaces.",
    },
    {
      title: "Safe by formulation",
      copy: "vegan, paraben-free, non-carcinogenic, non-irritating oils.",
    },
    {
      title: "Service-first operations",
      copy: "24-hour complaint resolution, guaranteed.",
    },
  ],
} as const;

export const WHY_SCENT = {
  id: "why-scent-branding",
  editorial:
    "Guests forget what your lobby looked like. They never forget how it made them feel. Scent is the shortest path between a space and a memory.",
  columns: [
    {
      title: "Scent is remembered longest.",
      copy: "Of all the senses, smell is wired most directly to emotion and memory. A space with a signature scent is recalled long after the visit - and recognized instantly on return.",
    },
    {
      title: "Scent shapes how time feels.",
      copy: "The right fragrance makes a lobby feel calmer, a store feel richer, a waiting room feel shorter. It works quietly on every person who walks in, every hour you're open.",
    },
    {
      title: "Scent completes a brand.",
      copy: "You've designed what your space looks and sounds like. A signature scent is the final layer - the one dimension of your brand experience your competitors haven't touched.",
    },
  ],
  cta: { label: "See how it works for your industry", href: "#industries" },
} as const;

export const INDUSTRIES = {
  id: "industries",
  headline: "Every industry has its own air.",
  lede: "We compose for the way your space is actually used - its size, its airflow, its guests, its purpose.",
  cards: [
    {
      industry: "Hotels & Resorts",
      outcome: "MEMORABLE GUEST ARRIVAL",
      line: "A lobby scent your guests will recognize in any city.",
      tone: "from-[#1a1625] to-[#3d2f1f]",
    },
    {
      industry: "Corporate & Tech Parks",
      outcome: "ELEVATED WORKPLACE AMBIENCE",
      line: "Receptions and workspaces that feel as sharp as the work.",
      tone: "from-[#141820] to-[#2a3340]",
    },
    {
      industry: "Luxury Retail & Malls",
      outcome: "STRONGER BRAND IDENTITY",
      line: "Longer visits, richer atmosphere, a scent that is only yours.",
      tone: "from-[#1c1410] to-[#4a3220]",
    },
    {
      industry: "Restaurants & Cafés",
      outcome: "ELEVATED DINING ATMOSPHERE",
      line: "An arrival aroma that begins the meal before the menu does.",
      tone: "from-[#1a1210] to-[#3d2818]",
    },
    {
      industry: "Salons & Spas",
      outcome: "DEEPER RELAXATION",
      line: "Calm you can breathe - from the first minute of the visit.",
      tone: "from-[#151818] to-[#2c3830]",
    },
    {
      industry: "Healthcare & Wellness",
      outcome: "CALMER, WELCOMING SPACES",
      line: "Gentle, safe scenting that softens clinical environments.",
      tone: "from-[#14161a] to-[#2a3038]",
    },
    {
      industry: "Co-working & Experience Centers",
      outcome: "SPACES PEOPLE RETURN TO",
      line: "Memberships renewed by atmosphere, not just amenities.",
      tone: "from-[#161412] to-[#302820]",
    },
    {
      industry: "Clubhouses & Real Estate",
      outcome: "LIFESTYLE AT FIRST BREATH",
      line: "Show flats and lobbies that sell the life, not the layout.",
      tone: "from-[#181410] to-[#3a2c1c]",
    },
  ],
  specifierLine:
    "Architect or interior designer? We collaborate at the design stage - scent specified like any other material.",
  specifierCta: { label: "Talk to us early.", href: "#enquiry" },
} as const;

export const SOLUTIONS = {
  id: "solutions",
  manifesto: {
    headline:
      "We don't fragrance spaces. We create signature atmospheres that become part of your brand.",
    lines: [
      "Anyone can plug in a diffuser. TSAR Darbaar begins where equipment ends - with what your brand should smell like, and the discipline to keep it smelling that way, month after month.",
      "Composed in-house for Indian climates. Engineered around your architecture. Managed like a service, not a sale.",
    ],
  },
  plansHeader: {
    headline: "Three ways to work with us.",
    lede: "Every engagement begins with a consultation. Every plan ends with a space people remember.",
  },
  plans: [
    {
      id: "essential",
      name: "Essential",
      positioning: "Professional scenting, fully managed.",
      featured: false,
      badge: null,
      features: [
        "Professional aroma system installation, planned for your space",
        "Choice of 50+ premium in-house fragrances",
        "Fragrance consultation to match scent to space and brand",
        "Monthly fragrance refills - scheduled, never chased",
        "Preventive maintenance and servicing included",
        "Complaints resolved within 24 hours",
        "Hardware failure? Replaced within 24 hours",
      ],
      cta: { label: "Enquire about Essential", planValue: "Essential" },
    },
    {
      id: "signature",
      name: "Signature",
      positioning: "A scent that belongs to your brand alone.",
      featured: true,
      badge: "Our signature engagement",
      features: [
        "Everything in Essential, plus:",
        "Brand Discovery - we study your brand before we compose",
        "Signature fragrance developed exclusively for you",
        "Exclusive ownership - your scent is never offered to another client",
        "Dedicated relationship manager",
        "Priority support and scent branding consultation",
      ],
      cta: { label: "Begin Brand Discovery", planValue: "Signature" },
    },
    {
      id: "fragrance-supply",
      name: "Fragrance Supply",
      positioning:
        "Already have diffusion systems? Upgrade what flows through them.",
      featured: false,
      badge: null,
      features: [
        "Monthly supply of premium fragrance oils",
        "Compatible with most professional diffusion systems",
        "Scheduled refills on your cycle",
        "Fragrance consultation included",
      ],
      cta: { label: "Enquire about Supply", planValue: "Fragrance Supply" },
    },
  ],
  note: "Plans are tailored to your space and locations. Share a few details and we'll recommend the right structure - no obligation.",
} as const;

export const WHY_TSAR = {
  id: "why-tsar",
  headline: "The house behind the scent.",
  checklist: [
    {
      title: "In-house perfumery",
      copy: "we compose, we don't resell",
    },
    {
      title: "Luxury fragrance expertise",
      copy: "built on TSAR Perfumes",
    },
    {
      title: "50+ commercial-grade fragrances",
      copy: "curated for large spaces",
    },
    {
      title: "Written service SLA",
      copy: "24-hour resolution and replacement",
    },
    {
      title: "Dedicated relationship manager",
      copy: "on Signature engagements",
    },
    {
      title: "Made in India",
      copy: "composed for Indian air, spaces and seasons",
    },
  ],
  reasons: [
    {
      title: "Formulated to be safe around people, all day.",
      copy: "Our oils carry the standards of our perfumery: vegan, paraben-free, non-carcinogenic, and non-irritating. In spaces where people spend hours - offices, hospitals, hotels - that isn't a detail. It's the foundation.",
    },
    {
      title: "Service written into the contract, not the brochure.",
      copy: "24-hour complaint resolution. 24-hour hardware replacement. Scheduled refills and preventive maintenance. We put our service standards in writing because we intend to be measured by them.",
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  id: "how-it-works",
  headline: "From first meeting to first impression.",
  steps: [
    {
      number: "01",
      title: "Discover",
      copy: "We visit your space or meet online - understanding your brand, your visitors, and how the space breathes.",
    },
    {
      number: "02",
      title: "Compose",
      copy: "We shortlist from our library - or begin composing your signature scent. You approve by nose, not by brochure.",
    },
    {
      number: "03",
      title: "Install",
      copy: "Discreet, professional installation planned around your architecture and operating hours. No disruption to your guests.",
    },
    {
      number: "04",
      title: "Maintain",
      copy: "Refills arrive on schedule. Systems are serviced preventively. Anything that fails is resolved within 24 hours.",
    },
    {
      number: "05",
      title: "Optimize",
      copy: "We revisit intensity, coverage and seasonality as your space evolves - a scent identity is tended, not installed.",
    },
  ],
  cta: { label: "Start with a Consultation", href: "#enquiry" },
} as const;

export const FAQS = {
  id: "faqs",
  headline: "Before you ask.",
  items: [
    {
      id: "safety",
      question:
        "Is ambient scenting safe for staff and guests who are in the space all day?",
      answer:
        "Yes. Our fragrance oils are vegan, paraben-free, non-carcinogenic, and non-irritating, and diffusion levels are calibrated for continuous occupancy - ambient presence, not perfume-counter intensity. Intensity is zoned and adjustable, and we fine-tune after installation based on your feedback.",
    },
    {
      id: "cost",
      question: "What does it cost?",
      answer:
        "Every engagement is scoped to your space - its size, layout, number of zones, and the plan you choose. After a consultation (on-site or online), you'll receive a clear, itemized proposal. There are no charges for the consultation.",
    },
    {
      id: "relation",
      question: "How is TSAR Darbaar related to TSAR Perfumes?",
      answer:
        "TSAR Darbaar is the commercial scenting division of TSAR Perfumes. The same in-house perfumery that composes our consumer fragrances composes what flows through your space.",
    },
    {
      id: "hardware",
      question: "What happens if a machine stops working?",
      answer:
        "It's replaced within 24 hours. Complaints of any kind are resolved within 24 hours. Preventive maintenance is scheduled so most issues never occur at all.",
    },
    {
      id: "exclusive",
      question: "Can we have a fragrance no one else has?",
      answer:
        "Yes - that's our Signature plan. We study your brand, compose a fragrance exclusively for you, and guarantee it is never offered to another client. Your scent remains yours.",
    },
    {
      id: "supply",
      question: "We already own diffusers. Can we still work with you?",
      answer:
        "Yes. Our Fragrance Supply plan delivers premium fragrance oils on a monthly schedule, with consultation included, for businesses with compatible systems.",
    },
    {
      id: "timeline",
      question: "How long does it take from enquiry to installation?",
      answer:
        "Typically a few weeks: consultation, scent selection or development, then installation planned around your operating hours. Signature fragrance development takes longer - a composed scent is worth the wait.",
    },
    {
      id: "locations",
      question: "Do you serve multiple locations and cities?",
      answer:
        "Yes. We provide nationwide servicing and manage multi-location deployments across India with consistent fragrance, service standards, and a single point of contact. When you expand, your scent expands with you - new locations are added to your existing plan and schedule.",
    },
    {
      id: "floors",
      question: "Can one fragrance system cover multiple floors?",
      answer:
        "Coverage is engineered, not assumed. Depending on your architecture, we deploy standalone diffusion per zone or integrate with your HVAC system so a single scent identity carries consistently across floors and wings.",
    },
    {
      id: "hvac",
      question: "Can you integrate with our HVAC / central air system?",
      answer:
        "Yes. For larger properties, HVAC integration is often the most discreet and uniform delivery method. We coordinate with your facilities team or MEP consultant during planning.",
    },
    {
      id: "dining",
      question: "Will the fragrance interfere with food and dining?",
      answer:
        "No - this is a core part of curation. For restaurants and cafés we select appetite-neutral compositions, scent arrival and lounge zones rather than dining areas, and calibrate intensity so the cuisine always leads.",
    },
    {
      id: "refills",
      question: "How often are refills required?",
      answer:
        "Monthly, as part of every plan - scheduled by us, adjusted to your operating hours and diffusion intensity. You never track a refill date.",
    },
  ],
} as const;

export const ENQUIRY = {
  id: "enquiry",
  headline: "Begin your scent story.",
  reassurance:
    "Tell us about your space. A TSAR Darbaar consultant will respond within one business day - with questions, not a sales pitch.",
  preferTalk: "Prefer to talk?",
  whatsappLabel: "Or message us on WhatsApp →",
  submitLabel: "Request Consultation",
  underButton: "No obligation. No spam. Your details stay with us.",
  optionalDivider: "Help us prepare (optional)",
  industryOptions: [
    "Hotels & Resorts",
    "Corporate & Tech Parks",
    "Luxury Retail & Malls",
    "Restaurants & Cafés",
    "Salons & Spas",
    "Healthcare & Wellness",
    "Co-working & Experience Centers",
    "Clubhouses & Real Estate",
    "Architect / Interior Designer",
    "Other",
  ],
  locationOptions: ["1", "2–5", "6–20", "20+"],
  planOptions: [
    "Not sure yet",
    "Essential",
    "Signature",
    "Fragrance Supply",
  ],
  messagePlaceholder:
    "Tell us about your space - size, current setup, timeline…",
} as const;

export const FOOTER = {
  tagline: "Scent branding & commercial fragrance solutions.",
  division: "A division of TSAR Perfumes.",
  madeIn: "Made in Bharat.",
} as const;

export const THANK_YOU = {
  headline: "Thank you. Your scent story has begun.",
  body: "A TSAR Darbaar consultant will call you within one business day.",
  brochureLabel: "Download Our Company Profile (PDF)",
  exploreLabel: "Explore TSAR Perfumes →",
  redirectNote: "Company Profile coming soon - you can explore TSAR Perfumes meanwhile.",
} as const;
