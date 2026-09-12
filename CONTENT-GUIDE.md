# Mindlox AI — Content Guide

Everything you might want to change, and the one file to change it in. No component code needs to be touched for text, numbers, links, or ordering.

## The home page (`/`)

`src/content/home.ts` controls the whole landing page.

| You want to… | Edit |
|---|---|
| Change the headline, gradient phrase, support text, buttons, trust line | `HOME.hero` |
| Reorder sections | move entries in `HOME.sections` |
| Hide or show a section | `enabled: true / false` on that entry |
| Show more or fewer services, specialties, comparison rows, FAQ items | `limit` on that entry |
| Point a section's "see more" link elsewhere | `moreHref` on that entry |
| Change the closing CTA copy or hide the lead form | `HOME.cta` |
| Change the browser title / description | `HOME.seo` |

Sections switched off by default are still available: proof, dashboard, comparison, FAQ, process, calculator, integrations, case studies, testimonials, resources. Flip `enabled` to bring one back. Nothing is deleted — each one also lives on its tab page. `HOME.layout.compact` tightens the spacing of every section so the page stays short; set it to `false` for the roomier spacing.

**Adding a brand-new section:** add an id to `HomeSectionId` in `src/content/home.ts`, register a component for it in `src/components/home/HomePage.tsx` (one line in `REGISTRY`), then list it in `HOME.sections`.

## Where each block lives on the tabs

| Block | Tab page |
|---|---|
| All 25 services, catalogue by category, 14-stage lifecycle, 5-step process | **Services** → `/services`, plus one page per core service (`/medical-billing`, …) |
| Specialty explorer (morph) and all 25 specialty cards | **Specialties** → `/specialties`, plus `/specialties/<slug>` |
| Solutions by organization type | **Solutions** → `/solutions` |
| Full comparison table, why practices switch, testimonials, case studies | **Why Mindlox AI** → `/why-mindlox-ai` (also `/switch`, `/compare/…`) |
| AI section, full tabbed command center, EHR integrations, security | **Technology** → `/technology` |
| Blog articles, full FAQ, **Revenue Leakage Calculator** | **Resources** → `/resources`, `/blog`, `/revenue-leakage-calculator` |
| Mission, principles, how we work | **About** → `/about`; careers at `/careers`; policies at `/policies` |
| Four-step lead form | **Contact** → `/contact` |

## Shared copy and data (used by every page)

| File | Holds |
|---|---|
| `src/data/site.ts` | Brand name, CTA labels and links, navigation menus, footer columns, trust pillars, outcome metrics, `CONTACT` (phone, email, address), `SPECIALTY_COUNT` |
| `src/data/services.ts` | The 25 services (name, one-liner, description, outcomes, category, which ten get root pages) |
| `src/data/specialties.ts` | The 25 specialties (tagline, challenges, coding notes, denial types, workflow, solutions, accent hue) |
| `src/data/lifecycle.ts` | The 14 revenue-cycle stages and the AI note for each |
| `src/data/content.ts` | Problem cards, comparison rows, process steps, EHR list, FAQ, AI capabilities, organization types, lead-form options |
| `src/data/blog.ts` | Blog posts: title, excerpt, category, date, and body blocks (paragraphs, headings, lists, quotes) |
| `src/data/dashboard.ts` | Demo numbers: metrics, charts, detections, assistant messages, the sample claim journey, leak causes, team roles |
| `src/data/compare.ts` | Copy for `/switch` and the three `/compare/…` pages |
| `src/templates/seo/service-content.ts` | Per-service headlines, steps, FAQs, and the optional `signature` visual (revenue engine, claim status board, or AI handoff) for the eleven service pages |

Sample numbers in dashboards and calculators are illustrative and labeled in the UI.

## Look and feel

| You want to… | Edit |
|---|---|
| Brand colors, accent palette, radii, shadows, type scale | `src/app/globals.css` (`@theme` block and `.theme-ultimate`) |
| Fonts | `src/app/layout.tsx` (Geist for text, Manrope for headlines) |
| Logo mark | `src/components/ui/Logo.tsx` and `src/app/icon.svg` |
| Navigation items | `NAV` in `src/data/site.ts` |
| Default theme (default / white / dark) | visitors use the navbar toggle; the choice is remembered per browser |

## Adding a page

1. Create `src/app/<route>/page.tsx`.
2. Wrap it in `<Frame scheme="light" theme="theme-ultimate">` (or `scheme="dark"`).
3. Start with `<PageHero … />`, compose from `@/components/sections`, end with `<FinalCTA />`.
4. Add the route to `src/app/sitemap.ts` and, if it belongs in a menu, to `NAV` or `FOOTER_COLUMNS` in `src/data/site.ts`.

## Running

`start.bat` (development, live-reload as you edit) or `start-production.bat` (fast optimized build). See `README.md`.
