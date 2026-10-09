'use client';
import {useCallback,useMemo,useSyncExternalStore,type SetStateAction} from 'react';
const changed='teyvat-storage-change';
const subscribe=(callback:()=>void)=>{window.addEventListener('storage',callback);window.addEventListener(changed,callback);return()=>{window.removeEventListener('storage',callback);window.removeEventListener(changed,callback)}};
export function useStoredState<T>(key:string,initial:T,session=false):[T,(value:SetStateAction<T>)=>void]{
 const initialJson=JSON.stringify(initial);
 const getSnapshot=useCallback(()=>{try{return(session?sessionStorage:localStorage).getItem(key)??initialJson}catch{return initialJson}},[key,session,initialJson]);
 const snapshot=useSyncExternalStore(subscribe,getSnapshot,()=>initialJson);
 const value=useMemo(()=>{try{return JSON.parse(snapshot) as T}catch{return initial}},[snapshot,initial]);
 const setValue=(update:SetStateAction<T>)=>{const next=typeof update==='function'?(update as (v:T)=>T)(value):update;try{(session?sessionStorage:localStorage).setItem(key,JSON.stringify(next));window.dispatchEvent(new Event(changed))}catch{/* Storage is unavailable; no durable local decisions are claimed. */}};
 return [value,setValue];
}
