# Build log

Append-only. Newest last.

## 2026-07-16 — initial build

- Scraped the public Google Scholar profile (`user=Je20irEAAAAJ`) for metrics, per-year
  citations, and most-cited papers; scraped the lab homepage (`sites.google.com/view/yhkimlab`)
  and its subpages for bio, research, members, news, and recent publications.
- **v1 (dark):** built a single-page site with a dark "emission on substrate" theme and the
  citation-emission spectrum signature.
- **Feedback — too dark:** re-themed to the **REAL Lab light brand** (cream paper, navy bands,
  gold accents; Pretendard font). Captured the PI portrait and NREL logo from the homepage
  (element screenshots, since the image URLs are token-bound) into `assets/img/`. Enriched
  content: full PI bio, 6 research directions, 12 members, news timeline.
- **Feedback — make it multi-page:** split the single page into **7 pages** (Home, Prof. Kim,
  Research, Publications, Members, News, Contact) with a shared nav + footer. Home became a
  landing (hero + chart + research/news previews). Publications gained a most-cited highlights
  block + by-year lists (2026/2025/earlier) from the scraped record.
- Added a **mobile hamburger menu** (nav links were previously hidden on mobile).
- Verified every page in a headless browser (desktop, mobile, menu open/close).
- Added documentation: `CLAUDE.md`, `ROADMAP.md`, and `docs/` (this catalog + architecture,
  content guide, design, data sources, deploy).

## 2026-07-16 — merged Prof. Kim + Members into a Team page, added real photos

- **Feedback:** match `real.hanyang.ac.kr/team`'s pattern (one "연구팀"/Team page holding the
  PI, current members, alumni, and recruiting, rather than a separate Prof. Kim page and a
  separate Members page).
- Replaced `prof-kim.html` and `members.html` with a single **`team.html`**: four sections —
  Principal Investigator, Current Members, Alumni, Join Us — switched by **CSS-only tabs**
  (hidden radio inputs + labels + `:checked` selectors, no JS), so it stays fully readable
  and operable with JS disabled, closing the one progressive-enhancement gap the old
  JS-rendered member grid had (see `ROADMAP.md` item 3's old note).
- Captured **real portraits** for the postdoc, all 11 grad students, and the 3 external
  collaborators (`assets/img/members/`, 360×360, optimized) and wired them into the member
  cards (`.mphoto`), replacing initials avatars for that group.
- Added an **Alumni** tab from the lab homepage's `/member/alumni` page: Dr. Jong Gyu Oh
  (→ Samsung Electronics), Dr. Daseul Lee (→ DGIST), Serim Cho (→ Samsung Display). No source
  photos for alumni yet, so they keep initials avatars.
- Updated shared nav on all 6 pages (`Prof. Kim` + `Members` → one `Team` link) and the
  home hero's "Meet the PI" CTA. Removed the now-dead `members` array / grid-render code from
  `main.js`. Updated `README.md`, `CLAUDE.md`, `ROADMAP.md`, and all of `docs/` to match.
- Photo-to-name matching for the 15 current-member photos was inferred from the order people
  are listed on the homepage (image URLs and name text sit in separate blocks in its
  JS-rendered markup, so they couldn't be paired directly); 2 of 15 were independently
  cross-checked. See `DATA-SOURCES.md`'s caveat — flag anything that looks mismatched.

## Template for future entries

```
## YYYY-MM-DD — short title
- what changed, and why
- data refreshed? update DATA-SOURCES.md and on-page captions
```
