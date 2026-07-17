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

## 2026-07-17 — added figures to Publications/News, and a new Highlights page

- **Feedback:** bring the figures that were in the lab homepage's Publication page over to
  this site's `publications.html` (positioned to the right of each entry, per request), and
  do the same for News; also import the lab homepage's separate HIGHLIGHTS page (awards,
  conferences, graduations — distinct from the research/press-coverage News page) as a new
  page here, with its photos.
- Captured images via a headless Playwright browser (the homepage's image URLs are
  token-bound, same constraint as the PI portrait/logo/member photos): 26 publication
  figures/covers, 13 news photos/figures, and 35 highlights photos. See `DATA-SOURCES.md` for
  the matching method and its caveats (figure-to-paper matching by verified page position;
  highlights photos are one-per-entry, not the full carousel).
- Added a shared **figure-gallery lightbox** (`assets/main.js`, `.gallery`/`.gallery-item`/
  `.lightbox-*` in `styles.css`): every figure is a plain image link that works with JS off;
  entries with 2+ related photos (two in `publications.html`'s style is unused so far, but two
  `news.html` entries — the 2022 and 2021 large-area/world-record perovskite LED items — each
  group 3 photos) open a popup with prev/next across the group when clicked, modeled on
  `real.hanyang.ac.kr`'s gallery tab.
- Added **`highlights.html`** (new 7th page) with 35 dated entries from the lab homepage's
  Highlights page, translated to English, each with its photo. Added `Highlights` to the
  shared nav on all 7 pages and updated `CLAUDE.md`, `README.md`, and `docs/` to match.

## 2026-07-18 — fixed two swapped member photos

- **Feedback:** a face/name mismatch was spotted on the Team page — the inferred
  page-order photo attribution (see `DATA-SOURCES.md`'s caveat) got two pairs wrong.
- Hyun Do's photo and Eun-Ji Jang's photo were swapped with each other; Hyerin Shin's
  photo and Seung Hyun Jae's photo were swapped with each other. Fixed by swapping the
  image bytes back so each filename shows the right face again — no HTML changes needed
  (`team.html` already pointed at the correct filenames).
- Re-checked all 15 current-member/collaborator photos against their names' gender as a
  sanity pass; the other 11 look correctly matched. Updated `DATA-SOURCES.md`'s caveat
  with this correction.

## 2026-07-18 — hover/focus reveal on member photos (previous degree, stage, year, research)

- **Feedback:** hovering a current member's photo on the Team page should fade the photo out
  and show their previous degree (+ school), stage, year in program, and research area in its
  place.
- Fetched each current member's previous degree/school from the lab homepage's `/member` page
  (not previously captured — see `DATA-SOURCES.md`). The three external collaborators don't
  list one there, so their reveal shows Stage + Affiliation only, nothing invented.
- Added `.mphoto-wrap`/`.mreveal` (CSS-only `:hover`/`:focus-within` fade, `assets/styles.css`)
  and wired it into all 15 current-member/collaborator cards in `team.html`; `tabindex="0"`
  keeps it keyboard-reachable, and the reveal text stays in the accessibility tree even when
  visually faded out. No JS needed — works with JS disabled. Updated `CONTENT-GUIDE.md`'s
  "Add a member" recipe and `DATA-SOURCES.md` to match.

## 2026-07-18 — alumni photos, split by lab stage, and their lab contributions

- **Feedback:** bring alumni photos over from the lab homepage's Alumni page like the current
  members already have; Dr. Jong Gyu Oh and Dr. Daseul Lee only held a **postdoc** position at
  this lab (their Ph.D.s are from elsewhere), and Serim Cho was only an **undergraduate** here
  — split the Alumni tab into two groups instead of one flat "Lab Alumni" list; also bring over
  the "Contribution" info from the old Google Site.
- Captured all 3 alumni portraits via headless Playwright (same `sitesv-images-rt`
  token-bound-URL constraint as other images), cropped/resized to 360×360 to match current
  members, saved as `assets/img/members/alumni-{jonggyuoh,daseullee,serimcho}.jpg`. Swapped
  their `.mavatar` initials for real `<img class="mphoto">`.
- Split `#panel-alumni` into **Postdoc Alumni** (Oh, Lee) and **Undergraduate Alumni** (Cho)
  `.member-group`s, matching the lab homepage's own grouping. Changed their `.mrole` from
  "Ph.D. · dates" to "Postdoc · dates" (and Cho's to "Undergraduate · 2023") since `.mrole` is
  the stage *at this lab*; `.alum-meta` keeps their actual degree (Ph.D./B.S.) unchanged.
- The "Contribution" data wasn't in the alumni page's normal rendered text — it's behind a
  per-person "Contribution" button that opens a Google Sites popup, only reachable by
  rendering the page and clicking it. Added a new `.alum-contrib` list (paper citations) to
  each alumni card from that popup; see `DATA-SOURCES.md` for the exact source and how one of
  Oh's and two of Lee's contributions cross-check against existing `publications.html` entries.
- Updated `CONTENT-GUIDE.md`'s "Add an alumnus" recipe and `DATA-SOURCES.md` to match.

## Template for future entries

```
## YYYY-MM-DD — short title
- what changed, and why
- data refreshed? update DATA-SOURCES.md and on-page captions
```
