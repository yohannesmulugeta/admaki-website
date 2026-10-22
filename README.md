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
