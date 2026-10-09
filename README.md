# Teyvat — The Historical Archive

A bilingual English–Russian encyclopedia MVP with one structured content graph, a cross-region chronology, a synchronized schematic historical map, and a local patch-review workspace.

**All initial records are explicitly labeled demonstrations.** This is not a verified lore database. No canonical dates, borders, original citations, or game source URLs are fabricated. The sample source is a labeled workflow worksheet, not game evidence.

## Run locally

Requires Node 22.13+ and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by the server (normally http://localhost:3000). Keep the server running while using the app. Production: `npm run build`, then `npm start`.

## Included

- Stable language-independent routes, EN/RU UI, names and aliases searchable in both languages.
- Home, Characters, Regions, Terminology, Locations, Sources and reusable article routes.
- Typed Character, Region, Location, Term, HistoricalEvent, Relationship, Source, Claim, Era, GameVersion, TerritoryState and MapGeometry records.
- One event dataset feeding regional timeline lanes, readable lists, map markers, search and articles.
- Shared time/era/region/evidence state across chronology and map, preserved for the browser session.
- Exact, approximate, range, before/after, relative and unknown dates. Undated records never receive made-up numeric coordinates.
- Fictional 0–10000 SVG map, keyboard-accessible markers, pan/zoom, location existence, territory visibility and confidence styles.
- Evidence badges, source references, missing-citation audit, claims and supersession links.
- `/admin/updates`: source processing, dependency impact, stale-content review, citation gaps and exportable local review decisions.
- Runtime content validation, patch reports, review import, authoring templates and focused integrity tests.

## Architecture

JSON is portable, diffable and simple for one editor, with one file per entity and no duplicated translations. `content/` is authoritative. `scripts/content.mjs` generates the application index before dev/build; run `npm run index-content` after edits during a running dev session. Application logic is in `lib/`; readable pages and visualization are separated in `components/`. `lib/schema.ts` defines the data model. `lib/validation.ts` validates untrusted JSON at runtime.

Next.js App Router APIs + React + TypeScript run through the Sites starter's vinext/Vite adapter, with Cloudflare-compatible output. This preserves the provided hosting structure. No database is required. Device-local language/review preferences use browser storage through React's external-store interface; canonical reviews require export/import into JSON.

Source mentions and claim subjects seed impact analysis; reverse references find dependent entries. Versions use numeric ordering. Human review remains authoritative. Maintenance actions do not rewrite lore. The map uses one canonical coordinate frame independent of asset pixel resolution, and does not use real-world GIS.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local app; index content first |
| `npm run index-content` | Refresh data bundle during development |
| `npm run new-record -- event my-event` | Create an incomplete scaffold without overwriting |
| `npm run validate-content` | Validate references, localization, dates, versions and geometry |
| `npm run patch-report -- demo-2` | Report new sources, impacted entries and review gaps |
| `npm run apply-review -- review-decisions.json` | Apply exported browser decisions to canonical JSON |
| `npm test` | Run knowledge-model regression tests |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run build` | Production build |

Citation and review warnings in demonstration content are expected; structural errors are not.

## Authoring

See [the full authoring guide](docs/authoring.md) for every entity type, date examples, citations, uncertain claims, supersession, map replacement, new versions and the complete patch workflow. See [verification notes](docs/verification.md) for checks and limitations.

## Deferred

Actual researched lore, licensed map artwork, relationship graph visualization, automatic source ingestion, authentication, cloud editing and a database. The local index is suitable for an MVP; a large corpus should migrate loading/search behind the same stable entity schema. The unauthenticated maintenance page stores only browser-local decisions and exposes no server write endpoint.
