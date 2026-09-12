/* ------------------------------------------------------------------ */
/*  SAMPLE DATA — every UI that renders this must show a sample-data   */
/*  label. Values are illustrative and are not Mindlox AI results.     */
/* ------------------------------------------------------------------ */

export type Metric = {
  key: string;
  label: string;
  value: number;
  format: "percent" | "days" | "currency" | "number";
  delta: number;
  /** Whether an increase is good. */
  upIsGood: boolean;
  spark: number[];
};

export const DEMO_METRICS: Metric[] = [
  { key: "ncr", label: "Net Collection Rate", value: 97.4, format: "percent", delta: 2.1, upIsGood: true, spark: [93.1, 93.8, 94.2, 95.0, 95.6, 96.3, 96.9, 97.4] },
  { key: "ar", label: "A/R Days", value: 31, format: "days", delta: -9, upIsGood: false, spark: [44, 42, 41, 38, 36, 34, 33, 31] },
  { key: "ccr", label: "Clean Claim Rate", value: 96.8, format: "percent", delta: 3.4, upIsGood: true, spark: [91.2, 92.0, 93.1, 93.9, 94.8, 95.7, 96.2, 96.8] },
  { key: "denial", label: "Denial Rate", value: 4.2, format: "percent", delta: -3.1, upIsGood: false, spark: [8.1, 7.6, 7.0, 6.4, 5.8, 5.1, 4.6, 4.2] },
  { key: "submitted", label: "Claims Submitted", value: 12840, format: "number", delta: 6.2, upIsGood: true, spark: [10100, 10400, 10900, 11300, 11800, 12100, 12500, 12840] },
  { key: "posted", label: "Payments Posted", value: 2184300, format: "currency", delta: 8.7, upIsGood: true, spark: [1.72, 1.79, 1.85, 1.93, 2.01, 2.08, 2.14, 2.18] },
  { key: "recovered", label: "Revenue Recovered", value: 186420, format: "currency", delta: 14.2, upIsGood: true, spark: [92, 104, 118, 131, 149, 160, 172, 186] },
  { key: "outstanding", label: "Outstanding A/R", value: 642100, format: "currency", delta: -12.4, upIsGood: false, spark: [910, 870, 830, 790, 745, 710, 676, 642] },
];

export const REVENUE_TREND = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  collected: [1.62, 1.68, 1.71, 1.79, 1.84, 1.9, 1.96, 2.02, 2.08, 2.11, 2.15, 2.18],
  charges: [2.1, 2.14, 2.19, 2.22, 2.26, 2.31, 2.35, 2.4, 2.44, 2.47, 2.5, 2.53],
};

export const DENIAL_TREND = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [8.4, 8.1, 7.6, 7.2, 6.8, 6.3, 5.9, 5.4, 5.0, 4.7, 4.4, 4.2],
};

export const AR_AGING = [
  { bucket: "0–30", value: 412 },
  { bucket: "31–60", value: 128 },
  { bucket: "61–90", value: 58 },
  { bucket: "91–120", value: 27 },
  { bucket: "120+", value: 17 },
];

export const PAYER_MIX = [
  { payer: "Commercial", value: 46 },
  { payer: "Medicare", value: 29 },
  { payer: "Medicaid", value: 13 },
  { payer: "Self-pay", value: 7 },
  { payer: "Other", value: 5 },
];

export const TOP_DENIAL_REASONS = [
  { reason: "Eligibility / coverage", code: "CO-27", value: 31 },
  { reason: "Authorization missing", code: "CO-197", value: 22 },
  { reason: "Medical necessity", code: "CO-50", value: 17 },
  { reason: "Duplicate claim", code: "CO-18", value: 12 },
  { reason: "Timely filing", code: "CO-29", value: 9 },
  { reason: "Coding / modifier", code: "CO-4", value: 9 },
];

export const PAYER_PERFORMANCE = [
  { payer: "Commercial A", days: 24, denial: 3.1, paid: 98.2 },
  { payer: "Commercial B", days: 29, denial: 4.4, paid: 96.9 },
  { payer: "Medicare", days: 17, denial: 2.8, paid: 99.1 },
  { payer: "Medicaid", days: 41, denial: 6.7, paid: 94.2 },
  { payer: "Commercial C", days: 33, denial: 5.2, paid: 95.8 },
];

export type Detection = {
  id: string;
  type: "denial-risk" | "eligibility" | "underpayment" | "high-risk" | "appeal" | "coding" | "auth";
  title: string;
  detail: string;
  claim: string;
  amount?: number;
  resolver: string;
};

export const DETECTIONS: Detection[] = [
  { id: "d1", type: "eligibility", title: "Eligibility mismatch detected", detail: "Plan terminated 03/31 — registration shows active.", claim: "MLX-10492", amount: 412, resolver: "Eligibility Specialist" },
  { id: "d2", type: "underpayment", title: "Underpayment identified", detail: "Paid $184.20 vs. contracted $246.00 on 99214.", claim: "MLX-10377", amount: 61.8, resolver: "Payment Integrity Analyst" },
  { id: "d3", type: "denial-risk", title: "Potential denial detected", detail: "Modifier 25 missing with same-day procedure.", claim: "MLX-10511", amount: 318, resolver: "Certified Coder" },
  { id: "d4", type: "appeal", title: "Appeal recommended", detail: "CO-50 denial — LCD criteria met per documentation.", claim: "MLX-10218", amount: 1248, resolver: "Denial Specialist" },
  { id: "d5", type: "high-risk", title: "High-risk claim detected", detail: "Timely filing limit in 6 days — payer requires corrected claim.", claim: "MLX-09980", amount: 870, resolver: "A/R Specialist" },
  { id: "d6", type: "auth", title: "Authorization not on file", detail: "MRI lumbar scheduled 09/14 — payer requires prior auth.", claim: "MLX-10602", amount: 1560, resolver: "Authorization Coordinator" },
  { id: "d7", type: "coding", title: "Coding specificity flag", detail: "Unspecified diagnosis where laterality is documented.", claim: "MLX-10588", amount: 96, resolver: "Certified Coder" },
  { id: "d8", type: "underpayment", title: "Payer pattern identified", detail: "Commercial B underpaying 97110 by 12% across 41 claims.", claim: "Batch", amount: 2140, resolver: "Payment Integrity Analyst" },
];

