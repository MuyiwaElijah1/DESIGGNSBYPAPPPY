# Designs By Pappy — website

Your portfolio updates itself from the `works/` folder. Add a folder, upload, done.

## What's in here
- `works/` — one subfolder per project (this is the only place you'll normally touch)
- `src/index.html` — the site (design, text, services, print options, FAQ). Contact details, stats, testimonials, services and print options are in the `CFG` block near the top of the `<script>`.
- `build.js` — scans `works/` and builds the site. Don't edit.
- `netlify.toml`, `package.json` — hosting settings. Don't edit.

## Add a project
1. In Finder, duplicate `works/_TEMPLATE` and rename the copy, e.g. `veeky-signatures`. **No underscore at the start** (folders starting with `_` or `.` are ignored).
2. Open its `info.txt` in TextEdit (Format → Make Plain Text) and fill it in. Delete any line you have nothing for; it just won't show on the site.
3. Add images. `cover.jpg` (or .png/.webp) is the main image; all other images become the gallery, in name order (`01.jpg`, `02.jpg`…). Delete `_TEMPLATE/info.txt`'s comment lines in your copy if you like.
4. Upload (see below). Your site rebuilds in 1–2 minutes.

`info.txt` fields: title, category, year, client, description, services, overview, challenge, strategy, direction, deliverables, results, link, featured (yes/no, yes = shown first), order (number, lower = earlier).
`category` creates the filter buttons automatically, so spell it the same way each time (e.g. `Branding`, `Web design`, `Print`).
Images are resized and converted to WebP automatically during the Netlify build. Originals up to ~5 MB each are fine.

To preview the example: rename `_example-brand-identity` to `example-brand-identity`. Delete it when you have real projects.

## One-time setup (Mac)
**A. GitHub**
1. Create a free account at github.com.
2. Install **GitHub Desktop** (desktop.github.com) and sign in.
3. Unzip this project. In GitHub Desktop: File → Add Local Repository → choose the unzipped folder → if asked, "create a repository" → Create. Then click **Publish repository** (untick "Keep this code private" only if you want it public — private is fine).

**B. Netlify**
1. Sign up at netlify.com **with your GitHub account**.
2. Add new site → Import an existing project → GitHub → pick the repository.
3. Settings are read from `netlify.toml` automatically (build `npm install && node build.js`, publish `dist`). Click **Deploy**.
4. Open the site link Netlify gives you. Site settings → Domain management lets you add your own domain and rename the free one.

## Every time you add or change work
1. Put the new project folder inside `works/` on your Mac.
2. Open GitHub Desktop: it lists the changes. Type a short message (e.g. "Add Veeky Signatures"), click **Commit to main**, then **Push origin**.
3. Netlify rebuilds automatically. If a project doesn't appear, open Netlify → Deploys → latest deploy → check the log for `[build] + Project name`.

## Things to know
- Folder names become the web address and ID of the project; keep them simple (letters, numbers, hyphens).
- A project with no images still appears (as a coloured title tile).
- Each deploy uses the Netlify free plan's build minutes; very large image batches build more slowly.
- Still to fill in `CFG` in `src/index.html`: WhatsApp number, email, social links, form endpoint (until set, forms run in dev mode and send nothing), stats, testimonials, and confirmed policies. Photography is intentionally not listed.
