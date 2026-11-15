# ADMAKI portfolio update report

Date: 15 November 2026. Base commit: `a5a60f3`. No deployment or changes to the actual ERP application.

## Inspection

- Next.js 16.3.4 App Router, React 19, TypeScript; statically exported production site.
- `src/data/portfolio.ts`: website/business-system cards and all nine social video objects. No CMS.
- `EditorialWork.tsx`: homepage selected work and filters; previously maintained separate custom-domain/ranking logic.
- `WebsitesClient.tsx`: website gallery and status filters. `/work/page.tsx`: full project directory.
- `SocialShowcase.tsx`: homepage Smart Autoplay carousel, local MP4 players and selected TikTok fallback. `CampaignVideoPlayer.tsx`: native muted playback and controls. `SocialGalleryClient.tsx`: on-demand gallery; consumes the same video data.
- `src/data/projects.ts`: ERP case-study details. `/work/[slug]/page.tsx`: details, SEO metadata and navigation. Sitemap derives routes from that data.
- Featured flags and project status/category filters are retained. Homepage, gallery and directory now share the same six-project ID priority; each retains its prior relative ordering of unranked projects.

## Universal video order

| Previous position | Existing ID | TikTok identifier | New position |
| --- | --- | --- | --- |
| 1 | universal-01 | 7697672470446345504 | 2 |
| 2 | universal-02 | 7684533828672670994 | 3 |
| 3 | universal-03 | 7618627966997695751 | 1 |

Moved the complete existing third video object before the first. URLs, attribution, labels, MP4 sources and posters remain identical. Finder and KKGT objects and their ordering are unchanged.

The selected video remains muted by default. Added active-stage viewport observation and explicit native-video pause cleanup. TikTok fallback exposes its native volume control. Only the selected visible homepage player mounts. Gallery remains one player on demand. No new dependency, duplicated embeds or eager MP4 loading was introduced.

## Website order

Existing titles and IDs are preserved:

1. Sibu Trading PLC (`sibu`)
2. Maison Debrah Ethiopia (`maison-debrah`)
3. Universal Electronics (`universal`)
4. KKGT Coffee (`kkgt-coffee`)
5. KKGT Import & Export (`kkgt-trade`)
6. Bethager Furniture (`bethager`)

The website gallery and work directory continue with Enkupanet Agro Trading, Hayked General Trading, ADMAKI Menu, Get Fit with JO, Orbit Health Solutions, Hotel Lobelia, Koffera Coffee and Ephrem Art. The homepage's existing unranked website order is preserved: Enkupanet, ADMAKI Menu, Hayked General Trading, Get Fit, Orbit, Hotel Lobelia, Ephrem Art, Koffera Coffee. Business-system cards remain available. All 16 project entries remain present.

## Coffee warehouse presentation

- Title: **Coffee Processing & Warehouse Management System**.
- Category label: **Custom ERP / Business Software**. Existing **Business systems** filter membership is preserved.
- Applied the requested short description and long overview.
- Eight capabilities supported by the prior project information: GRN, receiving, lots, warehouse inventory, processing, client management, movement history/traceability and role-based operational controls.
- Quality verification and dispatch documentation are omitted pending evidence of completed implementation. The portfolio descriptions are the verification source; this work did not audit or modify the ERP application.
- Removed its direct administrative application link, branded image, client name in headings/alt text/service examples/guides, and identifying public route.
- New route: `/work/coffee-processing-warehouse-management-system`. All internal references, metadata and sitemap use this route. The details ID `project-01` is unchanged. The public card ID is now `coffee-warehouse-erp` to avoid identifying metadata.
- Replaced the branded artwork with an original light workflow illustration using the existing palette, with coffee sacks and verified workflow labels. Clearly labelled as an illustration, with no invented records, statistics or customer imagery. Editable SVG and optimized WebP are included; no third-party image rights are required.
- Header, navigation, hero, typography, global CSS, animations and responsive layout rules are unchanged.

## Validation

