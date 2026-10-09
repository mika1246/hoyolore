import {readContent} from './content.mjs';
import {validateContent} from '../lib/validation';
const records=readContent();const issues=validateContent(records);for(const i of issues){console.log(`${i.level} ${records.find(e=>e.id===i.id)?._file??i.id}\n  ${i.message}`)}
const errors=issues.filter(i=>i.level==='ERROR').length;console.log(`\n${records.length} records · ${errors} errors · ${issues.length-errors} warnings`);process.exitCode=errors?1:0;
