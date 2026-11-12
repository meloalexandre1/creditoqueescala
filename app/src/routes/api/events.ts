import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod";
import {bindings} from "@/lib/bindings.server";
const body=z.object({
 name:z.enum(["page_view","diagnostic_start","form_open","lead_success"]),
 source:z.string().max(120).optional(),
 medium:z.string().max(120).optional(),
 campaign:z.string().max(120).optional()
});
export const Route=createFileRoute("/api/events")({server:{handlers:{POST:async({request})=>{
 const origin=request.headers.get("origin");
 if(origin&&origin!==new URL(request.url).origin)return Response.json({ok:false},{status:403});
 if(Number(request.headers.get("content-length")||0)>2000)return Response.json({ok:false},{status:413});
 let raw:unknown;try{raw=await request.json()}catch{return Response.json({ok:false},{status:400})}
 const validated=body.safeParse(raw);
 if(!validated.success)return Response.json({ok:false},{status:400});
 const db=bindings().DB;
 if(!db)return Response.json({ok:false},{status:503});
 try{
  await db.prepare("INSERT INTO cqe_funnel_events(id,event_name,utm_source,utm_medium,utm_campaign) VALUES(?,?,?,?,?)").bind(
    crypto.randomUUID(),validated.data.name,validated.data.source||null,validated.data.medium||null,validated.data.campaign||null
  ).run();
  return Response.json({ok:true});
 }catch{return Response.json({ok:false},{status:503})}
}}}});
