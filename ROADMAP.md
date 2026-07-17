# Roadmap — planned improvements

Ideas for extending the NREL Lab showcase site, roughly in priority order. Each item lists
*why* and a rough *how*. Nothing here is required for the site to work today — it already
ships as a complete 6-page site.

> 이 문서는 친구가 참고할 수 있도록 "다음에 할 만한 일" 목록입니다. 급한 순서대로 정리했고,
> 각 항목에 이유와 대략적인 방법을 적어 두었습니다.

---

## 1. Full 116-publication list (Publications page)

- **Why:** `publications.html` now shows most-cited highlights + selected 2026/2025 papers
  (each with a figure — see item 2026-07-17 in `docs/log.md`). A complete, year-grouped list
  of all 116 papers is more authoritative.
- **How:** The full list already exists on the lab homepage
  (`sites.google.com/view/yhkimlab/publication`, plus `/publication/2021-before-hyu` for
  pre-2021 papers). Scrape it (headless browser, the site is JS-rendered), parse into
  `{num, authors, title, venue, year}`, and generate the `.pub-simple` year groups. Keep
  highlights (with citation counts) at the top. Cross-check titles against Google Scholar;
  never paraphrase a title. Figures for papers 58–113 are already captured in
  `assets/img/publications/` if you extend the list into that range.

## 2. Research figures

- **Why:** The Research page is text-only. The lab's research page has schematic figures
  (device stacks, CISS diagrams, catalysis cells) that would make each direction concrete.
- **How:** The figure image URLs are on `.../research`. Capture them the same way the PI
  portrait and logo were captured (render the page, screenshot the `<img>` element — the
  `sitesv-images-rt` URLs are token-bound and won't `curl`). Save to `assets/img/`, optimize,
  add with descriptive `alt` text and captions. Respect the source — these are the lab's own
  figures; keep them credited and only for this showcase.

## 3. Member photos — ✅ done (2026-07-16)

Real portraits for the postdoc, all 11 grad students, and the 3 external collaborators are in
`assets/img/members/` (360×360, optimized, ~12–16 KB each) and wired into `team.html`'s
Current Members tab. Alumni still use initials avatars (no source photos captured yet) — a
small follow-up if that matters.

## 3b. Full photo carousels on the Highlights page — ✅ mostly done (2026-07-17)

- **Why:** `highlights.html` and its `assets/img/highlights/` photos are new (see
  `docs/log.md`). The source Highlights page shows a photo carousel (dot pagination) for many
  entries; only the first/visible photo was captured per entry to keep the capture pass
  tractable.
- **How (if you want the rest):** Re-open each entry's carousel in a headless browser, click
  through the dot pagination, and screenshot each additional slide. Add them as extra
  `.gallery-item` links inside that entry's `.gallery` (see `CONTENT-GUIDE.md`) — the lightbox
  groups them automatically, no JS change needed.

## 4. Korean / English toggle

- **Why:** Site is English; a Korean version suits a Korean audience.
- **How:** Cleanest is a small i18n layer: put strings in `assets/i18n.js` keyed by
  `data-i18n` attributes, and a `?lang=ko` / toggle button that swaps them + persists to
  `localStorage`. Alternatively, duplicate pages under `/ko/`. The lab homepage already has
  Korean copy for most sections to draw from.

## 5. Deployment

- **Why:** Share a public URL instead of a local server.
- **How:** It's a static folder — any static host works. See `docs/DEPLOY.md`. GitHub Pages
  or Netlify drag-and-drop are the fastest. Remember CDN fonts need internet (or self-host,
  see item 7).

## 6. SEO polish

- **Why:** Each page already has `<title>` + description + og tags. A sitemap and a shared
  social preview image would complete it.
- **How:** Add `sitemap.xml` (6 URLs) and `robots.txt`. Create one `og:image` (e.g., the
  hero with the citation chart) and reference it from every page's `<meta property="og:image">`.

## 7. Self-host fonts (offline robustness)

- **Why:** Pretendard + Space Mono load from a CDN; offline, the site falls back to system
  fonts. For a folder you hand someone to open offline, bundling fonts guarantees the look.
- **How:** Download the Pretendard and Space Mono web fonts into `assets/fonts/`, add
  `@font-face` rules to `styles.css`, and drop the CDN `<link>`s. Adds ~1–2 MB.

## 8. Accessibility & performance audit

- **Why:** Confirm the a11y floor and keep it fast.
- **How:** Run Lighthouse / axe. Check color contrast on gold-on-cream text, keyboard order,
  the mobile menu's focus trap, and image sizes. Fix findings; keep `prefers-reduced-motion`.

## 9. (If it grows) move to a framework

- **Why:** Hand-duplicated nav/footer across 6 files is fine now but scales poorly.
- **How:** If the site gains many pages, port to a static-site generator (Astro, Eleventy) or
  React so the nav/footer/member data live in one place. Not needed at current size — don't
  over-engineer a brochure site.

---

## Non-goals

- No dark theme (explicitly rejected).
- No fabricated data to "fill out" a section — leave it accurate or leave it out.
- No heavy client frameworks for what is a static brochure site.
