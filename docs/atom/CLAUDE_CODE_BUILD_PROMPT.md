# CLAUDE CODE: johnnyoh.xyz Complete Site Build

> **IMPORTANT:** Read this ENTIRE document before writing any code. This is a complete, self-contained implementation spec. Do NOT reference any external files, mockups, or prior conversations. Everything you need is here.

---

## OVERVIEW

Build the personal website for Jonathan Oh at `johnnyoh.xyz`. The site uses Hugo (static site generator) with the Paper theme as a base, hosted on Cloudflare Pages with GitHub Actions auto-deploy. The repo already exists with basic infrastructure — we are replacing ALL custom templates, CSS, and content with a new dual-theme design system.

**The site has two visual themes that share identical HTML:**

1. **Editorial** (default) — Warm linen background, navy accent, serif-forward. Recruiter-friendly, credentials first.
2. **Terminal** — Dark background, green accent, monospace-forward, Matrix rain effect, CRT aesthetics. Builder-friendly, projects first.

A toggle in the nav switches between them. Same HTML structure, different CSS tokens. Theme persists via `localStorage`.

**Key behavior difference:** In Editorial mode, the section order is Hero → Background → Projects → Writing. In Terminal mode, CSS `order` rearranges to Hero → Projects → Writing → Background. Same DOM, different visual priority.

---

## REPO STRUCTURE (what exists vs. what we create)

### Already exists (DO NOT DELETE):
```
.github/workflows/deploy.yml     # GitHub Actions → Cloudflare Pages
themes/paper/                    # Paper theme (git submodule, DO NOT MODIFY)
content/projects/ontos.md        # Ontos project page (UPDATE frontmatter)
hugo.toml                        # Site config (UPDATE, don't replace)
wrangler.jsonc                   # Cloudflare config
```

### Create or replace:
```
layouts/
├── index.html                           # Homepage (standalone, no baseof)
├── _default/
│   ├── baseof.html                      # Base wrapper for all inner pages
│   ├── single.html                      # Individual page template
│   └── list.html                        # Section listing template
└── partials/
    ├── analytics.html                   # Cloudflare Web Analytics
    └── icons/
        ├── github.html                  # SVG partial
        ├── linkedin.html                # SVG partial
        └── email.html                   # SVG partial

static/
├── css/custom.css                       # Complete design system + both themes
└── js/theme.js                          # Theme toggle + Matrix rain + CRT effects

data/
└── projects.yaml                        # Homepage project card data

content/
├── _index.md                            # Homepage metadata
├── about.md                             # About page (placeholder for now)
├── posts/_index.md                      # Posts section index
└── projects/
    ├── _index.md                        # Projects section index
    ├── ontos.md                         # UPDATE existing file's frontmatter
    ├── genai-platform.md                # NEW
    └── folio.md                         # NEW
```

---

## AGENT TEAM TASK BREAKDOWN

This work can be parallelized across 4 agents:

### Agent 1: CSS (static/css/custom.css)
Creates the complete stylesheet with both theme token sets and all component styles.

### Agent 2: Templates (layouts/)
Creates all Hugo templates: index.html, baseof.html, single.html, list.html, and all partials.

### Agent 3: Content & Data (content/ and data/)
Creates all markdown content files, data/projects.yaml, and updates hugo.toml.

### Agent 4: JavaScript (static/js/theme.js)
Creates the theme toggle logic, Matrix rain canvas, and CRT transition effects.

**After all agents complete:** Run `hugo server` to verify, then commit and push.

---

## AGENT 1: CSS — static/css/custom.css

Create this file with the EXACT content below. Every value has been designed and approved. Do not change any color, font size, spacing, or token value.

