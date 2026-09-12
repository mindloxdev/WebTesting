/* ------------------------------------------------------------------ */
/*  BLOG — educational articles written by the Mindlox AI team.        */
/*  Add a post: append to POSTS. Body is a list of blocks so no        */
/*  markdown library is needed. Domain-accurate; no invented figures.  */
/* ------------------------------------------------------------------ */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, used for sorting and display. */
  date: string;
  author: string;
  body: BlogBlock[];
};

export const BLOG_AUTHOR = "Mindlox AI team";

export const POSTS: BlogPost[] = [
  {
    slug: "clean-claim-rate",
    title: "Clean claim rate: the number that decides how fast you get paid",
    excerpt: "What clean claim rate measures, why it moves cash flow more than almost any other metric, and the front-end habits that raise it.",
    category: "Metrics",
    date: "2026-09-08",
    author: BLOG_AUTHOR,
    body: [
      { type: "p", text: "Clean claim rate is the share of claims that get through on the first submission without being rejected, denied, or sent back for correction. It is one of the simplest numbers in the revenue cycle and one of the most revealing, because every claim that fails the first pass costs the practice twice: once in the days it waits, and again in the staff time it takes to fix and resubmit." },
      { type: "h2", text: "Two definitions, and why you should track both" },
      { type: "p", text: "Practices use the phrase loosely, so it helps to be precise. First-pass acceptance measures whether the clearinghouse and payer accepted the claim into adjudication. First-pass resolution measures whether the claim was actually paid as expected on that first submission. A claim can be accepted and still be denied, so a practice with a high acceptance rate can still be leaking revenue. Tracking both tells you whether the problem is data quality before submission or payer rules after it." },
      { type: "h2", text: "Why it matters more than it looks" },
      { type: "ul", items: [
        "Every reworked claim adds days between the visit and the payment, which shows up as higher A/R days and a lumpier cash position.",
        "Rework consumes the same staff hours that could be spent on appeals and aged balances, where the recoverable dollars are larger.",
        "Claims that bounce more than once drift toward payer timely-filing limits, at which point a fixable problem becomes a write-off.",
        "A falling rate is usually the earliest visible signal that something changed upstream: a new payer edit, a registration habit, a coding update.",
      ] },
      { type: "h2", text: "What actually lowers it" },
      { type: "p", text: "Most first-pass failures are not exotic. They are missing or mismatched demographic data, inactive coverage, a modifier that conflicts with the procedure, a diagnosis that does not support medical necessity, a missing authorization number, or a payer-specific edit that the scrubber did not know about. The pattern is that the cause almost always sits before the claim was built, not in the claim itself." },
      { type: "h2", text: "How to raise it" },
      { type: "ul", items: [
        "Verify eligibility and benefits before the visit, and again on the day of service for plans that change often.",
        "Scrub claims against NCCI edits, payer-specific rules, and specialty requirements before transmission, not after a rejection.",
        "Categorize every rejection and denial by root cause, then fix the cause at the front desk, in coding, or in payer setup.",
        "Review the rate by payer and by provider. A practice-wide number hides the one payer or one workflow that is dragging it down.",
        "Submit daily. Batching claims weekly adds delay and makes a single bad batch much more expensive.",
      ] },
      { type: "h2", text: "What a good number looks like" },
      { type: "p", text: "A mid-90s percentage is a common target, but the right goal depends on your specialty and payer mix. A practice with heavy authorization requirements or a complex Medicaid population will have a harder ceiling than a primary care office. The more useful question is direction: is the rate rising month over month, and can you name the root cause behind every point it drops?" },
      { type: "quote", text: "A denial that is worked is a denial that should not have happened. Clean claim rate is the scoreboard for that idea." },
    ],
  },
  {
    slug: "how-to-read-a-denial-carc-rarc",
    title: "How to read a denial: CARC and RARC codes, explained",
    excerpt: "Remittance codes are the payer telling you exactly why it did not pay. Here is how to decode them and turn them into a prevention plan.",
    category: "Denials",
    date: "2026-08-25",
    author: BLOG_AUTHOR,
    body: [
      { type: "p", text: "Every electronic remittance carries a set of standardized codes that explain how the payer adjudicated the claim. Read correctly, they are a map of where your revenue cycle is leaking. Read casually, they become a queue of claims that get reworked one at a time while the same problem repeats next week." },
      { type: "h2", text: "The two code sets" },
      { type: "p", text: "Claim Adjustment Reason Codes, or CARCs, state why an amount was adjusted or denied. Remittance Advice Remark Codes, or RARCs, add detail that the CARC alone does not carry, such as what documentation was missing. Each CARC is paired with a group code that says who is responsible for the amount." },
      { type: "ul", items: [
        "CO, contractual obligation: the provider cannot bill the patient for this amount. Most true denials arrive here.",
        "PR, patient responsibility: deductible, coinsurance, copay, or a non-covered service the patient can be billed for.",
        "OA, other adjustment: used when neither CO nor PR applies, often for coordination-of-benefits situations.",
        "PI, payer-initiated reduction: the payer reduced payment for a reason that is not a contractual obligation.",
      ] },
      { type: "h2", text: "Codes you will see constantly" },
      { type: "ul", items: [
        "CO-16: the claim lacks information or has a billing error. Almost always paired with a RARC that names the missing element.",
        "CO-18: duplicate claim or service. Usually a resubmission that crossed with the original in process.",
        "CO-29: the time limit for filing has expired. This one is rarely recoverable, which is why timely-filing tracking matters.",
        "CO-50: the service is not deemed medically necessary. Diagnosis-to-procedure support or payer coverage policy is the usual root cause.",
        "CO-97: the benefit for this service is included in another service already adjudicated. Bundling and modifier logic.",
        "CO-197: precertification, authorization, or notification is absent.",
        "CO-4: the procedure code is inconsistent with the modifier, or a required modifier is missing.",
        "CO-11: the diagnosis is inconsistent with the procedure.",
        "PR-1, PR-2, PR-3: deductible, coinsurance, and copay. Not denials, but they decide the patient statement.",
      ] },
      { type: "h2", text: "From codes to a taxonomy" },
      { type: "p", text: "The value is not in knowing what CO-197 means. It is in grouping every denial into a small set of root causes that each have an owner and a prevention step. Authorization denials belong to the front desk and the authorization workflow. Medical necessity denials belong to coding and documentation. Eligibility denials belong to registration. Timely filing belongs to submission cadence and A/R follow-up. When each category has a name, a count, and a dollar value, the practice can decide what to fix first." },
      { type: "h2", text: "A simple weekly routine" },
      { type: "ul", items: [
        "Pull every denial from the week and tag it with its root-cause category, not just its CARC.",
        "Rank categories by recoverable dollars, not by count. Ten small eligibility denials may matter less than two large authorization denials.",
        "Appeal what is appealable with the documentation the payer's policy asks for, and track the deadline for each level.",
        "Send the top prevention fix back to the team that owns it, and check next week whether the category shrank.",
      ] },
      { type: "quote", text: "The payer has already told you why. The work is to listen at the level of patterns instead of claims." },
    ],
  },
  {
    slug: "timely-filing-limits",
    title: "Timely filing limits: the quiet deadline that turns revenue into write-offs",
    excerpt: "Every payer gives you a window to submit and to appeal. Miss it and a fixable claim becomes an unrecoverable one. How to stay ahead of the clock.",
    category: "A/R",
    date: "2026-08-11",
    author: BLOG_AUTHOR,
    body: [
      { type: "p", text: "Timely filing is the deadline a payer sets for receiving a claim after the date of service. It is not a suggestion. A claim received after the limit is denied, usually with CARC CO-29, and in most cases the balance cannot be shifted to the patient. It simply disappears from the practice's revenue." },
      { type: "h2", text: "The limits vary more than people expect" },
      { type: "ul", items: [
        "Medicare generally requires claims within one calendar year from the date of service.",
        "Medicaid limits are set by each state and can be considerably shorter.",
        "Commercial payers set limits in the provider contract. Windows of 90 to 180 days are common, and some are shorter for corrected claims.",
        "Appeals have their own deadlines, counted from the date on the remittance or denial letter, and each appeal level may differ.",
        "Secondary claims often run from the primary payer's adjudication date, not the date of service.",
      ] },
      { type: "h2", text: "Where practices lose the clock" },
      { type: "p", text: "The obvious case is a claim that was never sent. The more common case is a claim that was sent, rejected at the clearinghouse for a data error, and left in a work queue nobody owns. Each day it sits, the window closes a little. By the time someone corrects and resubmits it, the payer receives it late and denies it, even though the practice believes it was filed on time." },
      { type: "h2", text: "Proof of timely filing" },
      { type: "p", text: "When a payer denies for timely filing but the practice submitted in time, the claim can often be reopened with evidence. Clearinghouse acceptance reports and payer acknowledgment transactions are the documentation that carries weight. Keep them. A practice that cannot produce an acceptance report for the original submission usually cannot win the appeal." },
      { type: "h2", text: "How to stay ahead of it" },
      { type: "ul", items: [
        "Maintain a payer-by-payer table of filing and appeal limits, and review it whenever a contract changes.",
        "Submit claims daily, so a rejected batch is caught with months of runway rather than days.",
        "Work rejections within one business day. A rejection is not a denial yet, but it becomes one if it waits.",
        "Sort the A/R work queue by days-to-deadline as well as by balance, so claims approaching a limit are touched first.",
        "Archive acceptance reports and remittances where they can be retrieved for an appeal.",
      ] },
      { type: "quote", text: "Timely filing denials are the only category where the money was earned, the claim was valid, and the practice still gets nothing. They deserve zero tolerance." },
    ],
  },
  {
    slug: "no-surprises-act-out-of-network-claims",
    title: "The No Surprises Act and out-of-network claims: what practices need to know",
    excerpt: "The federal rules that limit balance billing also changed how out-of-network claims get paid. A plain-language guide to the moving parts.",
    category: "Out-of-network",
    date: "2026-07-28",
    author: BLOG_AUTHOR,
    body: [
      { type: "p", text: "The No Surprises Act took effect on January 1, 2022. Its headline purpose is patient protection: people should not receive surprise bills for care they could not reasonably have chosen in-network. For providers, it also created a structured process for how certain out-of-network claims are paid and disputed. Both halves matter for revenue." },
      { type: "h2", text: "What it covers" },
      { type: "ul", items: [
        "Emergency services, regardless of whether the facility or the clinician is in the patient's network.",
        "Non-emergency services delivered by out-of-network clinicians at in-network facilities, with limited exceptions where the patient gives informed consent in advance.",
        "Air ambulance services from out-of-network providers.",
      ] },
      { type: "p", text: "For covered services, the patient's cost-sharing is limited to what it would have been in-network, and the provider cannot balance bill for the difference. State laws may add protections for fully insured plans, so the applicable rule depends on the plan type and the state." },
      { type: "h2", text: "How payment works" },
      { type: "p", text: "After receiving a clean claim for a covered out-of-network service, the plan is required to send an initial payment or a notice of denial within 30 calendar days. If the provider disagrees with the amount, it can start a 30-business-day open negotiation period with the plan. If the parties still cannot agree, either side can initiate the federal Independent Dispute Resolution process within the window that follows open negotiation. A certified IDR entity then selects one of the two offers, taking into account factors that include the qualifying payment amount, which is generally based on the plan's median contracted rate." },
      { type: "h2", text: "What this means operationally" },
      { type: "ul", items: [
        "Out-of-network status has to be identified at eligibility, before the visit, so the practice knows which rules will apply to the claim.",
        "Initial payments should be compared against benchmark data and the practice's fee schedule rather than accepted by default.",
        "Open negotiation and IDR deadlines are short and unforgiving. They need to be tracked the same way timely-filing limits are.",
        "Documentation of the service, the setting, and the network status of the facility decides whether a claim falls under the Act at all.",
        "Uninsured and self-pay patients are entitled to a good-faith estimate before scheduled care, which is a front-office process, not a billing one.",
      ] },
      { type: "h2", text: "Where negotiation still happens outside the Act" },
      { type: "p", text: "Many out-of-network claims are not covered by the No Surprises Act, for example elective care a patient knowingly chose out of network. For those, single-case agreements negotiated before care, and post-adjudication negotiation on the payer's offer, remain the tools that set a defensible rate. The right approach is decided claim by claim, which is why out-of-network work benefits from a dedicated process rather than being folded into general A/R." },
      { type: "quote", text: "The Act did not make out-of-network care unpayable. It made the process more structured, and structure rewards practices that track it." },
    ],
  },
  {
    slug: "eligibility-verification-before-the-visit",
    title: "Eligibility verification before the visit: the front-end fix for back-end denials",
    excerpt: "Most eligibility denials are decided before the patient sits down. What a pre-visit verification workflow should check, and how to measure whether it works.",
    category: "Front end",
    date: "2026-07-14",
    author: BLOG_AUTHOR,
    body: [
      { type: "p", text: "Eligibility denials are the most preventable category in the revenue cycle. The payer is not disputing the care, the code, or the documentation. It is saying the coverage on the claim did not exist, did not apply, or belonged to someone else on the date of service. Every one of those facts was knowable before the visit." },
      { type: "h2", text: "What a verification checks" },
      { type: "p", text: "An electronic eligibility inquiry, the 270 transaction, returns a 271 response from the payer. The response is more than an active-or-inactive flag. A complete check reads and records the details that decide the claim and the patient statement." },
      { type: "ul", items: [
        "Coverage status on the planned date of service, not just today.",
        "Plan type and payer ID, including whether a Medicare beneficiary is enrolled in a Medicare Advantage plan.",
        "Copay, deductible remaining, coinsurance, and out-of-pocket status for the visit type.",
        "Whether the service requires prior authorization or a referral under this plan.",
        "Secondary or tertiary coverage, and which plan is primary under coordination of benefits.",
        "Network status of the rendering provider and the location.",
      ] },
      { type: "h2", text: "The denials it prevents" },
      { type: "ul", items: [
        "CO-27: expenses incurred after coverage terminated.",
        "CO-31: patient cannot be identified as the payer's insured. Usually a demographic or member ID mismatch.",
        "CO-22: the care may be covered by another payer under coordination of benefits.",
        "CO-109: the claim was sent to the wrong payer or contractor.",
        "CO-197: authorization absent, when the check would have shown the requirement.",
      ] },
      { type: "h2", text: "A workflow that holds up" },
      { type: "ul", items: [
        "Run batch verification two to three days before scheduled visits, so problems can be resolved by phone before the patient arrives.",
        "Re-verify on the day of service for plans that change frequently and for any patient whose coverage was flagged.",
        "Capture the response in the practice management system so front-desk staff and billers see the same answer.",
        "Collect known patient responsibility at check-in, using the deductible and copay figures from the response.",
        "Route any authorization requirement to the authorization desk the moment the check reveals it.",
      ] },
      { type: "h2", text: "How to know it is working" },
      { type: "p", text: "Track eligibility-related denials as their own category, by count and by dollars, and watch the trend after the workflow changes. Track the share of visits verified before the appointment. Track point-of-service collections. When the first number falls and the other two rise, the front end is doing the job the back end used to pay for." },
      { type: "quote", text: "A denial discovered thirty days after the visit is a verification that was skipped thirty days before it." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Posts newest first. */
export const sortedPosts = () => [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

/** Approximate reading time in minutes at ~220 words per minute. */
export const readingTime = (post: BlogPost) => {
  const words = post.body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
