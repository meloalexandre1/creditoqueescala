import {createFileRoute} from "@tanstack/react-router";
import {useMemo,useState} from "react";
import {ArrowRight,Calculator,Check,ChevronDown,ClipboardCopy,Info,Printer,ShieldCheck,TrendingDown} from "lucide-react";
import "./calculadora.css";

export const Route=createFileRoute("/calculadora")({
 head:()=>({meta:[
 {title:"Calculadora de Venda a Prazo | Crédito que Escala"},
 {name:"description",content:"Descubra o impacto de vender a prazo nos recebíveis e no resultado econômico estimado de uma venda. Ferramenta gratuita do Crédito que Escala."}
 ]}),
 component:CalculatorPage
});
const brl=(n:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number.isFinite(n)?n:0);
const pct=(n:number)=>new Intl.NumberFormat("pt-BR",{maximumFractionDigits:1}).format(Number.isFinite(n)?n:0)+"%";
const bounded=(n:number,min:number,max:number)=>Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;
type Inputs={price:number;direct:number;other:number;tax:number;fees:number;entry:number;installments:number;first:number;capital:number;risk:number};
const defaults:Inputs={price:10000,direct:5900,other:400,tax:8,fees:2,entry:0,installments:6,first:1,capital:2,risk:2};
export function compute(v:Inputs){
 const upfront=v.price*v.entry/100;
 const nominal=(v.price-upfront)/v.installments;
 const rows=Array.from({length:v.installments},(_,i)=>{
  const month=v.first+i;
  const expected=nominal*(1-v.risk/100);
  return {month,nominal,expected,present:expected/Math.pow(1+v.capital/100,month)};
 });
 const expected=upfront+rows.reduce((s,x)=>s+x.expected,0);
 const present=upfront+rows.reduce((s,x)=>s+x.present,0);
 const direct=v.direct+v.other;
 const variable=v.price*(v.tax+v.fees)/100;
 const cashProfit=v.price-direct-variable;
 const profit=present-direct-variable;
 const factor=v.price>0?present/v.price:0;
 const denom=factor-(v.tax+v.fees)/100;
 const equivalent=denom>0.000001?v.price*(1-(v.tax+v.fees)/100)/denom:null;
 return {rows,upfront,expected,present,direct,variable,cashProfit,profit,
  impact:v.price-present,loss:v.price-expected,timeCost:expected-present,
  cashMargin:v.price>0?100*cashProfit/v.price:0,margin:present>0?100*profit/present:0,equivalent};
}
function NumberField({label,value,change,min=0,max=1e9,step=0.1,prefix="",suffix="",hint=""}:{label:string;value:number;change:(x:number)=>void;min?:number;max?:number;step?:number;prefix?:string;suffix?:string;hint?:string}){
 return <label className="qce-field"><span>{label}</span><span className="qce-input">{prefix&&<b>{prefix}</b>}<input aria-label={label} inputMode="decimal" type="number" min={min} max={max} step={step} value={value} onChange={e=>change(bounded(Number(e.target.value),min,max))}/>{suffix&&<b>{suffix}</b>}</span>{hint&&<small>{hint}</small>}</label>;
}

