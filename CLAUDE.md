# Portfolio Website — Project Context

## Who this is for

This is a personal site for **Ethan Justice**, a software engineer at Google (YouTube Ask team) with a background in ML systems research, GPU programming, and distributed infrastructure. The site is being rebuilt from scratch. The old site exists at ethanjustice.dev and is built in Next.js with React Three Fiber. The new site replaces it entirely.

The new site lives in the `new-website/` directory.

---

## What this site is

A profile that grows into a publishing home. It has two states: before any writing exists, and after. The architecture supports both states without structural changes — content is added, nothing is restructured.

The site is not a portfolio. It is not a resume mirror. It is not a blog platform. It is the online presence of a specific person with a specific point of view, built to communicate credibility through restraint and personality through honesty.

The target reader is: a senior engineer evaluating whether Ethan is worth paying attention to, a startup founder or investor pattern-matching for someone technically deep with self-awareness, or a peer a year or two behind Ethan in their career looking for honest signal. The site should work for all three without optimizing for any one specifically.

---

## Tone

Casual but precise. Confident without performing confidence. The writing on the site — descriptions, about text, fold copy — should sound like a smart person talking, not a smart person writing a bio. Short sentences. Opinions stated directly. No hedging. No "passionate about" or "dedicated to" or "excited to announce." No third person anywhere.

The site should feel like reading someone's notebook. Not viewing their portfolio.

---

## Pages

Three pages total.

`/` — the main page. The only page most visitors see.

`/writing` — full list of all posts across all categories with client-side category filter. Does not exist in the nav or anywhere on the site until at least one post is published.

`/archive` — every role and project, comprehensive, no curation. Linked from footer only. Exists from day one.

Individual posts live at `/writing/[slug]`. Minimal. Title, date, tag, body, back link. Nothing else.

No other pages.

---

## Main page sections — before writing exists

In this order: nav, fold, work, about, education, footer.

No writing section. No quarterly section. No placeholders or "coming soon" states. The sections simply do not exist yet.

**Nav:** Site name left, "work" and "about" right. No border, no background, no shadow. Does not stick on scroll. On mobile: name stays, links collapse to a plain text toggle if needed — no animated hamburger.

**Fold:** Name in display serif, large, letterspace slightly tight. One sentence premise immediately below in body font. One short paragraph below that — two to three sentences of honest context, where you are now, what the site is. Then links in a row: github, linkedin, email as plaintext (not a mailto link), archive. No image. No background. No animation. Text on white.

**Work:** Section label "selected work" — 10px, uppercase, tracked, tertiary color. Five items: Google YouTube Ask, vLLM/RobustNet Lab, PersistOS, MAD Framework, multi-threaded file server. Each item: role title at medium weight, company and date smaller below, two to four sentence prose description in secondary color, tags at the bottom (four maximum, 10px, lowercase, background-secondary fill, 0.5px border, 3px radius). Items separated by 0.5px border. No cards. No logos. No hover reveals. "all work →" link in tertiary at the bottom linking to `/archive`.

**About:** Three paragraphs. First: the through-line from robotics to systems to ML infrastructure. Second: Michigan — what you worked on, what the thread was. Third: where you are now, where you're going, one sentence pointing honestly toward writing without promising it.

**Education:** School name slightly heavier, degree and honors, date, one-line coursework list in tertiary at 10px. Four lines total. Nothing more.

**Footer:** Site domain left. Github, linkedin, archive → right. Nothing else.

---

## Main page sections — after writing exists

Everything above stays identical. The page gains two sections inserted between the fold and work. The nav gains "writing" as the first right-side link. The fold's short paragraph adjusts its last sentence to describe what the writing is.

**Technical section:** Label "technical". Up to three post cards. Each card: title in display serif at 15px, category tag and date top-right, two-sentence excerpt below in secondary color. Full 0.5px border, border-radius consistent with design system, hover shifts background to background-secondary only. "all technical posts →" link below if more than three exist. Excerpt is not optional — it is where the reader decides whether to click.

**Notes section:** Label "notes". Identical card format to technical. Distinguishable only by tag label. Same three-card maximum.

