import fs from 'node:fs';
import {readContent} from './content.mjs';
import {validateContent} from '../lib/validation';
const filename=process.argv[2];if(!filename)throw new Error('Usage: npm run apply-review -- review-decisions.json');
const decisions=JSON.parse(fs.readFileSync(filename,'utf8')) as {reviewed:Record<string,string>;processed:Record<string,string>};const records=readContent();const ids=new Set(records.map(e=>e.id));for(const id of [...Object.keys(decisions.reviewed??{}),...Object.keys(decisions.processed??{})])if(!ids.has(id))throw new Error(`Unknown decision ID: ${id}`);
const updated=records.map(e=>({...e,...(decisions.reviewed?.[e.id]?{lastReviewedInVersion:decisions.reviewed[e.id],reviewStatus:'current'}:{}),...(decisions.processed?.[e.id]?{processingStatus:decisions.processed[e.id]}:{})}));
const errors=validateContent(updated).filter(i=>i.level==='ERROR');if(errors.length)throw new Error(JSON.stringify(errors,null,2));for(let i=0;i<updated.length;i++){if(JSON.stringify(updated[i])===JSON.stringify(records[i]))continue;const {_file,...record}=updated[i];fs.writeFileSync(_file,JSON.stringify(record,null,2)+'\n');console.log(`Updated ${_file}`)}console.log('Review decisions applied. Run npm run validate-content and rebuild.');