function PrintableReport({v,result}:{v:Inputs;result:ReturnType<typeof compute>}){
 return <article className="qce-print-report" aria-label="Relatório da simulação para impressão">
  <header className="qce-print-header">
   <div className="qce-print-brand"><span className="qce-print-logo">↗</span><div><strong>CRÉDITO QUE ESCALA</strong><small>ESTRATÉGIA · GESTÃO · CRESCIMENTO</small></div></div>
   <span className="qce-print-document-type">RELATÓRIO DE SIMULAÇÃO<br/>VENDA A PRAZO</span>
  </header>
  <div className="qce-print-cover">
   <p>ANÁLISE FINANCEIRA ILUSTRATIVA</p>
   <h2>O que acontece com o resultado<br/>quando você vende a prazo?</h2>
   <span>Comparativo do valor nominal da venda, do resultado à vista e do valor econômico estimado do recebimento parcelado.</span>
  </div>
  <section className="qce-print-summary">
   <div className="qce-print-primary"><small>RESULTADO ECONÔMICO ESTIMADO A PRAZO</small><strong>{brl(result.profit)}</strong><span>Resultado à vista: <b>{brl(result.cashProfit)}</b></span></div>
   <div className="qce-print-primary qce-print-primary-light"><small>IMPACTO ESTIMADO DE PRAZO E RISCO</small><strong>{brl(result.impact)}</strong><span>{v.price>0?pct(result.impact/v.price*100):"0%"} do preço de venda</span></div>
  </section>
  <section className="qce-print-block">
   <h3><span>01</span> Indicadores da simulação</h3>
   <div className="qce-print-kpis">
    <div><span>Valor nominal da venda</span><strong>{brl(v.price)}</strong></div>
    <div><span>Valor presente estimado</span><strong>{brl(result.present)}</strong></div>
    <div><span>Margem estimada à vista</span><strong>{pct(result.cashMargin)}</strong></div>
    <div><span>Margem econômica a prazo</span><strong>{pct(result.margin)}</strong></div>
   </div>
   <div className="qce-print-bars">
    <div><div><span>Preço nominal</span><b>{brl(v.price)}</b></div><i><em style={{width:Math.min(100,v.price/Math.max(1,v.price)*100)+"%"}}/></i></div>
    <div><div><span>Valor econômico dos recebimentos</span><b>{brl(result.present)}</b></div><i><em className="alternate" style={{width:Math.min(100,result.present/Math.max(1,v.price)*100)+"%"}}/></i></div>
   </div>
  </section>
  <section className="qce-print-block">
   <h3><span>02</span> Premissas consideradas</h3>
   <div className="qce-print-assumptions">
    <div><span>Preço</span><strong>{brl(v.price)}</strong></div>
    <div><span>Custos diretos + adicionais</span><strong>{brl(result.direct)}</strong></div>
    <div><span>Impostos estimados</span><strong>{pct(v.tax)}</strong></div>
    <div><span>Taxas e comissões</span><strong>{pct(v.fees)}</strong></div>
    <div><span>Entrada recebida hoje</span><strong>{pct(v.entry)}</strong></div>
    <div><span>Parcelamento</span><strong>{v.installments}x mensais</strong></div>
    <div><span>Primeiro vencimento</span><strong>{v.first===0?"Hoje":v.first+" mês(es)"}</strong></div>
    <div><span>Custo de capital ao mês</span><strong>{pct(v.capital)}</strong></div>
    <div><span>Perda esperada por inadimplência</span><strong>{pct(v.risk)}</strong></div>
   </div>
  </section>
  <div className="qce-print-takeaway">
   <small>REFERÊNCIA PARA A NEGOCIAÇÃO</small>
   <p>Preço parcelado estimado para preservar o resultado econômico da venda atual à vista:</p>
   <strong>{result.equivalent===null?"Não calculável com as premissas informadas":brl(result.equivalent)}</strong>
  </div>
  <div className="qce-print-disclosure">Simulação educacional e não uma recomendação de preço, crédito ou promessa de resultado. Os valores dependem das hipóteses informadas e não incorporam regras tributárias específicas, recuperação de cobranças ou condições contratuais de antecipação.</div>
  <section className="qce-print-page-two">
   <div className="qce-print-second-head">
    <p>DETALHAMENTO TÉCNICO</p><h2>Memória de cálculo</h2>
    <span>Valores apresentados em reais, com parcelas mensais iguais e risco de não pagamento uniforme.</span>
   </div>
   <div className="qce-print-technical">
    <div><span>Entrada recebida no momento da venda</span><strong>{brl(result.upfront)}</strong></div>
    <div><span>Valor nominal das parcelas</span><strong>{brl(v.price-result.upfront)}</strong></div>
    <div><span>Total esperado a receber</span><strong>{brl(result.expected)}</strong></div>
    <div><span>Valor presente estimado dos recebimentos</span><strong>{brl(result.present)}</strong></div>
    <div><span>Custos fixos da venda</span><strong>− {brl(result.direct)}</strong></div>
    <div><span>Impostos e taxas estimados</span><strong>− {brl(result.variable)}</strong></div>
    <div className="qce-print-technical-total"><span>Resultado econômico a prazo</span><strong>{brl(result.profit)}</strong></div>
   </div>
   <h3 className="qce-print-table-title">Cronograma estimado de recebimentos</h3>
   <table className="qce-print-table"><thead><tr><th>Vencimento</th><th>Parcela nominal</th><th>Recebimento esperado</th><th>Valor presente estimado</th></tr></thead>
    <tbody>{result.rows.map((r,i)=><tr key={i}><td>{r.month===0?"Hoje":"Mês "+r.month}</td><td>{brl(r.nominal)}</td><td>{brl(r.expected)}</td><td>{brl(r.present)}</td></tr>)}</tbody>
    <tfoot><tr><td>Total com entrada</td><td>{brl(v.price)}</td><td>{brl(result.expected)}</td><td>{brl(result.present)}</td></tr></tfoot>
   </table>
   <div className="qce-print-methodology">
    <h4>Como interpretar</h4>
    <p>O recebimento esperado aplica a perda percentual estimada às parcelas, sem afetar a entrada. O valor presente desconta esses recebimentos pelo custo mensal de capital informado. Do valor presente são subtraídos os custos diretos, adicionais, impostos e taxas para estimar o resultado econômico a prazo.</p>
    <p>Os custos percentuais incidem sobre o preço nominal total nesta simulação. A taxa de perda é uma hipótese sobre valores não recuperados, não uma previsão individualizada.</p>
   </div>
   <div className="qce-print-end">
    <strong>CRÉDITO QUE ESCALA</strong><span>Transforme a análise em decisão. Conheça o pré-diagnóstico da sua operação.</span><small>creditoqueescala.higgsfield.app</small>
   </div>
  </section>
 </article>;
}

