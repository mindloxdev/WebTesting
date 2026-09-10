export type LifecycleStage = {
  id: number;
  name: string;
  short: string;
  /** What Mindlox AI does here. */
  action: string;
  /** Where AI assists (responsible language). */
  ai: string;
  phase: "front" | "mid" | "back";
};

export const LIFECYCLE: LifecycleStage[] = [
  { id: 1, name: "Patient Registration", short: "Registration", action: "Demographic and insurance capture reviewed for accuracy before the visit.", ai: "Pattern detection flags mismatched demographics and duplicate records.", phase: "front" },
  { id: 2, name: "Eligibility & Verification", short: "Eligibility", action: "Coverage, benefits, and patient responsibility confirmed in advance.", ai: "Automated 270/271 checks surface inactive plans and coverage changes.", phase: "front" },
  { id: 3, name: "Authorization", short: "Authorization", action: "Auth requirements identified by payer and service; approvals tracked to completion.", ai: "Decision support identifies services that require authorization.", phase: "front" },
  { id: 4, name: "Charge Capture", short: "Charges", action: "Every rendered service reconciled to a charge; missing charges reported.", ai: "Schedule-to-charge reconciliation flags likely missed charges.", phase: "front" },
  { id: 5, name: "Medical Coding", short: "Coding", action: "Certified coders assign CPT, ICD-10-CM, and HCPCS with modifiers.", ai: "Coding suggestions and NCCI edit checks assist human coders.", phase: "mid" },
  { id: 6, name: "Claim Creation", short: "Claim", action: "Clean 837 claims assembled with complete payer-specific data.", ai: "Payer rule libraries validate required fields.", phase: "mid" },
  { id: 7, name: "Claim Scrubbing", short: "Scrubbing", action: "Claims validated against payer edits and specialty rules before release.", ai: "Denial-risk scoring predicts likely rejections before submission.", phase: "mid" },
  { id: 8, name: "Submission", short: "Submission", action: "Daily electronic submission through the clearinghouse with rejection triage.", ai: "Rejection patterns are categorized and routed automatically.", phase: "mid" },
  { id: 9, name: "Payment Posting", short: "Posting", action: "835 remittances and EOBs posted and reconciled daily.", ai: "Contract variance detection surfaces underpayments instantly.", phase: "back" },
  { id: 10, name: "Denial Management", short: "Denials", action: "Denials categorized by root cause and prioritized by recoverable value.", ai: "Denial taxonomy and prioritization models rank the work queue.", phase: "back" },
  { id: 11, name: "A/R Follow-Up", short: "A/R", action: "Aging balances worked by payer strategy with timely-filing awareness.", ai: "A/R priority scoring focuses effort where recovery is most likely.", phase: "back" },
  { id: 12, name: "Appeals", short: "Appeals", action: "Payer-specific appeals with supporting clinical documentation.", ai: "Appeal recommendations and template selection assist specialists.", phase: "back" },
  { id: 13, name: "Patient Billing", short: "Patient Billing", action: "Clear statements, payment plans, and respectful follow-up.", ai: "Statement timing and channel optimization.", phase: "back" },
  { id: 14, name: "Reporting & Analytics", short: "Analytics", action: "Living dashboards and monthly strategy reviews on every KPI that matters.", ai: "Trend detection and anomaly alerts across payers and providers.", phase: "back" },
];

export const PHASE_LABELS: Record<LifecycleStage["phase"], string> = {
  front: "Front end",
  mid: "Mid cycle",
  back: "Back end",
};
