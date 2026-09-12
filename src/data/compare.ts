import type { ComparisonRow } from "./content";

/* ------------------------------------------------------------------ */
/*  Competitor-chasing content. Category-level language only. Fair.    */
/*  Never names a company. Never claims a category "lacks" something   */
/*  beyond neutral description.                                        */
/* ------------------------------------------------------------------ */

export type CompareSlug = "traditional-billing-company" | "in-house-billing" | "ehr-bundled-billing";

export type ComparePage = {
  slug: CompareSlug;
  /** Short category noun, e.g. "a traditional billing company". */
  category: string;
  /** Column header for the alternative. */
  columnLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  framing: string;
  whenItMakesSense: { title: string; detail: string }[];
  gaps: { title: string; detail: string }[];
  rows: ComparisonRow[];
  switching: { title: string; detail: string }[];
  faq: { q: string; a: string }[];
};

export const COMPARE_PAGES: ComparePage[] = [
  {
    slug: "traditional-billing-company",
    category: "a traditional billing company",
    columnLabel: "Traditional billing company",
    title: "Mindlox AI vs. a traditional billing company",
    metaTitle: "Mindlox AI vs. Traditional Billing Company",
    metaDescription:
      "A fair, category-level comparison of Mindlox AI and traditional medical billing companies: visibility, denial intelligence, A/R strategy, communication, and specialty depth.",
    framing:
      "Both can work. A traditional billing company brings people and process to your claims; Mindlox AI brings people, process, and an intelligence layer that shows you where every dollar is. Here's how they differ in practice.",
    whenItMakesSense: [
      { title: "You want a familiar model", detail: "A conventional outsourced arrangement with monthly reporting can be enough for a small, single-specialty practice with a simple payer mix." },
      { title: "Price is the only variable", detail: "If the practice is optimizing purely for the lowest percentage-of-collections fee, a traditional vendor may quote lower and deliver a narrower scope." },
      { title: "You already have visibility", detail: "Practices with a strong internal analyst who audits the vendor's work may not need claim-level dashboards from the partner." },
    ],
    gaps: [
      { title: "Monthly PDFs, not live answers", detail: "Questions about a specific claim usually require a call or an email ticket." },
      { title: "Denials worked as they arrive", detail: "Without risk scoring before submission, the same denial types recur month after month." },
      { title: "Oldest-first A/R", detail: "A/R queues are often worked by age alone, not by recoverable value and timely-filing risk." },
      { title: "Generalist billers", detail: "One team across many specialties means less depth on your payer rules and code sets." },
      { title: "A shared inbox", detail: "Communication runs through a queue rather than a named account team with a weekly cadence." },
    ],
    rows: [
      { dimension: "Visibility", traditional: "Monthly reports; call to ask about a claim.", mindlox: "Live claim-level dashboards you open any time." },
      { dimension: "Denial intelligence", traditional: "Worked after they arrive.", mindlox: "Risk scored before submission; appeals prioritized by recoverable value." },
      { dimension: "A/R strategy", traditional: "Oldest-first or largest-first.", mindlox: "Value × likelihood × timely-filing risk, by payer." },
      { dimension: "Underpayments", traditional: "Caught if someone notices.", mindlox: "Every remit compared to contracted rates automatically." },
      { dimension: "Specialty depth", traditional: "Generalist teams across specialties.", mindlox: "Specialty-aligned coders and denial specialists." },
      { dimension: "Communication", traditional: "Shared inbox and ticket numbers.", mindlox: "Named account team, weekly reviews, clear escalation." },
      { dimension: "Reporting", traditional: "Static, after the fact.", mindlox: "Living, daily, with recommendations attached." },
      { dimension: "Scalability", traditional: "Adding providers means adding headcount.", mindlox: "New providers and locations onboard without losing visibility." },
    ],
    switching: [
      { title: "Parallel run", detail: "We run alongside your current vendor for a defined window so nothing drops." },
      { title: "Legacy A/R plan", detail: "We agree who works open balances and protect every timely-filing deadline." },
      { title: "Dashboards on day one", detail: "You see the transition happening — not a report about it a month later." },
    ],
    faq: [
      { q: "Is Mindlox AI more expensive than a traditional billing company?", a: "Pricing depends on scope, specialty, and volume and is provided after the free revenue audit. The comparison that matters is net collections after fees, which is what the audit estimates." },
      { q: "Do we lose the people we've worked with?", a: "You gain a named Mindlox AI account team. Where your existing vendor's staff hold institutional knowledge, we capture it during discovery and the parallel run." },
      { q: "What happens to claims already in flight?", a: "They keep moving. During the parallel run we agree on a cutover date for new charges and a plan for legacy A/R so no claim is orphaned." },
      { q: "How is this different from just a better vendor?", a: "The intelligence layer. Denial-risk scoring, underpayment detection, and A/R prioritization run on every claim, and you can see the results yourself instead of waiting for a report." },
    ],
  },
  {
    slug: "in-house-billing",
    category: "in-house billing",
    columnLabel: "In-house billing team",
    title: "Mindlox AI vs. in-house billing",
    metaTitle: "Mindlox AI vs. In-House Billing",
    metaDescription:
      "A fair comparison of Mindlox AI and an in-house medical billing team: control, coverage, specialty depth, technology, and what changes when the team scales.",
    framing:
      "Both can work. A strong in-house team knows your practice intimately; Mindlox AI adds scale, coverage, and an intelligence layer without asking you to give up control. Here's how they differ in practice.",
    whenItMakesSense: [
      { title: "Direct control matters most", detail: "Some owners prefer billers down the hall who can be redirected the same afternoon." },
      { title: "Deep local knowledge", detail: "A long-tenured biller who knows every patient, payer rep, and provider preference is a real asset." },
      { title: "Volume is small and stable", detail: "A solo practice with a simple payer mix and steady volume may be well served by one experienced person." },
    ],
    gaps: [
      { title: "Coverage gaps", detail: "Vacations, sick days, and turnover pause follow-up — and timely-filing clocks keep running." },
      { title: "Hiring for specialty depth", detail: "Finding, training, and retaining certified coders for each specialty is slow and expensive." },
      { title: "Technology on a practice budget", detail: "Denial-risk scoring, contract variance detection, and payer analytics are hard to build in-house." },
      { title: "The owner becomes the manager", detail: "Physicians and administrators end up supervising billing instead of running the practice." },
      { title: "Scaling means hiring", detail: "Every new provider or location adds headcount and management load." },
    ],
    rows: [
      { dimension: "Control", traditional: "Direct, same-day redirection.", mindlox: "A named account team with weekly reviews and clear escalation — you set the priorities." },
      { dimension: "Coverage", traditional: "Depends on one or two people being available.", mindlox: "Continuous coverage; follow-up never pauses for PTO or turnover." },
      { dimension: "Specialty expertise", traditional: "Limited to who you can hire locally.", mindlox: "Specialty-aligned coders and denial specialists on demand." },
      { dimension: "Technology", traditional: "Whatever the PM system offers.", mindlox: "AI-assisted denial risk, underpayment detection, and A/R prioritization on every claim." },
      { dimension: "Cost structure", traditional: "Salaries, benefits, training, software, management time.", mindlox: "Scope-based pricing aligned to collections." },
      { dimension: "Visibility", traditional: "Ask the team.", mindlox: "Live dashboards down to the claim, no asking required." },
      { dimension: "Compliance & audits", traditional: "Practice carries the training burden.", mindlox: "Coding audits, documentation feedback, and payer-policy tracking included." },
      { dimension: "Scalability", traditional: "Hire ahead of growth.", mindlox: "Add providers and locations without adding headcount." },
    ],
    switching: [
      { title: "Keep what works", detail: "Many practices keep a front-desk or patient-facing role in-house and hand the back end to Mindlox AI." },
      { title: "Knowledge transfer", detail: "We document payer quirks, provider preferences, and open issues with your team during discovery." },
      { title: "Hybrid is fine", detail: "Start with denials and A/R, or coding, and expand when you're ready." },
    ],
    faq: [
      { q: "Do we have to let our billing staff go?", a: "No. Many practices redeploy staff to patient access, eligibility, and patient communication — the front-end work that prevents denials — while Mindlox AI runs the back end." },
      { q: "Will we lose control over how our claims are handled?", a: "You set the priorities and see every claim in your dashboard. A named account team meets with you weekly and escalates anything that needs a decision." },
      { q: "Can we start with only part of the revenue cycle?", a: "Yes. Denial management, A/R recovery, coding, or credentialing can be engaged on their own and expanded later." },
      { q: "How does the cost compare to salaries?", a: "The free revenue audit models your fully loaded in-house cost against a scope-based engagement and, more importantly, the net collections difference." },
    ],
  },
  {
    slug: "ehr-bundled-billing",
    category: "EHR-bundled billing",
    columnLabel: "EHR-bundled billing",
    title: "Mindlox AI vs. EHR-bundled billing",
    metaTitle: "Mindlox AI vs. EHR-Bundled Billing",
    metaDescription:
      "A fair comparison of Mindlox AI and billing services bundled with an EHR or practice management platform: convenience, focus, specialty depth, and accountability.",
    framing:
      "Both can work. Billing bundled with your EHR is convenient and keeps everything with one vendor; Mindlox AI works inside that same EHR while bringing a dedicated team and an intelligence layer whose only job is your revenue. Here's how they differ in practice.",
    whenItMakesSense: [
      { title: "One vendor, one invoice", detail: "A single relationship for software and billing simplifies procurement and support." },
      { title: "Tight system integration", detail: "Billing built into the EHR avoids any question of data exchange." },
      { title: "Standardized workflows", detail: "For practices that fit the platform's default workflow, the bundle can be efficient." },
    ],
    gaps: [
      { title: "Billing is the add-on", detail: "The platform's core business is software; billing performance competes for attention." },
      { title: "One workflow for everyone", detail: "Specialty-specific rules and payer quirks may not fit a standardized queue." },
      { title: "Accountability by ticket", detail: "Escalations often route through software support rather than a revenue-cycle lead." },
      { title: "Reporting shaped by the platform", detail: "You see what the software reports, not necessarily the root causes behind denials." },
      { title: "Switching feels tied to the EHR", detail: "Practices sometimes assume changing billing means changing systems. It doesn't." },
    ],
    rows: [
      { dimension: "Focus", traditional: "Software first; billing as a service line.", mindlox: "Revenue cycle is the whole business." },
      { dimension: "System", traditional: "Inside the EHR.", mindlox: "Inside your EHR too — integration support and compatible workflows." },
      { dimension: "Specialty depth", traditional: "Standardized workflows across all clients.", mindlox: "Specialty-aligned playbooks, code sets, and payer rules." },
      { dimension: "Denial intelligence", traditional: "Platform-level edits.", mindlox: "Claim-level risk scoring plus human denial specialists and a prevention loop." },
      { dimension: "Underpayments", traditional: "Depends on the platform's contract tools.", mindlox: "Every remit compared to your contracted rates." },
      { dimension: "Accountability", traditional: "Support tickets.", mindlox: "Named account team, weekly reviews, monthly strategy sessions." },
      { dimension: "Reporting", traditional: "Platform dashboards.", mindlox: "Root-cause analytics with recommendations attached." },
      { dimension: "Flexibility", traditional: "Scope defined by the bundle.", mindlox: "Engage end-to-end or stage by stage." },
    ],
    switching: [
      { title: "Keep your EHR", detail: "Changing billing partners does not mean changing systems. We work within the platform you have." },
      { title: "Connectivity review", detail: "We review clearinghouse, ERA, and EFT enrollment so remittances keep flowing on day one." },
      { title: "Parallel run", detail: "A defined overlap window so claims never pause while the bundle winds down." },
    ],
    faq: [
      { q: "Do we have to leave our EHR to work with Mindlox AI?", a: "No. Mindlox AI works within the EHR and practice management systems you already use. Specific connectivity is confirmed during discovery." },
      { q: "Won't a bundled service always integrate better?", a: "Integration matters, and we work inside your system. What a bundle cannot add is a dedicated revenue-cycle team and an intelligence layer focused only on getting you paid." },
      { q: "What about our software contract?", a: "Software and billing are usually separate terms. We review your agreement with you and plan the parallel run around any notice period." },
      { q: "Can we keep the bundle for some things?", a: "Often yes — for example, patient statements through the platform while Mindlox AI runs coding, denials, and A/R. We map this during discovery." },
    ],
  },
];

