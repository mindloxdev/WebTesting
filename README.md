# Mindlox AI — Website Concepts

Ten category-defining homepage concepts, a `/demos` selector, and a full SEO page architecture for **Mindlox AI** (medical billing + revenue cycle intelligence), built from `Samples or ideas/mindlox-ai-master-prompt-v2.md`.

## Run it

**Windows, one click:** double-click `start.bat` (development) or `start-production.bat` (optimized build). Both install dependencies on first run, start the server on port 3000, and open the browser at `/demos`. `Start Mindlox AI Site.bat` in the parent folder does the same. Pass a port as the first argument to use a different one, e.g. `start.bat 4000`.

**Terminal:**

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Where things are

| Path | What |
|---|---|
| `/` | Home — a focused landing page composed from `src/content/home.ts` (see `CONTENT-GUIDE.md`); the full-length flagship stays at `/demos/ultimate` |
| `/revenue-leakage-calculator` | Free self-serve calculator (linked from Resources and the home page) |
| `/demos` | Concept selector with live previews |
| `/demos/<slug>` | The ten concepts: `revenue-engine`, `revenue-leakage`, `ai-human`, `billing-department`, `transparency`, `enterprise`, `specialty-first`, `command-center`, `growth-partner`, `ultimate` |
| `/services`, `/medical-billing`, `/denial-management`, … | Service pages (10 SEO root pages + catalogue) |
| `/specialties`, `/specialties/<slug>` | 25 specialty pages |
| `/switch`, `/compare/<category>` | Competitor-chasing pages (category-level, never named competitors) |
| `/solutions`, `/why-mindlox-ai`, `/technology`, `/resources`, `/about`, `/contact` | Company pages |

Inside every concept page a floating switcher (bottom-left on desktop) moves between concepts. The navbar theme button cycles **Concept default → White → Dark** for the whole site; the choice is remembered in the browser.

## Editing content

`CONTENT-GUIDE.md` maps every piece of text, number, link, and section to the one file that controls it. The home page is driven entirely by `src/content/home.ts` (copy, order, on/off per section, limits).

## Code map

```
src/app/                 routes (App Router), globals.css (design tokens)
src/data/                typed content + demo data (services, specialties, lifecycle, dashboard, concepts…)
src/components/ui/       primitives: Reveal, TextReveal, AnimatedNumber, MagneticButton, Card, Logo, DemoBadge, ThemeToggle…
src/components/layout/   Navbar (glass, mega menus, mobile drawer), Footer, MobileCTABar, Frame / ConceptFrame, ConceptSwitcher
src/components/charts/   Line, Bar, Donut, Sparkline — draw themselves on entry
src/components/visuals/  CommandCenter, AIDetectionFeed, ClaimJourney, LeakageCalculator, Lifecycle, SpecialtyMorph, LeadForm…
src/components/sections/ the shared homepage sections (problem, lifecycle, services, calculator, AI, dashboard, …, FAQ, final CTA)
src/concepts/<slug>/     concept-specific hero visuals and signature interactions
```

## Design system

Tokens live once in `src/app/globals.css` (Tailwind v4 `@theme`): palette, display type scale, radii, elevation, easing, animations. Semantic tokens (`--bg`, `--fg`, `--accent`, …) switch with `data-scheme="dark|light"` and per-concept `.theme-*` classes, so every component adapts automatically. Motion honors `prefers-reduced-motion` globally.

## Integrity rules (baked in)

- All sample numbers are labeled **Demo Data / Illustrative Estimate / Example Dashboard / Placeholder** via `DemoBadge`.
- No fabricated clients, testimonials, awards, certifications, or confirmed integrations. Replace every `[X]`, `[Client Name]`, `[Confirm before publishing]` before launch.
- Competitor language is category-level only.
- AI language is "AI-assisted", "decision support", "pattern detection" — never guarantees.
- The lead form is a demo: nothing is sent. Wire `LeadForm` to your CRM before launch.

## Before publishing

1. Replace placeholder metrics, testimonials, case studies, leadership, address/phone/email.
2. Confirm BAA/HIPAA/security statements with counsel.
3. Confirm EHR/PM connectivity claims per system.
4. Connect the lead form and set the real domain in `src/app/layout.tsx` (`metadataBase`) and `src/app/sitemap.ts`.
