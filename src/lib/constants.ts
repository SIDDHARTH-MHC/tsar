export const SITE = {
  name: "Darbaar by tsar",
  parent: "tsar Perfumes",
  parentUrl: "https://tsarperfumes.com",
  url: "https://darbaarbytsar.com",
  email: "hello@darbaarbytsar.com",
  phone: "+91 98100 89673",
  phoneHref: "tel:+919810089673",
  whatsapp: "919810089673",
  whatsappMessage:
    "Hi Darbaar by tsar, I'd like to discuss scenting for my business.",
  address: "2/350, 2nd Floor, Nirankari Colony, Delhi 110009",
  city: "Delhi",
  gstin: "07CASPC9241B1ZS",
  instagram: "https://www.instagram.com/perfumesbytsar/",
  linkedin: "https://linkedin.com/company/tsarperfumes",
} as const;

export function whatsappHref(message = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Why Scent", href: "#why" },
  { label: "Why Darbaar", href: "#story" },
  { label: "Industries", href: "#industries" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Our Clients", href: "#clients" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const HERO = {
  headline: "Every darbaar had a scent.",
  headlineItalic: "Yours is still waiting.",
  subheadline:
    "Signature scent identities for India's most considered spaces.",
  cta: { label: "Explore Our Plans", href: "#solutions" },
} as const;

export const PILLARS = {
  eyebrow: "What Sets Us Apart",
  items: [
    {
      figure: "100%",
      label: "Composed in-house",
      note: "A perfumery, not a diffuser dealer. Nothing resold, nothing off the shelf.",
    },
    {
      figure: "1,000+",
      label: "Fragrance library",
      note: "Commercial-grade compositions - or a scent made for you alone.",
    },
    {
      figure: "24h",
      label: "Written SLA",
      note: "Complaint resolution and hardware replacement, in the contract.",
    },
  ],
} as const;

export const WHY_SCENT = {
  id: "why",
  eyebrow: "Why Scent",
  feeling: "Guests forget what your lobby looked like.",
  feelingEmphasis: "They never forget how it made them feel.",
  sub: "Scent is the shortest path between a space and a memory.",
  cta: { label: "See it for your industry", href: "#industries" },
} as const;

export const SCIENCE = {
  eyebrow: "The Science",
  headline: "Smell is the only sense that skips the thinking.",
  stats: [
    {
      figure: "75%",
      copy: "of what a person feels in a day is set off by something they smelled.",
    },
    {
      figure: "65%",
      copy: "recall accuracy for a scent a year later. Photographs fade faster.",
    },
    {
      figure: "10,000+",
      copy: "scents the nose can tell apart, nearly all below conscious thought.",
    },
    {
      figure: "0 sec",
      copy: "of rational filtering between a smell and the feeling it produces.",
    },
  ],
} as const;

export const WHY_DARBAAR = {
  id: "story",
  eyebrow: "Why Darbaar",
  definition: {
    word: "darbaar",
    pos: "noun",
    pronunciation: "dar·baar · from Persian,",
    etymology: "darbār",
    meaning:
      "The hall where an emperor held court. Where petitions were heard, alliances sealed, honours conferred and decrees issued.",
  },
  composed: {
    heading: "Nothing in that room was left to chance",
    chips: [
      { label: "The light", on: false },
      { label: "The silence", on: false },
      { label: "The distance to the throne", on: false },
      { label: "The air", on: true },
    ],
    after:
      "Attar pressed into the wrists of nobles. Sandalwood and oud from silver censers. No darbaar ever smelled of nothing - because the rooms where decisions are made deserve to be remembered.",
  },
  mapping: [
    { then: "The emperor's hall", now: "Your lobby" },
    {
      then: "The petitioner at the door",
      now: "Your guest, deciding whether to return",
    },
    { then: "The decree", now: "The signature on your contract" },
  ],
  close: {
    line: "We scent the rooms where decisions are made.",
    sub: "tsar means emperor. Darbaar is his court.",
  },
} as const;

export const INDUSTRIES = {
  id: "industries",
  eyebrow: "Industries",
  headline: "Every industry has its own air.",
  lede: "We compose for how your space is actually used - its size, its airflow, its guests.",
  cards: [
    {
      industry: "Hotels & Resorts",
      outcome: "Memorable arrival",
      line: "A lobby scent your guests will recognise in any city.",
      tone: "from-[#8F1425] to-[#5E0A16]",
    },
    {
      industry: "Corporate & Tech Parks",
      outcome: "Elevated ambience",
      line: "Receptions that feel as sharp as the work inside them.",
      tone: "from-[#7A1020] to-[#4A0812]",
    },
    {
      industry: "Luxury Retail & Malls",
      outcome: "Brand identity",
      line: "Longer visits, richer atmosphere, a scent that is only yours.",
      tone: "from-[#8F1425] to-[#3A2018]",
    },
    {
      industry: "Restaurants & Cafés",
      outcome: "Dining atmosphere",
      line: "An arrival aroma that begins the meal before the menu does.",
      tone: "from-[#7A1220] to-[#2F1810]",
    },
    {
      industry: "Salons & Spas",
      outcome: "Deeper relaxation",
      line: "Calm you can breathe, from the first minute of the visit.",
      tone: "from-[#6E101C] to-[#243830]",
    },
    {
      industry: "Healthcare & Wellness",
      outcome: "Calmer spaces",
      line: "Gentle, safe scenting that softens clinical environments.",
      tone: "from-[#6E1220] to-[#243040]",
    },
    {
      industry: "Co-working & Experience Centres",
      outcome: "Spaces people return to",
      line: "Memberships renewed by atmosphere, not just amenities.",
      tone: "from-[#7A1020] to-[#2A1814]",
    },
    {
      industry: "Clubhouses & Real Estate",
      outcome: "Lifestyle at first breath",
      line: "Show flats and lobbies that sell the life, not the layout.",
      tone: "from-[#8F1425] to-[#3A2018]",
    },
  ],
  specifierLine:
    "Architect or interior designer? We collaborate at the design stage - scent specified like any other material.",
  specifierCta: { label: "Talk to us early →", href: "#enquiry" },
} as const;

export const SOLUTIONS = {
  id: "solutions",
  eyebrow: "Solutions",
  headline: "Three ways in.",
  lede: "We don't fragrance spaces. We compose atmospheres that become part of your brand - and keep them that way, month after month.",
  plans: [
    {
      id: "essential",
      name: "Essential",
      positioning: "Professional scenting, fully managed.",
      featured: false,
      badge: null as string | null,
      features: [
        { text: "Installation planned around your architecture", head: false },
        { text: "Choice from 1,000+ in-house commercial fragrances", head: false },
        { text: "Fragrance consultation to match scent to brand", head: false },
        { text: "Scheduled refills on a 15-day service cycle", head: false },
        { text: "Preventive maintenance and servicing included", head: false },
        { text: "Complaints resolved within 24 hours", head: false },
        { text: "Hardware replaced within 24 hours", head: false },
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
        { text: "Everything in Essential, plus:", head: true },
        {
          text: "Brand Discovery - we study your brand before we compose",
          head: false,
        },
        { text: "A fragrance developed exclusively for you", head: false },
        {
          text: "Exclusive ownership - never offered to another client",
          head: false,
        },
        {
          text: "Dedicated relationship manager and priority support",
          head: false,
        },
        {
          text: "Extends beyond the diffuser: candles, sprays, gifting",
          head: false,
        },
      ],
      cta: { label: "Begin Brand Discovery", planValue: "Signature" },
    },
    {
      id: "fragrance-supply",
      name: "Fragrance Supply",
      positioning:
        "Already have diffusion systems? Upgrade what flows through them.",
      featured: false,
      badge: null as string | null,
      features: [
        { text: "Monthly supply of premium in-house oils", head: false },
        { text: "Compatible with most professional systems", head: false },
        { text: "Scheduled refills on your cycle", head: false },
        { text: "Fragrance consultation included", head: false },
      ],
      cta: { label: "Enquire about Supply", planValue: "Fragrance Supply" },
    },
  ],
  note: "Plans are tailored to your space and locations. Share a few details and we'll recommend the right structure.",
} as const;

export const HOW_IT_WORKS = {
  id: "process",
  eyebrow: "Process",
  headline: "Nothing here is left to chance.",
  steps: [
    {
      number: "01",
      title: "Discover",
      copy: "We visit your space or meet online - understanding your brand, your visitors, and how the space breathes.",
    },
    {
      number: "02",
      title: "Compose",
      copy: "We shortlist from our library, or begin composing your signature scent. You approve by nose, not by brochure.",
    },
    {
      number: "03",
      title: "Install",
      copy: "Discreet, professional installation planned around your architecture and operating hours. No disruption to guests.",
    },
    {
      number: "04",
      title: "Maintain",
      copy: "Refills arrive on schedule. Systems are serviced preventively. Anything that fails is resolved within 24 hours.",
    },
    {
      number: "05",
      title: "Optimise",
      copy: "We revisit intensity, coverage and seasonality as your space evolves - a scent identity is tended, not installed.",
    },
  ],
  cta: { label: "Start with a Consultation", href: "#enquiry" },
} as const;

export const CLIENTS = {
  id: "clients",
  eyebrow: "Our Clients",
  headline: "Already in the air.",
  items: [
    {
      segment: "Hotel",
      name: "Bel-la Mondè NH8",
      logo: "/images/clients/bel-la-monde-hotels.png",
      logoFit: "contain",
      quote: "Guests ask about the fragrance before they ask about the rooms.",
    },
    {
      segment: "Hotel",
      name: "Bel-la Mondè Chattarpur",
      logo: "/images/clients/bel-la-monde-hotels.png",
      logoFit: "contain",
      quote: "The lobby finally smells the way the property looks.",
    },
    {
      segment: "Hotel",
      name: "Bel-la Mondè Blue",
      logo: "/images/clients/bel-la-monde-hotels.png",
      logoFit: "contain",
      quote: "Three halls, one scent, and you can never spot a machine.",
    },
    {
      segment: "Hotel",
      name: "Bel-la Mondè Jim Corbett",
      logo: "/images/clients/bel-la-monde-river-side.png",
      logoFit: "cover",
      quote: "Even out by the river, the arrival still smells like us.",
    },
    {
      segment: "Hotel",
      name: "Belanta Hotel & Resorts",
      quote: "Conference guests keep asking what we changed.",
    },
    {
      segment: "Hotel",
      name: "Oodles Chattarpur",
      logo: "/images/clients/oodles.png",
      logoFit: "contain",
      quote: "Back to back events and the scent never drops off.",
    },
    {
      segment: "Hotel",
      name: "Cinderella Chattarpur",
      logo: "/images/clients/cinderella-chattarpur.png",
      logoFit: "cover",
      quote: "Wedding clients notice it during the site visit itself.",
    },
    {
      segment: "Hotel",
      name: "Chandbagh Chattarpur",
      quote: "Two thousand guests in and the hall still smells fresh.",
    },
    {
      segment: "Automotive",
      name: "Škoda",
      logo: "/images/clients/skoda.png",
      logoFit: "cover",
      quote: "Walk into the showroom and the brand is already in the air.",
    },
  ],
} as const;

export const FAQS = {
  id: "faqs",
  eyebrow: "FAQs",
  headline: "Before you ask.",
  items: [
    {
      id: "safety",
      question: "Is it safe for people in the space all day?",
      answer:
        "Yes. Our oils are vegan, paraben-free, non-carcinogenic and non-irritating, and diffusion is calibrated for continuous occupancy - ambient presence, not perfume-counter intensity. Intensity is zoned, adjustable, and fine-tuned after installation.",
    },
    {
      id: "cost",
      question: "What does it cost?",
      answer:
        "Every engagement is scoped to your space - size, layout, zones, and the plan you choose. After a consultation you receive a clear, itemised proposal. The consultation is free.",
    },
    {
      id: "relation",
      question: "How is Darbaar related to tsar Perfumes?",
      answer:
        "Darbaar is the commercial scenting division of tsar Perfumes. The same in-house perfumery that composes our consumer fragrances composes what flows through your space.",
    },
    {
      id: "hardware",
      question: "What if a machine stops working?",
      answer:
        "It's replaced within 24 hours. Complaints of any kind are resolved within 24 hours, and preventive maintenance means most issues never occur.",
    },
    {
      id: "exclusive",
      question: "Can we have a fragrance no one else has?",
      answer:
        "Yes - that's the Signature plan. We study your brand, compose exclusively for you, and guarantee the scent is never offered to another client.",
    },
    {
      id: "supply",
      question: "We already own diffusers. Can we still work with you?",
      answer:
        "Yes. Fragrance Supply delivers premium oils on a monthly schedule, consultation included, for businesses with compatible systems.",
    },
    {
      id: "timeline",
      question: "How long from enquiry to installation?",
      answer:
        "Typically a few weeks: consultation, scent selection or development, then installation planned around your operating hours. A signature composition takes longer - and is worth the wait.",
    },
    {
      id: "locations",
      question: "Do you serve multiple locations and cities?",
      answer:
        "Yes. We manage multi-location deployments with consistent fragrance, service standards and a single point of contact. When you expand, your scent expands with you.",
    },
    {
      id: "floors",
      question: "Can one system cover multiple floors?",
      answer:
        "Coverage is engineered, not assumed. Depending on your architecture we deploy standalone diffusion per zone, or integrate with HVAC so one scent identity carries across floors and wings.",
    },
    {
      id: "hvac",
      question: "Can you integrate with our HVAC system?",
      answer:
        "Yes. For larger properties HVAC integration is often the most discreet and uniform method. We coordinate with your facilities team or MEP consultant during planning.",
    },
    {
      id: "dining",
      question: "Will the fragrance interfere with dining?",
      answer:
        "No - this is core to curation. For restaurants we select appetite-neutral compositions, scent arrival and lounge zones rather than dining areas, and calibrate so the cuisine always leads.",
    },
    {
      id: "refills",
      question: "How often are refills required?",
      answer:
        "On a 15-day service cycle in every managed plan - scheduled by us, adjusted to your operating hours and intensity. You never track a refill date.",
    },
  ],
} as const;

export const ENQUIRY = {
  id: "enquiry",
  eyebrow: "Request a Consultation",
  headline: "Begin your scent story.",
  sideTitle: "Speak to us directly",
  responsePromise: "Business enquiries answered within one working day.",
  whatsappLabel: "Message on WhatsApp →",
  submitLabel: "Request Consultation",
  industryOptions: [
    "Hotels & Resorts",
    "Corporate & Tech Parks",
    "Luxury Retail & Malls",
    "Restaurants & Cafés",
    "Salons & Spas",
    "Healthcare & Wellness",
    "Co-working & Experience Centres",
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
} as const;

export const FOOTER = {
  tagline:
    "Scent branding and commercial fragrance solutions. A division of tsar Perfumes.",
  madeIn: "Made in भारत",
  copyright: "© 2026 tsar Perfumes",
} as const;

export const THANK_YOU = {
  headline: "Thank you. Your scent story has begun.",
  body: "A Darbaar by tsar consultant will call you within one business day.",
  brochureLabel: "Download Our Company Profile (PDF)",
  exploreLabel: "Explore tsar Perfumes →",
  redirectNote:
    "Company Profile coming soon - you can explore tsar Perfumes meanwhile.",
} as const;
