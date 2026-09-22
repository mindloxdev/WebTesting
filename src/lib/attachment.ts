/* ------------------------------------------------------------------ */
/*  Validation for the one upload path on the site.                    */
/*                                                                      */
/*  Nothing is written to disk and nothing is served back: a file goes  */
/*  straight into an email attachment and is then forgotten. That is    */
/*  what keeps the risk here small — there is no stored object for      */
/*  anyone to fetch later, and no path a filename could ever reach.     */
/* ------------------------------------------------------------------ */

/**
 * 4 MB. Vercel caps a serverless function's request body at 4.5 MB, so a
 * larger limit would fail at the platform with an opaque error instead of a
 * message the writer can act on. A manuscript is comfortably under it.
 */
export const MAX_FILE_BYTES = 4 * 1024 * 1024;

/**
 * Document formats only, matched on extension *and* declared type.
 *
 * No archives (they hide their contents), no images, and nothing executable.
 * The list is what a writer actually sends a draft in; anything else is a
 * conversation to have by email rather than a case to widen this for.
 */
const ALLOWED: Record<string, readonly string[]> = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ".odt": ["application/vnd.oasis.opendocument.text"],
  ".rtf": ["application/rtf", "text/rtf"],
  ".txt": ["text/plain"],
  ".md": ["text/markdown", "text/x-markdown", "text/plain"],
};

export const ACCEPT_ATTR = Object.keys(ALLOWED).join(",");
export const ALLOWED_LABEL = "PDF, DOC, DOCX, ODT, RTF, TXT or MD";

const MAX_NAME_LENGTH = 100;

/**
 * Drops every Unicode "other" character in one rule: the CR/LF and NUL that
 * would split a mail header, and just as importantly the bidi overrides and
 * zero-width joiners used to make `draft‮xcod.exe` read as a .docx.
 */
const isControl = (ch: string) => /\p{C}/u.test(ch);

/**
 * Letters and digits in *any* script, plus dot, underscore, space and hyphen.
 *
 * Unicode-aware on purpose: an earlier ASCII-only rule turned 邀请函.docx into
 * ___.docx, which is a poor welcome for exactly the contributors this form
 * exists to reach. Nodemailer encodes non-ASCII filenames per RFC 2231, so
 * they survive the mail hop intact.
 */
const isSafeChar = (ch: string) => /[\p{L}\p{N}._ -]/u.test(ch);

/**
 * Reduces whatever the browser sent to a plain, safe basename.
 *
 * The filename is attacker-controlled and ends up in a mail header and in
 * whatever client the team opens it with, so: take the basename only, drop
 * control and format characters, replace anything outside the allowlist, and
 * cap the length. A name that reduces to nothing gets a neutral one.
 */
export function safeFilename(raw: string): string {
  // Basename only — split on both separators, whichever the client used.
  const base = raw.split("\\").pop()?.split("/").pop() ?? "";

  const cleaned = Array.from(base)
    .filter((ch) => !isControl(ch))
    .map((ch) => (isSafeChar(ch) ? ch : "_"))
    .join("")
    .replace(/\s+/g, " ")
    .replace(/^[. ]+/, "")
    .trim();

  if (cleaned.length === 0) return "attachment";
  if (cleaned.length <= MAX_NAME_LENGTH) return cleaned;

  // Trim the stem, never the extension — a truncated name that lost its ".pdf"
  // arrives as a file the recipient's machine cannot open.
  const dot = cleaned.lastIndexOf(".");
  const ext = dot > 0 ? cleaned.slice(dot) : "";
  const stem = dot > 0 ? cleaned.slice(0, dot) : cleaned;
  return stem.slice(0, Math.max(1, MAX_NAME_LENGTH - ext.length)) + ext;
}

export function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

export type FileCheck = { ok: true; filename: string } | { ok: false; error: string };

/** Extension allowlist, declared-type cross-check, and size cap. */
export function checkFile(file: { name: string; type: string; size: number }): FileCheck {
  const filename = safeFilename(file.name);
  const ext = extensionOf(filename);

  const allowedTypes = ALLOWED[ext];
  if (!allowedTypes) {
    return { ok: false, error: `That file type is not accepted. Send a ${ALLOWED_LABEL} file.` };
  }

  // Browsers sometimes send an empty or generic type for less common formats;
  // an absent type is tolerated, a contradictory one is not.
  const declared = (file.type || "").split(";")[0].trim().toLowerCase();
  if (declared && declared !== "application/octet-stream" && !allowedTypes.includes(declared)) {
    return { ok: false, error: "That file's contents do not match its extension." };
  }

  if (file.size <= 0) return { ok: false, error: "That file is empty." };
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: `Keep the file under ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB.` };
  }

  return { ok: true, filename };
}
