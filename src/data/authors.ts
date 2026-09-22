/* ------------------------------------------------------------------ */
/*  AUTHORS — every byline the blog can use.                           */
/*                                                                      */
/*  Medical billing is YMYL content: Google weighs who wrote it, so a   */
/*  post attributed to a named person with stated experience carries    */
/*  more than one attributed to the company. Add a contributor here     */
/*  before their first post; the `author` key in a post's frontmatter   */
/*  must match an `id` below or the build fails.                        */
/* ------------------------------------------------------------------ */

export type Author = {
  id: string;
  name: string;
  /** Shown under the byline, e.g. "CPC, CPMA" or "Revenue Cycle Lead". */
  role: string;
  /** Two or three sentences. Say what they actually do, not what they believe. */
  bio: string;
  /** External profile (LinkedIn, personal site) — used for schema.org `sameAs`. */
  url?: string;
  /** False for guest contributors, so their page can say so. */
  staff: boolean;
};

export const AUTHORS: Author[] = [
  {
    id: "mindlox-team",
    name: "Mindlox AI team",
    role: "Revenue cycle specialists",
    bio: "The billing specialists, coders, and A/R analysts who work claims at Mindlox AI every day. Articles under this byline are written and reviewed collectively by the team that does the work.",
    staff: true,
  },
  /* ----------------------------------------------------------------
   * Guest contributor template — copy, fill in, and delete this note.
   *
   * {
   *   id: "jane-doe",                    // must match `author:` in the post
   *   name: "Jane Doe",
   *   role: "CPC, CPMA — Coding consultant",
   *   bio: "Twelve years coding for orthopedic and ASC practices...",
   *   url: "https://www.linkedin.com/in/example",
   *   staff: false,
   * },
   * ---------------------------------------------------------------- */
];

export const getAuthor = (id: string) => AUTHORS.find((a) => a.id === id);

/** Byline authors only — the team entry is not a person and gets no page. */
export const CONTRIBUTORS = AUTHORS.filter((a) => a.id !== "mindlox-team");
