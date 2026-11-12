import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,ChevronDown,ClipboardList,ExternalLink,FileText,Users,BarChart3,ShieldCheck} from "lucide-react";
import "./funil.css";
import {OperationsPanel} from "@/components/funnel/operations-panel";
import {TeamTasks} from "@/components/funnel/team-tasks";

export const Route=createFileRoute("/funil")({
 head:()=>({meta:[{title:"Mapa do Funil Digital | Crédito que Escala"},{name:"robots",content:"noindex,nofollow"},{name:"description",content:"Plano operacional de conteúdo, captação e conversão para o Crédito que Escala."}]}),
 component:FunnelBoard
});

const funnel=[
 {id:"atencao",n:"01",title:"Atrair a empresa certa",subtitle:"Conteúdo que provoca e filtra",icon:"◈",tone:"fb-tone-1",action:"Reels, carrosséis, Stories e mídia segmentada",target:"Visitas qualificadas"},
 {id:"interesse",n:"02",title:"Criar desejo com clareza",subtitle:"Educação + demonstração",icon:"◉",tone:"fb-tone-2",action:"Dores reais, exemplos financeiros, método, cases validados",target:"Visitas à landing page"},
 {id:"diagnostico",n:"03",title:"Capturar o diagnóstico",subtitle:"4 perguntas → dados da empresa",icon:"▣",tone:"fb-tone-3",action:"Formulário, consentimento, origem da campanha e CRM",target:"Leads completos"},
 {id:"qualificacao",n:"04",title:"Qualificar e conversar",subtitle:"Triagem comercial responsável",icon:"◆",tone:"fb-tone-4",action:"Regra de aderência, contato e diagnóstico consultivo",target:"Reuniões realizadas"},
 {id:"proposta",n:"05",title:"Converter em cliente",subtitle:"Oferta, escopo e decisão",icon:"✦",tone:"fb-tone-5",action:"Apresentação específica, objeções, proposta e follow-up",target:"Contratos fechados"},
 {id:"operacao",n:"06",title:"Implantar e gerar prova",subtitle:"Entrega vira autoridade",icon:"↗",tone:"fb-tone-6",action:"Onboarding, adoção, indicadores e casos consentidos",target:"Retenção e indicações"}
];
const faqs=[
 ["Quem é o público?", "Empresas com vendas a prazo/contratos e carteira de recebíveis, com margem, documentação e estrutura para implantar a rotina. Testar inicialmente educação e distribuição como hipóteses comerciais."],
 ["Qual é a conversão principal?", "Pré-diagnóstico finalizado e registrado no banco. A conversão de negócio acontece depois: lead qualificado → conversa agendada → diagnóstico feito → proposta → contrato."],
 ["Qual é o CTA central?", "«Descubra se sua empresa tem perfil». CTA único na campanha, no link da bio, Stories e anúncios."],
 ["Qual é o compromisso com o lead?", "Cadastro não garante aprovação de crédito, reunião automática nem benefício financeiro. O time faz triagem e poderá entrar em contato para aprofundar a conversa."],
 ["O que NÃO comunicar?", "Não prometer resultado, dobrar faturamento, disponibilidade imediata de crédito, aprovação, margens ou redução automática de inadimplência. Apresentar números hipotéticos como ilustração."],
 ["Quando escalar mídia?", "Após validar captura no banco, atendimento com SLA, agendamento e resultados suficientes para medir o custo por reunião qualificada. Nunca investir só para inflar volume de leads."]
];
const stages=["Novo cadastro","Em qualificação","Contato iniciado","Reunião agendada","Reunião realizada","Proposta enviada","Ganho / Perdido"];
const kpis=[
 ["Taxa de conversão da página","Leads ÷ visitantes da página"],
 ["Taxa de qualificação","Leads aderentes ÷ leads captados"],
 ["Taxa de agendamento","Reuniões marcadas ÷ leads qualificados"],
 ["Taxa de comparecimento","Reuniões feitas ÷ reuniões marcadas"],
 ["Taxa de fechamento","Clientes ÷ reuniões realizadas"],
 ["CAC comercial","Custo de aquisição ÷ clientes conquistados"]
];

