# johnnyoh.xyz — Design System

> **What this is:** The single source of truth for all visual and structural design decisions on johnnyoh.xyz. Read this before creating or modifying any template, stylesheet, or component.
>
> **Who this is for:** Any AI coding agent (Claude Code, Gemini CLI, Codex CLI) or human developer working on this site. If a decision isn't documented here, it hasn't been made — ask before guessing.
>
> **Source CSS:** `static/css/custom.css` contains the production implementation. This document explains the *intent* behind those values and how to extend them correctly.

---

## 1. IDENTITY

**Site owner:** Jonathan Oh
**Professional name (all UI):** "Jonathan Oh" — never "Johnny" in any rendered template or nav element
**Positioning:** Builder by default. Consultant by training.
**Domain:** johnnyoh.xyz
**Personality of the design:** Confident, clean, intentional. The site should feel like it was built by someone who builds things — not flashy, not minimal-to-the-point-of-invisible. Every choice is deliberate. Think: a well-organized repo, not a marketing page.

---

## 2. COLOR SYSTEM

### Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FAF8F5` | Page background. Warm linen, not cold white. |
| `--bg-card` | `#FFFFFF` | Card backgrounds. Pure white for contrast against linen. |
| `--text` | `#1A1A1A` | Primary text. Near-black, not pure black. |
| `--text-secondary` | `#5C5C5C` | Descriptions, supporting text, card body copy. |
| `--text-tertiary` | `#8A8A8A` | Metadata, dates, footer text, section headers. Lowest emphasis. |
| `--accent` | `#1B2A4A` | Dark navy. Links, tags, hover states, the hero tagline accent line. |
| `--accent-hover` | `#142038` | Darker navy for hover on accent-colored elements. |
| `--border` | `#E8E4DF` | All borders, dividers, separators. Warm gray, not cool. |

### Rules

- **Never use pure black (`#000`)** for text or borders. The warmth of the palette is intentional.
- **Never use pure white (`#FFF`)** for backgrounds except cards. The linen bg is non-negotiable.
- **Accent color is reserved for interactive elements and emphasis.** Don't use it for decorative purposes or large background areas.
- **No additional colors.** If a new color feels necessary, you're probably solving the wrong problem. Use opacity variants of existing tokens instead (e.g., `rgba(27, 42, 74, 0.07)` for tag backgrounds).
- **No dark mode.** Not in scope. Don't add it, don't prep for it.

---

## 3. TYPOGRAPHY

### Three Typefaces, Three Roles

| Typeface | CSS Variable | Role | Used For |
|----------|-------------|------|----------|
| **Source Serif 4** | `--serif` | Narrative / reading | Hero h1, hero subtitle, article body text, card descriptions, card philosophy quotes, background strip text, blockquotes |
| **DM Sans** | `--sans` | UI / structure | Site name in nav, card titles (h3), post titles in lists, page titles (h1 on inner pages), article h2/h3 subheadings |
| **JetBrains Mono** | `--mono` | Technical / metadata | Nav links, section headers (PROJECTS, WRITING, BACKGROUND), card tags, card bottom metadata, dates, footer text, resume link, page meta (date + tags on articles) |

### Font Stacks (exact values)

```
--serif: 'Source Serif 4', Charter, 'Bitstream Charter', Cambria, serif
--sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif
--mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace
```

### Google Fonts Import

```
Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400
JetBrains+Mono:wght@400;500
DM+Sans:wght@400;500;600
```

### Key Type Sizes

| Element | Font | Size | Weight | Line-height | Extra |
|---------|------|------|--------|-------------|-------|
| Homepage hero h1 | Serif | 2.4rem | 700 | 1.25 | `letter-spacing: -0.02em` |
| Inner page title h1 | Serif | 2.2rem | 700 | 1.25 | `letter-spacing: -0.02em` |
| Article body p | Serif | 1.05rem | 400 | 1.65 | — |
| Hero subtitle | Serif | 1.15rem | 400 | 1.65 | Color: `--text-secondary` |
| Card title h3 | Sans | 1.1rem | 600 | default | `letter-spacing: -0.01em` |
| Article h2 | Sans | 1.4rem | 600 | default | `letter-spacing: -0.01em` |
| Article h3 | Sans | 1.15rem | 600 | default | — |
| Post title (in lists) | Sans | 1rem | 500 | default | — |
| Site name (nav) | Sans | 1.05rem | 600 | default | `letter-spacing: -0.01em` |
| Nav links | Mono | 0.8rem | 400 | default | `letter-spacing: 0.02em` |
| Section header h2 | Mono | 0.78rem | 500 | default | `text-transform: uppercase; letter-spacing: 0.1em` |
| Card tag | Mono | 0.7rem | 400 | default | Navy text on 7% navy bg |
| Card bottom metadata | Mono | 0.72rem | 400 | default | Color: `--text-tertiary` |
| Dates | Mono | 0.75rem | 400 | default | Color: `--text-tertiary` |
| Footer text | Mono | 0.75rem | 400 | default | Color: `--text-tertiary` |

