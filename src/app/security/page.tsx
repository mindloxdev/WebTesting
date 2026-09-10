import type { Metadata } from "next";
import { LegalPage, LEGAL_PLACEHOLDER } from "@/concepts/company/LegalPage";

export const metadata: Metadata = {
  title: "HIPAA & Security",
  description: "How Mindlox AI approaches HIPAA-conscious workflows, access control, audit logging, and data protection.",
  robots: { index: false, follow: true },
};

export default function SecurityPage() {
  return (
    <LegalPage
      crumb="HIPAA / Security"
      eyebrow="Security"
      title="HIPAA & Security"
      highlight="Security"
      description="Our security posture, stated only where we can stand behind it. Each item below is marked for confirmation before publishing."
      sections={[
        {
          heading: "HIPAA-conscious workflows",
          paragraphs: ["Minimum-necessary access, documented handling procedures, and workforce training across every stage of the revenue cycle."],
          bullets: ["Workforce HIPAA training cadence [confirm]", "Documented policies and procedures [confirm]", "Incident response process [confirm]"],
        },
        {
          heading: "Business Associate Agreements",
          paragraphs: ["Mindlox AI enters into Business Associate Agreements with covered entities where applicable. [Confirm legal language before publishing.]"],
        },
        {
          heading: "Access control",
          paragraphs: ["Role-based access ensures team members see only the accounts and data their role requires."],
          bullets: ["Role-based permissions [confirm]", "Multi-factor authentication [confirm]", "Access reviews on a defined cadence [confirm]"],
        },
        {
          heading: "Audit logging",
          paragraphs: ["Every claim action is recorded and visible to the client through their dashboard. [Confirm retention period.]"],
        },
        {
          heading: "Data protection",
          paragraphs: ["Encryption in transit and at rest; secure exchange with clearinghouses and payers. [Confirm specifics — protocols, key management, hosting.]"],
        },
        {
          heading: "Certifications and assessments",
          paragraphs: ["[List certifications, third-party assessments, or attestations only once verified. Do not publish unverified claims.]"],
        },
        { heading: "Reporting a security concern", paragraphs: ["[Security contact placeholder.]", LEGAL_PLACEHOLDER] },
      ]}
    />
  );
}
