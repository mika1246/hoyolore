# Content authoring and patch review

This is an architecture-first demonstration, not a verified Genshin lore reference. All shipped content is marked `demo: true`; event dates, connections, coordinates, and territory outlines are synthetic examples. The research worksheet is explicitly not an original game source. Do not remove the demo flag until you have researched and cited a record. Names are directory scaffolds, not a license to invent facts.

## Storage and common fields

Every record is one UTF-8 JSON file below `content/`. English and Russian share an ID and a record. The `name` field is the display title for every kind, including events and sources. `lib/schema.ts` defines the discriminated TypeScript types. The validator checks runtime JSON independently of those types. IDs are globally unique lowercase slugs; do not rename them when changing translations.

Run `npm run new-record -- character your-id` to create a template. The command supports all twelve kinds and never overwrites an existing file. It creates an incomplete demo scaffold; fill every required field and resolve references before validation. Existing demo files are also complete structural examples.

Common fields:

```json
{
  "id": "your-id",
  "kind": "term",
  "name": {"en": "English name", "ru": "Русское название"},
  "description": {"en": "A sourced explanation.", "ru": "Объяснение с источниками."},
  "alternativeNames": [],
  "sources": [],
  "relatedEntities": [],
  "demo": true,
  "citationNeeded": true,
  "evidenceStatus": "approximate",
  "createdInVersion": "demo-1",
  "lastModifiedInVersion": "demo-1",
  "lastReviewedInVersion": "demo-1",
  "reviewStatus": "incomplete"
}
```

Use real version record IDs instead of demo versions for researched content. All three version references must exist. Increment `lastModifiedInVersion` when meaning, dates, locations, or evidence changes. Only a human should advance `lastReviewedInVersion` and set `reviewStatus: current`.

`relatedEntities` contains typed references such as `{"type":"term","id":"irminsul"}`. Use IDs instead of URLs in content. The application resolves names, translated titles, routes, and reverse event relationships automatically. Content changes require reindexing (`npm run index-content`); dev startup and production builds do this automatically. During a running dev session, run the indexing command after editing JSON; hot reload then picks up the generated index. Never edit `lib/content.generated.json` directly.

## Add a Character

Create `content/characters/<id>.json` with `kind: character`. In addition to common fields, set `region`, `titles` (localized array), `affiliations` (localized array), `species`, `status`, `category`, `eras`, `biography`, `relatedLocations`, and `relatedTerms`. Optional `portrait` is a licensed image path. Categories are extensible strings; supported conventions are `playable`, `npc`, `historical-figure`, `deity`, and `other`. Set dates and participation in event records rather than duplicating history in a character record.

## Add a Character Relationship

Create `content/relationships/<id>.json`, kind `relationship`, with `sourceCharacter`, `targetCharacter`, localized `relationshipType`, and `introducedInVersion`. Attach evidence status and original source IDs. It automatically appears on both character pages, with links to the other person and the full relationship record. This is an edge ready for a future graph; no graph visualization is needed now.

## Add a Region

Create `content/regions/<id>.json`, kind `region`, with a six-digit hex `color`, optional `geometryId`, and localized `civilizations` and `organizations` arrays. The directory and history filter discover regions from records. The eight seed regions are not a fixed UI enum. Important characters, locations, and events are derived from their region references.

## Add a Location

Create `content/locations/<id>.json`, kind `location`. Set `region`, optional `parentLocation`, `locationType`, optional `geometryId`, `historicalStatus`, and optional `existencePeriod: {"startBP":900,"endBP":0}`. Older BP values are larger: startBP must be at least endBP. A location without a known existence range remains visible at all times, without claiming it existed throughout history. Status choices are `exists`, `destroyed`, `submerged`, `sealed`, `relocated`, `unknown`.

Coordinates, when justified, are `{"x":6800,"y":2700,"confidence":"approximate"}`. They are fictional map units, never geographic latitude/longitude. Omit coordinates rather than inventing a marker location. The map reports events that have no visible mapped location.

## Add a Term

