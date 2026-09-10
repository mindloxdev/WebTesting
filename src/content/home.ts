/* ------------------------------------------------------------------ */
/*  HOME PAGE CONTENT — the one file to edit for the landing page.     */
/*                                                                      */
/*  • Change any text below and the home page updates.                  */
/*  • Reorder sections by moving entries in `sections`.                 */
/*  • Hide a section with `enabled: false` (nothing is deleted — every  */
/*    section still lives on its tab page: /services, /specialties,     */
/*    /technology, /why-mindlox-ai, /resources).                        */
/*  • Add a section: add its id to `HomeSectionId` and register a       */
/*    component in src/components/home/HomePage.tsx.                    */
/*                                                                      */
/*  Shared copy (nav, CTAs, services, specialties, FAQ, comparison,     */
/*  demo numbers) lives in src/data/*. See CONTENT-GUIDE.md.            */
/* ------------------------------------------------------------------ */

import { CTA } from "@/data/site";

export type HomeSectionId =
  | "trust" // trust strip: five pillars + placeholder metrics
  | "problem" // "They have a revenue problem" cards
  | "lifecycle" // the 14-stage revenue cycle
  | "services" // compact services preview → /services
  | "proof" // Humans + Technology + Intelligence band
  | "ai" // "Meet the intelligence" → /technology
  | "dashboard" // compact command center → /technology
  | "specialties" // featured specialties → /specialties
  | "comparison" // short comparison table → /why-mindlox-ai
  | "process" // 5-step onboarding (off by default; lives on /services and /about)
  | "calculator" // leakage calculator (off by default; lives on /revenue-leakage-calculator)
  | "integrations" // EHR ecosystem (off by default; lives on /technology)
  | "case-studies" // (off by default; lives on /why-mindlox-ai and /resources)
  | "testimonials" // (off by default; lives on /why-mindlox-ai)
  | "resources" // (off by default; lives on /resources)
  | "faq" // short FAQ → /resources#faq
  | "cta"; // closing CTA with the lead form

export type HomeSection = {
  id: HomeSectionId;
  enabled: boolean;
  /** Background: "default" (page color) or "muted" (soft tint). */
  tone?: "default" | "muted";
  /** How many items to show for list-style sections. */
  limit?: number;
  /** Where the section's "see more" link points. */
  moreHref?: string;
  /** Override the section's primary CTA target. */
  ctaHref?: string;
};

export const HOME = {
  /** <title> and description for search engines and link previews. */
  seo: {
    title: "Mindlox AI — Medical Billing & Revenue Cycle Intelligence",
    description:
      "Mindlox AI combines medical billing expertise, intelligent automation, and revenue-cycle intelligence to help U.S. healthcare organizations get paid faster, reduce denials, and recover lost revenue.",
  },

  hero: {
    eyebrow: "Medical billing + revenue cycle intelligence",
    headline: "Healthcare Deserves a Smarter Revenue Cycle.",
    /** The part of the headline rendered in the gradient. Must appear inside `headline`. */
    highlight: "Smarter Revenue Cycle.",
    support:
      "Mindlox AI combines medical billing expertise, intelligent automation, and revenue-cycle intelligence to help healthcare organizations get paid faster, reduce denials, recover lost revenue, and spend less time fighting the billing process.",
    primary: { label: "Get Your Free Revenue Audit", hoverLabel: "Start Your Revenue Review", href: CTA.auditHref },
    secondary: { label: "Explore Mindlox AI", hoverLabel: "See the Whole System", href: "#solution" },
    /** Small trust indicators under the buttons. */
    trust: ["HIPAA-conscious workflows", "U.S. healthcare focus", "End-to-end RCM", "AI-assisted, human-reviewed"],
    /** Show the "Recommended · Concept 10" pill (only on the concept demo, not the live home). */
    badge: false,
  },

  /** Order and visibility of the sections under the hero. */
  sections: [
    { id: "trust", enabled: true },
    { id: "problem", enabled: true, ctaHref: "/revenue-leakage-calculator" },
    { id: "lifecycle", enabled: true, tone: "muted" },
    { id: "services", enabled: true, limit: 6, moreHref: "/services" },
    { id: "proof", enabled: true },
    { id: "ai", enabled: true, tone: "muted", moreHref: "/technology" },
    { id: "dashboard", enabled: true, moreHref: "/technology" },
    { id: "specialties", enabled: true, tone: "muted", limit: 8, moreHref: "/specialties" },
    { id: "comparison", enabled: true, limit: 5, moreHref: "/why-mindlox-ai" },
    { id: "faq", enabled: true, tone: "muted", limit: 5, moreHref: "/resources#faq" },
    { id: "cta", enabled: true },

    // Available but off by default — flip `enabled` to bring one back to the home page.
    { id: "process", enabled: false },
    { id: "calculator", enabled: false, tone: "muted" },
    { id: "integrations", enabled: false, tone: "muted" },
    { id: "case-studies", enabled: false },
    { id: "testimonials", enabled: false, tone: "muted" },
    { id: "resources", enabled: false },
  ] satisfies HomeSection[],

  /** Closing CTA. */
  cta: {
    title: "Your revenue deserves a smarter strategy.",
    highlight: "smarter strategy.",
    description: "Let's identify where your practice is losing revenue — and build a plan to recover it.",
    primary: "Get My Free Revenue Audit",
    secondary: CTA.secondary,
    /** Show the four-step lead form beside the copy. */
    form: true,
  },
} as const;

export type HomeConfig = typeof HOME;