```css
/* ============================================
   GOOGLE FONTS
   ============================================ */
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');

/* ============================================
   THEME TOKENS — Editorial (default)
   ============================================ */
[data-theme="editorial"] {
  --bg: #FAF8F5;
  --bg-card: #FFFFFF;
  --bg-code: #1A1A1A;
  --text: #1A1A1A;
  --text-secondary: #5C5C5C;
  --text-tertiary: #8A8A8A;
  --accent: #1B2A4A;
  --accent-hover: #142038;
  --accent-glow: transparent;
  --border: #E8E4DF;
  --border-style: solid;
  --card-shadow-hover: 0 2px 12px rgba(0,0,0,0.04);
  --tag-bg: rgba(27, 42, 74, 0.07);
  --mono: 'JetBrains Mono', 'SF Mono', monospace;
  --serif: 'Source Serif 4', Charter, 'Bitstream Charter', Cambria, serif;
  --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-hero: var(--serif);
  --font-body: var(--serif);
  --font-title: var(--sans);
  --font-meta: var(--mono);
  --font-nav: var(--mono);
  --hero-weight: 700;
  --hero-size: 2.4rem;
  --hero-line-height: 1.25;
  --hero-letter-spacing: -0.02em;
  --card-radius: 6px;
  --card-border-width: 1px;
  --philosophy-style: italic;
  --toggle-label-left-opacity: 1;
  --toggle-label-right-opacity: 0.5;
  cursor: default;
}

/* ============================================
   THEME TOKENS — Terminal (dark)
   ============================================ */
[data-theme="terminal"] {
  --bg: #0A0F0D;
  --bg-card: #0F1613;
  --bg-code: #060A08;
  --text: #D4E4D4;
  --text-secondary: #8FA88F;
  --text-tertiary: #5A7A5A;
  --accent: #3CEC6A;
  --accent-hover: #5CF285;
  --accent-glow: rgba(60, 236, 106, 0.15);
  --border: #1C2E24;
  --border-style: dashed;
  --card-shadow-hover: 0 0 24px rgba(60, 236, 106, 0.08);
  --tag-bg: rgba(60, 236, 106, 0.1);
  --mono: 'JetBrains Mono', 'SF Mono', monospace;
  --serif: 'Source Serif 4', Charter, 'Bitstream Charter', Cambria, serif;
  --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-hero: var(--serif);
  --font-body: var(--mono);
  --font-title: var(--mono);
  --font-meta: var(--mono);
  --font-nav: var(--mono);
  --hero-weight: 700;
  --hero-size: 2.2rem;
  --hero-line-height: 1.3;
  --hero-letter-spacing: -0.01em;
  --card-radius: 2px;
  --card-border-width: 1px;
  --philosophy-style: normal;
  --toggle-label-left-opacity: 0.5;
  --toggle-label-right-opacity: 1;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='3' fill='%233CEC6A'/%3E%3Ccircle cx='10' cy='10' r='6' fill='none' stroke='%233CEC6A' stroke-width='1' opacity='0.4'/%3E%3C/svg%3E") 10 10, crosshair;
}

/* Green pointer cursor for interactive elements in terminal mode */
[data-theme="terminal"] a,
[data-theme="terminal"] .theme-toggle,
[data-theme="terminal"] [role="button"] {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='4' fill='%233CEC6A'/%3E%3Ccircle cx='10' cy='10' r='7' fill='none' stroke='%233CEC6A' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E") 10 10, pointer;
}

/* ============================================
   BASE
   ============================================ */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
  transition: background 0.5s ease, color 0.4s ease;
  position: relative;
  min-height: 100vh;
}

/* ============================================
   MATRIX RAIN CANVAS
   ============================================ */
#matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 1s ease;
}

[data-theme="terminal"] #matrix-canvas {
  opacity: 1;
}

.page-wrapper {
  position: relative;
  z-index: 1;
}

/* ============================================
   CRT EFFECTS (terminal only)
   ============================================ */

/* Scanlines */
[data-theme="terminal"] .page-wrapper::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.06) 2px,
    rgba(0, 0, 0, 0.06) 4px
  );
}

/* CRT flicker animations */
@keyframes crt-on {
  0% { opacity: 0; transform: scaleY(0.005); }
  30% { opacity: 0.5; transform: scaleY(0.005); }
  35% { opacity: 1; transform: scaleY(1); }
  40% { opacity: 0.8; }
  50% { opacity: 1; }
  60% { opacity: 0.9; filter: brightness(1.3); }
  100% { opacity: 1; filter: brightness(1); }
}

@keyframes crt-off {
  0% { opacity: 1; transform: scale(1); filter: brightness(1); }
  20% { opacity: 1; transform: scale(1); filter: brightness(1.5); }
  40% { opacity: 0.8; transform: scaleY(0.01) scaleX(1.1); filter: brightness(2); }
  70% { opacity: 0.5; transform: scaleY(0.005) scaleX(0.3); filter: brightness(3); }
  100% { opacity: 0; transform: scaleY(0) scaleX(0); }
}

.crt-on { animation: crt-on 0.6s ease-out forwards; }
.crt-off { animation: crt-off 0.3s ease-in forwards; }

/* Vignette */
[data-theme="terminal"] .page-wrapper::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9997;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

/* ============================================
   NAVIGATION
   ============================================ */
.site-nav {
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-nav .site-name {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: color 0.4s;
}

.site-nav .nav-right {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.site-nav .nav-links {
  display: flex;
  gap: 1.75rem;
  list-style: none;
}

.site-nav .nav-links a {
  font-family: var(--font-nav);
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.3s;
}

.site-nav .nav-links a:hover {
  color: var(--text);
}

[data-theme="terminal"] .site-nav .nav-links a:hover {
  color: var(--accent);
  text-shadow: 0 0 8px var(--accent-glow);
}

.site-nav .nav-links a.active {
  color: var(--text);
}

/* ============================================
   THEME TOGGLE
   ============================================ */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  user-select: none;
  padding: 0.35rem 0.65rem;
  border: 1px var(--border-style) var(--border);
  border-radius: var(--card-radius);
  transition: all 0.4s;
}

.theme-toggle:hover {
  border-color: var(--accent);
}

[data-theme="terminal"] .theme-toggle:hover {
  box-shadow: 0 0 12px rgba(60, 236, 106, 0.1);
}

.toggle-label {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.4s, opacity 0.4s;
}

.toggle-label-left {
  color: var(--text-secondary);
  opacity: var(--toggle-label-left-opacity);
}

.toggle-label-right {
  color: var(--accent);
  opacity: var(--toggle-label-right-opacity);
}

.toggle-track {
  width: 32px;
  height: 18px;
  border-radius: 9px;
  background: var(--border);
  position: relative;
  transition: background 0.4s;
}

[data-theme="terminal"] .toggle-track {
  background: var(--accent);
  box-shadow: 0 0 8px rgba(60, 236, 106, 0.3);
}

.toggle-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease, background 0.4s;
}

[data-theme="terminal"] .toggle-thumb {
  transform: translateX(14px);
  background: var(--bg);
}

/* ============================================
   HOMEPAGE SECTION ORDERING (flex container)
   ============================================ */
.main-content {
  display: flex;
  flex-direction: column;
}

/* Editorial: Hero → Background → Projects → Writing */
.hero              { order: 1; }
.experience-strip  { order: 2; }
.projects-section  { order: 3; }
.writing-section   { order: 4; }

/* Terminal: Hero → Projects → Writing → Background */
[data-theme="terminal"] .hero              { order: 1; }
[data-theme="terminal"] .projects-section  { order: 2; }
[data-theme="terminal"] .writing-section   { order: 3; }
[data-theme="terminal"] .experience-strip  { order: 4; }

/* ============================================
   HERO
   ============================================ */
.hero {
  max-width: 780px;
  margin: 0 auto;
  padding: 5rem 1.5rem 3rem;
  width: 100%;
}

.hero h1 {
  font-family: var(--font-hero);
  font-size: var(--hero-size);
  font-weight: var(--hero-weight);
  line-height: var(--hero-line-height);
  letter-spacing: var(--hero-letter-spacing);
  color: var(--text);
  max-width: 640px;
  transition: all 0.4s;
}

.hero .tagline-accent {
  color: var(--accent);
  transition: color 0.4s, text-shadow 0.4s;
}

[data-theme="terminal"] .hero .tagline-accent {
  text-shadow: 0 0 40px var(--accent-glow);
}

.hero .hero-sub {
  margin-top: 1.25rem;
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 560px;
  transition: all 0.4s;
}

[data-theme="terminal"] .hero .hero-sub {
  font-size: 0.92rem;
  line-height: 1.7;
}

/* ============================================
   TERMINAL BADGE ("$ hello, world" typing)
   ============================================ */
.terminal-badge {
  display: none;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  width: fit-content;
  overflow: hidden;
}

[data-theme="terminal"] .terminal-badge {
  display: flex;
  align-items: center;
  gap: 0;
}

.terminal-prompt {
  color: var(--text-tertiary);
  margin-right: 0.35rem;
  opacity: 0;
  transition: opacity 0.3s;
}

[data-theme="terminal"] .terminal-prompt {
  opacity: 1;
  transition-delay: 0.3s;
}

.typing-text {
  display: inline-block;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid transparent;
  transition: none;
}

[data-theme="terminal"] .typing-text {
  animation: typing 1.2s steps(14) 0.6s forwards, blink-caret 0.8s step-end 0.6s infinite;
}

[data-theme="editorial"] .typing-text {
  max-width: 0;
  border-right-color: transparent;
  animation: none;
}

@keyframes typing {
  from { max-width: 0; border-right-color: var(--accent); }
  to { max-width: 12ch; border-right-color: var(--accent); }
}

@keyframes blink-caret {
  from, to { border-right-color: var(--accent); }
  50% { border-right-color: transparent; }
}

/* ============================================
   HERO META (social links)
   ============================================ */
.hero .hero-meta {
  margin-top: 1.75rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.hero .hero-meta a {
  font-family: var(--font-meta);
  font-size: 0.78rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.3s, text-shadow 0.3s;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.hero .hero-meta a svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.icon-fill { fill: currentColor; stroke: none; }
.icon-stroke { fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }

.hero .hero-meta a:hover {
  color: var(--accent);
}

[data-theme="terminal"] .hero .hero-meta a:hover {
  text-shadow: 0 0 8px var(--accent-glow);
}

.separator-dot, .separator-pipe {
  color: var(--border);
  font-size: 0.75rem;
}

[data-theme="terminal"] .separator-dot { display: none; }
[data-theme="terminal"] .separator-pipe { display: inline; }
[data-theme="editorial"] .separator-dot { display: inline; }
[data-theme="editorial"] .separator-pipe { display: none; }

/* ============================================
   SECTIONS (shared)
   ============================================ */
.section {
  max-width: 780px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px var(--border-style) var(--border);
  transition: border-color 0.4s;
}

.section-header h2 {
  font-family: var(--font-meta);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
  transition: color 0.4s;
}

[data-theme="terminal"] .section-header h2::before {
  content: '> ';
  color: var(--accent);
}

.section-header a {
  font-family: var(--font-meta);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.3s;
}

.section-header a:hover {
  color: var(--accent);
}

/* ============================================
   PROJECT CARDS
   ============================================ */
.projects-section {
  margin-bottom: 3.5rem;
}

.project-card {
  display: block;
  background: var(--bg-card);
  border: var(--card-border-width) var(--border-style) var(--border);
  border-radius: var(--card-radius);
  padding: 1.75rem 2rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: var(--card-shadow-hover);
}

/* Terminal: corner accents on hover */
[data-theme="terminal"] .project-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 20px;
  height: 20px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
  border-radius: 2px 0 0 0;
  opacity: 0;
  transition: opacity 0.3s;
}

[data-theme="terminal"] .project-card::after {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
  border-radius: 0 0 2px 0;
  opacity: 0;
  transition: opacity 0.3s;
}

[data-theme="terminal"] .project-card:hover::before,
[data-theme="terminal"] .project-card:hover::after {
  opacity: 1;
}

[data-theme="terminal"] .project-card:hover {
  box-shadow: var(--card-shadow-hover), inset 0 1px 0 0 rgba(60, 236, 106, 0.15);
}

.project-card .card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.6rem;
}

.project-card h3 {
  font-family: var(--font-title);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.4s;
}

[data-theme="terminal"] .project-card h3 {
  color: var(--accent);
  letter-spacing: 0;
}

.project-card .card-tag {
  font-family: var(--font-meta);
  font-size: 0.7rem;
  color: var(--accent);
  background: var(--tag-bg);
  padding: 0.2rem 0.55rem;
  border-radius: var(--card-radius);
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 1rem;
  transition: all 0.4s;
}

[data-theme="terminal"] .project-card .card-tag {
  border: 1px solid rgba(60, 236, 106, 0.2);
}

.project-card .card-philosophy {
  font-family: var(--font-body);
  font-style: var(--philosophy-style);
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  transition: all 0.4s;
}

[data-theme="terminal"] .project-card .card-philosophy {
  font-size: 0.85rem;
  padding-left: 0.75rem;
  border-left: 2px solid var(--accent);
}

.project-card .card-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  transition: all 0.4s;
}

[data-theme="terminal"] .project-card .card-description {
  font-size: 0.85rem;
  line-height: 1.65;
}

.project-card .card-bottom {
  display: flex;
  gap: 1.25rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px var(--border-style) var(--border);
  flex-wrap: wrap;
  transition: border-color 0.4s;
}

.project-card .card-bottom span {
  font-family: var(--font-meta);
  font-size: 0.72rem;
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
  transition: color 0.4s;
}

[data-theme="terminal"] .project-card .card-bottom span::before {
  content: '• ';
  color: var(--accent);
}

/* ============================================
   WRITING LIST
   ============================================ */
.writing-section {
  margin-bottom: 4rem;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 0;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px var(--border-style) var(--border);
  transition: all 0.3s;
}

.post-item:hover .post-title {
  color: var(--accent);
}

[data-theme="terminal"] .post-item:hover .post-title::before {
  content: '> ';
  color: var(--accent);
}

[data-theme="terminal"] .post-item:hover .post-title {
  text-shadow: 0 0 8px var(--accent-glow);
}

.post-title {
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  transition: color 0.3s;
}

.post-date {
  font-family: var(--font-meta);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  white-space: nowrap;
  margin-left: 2rem;
  flex-shrink: 0;
}

/* ============================================
   BACKGROUND / EXPERIENCE STRIP
   ============================================ */
.experience-strip {
  margin-bottom: 3.5rem;
}

.experience-strip .strip-content {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 640px;
  transition: all 0.4s;
}

[data-theme="terminal"] .experience-strip .strip-content {
  font-size: 0.9rem;
  line-height: 1.75;
}

.experience-strip .strip-content strong {
  color: var(--text);
  font-weight: 600;
  transition: color 0.4s;
}

[data-theme="terminal"] .experience-strip .strip-content strong {
  color: var(--accent);
  text-shadow: 0 0 8px var(--accent-glow);
}

.experience-strip .resume-link {
  display: inline-block;
  margin-top: 1rem;
  font-family: var(--font-meta);
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  transition: color 0.3s;
}

.experience-strip .resume-link:hover {
  color: var(--accent-hover);
}

.experience-strip .resume-link::after {
  content: ' →';
}

/* ============================================
   FOOTER
   ============================================ */
.site-footer {
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  border-top: 1px var(--border-style) var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.4s;
  position: relative;
  z-index: 1;
}

.site-footer .footer-left {
  font-family: var(--font-meta);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  transition: color 0.4s;
}

.footer-build { display: none; }
[data-theme="terminal"] .footer-build { display: inline; }

.footer-status { display: none; }
[data-theme="terminal"] .footer-status {
  display: inline;
  color: var(--accent);
}
[data-theme="terminal"] .footer-status::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 0.4rem;
  vertical-align: middle;
  box-shadow: 0 0 4px var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--accent); }
  50% { opacity: 0.5; box-shadow: 0 0 8px var(--accent); }
}

.site-footer .footer-links {
  display: flex;
  gap: 1.5rem;
}

.site-footer .footer-links a {
  font-family: var(--font-meta);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.site-footer .footer-links a svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.site-footer .footer-links a:hover {
  color: var(--accent);
}

[data-theme="terminal"] .site-footer .footer-links a:hover {
  text-shadow: 0 0 8px var(--accent-glow);
}

/* ============================================
   INNER PAGE STYLES (non-homepage)
   ============================================ */

/* Single pages (articles, about, project detail) */
.single-page {
  max-width: 780px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.page-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.page-title {
  font-family: var(--serif);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 0.5rem 0;
}

.page-description {
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0.75rem 0 0 0;
}

.page-meta {
  margin-top: 1rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.page-meta time { letter-spacing: 0.02em; }
.page-meta .meta-separator { color: var(--border); }
.page-meta .tag {
  background: rgba(27, 42, 74, 0.07);
  color: var(--accent);
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  font-size: 0.72rem;
}

/* Article content */
.page-content { max-width: 680px; }

.page-content h2 {
  font-family: var(--sans);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);
  margin: 2.5rem 0 0.75rem 0;
}

.page-content h3 {
  font-family: var(--sans);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
  margin: 2rem 0 0.5rem 0;
}

.page-content p {
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--text);
  margin-bottom: 1.2em;
}

.page-content strong { font-weight: 600; color: var(--text); }

.page-content a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}
.page-content a:hover { color: var(--accent-hover); }

.page-content ul, .page-content ol {
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 0 0 1.2em 1.5em;
  padding: 0;
}
.page-content li { margin-bottom: 0.4em; }

.page-content blockquote {
  border-left: 3px solid var(--accent);
  margin: 1.5em 0;
  padding: 0.5em 0 0.5em 1.25em;
  color: var(--text-secondary);
  font-style: italic;
}
.page-content blockquote p { margin-bottom: 0.5em; }

.page-content code {
  font-family: var(--mono);
  font-size: 0.88em;
  background: rgba(27, 42, 74, 0.05);
  padding: 0.15em 0.35em;
  border-radius: 3px;
}

.page-content pre {
  background: #1A1A1A;
  color: #E8E4DF;
  padding: 1.25rem 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5em 0;
  font-size: 0.88rem;
  line-height: 1.6;
}
.page-content pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: inherit;
}

.page-content hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2.5rem 0;
}

.page-content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1.5em 0;
}

/* Post navigation (prev/next) */
.post-nav {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.post-nav-link {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.2s;
  max-width: 45%;
}
.post-nav-link:hover { color: var(--accent); }
.post-nav-link.next { text-align: right; margin-left: auto; }

/* List pages (/projects/, /posts/) */
.list-page {
  max-width: 780px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.list-page .page-header {
  margin-bottom: 2rem;
  padding-bottom: 0;
  border-bottom: none;
}
.list-page .page-title { font-size: 1.8rem; }

.list-page .section { padding: 0; }
.list-page .projects-section { margin-bottom: 0; }
.list-page .writing-section { margin-bottom: 0; }

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 600px) {
  .site-nav { padding: 1.5rem 1.25rem 0; flex-wrap: wrap; gap: 0.75rem; }
  .site-nav .nav-right { gap: 1rem; }
  .site-nav .nav-links { gap: 1.25rem; }
  .hero { padding: 3rem 1.25rem 2.5rem; }
  .hero h1 { font-size: 1.75rem; }
  .hero .hero-sub { font-size: 1rem; }
  .hero .hero-meta { flex-wrap: wrap; gap: 0.75rem; }
  .separator-dot, .separator-pipe { display: none !important; }
  .section { padding: 0 1.25rem; }
  .project-card { padding: 1.25rem 1.5rem; }
  .project-card .card-top { flex-direction: column; gap: 0.5rem; }
  .project-card .card-tag { margin-left: 0; align-self: flex-start; }
  .post-item { flex-direction: column; gap: 0.25rem; }
  .post-date { margin-left: 0; }
  .site-footer { flex-direction: column; gap: 1rem; align-items: flex-start; }
  .theme-toggle { padding: 0.25rem 0.5rem; }
  .toggle-label { font-size: 0.62rem; }
  .single-page { padding: 2rem 1.25rem 3rem; }
  .page-title { font-size: 1.6rem; }
  .list-page { padding: 2rem 1.25rem 3rem; }
  .list-page .page-title { font-size: 1.5rem; }
  .post-nav { flex-direction: column; gap: 1rem; }
  .post-nav-link { max-width: 100%; }
  .post-nav-link.next { text-align: left; margin-left: 0; }
}

/* ============================================
   SMOOTH TRANSITIONS
   ============================================ */
.site-nav, .hero, .section, .section-header, .project-card, .post-item,
.experience-strip, .site-footer, .theme-toggle, .toggle-track {
  transition: background 0.5s ease, color 0.4s ease, border-color 0.4s ease,
              box-shadow 0.4s ease, order 0s;
}
```

