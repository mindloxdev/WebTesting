import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Author } from "@/data/authors";

/** Initials stand in for a photo — no avatar hosting, no extra CSP origin. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * The byline block at the foot of a post. For guest contributors this is the
 * page's only statement of who wrote it and why they are worth reading, so it
 * carries the role and bio rather than just a name.
 */
export function AuthorCard({ author }: { author: Author }) {
  const isTeam = author.id === "mindlox-team";

  return (
    <div className="rounded-[22px] border border-line bg-bg p-6 lg:p-7">
      <p className="eyebrow mb-5">{isTeam ? "Written by" : "About the author"}</p>
      <div className="flex gap-4">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent"
          aria-hidden
        >
          {initials(author.name)}
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-fg">{author.name}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
            {author.role}
            {!author.staff && " · Guest contributor"}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{author.bio}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {!isTeam && (
              <Link href={`/blog/authors/${author.id}`} className="text-sm font-medium text-accent hover:text-fg">
                More from {author.name.split(" ")[0]}
              </Link>
            )}
            {author.url && (
              <a
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-fg-2 hover:text-accent"
              >
                Profile <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