export const getComparePage = (slug: string) => COMPARE_PAGES.find((c) => c.slug === slug);

/* ---------------------------- /switch ------------------------------ */

export type SwitchStep = { n: string; title: string; detail: string; when: string };

export const SWITCH_STEPS: SwitchStep[] = [
  { n: "01", title: "Discovery & data access", detail: "We map your specialties, payer mix, systems, open A/R, and current vendor arrangement. Read-only access is set up so nothing changes yet.", when: "Week 1" },
  { n: "02", title: "Parallel-run planning", detail: "A defined overlap window, a cutover date for new charges, and a shared checklist so both teams know who owns what.", when: "Week 1–2" },
  { n: "03", title: "Credentialing & payer connectivity review", detail: "Provider enrollment status, CAQH, and EDI / ERA / EFT connections are reviewed so remittances and payments keep flowing.", when: "Week 2" },
  { n: "04", title: "Open A/R strategy", detail: "We agree who works legacy balances, segment them by payer and value, and protect every timely-filing deadline.", when: "Week 2–3" },
  { n: "05", title: "Go-live with dashboards on day one", detail: "Your dedicated team takes new charges. You watch the transition in your dashboard — not in a report a month later.", when: "Week 3–4" },
  { n: "06", title: "30 / 60 / 90-day optimization reviews", detail: "Structured reviews on clean claim rate, denial trends, A/R days, and payer performance, with a prevention loop back to your front desk.", when: "Ongoing" },
];

