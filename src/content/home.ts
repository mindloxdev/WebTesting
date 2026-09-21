/* ------------------------------------------------------------------ */
/*  HOME PAGE CONTENT — the one file to edit for the landing page.     */
/*                                                                      */
/*  • Change any text below and the home page updates.                  */
/*  • Reorder sections by moving entries in `sections`.                 */
/*  • Hide a section with `enabled: false` (nothing is deleted — every  */
/*    section still lives on its tab page: /services, /specialties,     */
/*    /technology, /why-mindlox-ai, /resources).                        */
/*  • `layout.compact` keeps the page short: tighter section spacing.   */
/*  • Add a section: add its id to `HomeSectionId` and register a       */
/*    component in src/components/home/HomePage.tsx.                    */
/*                                                                      */
/*  Shared copy (nav, CTAs, services, specialties, FAQ, comparison,     */
/*  sample numbers, contact details) lives in src/data/*.               */
/*  See CONTENT-GUIDE.md.                                               */
/* ------------------------------------------------------------------ */

import { CTA } from "@/data/site";

export type HomeSectionId =
  | "trust" // trust strip: the five trust pillars
  | "problem" // "They have a revenue problem" cards
  | "lifecycle" // the 14-stage revenue cycle
  | "services" // compact services preview → /services
  | "proof" // Humans + Technology + Intelligence band (off by default)
  | "ai" // "Meet the intelligence" → /technology (off by default)
  | "dashboard" // compact command center → /technology (off by default)
  | "specialties" // featured specialties → /specialties
  | "comparison" // short comparison table → /why-mindlox-ai (off by default)
  | "process" // 5-step onboarding (off by default; lives on /services and /about)
  | "calculator" // leakage calculator (on: this is the only place it lives)
  | "integrations" // EHR ecosystem (off by default; lives on /technology)
  | "faq" // short FAQ → /resources#faq (off by default)
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
  /** AI section only: show the live detection feed under the visual. */
  feed?: boolean;
};

export const HOME = {
  /** <title> and description for search engines and link previews. */
  seo: {
    title: "Mindlox AI — Medical Billing & Revenue Cycle Intelligence",
    description:
      "Mindlox AI combines medical billing expertise, intelligent automation, and revenue-cycle intelligence to help U.S. healthcare organizations get paid faster, reduce denials, and recover lost revenue.",
  },

  /** Page density. `compact: true` shortens the hero, tightens section spacing, and steps the display type down one size. */
  layout: { compact: true },

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
    trust: ["HIPAA-conscious workflows", "U.S. healthcare focus", "End-to-end RCM"],
  },

  /** Order and visibility of the sections under the hero. Kept short on purpose — one scroll, one story. */
  sections: [
    { id: "trust", enabled: true },
    { id: "problem", enabled: true, ctaHref: "#calculator" },
    { id: "lifecycle", enabled: true, tone: "muted" },
    { id: "services", enabled: true, limit: 6, moreHref: "/services" },
    { id: "specialties", enabled: true, tone: "muted", limit: 4, moreHref: "/specialties" },
    { id: "calculator", enabled: true },
    { id: "cta", enabled: true },

    // Available but off by default — flip `enabled` to bring one back to the home page.
    { id: "ai", enabled: false, moreHref: "/technology", feed: false },
    { id: "proof", enabled: false },
    { id: "dashboard", enabled: false, moreHref: "/technology" },
    { id: "comparison", enabled: false, limit: 5, moreHref: "/why-mindlox-ai" },
    { id: "faq", enabled: false, tone: "muted", limit: 5, moreHref: "/resources#faq" },
    { id: "process", enabled: false },
    { id: "integrations", enabled: false, tone: "muted" },
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
