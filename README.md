# ADMAKI — Creative & Digital Studio

Bright editorial portfolio for ADMAKI, an Ethiopia-based creative and technology studio.

**Public website:** https://yohannesmulugeta.github.io/admaki-website/

## Stack

- Next.js App Router, React 19, TypeScript, Tailwind CSS
- Static export to GitHub Pages via GitHub Actions
- Lightweight CSS illustration and scroll-responsive Idea Engine
- Responsive, accessible work filters and reusable portfolio data

## Editing the portfolio

All project and campaign data is in **`src/data/portfolio.ts`**.

### Website and ERP cards

Each `workProjects` entry supports:
- `title`, `eyebrow`, `description`, `category`, `status`, `theme`
- `liveUrl` — link to the actual public website when confirmed
- `repoUrl` — link to public GitHub source (omit for private repositories)
- `caseStudyUrl` — internal project detail page when available
- `screenshot` — optional approved web image in `public/images/projects/`

Projects without a screenshot use **conceptual editorial artwork**, which does not pretend to be a screenshot. "Concept" and demo entries are clearly labelled.

### Social media: Universal / KKGT / Finder

Update `socialBrands` in `src/data/portfolio.ts`. For each entry, add links in its `channels` list:

```ts
channels: [
  { label: 'TikTok', url: 'https://www.tiktok.com/@your-approved-handle' },
  { label: 'Instagram', url: '' },
  { label: 'Campaign work', url: '' },
],
```

Blank URLs render as **link coming soon**, not broken or fake links. Replace the geometric social art with client-approved thumbnails when available.

### ADMAKI contact details

The contact section intentionally does **not** publish an unverified email address or phone number. Update `src/app/page.tsx` when approved business contact channels are available.

## Development

```bash
npm ci
npm run dev
npm run build
```

Build emits static output to `out/`. GitHub Actions deploys the `main` branch to Pages. A separate PR workflow verifies that `npm run build` succeeds before a redesign is merged.

## Layout files

- `src/app/page.tsx` — new homepage sections and copy
- `src/app/editorial.css` — visual design, mobile and animation states
- `src/components/sections/IdeaEngine.tsx` — four-stage scroll hero
- `src/components/sections/EditorialWork.tsx` — project filter and social cards
- `src/data/portfolio.ts` — editable project and link data
- `src/data/projects.ts` — approved ERP detail pages

## Content review before sharing publicly

- Review client names, attribution, screenshots, and usage permissions.
- Confirm every external website's final URL and live status.
- Replace social placeholders with actual links once campaign media has been published.
- Provide approved ADMAKI email or WhatsApp details for the inquiry CTA.
- Avoid unverified performance figures, fictitious testimonials, or implied client endorsements.

## Creative cursor and genuine homepage covers

- **Studio cursor:** `src/components/motion/StudioCursor.tsx` and `src/app/cursor-covers.css`. Only active for a fine desktop pointer with motion enabled; touch and reduced-motion users retain their regular cursor. Hover labels come from `data-cursor-label`.
- **Actual website cover screenshots:** `public/images/covers/<project-id>.jpg`. The project cards use real screenshots of the homepage first screen, rather than generic mockup art.
- **Refresh the covers:** GitHub → Actions → **Capture website cover screenshots** → **Run workflow**. The script at `scripts/capture-project-covers.mjs` uses Playwright to capture the homepages at 1440×900, checks for error pages, and commits updated JPEGs.
- **Cloudflare-protected KKGT sites:** If the public domain refuses an automated browser (HTTP 403), screenshots are produced from a local preview of the corresponding public GitHub website repository.
- **Graceful fallback:** If a screenshot path is missing or fails to load, the project card returns to its original themed artwork rather than showing a broken image.
- **Koffera demo:** The public route was showing an error during this update, so its broken live URL was intentionally hidden while the repository remains linked. Restore it after fixing its published website.

Screenshots should always be reviewed for accuracy, attribution, and any client-sensitive content before sharing widely.
