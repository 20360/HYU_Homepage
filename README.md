# NREL Lab — Prof. Young-Hoon Kim (showcase site)

A **multi-page** academic lab website for **Prof. Young-Hoon Kim** (Next-generation
Renewable Energy & electronics Laboratory, Department of Energy Engineering, Hanyang
University). No build step, no framework — plain HTML/CSS/JS.

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, lab intro, research at a glance, latest news |
| `team.html` | Team — PI bio (education, appointments, honors, editorial service), current members, alumni, join-us, in four in-page tabs (CSS-only, no JS) |
| `research.html` | Research — six directions, each with a detailed section |
| `publications.html` | Publications — most-cited highlights + full list by year (2026 / 2025 / earlier), with figures |
| `highlights.html` | Highlights — lab life: awards, conferences, graduations, with photos |
| `news.html` | News — press highlights, most recent first, with photos |
| `contact.html` | Contact — address, email, phone, join-the-lab |

Shared navigation (with a mobile hamburger menu) and footer appear on every page.

## Documentation

For editing, extending, or handing this off to someone else:

- **[`CLAUDE.md`](CLAUDE.md)** — start here: what the site is, how to run it, the rules.
- **[`ROADMAP.md`](ROADMAP.md)** — planned improvements (full publication list, figures, i18n, deploy).
- **[`docs/`](docs/)** — reference wiki: architecture, content guide, design system, data
  sources, deploy. Open **`docs/index.html`** in a browser for an interactive hub.

## Run

```bash
cd YH
python -m http.server 4600
# then visit http://localhost:4600
```

Or open `YH/index.html` directly in a browser (Pretendard loads from a CDN when online).

## Design

Styled to match the **REAL Lab** house brand, not a generic template:

- **Palette:** cream paper (`#faf4ec`), navy bands (`#1a2332`), gold-dark accents
  (`#82603a`), cream-ring borders (`#eadfcb`) — the same tokens as the parent repo.
- **Type:** Pretendard (body + headings, matching the repo), Space Mono for data/labels.
- **Signature:** the *citation-emission spectrum* on the home hero — annual citations as a
  glowing perovskite-style emission bar chart (violet → red), tied to the lab's
  multicolor-LED research.
- Light overall with a navy hero/page-header band + navy footer (the REAL Lab pattern).
- Responsive with a mobile menu, keyboard-accessible (gold focus on light, cream on navy),
  respects `prefers-reduced-motion`.

## Content & data provenance

Everything is pulled from **public sources**, captured **July 2026**:

- **Metrics & most-cited papers** — the public Google Scholar profile
  ([`user=Je20irEAAAAJ`](https://scholar.google.com/citations?user=Je20irEAAAAJ&hl=en)):
  16,187 citations, h-index 49, i10-index 88, and the per-year citation series.
- **Bio, education, appointments, honors, research, members, news, recent publications**
  — the lab's public homepage (`sites.google.com/view/yhkimlab`) and its subpages.
- **Images** (`assets/img/`) — the PI portrait and NREL logo captured from that homepage;
  member/collaborator portraits (`assets/img/members/`) from the homepage's Member page;
  publication figures (`assets/img/publications/`) from the homepage's Publication page; news
  photos (`assets/img/news/`) from the homepage's News page; lab-life photos
  (`assets/img/highlights/`) from the homepage's Highlights page. Entries with 2+ related
  photos open a lightbox gallery (click any thumbnail) — see `assets/main.js`.

Citation counts and rosters change over time; treat the pages as a July 2026 snapshot.

## Files

```
YH/
  index.html  team.html  research.html  publications.html
  highlights.html  news.html  contact.html
  assets/
    styles.css          # light navy/gold/cream brand theme + multipage nav/footer + team tabs
    main.js             # mobile menu, chart stagger, count-up, scroll reveal, gallery lightbox
    img/prof-kim.png    # PI portrait
    img/nrel-logo.png   # lab logo
    img/members/        # 15 member & collaborator portraits
    img/publications/   # 26 publication figures/covers
    img/news/           # 13 news photos/figures
    img/highlights/     # 35 lab-life photos
  README.md
```