export const AI_MORNING = {
  greeting: "Good morning. I found 37 claims requiring attention.",
  recommendations: [
    { text: "12 claims can be appealed.", value: "$9,640" },
    { text: "8 eligibility issues detected.", value: "$3,120" },
    { text: "5 underpayments identified.", value: "$1,860" },
    { text: "$18,420 potential revenue recovery this week.", value: "" },
  ],
};

export type ClaimStage = {
  id: number;
  name: string;
  status: string;
  timestamp: string;
  detail: string;
  work: string[];
  amount?: string;
};

export const CLAIM_JOURNEY: ClaimStage[] = [
  { id: 1, name: "Patient Visit", status: "Eligibility Verified", timestamp: "Day 0 · 8:42 AM", detail: "Coverage confirmed 48 hours before the appointment. Copay and deductible remaining shared with the front desk.", work: ["270/271 eligibility check", "Benefit summary to front desk", "Auth requirement screened"] },
  { id: 2, name: "Coding", status: "CPT / ICD Review Complete", timestamp: "Day 1 · 10:15 AM", detail: "Certified coder confirmed E/M level from documented MDM, added modifier 25 for the same-day procedure, and validated diagnosis specificity.", work: ["E/M level validated (99214)", "Modifier 25 applied", "ICD-10 specificity confirmed"] },
  { id: 3, name: "Claim Submission", status: "Submitted", timestamp: "Day 1 · 4:30 PM", detail: "Claim scrubbed against payer edits and NCCI rules, then transmitted electronically. Clearinghouse acceptance received same day.", work: ["Payer edit scrub passed", "837P transmitted", "999/277 acceptance logged"] },
  { id: 4, name: "Payer", status: "Adjudicated", timestamp: "Day 14 · 9:02 AM", detail: "Payer adjudicated the claim. AI compared the allowed amount against the contracted rate — no variance detected.", work: ["Claim status tracked daily", "Adjudication received", "Contract variance check: 0%"] },
  { id: 5, name: "Payment", status: "Paid $1,248.00", timestamp: "Day 16 · 11:20 AM", detail: "835 remittance received and matched to the claim. Patient responsibility calculated from the EOB.", work: ["835 ERA received", "EFT deposit matched", "Patient balance: $40.00 copay (collected at visit)"], amount: "$1,248.00" },
  { id: 6, name: "Reconciliation", status: "Posted", timestamp: "Day 16 · 11:45 AM", detail: "Payment posted, contractual adjustment applied, and the claim closed with a full audit trail visible in your dashboard.", work: ["Payment posted to ledger", "Contractual adjustment applied", "Claim closed · audit trail complete"] },
];

export const CLAIM_ID = "MLX-10492";

export type LeakCause = { name: string; share: number; detail: string };

/** Illustrative distribution of revenue leakage causes (sums to 100). */
export const LEAK_CAUSES: LeakCause[] = [
  { name: "Denied Claims", share: 26, detail: "Preventable denials that are never reworked." },
  { name: "Coding Errors", share: 17, detail: "Under-coding, missing modifiers, unspecific diagnoses." },
  { name: "Eligibility Issues", share: 15, detail: "Inactive coverage discovered after the visit." },
  { name: "Missed Charges", share: 12, detail: "Services rendered but never billed." },
  { name: "Underpayments", share: 11, detail: "Paid below contract and never challenged." },
  { name: "Aging A/R", share: 12, detail: "Balances that pass timely-filing limits." },
  { name: "Credentialing Delays", share: 7, detail: "Providers seeing patients before payers will pay." },
];

export const TEAM_ROLES = [
  { role: "Medical Coders", detail: "Certified, specialty-aligned coding with documentation feedback." },
  { role: "Billers", detail: "Clean claims out daily; rejections handled within one business day." },
  { role: "A/R Specialists", detail: "Aging balances worked by payer strategy and timely-filing risk." },
  { role: "Denial Specialists", detail: "Root-cause analysis, prioritized appeals, prevention loops." },
  { role: "Credentialing Specialists", detail: "Enrollment, CAQH, and re-credentialing tracked to completion." },
  { role: "Account Managers", detail: "Your named point of contact, weekly reviews, clear escalation." },
  { role: "AI Automation", detail: "Denial risk, underpayment, and eligibility detection at scale." },
];

export const BEFORE_AFTER = {
  before: ["Administrative overload", "Aging A/R", "Denials", "Unpaid claims", "Manual work", "Staff burnout"],
  after: ["Cleaner claims", "Faster payments", "Recovered revenue", "Transparent reporting", "Less administrative work", "More time for patients"],
};