function FunnelBoard(){
 const [expanded,setExpanded]=useState<string|null>(null);
 return <div className="fb-app">
  <header className="fb-header">
    <a href="/" className="fb-back"><ArrowLeft size={16}/> Voltar à página</a>
    <div className="fb-mark"><span className="fb-logo">↗</span><span><b>CRÉDITO QUE ESCALA</b><small>PLAYBOOK DIGITAL DE AQUISIÇÃO E VENDAS</small></span></div>
    <a href="/#diagnostico" className="fb-main-link">Ver experiência do lead <ExternalLink size={15}/></a>
  </header>
  <main>
   <section className="fb-hero">
    <div className="fb-container">
     <p className="fb-eyebrow">MAPA ESTRATÉGICO · TRILHA DE CONTEÚDO · 45 DIAS</p>
     <h1>Não basta gerar visualizações.<br/><em>Precisamos gerar empresas interessadas em comprar.</em></h1>
     <p>O caminho digital completo: do conteúdo que confronta o empresário até a reunião online, a proposta e a implantação. A régua é a qualidade da oportunidade, não a quantidade de seguidores.</p>
     <div className="fb-hero-actions">
      <a href="#operacao">Ver os 45 roteiros <ArrowRight size={17}/></a>
      <a href="#metricas">Quais números acompanhar <BarChart3 size={17}/></a>
     </div>
     <div className="fb-hero-stats">
      <div><strong>06</strong><span>ETAPAS DO FUNIL</span></div>
      <div><strong>45</strong><span>ROTEIROS DE CONTEÚDO</span></div>
      <div><strong>01</strong><span>CHECKLIST DE EQUIPE</span></div>
     </div>
    </div>
   </section>

   <section className="fb-container fb-section" id="jornada">
    <div className="fb-heading"><div><p className="fb-eyebrow">VISÃO GERAL</p><h2>Um funil. Seis decisões.</h2></div><p>Todo conteúdo precisa conduzir a uma próxima ação. Nenhum lead deve ficar perdido entre marketing e comercial.</p></div>
    <div className="fb-pipeline">
     {funnel.map((s,i)=><article className="fb-pipeline-item" key={s.id}>
      <span className="fb-stage-number">{s.n} / 06</span>
      <div className={"fb-stage-symbol "+s.tone}>{s.icon}</div>
      <h3>{s.title}</h3><p>{s.subtitle}</p>
      <div className="fb-stage-action">{s.action}</div>
      <div className="fb-stage-goal">MÉTRICA <strong>{s.target}</strong></div>
      {i<funnel.length-1&&<ArrowRight className="fb-pipeline-arrow" size={17}/>}
     </article>)}
    </div>
    <div className="fb-rule"><ShieldCheck size={19}/><span>O pré-diagnóstico é uma triagem comercial, não uma aprovação de crédito. O processo depende do perfil, dos riscos e da capacidade operacional da empresa.</span></div>
   </section>

   <OperationsPanel/>
   <TeamTasks/>
   <section className="fb-container fb-section">
    <div className="fb-heading"><div><p className="fb-eyebrow">TRANSFERÊNCIA PARA O COMERCIAL</p><h2>Um lead só vale quando existe um próximo passo.</h2></div><p>Fluxo proposto para CRM e follow-up. Não representa um CRM já conectado à landing.</p></div>
    <div className="fb-commercial-flow">{stages.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,"0")}</span><strong>{s}</strong></div>)}</div>
    <div className="fb-sales-grid">
     <article><span className="fb-card-icon"><Users size={22}/></span><h3>Lead aderente</h3><p>Confirmar o objetivo e as faixas de recebíveis, contatar com autorização, propor dois horários e enviar convite de reunião.</p></article>
     <article><span className="fb-card-icon"><ClipboardList size={22}/></span><h3>Lead em análise</h3><p>Investigar dados insuficientes. Não concluir reprovação bancária com base na triagem de marketing.</p></article>
     <article><span className="fb-card-icon"><FileText size={22}/></span><h3>Após a reunião</h3><p>Registrar diagnóstico, riscos, impacto econômico, escopo e decisão. Proposta individual e acompanhamento acordado.</p></article>
    </div>
    <div className="fb-script"><div><span>MODELO DE PRIMEIRA ABORDAGEM</span><h3>O contato precisa continuar a conversa — não começar uma venda fria.</h3></div><blockquote>Olá! Recebemos seu pré-diagnóstico do Crédito que Escala. Antes de falar sobre soluções, queremos entender como sua empresa vende a prazo, administra seus recebíveis e quais oportunidades podem existir. Posso confirmar duas informações para avaliarmos se faz sentido avançar para uma conversa com nosso time?</blockquote></div>
   </section>

   <section className="fb-section fb-light" id="metricas"><div className="fb-container">
    <div className="fb-heading"><div><p className="fb-eyebrow">PAINEL DE MEDIÇÃO</p><h2>O que não medimos, não melhoramos.</h2></div><p>Olhar o funil por origem: Instagram, anúncios, parcerias, e-book e indicações. Todos precisam de UTMs e rotinas de registro.</p></div>
    <div className="fb-metric-grid">{kpis.map(([name,formula],i)=><article key={name}><span>{String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{formula}</p></article>)}</div>
    <div className="fb-utm"><div><span>PADRÃO DE LINK DA BIO</span><h3>Uma origem clara para cada campanha.</h3><p>Use UTMs em toda distribuição digital para identificar de onde veio cada cadastro.</p></div><div className="fb-utm-link">creditoqueescala.higgsfield.app/<wbr/>?utm_source=instagram<wbr/>&amp;utm_medium=bio<wbr/>&amp;utm_campaign=diagnostico_45dias</div></div>
   </div></section>

   <section className="fb-container fb-section fb-faq">
    <div className="fb-heading"><div><p className="fb-eyebrow">DECISÕES QUE GUIAM O PROJETO</p><h2>A estratégia não pode depender da memória.</h2></div><p>Essas são as respostas que devem permanecer consistentes no marketing e no comercial.</p></div>
    {faqs.map(([q,a],i)=><div className="fb-faq-row" key={q}><button onClick={()=>setExpanded(expanded===q?null:q)} aria-expanded={expanded===q}>{q}<ChevronDown size={18}/></button>{expanded===q&&<p>{a}</p>}</div>)}
   </section>
  </main>
  <footer className="fb-footer"><span>CRÉDITO QUE ESCALA • PLAYBOOK DIGITAL</span><span>Versão inicial | Diretrizes operacionais sujeitas à validação da equipe</span><a href="/">Voltar ao site <ArrowUpRight size={15}/></a></footer>
 </div>;
}
