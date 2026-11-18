/* ------------------------------------------------------------------ */
/*  Is the denial-code library live? Safe to import anywhere.          */
/*                                                                      */
/*  src/data/denial-codes.ts reads the source file off disk, so it can  */
/*  only be imported by server components. The nav and footer data in   */
/*  src/data/site.ts is pulled into client components, which is why the */
/*  flag lives here instead: next.config.ts checks for the file once at */
/*  build time and inlines the answer, so nothing has to touch `fs` to  */
/*  decide where a link should point.                                   */
/* ------------------------------------------------------------------ */

/** True once src/content/denial-codes.json exists. Set in next.config.ts. */
export const HAS_LIBRARY = process.env.NEXT_PUBLIC_HAS_DENIAL_LIBRARY === "1";

/** Where the denial-code reference lives, or the old explorer while it does not. */
export const DENIAL_CODES_HREF = HAS_LIBRARY ? "/denial-codes" : "/denial-reason-explorer";
export const DENIAL_CODES_LABEL = HAS_LIBRARY ? "Denial codes" : "Denial Reason Explorer";
