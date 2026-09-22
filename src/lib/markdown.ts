/* ------------------------------------------------------------------ */
/*  A deliberately small Markdown subset — the one documented in        */
/*  CONTRIBUTING-BLOG.md and nothing else.                              */
/*                                                                      */
/*  Why not a Markdown library: posts render through the site's own     */
/*  typography components, not a prose stylesheet, so the parser's job  */
/*  is to produce typed blocks rather than HTML. Keeping the grammar    */
/*  closed also means a contributor cannot paste raw HTML or a script   */
/*  tag into a post — nothing here ever produces markup it did not      */
/*  build itself, so the strict CSP in next.config.ts stays honest.     */
/* ------------------------------------------------------------------ */

/** One run of inline text. `code` and `strong`/`em` never nest — by design. */
export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "code"; text: string }
  | { type: "link"; text: string; href: string };

export type BlogBlock =
  | { type: "p"; content: Inline[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "quote"; text: string };

/* ----------------------------- inline ----------------------------- */

// Ordered by precedence, and on a tie the earlier entry wins: code beats
// emphasis so `**x**` in backticks stays literal, and strong beats em so
// `**x**` is not read as an em containing a stray asterisk.
//
// Emphasis requires matching delimiters and a non-space character on the
// inside. Both matter for this site's prose: "CO-97 has * and _ in it" must
// stay literal, and `snake_case_names` must not turn into italics.
const INLINE = [
  { type: "code", re: /`([^`]+)`/ },
  { type: "link", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
  { type: "strong", re: /\*\*(\S(?:[^*]*\S)?)\*\*/ },
  { type: "em", re: /(?<![*\w])\*(\S(?:[^*\n]*\S)?)\*(?!\*)/ },
  { type: "em", re: /(?<![_\w])_(\S(?:[^_\n]*\S)?)_(?![_\w])/ },
] as const;

/**
 * Splits a line into inline runs. Unmatched `*`, `_`, `[` and `` ` ``
 * characters are left as literal text rather than treated as an error —
 * prose about CPT modifiers and payer codes contains them often enough.
 */
export function parseInline(input: string): Inline[] {
  const out: Inline[] = [];
  let rest = input;

  while (rest.length > 0) {
    // Find whichever marker appears earliest in what is left.
    let best: { index: number; kind: (typeof INLINE)[number]["type"]; m: RegExpMatchArray } | null = null;
    for (const { type, re } of INLINE) {
      const m = rest.match(re);
      if (m && m.index !== undefined && (best === null || m.index < best.index)) {
        best = { index: m.index, kind: type, m };
      }
    }

    if (!best) {
      out.push({ type: "text", text: rest });
      break;
    }

    if (best.index > 0) out.push({ type: "text", text: rest.slice(0, best.index) });

    const [raw, a, b] = best.m;
    if (best.kind === "link") out.push({ type: "link", text: a, href: b });
    else out.push({ type: best.kind, text: a });

    rest = rest.slice(best.index + raw.length);
  }

  // Collapse the empty runs that a leading marker can leave behind.
  return out.filter((n) => n.type !== "text" || n.text.length > 0);
}

/** Flattens inline runs back to plain text — for reading time and JSON-LD. */
export const inlineText = (nodes: Inline[]) => nodes.map((n) => n.text).join("");

/* ----------------------------- blocks ----------------------------- */

const UL = /^[-*]\s+(.*)$/;
const OL = /^\d+[.)]\s+(.*)$/;

/**
 * Parses the body of a post. Blocks are separated by blank lines; a list runs
 * until the first line that is not a list item, so a list never needs a blank
 * line between its own rows.
 */
export function parseMarkdown(src: string): BlogBlock[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: BlogBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      // Consecutive `>` lines join into one quote.
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        parts.push(lines[i].slice(2).trim());
        i += 1;
      }
      blocks.push({ type: "quote", text: parts.join(" ") });
      continue;
    }

    const listKind = UL.test(line) ? "ul" : OL.test(line) ? "ol" : null;
    if (listKind) {
      const re = listKind === "ul" ? UL : OL;
      const items: Inline[][] = [];
      while (i < lines.length) {
        const m = lines[i].match(re);
        if (!m) break;
        items.push(parseInline(m[1].trim()));
        i += 1;
      }
      blocks.push({ type: listKind, items });
      continue;
    }

    // Anything else is a paragraph, running until a blank line or a line that
    // starts a different block.
    const parts: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === "" || l.startsWith("#") || l.startsWith("> ") || UL.test(l) || OL.test(l)) break;
      parts.push(l.trim());
      i += 1;
    }
    blocks.push({ type: "p", content: parseInline(parts.join(" ")) });
  }

  return blocks;
}

/* --------------------------- frontmatter --------------------------- */

/** A YAML scalar: quoted either way, a bare word, a boolean, or a flow list. */
function scalar(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "" || value === "~" || value === "null") return null;

  if (value.startsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  // YAML single quotes take no escapes except '' for a literal quote.
  if (value.startsWith("'") && value.endsWith("'") && value.length > 1) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    return inner === "" ? [] : inner.split(",").map((v) => scalar(v.trim()));
  }
  return value;
}

/**
 * Reads the `---` fenced header as flat YAML: one `key: value` per line, plus
 * `|` and `>` block scalars. Nesting is not supported and never needed here.
 *
 * Deliberately tolerant about quoting, because two different hands write these
 * files — a person typing Markdown, and Keystatic serialising a form. A bare
 * value, a single-quoted one and a double-quoted one all mean the same string.
 * Shape is enforced afterwards by the schema in src/data/blog.ts, which is
 * where a useful error message can name the file.
 */
export function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };

  const data: Record<string, unknown> = {};
  const lines = m[1].split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    i += 1;
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;

    const at = line.indexOf(":");
    if (at === -1) throw new Error(`Frontmatter line is not "key: value": ${line.trim()}`);

    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();

    // Block scalar: `|` keeps newlines, `>` folds them into spaces. A trailing
    // `-` strips the final newline; we trim anyway, so it needs no handling.
    if (value === "|" || value === "|-" || value === ">" || value === ">-") {
      const indent = /^(\s*)/.exec(lines[i] ?? "")?.[1].length ?? 0;
      const parts: string[] = [];
      while (i < lines.length && (lines[i].trim() === "" || lines[i].startsWith(" ".repeat(Math.max(indent, 1))))) {
        parts.push(lines[i].slice(indent));
        i += 1;
      }
      const joined = value.startsWith("|") ? parts.join("\n") : parts.join(" ").replace(/\s+/g, " ");
      data[key] = joined.trim();
      continue;
    }

    data[key] = scalar(value);
  }

  return { data, body: text.slice(m[0].length) };
}
