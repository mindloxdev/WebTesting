/* ------------------------------------------------------------------ */
/*  Per-service editorial content for the root SEO service pages.      */
/*  Domain-accurate, no fabricated statistics.                         */
/* ------------------------------------------------------------------ */

export type ServiceStep = { title: string; detail: string };
export type ServiceContent = {
  h1: string;
  highlight: string;
  /** Three additional "what's included" bullets (data already has three). */
  extras: string[];
  steps: ServiceStep[];
  ai: string[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaHighlight: string;
  /** Lifecycle stage ids (1–14) this service covers; empty = cross-cutting. */
  stages: number[];
  /** Hero aside: "journey" (claim journey section), "feed" (detection feed), "card" (outcomes card). */
  visual: "journey" | "feed" | "card";
  /** Optional signature section: the 8-stage revenue engine, the live claim status board, or the AI-to-specialist handoff. */
  signature?: "engine" | "status-board" | "handoff";
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "medical-billing": {
    h1: "Medical billing that gets paid the first time.",
    highlight: "the first time.",
    extras: [
      "Charge entry reconciled to the schedule every day",
      "Payer-specific edits and NCCI/MUE checks applied before transmission",
      "Secondary and tertiary claims filed automatically after primary adjudication",
    ],
    steps: [
      { title: "Charge capture & entry", detail: "Encounters are reconciled against the schedule and charges entered within 24–48 hours with CPT, ICD-10-CM, and HCPCS validation." },
      { title: "Scrub & submit", detail: "Claims run through payer edits, NCCI/MUE checks, and specialty rules, then transmit as 837P/837I through your clearinghouse." },
      { title: "Track & correct", detail: "999 and 277 acknowledgments are monitored daily; rejections are corrected and resubmitted within one business day." },
      { title: "Post & follow through", detail: "835 remittances are posted, secondaries filed, and unpaid claims worked on a payer-specific cadence until resolved." },
    ],
    ai: [
      "Denial-risk scoring flags claims likely to reject before they leave the door.",
      "Rejection patterns are categorized automatically so recurring payer edits get fixed at the source.",
      "Specialists review every flagged claim — AI prioritizes, humans decide.",
    ],
    faq: [
      { q: "How quickly are claims submitted?", a: "Clean claims are typically submitted within 24–48 hours of charge entry, in daily transmission batches. Exact timing is confirmed in your service agreement." },
      { q: "Do you work inside our practice management system?", a: "Yes. Mindlox AI works within the PM and EHR you already use — no system switch required. Connectivity details are confirmed during discovery." },
      { q: "What happens when the clearinghouse rejects a claim?", a: "Rejections are triaged within one business day, corrected, and resubmitted. Recurring rejection reasons are traced to their source — registration, coding, or payer setup — and fixed there." },
      { q: "Do you bill secondary and tertiary payers?", a: "Yes. Secondary and tertiary claims are filed automatically after primary adjudication, with the primary ERA or EOB attached where the payer requires it." },
    ],
    ctaTitle: "Let's find out what your claims are really collecting.",
    ctaHighlight: "really collecting.",
    stages: [6, 7, 8],
    visual: "journey",
    signature: "status-board",
  },
  "revenue-cycle-management": {
    h1: "One partner for the entire revenue cycle.",
    highlight: "entire revenue cycle.",
    extras: [
      "Front end, mid cycle, and back end managed as one connected system",
      "Weekly KPI reviews with a named account manager",
      "Prevention loop: back-end findings fixed at the front desk",
    ],
    steps: [
      { title: "Discovery & revenue audit", detail: "We map your specialties, payer mix, systems, and current performance — denials, A/R aging, coding patterns, underpayments." },
      { title: "Transition without disruption", detail: "Parallel-run planning, data access, workflow mapping, and a cutover timeline designed so your revenue never pauses." },
      { title: "Run all fourteen stages", detail: "Registration through reporting, with dashboards on from day one and specialists accountable for every stage." },
      { title: "Optimize every month", detail: "Monthly strategy reviews turn dashboard trends into changes at the front desk, in coding, and in payer strategy." },
    ],
    ai: [
      "Anomaly detection across payers, providers, and CPT families surfaces trends before they become aged A/R.",
      "Work queues are prioritized by recoverable value and timely-filing risk.",
      "Every recommendation is reviewed by an RCM specialist before action.",
    ],
    faq: [
      { q: "Which KPIs do you manage to?", a: "Net collection rate, first-pass acceptance, denial rate, A/R days, percentage of A/R over 90 days, and payer-level performance — all visible in your dashboard, reviewed with you weekly." },
      { q: "Can we keep part of the cycle in-house?", a: "Yes. Many practices keep the front desk or coding in-house and engage Mindlox AI for the rest. The handoffs are defined during transition planning." },
      { q: "How do you report?", a: "Live dashboards down to the claim, weekly performance reviews, and a monthly strategy session with recommendations attached — not a static PDF." },
      { q: "How long does the transition take?", a: "Most transitions run three to six weeks from discovery to go-live, with a parallel-run option. Your timeline is set during transition planning." },
    ],
    ctaTitle: "Let's build a smarter revenue cycle for your organization.",
    ctaHighlight: "smarter revenue cycle",
    stages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    visual: "journey",
    signature: "engine",
  },
  "medical-coding": {
    h1: "Coding accuracy that protects revenue and compliance.",
    highlight: "revenue and compliance.",
    extras: [
      "E/M leveling by MDM or time, with documentation feedback to providers",
      "Compliant query process for incomplete or conflicting documentation",
      "Annual CPT, ICD-10-CM, and HCPCS updates applied before they take effect",
    ],
    steps: [
      { title: "Documentation review", detail: "Certified coders read the encounter — not just the superbill — for medical necessity, specificity, and completeness." },
      { title: "Code assignment", detail: "CPT, ICD-10-CM, and HCPCS with modifiers, checked against NCCI edits, MUEs, and payer-specific policies for your specialty." },
      { title: "Provider query & education", detail: "Gaps are resolved through a compliant query process, and recurring patterns become short provider education notes." },
      { title: "Audit & feedback", detail: "Baseline audit at onboarding, then periodic retrospective and prospective audits with provider-level accuracy reporting." },
    ],
    ai: [
      "Coding suggestions and edit checks assist certified coders — the coder assigns the final code.",
      "Specificity flags catch unspecified diagnoses when laterality or severity is documented.",
      "Audit sampling targets the providers and code families with the highest variance.",
    ],
    faq: [
      { q: "Are your coders certified?", a: "Certified coders aligned to your specialty review every encounter." },
      { q: "Do you code from the chart or from a superbill?", a: "Both, but chart-based coding is preferred. Coding from documentation is what protects you in an audit and captures services a superbill misses." },
      { q: "How do you handle documentation gaps?", a: "Through a compliant query process. Coders never assume — the provider clarifies, the documentation is updated, and the claim goes out supported." },
      { q: "How often are coding audits performed?", a: "A baseline audit at onboarding, then a cadence of retrospective and prospective audits agreed with you, with provider-level feedback." },
    ],
    ctaTitle: "Let's see what your coding is leaving on the table.",
    ctaHighlight: "leaving on the table.",
    stages: [5],
    visual: "card",
  },
  "denial-management": {
    h1: "Denials, prevented first and appealed fast.",
    highlight: "prevented first",
    extras: [
      "CARC/RARC-based root-cause taxonomy for every denial",
      "Appeal deadlines tracked per payer and per level",
      "Monthly denial-prevention report for your leadership team",
    ],
    steps: [
      { title: "Categorize", detail: "Every denial is mapped from CARC/RARC codes to a root cause — eligibility, authorization, coding, timely filing, medical necessity, duplicate." },
      { title: "Prioritize", detail: "Queues are ranked by recoverable value, likelihood of overturn, and days until the appeal or corrected-claim deadline." },
      { title: "Appeal", detail: "Payer-specific templates, clinical documentation, and policy citations through levels one to three, tracked to resolution." },
      { title: "Prevent", detail: "Root causes are pushed back to registration, eligibility, authorization, and coding so the same denial does not recur." },
    ],
    ai: [
      "Denial-risk scoring before submission reduces the denials you have to fight at all.",
      "Appeal recommendations match denial reasons to the documentation that overturns them.",
      "Payer pattern detection shows which payers deny which codes — and why.",
    ],
    faq: [
      { q: "What denial rate should we expect?", a: "We don't guarantee a number. We measure your baseline during the revenue audit, then report the trend by payer and root cause every month so you can see the change." },
      { q: "Do you appeal every denial?", a: "Every recoverable denial, prioritized by value and deadline. Any write-off is documented with a reason code and approved by you." },
      { q: "How do you protect timely filing?", a: "Filing, corrected-claim, and appeal windows are tracked per payer. Claims approaching a limit move to the top of the queue automatically." },
      { q: "Can you reduce denials caused at our front desk?", a: "Yes. The prevention loop sends findings back to registration, eligibility, and authorization workflows — with specific, fixable patterns rather than blame." },
    ],
    ctaTitle: "Let's find the denials you should have won.",
    ctaHighlight: "should have won.",
    stages: [10, 12],
    visual: "feed",
    signature: "handoff",
  },
  "ar-recovery": {
    h1: "Aging A/R, worked by strategy instead of by queue.",
    highlight: "by strategy",
    extras: [
      "Insurance and patient A/R segmented and worked separately",
      "Timely-filing and appeal windows protected on every account",
      "Legacy A/R clean-up projects for practices switching to Mindlox AI",
    ],
    steps: [
      { title: "Segment", detail: "Open balances are segmented by age, payer, balance, and claim status so the work is visible before it starts." },
      { title: "Prioritize", detail: "Accounts are ranked by value, likelihood of recovery, and deadline risk — not oldest-first or largest-first." },
      { title: "Work", detail: "Payer-specific follow-up cadence through portals, calls, reconsiderations, and corrected claims, with every touch logged." },
      { title: "Resolve & report", detail: "Accounts are paid, adjusted only with your approval, or escalated — and the aging picture updates in your dashboard daily." },
    ],
    ai: [
      "A/R priority scoring focuses effort where recovery is most likely and most valuable.",
      "Claim-status automation replaces manual portal checks.",
      "Trend alerts flag payers whose days-to-pay are drifting.",
    ],
    faq: [
      { q: "Can you work our old A/R?", a: "Yes. Legacy A/R projects are scoped by age and value during the revenue audit, with a clear plan for what is recoverable and what is not." },
      { q: "How do you decide what to write off?", a: "Nothing is written off without your approval. Every adjustment carries a reason code and shows up in your reporting." },
      { q: "How is A/R reported?", a: "Aging buckets, payer, provider, and percentage over 90 days — live in your dashboard and reviewed with you weekly." },
      { q: "Do you handle patient A/R too?", a: "Yes, through patient billing: clear statements, payment plans, and respectful, compliant follow-up." },
    ],
    ctaTitle: "Let's recover the A/R that's about to expire.",
    ctaHighlight: "about to expire.",
    stages: [11],
    visual: "feed",
  },
  credentialing: {
    h1: "Credentialing that lets new providers bill sooner.",
    highlight: "bill sooner.",
    extras: [
      "Medicare (PECOS), Medicaid, and commercial payer enrollment",
      "Group and individual NPI, taxonomy, and reassignment setup",
      "Expirables tracking: licenses, DEA, board certifications, malpractice",
    ],
    steps: [
      { title: "Gather", detail: "CAQH profile, supporting documents, and expirables are collected and verified once, then kept current." },
      { title: "Apply", detail: "Payer applications, PECOS, and state Medicaid enrollment submitted with complete documentation checklists." },
      { title: "Track", detail: "Status follow-up with every payer, effective dates captured, and issues escalated before they stall." },
      { title: "Maintain", detail: "Re-credentialing calendar, revalidation, and roster updates so no provider ever lapses." },
    ],
    ai: [
      "Expirables and re-credentialing dates are monitored automatically.",
      "Application-status patterns flag payers that are running slow.",
      "Specialists handle every payer conversation.",
    ],
    faq: [
      { q: "How long does payer enrollment take?", a: "It varies by payer — commonly 60 to 120 days or more. We can't shorten a payer's process, but we submit complete applications and follow up so nothing stalls." },
      { q: "Do you manage CAQH?", a: "Yes — profile creation, attestations, and ongoing updates so every payer sees current information." },
      { q: "What about re-credentialing?", a: "A re-credentialing calendar with reminders and submissions ahead of every deadline." },
      { q: "Can a new provider see patients before enrollment completes?", a: "That depends on payer rules and retroactive billing policies. We advise per payer so you know what can be billed and when." },
    ],
    ctaTitle: "Let's get your providers enrolled and billing.",
    ctaHighlight: "enrolled and billing.",
    stages: [],
    visual: "card",
  },
  "eligibility-verification": {
    h1: "Coverage confirmed before the visit, not after the denial.",
    highlight: "before the visit,",
    extras: [
      "Batch verification 48–72 hours before scheduled visits",
      "Real-time checks for walk-ins and same-day add-ons",
      "Copay, deductible, and coinsurance shared with the front desk",
    ],
    steps: [
      { title: "Pre-visit batch", detail: "270/271 transactions run for every scheduled visit two to three days ahead." },
      { title: "Exceptions", detail: "Inactive plans, plan changes, and secondary coverage are resolved by an eligibility specialist before the appointment." },
      { title: "Benefits to the front desk", detail: "Copay, remaining deductible, and coinsurance are delivered so patient responsibility can be collected at the visit." },
      { title: "Authorization flag", detail: "Services that require authorization are flagged so the request starts before the visit." },
    ],
    ai: [
      "Automated 270/271 transactions surface inactive plans and coverage changes.",
      "Mismatch detection compares registration data to payer responses.",
      "Exceptions go to an eligibility specialist for resolution before the appointment.",
    ],
    faq: [
      { q: "Which payers can you verify electronically?", a: "Most major commercial payers, Medicare, and Medicaid through the clearinghouse, with portal verification where a payer requires it." },
      { q: "What about same-day patients?", a: "Real-time verification at check-in, with benefits returned to the front desk in seconds." },
      { q: "Do you verify benefits or just coverage?", a: "Both — plan status plus copay, deductible, coinsurance, and service-level benefits where the payer returns them." },
      { q: "Can this reduce patient balances?", a: "Accurate front-end collection of copays and deductibles reduces the patient balances that end up in back-end A/R." },
    ],
    ctaTitle: "Let's stop eligibility denials before they start.",
    ctaHighlight: "before they start.",
    stages: [2],
    visual: "feed",
  },
  "prior-authorization": {
    h1: "Authorizations in place before care happens.",
    highlight: "before care happens.",
    extras: [
      "Payer-by-CPT authorization requirement matrix for your specialty",
      "Clinical documentation assembled for every submission",
      "Authorization numbers linked to claims automatically",
    ],
    steps: [
      { title: "Identify", detail: "Payer rules by CPT and HCPCS determine which scheduled services need authorization." },
      { title: "Request with documentation", detail: "Requests go out by portal, fax, or phone with the clinical documentation each payer expects." },
      { title: "Track", detail: "Approvals, units, date ranges, and expirations are tracked to completion." },
      { title: "Link & renew", detail: "The authorization is attached to the claim, and renewals start before units or dates run out." },
    ],
    ai: [
      "Decision support identifies services that require authorization by payer and plan.",
      "Expiration and unit-count tracking triggers renewals before they lapse.",
      "Specialists submit and follow up with payers.",
    ],
    faq: [
      { q: "Which services need prior authorization?", a: "It depends on the payer and plan. We maintain a requirement matrix for your specialty and keep it current as policies change." },
      { q: "What if a claim is denied for no authorization?", a: "Retro-authorization where the payer allows it, otherwise an appeal with documentation — and a prevention fix so it does not happen again." },
      { q: "Do you handle peer-to-peer requests?", a: "We coordinate the scheduling and documentation; the provider completes the peer-to-peer conversation." },
      { q: "How do you track authorization units?", a: "Units and date ranges are tracked per authorization, with alerts before they are exhausted." },
    ],
    ctaTitle: "Let's make authorization delays a thing of the past.",
    ctaHighlight: "a thing of the past.",
    stages: [3],
    visual: "card",
  },
  "payment-posting": {
    h1: "Every remittance posted, reconciled, and checked against contract.",
    highlight: "checked against contract.",
    extras: [
      "Adjustment reason codes (CARC/RARC) posted for denial analytics",
      "Patient responsibility transferred accurately after adjudication",
      "Unapplied and unidentified payments resolved, not parked",
    ],
    steps: [
      { title: "835 auto-posting", detail: "Electronic remittances are posted the day they arrive, line by line, with adjustments and reason codes captured." },
      { title: "EOB manual posting", detail: "Paper EOBs and payer-portal remits are keyed by posting specialists with the same reason-code discipline." },
      { title: "Contract variance check", detail: "Allowed amounts are compared to contracted rates; underpayments are flagged for recovery." },
      { title: "Deposit reconciliation", detail: "ERA and EFT are matched to bank deposits; variances are investigated and closed." },
    ],
    ai: [
      "Contract variance detection compares allowed amounts to contracted rates line by line.",
      "Unapplied cash and duplicate payments are flagged for review.",
      "Posting exceptions route to a payment integrity analyst.",
    ],
    faq: [
      { q: "How fast are payments posted?", a: "835 remittances are posted the day they are received. Paper EOBs are posted within a few business days of receipt." },
      { q: "Do you reconcile to bank deposits?", a: "Yes. ERA and EFT are matched to deposits, and every variance is investigated until it closes." },
      { q: "What happens when a payer underpays?", a: "The variance is flagged at posting and moves into the underpayment recovery workflow — reconsideration or appeal with the contract terms attached." },
      { q: "Do you post zero-pay remittances?", a: "Yes. Denials and zero-pays are posted with their reason codes so denial management can act on them immediately." },
    ],
    ctaTitle: "Let's find the underpayments hiding in your remits.",
    ctaHighlight: "hiding in your remits.",
    stages: [9],
    visual: "feed",
    signature: "status-board",
  },
  "patient-billing": {
    h1: "Patient statements people understand — and pay.",
    highlight: "understand — and pay.",
    extras: [
      "Statement cycles with clear, itemized balances",
      "Payment plans and online payment support [confirm payment processor]",
      "Compliant, respectful follow-up communications",
    ],
    steps: [
      { title: "Balance verification", detail: "Patient balances are confirmed only after payer adjudication so no one is billed for an amount still pending." },
      { title: "Statement", detail: "Plain-language, itemized statements by mail or digitally, on a cycle you approve." },
      { title: "Follow-up", detail: "Reminders, calls, and payment-plan options handled by trained billing staff." },
      { title: "Resolution", detail: "Paid, on a plan, or escalated strictly according to your policy and with your approval." },
    ],
    ai: [
      "Statement timing and channel are optimized by response patterns.",
      "Balance-accuracy checks prevent statements for amounts still pending with a payer.",
      "Patient inquiries are answered by trained billing staff, not a bot.",
    ],
    faq: [
      { q: "Do you send statements only after insurance pays?", a: "Yes. Patient statements go out after adjudication so the balance on the statement is the balance the patient actually owes." },
      { q: "Do you offer payment plans?", a: "Yes, on terms set by your policy, with tracking and reminders handled for you." },
      { q: "How do you handle patient billing calls?", a: "A dedicated queue staffed by trained billing specialists who can explain a statement line by line." },
      { q: "Do you send accounts to collections?", a: "Only according to your policy and only with your approval. Most balances resolve well before that point." },
    ],
    ctaTitle: "Let's make patient billing simpler for everyone.",
    ctaHighlight: "simpler for everyone.",
    stages: [13],
    visual: "card",
  },
  "out-of-network-negotiations": {
    h1: "Turn out-of-network into revenue.",
    highlight: "into revenue.",
    extras: [
      "Out-of-network status flagged at eligibility, before the visit",
      "Negotiation history tracked by payer, plan, and CPT",
      "Every agreement documented and matched to the posted payment",
    ],
    steps: [
      { title: "Identify & prepare", detail: "Out-of-network status is flagged at eligibility. Expected reimbursement, plan allowances, and the patient's cost-sharing position are documented before care wherever possible." },
      { title: "Negotiate the rate", detail: "Single-case agreements are requested before service. After adjudication, payer offers are negotiated against benchmark data and your fee schedule — never accepted at the payer's first number." },
      { title: "Escalate when it applies", detail: "For claims covered by the No Surprises Act, the 30-business-day open negotiation window is tracked and Independent Dispute Resolution is initiated with supporting documentation when the offer falls short." },
      { title: "Document & collect", detail: "Signed agreements are attached to the claim, payments are reconciled against the negotiated rate, and any remaining patient balance is billed only where your policy and balance-billing rules allow." },
    ],
    ai: [
      "Out-of-network claims are flagged automatically at eligibility so negotiation starts before the visit, not after the payment.",
      "Payer offers are compared against negotiation history and benchmark rates to prioritize the claims worth escalating.",
      "Open-negotiation and dispute-filing deadlines are tracked and surfaced daily — specialists decide every offer and counteroffer.",
    ],
    faq: [
      { q: "What is an out-of-network negotiation?", a: "When a provider has no contract with a patient's plan, the allowed amount is not set by a fee schedule. Negotiating — before care through a single-case agreement, or after adjudication on the payer's offer — establishes a reimbursement rate for that claim instead of accepting the payer's default." },
      { q: "How does the No Surprises Act affect this?", a: "For emergency services and certain out-of-network care delivered at in-network facilities, the No Surprises Act limits patient balance billing and provides a 30-business-day open negotiation period, followed by Independent Dispute Resolution if the parties do not agree. Mindlox AI tracks those deadlines and prepares the supporting documentation. Applicability is confirmed claim by claim." },
      { q: "Do you handle single-case agreements?", a: "Yes. When a patient's plan has no contracted rate for a service you provide, a single-case agreement is requested and negotiated before care so the rate is settled in advance." },
      { q: "Can patients still be balance billed?", a: "Only where federal and state rules allow it, and only according to your practice's policy. Balances protected by the No Surprises Act or state law are never billed to the patient." },
    ],
    ctaTitle: "Let's see what your out-of-network claims should be paying.",
    ctaHighlight: "should be paying.",
    stages: [2, 9, 11, 12],
    visual: "card",
  },

};

export const getServiceContent = (slug: string): ServiceContent =>
  SERVICE_CONTENT[slug] ?? {
    h1: "",
    highlight: "",
    extras: [],
    steps: [],
    ai: [],
    faq: [],
    ctaTitle: "Your revenue deserves a smarter strategy.",
    ctaHighlight: "smarter strategy.",
    stages: [],
    visual: "card",
  };
