import {useCallback,useEffect,useRef,useState} from "react";
type ContentState={produced:boolean;published:boolean};
type TeamData={content:Record<string,ContentState>;tasks:Record<string,boolean>};
const EMPTY:TeamData={content:{},tasks:{}};
export function useTeamProgress(){
 const [data,setData]=useState<TeamData>(EMPTY);
 const [ready,setReady]=useState(false),[error,setError]=useState("");
 const pending=useRef(new Set<string>());
 const refresh=useCallback(async()=>{
  try{
   const resp=await fetch("/api/team-progress",{cache:"no-store"});
   const json=await resp.json();
   if(!resp.ok||!json.ok)throw new Error(json.message||"Falha na sincronização.");
   const content:TeamData["content"]={};for(const row of json.content||[]){
    if(typeof row.slug==="string")content[row.slug]={produced:!!row.produced,published:!!row.published};
   }
   const tasks:TeamData["tasks"]={};for(const row of json.tasks||[]){
    if(typeof row.slug==="string")tasks[row.slug]=!!row.done;
   }
   setData(old=>{
    // Não sobrescreve operações ainda aguardando confirmação do servidor.
    for(const key of pending.current){
      if(key.startsWith("dia-")&&old.content[key])content[key]=old.content[key];
      if(key.startsWith("op-")&&key in old.tasks)tasks[key]=old.tasks[key];
    }
    return {content,tasks};
   });
   setReady(true);setError("");
  }catch(e){setError(e instanceof Error?e.message:"Erro de conexão");setReady(true)}
 },[]);
 useEffect(()=>{
  void refresh();
  const timer=setInterval(()=>{if(document.visibilityState==="visible")void refresh()},12000);
  const onFocus=()=>{void refresh()};
  window.addEventListener("focus",onFocus);
  return ()=>{clearInterval(timer);window.removeEventListener("focus",onFocus)};
 },[refresh]);
 const updateContent=useCallback(async(id:string,field:"produced"|"published")=>{
  if(pending.current.has(id))return;
  const previous=data.content[id]||{produced:false,published:false};
  const next={...previous,[field]:!previous[field]};
  if(field==="published"&&next.published)next.produced=true;
  if(field==="produced"&&!next.produced)next.published=false;
  pending.current.add(id);
  setData(old=>({...old,content:{...old.content,[id]:next}}));
  try{
   const resp=await fetch("/api/team-progress",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({type:"content",id,...next})});
   const d=await resp.json();if(!resp.ok||!d.ok)throw Error(d.message||"Falha ao salvar conteúdo.");
   setError("");
  }catch(e){setError(e instanceof Error?e.message:"Erro ao salvar")}
  finally{pending.current.delete(id);void refresh()}
 },[data.content,refresh]);
 const updateTask=useCallback(async(id:string)=>{
  if(pending.current.has(id))return;
  const next=!Boolean(data.tasks[id]);
  pending.current.add(id);
  setData(old=>({...old,tasks:{...old.tasks,[id]:next}}));
  try{
   const resp=await fetch("/api/team-progress",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({type:"task",id,done:next})});
   const d=await resp.json();if(!resp.ok||!d.ok)throw Error(d.message||"Falha ao salvar tarefa.");
   setError("");
  }catch(e){setError(e instanceof Error?e.message:"Erro ao salvar")}
  finally{pending.current.delete(id);void refresh()}
 },[data.tasks,refresh]);
 return {data,ready,error,refresh,updateContent,updateTask};
}
