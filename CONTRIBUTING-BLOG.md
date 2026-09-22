# Writing for the Mindlox AI blog

Every post is one Markdown file in `src/content/blog/`. The filename is the URL:
`src/content/blog/clean-claim-rate.md` publishes to `mindlox.ai/blog/clean-claim-rate`.

There is no database. Add a file, commit, and the post is live on the next
deploy. Delete the file and it is gone.

There are two ways to write one: **the editor**, or **the file directly**. They
produce the same thing, so pick whichever suits you.

---

## The editor

Run the site and open **http://localhost:3000/keystatic**. You get a visual
editor over the same files: a list of every post, a rich-text body, and the
fields on the right. Saving writes a normal `.md` file into `src/content/blog/`
— nothing else happens, and the file is identical to one typed by hand.

The toolbar deliberately offers only what the site can render: headings 2 and 3,
bold, italic, inline code, links, quotes, and the two list types. There is no
image or table button because the blog has no style for either.

### Letting outside writers use it

By default the editor is **local**: it writes to the disk it is running on, which
is right for your own machine and wrong for anyone else. To open it to
contributors, set one environment variable on the deployment:

```
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=owner/repo
```

The editor then signs writers in with GitHub and saving opens a **pull request**
instead of touching `main` — so a contributor never gets push access and you
review every post as a normal diff. Keystatic's own setup flow creates the
GitHub App and gives you the remaining secrets to add
(`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET`); visit `/keystatic` on the deployed site once the repo
variable is set and it walks you through it.

Until that is configured, use the route below.

---

## For outside writers, without any setup

You do **not** need a GitHub account or any code setup. Write the post in whatever
you normally use — Google Docs, Word, Notion — and send it with:

1. **Title** — under 120 characters.
2. **Excerpt** — one or two sentences, under 320 characters. This is the text that
   shows on the blog index and in Google results, so write it to be read there.
3. **Category** — one of: Metrics, Denials, A/R, Front end, Out-of-network,
   Coding, Compliance. Propose a new one if none fit.
4. **Your author details**, the first time only: full name, credentials or role
   (e.g. "CPC, CPMA — Coding consultant"), a two-to-three sentence bio, and a
   LinkedIn or personal URL.

Use plain headings, bullets, and paragraphs. Don't send tracked changes, comment
threads, images embedded in the document, or tables — the site has no table style
yet, so a table has to become a list.

We convert the document to the file format below, run it past a billing specialist
for accuracy, and send you the staging link before it goes live.

---

## The file format

````markdown
---
title: "Clean claim rate: the number that decides how fast you get paid"
excerpt: "What clean claim rate measures and the front-end habits that raise it."
category: "Metrics"
date: "2026-09-08"
author: "mindlox-team"
---

The opening paragraph. No H1 — the title above becomes the page heading.

## A section heading

Body text. A paragraph can wrap across
several lines; they join into one.

### A subheading

- A bullet
- Another, with **bold** and a [link](/services)

1. A numbered step
2. The next one

> A pull quote. It renders large and accented, so use it for the one line
> you want someone to remember.
````

### Frontmatter rules

Everything between the `---` fences, in YAML. Quotes are optional — `title: Some
title` and `title: "Some title"` mean the same thing — but **quote any value
containing a colon**, or YAML reads it as a nested key. The editor quotes
whatever needs it automatically.

| Key | Required | Notes |
| --- | --- | --- |
| `title` | yes | Max 120 characters |
| `excerpt` | yes | Max 320 characters |
| `category` | yes | Free text, but reuse an existing one where you can |
| `date` | yes | `"YYYY-MM-DD"` exactly. Sorts the blog index |
| `author` | yes | Must match an `id` in `src/data/authors.ts` |
| `draft` | no | `true` holds a finished post out of the live site |

### Supported Markdown

This is the whole list. Anything else is rendered as literal text.

| Syntax | Result |
| --- | --- |
| `## Text` | Section heading |
| `### Text` | Subheading |
| `- item` / `* item` | Bulleted list |
| `1. item` | Numbered list |
| `> text` | Pull quote |
| `**text**` | Bold |
| `*text*` / `_text_` | Italic |
| `` `text` `` | Inline code — for CPT codes, CARC codes, field names |
| `[text](/services)` | Link. Starts with `/` for internal, `https://` for external |

No images, tables, raw HTML, or footnotes. Raw HTML is ignored on purpose: it keeps
a contributed post from injecting markup into the page.

---

## Adding an author

Before a contributor's first post, add them to `src/data/authors.ts`:

```ts
{
  id: "jane-doe",                              // must match `author:` in the post
  name: "Jane Doe",
  role: "CPC, CPMA — Coding consultant",
  bio: "Twelve years coding for orthopedic and ASC practices...",
  url: "https://www.linkedin.com/in/example",  // optional
  staff: false,
}
```

They get a byline, an "About the author" card at the foot of every post, and a page
at `/blog/authors/jane-doe` listing their work. The post's `Person` schema and that
page are what tell Google a named, credentialed human wrote this — which matters
more here than on most sites, because medical billing is YMYL content that Google
holds to a higher bar.

An unregistered `author` **fails the build**. So does a malformed date, a missing
field, or an over-long title. That is deliberate: a broken post stops the deploy
instead of shipping.

---

## House style

These are the rules that get a draft sent back.

**Never claim a guaranteed outcome.** No "guarantees zero denials", no "eliminates
denials", no promised percentage. Say *AI-assisted*, *intelligent automation*,
*decision support*, *pattern detection*. This wording is enforced on the
`/technology` page and applies to the blog too.

**Every number must have a source we can name.** If you cannot point to CMS, a
payer policy, a published study, or our own aggregate data, cut the number and make
the point qualitatively. Invented benchmarks are the fastest way to lose a reader
who bills for a living.

**No PHI, ever.** No real patient details, and no real claim numbers. Examples are
illustrative and should look it.

**Write for someone who works claims.** They know what a CARC is. Explain the
reasoning, not the vocabulary. Prefer the specific case over the general principle.

**Say what to do.** A post that describes a problem without a next action is not
finished.

---

## Checking your work

```bash
npm run dev     # http://localhost:3000/blog and /keystatic
npm run lint
npx next build  # validates every post's frontmatter and author
```

`next build` is the real check — it parses every file and fails loudly, with the
filename, on anything malformed.
