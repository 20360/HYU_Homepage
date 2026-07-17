# Data sources & provenance

Every fact on the site comes from a **public** source, captured **July 2026**. This is a
showcase site, not the official lab site. Numbers drift — keep this table and the on-page
"as of" captions accurate when you refresh.

## Sources

| Source | URL | Used for |
|--------|-----|----------|
| Google Scholar profile | `scholar.google.com/citations?user=Je20irEAAAAJ` | Citation count, h-index, i10-index, per-year citation series, most-cited papers |
| Lab homepage | `sites.google.com/view/yhkimlab` | Lab name/description, PI bio, education, appointments, honors, editorial service, research descriptions, member list, news, recent publications |
| Lab homepage — images | same, `/prof-kim` and `/home` | PI portrait (`prof-kim.png`), NREL logo (`nrel-logo.png`) |
| Lab homepage — member images | `/member` | 15 current-member/collaborator portraits in `assets/img/members/`, captured 2026-07-16 |
| Lab homepage — member previous degree | `/member` | Each current member's previous degree + school, fetched 2026-07-18, shown in `team.html`'s hover/focus reveal on each photo (`.mphoto-wrap`/`.mreveal`) |
| Lab homepage — alumni | `/member/alumni` | The 3 listed alumni (names, degrees, current positions) |
| Lab homepage — publication figures | `/publication` and `/publication/2021-before-hyu` | 26 figures/covers in `assets/img/publications/`, captured 2026-07-17 |
| Lab homepage — news photos | `/news` | 13 photos/figures in `assets/img/news/`, captured 2026-07-17 |
| Lab homepage — highlights photos | `/highlights` | 35 photos in `assets/img/highlights/`, captured 2026-07-17 (one representative photo per dated entry; entries with dot-carousels on the source page may have more photos than were captured) |

## Key figures (as of July 2026)

| Metric | Value |
|--------|-------|
| Total citations | 16,187 |
| h-index | 49 |
| i10-index | 88 |
| Publications | 116 |
| Most-cited paper | *Science* 2015, "Overcoming the electroluminescence efficiency limitations of perovskite LEDs" — 3,256 citations |

Per-year citations used in the chart: 2015: 156 · 2016: 454 · 2017: 849 · 2018: 1,239 ·
2019: 1,362 · 2020: 1,406 · 2021: 1,789 · 2022: 1,928 · 2023: 1,935 · 2024: 1,922 ·
2025: 2,038 · 2026: 1,045 (**partial / year-to-date**).

## PI facts (from the lab homepage)

- Young-Hoon Kim — Associate Professor (since 2025), Department of Energy Engineering,
  Hanyang University. Assistant Professor 2019–2025.
- Ph.D. (2014–2016) / M.S. (2012–2014), POSTECH, advisor Prof. Tae-Woo Lee; B.S. POSTECH
  (2008–2012).
- Postdoc at NREL, USA (2019–2021, Dr. Joseph Luther & Dr. Matthew Beard) and Seoul National
  University (2016–2019). Visiting scholar, University of Valencia (2018).
- Contact: younghoonkim@hanyang.ac.kr · +82-2-2220-2393 · Fusion Tech Center 921, 222
  Wangsimni-ro, Seongdong-gu, Seoul 04763.

## Alumni (from the lab homepage's Alumni page, captured 2026-07-16)

- **Dr. Jong Gyu Oh** — Ph.D., Dept. of Energy Engineering, HYU (EEDL); postdoc 2023.07–2023.12;
  now Staff Engineer, Samsung Electronics.
- **Dr. Daseul Lee** — Ph.D., Dept. of Nano Fusion Technology, Pusan National University; with
  the group 2023.09–2026.06; now Researcher, DGIST (Innocore). Also a co-author on several
  2024–2026 papers (see `publications.html`).
- **Serim Cho** — B.S., Dept. of Energy Engineering, HYU, 2023; now at Samsung Display.

The homepage's Alumni page listed only these three at capture time — treat the list as
whatever it showed that day, not necessarily exhaustive of everyone who has ever left the lab.

## Caveats

- **Citation counts change daily.** The chart and metrics are a snapshot; the captions say so.
- **Membership changes** each semester. The member list reflects the homepage at capture time.
- **Member-photo attribution was inferred by page order, not by an explicit name/image label**
  in the homepage's markup (the images and names sit in separate blocks in the underlying
  Google Sites HTML). Two of fifteen (the last two external collaborators) were independently
  confirmed by proximity in the raw HTML; the rest follow the same listed order (postdoc → PhD
  → M.S. → collaborators) as a best effort. If a face and a name look mismatched, flag it.
  **Update 2026-07-18:** exactly that happened — Hyun Do's and Eun-Ji Jang's photos were swapped
  with each other, and Hyerin Shin's and Seung Hyun Jae's photos were swapped with each other
  (a gender mismatch made it visible). Corrected by swapping the image bytes back between each
  pair so the filenames (`phd-hyundo.jpg`, `ms-eunjijang.jpg`, `phd-hyerinshin.jpg`,
  `ms-seunghyunjae.jpg`) keep matching the right face. The other 11 photos were re-checked
  against their names' gender and look correctly matched.
- **The three external collaborators' previous degree isn't listed** on the lab homepage's
  `/member` page (only their current stage, institute, and research group are). Their photo
  hover/focus reveal shows Stage + Affiliation only — don't add a fabricated previous-degree
  line for them.
- The lab is unrelated to (but shares its acronym with) the U.S. National Renewable Energy
  Laboratory, where Prof. Kim did his postdoc. The site notes this.
- Some very recent papers on the homepage are "in press"; venues/years were transcribed as
  shown. Cross-check against Google Scholar / the DOI before treating any as final.

## How the images were captured

The homepage images are served from token-bound `sitesv-images-rt` URLs that return an HTML
wrapper to `curl`. They were captured by rendering the page in a headless browser (Playwright)
and taking **element/region screenshots**, same technique as the PI portrait, logo, and member
photos. See `ROADMAP.md` item 2 for repeating this on the Research page figures.

Two provenance caveats specific to the publications/news/highlights images (2026-07-17 capture):

- **Publication figures were matched to their paper by page position, not an explicit label.**
  The lab's publication page renders each entry's number and its figure in a strict,
  verified 1-to-1 descending order (paper 113 down to 58 each have exactly one figure; 116–114
  and everything before 58 have none) — matched and spot-checked figure-by-figure against the
  visible paper number and title. The two Advanced Materials cover images used for the 2015
  and 2018 highlight papers came from a separate "featured covers" strip at the top of the
  page (not the numbered list) and were matched by the print date visible on the cover; flag
  it if a cover ever looks mismatched to its paper.
- **Highlights entries can have more photos than were captured.** The source Highlights page
  shows a photo carousel (dot pagination) for many entries; only the first/visible photo was
  captured per entry, so `highlights.html` shows one representative photo per entry rather
  than the full carousel.