**Quarterly section:** Label "quarterly". Different visual treatment — left-border in accent color at 2px, no surrounding card border, content padded left from border. Each entry: period label ("Q3 2026") at 10px uppercase tertiary, title at 14px medium weight body font, two-sentence excerpt in secondary. Two entries maximum on main page. "all quarters →" link below if more exist. This treatment signals continuous series rather than standalone piece.

---

## Archive page

Two sections: all work, all projects.

All work: every role reverse chronological. Title, company, date range, two lines description. No tags, no long descriptions.

All projects: every project reverse chronological — class projects, hackathon projects, personal projects. Name, context (course or "personal project" or "hackathon"), date, one sentence. No bullet points, no tech lists.

No styled nav beyond site name linking home. Not designed to impress. Designed to be complete.

---

## Writing list page

Full list of all posts. Category filter at top — buttons for all, technical, notes, quarterly. Client-side filtering, no page reload. Default: all, newest first. Each item in the list: title, tag, date, excerpt. Full list loads at once.

---

## Individual post pages

Title in display serif, large. Date and tag below title in tertiary. Body in body font, 16px, line-height 1.75, max-width 640px. At the bottom: horizontal rule, "← back" link to `/writing`, optionally previous and next post as plain text links.

No comments. No share buttons. No reading time. No progress bar. No table of contents unless the post genuinely needs one. No newsletter embed.

---

## Typography

Two fonts only.

Display font: a serif with character. Used for the name on the fold and post titles inside cards and on post pages only. Suggested starting points: Lora, Fraunces, Playfair Display. Should feel authoritative without being decorative.

Body font: a clean geometric grotesque. Used for everything else without exception. Suggested starting points: DM Sans, Plus Jakarta Sans, Instrument Sans.

Type scale: four stops only. 28–32px for fold name. 15–16px for post titles and work titles. 13px for body and descriptions. 10–11px for metadata, dates, tags, section labels. No other sizes added for any reason.

Line height: 1.7 for body and descriptions. 1.3 for titles. 1.0 for single-line metadata.

Letter spacing: slightly tight on the fold name (−0.02em). Normal everywhere else. Never add positive letter spacing to anything except the uppercase section labels (0.1em tracked).

---

## Color

Defined entirely in CSS custom properties. Every color reference in every component uses a variable — never a hardcode.

Light mode background: white. Dark mode background: #111 or #0f0f0f, not pure black.

Text: three levels. Primary for titles and names. Secondary for body, descriptions, prose. Tertiary for dates, tags, metadata, labels, section headers.

One accent color. Suggested: HSL(175, 35%, 45%) light mode, HSL(175, 30%, 60%) dark mode. Used in four places only: left-border on quarterly entries, link underlines on hover state, active nav item if needed, one optional fold detail. Nowhere else. Not on buttons. Not on tags. Not on section labels. Not as a background on anything.

Tags: always background-secondary fill, 0.5px border in border-tertiary, 3px border-radius, 10px lowercase. No color variation between tag categories. Category is communicated by the label text, not by color.

Dark mode: supported from day one via prefers-color-scheme. CSS custom properties handle it entirely — every component works in both modes without conditional logic in JavaScript.

---

## What to carry over from the old site

The content: all work descriptions, all project details, the education section, the contact information. Everything that is data survives.

The Next.js framework if it is working well. The deployment setup.

Nothing else. No components. No styling. No layout patterns. Start from scratch on the visual layer.

---

## What to never add

Logos on the work section. Stat counters of any kind. Skill bars or skill badges. A timeline component with decorative connectors. Animated page transitions. A hero image or avatar. Social share buttons on posts. A newsletter signup embedded anywhere on the site. A reading time estimate. A scroll progress bar. Any "built with" credit. Any version number. Any element that counts something to signal activity or impressiveness. A contact form. The `<EJ/>` logotype or any logotype. Hover effects that reveal hidden content. Any background texture, gradient, or Three.js canvas.

If a feature is not described in this document, the default answer is: it does not exist on this site. Add it only if there is a specific, articulable reason it serves the reader. "It would be cool" or "other sites have it" are not reasons.

---

## The test for every decision

Does this serve the reader or does it serve the impression of the site? If it serves the impression, remove it. The work is what's impressive. The site gets out of the way.

---

## Tech stack

Simplest possible. Purposefully minimal, yet clean and polished, fast rendering, universal. Next.js App Router. No unnecessary dependencies.
