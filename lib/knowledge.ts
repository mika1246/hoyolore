import type {Entity, HistoricalDate, HistoricalEvent, Locale, Ref} from './schema';
export function references(e:Entity):Ref[] {
 const refs:Ref[]=[...e.relatedEntities,...e.sources.map(id=>({type:'source' as const,id}))];
 const add=(type:Ref['type'],ids:(string|undefined)[])=>ids.forEach(id=>{if(id)refs.push({type,id})});
 switch(e.kind){
 case 'character':add('region',[e.region]);add('era',e.eras);add('location',e.relatedLocations);add('term',e.relatedTerms);break;
 case 'event':add('region',e.regions);add('location',e.locations);add('character',e.participants);add('term',e.relatedTerms);add('era',[e.era]);add('event',[e.parentEvent,e.memoryNote?.alterationEvent]);if(e.date.type==='relative')add('event',[e.date.after,e.date.before,e.date.during]);break;
 case 'region':add('geometry',[e.geometryId]);break;
 case 'location':add('region',[e.region]);add('location',[e.parentLocation]);add('geometry',[e.geometryId]);break;
 case 'relationship':add('character',[e.sourceCharacter,e.targetCharacter]);if(e.sourceEntity)refs.push(e.sourceEntity);if(e.targetEntity)refs.push(e.targetEntity);break;
 case 'source':refs.push(...e.mentions);break;
 case 'claim':refs.push(e.subject);add('claim',[e.supersededBy]);break;
 case 'era':for(const d of [e.start,e.end])if(d.type==='relative')add('event',[d.after,d.before,d.during]);break;
 case 'territory':refs.push(e.entity);add('geometry',[e.geometryId]);break;
 }
 return refs;
}
export function dateBounds(d:HistoricalDate):[number,number]|null {
 switch(d.type){case 'exact':return[d.yearsBeforePresent,d.yearsBeforePresent];case 'approximate':return[Math.max(0,d.yearsBeforePresent-(d.uncertainty??0)),d.yearsBeforePresent+(d.uncertainty??0)];case 'range':return[d.endBP,d.startBP];case 'before':return[d.yearsBeforePresent,Infinity];case 'after':return[0,d.yearsBeforePresent];default:return null;}
}
export function formatDate(d:HistoricalDate,l:Locale):string {
 const ago=l==='en'?'years ago':'лет до настоящего времени';
 switch(d.type){case 'exact':return `${d.yearsBeforePresent} ${ago}`;case 'approximate':return `~${d.yearsBeforePresent} ${ago}${d.uncertainty?` (±${d.uncertainty})`:''}`;case 'range':return `${d.startBP}–${d.endBP} ${ago}`;case 'before':return `${l==='en'?'Before':'Ранее'} ${d.yearsBeforePresent} BP`;case 'after':return `${l==='en'?'After':'Позднее'} ${d.yearsBeforePresent} BP`;case 'relative':return l==='en'?'Relative chronology':'Относительная хронология';default:return l==='en'?'Unknown date':'Дата неизвестна';}
}
export function inWindow(e:HistoricalEvent,bp:number,width:number){const b=dateBounds(e.date);return b!==null&&b[0]<=bp+width&&b[1]>=Math.max(0,bp-width)}
export function searchRecords(records:Entity[],query:string){const q=query.toLocaleLowerCase().trim();if(!q)return[];return records.filter(e=>!['geometry','version','relationship','claim'].includes(e.kind)).map(e=>{const names=[e.name.en,e.name.ru,...e.alternativeNames,...(e.kind==='term'?e.alternativeTranslations:[])];const primary=names.join(' ').toLocaleLowerCase();const body=primary+' '+e.description.en.toLocaleLowerCase()+' '+e.description.ru.toLocaleLowerCase();const words=primary.split(/[^\p{L}\p{N}]+/u);const exact=names.some(n=>n.toLocaleLowerCase()===q);return {e,score:exact?5:words.includes(q)?4:primary.includes(q)?3:q.split(/\s+/).every(w=>body.includes(w))?2:subsequence(q,primary)?1:0}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.e)}
function subsequence(q:string,s:string){if(q.length<4)return false;let i=0;for(const c of s)if(c===q[i])i++;return i===q.length}
export function citationAudit(records:Entity[]){const ids=new Set(records.filter(e=>e.kind==='source').map(e=>e.id));return records.flatMap(e=>{const issues:string[]=[];if(e.citationNeeded||(['claim','event','relationship','territory'].includes(e.kind)&&!e.sources.length))issues.push('Citation needed');for(const id of e.sources)if(!ids.has(id))issues.push(`Unknown source: ${id}`);return issues.map(reason=>({entity:e,reason}))})}
export function patchImpact(records:Entity[],version:string){
 const order=Object.fromEntries(records.filter(e=>e.kind==='version').map(e=>[e.id,e.order]));const target=order[version]??0;
 const sources=records.filter(e=>e.kind==='source'&&e.introducedInVersion===version);
 const changed=records.filter(e=>e.lastModifiedInVersion===version&&e.kind!=='version');
 const reached=new Set<string>([...sources,...changed].map(e=>e.id));
 // New source mentions and claim subjects are the initial impact edges. Other
 // dependents are found through reverse references, avoiding region-wide fanout.
 for(const e of [...sources,...changed.filter(e=>e.kind==='claim')])for(const r of references(e))reached.add(r.id);
 let grew=true;while(grew){grew=false;for(const e of records)if(!reached.has(e.id)&&references(e).some(r=>reached.has(r.id))){reached.add(e.id);grew=true}}
 const affected=records.filter(e=>reached.has(e.id)&&!['source','version','geometry'].includes(e.kind));
 const review=affected.filter(e=>(order[e.lastReviewedInVersion]??-1)<target||['needs-review','review-recommended','disputed','incomplete'].includes(e.reviewStatus));
 return {sources,changed,affected,review,missing: citationAudit(records),timeline:affected.filter(e=>e.kind==='event'),map:affected.filter(e=>['location','territory','geometry'].includes(e.kind)||e.kind==='event'&&e.locations.length>0)};
}
