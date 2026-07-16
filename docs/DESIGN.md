# Design system

The visual language of the NREL Lab site. It deliberately mirrors the **REAL Lab** house
brand rather than a generic template.

## Concept

*Molecules to devices, light to energy.* The lab makes materials that emit and convert light —
so the one expressive element is a **perovskite emission spectrum** (violet → red). Everything
else is a calm, academic navy/gold/cream system.

## Palette (tokens in `styles.css :root`)

| Token | Hex | Use |
|-------|-----|-----|
| `--navy` | `#1a2332` | Hero/header/footer bands, headings, primary text |
| `--navy-light` | `#1e2a3d` | Band gradients |
| `--navy-dark` | `#162030` | Band gradients |
| `--gold` | `#82603a` | Accents, links, eyebrows, top rules, focus on light |
| `--cream` | `#faf4ec` | Page background, text on navy, focus on dark |
| `--cream-ring` | `#eadfcb` | Borders, dividers |
| `--paper` | `#ffffff` | Cards |
| `--ink` / `--ink-mid` / `--ink-dim` | navy / `#565f70` / `#8b91a0` | Body / secondary / tertiary text |

**Rule:** use tokens, never raw hex in components. The only intentional off-palette colors are
the citation-chart bars (the emission spectrum).

## Typography

- **Pretendard** — headings and body (matches the parent repo; Korean-friendly).
- **Space Mono** — data, metric labels, eyebrows, publication venues, chart labels. It reads
  like an instrument readout, which suits the scientific content.
- Scale is fluid via `clamp()`; headings are 700–800 weight with tight `letter-spacing`.

## The signature — citation-emission spectrum

On the home hero: annual citations (2015–2026) as vertical bars, colored across the spectrum
cool→warm, with a soft glow, sitting on the navy hero. The current partial year is hatched and
dimmed. This is the memorable element; keep it and keep it honest (label the partial year).

## Layout

- Max content width `--maxw` = 1160px, fluid side padding `--pad`.
- Interior pages open with a compact navy `.pagehead` band (kicker + title + optional
  metrics). The home page uses the full `.hero` with the chart.
- Cards (`.card`, `.mcard`, `.newsprev-item`) are white with a cream-ring border and a 3px
  gold top rule; they lift and shadow on hover.

## Motion

- Hero metrics count up; chart bars rise in a staggered sweep; content blocks fade/slide in on
  scroll (`IntersectionObserver`). All subtle, all disabled under `prefers-reduced-motion`.

## Accessibility

- Visible focus everywhere: **gold** outline on light surfaces, **cream** on `.on-navy`.
- Color contrast targets WCAG AA for body text (navy on cream, cream on navy).
- Images have descriptive `alt`; the chart has a caption; the mobile menu button has
  `aria-label` + `aria-expanded`.
- Responsive from ~360px up; nav collapses to a hamburger below 940px.

## Responsive breakpoints

| Width | Change |
|-------|--------|
| ≤ 940px | Hamburger menu; hero/PI/footer columns stack; cards → 2-up; nav-cta hidden |
| ≤ 820px | Footer → 2 columns; news preview → 1 column |
| ≤ 620px | Cards + members → 1 column; publication citation bars hidden |
| ≤ 560px | Footer → 1 column |

## Don't

- Don't go dark (rejected).
- Don't add a second display typeface.
- Don't hardcode brand hex in components.
- Don't let the spectrum chart imply a fake full-year 2026 — keep the partial-year hatch.
