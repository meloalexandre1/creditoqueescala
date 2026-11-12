import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod";
import {bindings} from "@/lib/bindings.server";

const yes=z.enum(["Sim","Em parte","Ainda não"]);
const validRevenue=z.enum(["menos_50k","50k_100k","100k_300k","mais_300k"]);
const validReceivables=z.enum(["sem_recebiveis","ate_30k","30k_70k","70k_150k","mais_150k","nao_sei"]);
const validSegments=z.enum(["Cursos e educação","Clínicas e saúde","Atacado / distribuição","Indústria","Transportes / logística","Serviços recorrentes / B2B","Outro segmento"]);
const bodySchema=z.object({
 nome:z.string().trim().min(3).max(120),
 telefone:z.string().regex(/^\d{10,13}$/),
 email:z.email().max(180),
 cnpj:z.string().regex(/^\d{14}$/),
 instagram:z.string().trim().max(100),
 faturamento:validRevenue,
 recebiveis:validReceivables,
 segmento:validSegments,
 answers:z.tuple([yes,yes,yes,yes]),
 consent:z.literal(true),
 marketing:z.boolean().default(false),
 website:z.string().max(100).optional().default(""),
 referrer:z.string().max(250).optional().default(""),
 utm:z.object({
  utm_source:z.string().max(120).optional(),
  utm_medium:z.string().max(120).optional(),
  utm_campaign:z.string().max(120).optional(),
  utm_content:z.string().max(120).optional(),
  utm_term:z.string().max(120).optional()
 }).optional().default({})
});
const json=(message:string,status:number)=>Response.json({ok:false,message},{status,headers:{"cache-control":"no-store"}});
export const Route=createFileRoute("/api/leads")({
 server:{handlers:{POST:async({request})=>{
  const origin=request.headers.get("origin");
  if(origin&&origin!==new URL(request.url).origin)return json("Origem inválida.",403);
  if(Number(request.headers.get("content-length")||"0")>14000)return json("Cadastro excede o limite permitido.",413);
  let raw:unknown;
  try{raw=await request.json()}catch{return json("Dados inválidos.",400)}
  const parsed=bodySchema.safeParse(raw);
  if(!parsed.success)return json("Confira o formulário: WhatsApp com DDD, CNPJ de 14 dígitos e campos obrigatórios.",400);
  const d=parsed.data;
  if(d.website)return Response.json({ok:true});
  const db=bindings().DB;
  if(!db)return json("Cadastro temporariamente indisponível. Tente novamente.",503);
  try{
   const email=d.email.toLowerCase();
   // Reenviar em dez minutos não cria outro lead; preserva a primeira origem da visita.
   const recent=await db.prepare("SELECT id FROM cqe_leads WHERE email=? AND cnpj=? AND criado_em>datetime('now','-10 minutes') LIMIT 1").bind(email,d.cnpj).first();
   if(recent)return Response.json({ok:true},{headers:{"cache-control":"no-store"}});
   await db.prepare(`INSERT INTO cqe_leads (
     id,nome,telefone,email,cnpj,instagram,faturamento,
     resposta_1,resposta_2,resposta_3,resposta_4,
     segmento,recebiveis,consentimento_marketing,referrer,
     utm_source,utm_medium,utm_campaign,utm_content,utm_term
   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(crypto.randomUUID(),d.nome,d.telefone,email,d.cnpj,d.instagram||null,d.faturamento,
      ...d.answers,d.segmento,d.recebiveis,d.marketing?1:0,d.referrer||null,
      d.utm.utm_source||null,d.utm.utm_medium||null,d.utm.utm_campaign||null,d.utm.utm_content||null,d.utm.utm_term||null
    ).run();
   return Response.json({ok:true},{headers:{"cache-control":"no-store"}});
  }catch(error){
   console.error("Lead save failed",error instanceof Error?error.name:"unknown");
   return json("Não foi possível registrar os dados. Tente novamente.",500);
  }
 }}}
});
