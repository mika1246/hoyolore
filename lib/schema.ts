export type Locale = 'en' | 'ru';
export type Localized = Record<Locale, string>;
export type Evidence = 'confirmed' | 'strongly-implied' | 'approximate' | 'disputed' | 'theory';
export type HistoricalDate =
 | {type:'exact'; yearsBeforePresent:number}
 | {type:'approximate'; yearsBeforePresent:number; uncertainty?:number}
 | {type:'range'; startBP:number; endBP:number}
 | {type:'before'|'after'; yearsBeforePresent:number}
 | {type:'relative'; after?:string; before?:string; during?:string}
 | {type:'unknown'};
export type Kind = 'character'|'region'|'location'|'term'|'event'|'relationship'|'source'|'claim'|'era'|'version'|'geometry'|'territory';
export type Ref = {type:Kind; id:string};
export interface Maintenance {createdInVersion:string; lastModifiedInVersion:string; lastReviewedInVersion:string; reviewStatus:'current'|'review-recommended'|'needs-review'|'incomplete'|'disputed'}
export interface Base extends Maintenance {id:string; kind:Kind; name:Localized; description:Localized; alternativeNames:string[]; sources:string[]; demo:boolean; citationNeeded?:boolean; evidenceStatus:Evidence; relatedEntities:Ref[]; changes?:{version:string; type:string; note:Localized}[]; provenance?:{pack:string; sections:string[]; verification:'pack-only'; localization:'pack-or-existing'|'editorial-translation'; notes:Localized}}
export interface Character extends Base {kind:'character'; titles:Localized[]; portrait?:string; region?:string; affiliations:Localized[]; species:Localized; status:Localized; category:string; eras:string[]; biography:Localized; relatedLocations:string[]; relatedTerms:string[]}
export interface Region extends Base {kind:'region'; color:string; geometryId?:string; civilizations:Localized[]; organizations:Localized[]}
export interface Location extends Base {kind:'location'; region:string; parentLocation?:string; locationType:string; coordinates?:{x:number;y:number;confidence:'confirmed'|'approximate'|'speculative'}; geometryId?:string; existencePeriod?:{startBP:number;endBP:number}; historicalStatus:'exists'|'destroyed'|'submerged'|'sealed'|'relocated'|'unknown'}
export interface Term extends Base {kind:'term'; category:string; definition:Localized; alternativeTranslations:string[]}
// memoryNote preserves pre-Irminsul-rewrite research knowledge alongside the memory Teyvat's inhabitants now hold, for events where Irminsul edits changed what is remembered.
export interface HistoricalEvent extends Base {kind:'event'; date:HistoricalDate; regions:string[]; locations:string[]; participants:string[]; relatedTerms:string[]; summary:Localized; era?:string; eventType:string; parentEvent?:string; memoryNote?:{objective:Localized; currentMemory:Localized; alterationEvent?:string}}
export interface Relationship extends Base {kind:'relationship'; sourceCharacter?:string; targetCharacter?:string; sourceEntity?:Ref; targetEntity?:Ref; relationshipType:Localized; introducedInVersion:string}
export interface Source extends Base {kind:'source'; sourceType:string; questOrCollection?:Localized; chapter?:Localized; speaker?:string; gameVersion:string; sourceUrl?:string; notes:Localized; accessedDate?:string; mentions:Ref[]; processingStatus:'unprocessed'|'reviewing'|'partially-processed'|'processed'; introducedInVersion:string}
export interface Claim extends Base {kind:'claim'; subject:Ref; statement:Localized; introducedInVersion:string; status:'current'|'superseded'|'disputed'; supersededBy?:string}
export interface Era extends Base {kind:'era'; start:HistoricalDate; end:HistoricalDate}
export interface GameVersion extends Base {kind:'version'; version:string; releaseDate?:string; status:'planned'|'released'|'demo'|'unknown'|'research-batch'; order:number}
export interface MapGeometry extends Base {kind:'geometry'; geometryType:'point'|'polygon'|'multipolygon'|'path'; points?:[number,number][]; polygons?:[number,number][][]; path?:string}
export interface TerritoryState extends Base {kind:'territory'; entity:Ref; period:{startBP:number;endBP:number}; geometryId:string; geographyConfidence:'confirmed'|'approximate'|'speculative'}
export type Entity = Character|Region|Location|Term|HistoricalEvent|Relationship|Source|Claim|Era|GameVersion|MapGeometry|TerritoryState;
