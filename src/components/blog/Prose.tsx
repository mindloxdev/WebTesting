import Link from "next/link";
import type { BlogBlock, Inline } from "@/lib/markdown";

/** Inline runs. The parser only ever emits these five, so there is no fallback. */
function Run({ n }: { n: Inline }) {
  if (n.type === "strong") return <strong className="font-semibold text-fg">{n.text}</strong>;
  if (n.type === "em") return <em className="italic">{n.text}</em>;
  if (n.type === "code")
    return <code className="rounded bg-bg-2 px-1.5 py-0.5 font-mono text-[0.9em] text-fg">{n.text}</code>;
  if (n.type === "link") {
    const className = "font-medium text-accent underline underline-offset-[3px] hover:text-fg";
    // Relative hrefs stay client-routed; anything else leaves the site.
    return n.href.startsWith("/") ? (
      <Link href={n.href} className={className}>
        {n.text}
      </Link>
    ) : (
      <a href={n.href} className={className} target="_blank" rel="noopener noreferrer">
        {n.text}
      </a>
    );
  }
  return <>{n.text}</>;
}

const Runs = ({ nodes }: { nodes: Inline[] }) => (
  <>
    {nodes.map((n, i) => (
      <Run key={i} n={n} />
    ))}
  </>
);

function Item({ nodes, marker }: { nodes: Inline[]; marker: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[16px] leading-relaxed text-fg-2">
      {marker}
      <span>
        <Runs nodes={nodes} />
      </span>
    </li>
  );
}

function Block({ b }: { b: BlogBlock }) {
  if (b.type === "h2") return <h2 className="mt-10 font-display text-2xl font-semibold text-fg">{b.text}</h2>;
  if (b.type === "h3") return <h3 className="mt-8 font-display text-lg font-semibold text-fg">{b.text}</h3>;
  if (b.type === "quote")
    return (
      <blockquote className="my-8 border-l-2 border-accent pl-5 font-display text-xl font-medium leading-snug text-fg">
        {b.text}
      </blockquote>
    );
  if (b.type === "ul")
    return (
      <ul className="mt-4 space-y-2.5">
        {b.items.map((it, i) => (
          <Item key={i} nodes={it} marker={<span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />} />
        ))}
      </ul>
    );
  if (b.type === "ol")
    return (
      <ol className="mt-4 space-y-2.5">
        {b.items.map((it, i) => (
          <Item
            key={i}
            nodes={it}
            marker={<span className="mt-px w-4 shrink-0 font-mono text-sm tabular text-accent">{i + 1}.</span>}
          />
        ))}
      </ol>
    );
  return (
    <p className="mt-4 text-[16px] leading-relaxed text-fg-2">
      <Runs nodes={b.content} />
    </p>
  );
}

/** Renders a parsed post body through the site's own typography. */
export function Prose({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </>
  );
}
