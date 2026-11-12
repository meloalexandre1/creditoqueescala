import {bindings} from "@/lib/bindings.server";

const COOKIE="cqe_admin_session";
const SECONDS=8*60*60;
const encode=new TextEncoder();
const base64=(bytes:Uint8Array)=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const from64=(input:string)=>Uint8Array.from(atob(input.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
const safeEqual=(a:Uint8Array,b:Uint8Array)=>{if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a[i]^b[i];return x===0};
const hash=async (input:string)=>new Uint8Array(await crypto.subtle.digest("SHA-256",encode.encode(input)));
export const hexHash=async(input:string)=>Array.from(await hash(input),v=>v.toString(16).padStart(2,"0")).join("");
async function derived(password:string,salt:Uint8Array,iterations=100000){
 const key=await crypto.subtle.importKey("raw",encode.encode(password),"PBKDF2",false,["deriveBits"]);
 const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:new Uint8Array(salt),iterations},key,256);
 return new Uint8Array(bits);
}
export async function adminIsConfigured(){
 const db=bindings().DB;if(!db)return false;
 return Boolean(await db.prepare("SELECT 1 FROM cqe_admin_credentials WHERE id=1 LIMIT 1").first());
}
export async function verifyPassword(password:string){
 const db=bindings().DB;if(!db)return false;
 const row=await db.prepare("SELECT salt,password_hash,iterations FROM cqe_admin_credentials WHERE id=1").first<{salt:string;password_hash:string;iterations:number}>();
 if(!row)return false;
 const given=await derived(password,from64(row.salt),row.iterations);
 return safeEqual(given,from64(row.password_hash));
}
export async function createPasswordHash(password:string){
 const salt=crypto.getRandomValues(new Uint8Array(16));
 const verifier=await derived(password,salt,100000);
 return {salt:base64(salt),password_hash:base64(verifier),iterations:100000};
}
function tokenFromRequest(request:Request){
 const cookie=request.headers.get("cookie")||"";
 const token=cookie.split(";").map(v=>v.trim()).find(v=>v.startsWith(COOKIE+"="))?.slice(COOKIE.length+1);
 return token&&token.length<=150&&/^[A-Za-z0-9_-]+$/.test(token)?token:null;
}
export async function isAdmin(request:Request){
 const db=bindings().DB,token=tokenFromRequest(request);if(!db||!token)return false;
 const tokenHash=await hexHash(token);
 const active=await db.prepare("SELECT 1 FROM cqe_admin_sessions WHERE token_hash=? AND expires_at>datetime('now') LIMIT 1").bind(tokenHash).first();
 return Boolean(active);
}
export async function makeSessionCookie(){
 const db=bindings().DB;if(!db)throw new Error("No DB");
 const token=base64(crypto.getRandomValues(new Uint8Array(32)));
 await db.prepare("INSERT INTO cqe_admin_sessions(token_hash,expires_at) VALUES (?,datetime('now','+8 hours'))").bind(await hexHash(token)).run();
 return COOKIE+"="+token+"; HttpOnly; Secure; SameSite=Strict; Path=/api/funnel-admin; Max-Age="+SECONDS;
}
export async function clearSessionCookie(request:Request){
 const db=bindings().DB,token=tokenFromRequest(request);
 if(db&&token)await db.prepare("DELETE FROM cqe_admin_sessions WHERE token_hash=?").bind(await hexHash(token)).run();
 return COOKIE+"=; HttpOnly; Secure; SameSite=Strict; Path=/api/funnel-admin; Max-Age=0";
}
export async function attemptKey(request:Request){
 const ip=request.headers.get("cf-connecting-ip")||"unknown";
 return hexHash("cqe-admin-attempt-v2:"+ip);
}
