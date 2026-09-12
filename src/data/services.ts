export type ServiceCategory = "core" | "front-end" | "back-end" | "specialized" | "practice";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  outcomes: string[];
  category: ServiceCategory;
  /** True for the SEO-chase pages that live at the site root (one per core service). */
  root?: boolean;
};

export const SERVICE_CATEGORIES: Record<ServiceCategory, string> = {
  core: "Core revenue cycle",
  "front-end": "Front-end & access",
  "back-end": "Back-end & recovery",
  specialized: "Specialized billing",
  practice: "Practice operations",
};

export const SERVICES: Service[] = [
  {
    slug: "medical-billing",
    name: "Medical Billing",
    short: "Clean claims out the door, every day, with follow-through until paid.",
    description:
      "From charge entry to final payment, Mindlox AI manages claim creation, scrubbing, submission, and follow-up so your practice sees fewer rejections and faster reimbursement.",
    outcomes: ["First-pass acceptance focus", "Daily claim submission cadence", "Rejection triage within one business day"],
    category: "core",
    root: true,
  },
  {
    slug: "revenue-cycle-management",
    name: "Revenue Cycle Management",
    short: "Front desk to final payment — one accountable partner for the entire cycle.",
    description:
      "End-to-end RCM: registration, eligibility, authorization, charge capture, coding, claims, posting, denials, A/R, appeals, patient billing, and reporting — managed as one connected system.",
    outcomes: ["One partner across 14 stages", "Weekly performance reviews", "Transparent dashboards"],
    category: "core",
    root: true,
  },
  {
    slug: "medical-coding",
    name: "Medical Coding",
    short: "Specialty-accurate CPT, ICD-10-CM, and HCPCS coding with audit-ready documentation.",
    description:
      "Certified coders review documentation for specificity, modifiers, medical necessity, and payer-specific rules — reducing downcoding, upcoding risk, and coding-related denials.",
    outcomes: ["Modifier and NCCI edit review", "Documentation improvement feedback", "Coding accuracy audits"],
    category: "core",
    root: true,
  },
  {
    slug: "denial-management",
    name: "Denial Management",
    short: "Prevent what can be prevented. Prioritize, appeal, and learn from the rest.",
    description:
      "Denials are categorized by root cause (CARC/RARC), prioritized by recoverable value, appealed with payer-specific templates, and fed back into front-end prevention.",
    outcomes: ["Root-cause taxonomy", "Value-prioritized appeal queues", "Prevention loop to the front end"],
    category: "back-end",
    root: true,
  },
  {
    slug: "ar-recovery",
    name: "A/R Recovery",
    short: "Aging balances worked by strategy — highest value and highest risk first.",
    description:
      "Insurance and patient A/R is segmented by age, payer, and value, then worked with timely-filing awareness so recoverable revenue is never left to expire.",
    outcomes: ["Aging bucket reduction plan", "Timely-filing protection", "Payer-specific follow-up cadence"],
    category: "back-end",
    root: true,
  },
  {
    slug: "credentialing",
    name: "Credentialing",
    short: "Provider credentialing and payer enrollment tracked to completion.",
    description:
      "CAQH maintenance, payer applications, re-credentialing calendars, and status tracking so new providers bill sooner and existing providers never lapse.",
    outcomes: ["CAQH profile management", "Re-credentialing calendar", "Enrollment status visibility"],
    category: "front-end",
    root: true,
  },
  {
    slug: "eligibility-verification",
    name: "Eligibility Verification",
    short: "Coverage, benefits, and patient responsibility confirmed before the visit.",
    description:
      "Real-time and batch eligibility checks catch inactive coverage, plan changes, and authorization requirements before they become denials.",
    outcomes: ["Pre-visit coverage checks", "Copay and deductible visibility", "Fewer eligibility denials"],
    category: "front-end",
    root: true,
  },
  {
    slug: "prior-authorization",
    name: "Prior Authorization",
    short: "Authorizations requested, tracked, and attached — before the service is rendered.",
    description:
      "Authorization requirements are identified by payer and CPT, submitted with supporting documentation, and monitored so approvals are in place when care happens.",
    outcomes: ["Payer-specific auth rules", "Approval tracking", "Auth-to-claim linkage"],
    category: "front-end",
    root: true,
  },
  {
    slug: "payment-posting",
    name: "Payment Posting",
    short: "ERA/EOB payments posted, reconciled, and variance-checked to the penny.",
    description:
      "835 remittances and manual EOBs are posted daily with contractual adjustments validated against contracted rates — so underpayments surface immediately.",
    outcomes: ["Daily 835 posting", "Contract variance detection", "Deposit reconciliation"],
    category: "back-end",
    root: true,
  },
  {
    slug: "patient-billing",
    name: "Patient Billing",
    short: "Clear statements and respectful follow-up that improve patient collections.",
    description:
      "Patient statements, payment plans, and follow-up communications designed to be understood — improving collections without damaging the patient relationship.",
    outcomes: ["Plain-language statements", "Payment plan support", "Patient inquiry handling"],
    category: "back-end",
    root: true,
  },
  {
    slug: "out-of-network-negotiations",
    name: "Out-of-Network Negotiations",
    short: "Turn out-of-network into revenue.",
    description:
      "Out-of-network claims negotiated case by case — single-case agreements before care, payer negotiations after adjudication, and No Surprises Act open negotiation and dispute resolution where they apply — so out-of-network care is paid at a defensible rate instead of written off.",
    outcomes: ["Single-case agreement requests", "Post-adjudication rate negotiation", "No Surprises Act negotiation & IDR support"],
    category: "back-end",
    root: true,
  },
  {
    slug: "claims-submission",
    name: "Claims Submission",
    short: "837P/837I claims scrubbed and transmitted through your clearinghouse daily.",
    description:
      "Claims are validated against payer edits, NCCI rules, and specialty-specific requirements before transmission, with rejections corrected and resubmitted quickly.",
    outcomes: ["Pre-submission scrubbing", "Clearinghouse rejection handling", "Submission audit trail"],
    category: "core",
  },
  {
    slug: "provider-enrollment",
    name: "Provider Enrollment",
    short: "Medicare, Medicaid, and commercial enrollment for new and relocating providers.",
    description:
      "PECOS, state Medicaid, and commercial payer enrollment handled with documentation checklists and follow-up so providers can bill from day one.",
    outcomes: ["PECOS and Medicaid enrollment", "Group and individual NPI setup", "Effective-date tracking"],
    category: "front-end",
  },
  {
    slug: "payer-enrollment",
    name: "Payer Enrollment",
    short: "EDI, ERA, and EFT enrollment so payments and remittances flow electronically.",
    description:
      "Electronic connectivity with each payer — claims, remittances, and funds transfer — configured and maintained so nothing arrives on paper.",
    outcomes: ["EDI/ERA/EFT setup", "Payer portal access management", "Connectivity monitoring"],
    category: "front-end",
  },
  {
    slug: "appeals-management",
    name: "Appeals Management",
    short: "Payer-specific appeals with the clinical documentation that overturns denials.",
    description:
      "Multi-level appeals built from payer policy, medical necessity criteria, and clinical documentation — tracked through every deadline.",
    outcomes: ["Level 1–3 appeal handling", "Deadline tracking", "Overturn analytics"],
    category: "back-end",
  },
  {
    slug: "charge-capture",
    name: "Charge Capture",
    short: "Every billable service captured — no missed charges, no leakage at the source.",
    description:
      "Encounter reconciliation against schedules and documentation ensures every rendered service becomes a charge, with missing-charge reports to providers.",
    outcomes: ["Schedule-to-charge reconciliation", "Missing charge alerts", "Charge lag reduction"],
    category: "core",
  },
  {
    slug: "revenue-integrity",
    name: "Revenue Integrity",
    short: "Fee schedules, contracts, and coding aligned so revenue is complete and compliant.",
    description:
      "Fee schedule maintenance, contract loading, coding compliance reviews, and charge-master hygiene that keep revenue accurate and audit-ready.",
    outcomes: ["Fee schedule reviews", "Contract loading", "Compliance audits"],
    category: "specialized",
  },
  {
    slug: "underpayment-recovery",
    name: "Underpayment Recovery",
    short: "Paid claims compared against contracted rates — variances pursued automatically.",
    description:
      "Every remittance is checked against expected reimbursement. Systematic underpayments are identified by payer and pattern, then recovered.",
    outcomes: ["Contract variance detection", "Payer pattern analysis", "Recovery project tracking"],
    category: "back-end",
  },
  {
    slug: "dme-billing",
    name: "DME Billing",
    short: "Durable medical equipment billing with documentation, modifiers, and rental cycles handled.",
    description:
      "HCPCS-level DME billing including CMN/DWO requirements, rental-vs-purchase logic, and Medicare DMEPOS competitive bidding awareness.",
    outcomes: ["Documentation requirement tracking", "Rental cycle billing", "DMEPOS compliance"],
    category: "specialized",
  },
  {
    slug: "telehealth-billing",
    name: "Telehealth Billing",
    short: "Place-of-service, modifier, and payer-policy accuracy for virtual care.",
    description:
      "Telehealth policies change frequently by payer and state. Mindlox AI keeps POS codes, modifiers (95, GT, GQ), and audio-only rules current.",
    outcomes: ["Payer telehealth policy tracking", "POS and modifier accuracy", "Parity law awareness"],
    category: "specialized",
  },
  {
    slug: "virtual-front-office",
    name: "Virtual Front Office",
    short: "Scheduling, intake, and eligibility support that runs alongside your front desk.",
    description:
      "Remote front-office staff handle scheduling, insurance capture, intake verification, and patient communication so your on-site team focuses on care.",
    outcomes: ["Scheduling support", "Insurance capture accuracy", "Reduced front-desk burden"],
    category: "practice",
  },
  {
    slug: "virtual-medical-assistants",
    name: "Virtual Medical Assistants",
    short: "Trained remote assistants for documentation support, referrals, and follow-ups.",
    description:
      "HIPAA-conscious virtual assistants support providers with documentation prep, referral coordination, and patient follow-ups.",
    outcomes: ["Referral coordination", "Documentation prep", "Patient follow-up calls"],
    category: "practice",
  },
  {
    slug: "practice-management",
    name: "Practice Management",
    short: "Operational support for workflows, staffing models, and PM system optimization.",
    description:
      "Workflow assessments, PM system configuration reviews, and operational playbooks that make the practice run smoother and bill cleaner.",
    outcomes: ["Workflow assessment", "PM system optimization", "Operational playbooks"],
    category: "practice",
  },
  {
    slug: "analytics-reporting",
    name: "Analytics & Reporting",
    short: "Dashboards and reviews that show exactly where your revenue is — and why.",
    description:
      "Net collection rate, A/R days, denial trends, payer performance, and provider productivity delivered as living dashboards and monthly strategy reviews.",
    outcomes: ["Live KPI dashboards", "Payer performance analysis", "Monthly strategy reviews"],
    category: "practice",
  },
  {
    slug: "coding-audits",
    name: "Coding Audits & Compliance",
    short: "Independent coding audits that protect revenue and reduce compliance risk.",
    description:
      "Periodic retrospective and prospective coding audits with provider-level feedback and documentation education.",
    outcomes: ["Retrospective audit reports", "Provider education", "Risk-area monitoring"],
    category: "specialized",
  },
];

export const ROOT_SERVICES = SERVICES.filter((s) => s.root);
export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
