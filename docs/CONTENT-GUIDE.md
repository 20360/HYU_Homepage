# Content guide

Recipes for common edits. All paths are relative to `YH/`.

> Golden rule: **never invent data.** Titles, venues, years, citation counts, names, and dates
> must come from a real source (Google Scholar or the lab homepage). See `DATA-SOURCES.md`.

---

## Add a publication

Open `publications.html`.

**Most-cited highlight** (top block, with a citation bar) — copy an existing `<li class="pub">`:

```html
<li class="pub" style="--w:.302">
  <div class="pub-main">
    <h3 class="pub-title">Paper title exactly as published</h3>
    <p class="pub-meta"><span class="venue venue-top">Nature Photonics</span>
       First Author, Y.-H. Kim, <em>et al.</em> · 2021</p>
  </div>
  <div class="pub-cite"><span class="cite-count">983</span><span class="cite-bar"></span></div>
</li>
```

- `--w` is the citation bar length = `this paper's citations ÷ top paper's citations`
  (top = 3,256). So 983 → `--w:.302`.
- Use `venue-top` on the `<span class="venue">` for flagship venues (Science/Nature/…); plain
  `venue` otherwise.

**By-year entry** (lower blocks, no citation count) — copy an existing `<li>` in the right
`.pub-year` group:

```html
<li><span class="pnum">117</span><span>
  <span class="ptitle">Paper title</span>
  <span class="pmeta"><span class="venue">Journal</span>First Author <em>et al.</em>, Y.-H. Kim*</span>
</span></li>
```

Create a new `.pub-year` block if you add a new year (highest year first).

## Add a member

Open `team.html`, find the right `.member-group` inside `#panel-members` (Postdoctoral
Researcher / Ph.D. Students / M.S. Students / External Collaborators), and copy an existing
`.mcard`:

```html
<article class="mcard">
  <div class="mcard-top">
    <img class="mphoto" src="assets/img/members/firstname-lastname.jpg" alt="Given Name Family" />
    <span><span class="mname">Given Name Family</span><span class="mrole">Ph.D–M.S. · 1st year</span></span>
  </div>
  <p class="mint"><span class="mint-label">Research</span>Displays</p>
</article>
```

Save the photo (square crop, ~360×360, optimized) to `assets/img/members/`. If there's no
photo yet, use the initials-avatar pattern instead: `<span class="mavatar" aria-hidden="true">GF</span>`
(add `class="mavatar pd"` for a postdoc — gold instead of navy).

## Add an alumnus

Open `team.html`, `#panel-alumni`, and copy an existing card in the `.member-group`:

```html
<article class="mcard">
  <div class="mcard-top"><span class="mavatar" aria-hidden="true">GF</span><span><span class="mname">Given Name Family</span><span class="mrole">Ph.D. · 2022–2025</span></span></div>
  <p class="alum-meta">Degree, Department, Institution<br /><span class="now">Now: current position</span></p>
</article>
```

## Add a news item

Two places (keep them consistent):

1. `news.html` — add a `<li class="news-item">` at the top (most recent first):
   ```html
   <li class="news-item"><span class="news-date">2026 · 07</span>
     <p><strong>Name</strong> did the thing — covered by X, Y.</p></li>
   ```
2. `index.html` — if it's a headline, add/rotate a `.newsprev-item` card in the "Latest news"
   block so the home page stays current (keep it to 3).

## Refresh the metrics (citations / h-index / i10 / publications)

These numbers are **literal text in several files**. Update all occurrences:

- `16,187` (citations) — `index.html`, `team.html`, `publications.html`
- `49` (h-index) — same three
- `88` (i10-index) — `team.html`, `publications.html`
- `116` (publications) — `index.html`, `publications.html` (title + metric)

Grep for each number to catch every spot. Then update any "Source: Google Scholar, July 2026"
caption to the new date.

## Update the citation chart

Open `index.html`, block `#spectrum-bars`. Each bar:

```html
<div class="bar" style="--h:.878;--c:#5cbf55" data-year="2021" data-val="1789"></div>
```

- `--h` = that year's citations ÷ the max year's citations (currently max = 2038 in 2025).
- `--c` = the bar color; keep the violet→red spectrum sweep across years.
- `data-val` = the raw number shown on hover.
- Mark an incomplete current year with `class="bar partial"` and note it in the caption.

When you add a new year, recompute all `--h` if the new value becomes the max.

## Change a color / font / spacing

Edit the `:root` block in `assets/styles.css`. Don't hardcode hex in components — use the
tokens. See `DESIGN.md`.

## After any edit

Serve locally (`python -m http.server 4600`) and **look at the page in a browser** — desktop
and a narrow mobile width — before considering it done.
