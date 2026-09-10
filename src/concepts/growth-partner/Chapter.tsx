import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; dark?: boolean; className?: string; id?: string };

/**
 * Full-viewport story chapter. `dark` inverts the semantic tokens locally
 * so light and dark chapters alternate down the single scroll.
 */
export function Chapter({ children, dark, className, id }: Props) {
  const section = (
    <section id={id} className={cn("relative flex min-h-[90vh] items-center overflow-hidden py-24 lg:py-32", className)}>
      {children}
    </section>
  );
  if (!dark) return section;
  return (
    <div data-scheme="dark" className="bg-bg text-fg">
      {section}
    </div>
  );
}
