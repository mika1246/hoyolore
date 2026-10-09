import raw from './content.generated.json';
import type {Entity,Kind} from './schema';
export const entities = raw as unknown as Entity[];
export const byId = Object.fromEntries(entities.map(e=>[e.id,e])) as Record<string,Entity>;
export function ofKind<K extends Kind>(kind:K) {return entities.filter((e):e is Extract<Entity,{kind:K}>=>e.kind===kind)}
export const routes:Record<Kind,string>={character:'characters',region:'regions',location:'locations',term:'terminology',event:'events',relationship:'relationships',source:'sources',claim:'claims',era:'eras',version:'versions',geometry:'geometry',territory:'territories'};
export const entityHref=(e:Entity)=>`/${routes[e.kind]}/${e.id}`;