---

## AGENT 2: TEMPLATES

### layouts/partials/icons/github.html

```html
<svg class="icon-fill" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
```

### layouts/partials/icons/linkedin.html

```html
<svg class="icon-fill" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
```

### layouts/partials/icons/email.html

```html
<svg class="icon-stroke" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>
```

### layouts/partials/analytics.html

```html
{{ with .Site.Params.cloudflareAnalyticsToken }}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "{{ . }}"}'></script>
{{ end }}
```

### layouts/partials/nav.html

```html
<nav class="site-nav">
  <a href="/" class="site-name">{{ .Site.Params.name | default .Site.Title }}</a>
  <div class="nav-right">
    <ul class="nav-links">
      {{ range .Site.Menus.main }}
      <li><a href="{{ .URL }}"{{ if $.IsMenuCurrent "main" . }} class="active"{{ end }}>{{ .Name | lower }}</a></li>
      {{ end }}
    </ul>
    <div class="theme-toggle" onclick="toggleTheme()" role="button" tabindex="0" aria-label="Toggle theme">
      <span class="toggle-label toggle-label-left">editorial</span>
      <div class="toggle-track">
        <div class="toggle-thumb"></div>
      </div>
      <span class="toggle-label toggle-label-right">terminal</span>
    </div>
  </div>
</nav>
```

