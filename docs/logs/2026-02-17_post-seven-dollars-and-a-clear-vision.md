---
id: log_20260217_post-seven-dollars-and-a-clear-vision
type: log
status: archived
event_type: seven-dollars-blog-post-publish
source: cli
branch: main
created: 2026-02-17
---

# post: Seven Dollars and a Clear Vision

## Summary

Published first blog post on ohjonathan.com. The post covers making a one-minute cinematic history of Chicago using Google Veo 3 for $7, with a broader thesis about intention as the new bottleneck in creative work.

## Goal

Take over from a crashed Antigravity (Gemini) session, fix outstanding issues, and publish the complete blog post with all assets.

## Key Decisions

- **Inline SVGs via Hugo shortcode** — Created `layouts/shortcodes/inline-svg.html` to inline SVGs into the DOM at build time, fixing a theme mismatch where SVGs used `prefers-color-scheme: dark` but the site uses `data-theme="terminal"`.
- **Vertical cost comparison layout** — Redesigned the cost-comparison SVG from side-by-side to stacked vertical layout, giving the Traditional VFX section room to breathe.
- **Thumbnail via Gemini Nano Banana** — Wrote a detailed prompt for AI image generation; diagonal split of Scene 1 (1830 prairie) and Scene 7 (2026 sunset skyline) with "$7" overlay.
- **TOC proposal** — Wrote and saved a proposal for auto-generated table of contents on single pages at `docs/strategy/proposals/table-of-contents-for-single-pages.md`.

## Changes Made

- `content/posts/seven-dollars-and-a-clear-vision.md` — Blog post (inherited from Antigravity session, fixed SVG refs and YouTube embed)
- `layouts/shortcodes/inline-svg.html` — New Hugo shortcode for inlining SVGs
- `static/images/posts/seven-dollars/iteration-flow.svg` — Fixed theme selectors
- `static/images/posts/seven-dollars/cost-comparison.svg` — Redesigned to vertical layout, fixed theme selectors
- `static/images/posts/seven-dollars/scene-1.jpg` through `scene-7.jpg` — Scene screenshots (from Antigravity session)
- `static/images/posts/seven-dollars/thumbnail.jpg` — YouTube thumbnail
- `static/images/posts/seven-dollars/scene-filmstrip.svg` — Deleted (orphaned)
- `docs/strategy/proposals/table-of-contents-for-single-pages.md` — TOC feature proposal

## Alternatives Considered

- CSS filter inversion for SVG dark mode (rejected: unreliable color mapping)
- Two separate SVG files per theme (rejected: unnecessary duplication)
- Side-by-side cost comparison layout (replaced: RHS was cramped)

## Impacts

- First blog post live on ohjonathan.com
- YouTube video published: https://youtu.be/o-yfe-H5uow
- New `inline-svg` shortcode available for future posts
- TOC proposal ready for implementation in a future session
