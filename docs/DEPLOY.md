# Deploy

The site is a **static folder**. Any static host works. Pick one.

## Local preview

```bash
cd YH
python -m http.server 4600      # http://localhost:4600
# or:  npx serve .
```

Use a server (not `file://`) so the `docs/` markdown viewer and CDN fonts behave.

## GitHub Pages

1. Put the contents of `YH/` at the root of a repo (or in `/docs` on `main`).
2. Repo → Settings → Pages → deploy from the branch/folder.
3. Site is served at `https://<user>.github.io/<repo>/`.
4. If the site lives in a subpath, all asset links are already **relative** (`assets/…`,
   `team.html`), so no base-path changes are needed.

## Netlify / Vercel (drag-and-drop)

- Netlify: drag the `YH` folder onto the Netlify "Sites" drop zone. Done.
- Vercel: `vercel` in the folder, or import the repo; framework preset = "Other / static".

## Any static host / CDN

Upload the folder. There is no build step and no server code. Ensure:

- `index.html` is the directory index.
- Files are served with correct MIME types (default on all hosts).

## Notes

- **Fonts** (Pretendard, Space Mono) load from a CDN. Online, they render correctly; offline,
  the browser falls back to system fonts. To guarantee the look offline, self-host the fonts
  (see `ROADMAP.md`, item 7).
- **No secrets, no API, no database** — nothing to configure.
- **Custom domain:** add it in your host's dashboard and point DNS; no code changes.
- After deploying, open the live URL on a phone to confirm the hamburger menu works.
