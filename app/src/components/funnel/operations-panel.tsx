import {useEffect,useMemo,useState} from "react";
import {ArrowRight,Check,ChevronDown,ChevronUp,Download,FileText,KeyRound,LockKeyhole,LogOut,Search,ShieldCheck} from "lucide-react";
import {contentPlan} from "./content-calendar";
import {useTeamProgress} from "@/lib/use-team-progress";
import "./operations-panel.css";
type Lead={id:string;nome:string;telefone:string;email:string;cnpj:string;instagram:string|null;faturamento:string;segmento:string|null;recebiveis:string|null;resposta_1:string;resposta_2:string;resposta_3:string;resposta_4:string;criado_em:string;utm_source:string|null;utm_campaign:string|null;status:string;notas_comerciais:string;proximo_contato:string|null;consentimento_marketing:number};

type Snapshot={ok:boolean;configured?:boolean;authenticated?:boolean;leads?:Lead[];message?:string;truncated?:boolean};
const statusNames:Record<string,string>={novo:"Novo cadastro",em_qualificacao:"Em qualificação",contato_iniciado:"Contato iniciado",reuniao_agendada:"Reunião agendada",reuniao_realizada:"Reunião realizada",proposta_enviada:"Proposta enviada",ganho:"Cliente ganho",perdido:"Perdido"};
const daySlug=(n:number)=>"dia-"+String(n).padStart(2,"0");

