import type { Metadata } from "next";
import { LegalPage } from "@/templates/company/LegalPage";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mindlox AI collects, uses, shares, and protects information on this website and in the course of its services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy Policy"
      eyebrow="Legal"
      title="Privacy Policy"
      description="How Mindlox AI collects, uses, and protects information on this website and in the course of its services."
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            `Mindlox AI ("Mindlox AI", "we", "us") provides medical billing and revenue cycle management services to healthcare organizations in the United States. Our mailing address is ${CONTACT.address}. This policy explains what information we collect through this website and in the course of providing our services, how we use it, and the choices you have.`,
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: ["We collect information in three ways."],
          bullets: [
            "Information you give us. When you request a revenue audit, ask to speak with a specialist, or contact us, we collect what you enter: your name, work email address, organization, phone number, organization type, approximate provider count, and the services you are interested in. If you apply for a role by email, we receive your resume and the details you choose to share.",
            "Information collected automatically. Like most websites, our servers record technical information such as IP address, browser type, the pages you visit, and the time of each request. We use this to operate and secure the site and to understand how it is used in aggregate.",
            "Information stored in your browser. The site remembers display preferences, such as your theme choice, in your browser's local storage. This information stays on your device.",
          ],
        },
        {
          heading: "Protected health information",
          paragraphs: [
            "This website does not request, and should not be used to send, protected health information (PHI). Please do not include patient details in any form, email, or application.",
            "In the course of our services, Mindlox AI handles PHI only as a business associate of the healthcare organizations we serve, under written Business Associate Agreements and the Health Insurance Portability and Accountability Act (HIPAA). That handling is governed by those agreements and by our HIPAA and security practices, not by this website policy.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: ["We use the information we collect to:"],
          bullets: [
            "Respond to your request, schedule and deliver a revenue audit, and communicate with you about our services.",
            "Provide, maintain, and improve our services and this website.",
            "Protect the security and integrity of our systems, and detect and prevent abuse.",
            "Consider job applications.",
            "Comply with legal obligations and enforce our agreements.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "The site currently uses browser local storage only to remember your display preferences. We do not use third-party advertising cookies. If we add analytics or similar tools in the future, we will update this policy and our cookie notice first, and you will be able to decline non-essential cookies.",
          ],
        },
        {
          heading: "Sharing and disclosure",
          paragraphs: ["We do not sell personal information. We share information only:"],
          bullets: [
            "With service providers who help us operate the website and our business, such as hosting and email delivery providers, under obligations of confidentiality.",
            "When required by law, legal process, or to protect the rights, safety, or property of Mindlox AI, our clients, or others.",
            "In connection with a merger, acquisition, or sale of assets, in which case we will continue to protect information as described in this policy.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "We keep the information you provide for as long as needed to respond to your request and, if we work together, for the duration of the engagement and any period required by law or our agreements. Technical logs are retained for a limited period for security and operational purposes.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We use reasonable administrative, technical, and physical safeguards designed to protect the information we hold, including encryption in transit, role-based access, and audit logging on our operational systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "Your choices and rights",
          paragraphs: [
            `You can ask us to access, correct, or delete the personal information we hold about you, or to stop contacting you, by emailing ${CONTACT.email}. Depending on where you live, you may have additional rights under state privacy laws; we will honor requests as those laws require and will not treat you differently for exercising them.`,
          ],
        },
        {
          heading: "Children",
          paragraphs: ["This website is intended for healthcare professionals and organizations. It is not directed to children, and we do not knowingly collect personal information from anyone under 18."],
        },
        {
          heading: "Changes to this policy",
          paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it was last revised. Material changes will be reflected here before they take effect."],
        },
        { heading: "Contact", paragraphs: [`Questions about this policy can be sent to ${CONTACT.email}, or mailed to Mindlox AI, ${CONTACT.address}. You can also call ${CONTACT.phone}.`] },
      ]}
    />
  );
}
