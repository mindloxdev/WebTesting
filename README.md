# Mindlox AI — Website

The Mindlox AI marketing site (medical billing + revenue cycle intelligence): a focused home page plus a full SEO page architecture for services, specialties, solutions, technology, and company pages.

## Run it

**Windows, one click:** double-click `start.bat` (development) or `start-production.bat` (optimized build). Both install dependencies on first run, start the server on port 3000, and open the browser at the home page. `Start Mindlox AI Site.bat` in the parent folder does the same. Pass a port as the first argument to use a different one, e.g. `start.bat 4000`.

**Terminal:**

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Where things are

| Path | What |
|---|---|
| `/` | Home — a focused landing page composed from `src/content/home.ts` (see `CONTENT-GUIDE.md`) |
| `/revenue-leakage-calculator` | Free self-serve calculator with the scroll-driven leak reveal (linked from Resources and the home page) |
| `/blog`, `/blog/<slug>` | Blog index and articles (content in `src/data/blog.ts`) |
| `/careers` | Careers: why join, roles we hire for, how to apply |
| `/policies`, `/privacy`, `/terms`, `/security` | Policies hub and the three policy documents |
| `/services`, `/medical-billing`, `/out-of-network-negotiations`, … | Service pages (11 SEO root pages + catalogue) |
| `/specialties`, `/specialties/<slug>` | 25 specialty pages |
| `/switch`, `/compare/<category>` | Competitor-chasing pages (category-level, never named competitors) |
| `/solutions`, `/why-mindlox-ai`, `/technology`, `/resources`, `/about`, `/contact` | Company pages |

The navbar theme button cycles **Default → White → Dark** for the whole site; the choice is remembered in the browser.

## Editing content

`CONTENT-GUIDE.md` maps every piece of text, number, link, and section to the one file that controls it. The home page is driven entirely by `src/content/home.ts` (copy, order, on/off per section, limits).

## Code map

```
src/app/                 routes (App Router), globals.css (design tokens)
src/data/                typed content + demo data (services, specialties, lifecycle, dashboard…)
src/content/home.ts      the home page: copy, section order, on/off, density
src/data/blog.ts         blog articles (title, excerpt, category, date, body blocks)
src/app/api/lead/        the lead-form endpoint (SMTP via nodemailer; see .env.example)
src/components/ui/       primitives: Reveal, TextReveal, AnimatedNumber, MagneticButton, Card, Logo, DemoBadge, ThemeToggle…
src/components/layout/   Navbar (glass, mega menus, mobile drawer), Footer, MobileCTABar, Frame
src/components/charts/   Line, Bar, Donut, Sparkline — draw themselves on entry
src/components/visuals/  CommandCenter, AIDetectionFeed, ClaimJourney, RevenueEngine, LeakReveal, StatusTimeline, Handoff, OrgSelector, TeamAssembly, BeforeAfter, SpecialtyMorph, LeadForm…
src/components/sections/ the shared page sections (problem, lifecycle, services, AI, dashboard, KPI deep-dive, assistant, trust architecture, …, FAQ, final CTA)
src/components/home/     the home hero (living revenue ecosystem), proof-of-system band, and the home page composer
src/templates/seo/       the service and specialty page templates + per-service content
src/templates/company/   compare, switch-timeline, and legal page templates
```

## Design system

Tokens live once in `src/app/globals.css` (Tailwind v4 `@theme`): palette, display type scale, radii, elevation, easing, animations. Semantic tokens (`--bg`, `--fg`, `--accent`, …) switch with `data-scheme="dark|light"` and the `.theme-ultimate` accent class, so every component adapts automatically. Motion honors `prefers-reduced-motion` globally.

## Integrity rules (baked in)

- Sample numbers in dashboards, feeds, and calculators are labeled **Sample data / Illustrative / Example dashboard** via `DemoBadge`.
- No fabricated clients, testimonials, awards, certifications, or confirmed integrations.
- Competitor language is category-level only.
- AI language is "AI-assisted", "decision support", "pattern detection" — never guarantees.
- The lead form posts to `/api/lead`, which emails each submission through SMTP (variables in `.env.example`). Until SMTP is configured, the form opens the visitor's email app with the details prefilled, so nothing is lost.

## Before publishing

1. Set the SMTP variables from `.env.example` in your hosting environment so lead-form submissions are emailed to you. Phone, email, and address live in `CONTACT` in `src/data/site.ts`.
2. Confirm BAA/HIPAA/security statements with counsel.
3. Confirm EHR/PM connectivity claims per system.
4. If the site is not served at mindlox.ai, update `metadataBase` in `src/app/layout.tsx` and `BASE` in `src/app/sitemap.ts`.

## Lead form

The four-step form on `/contact` (and in every closing CTA) posts to `src/app/api/lead/route.ts`,
which emails each submission over SMTP. Set these in Vercel → Settings → Environment Variables
(Production and Preview). None of them may ever carry a `NEXT_PUBLIC_` prefix.

| Variable | Required | Notes |
|---|---|---|
| `LEAD_SMTP_HOST` | yes | e.g. `smtp.resend.com`, `smtp.postmarkapp.com` |
| `LEAD_SMTP_PORT` | no | defaults to `587`; `465` switches to implicit TLS |
| `LEAD_SMTP_USER` | yes | SMTP username |
| `LEAD_SMTP_PASS` | yes | SMTP password or API key |
| `LEAD_TO` | no | delivery inbox, defaults to `CONTACT.email` |
| `LEAD_FROM` | no | envelope sender, defaults to `LEAD_SMTP_USER` |

Until SMTP is configured the route returns 503 and the browser opens the visitor's mail client
with the submission prefilled, so a lead is never silently lost.

The route enforces POST only, an 8 KB body cap, zod validation with strict enums, a honeypot,
a minimum fill time, and a per-IP rate limit of 10 requests per 10 minutes.

**Rate limiting is in-memory**, so it is per serverless instance and resets on cold start. That is
adequate for marketing-form volume. For a durable, cross-region limit, add
`@upstash/ratelimit` and `@vercel/kv` (or Upstash Redis), set `KV_REST_API_URL` and
`KV_REST_API_TOKEN`, and replace the `rateLimited()` function in the route.