async function post(data:Record<string,unknown>):Promise<Snapshot>{
 const resp=await fetch("/api/funnel-admin",{method:"POST",headers:{"content-type":"application/json"},credentials:"same-origin",body:JSON.stringify(data)});
 const out=await resp.json().catch(()=>({ok:false,message:"Resposta inesperada."}));
 if(!resp.ok||!out.ok)throw Error(out.message||"Falha na operação.");
 return out;
}
export function OperationsPanel(){
 const [tab,setTab]=useState<"content"|"leads">("content");
 const [auth,setAuth]=useState(false),[configured,setConfigured]=useState<boolean|null>(null);
 const [password,setPassword]=useState(""),[activationCode,setActivationCode]=useState(""),[confirmPassword,setConfirmPassword]=useState("");
 const [loading,setLoading]=useState(false),[message,setMessage]=useState("");
 const [leads,setLeads]=useState<Lead[]>([]),[truncated,setTruncated]=useState(false);
 const {data:teamProgress,ready:teamReady,error:teamError,updateContent,refresh:refreshTeam}=useTeamProgress();
 const progress=teamProgress.content;
 const [filter,setFilter]=useState("Todos"),[kind,setKind]=useState("Todos"),[search,setSearch]=useState("");
 const [open,setOpen]=useState<number|null>(1),[selected,setSelected]=useState<string|null>(null);
 const [leadSearch,setLeadSearch]=useState(""),[leadFilter,setLeadFilter]=useState("Todos");
 const [draft,setDraft]=useState({status:"novo",notes:"",nextContact:""}),[saving,setSaving]=useState("");
 async function load(){
  setLoading(true);
  try{
   const r=await fetch("/api/funnel-admin",{credentials:"same-origin",cache:"no-store"});
   const v:Snapshot=await r.json();
   if(!r.ok||!v.ok)throw Error(v.message||"Erro ao carregar.");
   setConfigured(Boolean(v.configured));setAuth(Boolean(v.authenticated));
   if(v.authenticated){
    setLeads(v.leads||[]);setTruncated(Boolean(v.truncated));

   }else{setLeads([]);}
  }catch(e){setMessage(e instanceof Error?e.message:"Não foi possível acessar.");setConfigured(false)}
  finally{setLoading(false)}
 }
 useEffect(()=>{void load()},[]);
 async function login(e:React.FormEvent){e.preventDefault();setMessage("");setLoading(true);try{await post({action:"login",password});setPassword("");await load()}catch(e){setMessage(e instanceof Error?e.message:"Login indisponível.")}finally{setLoading(false)}}
 async function activate(e:React.FormEvent){
  e.preventDefault();setMessage("");
  if(password.length<16){setMessage("Use uma senha com pelo menos 16 caracteres.");return}
  if(password!==confirmPassword){setMessage("As duas senhas precisam ser iguais.");return}
  setLoading(true);
  try{
   await post({action:"bootstrap",code:activationCode.trim().toLowerCase(),password});
   setPassword("");setConfirmPassword("");setActivationCode("");await load();
   setMessage("Acesso administrativo ativado! Você já está conectado.");
  }catch(e){setMessage(e instanceof Error?e.message:"Não foi possível ativar o painel.")}
  finally{setLoading(false)}
 }
 async function logout(){try{await post({action:"logout"});setSelected(null);await load()}catch(e){setMessage(e instanceof Error?e.message:"Erro ao sair.")}}
 async function mark(day:number,field:"produced"|"published"){
  if(!teamReady)return;
  await updateContent(daySlug(contentPlan.find(c=>c.day===day)?.sourceDay??day),field);
 }

 const shown=useMemo(()=>contentPlan.filter(c=>(filter==="Todos"||c.stage===filter)&&(kind==="Todos"||c.format===kind)&&
  (c.headline.toLowerCase().includes(search.toLowerCase())||String(c.day).includes(search))),[filter,kind,search]);
 const created=contentPlan.filter(c=>progress[daySlug(c.sourceDay??c.day)]?.produced).length;
 const published=contentPlan.filter(c=>progress[daySlug(c.sourceDay??c.day)]?.published).length;
 const total=contentPlan.length;
 const shownLeads=useMemo(()=>leads.filter(l=>(leadFilter==="Todos"||l.status===leadFilter)&&[l.nome,l.email,l.cnpj,l.telefone,l.segmento||""].join(" ").toLowerCase().includes(leadSearch.toLowerCase())),[leads,leadFilter,leadSearch]);
 const lead=leads.find(l=>l.id===selected);
 function chooseLead(l:Lead){setSelected(l.id);setDraft({status:l.status,notes:l.notas_comerciais||"",nextContact:l.proximo_contato||""})}
 async function saveLead(){if(!lead)return;setSaving(lead.id);setMessage("");
  try{await post({action:"lead",id:lead.id,status:draft.status,notes:draft.notes,nextContact:draft.nextContact});setLeads(x=>x.map(l=>l.id===lead.id?{...l,status:draft.status,notas_comerciais:draft.notes,proximo_contato:draft.nextContact}:l));setMessage("Cadastro atualizado.")}
  catch(e){setMessage(e instanceof Error?e.message:"Não foi possível salvar.")}
  finally{setSaving("")}
 }
 function exportCSV(){
  if(!auth)return;
  const cell=(v:string)=>'"'+v.replace(/^[=+@\-]/,"'$&").replace(/"/g,'""')+'"';
  const rows=[["Nome","WhatsApp","E-mail","CNPJ","Segmento","Faturamento","Recebíveis","Data","Origem","Campanha","Etapa"],...leads.map(l=>[l.nome,l.telefone,l.email,l.cnpj,l.segmento||"",l.faturamento,l.recebiveis||"",l.criado_em,l.utm_source||"",l.utm_campaign||"",l.status])];
  const csv="\ufeff"+rows.map(row=>row.map(cell).join(";")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="credito-que-escala-leads.csv";a.click();URL.revokeObjectURL(url);
 }
 return <section id="operacao" className="fb-ops fb-section"><div className="fb-container">
  <div className="fb-heading"><div><p className="fb-eyebrow">CENTRAL DE OPERAÇÕES</p><h2>Roteiros, produção e oportunidades.</h2></div><p>Planejamento de 45 conteúdos (30 originais + 15 de leitura da legenda) e consulta protegida dos cadastros feitos na página.</p></div>
  <div className="fb-ops-tabs">
   <button className={tab==="content"?"active":""} onClick={()=>setTab("content")}><FileText size={18}/> Conteúdos dos 45 dias</button>
   <button className={tab==="leads"?"active":""} onClick={()=>setTab("leads")}><LockKeyhole size={18}/> Leads {auth?"("+leads.length+")":""}</button>
   {auth&&<button onClick={()=>void logout()}><LogOut size={16}/> Sair</button>}
  </div>
  {(teamError&&tab==="content")&&<p className="fb-ops-message" role="alert">Falha no progresso compartilhado: {teamError} <button onClick={()=>void refreshTeam()}>Tentar novamente</button></p>}
  {message&&<p className="fb-ops-message">{message} <button onClick={()=>setMessage("")}>Fechar</button></p>}
  {tab==="content"?<>
   <div className="fb-ops-stats"><div><small>PLANEJADOS</small><strong>{total}</strong><span>Conteúdos completos</span></div><div><small>PRODUZIDOS</small><strong>{created}/{total}</strong><span>Roteiro pronto ou gravado</span></div><div><small>PUBLICADOS</small><strong>{published}/{total}</strong><span>Entraram no ar</span></div></div>
   <div className="fb-ops-progress"><i style={{width:published/total*100+"%"}}/></div>
   <p className="fb-ops-hint"><ShieldCheck size={15}/>{teamReady?"Produzido e Publicado compartilhados com todos que possuem o link. Atualização automática a cada 12 segundos, ou ao reabrir a aba.":"Carregando o progresso compartilhado..."} <button type="button" onClick={()=>void refreshTeam()}>Atualizar agora</button></p>
   <div className="fb-ops-filters">
    <label><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar título ou dia"/></label>
    <select aria-label="Fase do funil" value={filter} onChange={e=>setFilter(e.target.value)}>{["Todos","Atenção","Educação","Desejo","Conversão"].map(v=><option key={v}>{v}</option>)}</select>
    <select aria-label="Tipo de conteúdo" value={kind} onChange={e=>setKind(e.target.value)}>{["Todos","Reel","Reel · Leia a legenda","Carrossel","Stories"].map(v=><option key={v}>{v}</option>)}</select>
   </div>
   <div className="fb-ops-content">
   {shown.map(c=>{const current=progress[daySlug(c.sourceDay??c.day)]||{produced:false,published:false};return <article key={c.day} className={current.published?"posted":""}>
    <div className="fb-ops-item-top">
     <span className="fb-ops-day">DIA <b>{String(c.day).padStart(2,"0")}</b></span>
     <button className="fb-ops-title" onClick={()=>setOpen(open===c.day?null:c.day)}>
      <span>{c.format} · {c.stage} · {c.owner}</span><strong>{c.headline}</strong><small>{c.aim}</small>
     </button>
     <div className="fb-ops-checks">
      <label><input type="checkbox" checked={current.produced} disabled={!teamReady} onChange={()=>void mark(c.day,"produced")}/><span>Produzido</span></label>
      <label><input type="checkbox" checked={current.published} disabled={!teamReady} onChange={()=>void mark(c.day,"published")}/><span>Publicado</span></label>
     </div>
     <button className="fb-ops-toggle" aria-label="Abrir ou fechar roteiro" onClick={()=>setOpen(open===c.day?null:c.day)}>{open===c.day?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</button>
    </div>
    {open===c.day&&<div className="fb-ops-expanded">
      <div><h4><FileText size={17}/> Roteiro completo</h4>{c.scenes.map((s,i)=><div className="fb-ops-scene" key={i}><b>{String(i+1).padStart(2,"0")}</b><p>{s}</p></div>)}</div>
      <aside><section><h4>ORIENTAÇÃO DE PRODUÇÃO</h4><p>{c.production}</p></section><section><h4>{c.format==="Reel · Leia a legenda"?"LEGENDA COMPLETA · PRONTA PARA PUBLICAR":"IDEIA DE LEGENDA"}</h4><p style={{whiteSpace:"pre-line"}}>{c.caption}</p></section><section><h4>CHAMADA PARA AÇÃO</h4><p>{c.cta}</p></section>
       <button onClick={()=>void navigator.clipboard.writeText([c.headline,...c.scenes,c.production,c.caption,c.cta].join("\n\n")).then(()=>setMessage("Roteiro copiado.")).catch(()=>setMessage("Não foi possível copiar."))}>Copiar roteiro <FileText size={15}/></button>
      </aside>
    </div>}
   </article>})}
   {shown.length===0&&<p className="fb-ops-empty">Nenhum conteúdo encontrado.</p>}
   </div>
  </>:configured===null?<p className="fb-ops-empty">Carregando acesso administrativo...</p>:
   !configured?<form className="fb-ops-gate" onSubmit={e=>void activate(e)}>
     <KeyRound size={34}/>
     <h3>Crie sua senha aqui mesmo</h3>
     <p>Não precisa entrar nas configurações do Higgsfield. Para garantir que apenas uma pessoa autorizada ative o painel, use o código de ativação fornecido nesta conversa. Ele funciona uma única vez.</p>
     <label>Código de ativação (64 caracteres)<input type="text" inputMode="text" autoCapitalize="none" autoComplete="off" spellCheck={false} minLength={64} maxLength={64} pattern="[a-fA-F0-9]{64}" value={activationCode} onChange={e=>setActivationCode(e.target.value)} required placeholder="Cole o código de ativação"/></label>
     <label>Crie sua senha (mínimo de 16 caracteres)<input type="password" autoComplete="new-password" minLength={16} maxLength={250} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Escolha uma senha exclusiva"/></label>
     <label>Confirme sua senha<input type="password" autoComplete="new-password" minLength={16} maxLength={250} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required placeholder="Repita sua senha"/></label>
     <p className="fb-ops-hint"><ShieldCheck size={16}/> A senha não é gravada em texto puro. Após a ativação, o painel fica protegido e somente a senha escolhida poderá abrir os cadastros.</p>
     <button type="submit" disabled={loading}>{loading?"Ativando...":"Ativar meu painel"} <ArrowRight size={16}/></button>
    </form>:
   !auth?<form className="fb-ops-gate" onSubmit={e=>void login(e)}><KeyRound size={34}/><h3>Acesso restrito aos leads</h3><p>Use a senha cadastrada nas configurações do projeto.</p><label>Senha administrativa<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></label><button type="submit" disabled={loading}>{loading?"Verificando...":"Entrar no painel"} <ArrowRight size={16}/></button></form>:
   <div className="fb-ops-leads">
    <div className="fb-ops-stats"><div><small>CADASTROS</small><strong>{leads.length}{truncated?"+":""}</strong></div><div><small>NOVOS</small><strong>{leads.filter(l=>l.status==="novo").length}</strong></div><div><small>REUNIÕES AGENDADAS</small><strong>{leads.filter(l=>l.status==="reuniao_agendada").length}</strong></div></div>
    <div className="fb-ops-filters">
     <label><Search size={16}/><input value={leadSearch} onChange={e=>setLeadSearch(e.target.value)} placeholder="Buscar nome, WhatsApp ou CNPJ"/></label>
     <select value={leadFilter} onChange={e=>setLeadFilter(e.target.value)}><option value="Todos">Todas as etapas</option>{Object.entries(statusNames).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
     <button onClick={exportCSV}><Download size={16}/> Exportar CSV</button><button onClick={()=>void load()}>Atualizar</button>
    </div>
    {truncated&&<p className="fb-ops-hint">Mostrando os 500 cadastros mais recentes.</p>}
    <div className="fb-ops-lead-list">{shownLeads.map(l=><button key={l.id} className={l.id===selected?"active":""} onClick={()=>chooseLead(l)}><span><strong>{l.nome}</strong><small>{l.segmento||"Segmento não informado"} · {l.criado_em}</small></span><em>{statusNames[l.status]||l.status}</em><ChevronDown size={16}/></button>)}{!shownLeads.length&&<p className="fb-ops-empty">Nenhum contato encontrado.</p>}</div>
    {lead&&<div className="fb-ops-lead-detail">
      <div className="fb-ops-detail-heading"><div><small>CADASTRO SELECIONADO</small><h3>{lead.nome}</h3></div><button onClick={()=>setSelected(null)}>Fechar</button></div>
      <div className="fb-ops-facts">
       <div><span>WhatsApp</span><a href={"https://wa.me/55"+lead.telefone.replace(/\D/g,"")} target="_blank" rel="noopener noreferrer">{lead.telefone}</a></div>
       <div><span>E-mail</span><a href={"mailto:"+lead.email}>{lead.email}</a></div>
       <div><span>CNPJ</span><strong>{lead.cnpj}</strong></div>
       <div><span>Instagram</span><strong>{lead.instagram||"—"}</strong></div>
       <div><span>Segmento</span><strong>{lead.segmento||"—"}</strong></div>
       <div><span>Faturamento</span><strong>{lead.faturamento}</strong></div>
       <div><span>Recebíveis</span><strong>{lead.recebiveis||"—"}</strong></div>
       <div><span>Campanha</span><strong>{lead.utm_source||"Direto"} / {lead.utm_campaign||"—"}</strong></div>
       <div><span>Autorizou receber materiais?</span><strong>{lead.consentimento_marketing?"Sim":"Não"}</strong></div>
      </div>
      <h4>Respostas do diagnóstico</h4><div className="fb-ops-answer">{[lead.resposta_1,lead.resposta_2,lead.resposta_3,lead.resposta_4].map((v,i)=><div key={i}><span>{i+1}</span><p>{["Vende a prazo ou tem contratos recorrentes?","Tem carteira diversificada?","Conhece margens e inadimplência?","Consegue reunir documentos e dados?"][i]}</p><strong>{v}</strong></div>)}</div>
      <div className="fb-ops-editor"><h4>Próximas ações comerciais</h4><div className="fb-ops-editor-row"><label>Etapa<select value={draft.status} onChange={e=>setDraft(d=>({...d,status:e.target.value}))}>{Object.entries(statusNames).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label><label>Data do próximo contato<input type="date" value={draft.nextContact} onChange={e=>setDraft(d=>({...d,nextContact:e.target.value}))}/></label></div><label>Notas comerciais<textarea value={draft.notes} onChange={e=>setDraft(d=>({...d,notes:e.target.value}))} maxLength={4000} rows={4} placeholder="Resumo do contato, objeções, próxima ação..."/></label><button onClick={()=>void saveLead()} disabled={saving===lead.id}>{saving===lead.id?"Salvando...":"Salvar alterações"} <Check size={16}/></button></div>
    </div>}
   </div>}
 </div></section>;
}
