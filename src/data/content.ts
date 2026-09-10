/* ------------------------------------------------------------------ */
/*  Shared marketing content: problems, comparison, process, FAQ,      */
/*  integrations, resources, placeholders. All demo content is labeled */
/*  where it appears. Nothing here is a fabricated statistic.          */
/* ------------------------------------------------------------------ */

export type Problem = { title: string; detail: string; stat?: string };

export const PROBLEMS: Problem[] = [
  { title: "Denials", detail: "Preventable denials pile up, get reworked late, or never get appealed at all." },
  { title: "Slow Payments", detail: "Claims sit in queues. Payers take their time. Cash flow becomes unpredictable." },
  { title: "Aging A/R", detail: "Balances drift past 90, 120, then timely-filing limits — and quietly become write-offs." },
  { title: "Coding Errors", detail: "Missed modifiers, wrong levels, and unspecific diagnoses leave revenue on the table." },
  { title: "Eligibility Problems", detail: "Inactive coverage discovered after the visit becomes a denial or a patient balance." },
  { title: "Credentialing Delays", detail: "New providers see patients for months before payers will reimburse them." },
  { title: "Underpayments", detail: "Payers reimburse below contract and nobody is checking the math." },
  { title: "Administrative Burden", detail: "Clinicians and staff spend hours chasing claims instead of caring for patients." },
];

export type ComparisonRow = { dimension: string; traditional: string; mindlox: string };

export const COMPARISON: ComparisonRow[] = [
  { dimension: "Visibility", traditional: "Monthly PDF reports; you call to ask about a claim.", mindlox: "Live dashboards down to the claim. You never chase your billing partner." },
  { dimension: "Automation", traditional: "Manual queues and spreadsheets.", mindlox: "Intelligent automation across eligibility, scrubbing, posting, and follow-up." },
  { dimension: "Analytics", traditional: "Volume and collections totals.", mindlox: "Net collection rate, A/R aging, payer performance, denial root causes." },
  { dimension: "Denial Intelligence", traditional: "Work denials as they arrive.", mindlox: "Predict denial risk before submission; prioritize appeals by recoverable value." },
  { dimension: "A/R Strategy", traditional: "Oldest-first or largest-first.", mindlox: "Value × likelihood × timely-filing risk, worked by payer strategy." },
  { dimension: "Communication", traditional: "A shared inbox and a ticket number.", mindlox: "A named account team, weekly reviews, and clear escalation paths." },
  { dimension: "Specialty Expertise", traditional: "Generalist billers across every specialty.", mindlox: "Specialty-aligned coders and denial specialists who know your payer rules." },
  { dimension: "Technology", traditional: "Whatever the PM system does.", mindlox: "AI-assisted intelligence layered on the systems you already use." },
  { dimension: "Reporting", traditional: "Static, monthly, after the fact.", mindlox: "Living, daily, with recommendations attached." },
  { dimension: "Scalability", traditional: "Adding providers means adding headcount.", mindlox: "Onboard new providers, locations, and specialties without losing visibility." },
];

export type ProcessStep = { n: string; title: string; detail: string; duration: string };

export const PROCESS: ProcessStep[] = [
  { n: "01", title: "Discovery", detail: "We learn your specialties, payer mix, systems, and where revenue hurts today.", duration: "Week 1" },
  { n: "02", title: "Revenue Audit", detail: "A structured review of denials, A/R aging, coding patterns, and underpayments — with findings you keep.", duration: "Weeks 1–2" },
  { n: "03", title: "Transition Planning", detail: "Parallel-run plan, data access, workflow mapping, and a no-disruption cutover timeline.", duration: "Weeks 2–3" },
  { n: "04", title: "Implementation", detail: "Your dedicated team goes live with eligibility, coding, claims, posting, and A/R — dashboards on from day one.", duration: "Weeks 3–6" },
  { n: "05", title: "Continuous Optimization", detail: "Weekly reviews, monthly strategy sessions, and prevention loops that keep improving the cycle.", duration: "Ongoing" },
];

export type Integration = { name: string; note?: string };

/** Wording rule: "integration support" / "compatible workflows" — never a confirmed integration. */
export const INTEGRATIONS: Integration[] = [
  { name: "Epic" },
  { name: "athenahealth" },
  { name: "eClinicalWorks" },
  { name: "NextGen" },
  { name: "AdvancedMD" },
  { name: "Tebra" },
  { name: "DrChrono" },
  { name: "CareCloud" },
  { name: "CureMD" },
  { name: "Other PM systems", note: "[Confirm additional systems]" },
];

