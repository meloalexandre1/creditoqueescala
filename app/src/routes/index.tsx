import { createFileRoute } from "@tanstack/react-router";
import { useEffect,useState } from "react";
import {trackFunnel} from "@/lib/funnel-tracking";
import { HeroExperience } from "@/components/marketing/hero-experience";
import { LeadCapture } from "@/components/marketing/lead-capture";
import { GrowthSimulator } from "@/components/marketing/growth-simulator";
import { ScrollExperience } from "@/components/marketing/scroll-experience";
import { ArrowUpRight, ArrowRight, ShieldCheck, Check, ChevronDown, TrendingUp, Wallet, Layers3, Landmark, CircleHelp, ChartNoAxesCombined, BookOpen, BadgeCheck, MoveRight, Calculator } from "lucide-react";
import "./landing.css";
import "./growth-motion.css";
export const Route = createFileRoute("/")({component:Index});
const questions = [
 ["A solução é um empréstimo?", "Não. O Crédito que Escala é apresentado como um método de estruturação de políticas, precificação, cobrança, capacitação e uso de tecnologia. Eventuais operações de crédito dependem de avaliação específica."],
 ["Toda empresa pode participar?", "Não. A aderência depende de fatores como faturamento, margem, composição da carteira de clientes, qualidade dos dados e riscos da operação. Os requisitos finais são confirmados na triagem."],
 ["O dinheiro fica disponível imediatamente?", "Não existe promessa de disponibilização imediata ou aprovação automática de crédito. A implantação do método também exige dedicação, dados e capacitação."],
 ["O método funciona para empresas sem assinaturas?", "A aplicabilidade depende da estrutura de vendas a prazo, contratos e recebíveis. Um diagnóstico identifica se há um caso de uso viável e quais mecanismos são adequados."],
 ["Quais são os custos?", "A estrutura comercial, o escopo contratado e os eventuais custos financeiros devem ser apresentados na proposta formal. Antecipações ou financiamentos podem reduzir a margem e exigem análise."],
 ["O que diferencia esta proposta?", "O foco não é apenas disponibilizar capital pontual. A proposta integra método, análise da carteira, política de crédito, precificação, tecnologia Luri e capacitação, conforme o escopo contratado."]
];
function Index(){
 const [open,setOpen]=useState<number|null>(0);
 useEffect(()=>{trackFunnel("page_view")},[]);
 const jump=()=>document.getElementById("diagnostico")?.scrollIntoView({behavior:"smooth"});
 return <main className="ce-page"><ScrollExperience/>
 <header className="ce-nav"><a className="ce-brand" href="#" aria-label="Renato Junqueira, idealizador do Crédito que Escala"><img src="/assets/renato-junqueira-logo.png" alt="Renato Junqueira" className="ce-official-logo ce-renato-nav-logo"/></a><nav><a href="#solucao">A solução</a><a href="#simulacao">Simulador</a><a href="/calculadora">Venda a prazo</a><a href="#lideranca">Idealizador</a><a href="#equipe">Equipe</a><a href="#perguntas">Dúvidas</a></nav><button className="ce-nav-cta" onClick={jump}>Fazer pré-diagnóstico <ArrowUpRight size={16}/></button></header>
 <HeroExperience onPrimary={jump}/>
 <section className="ce-intro" id="solucao"><div className="ce-container" data-reveal><p className="ce-overline">A REALIDADE DE QUEM VENDE A PRAZO</p><h2>Você fecha a venda.<br/><em>Mas quando o dinheiro chega?</em></h2><div className="ce-intro-grid"><p>O vendedor comemora. A empresa entrega. Mas a folha, os fornecedores e os impostos não esperam o cliente pagar. Sem uma estratégia para o prazo, crescer pode aumentar a pressão no caixa.</p><div className="ce-intro-points"><div><Wallet/><span>Faturar hoje não significa receber hoje.</span></div><div><ChartNoAxesCombined/><span>Sem enxergar a carteira, você negocia no escuro.</span></div><div><ShieldCheck/><span>Sem preço e cobrança certos, a margem pode desaparecer.</span></div></div></div></div></section>
 <section className="ce-system"><div className="ce-container" data-reveal><p className="ce-overline">O QUE MUDA NA SUA OPERAÇÃO</p><div className="ce-system-head"><h2>Aprenda a vender para brasileiro.<br/>Sem perder o controle.</h2><p>Não basta facilitar a compra. É preciso saber para quem vender, quanto cobrar, quando receber e como administrar a carteira.</p></div><div className="ce-system-matrix"><article className="featured"><span>01 / MÉTODO</span><Layers3 size={43}/><h3>Antes de buscar dinheiro, entenda sua operação.</h3><p>Diagnóstico dos recebíveis, políticas de crédito, contratos, precificação e critérios comerciais.</p></article><article><span>02 / TECNOLOGIA</span><ChartNoAxesCombined size={34}/><h3>Tecnologia para deixar o improviso para trás.</h3><p>A ferramenta Luri apoia os mecanismos de gestão financeira previstos no projeto, conforme escopo.</p></article><article><span>03 / CAPACITAÇÃO</span><BookOpen size={34}/><h3>Uma equipe que entende o que está fazendo.</h3><p>Imersão Mundo Crédito e capacitação para tomar decisões e executar o novo processo.</p></article><article><span>04 / ACOMPANHAMENTO</span><BadgeCheck size={34}/><h3>Não basta instalar. É preciso implantar.</h3><p>Rotinas, responsáveis, acompanhamento e ajustes de acordo com o diagnóstico e o escopo contratado.</p></article></div></div></section>
 <section className="ce-sectors"><div className="ce-container">
 <div className="ce-sectors-head" data-reveal>
  <h2>Quem vende a prazo<br/>precisa entender isso.</h2>
  <p>De escolas a distribuidores: negócios diferentes enfrentam o mesmo desafio — vender hoje, receber depois e manter a operação saudável. Veja exemplos de recebíveis que merecem análise.</p>
 </div>
 {[
  {sector:"EDUCAÇÃO",title:"Escolas, cursos e instituições de ensino",description:"Mensalidades e contratos educacionais podem formar carteiras de pagamentos futuros.",example:"Ex.: mensalidades com vencimentos distribuídos ao longo do semestre."},
  {sector:"SAÚDE",title:"Clínicas, tratamentos e serviços de saúde",description:"Tratamentos e pacotes parcelados criam necessidades de caixa antes do recebimento integral.",example:"Ex.: pagamentos de tratamentos negociados em parcelas."},
  {sector:"SERVIÇOS B2B",title:"Empresas com contratos de prestação de serviços",description:"Contratos faturados a prazo podem gerar direitos de recebimento analisáveis.",example:"Ex.: serviços executados com pagamento previsto após o faturamento."},
  {sector:"ATACADO E DISTRIBUIÇÃO",title:"Distribuidoras e atacadistas",description:"Vendas a lojistas com prazo de 30, 60 ou 90 dias podem originar duplicatas.",example:"Ex.: mercadorias entregues hoje e recebidas após o vencimento da fatura."},
  {sector:"INDÚSTRIA",title:"Fabricantes e fornecedores industriais",description:"Pedidos entregues a clientes empresariais com pagamento futuro podem pressionar o capital de giro.",example:"Ex.: fornecimento de peças com pagamento contratado a prazo."},
  {sector:"TRANSPORTE E LOGÍSTICA",title:"Transportadoras e operadores logísticos",description:"Fretes já prestados e faturados com prazo de pagamento podem gerar recebíveis.",example:"Ex.: combustível e equipe pagos antes da liquidação do frete."},
  {sector:"SERVIÇOS TERCEIRIZADOS",title:"Limpeza, segurança e facilities",description:"Contratos com faturamento periódico podem exigir pagamento de pessoal antes do recebimento.",example:"Ex.: folha salarial vence antes da fatura do contratante."}
 ].map((item,i)=><div className="ce-sector-row" key={item.sector} data-reveal>
  <span>{item.sector}</span><div className="ce-sector-main"><strong>{item.title}</strong><small>{item.example}</small></div><p>{item.description}</p><ArrowUpRight aria-hidden="true"/>
 </div>)}
 <p className="ce-sectors-disclaimer">Exemplos ilustrativos, não cases ou garantia de crédito. A existência de recebíveis não implica elegibilidade automática; operações dependem de análise jurídica, documental e financeira, além de custos e condições aplicáveis.</p>
 </div></section>
 <GrowthSimulator/>
 <section className="ce-price-tool-bridge"><div className="ce-container ce-price-tool-bridge-inner"><div><p className="ce-overline">FERRAMENTA GRATUITA</p><h2>Você sabe quanto custa <em>vender a prazo?</em></h2><p>Antes de oferecer mais parcelas, veja o impacto do prazo, das taxas e da inadimplência no resultado estimado da venda.</p></div><a href="/calculadora">Experimentar a calculadora <ArrowUpRight size={20}/></a></div></section>
 <section className="ce-journey" id="jornada"><div className="ce-container"><h2>Da primeira análise<br/><em>à rotina que funciona.</em></h2><p className="ce-journey-desc">Você não compra uma promessa de crescimento. Você desenvolve um processo. O ritmo depende dos dados, da equipe e da complexidade da operação.</p><div className="ce-steps" data-reveal><div><b>01</b><h3>Diagnóstico</h3><p>Entender a carteira, os contratos, as margens e as oportunidades.</p></div><div><b>02</b><h3>Estruturação</h3><p>Definir políticas, regras, ferramentas e responsáveis.</p></div><div><b>03</b><h3>Piloto</h3><p>Testar a rotina, acompanhar indicadores e ajustar desvios.</p></div><div><b>04</b><h3>Evolução</h3><p>Ampliar com critério, apenas quando os dados sustentarem a decisão.</p></div></div></div></section>
 <section className="ce-fit"><div className="ce-container"><div className="ce-fit-title"><h2>Crédito que Escala<br/>não é para todo mundo.</h2><p>E isso é uma vantagem: antes de apresentar uma proposta, precisamos descobrir se existe carteira, margem, documentação e capacidade de implantação.</p></div><div className="ce-fit-cols"><article><h3><Check/> Características favoráveis</h3><p>Carteira de clientes diversificada; margens saudáveis; vendas a prazo com documentação; dados disponíveis; equipe disposta a adotar processos.</p></article><article><h3><CircleHelp/> Pontos de atenção</h3><p>Dependência de um único cliente; concentração elevada; margens apertadas; histórico insuficiente; operações de alto risco ou incompatíveis.</p></article></div><p className="ce-fit-footer">Faturamento mínimo, exigências específicas e aprovação são definidos na triagem técnica. Nenhum crédito é garantido.</p></div></section>
 <section className="ce-decision-bridge"><div className="ce-container ce-decision-content" data-reveal>
  <div><p className="ce-overline">UMA PERGUNTA MUDA TUDO</p><h2>Seu concorrente pode estar vendendo melhor.<br/><em>Não porque trabalha mais. Mas porque negocia melhor.</em></h2><p>Condições de pagamento podem ajudar a fechar vendas — quando preço, prazo, carteira e cobrança são tratados com inteligência. Comece descobrindo onde sua empresa está.</p></div>
  <button type="button" onClick={jump}>Fazer pré-diagnóstico gratuito <ArrowUpRight size={20}/></button>
 </div></section>
 <LeadCapture/>
 <section className="ce-president" id="lideranca"><div className="ce-container ce-president-grid">
  <div className="ce-president-photo" data-parallax="22"><img src="/assets/people/renato.jpg" alt="Fotografia de Renato Junqueira" loading="lazy"/></div>
  <div className="ce-president-copy" data-reveal><p className="ce-overline">O IDEALIZADOR DO CRÉDITO QUE ESCALA</p><h2>Experiência de mercado transformada em método.</h2><span className="ce-president-role">RENATO JUNQUEIRA <i/> PRESIDENTE DO GRUPO FEDERAL INVEST</span>
  <p>Fundador e presidente do <strong>Grupo Federal Invest</strong>, Renato Junqueira soma mais de três décadas de atuação no mercado de crédito, fomento empresarial e antecipação de recebíveis. Sua trajetória à frente de uma operação de alcance nacional conecta conhecimento financeiro e vivência real dos desafios enfrentados pelas empresas brasileiras.</p>
  <p>Como <strong>idealizador do Crédito que Escala</strong>, traz essa experiência para uma metodologia dedicada a estruturar decisões comerciais, gestão de recebíveis e crescimento com mais inteligência.</p>
  <a href="https://renatojunqueira.com.br/" target="_blank" rel="noopener noreferrer" className="ce-president-link">Conheça sua trajetória <ArrowUpRight size={18}/></a></div>
  </div></section>
 <section className="ce-team" id="equipe"><div className="ce-container"><div className="ce-team-intro" data-reveal><p className="ce-overline">QUEM SUSTENTA A EXECUÇÃO</p><h2>Um time, diferentes<br/><em>especialidades.</em></h2><p>A execução reúne especialistas em consultoria, jurídico, fomento, tecnologia, administração e marketing.</p></div>
 <div className="ce-team-grid">{[
 {name:"Douglas",role:"Consultoria",photo:"douglas"},
 {name:"Anderson Fragoso",role:"Jurídico / Fomento",photo:"anderson"},
 {name:"Diego Roulmillac",role:"Conta Digital",photo:"diego"},
 {name:"Ulysses Magalhaes",role:"Consultoria",photo:"ulysses"},
 {name:"Fabio Silva",role:"ADM",photo:"fabio"},
 {name:"Alexandre Melo",role:"Marketing",photo:"alexandre"}
 ].map((person,i)=><article key={person.photo} className="ce-team-person" data-reveal style={{transitionDelay:(i%3)*70+"ms"}}><div className="ce-team-portrait" data-parallax="10"><img src={"/assets/people/"+person.photo+".jpg"} alt={"Fotografia de "+person.name} loading="lazy"/></div><div className="ce-team-person-text"><h3>{person.name}</h3><p>{person.role}</p></div></article>)}</div>
 <p className="ce-team-note">Equipe multidisciplinar do Crédito que Escala.</p></div></section>
  <section className="ce-faq" id="perguntas"><div className="ce-container"><h2>O que você precisa<br/>saber antes.</h2><div className="ce-faq-items">{questions.map(([q,a],i)=><div key={q} className="ce-faq-item"><button aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)}><span>{q}</span><ChevronDown size={22} className={open===i?"rotated":""}/></button>{open===i&&<p>{a}</p>}</div>)}</div></div></section>
 <footer className="ce-footer"><div className="ce-container"><div className="ce-footer-top"><span>CRÉDITO QUE ESCALA</span></div><h2>Você já aprendeu a vender.<br/>Está na hora de olhar para o que acontece depois.</h2><p>Faça o pré-diagnóstico gratuito. Quatro perguntas para começar a entender se o método faz sentido para a sua operação.</p><button onClick={jump}>Quero avaliar meu perfil <ArrowUpRight size={22}/></button><div className="ce-footer-bottom"><span>Crédito que Escala. Informações sujeitas à avaliação e proposta formal.</span><span>© 2026 Crédito que Escala</span></div></div></footer>
 </main>
}