### layouts/partials/footer.html

```html
<footer class="site-footer">
  <span class="footer-left">
    Jonathan Oh · San Francisco
    <span class="footer-build"> · build: a1b2c3d · main</span>
    <span class="footer-status"> Online</span>
  </span>
  <div class="footer-links">
    <a href="https://github.com/{{ .Site.Params.github }}">{{ partial "icons/github.html" . }}GitHub</a>
    <a href="https://www.linkedin.com/in/{{ .Site.Params.linkedin }}">{{ partial "icons/linkedin.html" . }}LinkedIn</a>
    <a href="{{ "about/" | relURL }}">About</a>
  </div>
</footer>
```

### layouts/index.html (HOMEPAGE — standalone, no baseof)

```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode | default "en-us" }}" data-theme="editorial">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ .Site.Title }}</title>
  <meta property="og:title" content="{{ .Site.Title }}" />
  <meta property="og:description" content="{{ .Site.Params.description }}" />
  <meta property="og:url" content="{{ .Site.BaseURL }}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="{{ .Site.Title }}" />
  {{ with .Site.Params.ogimage }}<meta property="og:image" content="{{ . | absURL }}" />{{ end }}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
  {{ partial "analytics.html" . }}
</head>
<body>

<canvas id="matrix-canvas"></canvas>

<div class="page-wrapper">

{{ partial "nav.html" . }}

<div class="main-content">

  <section class="hero">
    <div class="terminal-badge">
      <span class="terminal-prompt">$</span>
      <span class="typing-text">hello, world</span>
    </div>
    <h1>Builder by default.<br>Consultant by training.<br><span class="tagline-accent">Using AI as a reason to redesign systems, not just automate them.</span></h1>
    <p class="hero-sub">I build AI-powered products that solve real operational problems — from enterprise GenAI platforms at McKinsey to open-source developer tools. Based in San Francisco.</p>
    <div class="hero-meta">
      <a href="https://github.com/{{ .Site.Params.github }}">{{ partial "icons/github.html" . }}GitHub</a>
      <span class="separator-dot">·</span><span class="separator-pipe">|</span>
      <a href="https://www.linkedin.com/in/{{ .Site.Params.linkedin }}">{{ partial "icons/linkedin.html" . }}LinkedIn</a>
      <span class="separator-dot">·</span><span class="separator-pipe">|</span>
      <a href="mailto:{{ .Site.Params.email }}">{{ partial "icons/email.html" . }}Email</a>
    </div>
  </section>

  <section class="section experience-strip">
    <div class="section-header">
      <h2>Background</h2>
    </div>
    <p class="strip-content">
      <strong>Engagement Manager at McKinsey Technology</strong>, where I've led GenAI implementations, enterprise transformations, and stood up new governing bodies across industries from steel manufacturing to federal agencies. Before that, four years at the <strong>Massachusetts Department of Revenue</strong> building data infrastructure for $30B tax revenue operations. Two degrees from <strong>Bentley University</strong>, both earned while working full-time.
    </p>
    <a href="/about/" class="resume-link">Full story and resume</a>
  </section>

  <section class="section projects-section">
    <div class="section-header">
      <h2>Projects</h2>
      <a href="/projects/">View all →</a>
    </div>
    {{ range .Site.Data.projects }}
    <a href="/projects/{{ .slug }}/" class="project-card">
      <div class="card-top">
        <h3>{{ .title }}</h3>
        <span class="card-tag">{{ .tag }}</span>
      </div>
      <p class="card-philosophy">"{{ .philosophy }}"</p>
      <p class="card-description">{{ .description }}</p>
      <div class="card-bottom">
        {{ range .meta }}
        <span>{{ . }}</span>
        {{ end }}
      </div>
    </a>
    {{ end }}
  </section>

  <section class="section writing-section">
    <div class="section-header">
      <h2>Writing</h2>
      <a href="/posts/">All posts →</a>
    </div>
    {{ range first 5 (where .Site.RegularPages "Section" "posts") }}
    <a href="{{ .Permalink }}" class="post-item">
      <span class="post-title">{{ .Title }}</span>
      <span class="post-date">{{ .Date.Format "Jan 2006" }}</span>
    </a>
    {{ end }}
  </section>

</div><!-- .main-content -->

{{ partial "footer.html" . }}

</div><!-- .page-wrapper -->

<script src="{{ "js/theme.js" | relURL }}"></script>

</body>
</html>
```

