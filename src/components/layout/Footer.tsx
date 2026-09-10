import Link from "next/link";
import { BRAND, CTA, FOOTER_COLUMNS } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-fg-2">
              Experienced billing specialists, intelligent automation, and revenue-cycle intelligence for U.S.
              healthcare organizations.
            </p>
            <div className="mt-6">
              <MagneticButton href={CTA.auditHref} size="sm" arrow magnetic={false}>
                {CTA.primaryShort}
              </MagneticButton>
            </div>
            <dl className="mt-8 space-y-1.5 font-mono text-xs text-fg-3">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0">Address</dt>
                <dd>[Address placeholder]</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0">Phone</dt>
                <dd>[Phone placeholder]</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0">Email</dt>
                <dd>[Email placeholder]</dd>
              </div>
            </dl>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-fg-2 transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-fg-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {BRAND.year} {BRAND.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-fg">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-fg">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:text-fg">
                HIPAA / Security
              </Link>
            </li>
            <li>
              <Link href="/demos" className="hover:text-fg">
                Concept demos
              </Link>
            </li>
          </ul>
          <p className="font-mono">Demo site · sample data labeled · no fabricated claims</p>
        </div>
      </div>
    </footer>
  );
}
