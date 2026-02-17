# Proposal: Table of Contents for Single Pages

## Problem
Long posts and project pages are hard to scan quickly. Readers currently cannot see page structure at a glance or jump to sections.

## Decision
Add an auto-generated, clickable Table of Contents (TOC) to all single pages rendered by `layouts/_default/single.html`. The TOC is site-wide and section-agnostic — it applies uniformly to posts, projects, and any future section that uses the default single template. No section-specific conditional logic.

## Goals
1. Improve scanability for long-form content.
2. Reduce scroll friction with jump links.
3. Keep short pages visually clean.
4. Preserve the existing design language in both themes.
5. Apply consistently across all sections (posts, projects, future content).

## Non-Goals
1. No TOC on list pages, homepage, or nav.
2. No manual TOC markup in markdown files.
3. No TOC on pages rendered by custom templates (these are excluded by design since the TOC logic lives only in `layouts/_default/single.html`).
4. No JavaScript dependency for core TOC behavior.
5. No section-specific conditionals in the TOC block.

## Scope
1. **Config:** `hugo.toml` — add `[markup.tableOfContents]` to constrain TOC depth to h2 only.
2. **Template:** `layouts/_default/single.html` — add TOC block between `.page-header` and `.page-content`.
3. **Styling:** `static/css/custom.css` — TOC styles for both editorial and terminal themes.
4. **Coverage:** all single pages using the default template (currently posts and projects).
5. **Excluded by architecture:** pages with custom templates (`layouts/about/single.html`, `layouts/resume/list.html`) are unaffected — no changes needed in those files.

## Prerequisites

Add to `hugo.toml` before implementation:

```toml
[markup.tableOfContents]
  startLevel = 2
  endLevel = 2
```

This constrains Hugo's `.TableOfContents` output to h2 headings only. Without this, Hugo defaults to h1–h3, which would include nested h3 entries (out of scope for v1).

## Behavior Spec (v1)
1. Render TOC only when `toc` is not explicitly disabled in frontmatter.
2. Support explicit opt-out with `toc: false`.
3. Show TOC only when the page has at least 3 `h2` headings.
4. Count headings via `findRE` on rendered content: `{{ $headings := findRE "<h2 id=" .Content }}`.
5. Include `h2` headings only (enforced by `hugo.toml` config above).
6. Place TOC between `.page-header` and `.page-content`.
7. Wrap TOC in semantic `<details><summary>`.
8. Default state: collapsed.
9. Summary label: `On this page`.
10. Use Hugo-generated heading anchors for jump links.
11. No section-specific logic — the TOC block must not check `.Section`.

## Styling Direction
1. Typography: JetBrains Mono (structural/navigation role per DESIGN.md).
2. Tone: small text around `0.78rem`, base `--text-tertiary`.
3. Container: light border and spacing consistent with section-header rhythm.
4. Editorial theme: subtle, low-contrast utility panel. Solid border.
5. Terminal theme: dashed border, accent hover, consistent with terminal motif.
6. Add `scroll-margin-top` (~1rem) to `h2` elements in `.page-content` so jump links don't land flush against the viewport edge.

## Accessibility Requirements
1. `summary` must be clearly focus-visible and keyboard operable.
2. TOC links must maintain readable contrast in both themes.
3. Spacing and hit targets must remain usable on mobile.
4. TOC must still work without JavaScript.

## Acceptance Criteria

### Positive cases (TOC should render)
1. `content/posts/seven-dollars-and-a-clear-vision.md` — 6 h2 headings. TOC renders with 6 entries. The 7 h3 scene headings under "Production prompts" are excluded (h2-only by config).
2. `content/projects/ontos.md` — 4 h2 headings. TOC renders.
3. `content/projects/genai-platform.md` — 4 h2 headings. TOC renders.
4. `content/projects/folio.md` — 3 h2 headings. TOC renders (at threshold).

### Negative cases (TOC should NOT render)
5. A page with fewer than 3 h2 headings does not show TOC. (No current page tests this — verify manually with a test page or by temporarily removing headings.)
6. A page with `toc: false` in frontmatter does not show TOC regardless of heading count.

### Unchanged pages
7. `layouts/about/single.html` — no changes, no TOC.
8. `layouts/resume/list.html` — no changes, no TOC.

### Cross-cutting
9. Jump links scroll to the correct heading with adequate top margin.
10. Editorial and terminal themes both render cleanly on desktop and mobile.

## Out of Scope
1. Sticky TOC behavior.
2. `h3` nesting in TOC.
3. Per-page "always open" toggle behavior.
4. `scroll-behavior: smooth` (can be added later if desired).

## Implementation Notes
1. Heading count uses `findRE` on `.Content` (rendered HTML), not `.RawContent` (markdown), because Hugo's rendering is the source of truth for what actually becomes an h2.
2. The `hugo.toml` TOC config change is a prerequisite — must be applied before the template change, or the TOC will include h3 entries.
3. Validate on all 4 current content pages (1 post, 3 projects) plus one negative case.