### layouts/_default/baseof.html (wraps ALL non-homepage pages)

```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode | default "en-us" }}" data-theme="editorial">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ if not .IsHome }}{{ .Title }} · {{ end }}{{ .Site.Title }}</title>
  <meta property="og:title" content="{{ .Title }}" />
  <meta property="og:description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}" />
  <meta property="og:url" content="{{ .Permalink }}" />
  <meta property="og:type" content="{{ if eq .Section "posts" }}article{{ else }}website{{ end }}" />
  <meta property="og:site_name" content="{{ .Site.Title }}" />
  {{ with .Params.image }}<meta property="og:image" content="{{ . | absURL }}" />
  {{ else }}{{ with .Site.Params.ogimage }}<meta property="og:image" content="{{ . | absURL }}" />{{ end }}{{ end }}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
  {{ partial "analytics.html" . }}
</head>
<body>

<canvas id="matrix-canvas"></canvas>

<div class="page-wrapper">

{{ partial "nav.html" . }}

<main>
  {{ block "main" . }}{{ end }}
</main>

{{ partial "footer.html" . }}

</div><!-- .page-wrapper -->

<script src="{{ "js/theme.js" | relURL }}"></script>

</body>
</html>
```

### layouts/_default/single.html

```html
{{ define "main" }}
<article class="single-page">
  <header class="page-header">
    <h1 class="page-title">{{ .Title }}</h1>
    {{ with .Description }}
    <p class="page-description">{{ . }}</p>
    {{ end }}
    {{ if eq .Section "posts" }}
    <div class="page-meta">
      <time>{{ .Date.Format "January 2, 2006" }}</time>
      {{ with .Params.tags }}
      <span class="meta-separator">·</span>
      {{ range . }}<span class="tag">{{ . }}</span>{{ end }}
      {{ end }}
    </div>
    {{ end }}
  </header>
  <div class="page-content">
    {{ .Content }}
  </div>
  {{ if eq .Section "posts" }}
  <nav class="post-nav">
    {{ with .PrevInSection }}
    <a href="{{ .Permalink }}" class="post-nav-link prev">← {{ .Title }}</a>
    {{ end }}
    {{ with .NextInSection }}
    <a href="{{ .Permalink }}" class="post-nav-link next">{{ .Title }} →</a>
    {{ end }}
  </nav>
  {{ end }}
</article>
{{ end }}
```

