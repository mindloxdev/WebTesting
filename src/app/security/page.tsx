import type { Metadata } from "next";
import { LegalPage } from "@/templates/company/LegalPage";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "HIPAA & Security",
  description: "How Mindlox AI handles protected health information as a business associate: HIPAA-conscious workflows, access control, audit logging, and data protection.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      crumb="HIPAA / Security"
      eyebrow="Security"
      title="HIPAA & Security"
      highlight="Security"
      description="How we handle protected health information and protect the data our clients trust us with. Stated plainly, and only where we can stand behind it."
      sections={[
        {
          heading: "Our role under HIPAA",
          paragraphs: [
            "Mindlox AI handles protected health information (PHI) as a business associate of the healthcare organizations we serve. We execute a Business Associate Agreement with each covered entity before PHI is handled, and our obligations under HIPAA and that agreement govern everything below.",
          ],
        },
        {
          heading: "HIPAA-conscious workflows",
          paragraphs: ["Every stage of the revenue cycle is designed around the minimum-necessary standard: people see only the information their task requires."],
          bullets: [
            "Documented policies and procedures for handling PHI across registration, coding, claims, posting, denials, A/R, and patient billing.",
            "Workforce HIPAA training at onboarding and on a recurring basis, with role-specific guidance.",
            "A defined incident response process, including client notification as required by HIPAA and our agreements.",
          ],
        },
        {
          heading: "Access control",
          paragraphs: ["Access to client systems and data is granted by role, reviewed on a defined cadence, and removed promptly when a role changes or ends."],
          bullets: ["Role-based permissions scoped to the accounts and functions each team member works.", "Multi-factor authentication on the systems that support it.", "Periodic access reviews and same-day offboarding."],
        },
        {
          heading: "Audit logging",
          paragraphs: ["Claim actions taken by our team are recorded and visible to the client through their dashboard, so every status change has a who, what, and when. Logs are retained for the period set out in the client agreement."],
        },
        {
          heading: "Data protection",
          paragraphs: [
            "Data is encrypted in transit and at rest on the systems we operate. Claims, remittances, and eligibility transactions are exchanged with clearinghouses and payers over established secure channels. We do not send PHI by unencrypted email, and this website is not designed to receive it.",
          ],
        },
        {
          heading: "Working inside your systems",
          paragraphs: [
            "Wherever possible we work within the EHR and practice management systems a client already uses, under the client's own access controls, rather than exporting data into separate tools. Specific connectivity is agreed during discovery and documented in the engagement.",
          ],
        },
        {
          heading: "Security documentation and assessments",
          paragraphs: [
            "Our security policies, and any third-party assessments we hold, are available to prospective and current clients on request under a confidentiality agreement. We do not publish claims about certifications or attestations on this website; ask us and we will share what is current.",
          ],
        },
        {
          heading: "Reporting a security concern",
          paragraphs: [
            `If you believe you have found a security issue involving Mindlox AI, email ${CONTACT.email} or call ${CONTACT.phone}. We acknowledge reports promptly, investigate, and keep you informed. We ask that you give us a reasonable opportunity to address an issue before sharing it publicly, and that you do not access or retain data that is not yours.`,
          ],
        },
      ]}
    />
  );
}
