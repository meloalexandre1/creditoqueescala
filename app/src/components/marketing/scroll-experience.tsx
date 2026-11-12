import {useEffect} from "react";
export function ScrollExperience(){
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(media.matches)return;
  document.documentElement.classList.add("ce-motion-enabled");
  const targets=Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
  const reveals=Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add("ce-revealed");observer.unobserve(e.target)}}},{threshold:.12,rootMargin:"0px 0px -20px 0px"});
  for(const n of reveals)observer.observe(n);
  let pending=false;
  const measure=()=>{
   pending=false;
   const h=window.innerHeight;
   for(const el of targets){
    const rect=el.getBoundingClientRect();
    if(rect.bottom<0||rect.top>h)continue;
    const strength=Number(el.dataset.parallax||"18");
    const offset=(rect.top+rect.height/2-h/2)/h;
    el.style.setProperty("--ce-parallax",Math.round(Math.max(-1,Math.min(1,offset))*strength)+"px");
   }
  };
  const scroll=()=>{if(!pending){pending=true;window.requestAnimationFrame(measure)}};
  window.addEventListener("scroll",scroll,{passive:true});
  window.addEventListener("resize",scroll,{passive:true});
  measure();
  return()=>{observer.disconnect();window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll)};
 },[]);
 return null;
}
