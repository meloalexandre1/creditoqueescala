import {useId, useMemo, useState} from "react";
import {ArrowUpRight, TrendingUp, Info} from "lucide-react";

const money=(n:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(n);
const compact=(n:number)=>{
 if(n>=1e9)return "R$ "+(n/1e9).toLocaleString("pt-BR",{maximumFractionDigits:2})+" bi";
 if(n>=1e6)return "R$ "+(n/1e6).toLocaleString("pt-BR",{maximumFractionDigits:2})+" mi";
 if(n>=1e3)return "R$ "+(n/1e3).toLocaleString("pt-BR",{maximumFractionDigits:0})+" mil";
 return money(n);
};

function Chart({initial,rate,months}:{initial:number;rate:number;months:number}){
 const chartId=useId().replace(/:/g,"");
 const values=Array.from({length:months+1},(_,i)=>initial*Math.pow(1+rate/100,i));
 const max=Math.max(...values)*1.13;
 const X=(i:number)=>58+i/months*585;
 const Y=(value:number)=>249-210*value/max;
 const path=values.map((val,i)=>(i===0?"M":"L")+X(i).toFixed(2)+","+Y(val).toFixed(2)).join(" ");
 const final=values[months];
 const ticks=[0,Math.round(months/4),Math.round(months/2),Math.round(months*3/4),months].filter((v,i,arr)=>arr.indexOf(v)===i);
 return <div className="ce-growth-graph-wrap">
  <div className="ce-chart-legend"><span><i className="ce-legend-comp"/>Faturamento mensal projetado</span></div>
  <svg className="ce-growth-svg" viewBox="0 0 690 305" role="img" aria-label={"Curva de crescimento composto de "+rate+"% ao mês, de "+money(initial)+" para "+money(final)+" em "+months+" meses."}>
   <defs><linearGradient id={"ce-fill-"+chartId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#346ded" stopOpacity=".28"/><stop offset="100%" stopColor="#346ded" stopOpacity="0"/></linearGradient></defs>
   {[0,.25,.5,.75,1].map(v=><g key={v}>
    <line x1="58" x2="647" y1={249-210*v} y2={249-210*v} stroke="#c6d6ec" strokeDasharray="4 6"/>
    <text x="49" y={253-210*v} fill="#7383a3" fontSize="11" textAnchor="end">{compact(max*v)}</text>
   </g>)}
   <path d={path+" L"+X(months)+",249 L58,249 Z"} fill={"url(#ce-fill-"+chartId+")"}/>
   <path d={path} fill="none" stroke="#2b61cf" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round"/>
   <circle cx={X(months)} cy={Y(final)} r="6.5" fill="#2b61cf" stroke="#f4f7ff" strokeWidth="3"/>
   {ticks.map(v=><text key={v} x={X(v)} y="277" fontSize="12" fill="#607492" textAnchor="middle">{v}m</text>)}
  </svg>
 </div>;
}

export function GrowthSimulator(){
 const [initial,setInitial]=useState(100000);
 const [rate,setRate]=useState(3);
 const [months,setMonths]=useState(36);
 const compounded=initial*Math.pow(1+rate/100,months);
 const factor=compounded/initial;
 const doubling=rate>0?Math.ceil(Math.log(2)/Math.log(1+rate/100)):null;
 const cumulative=useMemo(()=>Array.from({length:months},(_,i)=>initial*Math.pow(1+rate/100,i+1)).reduce((a,b)=>a+b,0),[initial,rate,months]);
 return <section className="ce-growth" id="simulacao"><div className="ce-container">
  <div className="ce-growth-heading" data-reveal><p className="ce-overline">O PODER DA CONSTÂNCIA</p><h2>Pequenos avanços.<br/><em>Resultados exponenciais.</em></h2>
   <p>Veja como crescer 2%, 3% ou 5% ao mês pode transformar o faturamento de uma empresa ao longo do tempo. Ajuste o valor inicial, a taxa e o período para acompanhar a curva.</p>
  </div>
  <div className="ce-growth-layout">
   <div className="ce-growth-controls" data-reveal>
    <div className="ce-growth-controls-head"><TrendingUp size={25}/><strong>Simulador de crescimento</strong><span>INTERATIVO</span></div>
    <div className="ce-growth-field"><label htmlFor="g-initial">Faturamento mensal atual <strong>{money(initial)}</strong></label><input id="g-initial" type="range" min="10000" max="500000" step="10000" value={initial} onChange={e=>setInitial(+e.target.value)}/></div>
    <div className="ce-growth-field"><label htmlFor="g-rate">Taxa de crescimento mensal <strong>{rate.toLocaleString("pt-BR")}%</strong></label><input id="g-rate" type="range" min="0" max="5" step="0.5" value={rate} onChange={e=>setRate(+e.target.value)}/></div>
    <div className="ce-growth-field"><label htmlFor="g-time">Período da projeção <strong>{months} {months===1?"mês":"meses"}</strong></label><input id="g-time" type="range" min="1" max="60" step="1" value={months} onChange={e=>setMonths(+e.target.value)}/><div className="ce-time-presets">{[12,36,60].map(v=><button type="button" className={months===v?"current":""} onClick={()=>setMonths(v)} key={v}>{v===12?"1 ano":v===36?"3 anos":"5 anos"}</button>)}</div></div>
    <div className="ce-growth-math">Faturamento no mês N = faturamento atual × (1 + taxa mensal)<sup>N</sup>.</div>
   </div>
   <div className="ce-growth-results" data-reveal>
    <div className="ce-growth-results-top"><span>FATURAMENTO MENSAL PROJETADO</span><strong>{months} {months===1?"MÊS":"MESES"}</strong></div>
    <div className="ce-growth-main-number">{money(compounded)}<small>/ mês</small></div>
    <p className="ce-growth-compare">{compact(initial)} hoje <ArrowUpRight size={16}/> {rate.toLocaleString("pt-BR")}% ao mês por {months} meses</p>
    <Chart initial={initial} rate={rate} months={months}/>
    <div className="ce-growth-facts">
     <div><span>Multiplicação do faturamento</span><strong>{factor.toLocaleString("pt-BR",{maximumFractionDigits:2})}×</strong></div>
     <div><span>Tempo para dobrar</span><strong>{doubling?doubling+" meses":"Sem duplicação"}</strong></div>
     <div><span>Faturamento acumulado na projeção</span><strong>{compact(cumulative)}</strong></div>
    </div>
   </div>
  </div>
  <p className="ce-growth-disclaimer"><Info size={16}/> Cenário exclusivamente matemático e ilustrativo de faturamento, não de lucro ou juros financeiros. Manter a mesma taxa de crescimento todos os meses é uma hipótese que pode não ocorrer na prática. Não inclui custos, impostos, investimentos, margens, sazonalidade ou capacidade operacional. Não representa promessa de resultado.</p>
 </div></section>;
}
