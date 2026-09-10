import type { Metadata } from "next";
import { CTA } from "@/data/site";
import { SPECIALTIES } from "@/data/specialties";
import { Frame } from "@/components/layout/Frame";
import { ComparisonSection, FinalCTA, PageHero, SpecialtyGrid } from "@/components/sections";
import { JsonLd, ORGANIZATION_LD, breadcrumbLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SpecialtyMorph } from "@/components/visuals/SpecialtyMorph";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "Specialty-first medical billing and revenue cycle management for 25 specialties — primary care, cardiology, orthopedics, behavioral health, dermatology, radiology, oncology, physical therapy, DME, laboratory, telehealth, and more.",
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <Frame scheme="light" theme="theme-ultimate">
      <JsonLd
        data={[
          ORGANIZATION_LD,
          breadcrumbLd([
            { name: "Home", url: "https://mindlox.ai" },
            { name: "Specialties", url: "https://mindlox.ai/specialties" },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ label: "Specialties" }]}
        eyebrow="Specialties"
        title="Billing built around your specialty."
        highlight="your specialty."
        description={`${SPECIALTIES.length} specialties, each with its own coding reality, denial patterns, and payer rules. Pick yours and see the playbook — challenges, coding complexity, common denials, workflow, and how Mindlox AI handles it.`}
        primary={{ label: CTA.specialty, href: "#explore", hoverLabel: "Show My Specialty's Playbook" }}
        secondary={{ label: CTA.secondary }}
      />

      <Section id="explore" tone="muted" className="pt-4 lg:pt-8">
        <SectionHeading eyebrow="Specialty explorer" title="Select a specialty. Watch the playbook reshape." highlight="reshape." size="md" />
        <Reveal className="mt-10" delay={0.1}>
          <SpecialtyMorph initial="cardiology" />
        </Reveal>
      </Section>

      <Section id="all">
        <SectionHeading eyebrow="Directory" title={`All ${SPECIALTIES.length} specialties.`} highlight={`${SPECIALTIES.length} specialties.`} size="md" description="Every specialty has a dedicated page with its billing playbook, services, and FAQ." />
        <SpecialtyGrid className="mt-10" />
      </Section>

      <ComparisonSection whySwitch={false} tone="muted" />

      <FinalCTA form title="Let's find the revenue your specialty is leaving behind." highlight="leaving behind." description="A structured review of your denials, A/R aging, coding patterns, and underpayments — specialty-specific, and yours to keep." />
    </Frame>
  );
}
