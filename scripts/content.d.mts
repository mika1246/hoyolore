import type {Entity} from '../lib/schema';
export function readContent(dir?:string): (Entity & {_file:string})[];