### Rules

- **Never mix roles.** If it's a title, it's DM Sans. If it's body/narrative, it's Source Serif 4. If it's metadata/technical, it's JetBrains Mono. No exceptions.
- **Monospace signals technical fluency** — it's not decoration. Use it only where the content is structural, categorical, or machine-like (labels, dates, tags, nav).
- **Serif signals narrative and thinking** — use it wherever the reader should slow down and absorb meaning.
- **Sans signals UI and action** — use it for clickable titles, navigation anchors, things that name or label.

---

## 4. SPACING & LAYOUT

### Content Width

| Context | Max-width |
|---------|-----------|
| All page containers (nav, hero, sections, footer) | `780px` |
| Article body text (`.page-content`) | `680px` |
| Hero subtitle, background strip text | `560px` / `640px` |

### Page Padding

| Breakpoint | Horizontal padding |
|------------|-------------------|
| Desktop (>600px) | `1.5rem` |
| Mobile (≤600px) | `1.25rem` |

### Vertical Rhythm

- Hero top padding: `5rem` (desktop), `3rem` (mobile)
- Between major sections: `3.5rem` to `4rem` margin-bottom
- Section header to content: `1.5rem`
- Between card items: `1rem`
- Article paragraphs: `1.2em` margin-bottom
- Article h2 margin-top: `2.5rem`
- Border separators: `1px solid var(--border)`

### Rules

- **780px max-width is sacred.** Every container element follows it. Content never goes wider.
- **680px for reading.** Article body text column is narrower than the container to improve readability.
- **Generous vertical space between sections, tight space within.** Sections breathe. Items within a section cluster.

---

## 5. COMPONENT PATTERNS

### 5a. Navigation

```
[site-name]                    [link] [link] [link]
Jonathan Oh                    about  projects  writing
```

- Site name: DM Sans, 600 weight, left-aligned
- Links: JetBrains Mono, 0.8rem, lowercase, `--text-secondary`, hover → `--text`
- Active link: color `--text`
- Appears on every page. Same markup in homepage `index.html` and `baseof.html`.

### 5b. Section Header

```
PROJECTS                                    View all →
─────────────────────────────────────────────────────
```

- Title: JetBrains Mono, 0.78rem, uppercase, `letter-spacing: 0.1em`, `--text-tertiary`
- Optional right-side link: JetBrains Mono, 0.75rem, `--text-tertiary`, hover → `--accent`
- Bottom border: `1px solid var(--border)`
- Use for every content section on the homepage and list pages.

### 5c. Project Card

```
┌──────────────────────────────────────────────────┐
│ Project Title                    [tag label]     │
│                                                  │
│ "Philosophy quote in italics."                   │
│                                                  │
│ Description text in serif. One to two sentences  │
│ explaining what this is and why it matters.      │
│                                                  │
│ ──────────────────────────────────────────────── │
│ metadata · metadata · metadata · metadata        │
└──────────────────────────────────────────────────┘
```