export type Resource = { title: string; category: string; blurb: string; href: string; readTime: string };

export const RESOURCES: Resource[] = [
  { title: "Medical Billing Guides", category: "Guide", blurb: "Foundations of clean claims, from charge entry to first-pass acceptance.", href: "/resources#guides", readTime: "12 min" },
  { title: "RCM Insights", category: "Insight", blurb: "How modern practices measure and improve the full revenue cycle.", href: "/resources#insights", readTime: "8 min" },
  { title: "Denial Management Guides", category: "Guide", blurb: "Building a denial taxonomy, prioritizing appeals, and closing the prevention loop.", href: "/resources#denials", readTime: "10 min" },
  { title: "Coding Updates", category: "Update", blurb: "Annual CPT, ICD-10-CM, and HCPCS changes that affect your specialty.", href: "/resources#coding", readTime: "6 min" },
  { title: "Credentialing Resources", category: "Guide", blurb: "Checklists and timelines for payer enrollment and re-credentialing.", href: "/resources#credentialing", readTime: "7 min" },
  { title: "Healthcare Revenue Reports", category: "Report", blurb: "Benchmarks and trends across payers, specialties, and A/R performance.", href: "/resources#reports", readTime: "15 min" },
  { title: "Case Studies", category: "Case Study", blurb: "Before, approach, and results — published once verified.", href: "/resources#case-studies", readTime: "5 min" },
  { title: "FAQ", category: "FAQ", blurb: "Straight answers on onboarding, pricing, security, and specialties.", href: "/resources#faq", readTime: "4 min" },
];

export type FAQItem = { q: string; a: string };

export const FAQ: FAQItem[] = [
  { q: "What does Mindlox AI handle?", a: "The entire revenue cycle — patient registration, eligibility, authorization, charge capture, coding, claim creation and scrubbing, submission, payment posting, denial management, A/R follow-up, appeals, patient billing, and reporting. You can engage us end-to-end or for specific stages." },
  { q: "Do you work with small practices?", a: "Yes. Solo and small group practices get the same dedicated team model, dashboards, and specialty expertise — scaled to the size of the practice." },
  { q: "Do you support multi-specialty groups?", a: "Yes. Multi-specialty groups get specialty-aligned coders and denial specialists, with consolidated reporting across locations and providers." },
  { q: "Which specialties do you support?", a: "Twenty-five and growing, including primary care, cardiology, orthopedics, behavioral health, dermatology, urgent care, radiology, oncology, physical therapy, DME, laboratory, and telehealth. See the Specialties page for the full list." },
  { q: "Do you handle credentialing?", a: "Yes — provider credentialing, payer enrollment, CAQH maintenance, re-credentialing calendars, and EDI/ERA/EFT connectivity." },
  { q: "How do you handle denied claims?", a: "Denials are categorized by root cause, prioritized by recoverable value and timely-filing risk, appealed with payer-specific documentation, and fed back into front-end prevention so the same denial does not recur." },
  { q: "Do you follow up on A/R?", a: "Yes. Insurance and patient A/R is segmented by age, payer, and value, then worked on a defined cadence with full visibility in your dashboard." },
  { q: "Do you work with our existing EHR / PM system?", a: "We work within the systems you already use and support compatible workflows with major EHR and PM platforms. Specific connectivity is confirmed during discovery." },
  { q: "What does onboarding look like?", a: "Discovery, a revenue audit, transition planning with a parallel-run option, implementation with your dedicated team, then continuous optimization. Most transitions are designed so your revenue never pauses." },
  { q: "How is pricing structured?", a: "Pricing depends on scope, specialty, and volume and is provided after the free revenue audit. [Pricing model placeholder — confirm with Mindlox AI.]" },
  { q: "What is the free revenue audit?", a: "A structured review of your denials, A/R aging, coding patterns, and underpayment exposure. You receive the findings whether or not you work with us." },
  { q: "How is patient information protected?", a: "HIPAA-conscious workflows, role-based access controls, audit logging, and secure data handling. Security documentation is available on request. [Confirm specific certifications before publishing.]" },
  { q: "Do you sign Business Associate Agreements?", a: "Yes, where applicable, Mindlox AI enters into BAAs with covered entities. [Confirm legal language before publishing.]" },
  { q: "How does Mindlox AI use AI?", a: "AI assists — it does not replace — our billing professionals. It scores denial risk, detects underpayments and eligibility mismatches, prioritizes work queues, and surfaces patterns across payers. Humans make the decisions." },
  { q: "Can you handle high claim volume?", a: "Yes. Automation handles the repetitive work at scale while specialists focus on exceptions, so volume grows without losing accuracy or visibility." },
];

