export const BRAND = {
  name: "Mindlox AI",
  wordmark: "MINDLOX",
  suffix: "AI",
  tagline: "The next generation of medical billing + revenue cycle intelligence.",
  year: 2026,
} as const;

export const CTA = {
  primary: "Get a Free Revenue Audit",
  primaryShort: "Free Revenue Audit",
  primaryHover: "Start Your Revenue Review",
  secondary: "Talk to an RCM Specialist",
  tertiary: "Explore Our RCM",
  leaks: "Find My Revenue Leaks",
  specialty: "Explore My Specialty",
  command: "Experience the Command Center",
  auditHref: "/contact",
  specialistHref: "/contact?intent=specialist",
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = {
  label: string;
  href: string;
  mega?: { columns: { title: string; links: NavLink[] }[] };
};

export const NAV: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    mega: {
      columns: [
        {
          title: "Core revenue cycle",
          links: [
            { label: "Medical Billing", href: "/medical-billing", description: "Clean claims, fast submission, follow-through." },
            { label: "Revenue Cycle Management", href: "/revenue-cycle-management", description: "Front desk to final payment, one partner." },
            { label: "Medical Coding", href: "/medical-coding", description: "CPT, ICD-10, HCPCS accuracy by specialty." },
            { label: "Denial Management", href: "/denial-management", description: "Prevent, prioritize, appeal, learn." },
            { label: "A/R Recovery", href: "/ar-recovery", description: "Aging balances worked by strategy, not queue." },
          ],
        },
        {
          title: "Front end & enrollment",
          links: [
            { label: "Credentialing", href: "/credentialing", description: "Payer enrollment without the delays." },
            { label: "Eligibility Verification", href: "/eligibility-verification", description: "Coverage confirmed before the visit." },
            { label: "Prior Authorization", href: "/prior-authorization", description: "Approvals tracked to completion." },
            { label: "Payment Posting", href: "/payment-posting", description: "ERA/EOB reconciled to the penny." },
            { label: "Patient Billing", href: "/patient-billing", description: "Clear statements, easier collections." },
          ],
        },
      ],
    },
  },
  {
    label: "Specialties",
    href: "/specialties",
    mega: {
      columns: [
        {
          title: "Most requested",
          links: [
            { label: "Primary Care", href: "/specialties/primary-care" },
            { label: "Cardiology", href: "/specialties/cardiology" },
            { label: "Orthopedics", href: "/specialties/orthopedics" },
            { label: "Behavioral Health", href: "/specialties/behavioral-health" },
            { label: "Dermatology", href: "/specialties/dermatology" },
            { label: "Urgent Care", href: "/specialties/urgent-care" },
          ],
        },
        {
          title: "More specialties",
          links: [
            { label: "Neurology", href: "/specialties/neurology" },
            { label: "Gastroenterology", href: "/specialties/gastroenterology" },
            { label: "Radiology", href: "/specialties/radiology" },
            { label: "Oncology", href: "/specialties/oncology" },
            { label: "Physical Therapy", href: "/specialties/physical-therapy" },
            { label: "View all 25 specialties →", href: "/specialties" },
          ],
        },
      ],
    },
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Why Mindlox AI", href: "/why-mindlox-ai" },
  { label: "Technology", href: "/technology" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Medical Billing", href: "/medical-billing" },
      { label: "Revenue Cycle Management", href: "/revenue-cycle-management" },
      { label: "Medical Coding", href: "/medical-coding" },
      { label: "Denial Management", href: "/denial-management" },
      { label: "A/R Recovery", href: "/ar-recovery" },
      { label: "Credentialing", href: "/credentialing" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Specialties",
    links: [
      { label: "Primary Care", href: "/specialties/primary-care" },
      { label: "Cardiology", href: "/specialties/cardiology" },
      { label: "Orthopedics", href: "/specialties/orthopedics" },
      { label: "Behavioral Health", href: "/specialties/behavioral-health" },
      { label: "Dermatology", href: "/specialties/dermatology" },
      { label: "All specialties", href: "/specialties" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Switch to Mindlox AI", href: "/switch" },
      { label: "vs. Traditional Billing Company", href: "/compare/traditional-billing-company" },
      { label: "vs. In-House Billing", href: "/compare/in-house-billing" },
      { label: "vs. EHR-Bundled Billing", href: "/compare/ehr-bundled-billing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Mindlox AI", href: "/why-mindlox-ai" },
      { label: "Technology", href: "/technology" },
      { label: "Resources", href: "/resources" },
      { label: "Revenue Leakage Calculator", href: "/revenue-leakage-calculator" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Concept demos", href: "/demos" },
    ],
  },
];

export const TRUST_PILLARS = [
  { label: "HIPAA-Conscious Workflows", detail: "Access controls, audit trails, and BAA-ready processes where applicable." },
  { label: "Experienced Billing Specialists", detail: "Certified coders, billers, and A/R strategists by specialty." },
  { label: "AI-Powered Automation", detail: "Pattern detection and decision support behind every claim." },
  { label: "U.S. Healthcare Focus", detail: "Built around U.S. payers, regulations, and reimbursement reality." },
  { label: "End-to-End RCM", detail: "Patient registration to reporting — one accountable partner." },
] as const;

/** Placeholder metrics — replace with verified Mindlox AI data. Never fabricate. */
export const PLACEHOLDER_METRICS = [
  { value: "[X]+", label: "Providers Supported" },
  { value: "[X]%", label: "Clean Claim Rate" },
  { value: "$[X]M", label: "Revenue Recovered" },
  { value: "[X]+", label: "Specialties Served" },
] as const;
