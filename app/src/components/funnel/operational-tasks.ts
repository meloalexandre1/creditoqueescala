export type OpTask={id:string;title:string;detail:string;owner:string;conditional?:boolean};
export type OpGroup={id:"foundation"|"week1"|"week2"|"week3"|"week4";label:string;sub:string;tasks:OpTask[]};
export const operationalGroups:OpGroup[]=[
 {id:"foundation",label:"Fundação",sub:"Antes de intensificar a distribuição",tasks:[
  {id:"perfil",title:"Definir ICP, promessa e segmentos prioritários",detail:"Escolher hipóteses de públicos aderentes e critérios de exclusão. Validar promessa sem garantias.",owner:"Estratégia + Renato"},
  {id:"comercial",title:"Definir quem faz as calls e a agenda semanal",detail:"Confirmar com Douglas e Ulysses se serão os responsáveis, estabelecer janelas de atendimento e SLA.",owner:"Comercial"},
  {id:"promessas",title:"Revisar todas as promessas das artes e dos roteiros",detail:"Remover resultados garantidos, promessas de crédito e afirmações financeiras absolutas.",owner:"Copy + compliance"},
  {id:"trator",title:"Revisar o exemplo financeiro do trator",detail:"Plano externo recomenda corrigir para aproximadamente R$ 229 mil antes de custos ou identificar claramente como estimativa. Validar números antes de publicar.",owner:"Renato + financeiro"},
  {id:"grafico",title:"Conferir o gráfico do exemplo R$ 100 mil → R$ 200 mil",detail:"Revisar eixo, escala e legenda. Identificar toda projeção como simulação ilustrativa.",owner:"Design + financeiro"},
  {id:"perfil-instagram",title:"Estruturar Instagram e link rastreável",detail:"Atualizar bio, foto, link e destaques do Crédito que Escala; revisar também o perfil do Renato conforme plano externo.",owner:"Social media"},
  {id:"destaques",title:"Publicar os cinco destaques",detail:"Método, Casos, Imersão, Dúvidas e Equipe. Só publicar casos e provas verificáveis.",owner:"Social + audiovisual"},
  {id:"fixados",title:"Finalizar três posts fixados",detail:"Como Pode?, Vender para Brasileiro? e carrossel ‘O que é o Crédito que Escala?’ (7 slides).",owner:"Social + design"},
  {id:"formulario",title:"Validar cadastro no celular e no banco",detail:"Testar o formulário, consentimento, UTMs, etapas do lead e chegada ao painel.",owner:"Tecnologia"},
  {id:"isca",title:"Escolher e produzir a isca",detail:"Decidir entre checklist, calculadora ou aula, alinhando oferta e CTA. Não abrir lista de aula antes de data e entrega confirmadas.",owner:"Estratégia + marketing"},
  {id:"palavra",title:"Configurar palavra-chave de DM",detail:"Plano externo sugere CAIXA; publicações atuais citam ESCALA. Escolher uma palavra, definir resposta, responsável e registro de origem.",owner:"Social + comercial"},
  {id:"base-quente",title:"Mapear contatos de relacionamento",detail:"Organizar comunidade, palestras e clientes autorizados da Federal Invest; respeitar permissões de contato e privacidade.",owner:"Comercial"},
  {id:"tracking",title:"Preparar contas de anúncios, eventos e pixel",detail:"Validar objetivo, mensuração de formulários, políticas de consentimento e conexão das campanhas.",owner:"Tráfego + tecnologia"}
 ]},
 {id:"week1",label:"Semana 1 · Tração",sub:"Começar a atrair e responder de forma consistente",tasks:[
  {id:"batch",title:"Organizar gravação em lote dos conteúdos da semana",detail:"Roteiros individuais e check de produção estão na aba Conteúdos. Aqui registramos a preparação da gravação.",owner:"Renato + audiovisual"},
  {id:"stories",title:"Organizar Stories de apresentação, bastidor e perguntas",detail:"Ajustar materiais complementares ao calendário e criar rotina de interação diária.",owner:"Social media"},
  {id:"dm-1",title:"Abordar base quente autorizada — lote 1",detail:"Contatar relacionamentos relevantes com convite contextual, sem mensagens em massa não solicitadas.",owner:"Comercial"},
  {id:"dm-2",title:"Abordar base quente autorizada — lote 2",detail:"Segunda rodada segmentada; registrar respostas e próximos passos.",owner:"Comercial"},
  {id:"cadencia",title:"Definir cadência de resposta a comentários e DMs",detail:"Quem responde, em quanto tempo e como encaminha ao pré-diagnóstico.",owner:"Social + comercial"},
  {id:"kpis",title:"Fechar relatório da primeira semana",detail:"Alcance, retenção, respostas à palavra-chave, visitas, leads e qualidade dos cadastros.",owner:"Marketing"}
 ]},
 {id:"week2",label:"Semana 2 · Aceleração",sub:"Transformar alcance em interesse qualificado",tasks:[
  {id:"engajados",title:"Contatar quem interagiu e autorizou uma conversa",detail:"Qualificar quem demonstrou interesse na solução, sem abordar indiscriminadamente toda a audiência.",owner:"Comercial"},
  {id:"evento-decisao",title:"Decidir se haverá aula ao vivo ou jornada direta para o diagnóstico",detail:"O plano externo sugere aula; o funil atual prioriza o pré-diagnóstico. Validar formato e data antes de anunciar.",owner:"Estratégia",conditional:true},
  {id:"lista",title:"Se houver aula, preparar inscrições e lembretes",detail:"Criar cadastro, link de acesso, página de confirmação e calendário real do evento.",owner:"Marketing + tecnologia",conditional:true},
  {id:"ads",title:"Subir mídia paga apenas após validação do funil",detail:"O plano externo sugere R$ 50–100/dia por criativo, sujeito a orçamento e dados. Priorizar criativos de melhor retenção.",owner:"Tráfego",conditional:true},
  {id:"remarketing",title:"Preparar remarketing segmentado",detail:"Pessoas que consumiram vídeo e visitantes elegíveis, respeitando as regras da plataforma e consentimentos.",owner:"Tráfego",conditional:true},
  {id:"kpis",title:"Avaliar semana 2: CPC, CPL e leads aderentes",detail:"Caso haja aula, incluir inscrições reais. Corrigir página e atendimento antes de escalar.",owner:"Marketing + comercial"}
 ]},
 {id:"week3",label:"Semana 3 · Conversão",sub:"Diagnosticar e apresentar a proposta",tasks:[
  {id:"agenda",title:"Confirmar agenda de reuniões de diagnóstico",detail:"Definir responsáveis, disponibilidade e convite com link online. Não pressupor agendamento automático.",owner:"Comercial"},
  {id:"apresentacao",title:"Testar apresentação online por segmento",detail:"Adaptar demonstrações para os públicos com maior aderência; explicar escopo, limites e condições.",owner:"Renato + comercial"},
  {id:"aula",title:"Se aprovada, realizar aula ao vivo e abrir diagnóstico",detail:"O plano externo propõe 45 minutos e convite ao piloto; realizar somente se formato e oferta estiverem validados.",owner:"Renato + marketing",conditional:true},
  {id:"lembretes",title:"Se houver aula, enviar lembretes de forma autorizada",detail:"Referência do plano: 24h, 1h e 10min; configurar canais com consentimento.",owner:"Social + comercial",conditional:true},
  {id:"replay",title:"Se houver aula, liberar replay conforme combinado",detail:"Plano sugere 48 horas; confirmar promessa antes de divulgar.",owner:"Audiovisual + marketing",conditional:true},
  {id:"dm-pos",title:"Se houver aula, fazer follow-up dos participantes",detail:"Segmentar quem assistiu, quem faltou e quem pediu conversa.",owner:"Comercial",conditional:true},
  {id:"sla",title:"Definir e cumprir SLA de avaliação de aplicações",detail:"Plano externo sugere retorno em até 24 horas; validar capacidade da equipe.",owner:"Comercial"},
  {id:"calls",title:"Realizar reuniões consultivas e registrar diagnóstico",detail:"Registrar objetivos, riscos, informações faltantes e próximos passos.",owner:"Comercial"}
 ]},
 {id:"week4",label:"Semana 4 · Fechamento",sub:"Converter, implantar e medir",tasks:[
  {id:"provas",title:"Reunir casos e provas permitidos",detail:"Depoimentos e registros reais do piloto, se existirem, com consentimento. Não inventar resultados.",owner:"Marketing + Renato"},
  {id:"piloto",title:"Confirmar condições, disponibilidade e vagas do piloto",detail:"O plano externo menciona seis vagas; só comunicar limite se tiver sido formalmente definido e permanecer verdadeiro.",owner:"Direção comercial",conditional:true},
  {id:"followup",title:"Executar follow-up 24h e 72h",detail:"Conforme combinado com cada lead após a call. Registrar objeções e desfechos.",owner:"Comercial"},
  {id:"ultima",title:"Publicar última chamada sem escassez artificial",detail:"Convidar apenas para oportunidades reais e com elegibilidade definida.",owner:"Marketing",conditional:true},
  {id:"contratos",title:"Enviar propostas e formalizar contratos",detail:"Validar escopo, condições, entregas, datas e responsabilidades de implantação.",owner:"Comercial + jurídico"},
  {id:"onboarding",title:"Iniciar diagnóstico dos clientes contratados",detail:"Kickoff e primeira fase da entrega apenas para clientes efetivamente fechados.",owner:"Implantação"},
  {id:"metricas",title:"Fechar relatório de conversão e CAC",detail:"Visitas → leads → qualificados → calls → propostas → vendas; separar por origem.",owner:"Marketing + comercial"},
  {id:"ciclo",title:"Planejar próxima rodada com os dados reais",detail:"Identificar gargalos, melhorar roteiros e ajustar investimento/segmentos.",owner:"Estratégia"}
 ]}
];
export const allTasks=operationalGroups.flatMap(g=>g.tasks.map(t=>({...t,slug:"op-"+g.id+"-"+t.id,group:g.id})));
