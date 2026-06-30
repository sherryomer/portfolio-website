# Visual Redesign — "Instrument / Model-Card" Direction

Date: 2026-06-30
Scope: Visual + structural redesign only. **No content/data changes** — every job
description, project blurb, link, skill name, course, and contact detail stays
byte-for-byte identical. Dark theme, cyan accent palette, and the `ScrollPath` SVG
are preserved.

## North star

The site should read like a **refined ML system / model card / monitoring panel** —
authored by someone fluent in AI/ML — not a generic AI-generated portfolio template.

**Anti-goals (hard guardrails):** no green-on-black hacker terminal, no fake blinking
cursors everywhere, no `$ whoami` gimmicks, no uniform rounded-card-with-shadow grid,
no "0X / Section" numbering, no pill-cluster skill badges, no centered-everything rhythm.

## Type system (zero new runtime deps)

Three deliberate typefaces — the "authored" signal:

| Role | Font | Source |
|------|------|--------|
| Display headings, hero name | **Space Grotesk** | `next/font/google` (self-hosted, no network at runtime) |
| Body / descriptions | **Inter** (existing) | `next/font/google` |
| Data, labels, indices, chrome, tags | **Geist Mono** | `next/font/local` (file already in `src/app/fonts/`) |

Exposed as CSS vars `--font-display`, `--font-inter`, `--font-mono`; wired into Tailwind
`fontFamily` as `display` / `sans` / `mono`. A small set of mono "chrome" utility classes
(uppercase, tracked, dim-cyan) for labels.

> Fallback if Space Grotesk feels off: Geist sans (`GeistVF.woff`, already local).

## Wayfinding — replaces both the "0X /" markers and the dot rail

### 1. `SystemIndex` (new) — replaces `TimelineNav`
Right-side fixed rail (desktop ≥md). Monospace. Reuses the existing IntersectionObserver
scroll-spy logic from `TimelineNav`.

```
◆ shehryar.sys
00 · index
01 · experience
02 · projects      ◀ active   (cyan, highlighted)
03 · skills
04 · education
05 · contact
─────────────
uptime · 2y+
loc    · PK
```

States: active (cyan, marker), passed (dim cyan), upcoming (slate). Click scrolls.

### 2. Mobile status strip
On `<md`, `SystemIndex` renders instead as a slim strip directly under the nav:
`02 · projects` on the left, a hairline scroll-progress bar across the bottom edge.
Distinct mobile layout, not a squeezed rail.

### 3. `SectionHeader` (new shared component) — replaces inline "0X / Title"
Model-card header block per section:
```
§ experience.log                              [ 2 entries ]
Where I've Worked
<optional sub-line>
```
- mono field-tag line with a per-section metaphor + a mono meta chip on the right
- big Space Grotesk display heading (keeps existing accent-word color span)
Per-section tags: `experience.log`, `projects.registry`, `skills.map`,
`education.rec`, `contact.io`, hero uses its own.

## Hero — asymmetric console readout

Replaces: centered 3-line name + tagline + 3 stat chips + 2 pill CTAs.

- **Left-weighted** composition (content hangs left; `ScrollPath` continues threading the
  left gutter as today — its first node reads as the hero's focal SVG anchor).
- Mono eyebrow: `> AI/ML ENGINEER · DATA SCIENTIST · PRODUCT ANALYST`
- Name in large Space Grotesk display (keep the 3 words, retire the even 3-line stack —
  art-directed scale: surname largest, given names as a tighter mono-tagged kicker).
- Tagline (unchanged copy) in body.
- Stats → **status block** as mono key···value rows (not 3 chips):
  ```
  experience ···· 2+ years
  location   ···· Pakistan
  focus      ···· AI · Data · Fintech
  ```
- CTAs → **mono function-call links** (restyled, not pills):
  `→ run_work()` and `open_contact()` with bracket/underline treatment.
- Social links: mono row (github · linkedin · email).
- Keep the scroll cue.
- **Mobile:** stacked, full-width status block, same readout aesthetic.

## Experience — deployment log

Breaks the uniform two-column card. Each role is a **log entry**:
- mono header line: `[Feb 2026 → present]  simpaisa / ai-product-analyst`
- editorial body paragraph (unchanged copy)
- achievements as tree-prefixed lines (`├` / `└`) led by a mono marker, not bullet pills
- tech woven as a single inline mono `stack:` line, NOT a pill row
- **Current role** distinguished by a cyan left rule + `● live` mono tag; rendered larger /
  expanded. Second role more compact. **Deliberate asymmetry between the two entries.**
- Mobile: single column, log aesthetic preserved.

## Projects — varied-span registry

Not 6 identical cards.
- A **registry grid** with varied column/row spans so no two cells match: featured (JOBOT)
  wide hero cell; the rest alternate wide/standard spans.
- Each cell framed as a model entry: mono `id` + name (Space Grotesk), mono category tag,
  description, tech as an inline mono `stack:` line (not pill cluster), live/code as mono
  actions (`live ↗`, `code ↗`).
- Private flag as a mono `· private` marker, color accents kept (per-project color retained).
- Mobile: single column, but featured stays visually weightier (taller / accent rule) so the
  rhythm is varied, not uniform.

## Skills — usage map / typographic matrix (no invented data)

Replaces grouped pill clusters. Two real-data-only devices:
- The 6 existing groups become a **typographic table/matrix**: mono category label (left) +
  the group's skills as a justified, rule-separated text manifest (right). Distinctly not pills.
- The existing **"Daily Stack"** list (already real, author-labeled data) becomes a horizontal
  **marquee ticker** (CSS-animation, cheap; respects `prefers-reduced-motion`).
- No proficiency/usage numbers are invented — only the data already in the file is used.
- Mobile: matrix collapses to stacked category rows; marquee still scrolls.

## Education — record entry

Single card → editorial **record**: mono `education.rec`, degree in Space Grotesk,
institution + dates in mono. Coursework → a mono **course manifest** (rule-separated index /
middot list), not pills.

## Contact — io

Keep the Formspree form and all logic. Restyle: mono field labels, cleaner inputs, contact
links as mono key···value rows, header `contact.io`, asymmetric left/right balance, mono footer.

## Navigation (top bar)

Restyle to match: brand as `◆ shehryar` in mono with cyan mark; nav items mono lowercase;
keep scroll-blur and the mobile hamburger menu. Hosts the mobile status strip.

## Responsiveness summary

- **Desktop:** right system-index rail, left ScrollPath SVG, asymmetric content, multi-span grids.
- **Mobile:** top status strip + progress bar, single-column with preserved editorial rhythm,
  full-width status blocks, marquee intact, tables/matrix collapse to stacked rows.
  Distinct layouts — not a squeezed desktop.

## Performance

- All fonts self-hosted (`next/font` local + google) — no runtime network fetch, no new deps.
- Marquee = pure CSS transform animation. Existing `framer-motion` reused; nothing heavy added.
- `ScrollPath` untouched (keeps its GPU-layer optimizations).

## Files

- New: `SystemIndex` (replaces `timeline-nav.tsx`), `SectionHeader` shared component,
  `next/font/local` setup for Geist Mono, Space Grotesk via `next/font/google`.
- Edit: `layout.tsx`, `tailwind.config.ts`, `globals.css`, `navigation.tsx`, all six section
  components, `page.tsx` (swap TimelineNav → SystemIndex).
- Unchanged: `scroll-path.tsx`, all content/data arrays, UI primitives.

## Deploy

After implementation + local build passes: commit + push to `origin/main`
(`sherryomer/portfolio-website`), deploy to Vercel production, alias to
`shahzadashehryar.vercel.app`.
