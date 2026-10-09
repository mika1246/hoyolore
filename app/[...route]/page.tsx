import {Archive} from '@/components/archive';
export default async function Page({params}:{params:Promise<{route?:string[]}>}){const {route}=await params;return <Archive route={route}/>}