- Background: `--bg-card` (#FFF), border: `1px solid var(--border)`, radius: `6px`
- Hover: border darkens to `#C8C4BF`, subtle shadow `0 2px 12px rgba(0,0,0,0.04)`
- Title: DM Sans, 1.1rem, 600 weight
- Tag: JetBrains Mono, 0.7rem, `--accent` text on `rgba(27, 42, 74, 0.07)` background, `3px` radius
- Philosophy: Source Serif 4, italic, 0.92rem, `--text-secondary`
- Description: Source Serif 4, 0.95rem, `--text-secondary`
- Bottom metadata: JetBrains Mono, 0.72rem, `--text-tertiary`, separated by gap (not dots)
- Bottom border-top: `1px solid var(--border)`
- **The philosophy quote is the hook.** Every project card should have one. It captures the *thinking* behind the build, not just a description.

**Data source (homepage):** `data/projects.yaml`
**Data source (list pages):** Frontmatter fields: `tag`, `philosophy`, `meta` (array), `description`

### 5d. Post Item (writing list)

```
Post Title Here                              Jan 2026
─────────────────────────────────────────────────────
```

- Title: DM Sans, 1rem, 500 weight, `--text`
- Date: JetBrains Mono, 0.75rem, `--text-tertiary`, right-aligned
- Hover: title color → `--accent`
- Bottom border: `1px solid var(--border)`
- Mobile: stacks vertically (title above date)

### 5e. Background / Experience Strip

- Section header (same pattern as 5b)
- Body: Source Serif 4, 1.05rem, `--text-secondary`, max-width 640px
- Bold names/orgs: `--text` color, 600 weight
- CTA link: JetBrains Mono, 0.8rem, `--accent`, appends ` →` via CSS `::after`

### 5f. Footer

```
Jonathan Oh · San Francisco      [icon]GitHub [icon]LinkedIn About
```

- Left: JetBrains Mono, 0.75rem, `--text-tertiary`
- Right links: JetBrains Mono, 0.75rem, `--text-tertiary`, hover → `--accent`
- Icons: 13px, inline with text
- Top border: `1px solid var(--border)`
- Mobile: stacks vertically, left-aligned

### 5g. Article Content

Standard prose styling for all page content rendered from markdown:

- Body: Source Serif 4, 1.05rem, line-height 1.65
- h2: DM Sans, 1.4rem, 600. Margin-top `2.5rem`, margin-bottom `0.75rem`
- h3: DM Sans, 1.15rem, 600. Margin-top `2rem`, margin-bottom `0.5rem`
- Links: `--accent` color, underline with `text-underline-offset: 2px`
- Blockquotes: `3px` left border in `--accent`, italic, `--text-secondary`
- Inline code: JetBrains Mono, `0.88em`, light navy bg `rgba(27, 42, 74, 0.05)`
- Code blocks: dark bg `#1A1A1A`, light text `#E8E4DF`, `6px` radius, `1.25rem` padding
- Images: `max-width: 100%`, `4px` border-radius
- Lists: Serif, 1.05rem, `1.5em` left margin
- HR: `1px solid var(--border)`, `2.5rem` vertical margin

---

## 6. ICONS

Three SVG icons used in nav, hero, and footer. All stored as Hugo partials in `layouts/partials/icons/`.

| Icon | Partial | Style | Notes |
|------|---------|-------|-------|
| GitHub | `icons/github.html` | Filled (`class="icon-fill"`) | GitHub's official mark, `fill: currentColor` |
| LinkedIn | `icons/linkedin.html` | Filled (`class="icon-fill"`) | LinkedIn's official mark, `fill: currentColor` |
| Email | `icons/email.html` | Stroked | Envelope outline, `stroke: currentColor` |

**Sizing:**
- Hero: `width: 15px; height: 15px`
- Footer: `width: 13px; height: 13px`
- Color inherits from parent `<a>` tag via `currentColor`

**If you add new icons:** Use the same pattern. Create a partial in `layouts/partials/icons/`. Use `currentColor` so icons follow text color and hover states. Prefer filled style for brand marks, stroked for generic icons.

---

## 7. RESPONSIVE BEHAVIOR

Single breakpoint: `600px`.

### At ≤600px:

| Element | Change |
|---------|--------|
| Hero h1 | 2.4rem → 1.75rem |
| Hero subtitle | 1.15rem → 1.05rem |
| Hero meta links | Wrap, separators hidden |
| Page padding | 1.5rem → 1.25rem |
| Project card padding | Reduced |
| Card top (title + tag) | Stacks vertically |
| Post items | Title + date stack vertically |
| Footer | Stacks vertically, left-aligned |
| Inner page title | 2.2rem → 1.6rem |
| Post navigation | Stacks vertically |

### Rules

- **No hamburger menu.** Three nav links fit at any width. If a fourth is added, reconsider.
- **No horizontal scrolling.** Ever. On any element.
- **Cards don't become carousels.** They just stack.

---

## 8. PAGE TYPES & TEMPLATE MAP

| Page | URL pattern | Template | Layout |
|------|------------|----------|--------|
| Homepage | `/` | `layouts/index.html` | Standalone (own HTML document, does not use baseof) |
| About | `/about/` | `layouts/_default/single.html` via `baseof.html` | Nav + content + footer |
| Project detail | `/projects/[slug]/` | `layouts/_default/single.html` via `baseof.html` | Nav + content + footer |
| Projects list | `/projects/` | `layouts/_default/list.html` via `baseof.html` | Nav + project cards + footer |
| Post detail | `/posts/[slug]/` | `layouts/_default/single.html` via `baseof.html` | Nav + content (with date/tags) + prev/next + footer |
| Posts list | `/posts/` | `layouts/_default/list.html` via `baseof.html` | Nav + post items + footer |

### Adding a New Page Type

If you need a new page type (e.g., `/uses/`, `/now/`):

1. Create content file: `content/[pagename].md` with standard frontmatter
2. It will render using `single.html` automatically — no new template needed
3. Add to nav by updating `hugo.toml` menu config
4. If it needs a unique layout, create `layouts/[section]/single.html`

### Adding a New Section (like projects or posts)

1. Create `content/[section]/_index.md` with title and description
2. Add content files: `content/[section]/[slug].md`
3. It will use `list.html` for the index and `single.html` for detail pages
4. If the section needs a custom list layout (like project cards vs. post items), add a conditional block to `list.html`

---

## 9. DATA ARCHITECTURE

### Homepage Project Cards

Source: `data/projects.yaml`

```yaml
- title: "Project Name"          # DM Sans, card title
  slug: "project-slug"           # URL: /projects/[slug]/
  tag: "Label · Year"            # JetBrains Mono tag badge
  philosophy: "The guiding idea" # Source Serif 4, italic
  description: "What it does"    # Source Serif 4, card body
  meta:                          # JetBrains Mono, bottom row
    - "detail"
    - "detail"
```

### Project Page Frontmatter (for list page rendering)

```yaml
---
title: "Project Name"
date: YYYY-MM-DD
description: "One-line summary"
tag: "Label"                     # Renders in card tag badge
philosophy: "Guiding idea"       # Renders in card italic line
meta:                            # Renders in card bottom row
  - "detail"
  - "detail"
tags: ["tag1", "tag2"]           # For OG/SEO, not displayed on cards
image: "/og-default.png"         # OG image
---
```

### Post Frontmatter

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
description: "One-line summary for SEO and social sharing"
tags: ["tag1", "tag2"]           # Displayed below title on article page
image: "/og-default.png"
draft: false
---
```

---

## 10. ADDING NEW COMPONENTS

When building something new, follow this decision tree:

**Is it a title or label?** → DM Sans
**Is it body text, a quote, or narrative?** → Source Serif 4
**Is it metadata, a date, a tag, or a system label?** → JetBrains Mono

**Does it need emphasis?** → Use `--accent` color or font-weight 600. Not both unless it's a page title.
**Does it need a container?** → White card on linen bg, `1px solid var(--border)`, `6px` radius.
**Does it need a divider?** → `1px solid var(--border)`. Never thicker. Never a different color.
**Does it need interaction?** → Hover transitions: `0.2s` default. Color shift to `--accent` for text, border darken + subtle shadow for cards.

**Max-width:** Container = 780px. Reading content = 680px. Never wider.
**Vertical spacing:** Between sections = 3.5-4rem. Within sections = 1-1.5rem. Be generous between, tight within.

---

## 11. WHAT NOT TO DO

- Don't add new colors. Solve it with opacity variants of existing tokens.
- Don't add new fonts. Three is the maximum. Every font has a reason.
- Don't use `font-weight: bold` — use 600 (semibold) for emphasis, 700 only for page-level h1 titles.
- Don't add animations beyond hover transitions. No page transitions, no scroll animations, no loading spinners.
- Don't add a dark mode, sidebar, hamburger menu, or search bar unless explicitly requested.
- Don't use border-radius greater than `6px`. Cards are `6px`. Tags are `3px`. Code blocks are `6px`. Nothing is rounder.
- Don't center text. Everything is left-aligned except the footer on desktop (space-between).
- Don't use box shadows heavier than `0 2px 12px rgba(0,0,0,0.04)`. If it's casting a shadow, something is wrong.
- Don't nest cards inside cards. One level of containment maximum.

---

*Design system version 1.0 — February 2026. Covers homepage, inner pages, and all current component patterns. Update this document when design decisions are made or changed.*
