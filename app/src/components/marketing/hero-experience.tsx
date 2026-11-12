import {useEffect,useRef} from "react";
import {ArrowUpRight,ArrowDownRight} from "lucide-react";
import "./hero-experience.css";

export function HeroExperience({onPrimary}:{onPrimary:()=>void}){
 const container=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=container.current;if(!el)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(reduced.matches)return;
  let scheduled=false;
  const render=()=>{
   scheduled=false;
   const rect=el.getBoundingClientRect();
   const travel=Math.max(1,window.innerHeight*.85);
   const progress=Math.max(0,Math.min(1,-rect.top/travel));
   el.style.setProperty("--hero-progress",String(progress));
  };
  const scroll=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(render)}};
  render();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll,{passive:true});
  return()=>{window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll)};
 },[]);
 return <section className="hero-experience" ref={container} aria-label="Crédito que Escala">
  <div className="hero-pin">
   <div className="hero-backdrop" aria-hidden="true"/>
   <div className="hero-scene" aria-hidden="true">
    <div className="hero-orbit hero-orbit-a"/><div className="hero-orbit hero-orbit-b"/><div className="hero-orbit hero-orbit-c"/>
    <div className="hero-energy hero-energy-a"/><div className="hero-energy hero-energy-b"/>
    <div className="hero-glass hero-glass-a"/><div className="hero-glass hero-glass-b"/>
    <div className="hero-beam"/><div className="hero-horizon"/>
   </div>
   <div className="hero-inner">
    <div className="hero-copy">
     <p className="hero-kicker"><span className="hero-kicker-line"/> CRÉDITO QUE ESCALA <span className="hero-kicker-separator">/</span> MÉTODO EMPRESARIAL</p>
     <h1>Sua empresa vende.<br/><span>Mas o caixa acompanha?</span></h1>
     <p className="hero-summary">No Brasil, vender a prazo faz parte do jogo. O problema é vender sem dominar preço, cobrança, recebíveis e risco. Descubra uma maneira mais inteligente de estruturar sua operação.</p>
     <div className="hero-buttons">
      <button type="button" className="hero-cta" onClick={onPrimary}>Descobrir se tenho perfil <ArrowUpRight size={19}/></button>
      <a href="#solucao" className="hero-discover">Veja o que muda <ArrowDownRight size={18}/></a>
     </div>
     <div className="hero-highlights" aria-label="Componentes do método">
       <div><span>01</span><strong>Conheça seus números</strong><small>Recebíveis, prazos e riscos</small></div>
       <div><span>02</span><strong>Venda com critério</strong><small>Preço, margem e cobrança</small></div>
       <div><span>03</span><strong>Cresça com estrutura</strong><small>Ferramentas, método e equipe</small></div>
     </div>
    </div>
    <div className="hero-side-note" aria-hidden="true"><span>ESTRATÉGIA</span><span>TECNOLOGIA</span><span>CAPACITAÇÃO</span></div>
   </div>
   <div className="hero-scroll-label" aria-hidden="true"><span>EXPLORE A JORNADA</span><div><i/></div></div>
   <div className="hero-progress-bar" aria-hidden="true"><span/></div>
  </div>
 </section>;
}
