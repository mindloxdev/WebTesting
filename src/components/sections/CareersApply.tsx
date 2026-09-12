import { Lock, Mail } from "lucide-react";
import { CONTACT } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Roles we hire for. Not a list of currently open positions; every application is read. */
export const CAREER_ROLES = [
  { title: "Certified Medical Coder", detail: "CPT, ICD-10-CM, and HCPCS coding aligned to a specialty, with documentation feedback to providers." },
  { title: "Medical Biller", detail: "Daily claim creation, scrubbing, submission, and rejection follow-through." },
  { title: "A/R Specialist", detail: "Aging balances worked by payer strategy with timely-filing awareness." },
  { title: "Denial & Appeals Specialist", detail: "Root-cause categorization, prioritized appeals, and the prevention loop back to the front end." },
  { title: "Credentialing Specialist", detail: "Provider credentialing, payer enrollment, CAQH maintenance, and re-credentialing calendars." },
  { title: "Account Manager", detail: "The named point of contact for a group of practices: weekly reviews, escalations, and results." },
  { title: "Software Engineer", detail: "The dashboards, automation, and decision-support tools our specialists use every day." },
] as const;

const subject = encodeURIComponent("Application — Mindlox AI");
const body = encodeURIComponent(
  "Hello Mindlox AI,\n\nI'd like to apply for the role of: \nLocation: \nA few lines about my experience: \n\nMy resume is attached.\n",
);

export const APPLY_HREF = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

/** Compact apply card used on /careers and on /contact?intent=careers. */
export function CareersApply({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-[22px] border border-line bg-bg p-8 shadow-e3 lg:p-10">
        <p className="eyebrow mb-4">How to apply</p>
        <h2 className="font-display text-2xl font-semibold text-fg">Send us your resume. A person reads every application.</h2>
        <p className="mt-3 text-fg-2">
          Email your resume to <a href={`mailto:${CONTACT.email}`} className="font-medium text-fg underline decoration-line underline-offset-4 hover:text-accent">{CONTACT.email}</a> with the role you are interested in as the subject line. Tell us the specialties or systems you know best and where you are based. We reply to every applicant.
        </p>
        <ol className="mt-6 space-y-3">
          {[
            ["01", "Introduce yourself", "Your resume, the role, and two or three lines on what you want to fix in the revenue cycle."],
            ["02", "A conversation", "A working call with the team lead for that role: your experience, our workflows, honest questions both ways."],
            ["03", "A practical exercise", "A short, realistic task from the role, such as reading a remittance or planning an A/R queue, so we both see the fit."],
          ].map(([n, t, d]) => (
            <li key={n} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent bg-bg font-mono text-[11px] text-accent">{n}</span>
              <div>
                <p className="font-medium text-fg">{t}</p>
                <p className="text-sm text-fg-2">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <MagneticButton href={APPLY_HREF} arrow hoverLabel="Open Your Email App" magnetic={false}>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> Apply by email
            </span>
          </MagneticButton>
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-xs text-fg-3">
          <Lock className="size-3" aria-hidden /> Please do not include patient information in your application.
        </p>
      </div>
    </div>
  );
}
