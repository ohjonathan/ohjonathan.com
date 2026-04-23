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

Published the site-side launch package for the model-behavior essay: a canonical post on `ohjonathan.com`, a custom post-specific social card, a rollout brief with distribution copy and evidence links, and a metadata fix so posts emit correct article/canonical/social tags.

## Changes Made

- Added the canonical essay post under `content/posts/when-an-agent-cannot-actually-complete-the-task.md`.
- Added a post-specific social card in both SVG source and PNG publish formats under `static/images/posts/model-behavior/`.
- Added `docs/strategy/model-behavior-rollout.md` with the canonical URL, support links, LinkedIn copy, and optional HN guidance.
- Fixed `layouts/_default/baseof.html` so posts emit `og:type=article`, `meta description`, `twitter:*` tags, and a canonical link.
- Verified the site build with `hugo --destination /tmp/ohjonathan-model-behavior-preview`.

## Goal

Implement a credibility-first rollout package so the essay could publish as the main artifact immediately, with the memo positioned as supporting evidence and the site metadata/social packaging ready for distribution.

## Key Decisions

- Treated the essay as the primary public artifact and kept the memo off the front stage.
- Used a post-local social card instead of the site-wide default OG image.
- Added a rollout brief with exact copy and links rather than leaving the distribution steps implicit.
- Fixed the site template globally because the existing `og:type` bug would have weakened this launch and every future post launch.

## Alternatives Considered

- Publishing both the essay and memo as co-equal public posts on the site.
- Reusing the global default OG image and skipping a custom launch asset.
- Leaving rollout copy outside the repo and handling LinkedIn/HN messaging ad hoc.

These were rejected because they either diluted the essay's credibility-first framing or made the launch package less repeatable.

## Impacts

- The essay now has a canonical URL ready for publishing and reuse across channels.
- Social scrapers receive a post-specific image and correct article metadata instead of the prior generic defaults.
- Future posts also benefit from the corrected metadata template.
- The rollout strategy is now executable from the repo without reconstructing links or copy.

## Testing

- Built the site successfully with `hugo --destination /tmp/ohjonathan-model-behavior-preview`.
- Verified the generated post HTML includes `meta description`, `og:type=article`, `og:image`, `twitter:card`, `twitter:image`, and `canonical`.
- Verified the generated social card PNG is 1200x630 and visually inspected the rendered asset.
