import type { Metadata } from "next";
import { LegalPage } from "@/templates/company/LegalPage";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Mindlox AI website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms that govern use of this website. Service engagements are governed by separate written agreements."
      sections={[
        {
          heading: "Acceptance of terms",
          paragraphs: [
            "By accessing or using mindlox.ai (the \"Site\"), you agree to these Terms of Service and to our Privacy Policy. If you do not agree, please do not use the Site. Mindlox AI may update these terms from time to time; the date at the top of this page shows the latest revision, and continued use after a change means you accept it.",
          ],
        },
        {
          heading: "Use of the website",
          paragraphs: ["You may use the Site for lawful purposes to learn about Mindlox AI and to contact us. You agree not to:"],
          bullets: [
            "Interfere with the operation or security of the Site, or attempt to gain unauthorized access to any system or data.",
            "Use automated tools to scrape, copy, or index the Site other than as permitted by our robots directives.",
            "Submit false, misleading, or unlawful information through any form, or submit information you do not have the right to share.",
            "Send protected health information through the Site. The Site is not designed to receive it.",
          ],
        },
        {
          heading: "Informational content, estimates, and illustrations",
          paragraphs: [
            "Content on the Site is provided for general information about medical billing and revenue cycle management. It is not legal, financial, tax, or compliance advice, and you should consult qualified professionals for advice specific to your organization.",
            "Dashboards, calculators, event feeds, and similar interactive elements use sample or illustrative data and are labeled as such. They demonstrate how our services work; they are not statements of results any client has achieved, and they do not guarantee any outcome, collection rate, or reduction in denials.",
          ],
        },
        {
          heading: "Service engagements",
          paragraphs: [
            "Using the Site, requesting a revenue audit, or speaking with a specialist does not create a services engagement. Our services are provided only under a signed written agreement, which will include a Business Associate Agreement where required. If these terms conflict with a signed agreement, the signed agreement governs the services.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The Site and its content, including text, graphics, designs, interactive elements, and software, are owned by Mindlox AI or its licensors and are protected by copyright, trademark, and other laws. You may view and print pages for your own informational use. Any other use, including reproduction, modification, or distribution, requires our prior written permission. Mindlox AI and the Mindlox AI logo are trademarks of Mindlox AI.",
          ],
        },
        {
          heading: "Third-party sites",
          paragraphs: ["The Site may link to third-party websites for convenience. We do not control and are not responsible for their content or practices, and a link does not imply endorsement."],
        },
        {
          heading: "Disclaimers",
          paragraphs: [
            "The Site is provided \"as is\" and \"as available.\" To the fullest extent permitted by law, Mindlox AI disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement, and does not warrant that the Site will be uninterrupted, error-free, or free of harmful components.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, Mindlox AI and its officers, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of revenue, profits, or data, arising from your use of or inability to use the Site, even if advised of the possibility of such damages. Nothing in these terms limits liability that cannot be limited under applicable law.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the State of Texas, without regard to its conflict-of-law rules. Any dispute relating to the Site will be brought in the state or federal courts located in Dallas County, Texas, and you consent to their jurisdiction.",
          ],
        },
        { heading: "Contact", paragraphs: [`Questions about these terms can be sent to ${CONTACT.email}, or mailed to Mindlox AI, ${CONTACT.address}.`] },
      ]}
    />
  );
}