export type CaseStudy = { specialty: string; size: string; before: string[]; approach: string[]; results: string[] };

/** Placeholder structure — replace with verified, authorized case studies. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    specialty: "[Specialty] Group",
    size: "[X] providers · [X] locations",
    before: ["Denial rate trending up", "A/R over 90 days growing", "No visibility into payer performance"],
    approach: ["Denial root-cause taxonomy", "A/R segmentation and timely-filing protection", "Live dashboards for leadership"],
    results: ["[XX]% reduction in denial rate", "[XX] fewer A/R days", "$[X] recovered from aged A/R"],
  },
  {
    specialty: "[Specialty] Practice",
    size: "[X] providers",
    before: ["Coding-related denials", "Underpayments going unnoticed", "Staff overwhelmed by follow-up"],
    approach: ["Specialty coding audit and education", "Contract variance detection", "Dedicated A/R team"],
    results: ["[XX]% clean claim rate", "$[X] in underpayments recovered", "[XX] staff hours per week returned"],
  },
  {
    specialty: "[Organization Type]",
    size: "[X] providers · multi-specialty",
    before: ["Credentialing delays blocking revenue", "Inconsistent eligibility checks", "Monthly-only reporting"],
    approach: ["Credentialing calendar and payer enrollment", "Pre-visit eligibility workflow", "Weekly performance reviews"],
    results: ["[XX] days faster provider enrollment", "[XX]% fewer eligibility denials", "Daily KPI visibility"],
  },
];

export type Testimonial = { quote: string; name: string; role: string };

/** Demo testimonials — clearly labeled in the UI. Replace with verified client testimonials. */
export const TESTIMONIALS: Testimonial[] = [
  { quote: "[Demo testimonial — replace with verified client testimonial.] For the first time we can see exactly where every claim is without calling anyone.", name: "[Client Name]", role: "Practice Administrator, [Specialty] Group" },
  { quote: "[Demo testimonial — replace with verified client testimonial.] Denials that used to sit for weeks are now prioritized and appealed before we even ask.", name: "[Client Name]", role: "Physician Owner, [Specialty] Practice" },
  { quote: "[Demo testimonial — replace with verified client testimonial.] It feels like an extension of our team, not a vendor we have to manage.", name: "[Client Name]", role: "CFO, [Organization Type]" },
];

export const WHY_SWITCH = [
  { title: "Poor visibility", detail: "You find out about problems in a monthly report — or never." },
  { title: "Slow denial follow-up", detail: "Denials sit for weeks; appeal deadlines pass quietly." },
  { title: "Rising A/R days", detail: "Balances drift into 90+ and become write-offs." },
  { title: "Generic reporting", detail: "Totals without root causes, payer detail, or recommendations." },
  { title: "Can't reach your team", detail: "A shared inbox and a ticket number instead of a named person." },
  { title: "Specialty gaps", detail: "Generalist billers who don't know your payer rules." },
];

export const ORG_TYPES = ["Solo Practice", "Group Practice", "Multi-Specialty Group", "Hospital", "ASC", "Urgent Care", "Behavioral Health", "Other"];
export const PROVIDER_COUNTS = ["1", "2–5", "6–20", "21–50", "50+"];
export const NEEDS = ["Medical Billing", "Coding", "Denials", "A/R", "Credentialing", "Full RCM", "Practice Management", "Other"];

export const AI_CAPABILITIES = [
  { title: "Denial Risk", detail: "Scores each claim for denial likelihood before submission." },
  { title: "Coding Issues", detail: "Flags modifier, specificity, and NCCI conflicts for coder review." },
  { title: "Eligibility Errors", detail: "Detects coverage mismatches between registration and payer response." },
  { title: "Underpayments", detail: "Compares remittances to contracted rates line by line." },
  { title: "A/R Priorities", detail: "Ranks follow-up by value, likelihood, and timely-filing risk." },
  { title: "Payer Patterns", detail: "Surfaces systematic payer behavior across thousands of claims." },
  { title: "Claim Anomalies", detail: "Highlights outliers in charges, units, and diagnosis pairings." },
];

export const TARGET_ORGS = [
  "Physician Groups",
  "Multi-Specialty Practices",
  "Hospitals",
  "Ambulatory Surgery Centers",
  "Urgent Care",
  "Behavioral Health",
  "Specialty Clinics",
  "Laboratories",
  "DME Suppliers",
  "Telehealth Organizations",
];
