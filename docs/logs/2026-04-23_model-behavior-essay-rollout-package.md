---
id: log_20260423_model-behavior-essay-rollout-package
type: log
status: active
event_type: feature
source: cli
branch: main
created: 2026-04-23
---

# Model-Behavior Essay Rollout Package

## Summary

Published the site-side launch package for the model-behavior essay: a canonical post on `ohjonathan.com`, a custom post-specific social card, a rollout brief with distribution copy and evidence links, a public mirrored evidence bundle for cited source material, and a metadata fix so posts emit correct article/canonical/social tags.

## Changes Made

- Added the canonical essay post under `content/posts/when-an-agent-cannot-actually-complete-the-task.md`.
- Added a post-specific social card in both SVG source and PNG publish formats under `static/images/posts/model-behavior/`.
- Added `docs/strategy/model-behavior-rollout.md` with the canonical URL, support links, LinkedIn copy, and optional HN guidance.
- Mirrored the cited `johnny-os` evidence documents into `static/evidence/model-behavior/` and added a rendered public index page at `content/reference/model-behavior-evidence.md`.
- Fixed `layouts/_default/baseof.html` so posts emit `og:type=article`, `meta description`, `twitter:*` tags, and a canonical link.
- Verified the site build with `hugo --destination /tmp/ohjonathan-model-behavior-preview`.

## Goal

Implement a credibility-first rollout package so the essay could publish as the main artifact immediately, with the memo positioned as supporting evidence, the cited evidence publicly accessible, and the site metadata/social packaging ready for distribution.

## Key Decisions

- Treated the essay as the primary public artifact and kept the memo off the front stage.
- Used a post-local social card instead of the site-wide default OG image.
- Added a rollout brief with exact copy and links rather than leaving the distribution steps implicit.
- Mirrored only the cited evidence files into the public site repo instead of weakening the essay's public-auditability framing.
- Fixed the site template globally because the existing `og:type` bug would have weakened this launch and every future post launch.

## Alternatives Considered

- Publishing both the essay and memo as co-equal public posts on the site.
- Reusing the global default OG image and skipping a custom launch asset.
- Leaving rollout copy outside the repo and handling LinkedIn/HN messaging ad hoc.

These were rejected because they either diluted the essay's credibility-first framing or made the launch package less repeatable.

## Impacts

- The essay now has a canonical URL ready for publishing and reuse across channels.
- Public readers can now inspect the cited memo, proposal, and quarantined artifacts without access to the private working repo.
- Social scrapers receive a post-specific image and correct article metadata instead of the prior generic defaults.
- Future posts also benefit from the corrected metadata template.
- The rollout strategy is now executable from the repo without reconstructing links or copy.

## Testing

- Built the site successfully with `hugo --destination /tmp/ohjonathan-model-behavior-preview`.
- Verified the generated post HTML includes `meta description`, `og:type=article`, `og:image`, `twitter:card`, `twitter:image`, and `canonical`.
- Verified the generated social card PNG is 1200x630 and visually inspected the rendered asset.
- Verified the public evidence bundle files are present under `static/evidence/model-behavior/` and indexed from a rendered site page.

## Revision — Voice + Visuals Pass

Full rewrite of the essay to match the site's established voice and visual conventions (one-job post as the reference). Added five inline SVG diagrams; restructured the body to foreground the two-session structure and enumerate the six missed halts; tightened the three-patterns taxonomy so each case (Gemini, Codex, stale models) sits cleanly under one pattern.

### Changes in this pass

- Rewrote `content/posts/when-an-agent-cannot-actually-complete-the-task.md` top-to-bottom: scene-first opener in first-person past tense, bold thesis lines under each section heading, italic cast/stack captions under each diagram, shorter paragraphs with attitude in declarative lines, closing that leads with "Read the logs. Check the tokens."
- Added five custom SVG diagrams under `static/images/posts/model-behavior/`:
  - `supposed-vs-actual.svg` — side-by-side intended vs. actual pipeline.
  - `two-session-chain.svg` — senior orchestrator (Opus 4.6) → implementing session (Opus 4.7) with user observing via token display.
  - `six-missed-halts.svg` — horizontal timeline of six halt-or-proceed moments.
  - `asymmetric-diligence.svg` — self vs. others diligence gradient.
  - `remediation-architecture.svg` — before/after verification architecture.
- Split "What the Behavior Suggests" into two sections: "Two Sessions, Six Missed Halts" (new, surfaces the distributed-choice structure) and "Three Patterns" (tightened taxonomy).
- Cut the editor's-note blockquote; cut the researchers paragraph in the conclusion.
- Kept the evidence-bundle link in the opener and a condensed signoff at the end.

### Key decisions

- Matched the one-job SVG design system: DM Sans / JetBrains Mono typography, navy #1B2A4A / terminal #3CEC6A palette, shared class vocabulary (`.step-box`, `.arrow`, etc.), `[data-theme="terminal"]` overrides on every SVG.
- Used a single amber accent (`#C88C00` editorial / `#F5A623` terminal) only on the forged-Gemini-verdict box in `supposed-vs-actual.svg` to mark it as tampered — no other color deviation from the established palette.
- Split into two sections rather than packing the two-session insight into prose inside "Three Patterns." Gives the distributed-choice structural claim its own runway with dedicated visuals (two-session + six-halts).
- Kept the social card, rollout brief, and evidence bundle unchanged — the revision is content/voice only.

### Testing

- To verify: run `hugo --destination /tmp/ohjonathan-model-behavior-revised`, grep the rendered post HTML for each of the five SVG filenames to confirm inlining, and toggle the terminal theme to confirm overrides apply.