### layouts/_default/list.html

```html
{{ define "main" }}
<section class="list-page">
  <header class="page-header">
    <h1 class="page-title">{{ .Title }}</h1>
    {{ with .Description }}
    <p class="page-description">{{ . }}</p>
    {{ end }}
  </header>

  {{ if eq .Section "posts" }}
  <div class="section writing-section">
    {{ range .Pages }}
    <a href="{{ .Permalink }}" class="post-item">
      <span class="post-title">{{ .Title }}</span>
      <span class="post-date">{{ .Date.Format "Jan 2006" }}</span>
    </a>
    {{ end }}
  </div>

  {{ else if eq .Section "projects" }}
  <div class="section projects-section">
    {{ range .Pages.ByDate.Reverse }}
    <a href="{{ .Permalink }}" class="project-card">
      <div class="card-top">
        <h3>{{ .Title }}</h3>
        {{ with .Params.tag }}
        <span class="card-tag">{{ . }}</span>
        {{ end }}
      </div>
      {{ with .Params.philosophy }}
      <p class="card-philosophy">"{{ . }}"</p>
      {{ end }}
      {{ with .Description }}
      <p class="card-description">{{ . }}</p>
      {{ end }}
      {{ with .Params.meta }}
      <div class="card-bottom">
        {{ range . }}
        <span>{{ . }}</span>
        {{ end }}
      </div>
      {{ end }}
    </a>
    {{ end }}
  </div>

  {{ else }}
  <div class="section">
    {{ range .Pages }}
    <a href="{{ .Permalink }}" class="post-item">
      <span class="post-title">{{ .Title }}</span>
      <span class="post-date">{{ .Date.Format "Jan 2006" }}</span>
    </a>
    {{ end }}
  </div>
  {{ end }}
</section>
{{ end }}
```

---

## AGENT 3: CONTENT & DATA

### hugo.toml (MERGE these changes into the existing file — do not lose existing settings like [outputs] or [markup])

