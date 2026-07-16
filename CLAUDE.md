# NREL Lab website — agent & contributor guide

A multi-page academic website for **Prof. Young-Hoon Kim** (Next-generation Renewable
Energy & electronics Laboratory / **NREL Lab**, Department of Energy Engineering, Hanyang
University). This file is the entry point for anyone — human or AI agent — editing the site.

> **Read order:** this file → `docs/index.md` (doc catalog) → the specific doc for your task
> (`docs/ARCHITECTURE.md`, `docs/CONTENT-GUIDE.md`, `docs/DESIGN.md`, `docs/DATA-SOURCES.md`,
> `docs/DEPLOY.md`). Planned work lives in `ROADMAP.md`.

---

## What this is

- A **static, hand-built** site. No framework, no build step, no `node_modules`.
- Plain **HTML + CSS + JS**. Fonts (Pretendard, Space Mono) load from a CDN.
- 6 pages sharing one nav + footer + stylesheet + script.

## Run

```bash
cd YH
python -m http.server 4600      # then open http://localhost:4600
```

Opening `index.html` via `file://` mostly works, but use a local server so fonts and the
`docs/` markdown viewer behave.

## Structure

```
index.html         Home (hero + citation chart + intro + research/news previews)
team.html          Team — PI bio, current members, alumni, join us (4 CSS-only tabs)
research.html      Research (6 directions, each a detailed section)
publications.html  Publications (most-cited highlights + list by year)
news.html          News (press highlights)
contact.html       Contact (address, email, phone, join the lab)
assets/
  styles.css       All styling — brand tokens, components, responsive, a11y, team tabs
  main.js          Mobile menu, chart animation, count-up, scroll reveal
  img/             prof-kim.png (PI portrait), nrel-logo.png (lab logo)
  img/members/     15 member/collaborator portraits (postdoc, PhD, MS, collaborators)
docs/              Documentation (this guide's deeper references) + docs/index.html hub
```

---

## Rules (do not break these)

1. **Brand tokens, never raw hex.** Colors come from CSS variables in `assets/styles.css`
   (`--navy #1a2332`, `--gold #82603a`, `--cream #faf4ec`, `--cream-ring #eadfcb`). These
   mirror the parent REAL Lab repo. The one exception is the citation-chart bars, which use a
   perovskite emission spectrum (violet → red) on purpose.
2. **Light theme.** The site is light (cream paper) with navy hero/header/footer bands. Do
   **not** turn it dark — an earlier dark draft was explicitly rejected.
3. **Fonts:** Pretendard for text, Space Mono for data/labels/eyebrows. Do not introduce a
   third display face.
4. **Shared nav + footer are duplicated in every page.** If you change a nav link, the
   footer, or the contact block, update **all 6 HTML files**. Set `class="active"
   aria-current="page"` on the current page's nav link.
5. **Data must be real and sourced.** Every number (citations, h-index, publication counts,
   years) comes from a public source captured **July 2026** — see `docs/DATA-SOURCES.md`.
   Never invent a citation count, a paper, a member, or a date. When you refresh figures,
   update the "Source: Google Scholar, July 2026" captions too.
6. **Progressive enhancement.** The page must be fully readable with JS disabled. JS only
   *adds* the mobile menu, chart animation, count-up, and scroll reveals. `team.html`'s four
   tabs (Principal Investigator / Current Members / Alumni / Join Us) are CSS-only (hidden
   radio inputs + labels) — they work with JS off. Keep it that way.
7. **Accessibility floor.** Keep visible focus rings (gold on light, cream on `.on-navy`
   surfaces), respect `prefers-reduced-motion`, keep alt text on images, and keep the site
   responsive down to ~360px. Verify with a real browser screenshot before claiming done.
8. **Self-contained & offline-friendly.** Don't add dependencies that only work online for
   core content. CDN fonts degrade gracefully to system fonts; that's acceptable.

## The signature

The home hero's **citation-emission spectrum** is the identity of the site: annual citations
rendered as a glowing perovskite-style bar chart (violet → red), because the lab's most-cited
work is multicolor perovskite LEDs. Keep it. Bar heights are `--h` (value ÷ max) and colors
are `--c`, set inline in `index.html`.

## How to edit content

See `docs/CONTENT-GUIDE.md` for step-by-step recipes: add a publication, add a member, add a
news item, refresh the metrics, update the citation chart.

## Provenance & honesty

All content is from the lab's **public** Google Scholar profile and homepage
(`sites.google.com/view/yhkimlab`), captured July 2026. This is a **showcase** site, not the
official lab site. Citation counts and rosters drift over time — treat the pages as a dated
snapshot and keep the source captions accurate.
