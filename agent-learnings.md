# Agent Learnings

## 2026-04-03

- Mistake: I added writing section labels on the home page without rendering the corresponding cards.
  - Correct solution: Render the post `Card` entries inside each writing category section so users can click through.

- Mistake: I coupled post content files to `data/posts.ts` types and used an import path setup that failed during hot reload, causing writing links/routes to break.
  - Correct solution: Move shared post interfaces into `data/post-types.ts`, import those types from content files, and keep `data/posts.ts` as the aggregator.

- Mistake: I required manual code updates in `data/posts.ts` to register writing content.
  - Correct solution: Auto-discover posts directly from the writing content folder so adding a file is enough.