```toml
baseURL = "https://johnnyoh.xyz/"
languageCode = "en-us"
title = "Jonathan Oh"
theme = "paper"

[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML", "RSS"]

[params]
  color = "linen"
  github = "ohjonathan"
  linkedin = "ohjohnny"
  email = "jonathanoh1994@gmail.com"
  name = "Jonathan Oh"
  description = "Builder by default. Consultant by training. Using AI as a reason to redesign systems."
  ogimage = "/og-default.png"

[menu]
  [[menu.main]]
    identifier = "about"
    name = "About"
    url = "/about/"
    weight = 10
  [[menu.main]]
    identifier = "projects"
    name = "Projects"
    url = "/projects/"
    weight = 20
  [[menu.main]]
    identifier = "writing"
    name = "Writing"
    url = "/posts/"
    weight = 30

[markup]
  [markup.highlight]
    style = "github"
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

### data/projects.yaml

```yaml
- title: "Enterprise GenAI Knowledge Platform"
  slug: "genai-platform"
  tag: "McKinsey · 2025"
  philosophy: "Strategic outputs shouldn't die the moment the engagement ends."
  description: "Built and deployed a GenAI-powered knowledge system across 3 client sites, turning static consulting deliverables into living, queryable intelligence. Sole business lead; scaled to 40–50 person cross-region team."
  meta:
    - "Founding EM"
    - "3 deployments"
    - "→ Dedicated team of 5+ PMs"

- title: "Project Ontos"
  slug: "ontos"
  tag: "Open Source"
  philosophy: "AI context should be readable, not retrievable. Glass box, not black box."
  description: "A local-first AI context management system: a repo-native knowledge graph in markdown + YAML, designed for inspectable, repeatable workflows across AI tools. Solo-built and published on PyPI."
  meta:
    - "Python CLI"
    - "PyPI: ontos"
    - "500+ commits"
    - "Apache 2.0"

- title: "Folio"
  slug: "folio"
  tag: "Personal"
  philosophy: "Billions of dollars of consulting output dies the moment the engagement ends."
  description: "CLI tool that transforms PowerPoint and PDF deliverables into a searchable, AI-native knowledge library. Converts decks into markdown with LLM analysis and version tracking."
  meta:
    - "Python · Click CLI"
    - "Claude API"
    - "Obsidian-compatible"
```

### content/_index.md

```yaml
---
title: "Jonathan Oh"
description: "Builder by default. Consultant by training."
---
```

### content/about.md

```yaml
---
title: "About"
description: "Builder by default. Consultant by training."
---

More coming soon.
```

### content/posts/_index.md

```yaml
---
title: "Writing"
description: "Thinking out loud about AI, building, and institutions."
---
```

### content/projects/_index.md

```yaml
---
title: "Projects"
description: "Things I've built."
---
```

### content/projects/genai-platform.md

```yaml
---
title: "Enterprise GenAI Knowledge Platform"
date: 2025-01-15
description: "Built and deployed a GenAI-powered knowledge system across 3 client sites."
tag: "McKinsey · 2025"
philosophy: "Strategic outputs shouldn't die the moment the engagement ends."
meta:
  - "Founding EM"
  - "3 deployments"
  - "→ Dedicated team of 5+ PMs"
tags: ["ai", "genai", "product", "mckinsey"]
draft: false
---

As the founding Engagement Manager, I led the build and deployment of a GenAI-powered knowledge platform across three client sites. The system transformed static consulting deliverables into living, queryable intelligence — giving client teams the ability to surface insights from thousands of pages of prior work in seconds.

## The Problem

Every consulting engagement produces hundreds of slides, memos, and analyses. The moment the team rolls off, that knowledge becomes inaccessible. Buried in SharePoint folders, forgotten in email threads, or locked in the heads of people who've moved on.

## What We Built

A retrieval-augmented generation (RAG) system purpose-built for consulting knowledge. Documents are ingested, chunked, embedded, and made queryable through a conversational interface. But the key insight wasn't the technology — it was the information architecture.

We designed the system around how consultants actually think: by workstream, by hypothesis, by client context. Not by file name or date modified.

## Scale

What started as a single-site pilot grew to three deployments across industries. The team scaled from a handful of builders to a 40–50 person cross-regional operation. I transitioned the product from founder-led to a dedicated team of 5+ product managers — the clearest signal that the thing had legs.

## Confidentiality Note

This project was built within McKinsey & Company. Specific client names, proprietary architectures, and internal tooling details are confidential. What's shared here reflects the publicly describable scope of the work.
```

### content/projects/folio.md

```yaml
---
title: "Folio"
date: 2025-06-01
description: "CLI tool that transforms consulting deliverables into a searchable, AI-native knowledge library."
tag: "Personal"
philosophy: "Billions of dollars of consulting output dies the moment the engagement ends."
meta:
  - "Python · Click CLI"
  - "Claude API"
  - "Obsidian-compatible"
tags: ["ai", "consulting", "python", "cli"]
draft: false
---

Folio is a command-line tool that converts PowerPoint decks and PDF documents into a searchable, AI-native knowledge library.

## The Problem

Consulting firms produce billions of dollars worth of strategic analysis every year. Almost all of it dies the moment the engagement ends. Decks get filed away. Insights get locked in formats that resist search, synthesis, and reuse.

## What Folio Does

Point Folio at a folder of `.pptx` and `.pdf` files. It extracts content, runs each through Claude for structured analysis, and outputs clean Markdown files with metadata, key findings, and cross-references. The output is Obsidian-compatible, so you get a linked knowledge graph for free.

## Stack

- **Python** with **Click** for the CLI framework
- **Claude API** for document analysis and summarization
- **Markdown + YAML** output format
- **Obsidian-compatible** linking and tagging
```

### UPDATE content/projects/ontos.md frontmatter

Update the EXISTING ontos.md file. Keep the body content, but ensure the frontmatter includes these fields:

```yaml
---
title: "Project Ontos"
date: 2025-01-01
description: "A local-first AI context management system: a repo-native knowledge graph in markdown + YAML, designed for inspectable, repeatable workflows across AI tools."
tag: "Open Source"
philosophy: "AI context should be readable, not retrievable. Glass box, not black box."
meta:
  - "Python CLI"
  - "PyPI: ontos"
  - "500+ commits"
  - "Apache 2.0"
