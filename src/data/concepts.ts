export type ConceptSlug =
  | "revenue-engine"
  | "revenue-leakage"
  | "ai-human"
  | "billing-department"
  | "transparency"
  | "enterprise"
  | "specialty-first"
  | "command-center"
  | "growth-partner"
  | "ultimate";

export type Concept = {
  n: number;
  slug: ConceptSlug;
  /** CSS theme class, e.g. `theme-engine`. */
  theme: string;
  scheme: "dark" | "light";
  name: string;
  headline: string;
  support: string;
  reference: string;
  cta: string;
  ctaHover: string;
  secondaryCta?: string;
  /** Short description for the /demos selector. */
  blurb: string;
  signature: string[];
  recommended?: boolean;
};

export const CONCEPTS: Concept[] = [
  {
    n: 1,
    slug: "revenue-engine",
    theme: "theme-engine",
    scheme: "dark",
    name: "The Revenue Engine",
    headline: "Turn Every Patient Visit Into Predictable Revenue.",
    support:
      "AI-powered medical billing and revenue cycle management built to reduce denials, accelerate reimbursements, and recover revenue your practice shouldn't have lost.",
    reference: "Stripe's animated payment flow",
    cta: "Get Your Free Revenue Audit",
    ctaHover: "Start Your Revenue Review",
    secondaryCta: "Explore Our RCM",
    blurb: "Money flows through a glowing revenue pipeline — the financial engine behind the practice.",
    signature: ["Living Revenue Cycle", "Interactive Leakage Calculator", "Magnetic morphing CTA"],
  },
  {
    n: 2,
    slug: "revenue-leakage",
    theme: "theme-leak",
    scheme: "light",
    name: "Stop Revenue Leakage",
    headline: "Your Practice Is Working Hard Enough. Stop Losing Revenue.",
    support: "Denials, coding errors, eligibility issues, underpayments, and aging A/R drain revenue every month. Mindlox AI finds it, fixes it, and recovers it.",
    reference: "Apple sticky-scroll narrative",
    cta: "Find My Revenue Leaks",
    ctaHover: "Show Me Where It's Leaking",
    blurb: "A revenue bar drains through seven causes, then refills stage by stage as you scroll.",
    signature: ["The Leak Reveal", "Sticky scroll storytelling", "Comparison Flip"],
  },
  {
    n: 3,
    slug: "ai-human",
    theme: "theme-aihuman",
    scheme: "dark",
    name: "AI + Human Expertise",
    headline: "Human Expertise. AI-Powered Precision.",
    support: "An intelligent operating system for your revenue cycle — with experienced billing specialists behind every decision.",
    reference: "Intercom's AI-as-colleague + Linear's interface-as-marketing",
    cta: "See Mindlox AI in Action",
    ctaHover: "Watch the Handoff",
    blurb: "A live detection feed streams in; a human specialist resolves each one. The handoff is the story.",
    signature: ["AI Detection Feed", "Command-Center Dashboard", "Human/AI handoff animation"],
  },
  {
    n: 4,
    slug: "billing-department",
    theme: "theme-team",
    scheme: "light",
    name: "Your Billing Department, Upgraded",
    headline: "Your Billing Team. Without the Billing Headaches.",
    support: "Coders, billers, A/R and denial specialists, credentialing experts, account managers, and AI automation — assembled around your practice.",
    reference: "Notion's approachable team-tool warmth",
    cta: "Build My RCM Team",
    ctaHover: "Assemble My Team",
    blurb: "A virtual billing department assembles around the practice as you scroll.",
    signature: ["Team assembly on scroll", "Role cards with hover depth", "Process timeline"],
  },
  {
    n: 5,
    slug: "transparency",
    theme: "theme-transparent",
    scheme: "light",
    name: "The Transparent RCM Company",
    headline: "Finally, See Where Your Revenue Goes.",
    support: "Every claim, every stage, every dollar — visible. You never chase your billing company again.",
    reference: "Airbnb trust systems + Stripe clarity",
    cta: "See How It Works",
    ctaHover: "Follow a Claim",
    blurb: "Claim #MLX-10492 travels from visit to posted payment; every stage expands to show the work.",
    signature: ["Clickable Claim Journey", "Trust architecture", "Live status timeline"],
  },
  {
    n: 6,
    slug: "enterprise",
    theme: "theme-enterprise",
    scheme: "light",
    name: "Enterprise Healthcare",
    headline: "Revenue Cycle Management Built for Modern Healthcare.",
    support: "Physician groups, hospitals, ASCs, urgent care, behavioral health, laboratories, DME, and telehealth organizations — one disciplined revenue system.",
    reference: "Vercel's monochrome grid discipline + Microsoft Fluent depth",
    cta: "Talk to an RCM Specialist",
    ctaHover: "Schedule a Working Session",
    blurb: "White, black, one accent. Perfect grid. Zero fluff. Built for the CFO's shortlist.",
    signature: ["Grid-rhythm layout", "Organization-type selector", "Metric wall with count-up"],
  },
  {
    n: 7,
    slug: "specialty-first",
    theme: "theme-specialty",
    scheme: "light",
    name: "Specialty-First",
    headline: "Medical Billing Built Around Your Specialty.",
    support: "Select your specialty and watch the challenges, coding realities, denial patterns, and workflow reshape in place.",
    reference: "Figma's exploration-rewarding interaction",
    cta: "Explore My Specialty",
    ctaHover: "Show My Specialty's Playbook",
    blurb: "Selecting a specialty morphs the entire page — challenges, denials, coding notes, workflow.",
    signature: ["Specialty Morph", "25-specialty selector", "Staggered in-place transitions"],
  },
  {
    n: 8,
    slug: "command-center",
    theme: "theme-command",
    scheme: "dark",
    name: "The RCM Command Center",
    headline: "Your Entire Revenue Cycle. One Intelligent Command Center.",
    support: "Net collection rate, A/R days, clean claim rate, denials, payments, recovery — drawn live, with an AI assistant that tells you what to do next.",
    reference: "Linear + Ramp/Mercury dashboards",
    cta: "Experience the Command Center",
    ctaHover: "Open the Command Center",
    blurb: "A cinematic dashboard: charts draw themselves, metrics count up, the AI assistant types its morning summary.",
    signature: ["Command-Center Dashboard", "AI assistant typing", "Charts that draw on entry"],
  },
  {
    n: 9,
    slug: "growth-partner",
    theme: "theme-growth",
    scheme: "light",
    name: "The Practice Growth Partner",
    headline: "Stop Managing Billing. Start Growing Your Practice.",
    support: "Your practice should focus on healthcare. We'll focus on the revenue cycle.",
    reference: "Tesla's outcome-first single-scroll narrative",
    cta: "Let's Grow Your Practice",
    ctaHover: "Start the Transformation",
    blurb: "A pinned before/after transformation: chaos becomes order as the copy scrolls beside it.",
    signature: ["Sticky before/after transformation", "Full-bleed single scroll", "Persistent CTA"],
  },
  {
    n: 10,
    slug: "ultimate",
    theme: "theme-ultimate",
    scheme: "dark",
    name: "The Ultimate Mindlox AI",
    headline: "Healthcare Deserves a Smarter Revenue Cycle.",
    support:
      "Mindlox AI combines medical billing expertise, intelligent automation, and revenue-cycle intelligence to help healthcare organizations get paid faster, reduce denials, recover lost revenue, and spend less time fighting the billing process.",
    reference: "Stripe storytelling + Linear precision + Apple restraint + Airbnb trust + HubSpot conversion",
    cta: "Get Your Free Revenue Audit",
    ctaHover: "Start Your Revenue Review",
    secondaryCta: "Explore Mindlox AI",
    blurb: "The synthesis. An interactive revenue ecosystem that responds to scroll and hover — plus every proven section.",
    signature: ["Living Revenue Ecosystem", "Command Center", "Claim Journey", "Calculator", "Comparison Flip"],
    recommended: true,
  },
];

export const getConcept = (slug: string) => CONCEPTS.find((c) => c.slug === slug);
export const conceptPath = (c: Concept) => `/demos/${c.slug}`;
