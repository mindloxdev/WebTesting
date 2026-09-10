import type { Metadata } from "next";
import { LegalPage, LEGAL_PLACEHOLDER } from "@/concepts/company/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Mindlox AI website terms of service.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms that govern use of this website. Service engagements are governed by separate written agreements."
      sections={[
        { heading: "Acceptance of terms", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Use of the website", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Illustrative content and demo data", paragraphs: ["Dashboards, calculators, testimonials, and case-study structures shown on this website are labeled as demo, illustrative, or placeholder content and do not represent guaranteed results.", LEGAL_PLACEHOLDER] },
        { heading: "Intellectual property", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Disclaimers and limitation of liability", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Governing law", paragraphs: [LEGAL_PLACEHOLDER] },
        { heading: "Contact", paragraphs: ["[Legal contact placeholder.]"] },
      ]}
    />
  );
}
