import fs from 'node:fs';
import path from 'node:path';
export function readContent(dir='content') {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?readContent(path.join(dir,f.name)):f.name.endsWith('.json')?[{...JSON.parse(fs.readFileSync(path.join(dir,f.name),'utf8')),_file:path.join(dir,f.name)}]:[])}
const records=readContent();
fs.writeFileSync('lib/content.generated.json',JSON.stringify(records,null,2)+'\n');
console.log(`Indexed ${records.length} content records.`);