function CalculatorPage(){
 const [v,setV]=useState<Inputs>(defaults);
 const [show,setShow]=useState(false),[copied,setCopied]=useState(false);
 const [feedback,setFeedback]=useState("");
 const result=useMemo(()=>compute(v),[v]);
 const set=(key:keyof Inputs,value:number)=>{setV(old=>({...old,[key]:value}));setCopied(false)};
 const report=[
  "CRÉDITO QUE ESCALA • Calculadora de venda a prazo",
  "Preço: "+brl(v.price),"Custos diretos e adicionais: "+brl(result.direct),
  "Impostos sobre preço: "+pct(v.tax),"Taxas sobre preço: "+pct(v.fees),
  "Entrada: "+pct(v.entry),"Parcelas: "+v.installments,"Primeiro vencimento: mês "+v.first,
  "Custo mensal do capital: "+pct(v.capital),"Perda esperada das parcelas: "+pct(v.risk),
  "Recebimento esperado: "+brl(result.expected),
  "Valor presente dos recebimentos: "+brl(result.present),
  "Impacto estimado do prazo e risco: "+brl(result.impact),
  "Lucro aproximado à vista: "+brl(result.cashProfit),
  "Resultado econômico a prazo: "+brl(result.profit),
  "Margem econômica a prazo: "+pct(result.margin),
  "Preço estimado para preservar lucro à vista: "+(result.equivalent===null?"Não calculável":brl(result.equivalent)),
  "Simulação educativa. Não indica preço ideal, taxa bancária, promessa de resultado ou aprovação de crédito.",
  "creditoqueescala.higgsfield.app/calculadora"
 ].join("\n");
 const barsMax=Math.max(1,v.price);
 const ratio=(n:number)=>String(Math.max(0,Math.min(100,n/barsMax*100)))+"%";
 async function copy(){try{await navigator.clipboard.writeText(report);setCopied(true);setFeedback("")}catch{setFeedback("Não foi possível copiar automaticamente. Use a opção de impressão.")}}
 return <div className="qce">
  <header className="qce-nav"><a href="/" className="qce-logo"><span>↗</span> CRÉDITO QUE <b>ESCALA</b></a><nav><a href="/">O programa</a><a href="/#diagnostico">Pré-diagnóstico</a></nav><a className="qce-nav-cta" href="/#diagnostico">Avaliar minha empresa <ArrowRight size={16}/></a></header>
  <main>
   <section className="qce-hero"><div className="qce-container qce-hero-grid"><div><p className="qce-eyebrow">FERRAMENTA GRATUITA · CRÉDITO QUE ESCALA</p><h1>Você sabe quanto <em>custa vender a prazo?</em></h1><p>Uma venda pode parecer lucrativa no pedido. Mas o prazo para receber, as taxas e os riscos podem mudar a conta. Descubra o impacto antes de negociar.</p><div className="qce-hero-chips"><span><Check size={15}/> Resultado instantâneo</span><span><Check size={15}/> Sem cadastro obrigatório</span><span><Check size={15}/> Valores ajustáveis</span></div></div><div className="qce-hero-art" aria-hidden="true"><div className="qce-orbit"/><div className="qce-orbit smaller"/><div className="qce-hero-callout"><small>DA VENDA AO CAIXA</small><strong>Faturamento <em>≠</em> recebimento</strong><span>VENDA · PRAZO · MARGEM</span></div></div></div></section>
   <section className="qce-body" id="simular"><div className="qce-container"><div className="qce-section-head"><div><p className="qce-eyebrow">CALCULADORA INTERATIVA</p><h2>Coloque sua venda na ponta do lápis.</h2></div><p>Começamos com um exemplo fictício. Ajuste os campos para comparar o resultado de receber à vista com o valor econômico estimado de receber a prazo.</p></div>
   <div className="qce-main-grid">
    <div className="qce-panel qce-fields">
     <h3><Calculator size={22}/> 01. Dados da venda</h3>
     <NumberField label="Preço total da venda" prefix="R$" value={v.price} step={100} change={x=>set("price",x)}/>
     <NumberField label="Custo direto do produto ou serviço" prefix="R$" value={v.direct} step={100} change={x=>set("direct",x)} hint="Custo para produzir, adquirir ou entregar a venda."/>
     <NumberField label="Outros custos fixos da operação" prefix="R$" value={v.other} step={50} change={x=>set("other",x)} hint="Ex.: frete e comissão fixa; não repita despesas já incluídas."/>
     <div className="qce-two"><NumberField label="Impostos estimados" suffix="%" value={v.tax} max={100} change={x=>set("tax",x)} hint="Alíquota efetiva estimada sobre o preço."/><NumberField label="Taxas e comissões" suffix="%" value={v.fees} max={100} change={x=>set("fees",x)} hint="Percentual adicional sobre o preço." /></div>
     <h3 className="qce-second"><Calculator size={22}/> 02. Condições de recebimento</h3>
     <div className="qce-two"><NumberField label="Entrada recebida hoje" suffix="%" value={v.entry} max={100} change={x=>set("entry",x)}/><NumberField label="Número de parcelas" suffix="x" value={v.installments} min={1} max={36} step={1} change={x=>set("installments",Math.round(x))}/></div>
     <div className="qce-two"><label className="qce-field"><span>Primeiro vencimento</span><span className="qce-input"><select aria-label="Primeiro vencimento" value={v.first} onChange={e=>set("first",Number(e.target.value))}>{Array.from({length:13},(_,i)=><option key={i} value={i}>{i===0?"Hoje":i===1?"Em 1 mês":"Em "+i+" meses"}</option>)}</select></span><small>Parcelas mensais iguais.</small></label><NumberField label="Custo do capital ao mês" suffix="%" value={v.capital} max={50} change={x=>set("capital",x)} hint="Taxa para trazer recebimentos futuros ao valor de hoje."/></div>
     <NumberField label="Perda esperada por inadimplência" suffix="%" value={v.risk} max={99} change={x=>set("risk",x)} hint="Estimativa de parcelas não recuperadas, não uma taxa garantida."/>
     <div className="qce-reset"><button onClick={()=>setV(defaults)}>Restaurar exemplo</button><span><ShieldCheck size={15}/> Os valores digitados não são enviados ao nosso servidor.</span></div>
    </div>
    <div className="qce-panel qce-results">
     <div className="qce-results-head"><span>RESULTADO DA SIMULAÇÃO</span><span>EXEMPLO AJUSTÁVEL</span></div>
     <p className="qce-kicker">Resultado econômico estimado da venda a prazo</p><strong className={result.profit>=0?"qce-big":"qce-big negative"}>{brl(result.profit)}</strong>
     <p className="qce-explain">Se o preço fosse recebido integralmente à vista, o resultado aproximado, com os mesmos custos informados, seria <b>{brl(result.cashProfit)}</b>.</p>
     <div className="qce-impact"><TrendingDown size={23}/><div><span>Impacto estimado de prazo e inadimplência</span><strong>{brl(result.impact)}</strong><small>{v.price>0?pct(result.impact/v.price*100):"0%"} do preço da venda, nas hipóteses informadas</small></div></div>
     <div className="qce-bars"><div><span>Preço nominal <b>{brl(v.price)}</b></span><i><em style={{width:ratio(v.price)}}/></i></div><div><span>Valor econômico dos recebíveis <b>{brl(result.present)}</b></span><i><em className="light" style={{width:ratio(result.present)}}/></i></div></div>
     <div className="qce-metrics">
      <div><span>Margem estimada à vista</span><strong>{pct(result.cashMargin)}</strong></div>
      <div><span>Margem econômica a prazo</span><strong>{pct(result.margin)}</strong></div>
      <div><span>Perda esperada com inadimplência</span><strong>{brl(result.loss)}</strong></div>
      <div><span>Custo estimado do tempo</span><strong>{brl(result.timeCost)}</strong></div>
     </div>
     <div className="qce-equivalent"><small>PREÇO PARA PRESERVAR O RESULTADO À VISTA*</small><strong>{result.equivalent===null?"Não calculável":brl(result.equivalent)}</strong><p>Estimativa do preço parcelado necessário para manter o mesmo lucro econômico de vender pelo preço atual e receber à vista.</p></div>
     <button type="button" className="qce-toggle" onClick={()=>setShow(!show)} aria-expanded={show}>Memória de cálculo e parcelas <ChevronDown size={18}/></button>
     {show&&<div className="qce-details"><div><span>Entrada hoje</span><b>{brl(result.upfront)}</b></div><div><span>Valor nominal das parcelas</span><b>{brl(v.price-result.upfront)}</b></div><div><span>Recebimento esperado</span><b>{brl(result.expected)}</b></div><div><span>Valor presente estimado</span><b>{brl(result.present)}</b></div><div><span>Custos fixos</span><b>- {brl(result.direct)}</b></div><div><span>Impostos e taxas</span><b>- {brl(result.variable)}</b></div><div className="total"><span>Resultado econômico aproximado</span><b>{brl(result.profit)}</b></div><div className="qce-table"><table><thead><tr><th>Vencimento</th><th>Nominal</th><th>Esperado</th><th>Valor presente</th></tr></thead><tbody>{result.rows.map((r,i)=><tr key={i}><td>{r.month===0?"Hoje":"Mês "+r.month}</td><td>{brl(r.nominal)}</td><td>{brl(r.expected)}</td><td>{brl(r.present)}</td></tr>)}</tbody></table></div></div>}
     <div className="qce-actions"><button onClick={()=>void copy()}><ClipboardCopy size={17}/>{copied?"Copiado":"Copiar resultado"}</button><button onClick={()=>window.print()}><Printer size={17}/> Exportar relatório em PDF</button></div>
     {feedback&&<p className="qce-error" role="alert">{feedback}</p>}
     <p className="qce-subtle">* Não é recomendação de preço. O valor equivalente pode não ser viável comercialmente. Os percentuais de impostos e taxas incidem sobre o valor nominal total na simulação.</p>
    </div>
   </div>
   <p className="qce-disclaimer"><Info size={18}/> Este cálculo é apenas educativo. Supõe parcelas iguais, risco uniforme de inadimplência e desconto mensal à taxa indicada. Não considera regimes tributários específicos, recuperação de cobranças, alterações da carteira, custos de antecipação contratual, repactuação e sazonalidade. Não é análise de crédito, garantia de retorno ou aconselhamento financeiro.</p>
   </div></section>
   <PrintableReport v={v} result={result}/>
   <section className="qce-cta"><div className="qce-container qce-cta-grid"><div><p className="qce-eyebrow">A CONTA É SÓ O COMEÇO</p><h2>O problema não é dar prazo. <em>É não saber o que ele custa.</em></h2><p>O Crédito que Escala combina método, tecnologia e capacitação para organizar vendas a prazo, precificação, cobrança e decisões sobre recebíveis.</p></div><div className="qce-cta-card"><span>SEU PRÓXIMO PASSO</span><h3>Quer avaliar a operação inteira?</h3><p>Responda ao pré-diagnóstico gratuito. Nosso time poderá analisar a aderência da sua empresa ao programa.</p><a href="/#diagnostico">Fazer meu pré-diagnóstico <ArrowRight size={19}/></a><small>Não representa aprovação de crédito ou reunião agendada.</small></div></div></section>
  </main>
  <footer className="qce-footer"><a href="/">CRÉDITO QUE ESCALA</a><span>Ferramenta educativa para decisões comerciais conscientes.</span><span>© 2026</span></footer>
 </div>;
}
