"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TARGET_ORGS } from "@/data/content";
import { CTA } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn, pad2 } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Brief = { matters: string[]; leaks: string[]; deployed: string[] };

const BRIEFS: Record<string, Brief> = {
  "Physician Groups": {
    matters: ["Consistent E/M coding across every provider", "Payer contract performance by location", "Provider-level productivity and collections"],
    leaks: ["E/M under-coding that varies by provider", "Denials left unworked across locations", "Missed charges from schedule-to-charge gaps"],
    deployed: ["Dedicated coding and A/R team for the group", "Provider scorecards with coding feedback", "Weekly review with practice leadership"],
  },
  "Multi-Specialty Practices": {
    matters: ["Specialty-specific payer rules under one roof", "Consolidated reporting by specialty and site", "Shared front-desk eligibility accuracy"],
    leaks: ["Generalist coding applied across specialties", "Specialty denials — auth, frequency, medical necessity", "Inconsistent eligibility workflows by department"],
    deployed: ["Specialty-aligned coders and denial specialists", "One dashboard, filtered by specialty and location", "Standardized pre-visit eligibility workflow"],
  },
  Hospitals: {
    matters: ["Facility and professional billing coordination", "DNFB (discharged, not final billed) days", "Case mix, DRG accuracy, charge master integrity"],
    leaks: ["DNFB lag and late charges", "Inpatient medical-necessity denials", "Underpayments on complex facility contracts"],
    deployed: ["DNFB reduction program with daily tracking", "Contract-variance detection on facility claims", "Denial taxonomy by department; executive reporting"],
  },
  "Ambulatory Surgery Centers": {
    matters: ["Implant billing and invoice reconciliation", "Multiple-procedure and bilateral rules", "Payer-specific ASC fee schedules and authorizations"],
    leaks: ["Implants under-reimbursed or undocumented", "Multiple-procedure reductions applied incorrectly", "Authorization missing on add-on procedures"],
    deployed: ["Case-level authorization check at scheduling", "Implant invoice-to-claim reconciliation", "ASC fee schedules loaded; variance detection on every remit"],
  },
  "Urgent Care": {
    matters: ["Registration accuracy at walk-in speed", "Real-time eligibility before the visit ends", "Contract codes (S9083/S9088) vs. fee-for-service"],
    leaks: ["Inactive coverage discovered after the visit", "Contract codes misapplied by payer", "Uncollected self-pay balances"],
    deployed: ["Real-time eligibility at check-in", "Payer contract rule engine", "Front-desk collection playbooks; same-day scrubbing"],
  },
  "Behavioral Health": {
    matters: ["Session limits and authorization renewals", "Clinician credentialing by payer", "Time-based codes and parity rules"],
    leaks: ["Sessions rendered beyond authorization", "Non-credentialed clinicians rendering care", "Telehealth modifier and POS errors"],
    deployed: ["Session-limit and authorization alerts", "Clinician credentialing program", "Telehealth policy tracking by payer and state"],
  },
  "Specialty Clinics": {
    matters: ["Procedure-specific coding and modifiers", "LCD/NCD medical necessity criteria", "Global periods and drug/infusion billing"],
    leaks: ["Medical-necessity denials", "Global-period bundling errors", "Drug unit, NDC, and wastage errors"],
    deployed: ["Specialty playbooks with payer rules", "LCD/NCD checks before submission", "Global-period management and drug billing validation"],
  },
  Laboratories: {
    matters: ["Panel bundling and unit accuracy", "Diagnosis-driven coverage policies", "Client billing vs. third-party billing"],
    leaks: ["Medical-necessity denials by diagnosis", "Unbundled panels and MUE overages", "Missing ordering-provider NPI; client-bill misrouting"],
    deployed: ["Panel bundling engine", "Necessity rule library by payer", "Client billing reconciliation"],
  },
  "DME Suppliers": {
    matters: ["Standard written orders and proof of delivery", "Capped rental cycles", "Same-or-similar checks and audit readiness"],
    leaks: ["Documentation gaps that void claims", "Rentals billed past the capped cycle", "Same-or-similar denials"],
    deployed: ["Documentation completeness engine", "Rental billing automation", "Audit response support (TPE, RAC)"],
  },
  "Telehealth Organizations": {
    matters: ["POS 02/10 and modifiers 95/GT/GQ", "State licensure and payer parity policies", "Audio-only coverage rules"],
    leaks: ["POS/modifier mismatches", "Services billed that aren't telehealth-eligible", "Licensure mismatches by state"],
    deployed: ["Telehealth policy library by payer", "POS/modifier automation", "Licensure tracking by state and clinician"],
  },
};

const COLUMNS: { key: keyof Brief; label: string }[] = [
  { key: "matters", label: "What matters" },
  { key: "leaks", label: "Where revenue leaks" },
  { key: "deployed", label: "How Mindlox AI is deployed" },
];

/** Organization-type selector: selecting one morphs a three-column brief in place. */
export function OrgSelector({ className }: { className?: string }) {
  const [active, setActive] = useState<string>(TARGET_ORGS[0]);
  const brief = BRIEFS[active] ?? BRIEFS["Physician Groups"];
  const idx = TARGET_ORGS.indexOf(active);

  return (
    <div className={cn("border border-line bg-bg", className)}>
      <div className="no-scrollbar flex overflow-x-auto border-b border-line" role="tablist" aria-label="Organization types">
        {TARGET_ORGS.map((o, i) => {
          const on = o === active;
          return (
            <button
              key={o}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(o)}
              className={cn(
                "relative shrink-0 border-r border-line px-4 py-3.5 text-left text-sm font-medium transition-colors duration-300 last:border-r-0",
                on ? "bg-fg text-bg" : "text-fg-2 hover:bg-bg-2 hover:text-fg",
              )}
            >
              <span className="mr-2 font-mono text-[10px] opacity-60">{pad2(i + 1)}</span>
              {o}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{ show: { transition: { staggerChildren: 0.06 } }, exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } } }}
          className="grid divide-line md:grid-cols-3 md:divide-x"
        >
          {COLUMNS.map((c, ci) => (
            <motion.div
              key={c.key}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
              }}
              className={cn("p-6 lg:p-8", ci === 2 && "bg-bg-2")}
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
                <span className="mr-2 text-accent">{pad2(ci + 1)}</span>
                {c.label}
              </p>
              <ul className="space-y-3">
                {brief[c.key].map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug text-fg">
                    <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", ci === 1 ? "bg-fg/40" : "bg-accent")} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-4 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
          {pad2(idx + 1)} / {pad2(TARGET_ORGS.length)} · {active}
        </p>
        <MagneticButton href={CTA.specialistHref} size="sm" arrow magnetic={false} hoverLabel="Schedule a Working Session">
          Talk to an RCM Specialist
        </MagneticButton>
      </div>
    </div>
  );
}
