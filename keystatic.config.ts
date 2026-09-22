import { config, collection, fields } from "@keystatic/core";

/* ------------------------------------------------------------------ */
/*  Keystatic — the visual editor over the same Markdown files.        */
/*                                                                      */
/*  It is a view, not a second source of truth: entries saved here are  */
/*  ordinary files in src/content/blog, identical to ones typed by      */
/*  hand, and src/data/blog.ts stays the only thing the site reads.     */
/*  Delete this file and the blog keeps working.                        */
/*                                                                      */
/*  Storage mode is chosen by environment — see the comment on          */
/*  `storage` below. The house rules are in CONTRIBUTING-BLOG.md.       */
/* ------------------------------------------------------------------ */

const repo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

export default config({
  /**
   * Local mode writes straight to disk — right for `next dev` on your own
   * machine. GitHub mode is what outside writers use: they sign in with
   * GitHub, and saving opens a branch and a pull request against the repo
   * rather than touching main. Set NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
   * ("owner/name") to switch a deployment over.
   */
  storage: repo
    ? { kind: "github", repo: repo as `${string}/${string}` }
    : { kind: "local" },

  ui: {
    brand: { name: "Mindlox AI — Blog" },
    navigation: { Content: ["posts"] },
  },

  collections: {
    posts: collection({
      label: "Blog posts",
      path: "src/content/blog/*",
      slugField: "title",
      // Plain Markdown with a YAML header — byte-for-byte the format a writer
      // would type by hand, so the two routes never diverge.
      format: { contentField: "content", data: "yaml" },
      entryLayout: "content",
      columns: ["title", "date", "category"],

      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 1, max: 120 } },
            description: "Shown as the page heading and the browser title.",
          },
          slug: {
            label: "URL slug",
            description: "The last part of the address: /blog/<slug>. Changing it breaks existing links.",
          },
        }),

        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { length: { min: 1, max: 320 } },
          description: "One or two sentences. This is what shows on the blog index and in Google results.",
        }),

        category: fields.select({
          label: "Category",
          options: [
            { label: "Metrics", value: "Metrics" },
            { label: "Denials", value: "Denials" },
            { label: "A/R", value: "A/R" },
            { label: "Front end", value: "Front end" },
            { label: "Out-of-network", value: "Out-of-network" },
            { label: "Coding", value: "Coding" },
            { label: "Compliance", value: "Compliance" },
          ],
          defaultValue: "Metrics",
        }),

        date: fields.date({
          label: "Publish date",
          validation: { isRequired: true },
          description: "Sorts the blog index. The newest post becomes the featured one.",
        }),

        author: fields.text({
          label: "Author ID",
          defaultValue: "mindlox-team",
          description:
            "Must match an id in src/data/authors.ts — mindlox-team, or a contributor added there first. An unknown id fails the build.",
        }),

        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
          description: "Keeps a finished post out of the live site.",
        }),

        content: fields.markdoc({
          label: "Body",
          // Keystatic defaults to .mdoc; the posts are .md and stay that way,
          // so a hand-written file and a Keystatic-written one are the same
          // kind of file and the editor lists both.
          extension: "md",
          options: {
            // Only what src/lib/markdown.ts renders. Anything switched on here
            // but missing there would save cleanly and then vanish on the page.
            heading: [2, 3],
            bold: true,
            italic: true,
            link: true,
            code: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            image: false,
            table: false,
            strikethrough: false,
            codeBlock: false,
            divider: false,
          },
        }),
      },
    }),
  },
});
