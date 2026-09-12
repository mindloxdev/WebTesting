import { SOCIAL } from "@/data/site";
import { cn } from "@/lib/utils";
import { SOCIAL_ICONS } from "./SocialIcons";

type Props = {
  className?: string;
  /** Icon button size. */
  size?: "sm" | "md";
};

/**
 * Row of social profile links. Reads `SOCIAL` from src/data/site.ts —
 * an entry with an empty `href` is skipped, so hiding a network is a
 * one-line edit in that file.
 */
export function SocialLinks({ className, size = "md" }: Props) {
  const links = SOCIAL.filter((s) => s.href.trim().length > 0);
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((s) => {
        const Icon = SOCIAL_ICONS[s.icon];
        return (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`Mindlox AI on ${s.name}`}
              title={s.name}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-line text-fg-3 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:text-accent",
                size === "sm" ? "size-8" : "size-9",
              )}
            >
              <Icon className={size === "sm" ? "size-3.5" : "size-4"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