Create `content/terms/<id>.json`, kind `term`, with `category`, localized `definition`, and `alternativeTranslations`. Use `description` for the longer explanation and `relatedEntities` for people, regions, locations, or other concepts. Search indexes both names, aliases, translations, and descriptions regardless of interface language.

## Add a HistoricalEvent

Create `content/events/<id>.json`, kind `event`, with localized `summary`, `date`, `regions`, `locations`, `participants`, `relatedTerms`, optional `era`, and `eventType`. Put the longer explanation in `description`. Multiple regions may reference the same event. The timeline, readable list, map markers, article pages, and search all read this one record.

Date examples:

```json
{"type":"exact","yearsBeforePresent":500}
{"type":"approximate","yearsBeforePresent":2600,"uncertainty":200}
{"type":"range","startBP":3000,"endBP":2500}
{"type":"before","yearsBeforePresent":500}
{"type":"after","yearsBeforePresent":500}
{"type":"relative","after":"event-a","before":"event-b"}
{"type":"unknown"}
```

Use exact dates only when supported. Approximate uncertainty is a radius, so 2600 ± 200 overlaps 2400–2800 BP. Range ends are inclusive. Relative references must point to events; cycles are rejected. Relative and unknown dates appear outside the numeric lanes, with no invented date. Before/after bounds remain open-ended. BP is relative to the project's narrative present, not the computer's calendar year.

To put an event on the map, create a Location with justified coordinates, then include its ID in the event's `locations`. Do not add markers in component code. Locations and territories are visible at the selected central BP; events use overlap with the selected time window. Thus an event may be listed as unmapped if its location did not exist at the selected center. This distinction is intentional and visible.

## Add an Era

Create `content/eras/<id>.json`, kind `era`, with `start` and `end` date structures. Named eras populate the selector. Eras with numeric bounds can set the time window; relative/unknown eras remain descriptive and should be explored through event links. Boundaries may be approximate.

## Create and cite a Source

Create `content/sources/<id>.json`, kind `source`. Set `sourceType` (for example `World Quest`, `Book`, `Character Story`, `Artifact Description`, `Official Video / Trailer`), localized `notes`, `gameVersion`, `introducedInVersion`, `processingStatus`, and typed `mentions`. Optional fields are localized `questOrCollection`, localized `chapter`, `speaker`, `sourceUrl`, and `accessedDate` (ISO date). Source titles use `name.en` and `name.ru`.

Use verified original-source metadata. Omit online URLs when none exists; do not invent a link. Keep excerpts short and write original summaries, not copied wiki articles. A source's existence does not imply its contents are processed. States are `unprocessed`, `reviewing`, `partially-processed`, and `processed`.

To cite it, add its ID to an entity's `sources` array. The reusable Sources section resolves the metadata and numbers references. Add its ID to a Claim for a precise important statement. Source mentions are typed entity references, for example:

```json
{"mentions":[{"type":"character","id":"venti"},{"type":"term","id":"irminsul"}]}
```

Do not cite the synthetic demo worksheet as evidence of game lore. It demonstrates reference rendering only. Set `citationNeeded: true` until research is sufficient, even if a weak or demo source is attached.

## Create an important Claim

Create `content/claims/<id>.json`, kind `claim`, with a typed `subject`, localized `statement`, `introducedInVersion`, `status: current`, related entity references, and source IDs. Use claims for important historical, chronological, cosmological, uncertain, or disputed statements; not every sentence. Claims appear on the subject's article and have their own pages.

Evidence statuses are `confirmed`, `strongly-implied`, `approximate`, `disputed`, `theory`. These are separate from the claim lifecycle status (`current`, `superseded`, `disputed`) and editorial review state. Uncertainty is not a defect to hide. Geography separately distinguishes `confirmed`, `approximate`, and `speculative`.

To supersede a claim, retain the old record, set `status: superseded` and `supersededBy: <new-claim-id>`, and create the replacement claim with its new evidence. Update `lastModifiedInVersion`. Readers can follow old interpretation → new evidence through the claim links. Use localized `changes` notes when explaining why a claim changed.

## Add map geometry and a TerritoryState

Put geometry in `content/map/geometry/<id>.json`, kind `geometry`. Supported shapes:

