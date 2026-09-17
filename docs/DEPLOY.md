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

This site is currently deployed this way, live at `https://20360.github.io/HYU_Homepage/`.

## Custom domain: nrel.hanyang.ac.kr

The repo root has a `CNAME` file containing `nrel.hanyang.ac.kr`, which is GitHub Pages'
mechanism for custom domains. Two more steps are needed outside this repo to finish
connecting it — both one-time, done in the GitHub UI and the university's DNS panel:

1. **DNS** — whoever manages DNS for `hanyang.ac.kr` (university IT/network team) needs to
   add a **CNAME record**:
   - Host: `nrel`
   - Points to: `20360.github.io`
   - (Subdomains use a CNAME record, not an A record — A records are only for apex domains.)
2. **GitHub repo settings** — Settings → Pages → Custom domain → enter `nrel.hanyang.ac.kr` →
   Save. GitHub re-checks the DNS record (can take a few minutes to 24h to propagate) and
   then offers **Enforce HTTPS** — turn that on once the check passes so the site gets a
   free auto-renewed TLS cert.

Until the DNS record exists and GitHub's check passes, `nrel.hanyang.ac.kr` won't resolve —
the `https://20360.github.io/HYU_Homepage/` URL keeps working in the meantime.

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