| Check | Result |
| --- | --- |
| `npm ci` | Passed; lockfile unchanged |
| `npm run build` | Passed; 22 static pages generated |
| `npx tsc --noEmit` | Passed |
| ESLint on all changed TypeScript/TSX and check scripts | Passed |
| `npm run lint` | Failed on two pre-existing errors in unchanged `src/app/page.tsx`, lines 38 and 43: use Next Link for internal `/services` links. Reproduced against original base file. |
| `node scripts/check-portfolio.mjs` | Passed: order, stability, no mutation, all project/video identities, assets and ERP privacy |
| `node scripts/check-cover-budget.mjs` | Passed: 12 website covers, 465 KiB |
| `node scripts/check-export.mjs` | Passed: routes, canonicals, local bundles, six campaign files, initial lazy gallery, product links, rendered project order and anonymized ERP pages |
| Comparison against base data | Passed: all nine video objects retain exact metadata; all other 15 project objects are unchanged |
| Existing website live links | All 13 returned HTTP 200 |
| `git diff --check` | Passed |
| Browser interaction and layout QA | Passed for the scoped checks below using the static production export. Physical-device, mobile touch/swipe and third-party TikTok checks remain outstanding. |\n| GitHub Actions verification | Passed: Verify website build, run 43727798435 |

Added the content regression script to the existing PR verification workflow. No existing test command is defined in package.json; no video testing dependency was added.

## Manual review / remaining issues

1. Browser checks on the unchanged production export confirmed Universal-03 is first and autoplays muted; pause/resume and mute/unmute; only one selected player; off-screen homepage player unmounting; gallery zero players initially and cleanup on brand filtering; portfolio order/filtering; anonymous ERP title, route and page text; no broken images or application console errors observed. Layout checks used CSS viewport widths of 1363, 909 and 454 pixels through browser zoom, with no horizontal page overflow on the tested views. Mobile next-video navigation and muted playback passed. These are desktop-browser responsive checks, not physical-device, touch/swipe, background-tab or third-party TikTok embed validation. The initial Next.js dev-preview issue was avoided by previewing a separate copy of the existing static export; application code and configuration were unchanged.
2. The separate **Hayked General Trading website project** remains untouched, including its existing public website URL and screenshot. It is a distinct website entry, not the anonymized ERP. Confirm separately if wider client-brand removal is wanted; removing it would conflict with preserving other projects.
3. The old client-named ERP case-study URL is no longer exported. Existing external bookmarks require a hosting-level redirect to the new route if continuity is needed. No redirect exposing that name was added to the new public presentation. Historical Git commits and deployed/cached copies are unaffected until reviewed/deployed.
4. Quality verification and dispatch documentation need completion evidence before being added.
5. Two existing homepage lint errors remain outside this content update's scope.

## Files changed

- `.github/workflows/verify.yml` — run focused content regression checks on PRs.
- `scripts/check-portfolio.mjs` — new data, ordering and privacy regression checks.
- `scripts/check-export.mjs` — generic route, rendered order and public privacy assertions.
- `src/data/portfolio.ts` — complete video-object reorder, shared ordering helper and generic ERP card.
- `src/data/projects.ts` — generic case-study content, supported capabilities, image and route; removed administrative link.
- `src/data/services.ts`, `src/data/businessGuide.ts` — anonymous examples and internal links in English/Amharic.
- `src/components/sections/EditorialWork.tsx` — shared priority while retaining the previous unranked order; illustration label.
- `src/components/sections/SocialShowcase.tsx` — selected-stage viewport observation and native TikTok volume control.
- `src/components/media/CampaignVideoPlayer.tsx` — explicit pause cleanup.
- `src/components/services/DemoLab.tsx`, `ServiceArtwork.tsx` — generic wording, links and illustration.
- `src/app/websites/WebsitesClient.tsx`, `src/app/work/page.tsx` — shared project ordering.
- `src/app/erp/ErpClient.tsx` — shared generic content and capabilities; removed launch link.
- `src/app/guides/choosing-a-digital-partner-in-ethiopia/page.tsx` — generic case-study link.
- `public/images/projects/coffee-processing-warehouse-management-system.svg` and `.webp` — original workflow illustration.
- Deleted `public/images/projects/hayked-coffee-warehouse-erp.webp` — branded ERP artwork excluded from future exports.
- `PORTFOLIO_UPDATE_REPORT.md` — this report.