- `geometryType: point` with `points: [[x,y]]`;
- `geometryType: polygon` with `points: [[x,y], ...]` (at least three vertices);
- `geometryType: multipolygon` with `polygons: [[[x,y], ...], ...]`;
- `geometryType: path` with an SVG `path` string in archive units.

Put a territory in `content/map/territories/<id>.json`, kind `territory`, with a typed `entity`, `period: {"startBP":800,"endBP":200}`, `geometryId`, `geographyConfidence`, and sources. Confirmed boundaries are solid, approximate ones dashed, speculative ones dotted and translucent. Never invent historical borders; omit geometry or mark a synthetic example as demo.

The supported owner types in this MVP are existing entity kinds (for example region). A future civilization or organization kind can extend the discriminated union, references and templates without changing the identity/localization model.

## Replace the schematic base map

`public/map-base.svg` is deliberately empty. No copied third-party map asset is included. Supply your own licensed or original SVG with `viewBox="0 0 10000 10000"`. Calibrate coordinates to this fixed fictional frame: x increases rightward, y downward. The map loads it as a separate base image beneath data-driven layers. Preserve the frame so changing image resolution does not move records. If artwork uses different units, transform artwork inside its SVG rather than rewriting lore locations. Sanitize externally supplied SVG files and ensure usage rights. Remove the placeholder label only after an appropriately sourced base map and location coordinates exist; the current demo coordinates still need research.

## Add a GameVersion and process a patch

1. Create `content/versions/<id>.json`, kind `version`, with `version`, unique numeric `order`, optional real `releaseDate`, and `status` (`planned`, `released`, `demo`). `order` defines chronology and avoids incorrect lexical comparisons like 5.10 versus 5.9. Do not call demo versions actual releases.
2. Add new Sources with that version's ID in `introducedInVersion` and their typed mentions. Start them as `unprocessed`. Reindex and open `/admin/updates`.
3. Choose the patch and start review. Process sources, extract important claims, and connect entities. Mark a source processed only after its relevant evidence is incorporated or explicitly dispositioned.
4. Inspect potentially affected records, review recommendations, claims, timeline impact, map impact, and citation issues. A new source follows mentions into existing records; changed claims follow their subject; reverse references identify dependent articles and events. Warnings mean “look again,” not “incorrect.”
5. Manually edit canonical content, sources, and claims. Nothing automatically rewrites lore.
6. Mark each reviewed record. Browser decisions persist locally and can be exported as `review-decisions.json`. Apply them with `npm run apply-review -- /path/to/review-decisions.json`. The command validates the entire proposed dataset before writing and does not alter lore prose. Source files remain the source of truth; browser storage alone does not update a build or another device.
7. Run validation and `npm run patch-report -- <version-id>`, then rebuild. Fully processed means at least one source is registered, all patch sources are processed, and no affected records have an older review version. This says nothing about undiscovered sources; the owner is responsible for inventory completeness. Citation gaps remain visible even in a processed patch.

Dashboard filters include review, changed this patch, missing citations, disputed, and superseded. The source panel exposes each processing state. To undo local-only decisions before applying, clear the archive's local browser storage; to undo applied decisions use Git. Commit reviewed JSON changes and any intentional interpretation notes, not personal browser state.

## Validation and reports

```sh
npm run index-content
npm run validate-content
npm run patch-report -- demo-2
npm test
npm run lint
npm run typecheck
npm run build
```

Validation errors fail the command: duplicate IDs, missing localization, broken typed references, missing source IDs, invalid dates, invalid version IDs, invalid statuses, bad geometry, invalid coordinates, cyclic chronology and cyclic supersession. Citation gaps and stale-content findings are warnings by design. Demo seed warnings are expected. Reports read JSON directly, so they do not depend on an old generated bundle.

## Deliberate limits

No automatic lore ingestion, copied wiki content, canonical initial chronology, official base map, external search infrastructure, complex relationship graph, public editing, authentication, or cloud database is included. Search currently ships a lightweight local index; split it by type or introduce server-side storage once corpus size requires it. Local review exports are explicit to preserve portable JSON and human authority. A relational database can later map IDs to primary keys and typed references to joins without redesigning the conceptual model.
