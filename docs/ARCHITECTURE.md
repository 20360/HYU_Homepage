# Architecture

How the NREL Lab showcase site is put together.

## Overview

A hand-built static site: 6 HTML pages that each `<link>` one stylesheet and `<script>` one
JS file. No framework, no bundler, no `node_modules`. Fonts come from a CDN. Everything a
browser needs is in the `YH/` folder.

```
YH/
├── index.html          Home
├── team.html           Team — PI, current members, alumni, join us (4 CSS-only tabs)
├── research.html       Research
├── publications.html   Publications
├── news.html           News
├── contact.html        Contact
├── assets/
│   ├── styles.css      All CSS
│   ├── main.js         All JS
│   └── img/            prof-kim.png, nrel-logo.png, members/ (15 portraits)
├── docs/               This documentation
├── CLAUDE.md           Contributor/agent guide
├── ROADMAP.md          Planned work
└── README.md           Quick start
```

## Page anatomy

Every page follows the same skeleton:

```
<div class="gold-rule">           top brand rule
<header class="nav">              shared nav (logo, links, Scholar CTA)
<header class="pagehead on-navy"> navy title band  (interior pages)
  — OR —
<section class="hero on-navy">    full hero + citation chart  (home only)
<main> … page-specific sections … </main>
<footer class="site-footer on-navy">  shared footer
<script src="assets/main.js" defer>
```

**The nav and footer are duplicated in all 6 files.** There is no templating layer. When you
change a nav link or the footer, edit every page. The current page's nav link carries
`class="active" aria-current="page"`.

`team.html` additionally has an in-page sub-nav: four radio inputs + labels + panels
(`.team-tab-*` in `styles.css`) switch between Principal Investigator / Current Members /
Alumni / Join Us using only the CSS `:checked` selector — no JavaScript, so the whole page is
readable and operable with JS disabled (labels are native, keyboard-focusable radio controls).

## CSS (`assets/styles.css`)

Organized top-to-bottom:

1. **`:root` tokens** — brand colors (navy/gold/cream), paper + ink colors, on-navy inks,
   layout vars (`--maxw`, `--pad`, `--radius`), fonts, easing. Change the look here.
2. **Base + focus** — reset, body, links, accessible focus (gold on light, cream on `.on-navy`).
3. **Components** — `.nav`, `.hero`, `.spectrum` (the chart), `.section`, `.about`, `.pi-*`
   (PI panel), `.cards`/`.card` (research), `.pub-*` (publications), `.member-*`/`.mcard`/
   `.mphoto` (current members), `.alum-meta` (alumni), `.team-tab-*` (the tab switcher),
   `.news-*`, `.contact-*`, `.pagehead`, `.site-footer`.
4. **Reveal** — `[data-reveal]` scroll-in animation.
5. **Responsive** — breakpoints at 940px (tablet + mobile menu), 820/620/560px.
6. **Reduced motion** — disables animation for `prefers-reduced-motion`.

The `.on-navy` class marks dark surfaces so focus outlines switch to cream (they'd be
invisible in gold on navy).

## JS (`assets/main.js`)

One IIFE, progressive enhancement only. Responsibilities:

- **Mobile menu** — builds the hamburger button, toggles `.open` on `.nav-links`, swaps
  ☰/✕, closes on link click.
- **Citation chart** — staggers the bar entrance animation (`--i` per bar).
- **Count-up** — animates the hero metric numbers.
- **Scroll reveal** — `IntersectionObserver` adds `.in` to cards/rows as they enter view.

All of it is guarded so a page without a given element just skips that feature. With JS off,
every page's content — including `team.html`'s four tabs and all member/PI/alumni cards — is
still fully present and operable (see the `.team-tab-*` note above).

## Data: where it lives

- **All content is static HTML** (bio, members, alumni, publications, news, research text) —
  edit the relevant page directly. Member/collaborator cards live in `team.html`'s
  `#panel-members`; alumni in `#panel-alumni`.
- **Citation chart values** are inline on the bars in `index.html` (`--h` height ratio,
  `--c` color, `data-val` label).
- **Metrics (16,187 / 49 / 88 / 116)** appear as literal text in several pages — search and
  replace across files when refreshing (see `CONTENT-GUIDE.md`).

Provenance for all of it: `DATA-SOURCES.md`.
