import type { Metadata } from "next";
import { ConceptFrame } from "@/components/layout/Frame";
import { getConcept } from "@/data/concepts";
import { UltimatePage } from "@/concepts/ultimate/UltimatePage";

const concept = getConcept("ultimate")!;

export const metadata: Metadata = {
  title: "Concept 10 — The Ultimate Mindlox AI (Recommended)",
  description: concept.support,
};

export default function Page() {
  return (
    <ConceptFrame concept={concept}>
      <UltimatePage />
    </ConceptFrame>
  );
}
