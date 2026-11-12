import {useMemo,useState} from "react";
import {Check,ChevronDown,RefreshCw,ShieldCheck} from "lucide-react";
import {operationalGroups,allTasks} from "./operational-tasks";
import {useTeamProgress} from "@/lib/use-team-progress";
import "./team-tasks.css";
export function TeamTasks(){
 const {data,ready,error,refresh,updateTask}=useTeamProgress();
 const [active,setActive]=useState("foundation");
 const [all,setAll]=useState(false);
 const groups=useMemo(()=>operationalGroups.filter(g=>all||g.id===active),[all,active]);
 const count=allTasks.filter(t=>data.tasks[t.slug]).length;
 return <section id="execucao" className="fb-section fb-light"><div className="fb-container">
  <div className="fb-heading"><div><p className="fb-eyebrow">PLANO OPERACIONAL UNIFICADO</p><h2>Tarefas além do conteúdo.</h2></div><p>Fundação, Instagram, equipe, relacionamento, anúncios, reuniões, propostas e implantação. Os posts são controlados separadamente na central de conteúdo.</p></div>
  <div className="fb-progress-head"><span><b>{count}</b> de {allTasks.length} tarefas concluídas</span><strong>{Math.round(count/allTasks.length*100)}%</strong></div>
  <div className="fb-progress-track"><i style={{width:(count/allTasks.length*100)+"%"}}/></div>
  <div className="fb-tasks-status"><span><ShieldCheck size={15}/> {ready?"Progresso compartilhado com a equipe. Atualização automática a cada 12 segundos.":"Carregando progresso compartilhado..."}</span><button onClick={()=>void refresh()}><RefreshCw size={14}/> Atualizar agora</button></div>
  {error&&<p className="fb-ops-message" role="alert">{error}. Verifique a conexão e tente novamente.</p>}
  <div className="fb-tasks-tabs">
   {operationalGroups.map(g=><button key={g.id} className={!all&&active===g.id?"active":""} onClick={()=>{setActive(g.id);setAll(false)}}>
    <small>{g.id==="foundation"?"FASE 00":"FASE "+g.id.slice(-1)}</small><strong>{g.label}</strong>
   </button>)}
   <button className={all?"active":""} onClick={()=>setAll(true)}><small>VISÃO COMPLETA</small><strong>Todas as tarefas</strong></button>
  </div>
  {groups.map(g=><div className="fb-task-group" key={g.id}>
   <div className="fb-task-group-heading"><h3>{g.label}</h3><p>{g.sub}</p><span>{g.tasks.filter(t=>data.tasks["op-"+g.id+"-"+t.id]).length}/{g.tasks.length}</span></div>
   <div className="fb-task-list">
    {g.tasks.map(t=><article key={t.id} className={data.tasks["op-"+g.id+"-"+t.id]?"done":""}>
     <label className="fb-check"><input type="checkbox" checked={!!data.tasks["op-"+g.id+"-"+t.id]} onChange={()=>void updateTask("op-"+g.id+"-"+t.id)} disabled={!ready}/><span className="fb-checkbox-icon"><Check size={14}/></span></label>
     <div className="fb-task-copy"><div className="fb-task-meta"><span>{t.conditional?"DEPENDE DE DECISÃO":"TAREFA OPERACIONAL"}</span></div><h3>{t.title}</h3><p>{t.detail}</p></div>
     <span className="fb-task-owner">{t.owner}</span>
    </article>)}
   </div>
  </div>)}
  <p className="fb-note">Tarefas adaptadas do plano de execução enviado e do mapa anterior. Aula ao vivo, orçamento de anúncios e seis vagas de piloto são hipóteses a validar, não decisões confirmadas. Qualquer pessoa com o link do mapa pode marcar as tarefas; não há dados de leads nesta visualização.</p>
 </div></section>;
}