export const WHAT_YOU_KEEP = [
  { title: "Your EHR / PM system", detail: "We work inside the systems you already use. Changing billing partners does not mean changing software." },
  { title: "Your fee schedules & contracts", detail: "Loaded and maintained so every remit can be checked against what you should be paid." },
  { title: "Your patient relationships", detail: "Patient statements and follow-up are clear and respectful — your name, your tone, our process." },
  { title: "Your data", detail: "Claim history, reports, and audit trails are yours. Findings from the revenue audit are yours whether or not we work together." },
];

export const SWITCH_OBJECTIONS = [
  { q: "Will we lose visibility during the switch?", a: "The opposite. Dashboards are on from day one of go-live, and during the parallel run you see both the legacy A/R plan and new charges in one place." },
  { q: "Is switching painful?", a: "It is designed not to be. A parallel run, a single cutover date for new charges, and a shared checklist mean no claim is orphaned and your staff always know who to call." },
  { q: "Who works our old A/R?", a: "We decide together during discovery. Options include Mindlox AI taking all open balances, a split by date of service, or your current vendor finishing a defined tail — with timely-filing deadlines tracked either way." },
  { q: "Can you handle our specialty?", a: "30+ specialties and growing, with specialty-aligned coders and denial specialists. Discovery confirms fit before anything moves." },
  { q: "Do you work with our EHR?", a: "We support compatible workflows with major EHR and PM platforms and work within the system you have. Specific connectivity is confirmed during discovery." },
  { q: "What about our current contract?", a: "We review your agreement's notice period and terms with you and plan the parallel run around them. Nothing is cancelled until the transition plan is agreed." },
];
