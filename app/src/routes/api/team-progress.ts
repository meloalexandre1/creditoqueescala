import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod";
import {bindings} from "@/lib/bindings.server";
const noStore={"cache-control":"no-store","x-content-type-options":"nosniff"};
const contentId=z.string().regex(/^dia-(0[1-9]|[12]\d|30)$/);
const taskId=z.string().regex(/^op-(foundation|week[1-4])-[a-z0-9-]{2,70}$/);
const input=z.discriminatedUnion("type",[
 z.object({type:z.literal("content"),id:contentId,produced:z.boolean(),published:z.boolean()}),
 z.object({type:z.literal("task"),id:taskId,done:z.boolean()})
]);
const err=(code:number,message:string)=>Response.json({ok:false,message},{status:code,headers:noStore});
export const Route=createFileRoute("/api/team-progress")({server:{handlers:{
 GET:async()=>{
  const db=bindings().DB;if(!db)return err(503,"Banco de progresso indisponível.");
  try{
   const [c,t]=await Promise.all([
    db.prepare("SELECT slug,produced,published,updated_at FROM cqe_content_progress").all(),
    db.prepare("SELECT slug,done,updated_at FROM cqe_task_progress").all()
   ]);
   return Response.json({ok:true,content:c.results||[],tasks:t.results||[]},{headers:noStore});
  }catch{return err(503,"Não foi possível consultar o checklist da equipe.")}
 },
 POST:async({request})=>{
  const origin=request.headers.get("origin");
  if(origin!==new URL(request.url).origin)return err(403,"Origem não permitida.");
  if(Number(request.headers.get("content-length")||"0")>1200)return err(413,"Solicitação muito grande.");
  let raw:unknown;try{raw=await request.json()}catch{return err(400,"Dados inválidos.")}
  const parsed=input.safeParse(raw);if(!parsed.success)return err(400,"Campos inválidos.");
  const db=bindings().DB;if(!db)return err(503,"Banco de progresso indisponível.");
  try{
   const d=parsed.data;
   if(d.type==="content"){
    const published=d.published;
    const produced=d.produced||published;
    await db.prepare("INSERT INTO cqe_content_progress(slug,produced,published,updated_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(slug) DO UPDATE SET produced=excluded.produced,published=excluded.published,updated_at=datetime('now')")
      .bind(d.id,produced?1:0,published?1:0).run();
    return Response.json({ok:true,id:d.id,produced,published},{headers:noStore});
   }
   await db.prepare("INSERT INTO cqe_task_progress(slug,done,updated_at) VALUES(?,?,datetime('now')) ON CONFLICT(slug) DO UPDATE SET done=excluded.done,updated_at=datetime('now')")
     .bind(d.id,d.done?1:0).run();
   return Response.json({ok:true,id:d.id,done:d.done},{headers:noStore});
  }catch{return err(503,"Falha ao salvar. Nenhuma mudança local foi confirmada.")}
 }
}}});