tags: ["ai", "context-management", "python", "cli"]
draft: false
---
```

---

## AGENT 4: JAVASCRIPT — static/js/theme.js

Create this file with the EXACT content below:

```javascript
// ============================================
// THEME PERSISTENCE (runs immediately)
// ============================================
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

// ============================================
// MATRIX RAIN
// ============================================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let columns, drops;
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
const fontSize = 14;

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
  for (let i = 0; i < drops.length; i++) {
    drops[i] = Math.floor(Math.random() * -50);
  }
}

function drawMatrix() {
  if (document.documentElement.getAttribute('data-theme') !== 'terminal') {
    requestAnimationFrame(drawMatrix);
    return;
  }

  ctx.fillStyle = 'rgba(10, 15, 13, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    if (drops[i] < 0) {
      drops[i]++;
      continue;
    }
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Brighter head character occasionally
    if (Math.random() > 0.95) {
      ctx.fillStyle = 'rgba(60, 236, 106, 0.3)';
    } else {
      ctx.fillStyle = 'rgba(60, 236, 106, 0.1)';
    }

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.985) {
      drops[i] = Math.floor(Math.random() * -20);
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

initMatrix();
drawMatrix();
window.addEventListener('resize', initMatrix);

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'editorial' ? 'terminal' : 'editorial';
  const wrapper = document.querySelector('.page-wrapper');

  if (next === 'terminal') {
    // CRT turn-on effect
    wrapper.classList.remove('crt-off');
    wrapper.classList.add('crt-on');
    setTimeout(() => wrapper.classList.remove('crt-on'), 600);
  } else {
    // CRT turn-off effect
    wrapper.classList.add('crt-off');
    setTimeout(() => {
      wrapper.classList.remove('crt-off');
    }, 350);
  }

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Clear matrix canvas when switching to editorial
  if (next === 'editorial') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Keyboard support for toggle
document.querySelector('.theme-toggle').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
});
```

---

## VERIFICATION CHECKLIST

After all agents complete, run `hugo server` and verify:

### Homepage (/)
- [ ] Custom layout renders (NOT Paper's blog feed)
- [ ] Theme toggle works — switches between Editorial and Terminal
- [ ] Editorial: Background section appears ABOVE Projects section
- [ ] Terminal: Projects section appears ABOVE Background section
- [ ] Terminal: Matrix rain canvas visible in background
- [ ] Terminal: "$ hello, world" typing animation plays
- [ ] Terminal: CRT flicker on theme switch
- [ ] Terminal: Green custom cursor
- [ ] Terminal: Dashed borders, green accent, dark background
- [ ] Terminal: Scanlines and vignette overlay
- [ ] Editorial: Warm linen background, navy accent, solid borders
- [ ] Project cards display from data/projects.yaml
- [ ] Writing section shows posts from content/posts/
- [ ] Social links point to correct URLs (github.com/ohjonathan, linkedin.com/in/ohjohnny)
- [ ] Theme persists across page navigation (localStorage)
- [ ] OG meta tags in page source
- [ ] Mobile responsive (test 375px width)

### Inner Pages
- [ ] /about/ uses baseof.html (custom nav, footer, design system)
- [ ] /projects/ shows project cards from frontmatter
- [ ] /projects/ontos/ renders article with custom styling
- [ ] /projects/genai-platform/ renders article
- [ ] /projects/folio/ renders article
- [ ] /posts/ shows post list
- [ ] Theme toggle works on all inner pages
- [ ] Matrix rain appears on inner pages in terminal mode
- [ ] No Paper theme elements bleeding through anywhere

### Cross-Cutting
- [ ] Cloudflare Web Analytics script present (if token configured)
- [ ] No 404 errors in console
- [ ] CSS loads correctly
- [ ] JS loads correctly
- [ ] Fonts load (Source Serif 4, DM Sans, JetBrains Mono)

---

## EXECUTION ORDER

1. Create `static/css/custom.css` (Agent 1)
2. Create `static/js/theme.js` (Agent 4)
3. Create all SVG icon partials in `layouts/partials/icons/` (Agent 2)
4. Create `layouts/partials/analytics.html` (Agent 2)
5. Create `layouts/partials/nav.html` (Agent 2)
6. Create `layouts/partials/footer.html` (Agent 2)
7. Create `layouts/index.html` (Agent 2)
8. Create `layouts/_default/baseof.html` (Agent 2)
9. Create `layouts/_default/single.html` (Agent 2)
10. Create `layouts/_default/list.html` (Agent 2)
11. Create `data/projects.yaml` (Agent 3)
12. Update `hugo.toml` (Agent 3 — MERGE, don't replace)
13. Create/update all content files (Agent 3)
14. Run `hugo server` — verify every item in checklist
15. Fix any issues
16. Commit all changes: `git add . && git commit -m "Complete site redesign: dual-theme editorial/terminal with Matrix rain"`
17. Push: `git push origin main`

---

## CRITICAL REMINDERS

- **DO NOT modify anything inside `themes/paper/`**. All customization goes in `layouts/` and `static/`.
- **Hugo template lookup**: `layouts/` overrides `themes/paper/layouts/`. That's how we replace Paper's templates without touching the theme.
- **The homepage (`layouts/index.html`) is STANDALONE** — it does NOT use `baseof.html`. It has its own complete HTML document structure.
- **All other pages use `baseof.html`** which provides the nav, footer, matrix canvas, and theme.js.
- **CSS font import is via `@import` at the top of custom.css**, not via `<link>` tags (except preconnect hint in templates).
- **The `data-theme="editorial"` attribute on `<html>`** is what drives the entire theme system. Every color, font, border, and spacing responds to this single attribute via CSS custom properties.
- **localStorage key is `theme`** with values `"editorial"` or `"terminal"`.
