import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod";
import {bindings} from "@/lib/bindings.server";
import {adminIsConfigured,attemptKey,clearSessionCookie,isAdmin,makeSessionCookie,verifyPassword,hexHash,createPasswordHash} from "@/lib/funnel-admin-auth.server";

const noStore={"Cache-Control":"private, no-store, max-age=0","X-Content-Type-Options":"nosniff"};
const reject=(status:number,message:string)=>Response.json({ok:false,message},{status,headers:noStore});
const statusValues=z.enum(["novo","em_qualificacao","contato_iniciado","reuniao_agendada","reuniao_realizada","proposta_enviada","ganho","perdido"]);
const payload=z.discriminatedUnion("action",[
 z.object({action:z.literal("login"),password:z.string().min(1).max(250)}),
 z.object({action:z.literal("bootstrap"),code:z.string().regex(/^[a-f0-9]{64}$/),password:z.string().min(16).max(250)}),
 z.object({action:z.literal("logout")}),
 z.object({action:z.literal("content"),slug:z.string().regex(/^dia-(0[1-9]|[12][0-9]|30)$/),produced:z.boolean(),published:z.boolean()}),
 z.object({action:z.literal("lead"),id:z.uuid(),status:statusValues,notes:z.string().max(4000),nextContact:z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/),z.literal("")])})
]);

