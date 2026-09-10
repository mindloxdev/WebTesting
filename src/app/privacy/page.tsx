import type { Metadata } from "next";
import { LegalPage, LEGAL_PLACEHOLDER } from "@/concepts/company/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Mindlox AI privacy policy.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      description="How Mindlox AI collects, uses, and protects information on this website and in the course of its services."
      sections={[
        { heading: "Information we collect", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "How we use information", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Protected health information", paragraphs: ["Mindlox AI handles protected health information only in its role as a business associate under agreements with covered entities. This website does not request patient information.", LEGAL_PLACEHOLDER] },
        { heading: "Cookies and analytics", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Sharing and disclosure", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Your choices", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Contact", paragraphs: ["[Privacy contact placeholder — email and mailing address.]"] },
      ]}
    />
  );
}