export const Route=createFileRoute("/api/funnel-admin")({
 server:{handlers:{
  GET:async({request})=>{
   if(!await adminIsConfigured())return Response.json({ok:true,configured:false,authenticated:false},{headers:noStore});
   if(!await isAdmin(request))return Response.json({ok:true,configured:true,authenticated:false},{headers:noStore});
   const db=bindings().DB;
   if(!db)return reject(503,"Banco de dados indisponível.");
   try{
    const [leadRows,progressRows,statsRows]=await Promise.all([
     db.prepare(`SELECT id,nome,telefone,email,cnpj,instagram,faturamento,segmento,recebiveis,
       resposta_1,resposta_2,resposta_3,resposta_4,
       criado_em,utm_source,utm_medium,utm_campaign,utm_content,utm_term,
       status,notas_comerciais,proximo_contato,consentimento_marketing
       FROM cqe_leads ORDER BY criado_em DESC LIMIT 500`).all(),
     db.prepare("SELECT slug,produced,published,updated_at FROM cqe_content_progress").all(),
     db.prepare("SELECT status,COUNT(*) AS total FROM cqe_leads GROUP BY status").all()
    ]);
    return Response.json({ok:true,configured:true,authenticated:true,
      leads:leadRows.results||[],progress:progressRows.results||[],stats:statsRows.results||[],
      truncated:(leadRows.results||[]).length>=500
     },{headers:noStore});
   }catch{return reject(503,"Não foi possível carregar os dados administrativos.")}
  },
  POST:async({request})=>{
   const origin=request.headers.get("origin");
   if(origin!==new URL(request.url).origin)return reject(403,"Origem inválida.");
   if(Number(request.headers.get("content-length")||"0")>6000)return reject(413,"Solicitação excede o limite.");
   let raw:unknown;try{raw=await request.json()}catch{return reject(400,"Dados inválidos.")}
   const parsed=payload.safeParse(raw);
   if(!parsed.success)return reject(400,"Dados inválidos.");
   const db=bindings().DB;
   if(!db)return reject(503,"Banco de dados indisponível.");
   const data=parsed.data;
   if(data.action==="bootstrap"){
    const key=await attemptKey(request);
    try{
     if(await adminIsConfigured())return reject(409,"O administrador já foi ativado. Faça login.");
     const prev=await db.prepare("SELECT attempts FROM cqe_admin_attempts WHERE identifier=? AND updated_at>datetime('now','-20 minutes')").bind(key).first<{attempts:number}>();
     if(prev&&prev.attempts>=8)return reject(429,"Muitas tentativas. Tente novamente mais tarde.");
     const secret=await db.prepare("SELECT code_hash FROM cqe_admin_bootstrap WHERE id=1 AND used_at IS NULL AND expires_at>datetime('now')").first<{code_hash:string}>();
     const candidate=await hexHash(data.code);
     if(!secret||candidate!==secret.code_hash){
      await db.prepare(`INSERT INTO cqe_admin_attempts(identifier,attempts,updated_at) VALUES(?,1,datetime('now'))
        ON CONFLICT(identifier) DO UPDATE SET attempts=CASE WHEN updated_at>datetime('now','-20 minutes') THEN attempts+1 ELSE 1 END,updated_at=datetime('now')`).bind(key).run();
      return reject(401,"Código inválido ou expirado.");
     }
     const hashed=await createPasswordHash(data.password);
     const inserted=await db.prepare("INSERT OR IGNORE INTO cqe_admin_credentials(id,salt,password_hash,iterations) VALUES (1,?,?,?)")
       .bind(hashed.salt,hashed.password_hash,hashed.iterations).run();
     if(!inserted.meta.changes)return reject(409,"Conta já ativada.");
     await db.prepare("UPDATE cqe_admin_bootstrap SET used_at=datetime('now') WHERE id=1 AND used_at IS NULL").run();
     await db.prepare("DELETE FROM cqe_admin_attempts WHERE identifier=?").bind(key).run();
     return Response.json({ok:true},{headers:{...noStore,"Set-Cookie":await makeSessionCookie()}});
    }catch{return reject(503,"Não foi possível concluir a ativação.")}
   }
   if(data.action==="login"){
    if(!await adminIsConfigured())return reject(503,"A senha ainda não foi criada. Faça a ativação inicial no painel.");
    const key=await attemptKey(request);
    try{
     const prev=await db.prepare("SELECT attempts FROM cqe_admin_attempts WHERE identifier=? AND updated_at>datetime('now','-20 minutes')").bind(key).first<{attempts:number}>();
     if(prev&&prev.attempts>=8)return reject(429,"Muitas tentativas. Tente novamente mais tarde.");
     if(!await verifyPassword(data.password)){
      await db.prepare(`INSERT INTO cqe_admin_attempts(identifier,attempts,updated_at) VALUES(?,1,datetime('now'))
        ON CONFLICT(identifier) DO UPDATE SET
        attempts=CASE WHEN updated_at>datetime('now','-20 minutes') THEN attempts+1 ELSE 1 END,
        updated_at=datetime('now')`).bind(key).run();
      return reject(401,"Senha incorreta.");
     }
     await db.prepare("DELETE FROM cqe_admin_attempts WHERE identifier=?").bind(key).run();
     return Response.json({ok:true},{headers:{...noStore,"Set-Cookie":await makeSessionCookie()}});
    }catch{return reject(503,"Autenticação indisponível.")}
   }
   if(!await isAdmin(request))return reject(401,"Acesso administrativo necessário.");
   if(data.action==="logout")return Response.json({ok:true},{headers:{...noStore,"Set-Cookie":await clearSessionCookie(request)}});
   try{
    if(data.action==="content"){
     await db.prepare(`INSERT INTO cqe_content_progress(slug,produced,published,updated_at)
       VALUES(?,?,?,datetime('now')) ON CONFLICT(slug) DO UPDATE SET
       produced=excluded.produced,published=excluded.published,updated_at=datetime('now')`)
      .bind(data.slug,data.produced?1:0,data.published?1:0).run();
     return Response.json({ok:true},{headers:noStore});
    }
    if(data.action==="lead"){
     const out=await db.prepare(`UPDATE cqe_leads SET status=?,notas_comerciais=?,proximo_contato=?,
       atualizado_em=datetime('now') WHERE id=?`)
       .bind(data.status,data.notes,data.nextContact||null,data.id).run();
     if(!out.meta.changes)return reject(404,"Lead não encontrado.");
     await db.prepare("INSERT INTO cqe_lead_atividades (id,lead_id,tipo,descricao) VALUES (?,?,?,?)")
       .bind(crypto.randomUUID(),data.id,"atualizacao","Etapa atualizada para "+data.status).run();
     return Response.json({ok:true},{headers:noStore});
    }
    return reject(400,"Ação inválida.");
   }catch{return reject(503,"Não foi possível salvar a alteração.")}
  }
 }}
});
