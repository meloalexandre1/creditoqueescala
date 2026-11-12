export type ContentPlan={
 day:number;
 sourceDay?:number;
 format:"Reel"|"Carrossel"|"Stories"|"Reel · Leia a legenda";
 stage:"Atenção"|"Educação"|"Desejo"|"Conversão";
 headline:string;
 aim:string;
 scenes:string[];
 production:string;
 caption:string;
 cta:string;
 owner:string;
};
const sourceContentPlan:ContentPlan[]=[
 {day:1,format:"Reel",stage:"Atenção",headline:"COMO PODE? Duas empresas. Mesmo mercado. Resultados opostos.",aim:"Abrir a provocação e gerar reconhecimento.",scenes:[
  "GANCHO — Renato: ‘Como pode duas empresas venderem para o mesmo público e terem resultados tão diferentes?’",
  "TENSÃO — ‘Uma vende e cresce. A outra vende e continua sem dinheiro para fechar o mês.’",
  "INSIGHT — ‘O problema nem sempre é a qualidade do produto. Muitas vezes é a maneira como se vende, precifica e recebe.’",
  "FECHAMENTO — ‘O seu concorrente sabe algo sobre vender para brasileiro que você ainda não aprendeu?’"
 ],production:"Renato em plano médio. Cortes secos; letras COMO PODE? em tela. Inserir trecho real de palco, sem inventar depoimentos.",caption:"Mesmo mercado. Mesmo público. Resultados opostos. O que está acontecendo entre a venda e o dinheiro?",cta:"Pergunte nos comentários: a sua empresa vende bem ou recebe bem?",owner:"Renato + audiovisual"},
 {day:2,format:"Carrossel",stage:"Atenção",headline:"5 SINAIS DE QUE SUA EMPRESA VENDE, MAS NÃO CRESCE",aim:"Salvar e compartilhar problemas reconhecíveis.",scenes:[
  "SLIDE 1 — Capa: 5 sinais de que sua empresa vende, mas não cresce.",
  "SLIDE 2 — Você depende de promoções e descontos para bater meta.",
  "SLIDE 3 — O faturamento sobe, mas o caixa continua apertado.",
  "SLIDE 4 — Você não sabe quando nem quanto vai receber.",
  "SLIDE 5 — A cobrança começa só depois do atraso.",
  "SLIDE 6 — Sua margem muda, mas ninguém sabe por quê.",
  "SLIDE 7 — Reconheceu? Sua próxima meta é entender a operação, não apenas vender mais."
 ],production:"Layout editorial azul profundo, uma ideia por slide; usar sinais como hipóteses, não diagnóstico definitivo.",caption:"Faturar não significa ter dinheiro disponível. Quantos desses sinais existem na sua empresa?",cta:"Salve e envie para seu sócio.",owner:"Copy + design"},
 {day:3,format:"Stories",stage:"Atenção",headline:"O PROBLEMA NÃO É SÓ VENDER MAIS",aim:"Coletar percepção da audiência.",scenes:[
  "STORY 1 — Enquete: ‘Sua empresa já vendeu muito e ficou sem caixa?’ Opções: ‘Já’ / ‘Ainda não’.",
  "STORY 2 — Renato responde: ‘Faturamento e caixa são coisas diferentes. O vencimento das contas não espera o recebimento das parcelas.’",
  "STORY 3 — Pergunta aberta: ‘Qual é a maior dificuldade: preço, prazo, cobrança ou recebíveis?’"
 ],production:"Vídeo selfie natural e fundo azul para enquete; não simular resultado de pesquisa.",caption:"Acompanhar respostas para próximos conteúdos.",cta:"Responder à enquete e à caixa de perguntas.",owner:"Social media"},
 {day:4,format:"Reel",stage:"Atenção",headline:"VOCÊ SABE VENDER PARA BRASILEIRO?",aim:"Fixar a tese central da campanha.",scenes:[
  "GANCHO — Renato: ‘Você aprendeu a vender. Mas aprendeu a vender para brasileiro?’",
  "CONTEXTO — ‘Muitos clientes querem opções de pagamento. Só que oferecer prazo não é o mesmo que entender o custo do prazo.’",
  "VIRADA — ‘Se você não conhece sua margem, a inadimplência e quando o dinheiro entra, pode estar vendendo sem controle.’",
  "FECHAMENTO — ‘Vender a prazo exige estratégia. Não improviso.’"
 ],production:"Tom indignado, autoral, sem parecer manifesto. Inserir legendas fortes nas palavras PRAZO e MARGEM.",caption:"Não basta fechar o pedido. É preciso saber o que acontece com ele depois.",cta:"Comente: sua empresa vende mais à vista ou a prazo?",owner:"Renato"},
 {day:5,format:"Reel",stage:"Atenção",headline:"O DESCONTO QUE FECHOU A VENDA PODE TER MATADO A MARGEM",aim:"Gerar debate sobre precificação.",scenes:[
  "GANCHO — ‘Você deu desconto para não perder a venda. Mas calculou quanto perdeu da margem?’",
  "EXEMPLO — ‘Quando a margem já é apertada, reduzir o preço pode consumir uma parcela relevante do resultado. E se você ainda financia o prazo, o custo cresce.’",
  "REFLEXÃO — ‘Sua equipe comercial está preparada para negociar valor ou só tem autorização para baixar preço?’",
  "FECHAMENTO — ‘Preço é estratégia. Desconto sem conta é risco.’"
 ],production:"Usar papel ou quadro branco com exemplo simples e explicitamente ilustrativo; evitar percentuais universais.",caption:"Uma venda pode parecer boa até o financeiro fechar a conta.",cta:"Compartilhe com quem define os preços da empresa.",owner:"Renato + edição"},
 {day:6,format:"Carrossel",stage:"Educação",headline:"FATURAMENTO NÃO PAGA BOLETO. CAIXA PAGA.",aim:"Ensinar diferença entre vendas e liquidez.",scenes:[
  "SLIDE 1 — ‘Faturamento não paga boleto. Caixa paga.’",
  "SLIDE 2 — Uma empresa vende R$ 100 mil no mês. Exemplo ilustrativo.",
  "SLIDE 3 — Recebe R$ 20 mil agora; R$ 80 mil ficam para parcelas futuras.",
  "SLIDE 4 — Fornecedores, salários e tributos têm seus próprios vencimentos.",
  "SLIDE 5 — Resultado: pode haver descasamento entre recebimentos e obrigações.",
  "SLIDE 6 — Entender o calendário de caixa é o começo de uma decisão financeira melhor."
 ],production:"Visual com linha do tempo e datas fictícias, sem sugerir que a empresa real teve esse resultado.",caption:"Vender hoje e receber depois muda toda a lógica da operação.",cta:"Salve e envie para o financeiro.",owner:"Copy + design"},
 {day:7,format:"Stories",stage:"Educação",headline:"PERGUNTAS QUE NINGUÉM FAZ SOBRE VENDAS A PRAZO",aim:"Transformar objeções em pauta.",scenes:[
  "STORY 1 — ‘Quem define na sua empresa o prazo máximo de pagamento?’ Enquete: comercial / financeiro / ninguém definiu.",
  "STORY 2 — ‘Você inclui o custo do prazo ao precificar?’ Sim / Não tenho certeza.",
  "STORY 3 — Renato: ‘Se não existe uma regra clara, não existe controle. Existe improviso.’"
 ],production:"Publicar três telas com visual minimalista e interação; registrar dúvidas recorrentes.",caption:"Use as respostas para orientar os próximos Reels.",cta:"Responder às enquetes.",owner:"Social media"},
 {day:8,format:"Reel",stage:"Educação",headline:"SEU VENDEDOR SABE QUANTO CUSTA PARCELAR?",aim:"Relacionar vendas, prazo e margem.",scenes:[
  "GANCHO — ‘Seu vendedor sabe quanto custa parcelar uma venda em seis vezes?’",
  "TENSÃO — ‘Ele negocia preço, prazo e condição. Mas conhece o custo financeiro e o risco da carteira?’",
  "INSIGHT — ‘Quando o comercial e o financeiro não conversam, um pode bater meta enquanto o outro tenta salvar o caixa.’",
  "FECHAMENTO — ‘Uma boa venda precisa ser boa para o cliente e viável para o negócio.’"
 ],production:"Gravar Renato próximo ao setor comercial; usar checklist visual de preço, custo, prazo e risco.",caption:"A taxa de conversão importa. A qualidade da venda também.",cta:"Marque quem lidera sua operação comercial.",owner:"Renato"},
 {day:9,format:"Carrossel",stage:"Educação",headline:"3 NÚMEROS QUE TODO EMPRESÁRIO DEVERIA DOMINAR",aim:"Fazer o lead reconhecer lacunas gerenciais.",scenes:[
  "SLIDE 1 — Capa: três números que mostram se o negócio está no controle.",
  "SLIDE 2 — Prazo médio de recebimento: quanto tempo leva para o dinheiro chegar?",
  "SLIDE 3 — Inadimplência: que parte do valor previsto está atrasada?",
  "SLIDE 4 — Margem: quanto da venda sobra depois dos custos relevantes?",
  "SLIDE 5 — Se você não sabe responder, decisões comerciais ficam frágeis.",
  "SLIDE 6 — O próximo passo é medir antes de crescer."
 ],production:"Três blocos com ícones consistentes, termos explicados em linguagem simples.",caption:"O empresário não precisa decorar fórmulas. Precisa tomar decisões com dados.",cta:"Salve este guia e volte nele na reunião de gestão.",owner:"Copy + design"},
 {day:10,format:"Reel",stage:"Educação",headline:"ANTECIPAR RECEBÍVEIS RESOLVE OU ESCONDE O PROBLEMA?",aim:"Diferenciar solução de improviso.",scenes:[
  "GANCHO — ‘Antecipar recebíveis pode ajudar. Mas você sabe quando ela custa caro demais?’",
  "EXPLICAÇÃO — ‘Se a operação precisa de caixa antes de receber, é preciso comparar custo, margem, risco e necessidade real.’",
  "ALERTA — ‘Antecipação não transforma venda ruim em venda boa.’",
  "FECHAMENTO — ‘O objetivo não é antecipar por antecipar. É decidir com critério.’"
 ],production:"Sem promessa de aprovação e sem apresentar taxa genérica. Inserir card ‘sujeito à análise e condições’.",caption:"Nem toda antecipação é estratégia. Às vezes é apenas um custo que ninguém mediu.",cta:"Faça o pré-diagnóstico no link da bio.",owner:"Renato"},
 {day:11,format:"Reel",stage:"Educação",headline:"QUEM ESTÁ DECIDINDO PARA QUEM SUA EMPRESA VENDE?",aim:"Introduzir política de crédito e risco.",scenes:[
  "GANCHO — ‘Na sua empresa, qualquer cliente pode comprar a prazo?’",
  "PONTO — ‘Vender a prazo exige conhecer o perfil do cliente, o histórico e as condições contratuais.’",
  "VIRADA — ‘A meta é vender com inteligência, e não transformar cada pedido em um risco que ninguém acompanha.’",
  "FECHAMENTO — ‘Quem está definindo esses critérios hoje?’"
 ],production:"Renato com perguntas em tela. Evitar prometer score infalível ou aprovação automática.",caption:"Política de crédito não é burocracia sem sentido: é parte da qualidade comercial.",cta:"Responda: sua empresa tem política de crédito formal?",owner:"Renato"},
 {day:12,format:"Carrossel",stage:"Educação",headline:"O CICLO DO DINHEIRO: DA VENDA AO RECEBIMENTO",aim:"Mostrar a jornada financeira real.",scenes:[
  "SLIDE 1 — ‘A venda não termina quando o contrato é assinado.’",
  "SLIDE 2 — Etapa 1: negociação e definição das condições.",
  "SLIDE 3 — Etapa 2: contrato, documentação e emissão.",
  "SLIDE 4 — Etapa 3: acompanhamento dos vencimentos.",
  "SLIDE 5 — Etapa 4: cobrança e conciliação.",
  "SLIDE 6 — Etapa 5: análise dos dados para a próxima venda.",
  "SLIDE 7 — Uma operação organizada conecta todas as etapas."
 ],production:"Fluxograma visual; não usar prints com dados de clientes.",caption:"Quando cada departamento enxerga uma parte, o empresário perde a visão do ciclo completo.",cta:"Compartilhe com a equipe comercial e financeira.",owner:"Copy + design"},
 {day:13,format:"Stories",stage:"Educação",headline:"MITOS SOBRE CRÉDITO EMPRESARIAL",aim:"Abrir conversa sobre dúvidas e capturar intenção.",scenes:[
  "STORY 1 — ‘Crédito sempre significa empréstimo?’ Enquete: sim / não.",
  "STORY 2 — ‘Nem toda solução de recebíveis é um empréstimo tradicional. O instrumento e os riscos precisam ser entendidos.’",
  "STORY 3 — Caixa de perguntas: ‘Qual dúvida sobre crédito, recebíveis ou venda a prazo você quer que Renato responda?’"
 ],production:"Sequência de 3 Stories com sticker de enquete, explicação e caixa.",caption:"Preparar respostas reais para os próximos roteiros.",cta:"Enviar uma dúvida.",owner:"Social media"},
 {day:14,format:"Reel",stage:"Desejo",headline:"O SEU CRESCIMENTO ESTÁ PRESO AO PRAZO QUE VOCÊ DEU?",aim:"Ligar o problema a uma alternativa responsável.",scenes:[
  "GANCHO — ‘Você entrega hoje, mas só recebe em 30, 60 ou 90 dias. Como cresce assim?’",
  "CONTEXTO — ‘O prazo pode ajudar a vender. Mas precisa caber na realidade do caixa.’",
  "INSIGHT — ‘O empresário precisa enxergar a carteira e conhecer alternativas sem comprometer sua margem.’",
  "FECHAMENTO — ‘Vender a prazo pode ser uma força quando existe gestão por trás.’"
 ],production:"B-roll de operação e calendário realista. Nunca prometer capital imediato.",caption:"Nem todo prazo é problema. O problema começa quando a empresa não sabe administrá-lo.",cta:"Link da bio: avalie se sua operação tem perfil.",owner:"Renato"},
 {day:15,format:"Reel",stage:"Desejo",headline:"CRÉDITO QUE ESCALA NÃO É SÓ PEGAR DINHEIRO",aim:"Diferenciar claramente o método de um empréstimo.",scenes:[
  "GANCHO — ‘Se você acha que Crédito que Escala é só uma linha de crédito, ainda não entendeu a proposta.’",
  "CONTEÚDO — ‘Primeiro analisamos a operação. Depois entram política de crédito, preço, cobrança, tecnologia e capacitação.’",
  "CONTRASTE — ‘Não adianta colocar mais dinheiro numa operação que continua tomando decisões sem dados.’",
  "FECHAMENTO — ‘O primeiro passo não é pedir capital. É entender a empresa.’"
 ],production:"Inserir quatro palavras em tela: método, tecnologia, capacitação, acompanhamento.",caption:"Uma metodologia de estruturação comercial e financeira, não uma promessa de dinheiro fácil.",cta:"Faça seu pré-diagnóstico no link da bio.",owner:"Renato"},
 {day:16,format:"Carrossel",stage:"Desejo",headline:"UMA ESCOLA PODE VENDER R$ 100 MIL E RECEBER SÓ R$ 20 MIL AGORA",aim:"Exemplificar aplicação concreta em educação.",scenes:[
  "SLIDE 1 — ‘A escola vendeu R$ 100 mil. Por que o caixa recebeu só R$ 20 mil?’",
  "SLIDE 2 — Exemplo ilustrativo: contratos de matrículas parcelados.",
  "SLIDE 3 — Entradas de R$ 20 mil agora e R$ 80 mil no futuro.",
  "SLIDE 4 — Professores, aluguel e fornecedores não esperam o calendário das parcelas.",
  "SLIDE 5 — Gestão é conhecer recebíveis, cobrança, prazo e viabilidade de alternativas.",
  "SLIDE 6 — Esse desafio parece com a sua empresa?"
 ],production:"Gráfico simples com valores hipotéticos; carimbar ‘exemplo ilustrativo’.",caption:"O desafio de vender a prazo aparece em setores diferentes, cada um com suas regras.",cta:"Avalie o perfil no link da bio.",owner:"Copy + design"},
 {day:17,format:"Reel",stage:"Desejo",headline:"O QUE O CRÉDITO QUE ESCALA MUDA NA ROTINA DE UMA EMPRESA?",aim:"Mostrar a transformação operacional concreta.",scenes:[
  "GANCHO — ‘Você não precisa de mais uma palestra que acaba no dia seguinte.’",
  "COMO FUNCIONA — ‘O trabalho começa com diagnóstico, passa pela definição de regras e ferramentas e avança para implantação e acompanhamento.’",
  "VALOR — ‘A equipe aprende a lidar com prazos, recebíveis, preço e cobrança com mais critério.’",
  "FECHAMENTO — ‘Uma metodologia precisa aparecer na rotina da empresa — não só na apresentação.’"
 ],production:"Renato em ambiente empresarial. Mostrar somente bastidores autorizados e fluxos reais.",caption:"O que sustenta uma boa decisão é a capacidade de repeti-la com método.",cta:"Conheça as etapas na página, link da bio.",owner:"Renato + produto"},
 {day:18,format:"Carrossel",stage:"Desejo",headline:"4 NEGÓCIOS QUE PRECISAM ENTENDER SUA CARTEIRA DE RECEBÍVEIS",aim:"Permitir identificação setorial.",scenes:[
  "SLIDE 1 — Capa: sua empresa vende hoje e recebe depois?",
  "SLIDE 2 — Educação: matrículas e mensalidades.",
  "SLIDE 3 — Saúde: procedimentos e tratamentos parcelados.",
  "SLIDE 4 — Distribuição: vendas para lojistas a 30, 60 ou 90 dias.",
  "SLIDE 5 — Serviços B2B: contratos faturados com pagamento futuro.",
  "SLIDE 6 — Cada carteira exige análise de documentação, margens e riscos.",
  "SLIDE 7 — Faça o pré-diagnóstico para entender o ponto de partida."
 ],production:"Fotografia setorial licitamente utilizada, sem sugerir casos comprovados.",caption:"A oportunidade não está no setor sozinho. Está na qualidade e na gestão dos recebíveis.",cta:"Link da bio para pré-diagnóstico.",owner:"Copy + design"},
 {day:19,format:"Reel",stage:"Desejo",headline:"A SUA EQUIPE COMERCIAL TEM FERRAMENTAS PARA VENDER MELHOR?",aim:"Mostrar benefício do alinhamento entre áreas.",scenes:[
  "GANCHO — ‘Você cobra meta do vendedor. Mas entrega ferramentas para ele negociar melhor?’",
  "TENSÃO — ‘Sem regra para preço, prazo e risco, ele tenta fechar a venda com o que conhece: desconto.’",
  "SOLUÇÃO — ‘Quando comercial e financeiro trabalham com o mesmo método, a negociação ganha critérios.’",
  "FECHAMENTO — ‘Não basta querer mais vendas. É preciso estruturar vendas melhores.’"
 ],production:"Cenas de equipe e sobreposição de indicadores reais ou fictícios bem identificados.",caption:"Seu comercial conhece a lógica financeira das condições que oferece?",cta:"Marque quem lidera o comercial.",owner:"Renato"},
 {day:20,format:"Reel",stage:"Desejo",headline:"VOCÊ NÃO PRECISA DE PROMESSA. PRECISA DE MÉTODO.",aim:"Reforçar credibilidade e tirar fantasias.",scenes:[
  "GANCHO — ‘Se alguém promete que toda empresa pode dobrar de tamanho, eu desconfiaria.’",
  "CREDO — ‘Crescimento depende de mercado, operação, caixa, margem e capacidade de execução.’",
  "PROPOSTA — ‘O Crédito que Escala parte dos dados e constrói um caminho de implantação conforme a realidade da empresa.’",
  "FECHAMENTO — ‘Método não elimina risco. Ajuda você a enxergá-lo antes de decidir.’"
 ],production:"Plano fechado do Renato, sem montagem de depoimentos; tom sereno e firme.",caption:"Quem administra riscos consegue discutir oportunidades com mais responsabilidade.",cta:"Se sua empresa vende a prazo, conheça o pré-diagnóstico.",owner:"Renato"},
 {day:21,format:"Stories",stage:"Desejo",headline:"BASTIDORES: O QUE A EQUIPE ANALISA?",aim:"Humanizar e explicar a triagem.",scenes:[
  "STORY 1 — Mostrar quadro genérico com categorias: carteira, margens, prazos, documentação.",
  "STORY 2 — Renato: ‘Antes de recomendar qualquer coisa, precisamos entender sua operação.’",
  "STORY 3 — Sticker de link para o pré-diagnóstico, com aviso ‘Não é uma aprovação de crédito’."
 ],production:"Captar bastidor real autorizado; borrar informações privadas; sem fingir reunião.",caption:"Bastidor de uma decisão financeira responsável.",cta:"Acessar pré-diagnóstico no sticker.",owner:"Social + operação"},
 {day:22,format:"Reel",stage:"Conversão",headline:"CRÉDITO QUE ESCALA NÃO É PARA QUALQUER EMPRESA",aim:"Aumentar intenção de leads aderentes e reduzir curiosos.",scenes:[
  "GANCHO — ‘Vou te dizer uma coisa que nem todo mundo gosta de ouvir: nosso método não é para qualquer empresa.’",
  "CRITÉRIO — ‘É preciso olhar carteira, margem, documentação, clientes e capacidade de implantar processos.’",
  "VIRADA — ‘Isso não é para excluir por excluir. É para entender se existe uma aplicação viável.’",
  "CONVITE — ‘Em vez de adivinhar, comece pelo pré-diagnóstico.’"
 ],production:"Renato olhando para câmera; texto ‘aderência antes de proposta’.",caption:"Antes de falar em solução, precisamos falar sobre adequação.",cta:"Faça as quatro perguntas no link da bio.",owner:"Renato"},
 {day:23,format:"Carrossel",stage:"Conversão",headline:"4 PERGUNTAS QUE PODEM MUDAR A FORMA COMO VOCÊ OLHA PARA O SEU CAIXA",aim:"Preparar visita à página e remover atrito.",scenes:[
  "SLIDE 1 — Quatro perguntas sobre a estrutura comercial e financeira.",
  "SLIDE 2 — A empresa vende a prazo ou tem contratos recorrentes?",
  "SLIDE 3 — A carteira de clientes é diversificada?",
  "SLIDE 4 — Você conhece margens, atraso e prazo de recebimento?",
  "SLIDE 5 — Há documentação e dados para analisar a carteira?",
  "SLIDE 6 — Estas perguntas são o início de uma triagem, não aprovação.",
  "SLIDE 7 — Responda no pré-diagnóstico do link da bio."
 ],production:"Replicar linguagem visual e perguntas reais do formulário, não simular resultado.",caption:"Antes de buscar capital, entenda se a operação tem os dados necessários para uma boa decisão.",cta:"Clique no link da bio e responda o pré-diagnóstico.",owner:"Copy + design"},
 {day:24,format:"Reel",stage:"Conversão",headline:"O QUE ACONTECE DEPOIS DO PRÉ-DIAGNÓSTICO?",aim:"Remover medo de cadastro e alinhar expectativa.",scenes:[
  "GANCHO — ‘Se você preencher as quatro perguntas do Crédito que Escala, o que acontece depois?’",
  "ETAPA 1 — ‘Você registra o perfil e os dados da sua empresa.’",
  "ETAPA 2 — ‘Nossa equipe analisa as informações comerciais e a aderência inicial.’",
  "ETAPA 3 — ‘Se fizer sentido, poderá entrar em contato para avançar para uma conversa mais detalhada.’",
  "FECHAMENTO — ‘Não é aprovação de crédito. É uma conversa que começa com informação.’"
 ],production:"Intercalar fala de Renato com gravação real da tela do site; não mostrar cadastros de terceiros.",caption:"Sem promessas vazias. Entenda o caminho antes de clicar.",cta:"Inicie seu pré-diagnóstico pelo link da bio.",owner:"Renato + captura de tela"},
 {day:25,format:"Reel",stage:"Conversão",headline:"VOCÊ REALMENTE SABE QUANTO A SUA EMPRESA TEM PARA RECEBER?",aim:"Levar empresário a se autoavaliar.",scenes:[
  "GANCHO — ‘Sem olhar no sistema agora: você consegue me dizer quanto sua empresa tem para receber?’",
  "PERGUNTAS — ‘Quanto vence nesta semana? Quanto está atrasado? Quanto depende de um único cliente?’",
  "PONTO — ‘Se essas respostas não estão claras, talvez o crescimento esteja apoiado em informação insuficiente.’",
  "CONVITE — ‘O primeiro passo é conhecer a operação. Comece pelo nosso pré-diagnóstico.’"
 ],production:"Um take forte com pausas entre as perguntas; gráficos apenas ilustrativos.",caption:"Não se administra aquilo que não se enxerga.",cta:"Avalie a aderência da empresa no link da bio.",owner:"Renato"},
 {day:26,format:"Carrossel",stage:"Conversão",headline:"ANTES DE PENSAR EM CRÉDITO, VERIFIQUE ISSO",aim:"Qualificar interesse e trabalhar objeções.",scenes:[
  "SLIDE 1 — Antes de pensar em crédito, verifique isso.",
  "SLIDE 2 — Seus recebíveis têm documentação?",
  "SLIDE 3 — A inadimplência está sendo acompanhada?",
  "SLIDE 4 — Há concentração excessiva em poucos pagadores?",
  "SLIDE 5 — Sua margem suporta o custo da operação?",
  "SLIDE 6 — Você conhece as condições e os riscos de cada instrumento?",
  "SLIDE 7 — Crédito responsável começa com diagnóstico."
 ],production:"Design clean, selos checklist; não estabelecer aprovação automática por resposta.",caption:"O recurso financeiro só faz sentido quando o custo e o risco cabem na empresa.",cta:"Faça o pré-diagnóstico no link da bio.",owner:"Copy + design"},
 {day:27,format:"Reel",stage:"Conversão",headline:"RENATO, EU QUERO CRESCER. MAS POR ONDE COMEÇO?",aim:"Criar transição direta para formulário.",scenes:[
  "GANCHO — Renato em voz de interlocutor: ‘Renato, minha empresa pode crescer mais. Mas por onde eu começo?’",
  "RESPOSTA — ‘Começa entendendo como vende, como recebe e onde o dinheiro fica preso.’",
  "CONVITE — ‘Preparamos um pré-diagnóstico curto para conhecer o perfil da sua operação.’",
  "ALINHAMENTO — ‘A partir das informações, nossa equipe poderá avaliar se faz sentido conversar.’"
 ],production:"Gravar com leve mudança de enquadramento na pergunta e na resposta; credibilidade sem pressa artificial.",caption:"Você não precisa começar com uma decisão grande. Precisa começar com perguntas certas.",cta:"Acesse o link da bio.",owner:"Renato"},
 {day:28,format:"Stories",stage:"Conversão",headline:"FAÇA O PRÉ-DIAGNÓSTICO COMIGO",aim:"Mostrar o passo a passo do site.",scenes:[
  "STORY 1 — Captura real: abrir site no celular e tocar em ‘Descobrir se tenho perfil’.",
  "STORY 2 — Mostrar pergunta 1 e explicar que existem quatro perguntas rápidas.",
  "STORY 3 — Mostrar campos de cadastro, ocultando qualquer dado pessoal.",
  "STORY 4 — Sticker de link direto; reforçar ‘triagem comercial, sem aprovação automática’."
 ],production:"Screen recording mobile, sem preenchimento com dados reais de terceiros.",caption:"Demonstrar o caminho exato e reduzir fricção.",cta:"Acessar pelo link do Story.",owner:"Social media"},
 {day:29,format:"Reel",stage:"Conversão",headline:"QUEM DECIDE SEM CONHECER OS NÚMEROS, NEGOCIA NO ESCURO",aim:"Fechar a sequência com autoridade.",scenes:[
  "GANCHO — ‘Seu concorrente pode não ter produto melhor. Talvez tenha informações melhores.’",
  "DESENVOLVIMENTO — ‘Ele conhece prazos, custos, carteira e condições antes de negociar.’",
  "PONTO — ‘Sua empresa precisa decidir com método em vez de depender só de experiência e improviso.’",
  "CONVITE — ‘Quer avaliar se existe aderência ao Crédito que Escala? Comece pelo pré-diagnóstico.’"
 ],production:"Renato em plano fechado, cortes de dados genéricos, tela do link da bio no encerramento.",caption:"Decisão comercial sem informação é um risco que ninguém precisa romantizar.",cta:"Faça o pré-diagnóstico no link da bio.",owner:"Renato"},
 {day:30,format:"Reel",stage:"Conversão",headline:"VOCÊ APRENDEU A VENDER. CHEGOU A HORA DE APRENDER A RECEBER.",aim:"Fechamento de campanha e ativação de leads.",scenes:[
  "GANCHO — ‘Você já sabe que vender é importante. Mas e o que acontece depois da venda?’",
  "RECAP — ‘Falamos sobre preço, margem, prazo, cobrança e carteira de recebíveis.’",
  "VIRADA — ‘Tudo isso precisa trabalhar junto — com método, tecnologia e pessoas preparadas.’",
  "CONVITE — ‘Crédito que Escala. Avalie o perfil da sua empresa e descubra se faz sentido dar o próximo passo.’"
 ],production:"Montagem com os melhores cortes reais do mês, Renato fechando na câmera e CTA limpo.",caption:"Um mês de conteúdo não muda uma empresa sozinho. Mas pode mudar a pergunta que começa uma transformação.",cta:"Link da bio — faça seu pré-diagnóstico.",owner:"Renato + audiovisual"}
,
 {day:31,format:"Reel · Leia a legenda",stage:"Atenção",headline:"SUA EMPRESA PODE ESTAR FINANCIANDO CLIENTES POR FALTA DE PROCESSOS.",aim:"Falta de processos pode custar dinheiro.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['SUA', 'EMPRESA', 'PODE', 'ESTAR']", "2–6s — Headline completa em tela: SUA EMPRESA PODE ESTAR FINANCIANDO CLIENTES POR FALTA DE PROCESSOS.", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Quando cada vendedor define um prazo diferente, ninguém registra quem aprovou a condição e o financeiro só descobre a venda depois, a empresa pode acabar financiando o cliente sem planejar.\n\nO problema não é vender a prazo. É não ter regras claras para negociar, aprovar, registrar e acompanhar recebimentos.\n\nGestão de processos é estabelecer responsáveis, critérios e indicadores. Sem isso, o comercial comemora e o financeiro corre atrás.\n\nNa sua empresa, existe uma política formal para negociar prazos?",cta:"Comente se sua empresa tem uma política de prazo.",owner:"Fábio + audiovisual"},
 {day:32,format:"Reel · Leia a legenda",stage:"Atenção",headline:"FATURAMENTO ALTO NÃO CONSERTA UMA OPERAÇÃO DESORGANIZADA.",aim:"Faturamento não é caixa.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['FATURAMENTO', 'ALTO', 'NÃO', 'CONSERTA']", "2–6s — Headline completa em tela: FATURAMENTO ALTO NÃO CONSERTA UMA OPERAÇÃO DESORGANIZADA.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Tem empresa que vende mais a cada mês e continua com o caixa apertado. Isso acontece porque faturar não é receber.\n\nQuando a empresa entrega hoje, paga os custos agora e recebe meses depois, o crescimento pode aumentar a necessidade de capital de giro.\n\nAntes de buscar mais vendas, descubra o que já foi vendido, quando será recebido e qual o custo de esperar.\n\nSua gestão acompanha os recebíveis com a mesma disciplina que acompanha as vendas?",cta:"Envie a um empresário que acompanha apenas faturamento.",owner:"Renato + edição"},
 {day:33,format:"Reel · Leia a legenda",stage:"Educação",headline:"O DESCONTO QUE FECHA A VENDA PODE DESTRUIR SUA MARGEM.",aim:"O preço não conta a história inteira.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['O', 'DESCONTO', 'QUE', 'FECHA']", "2–6s — Headline completa em tela: O DESCONTO QUE FECHA A VENDA PODE DESTRUIR SUA MARGEM.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Um desconto pode ajudar a fechar um pedido. Mas, se você também oferece um prazo longo, pode reduzir a margem duas vezes: pelo preço menor e pelo custo de esperar o recebimento.\n\nNão significa que desconto ou parcelamento sejam sempre ruins. Significa que precisam de limites, alçadas de aprovação e cálculo.\n\nAntes de fechar, pergunte: quanto sobra depois dos custos? Quanto tempo vou esperar? Quem assume o risco?\n\nTeste essas condições na calculadora gratuita do Crédito que Escala, no link da bio.",cta:"Simule o custo da venda a prazo no link da bio.",owner:"Renato + edição"},
 {day:34,format:"Reel · Leia a legenda",stage:"Educação",headline:"SE A COBRANÇA DEPENDE DA MEMÓRIA DE ALGUÉM, NÃO É PROCESSO.",aim:"Cobrança é rotina, não improviso.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['SE', 'A', 'COBRANÇA', 'DEPENDE']", "2–6s — Headline completa em tela: SE A COBRANÇA DEPENDE DA MEMÓRIA DE ALGUÉM, NÃO É PROCESSO.", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Uma cobrança esquecida parece um detalhe. Até que dezenas de atrasos começam a pressionar o caixa.\n\nSe a rotina depende de alguém lembrar de ligar, conferir um vencimento ou registrar um acordo, você não tem um processo confiável. Tem uma dependência.\n\nUm bom fluxo define quem acompanha os títulos, quando acontece o contato, como o atraso é registrado e quais situações precisam ser escaladas.\n\nA empresa não precisa cobrar de forma agressiva. Precisa cobrar de forma organizada, profissional e documentada.\n\nA sua cobrança tem rotina ou só começa quando o dinheiro falta?",cta:"Salve para discutir com o financeiro.",owner:"Fábio + edição"},
 {day:35,format:"Reel · Leia a legenda",stage:"Educação",headline:"PARCELAR SEM FAZER A CONTA É DECIDIR NO ESCURO.",aim:"R$ 10 mil hoje e R$ 10 mil parcelados não são iguais.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['PARCELAR', 'SEM', 'FAZER', 'A']", "2–6s — Headline completa em tela: PARCELAR SEM FAZER A CONTA É DECIDIR NO ESCURO.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Uma venda de R$ 10 mil recebida hoje não tem necessariamente o mesmo valor econômico que R$ 10 mil recebidos em seis meses.\n\nEntre o pedido e a última parcela existem tempo, custo de capital, taxas e risco de inadimplência.\n\nPrazo pode ser uma vantagem comercial, desde que a empresa saiba o impacto da condição no resultado.\n\nCriamos uma calculadora gratuita para simular essas variáveis. É uma ferramenta educativa, não uma recomendação automática de preço.\n\nAcesse no link da bio e faça a conta com os números da sua operação.",cta:"Link da bio: calculadora gratuita.",owner:"Renato + social"},
 {day:36,format:"Reel · Leia a legenda",stage:"Educação",headline:"QUEM APROVA O PRAZO NA SUA EMPRESA?",aim:"Alçada de aprovação também é gestão.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['QUEM', 'APROVA', 'O', 'PRAZO']", "2–6s — Headline completa em tela: QUEM APROVA O PRAZO NA SUA EMPRESA?", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Se cada vendedor pode decidir sozinho desconto, prazo e exceções, a empresa pode assumir riscos que ninguém acompanhou.\n\nNão se trata de engessar o comercial. Trata-se de definir o que pode ser negociado livremente e o que exige aprovação.\n\nUma política comercial clara estabelece limites, responsabilidades, documentação e critérios para exceções.\n\nProcesso bom não é aquele que atrasa a venda. É aquele que torna a decisão consistente e reduz retrabalho entre comercial e financeiro.\n\nNa sua empresa, existe uma alçada formal ou tudo se resolve no WhatsApp?",cta:"Compartilhe com o gestor comercial.",owner:"Fábio + edição"},
 {day:37,format:"Reel · Leia a legenda",stage:"Desejo",headline:"SEU COMERCIAL BATE A META. SEU CAIXA NÃO ACOMPANHA.",aim:"A qualidade da venda também é um indicador.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['SEU', 'COMERCIAL', 'BATE', 'A']", "2–6s — Headline completa em tela: SEU COMERCIAL BATE A META. SEU CAIXA NÃO ACOMPANHA.", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"O comercial pode bater todas as metas e ainda assim deixar um problema para o financeiro.\n\nIsso acontece quando cada área olha apenas para seus números. Uma acompanha pedidos; a outra acompanha vencimentos; a direção tenta entender por que o dinheiro não chegou.\n\nO que falta é uma visão integrada: margem, prazo médio, atrasos, carteira a vencer e necessidade de capital de giro.\n\nVender mais importa. Vender com condições que a empresa consegue sustentar importa tanto quanto.\n\nSeu comercial conhece o impacto financeiro das condições que oferece?",cta:"Marque quem precisa integrar comercial e financeiro.",owner:"Fábio + equipe"},
 {day:38,format:"Reel · Leia a legenda",stage:"Desejo",headline:"CRÉDITO NÃO CONSERTA UMA OPERAÇÃO DESORGANIZADA.",aim:"Dinheiro sem método pode ampliar o problema.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['CRÉDITO', 'NÃO', 'CONSERTA', 'UMA']", "2–6s — Headline completa em tela: CRÉDITO NÃO CONSERTA UMA OPERAÇÃO DESORGANIZADA.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Capital pode abrir oportunidades. Mas também pode ampliar dificuldades quando a empresa não sabe como usar e como devolver esse dinheiro.\n\nAntes de buscar crédito, vale revisar a qualidade da carteira, a margem das vendas, os prazos negociados e a previsibilidade de caixa.\n\nUma solução financeira não substitui política comercial, documentação, cobrança e gestão de riscos.\n\nPor isso o Crédito que Escala não se resume a buscar recursos: a proposta conecta método, tecnologia, capacitação e implantação conforme o diagnóstico.\n\nSua operação está preparada para tomar uma boa decisão sobre crédito?",cta:"Conheça o método no link da bio.",owner:"Renato + edição"},
 {day:39,format:"Reel · Leia a legenda",stage:"Desejo",headline:"O QUE NÃO ESTÁ DOCUMENTADO VIRA DEPENDÊNCIA.",aim:"Sua empresa depende de heróis?",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['O', 'QUE', 'NÃO', 'ESTÁ']", "2–6s — Headline completa em tela: O QUE NÃO ESTÁ DOCUMENTADO VIRA DEPENDÊNCIA.", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Toda empresa tem aquela pessoa que resolve tudo. O problema começa quando só ela sabe aprovar uma condição, consultar um recebível ou conduzir uma cobrança.\n\nSe o conhecimento está apenas na cabeça de alguém, a operação não escala com segurança.\n\nDocumentar processos não significa criar burocracia infinita. Significa registrar critérios, responsáveis, etapas e indicadores para que boas decisões possam ser repetidas.\n\nUma empresa preparada para crescer não depende de heróis todos os dias. Depende de pessoas capacitadas e de estrutura.\n\nQual processo pararia se uma pessoa-chave saísse de férias?",cta:"Salve e leve à próxima reunião de gestão.",owner:"Fábio + edição"},
 {day:40,format:"Reel · Leia a legenda",stage:"Desejo",headline:"SE VOCÊ NÃO CONHECE SUA CARTEIRA, NÃO CONHECE SEU RISCO.",aim:"O total a receber é só o começo.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['SE', 'VOCÊ', 'NÃO', 'CONHECE']", "2–6s — Headline completa em tela: SE VOCÊ NÃO CONHECE SUA CARTEIRA, NÃO CONHECE SEU RISCO.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Não basta saber quanto sua empresa tem a receber.\n\nÉ preciso entender quando cada valor vence, quais clientes concentram a carteira, o que já está atrasado e como os recebimentos se distribuem ao longo do tempo.\n\nDuas empresas podem ter o mesmo volume de recebíveis e níveis de risco muito diferentes.\n\nUma pode ter carteira diversificada e documentada. Outra pode depender de poucos pagadores e acumular atrasos.\n\nGestão de recebíveis não é olhar um número no sistema. É entender o que existe por trás dele.\n\nVocê conhece a concentração da sua carteira?",cta:"Compartilhe com o responsável financeiro.",owner:"Renato + edição"},
 {day:41,format:"Reel · Leia a legenda",stage:"Conversão",headline:"ANTES DE VENDER MAIS, DESCUBRA ONDE O DINHEIRO FICA PRESO.",aim:"Mais vendas nem sempre resolvem o caixa.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['ANTES', 'DE', 'VENDER', 'MAIS,']", "2–6s — Headline completa em tela: ANTES DE VENDER MAIS, DESCUBRA ONDE O DINHEIRO FICA PRESO.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"A primeira reação de muitos empresários ao caixa apertado é buscar mais vendas.\n\nMas, se a empresa paga antes de receber, negocia sem conhecer a margem ou não acompanha atrasos, ampliar o volume pode aumentar a pressão sobre o capital de giro.\n\nAntes de acelerar, mapeie três pontos: quanto tem a receber, quando esse dinheiro entra e quanto custa esperar.\n\nO Crédito que Escala foi idealizado para conectar crescimento comercial e estrutura de gestão.\n\nQuer avaliar se o método faz sentido para a sua empresa? Comece pelo pré-diagnóstico gratuito no link da bio.",cta:"Pré-diagnóstico gratuito no link da bio.",owner:"Renato + social"},
 {day:42,format:"Reel · Leia a legenda",stage:"Conversão",headline:"O PROCESSO QUE VOCÊ NÃO MEDE ESTÁ CONTROLANDO SUA EMPRESA.",aim:"O que você não acompanha pode surpreender.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['O', 'PROCESSO', 'QUE', 'VOCÊ']", "2–6s — Headline completa em tela: O PROCESSO QUE VOCÊ NÃO MEDE ESTÁ CONTROLANDO SUA EMPRESA.", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"O problema de uma empresa sem indicadores não é apenas a falta de informação. É a demora para perceber que algo saiu do controle.\n\nQuando o atraso cresce, a margem cai ou o prazo de negociação se alonga, o gestor precisa enxergar cedo.\n\nUm processo saudável tem três elementos: uma regra clara, alguém responsável e um indicador para acompanhar o resultado.\n\nSem esses pontos, a empresa depende de improviso.\n\nGestão não é controlar cada movimento da equipe. É criar condições para o negócio funcionar com previsibilidade.\n\nQual indicador você deveria acompanhar toda semana, mas ainda não acompanha?",cta:"Responda nos comentários com o indicador que falta.",owner:"Fábio + edição"},
 {day:43,format:"Reel · Leia a legenda",stage:"Conversão",headline:"SEU PREÇO CONSIDERA O TEMPO QUE VOCÊ DEMORA PARA RECEBER?",aim:"Seu preço foi pensado para o prazo?",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['SEU', 'PREÇO', 'CONSIDERA', 'O']", "2–6s — Headline completa em tela: SEU PREÇO CONSIDERA O TEMPO QUE VOCÊ DEMORA PARA RECEBER?", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"O mesmo preço pode produzir resultados econômicos diferentes dependendo de quando o dinheiro entra.\n\nSe você vende à vista, recebe hoje. Se parcela, precisa esperar, financiar parte do ciclo e considerar o risco de não pagamento.\n\nIsso não significa cobrar mais em toda venda parcelada. Significa entender o impacto antes de definir uma condição.\n\nCriamos uma calculadora gratuita que permite simular custos, impostos, taxas, parcelas e inadimplência esperada.\n\nEla é educativa e não determina o preço ideal.\n\nFaça uma simulação com os números da sua operação. Link na bio.",cta:"Link da bio: calculadora de venda a prazo.",owner:"Renato + social"},
 {day:44,format:"Reel · Leia a legenda",stage:"Conversão",headline:"SEU NEGÓCIO ESTÁ PRONTO PARA ESCALAR OU SÓ PARA VENDER MAIS?",aim:"Escalar exige processo repetível.",scenes:["0–2s — Take vertical real de Fábio (sem depender do áudio). Texto: ['SEU', 'NEGÓCIO', 'ESTÁ', 'PRONTO']", "2–6s — Headline completa em tela: SEU NEGÓCIO ESTÁ PRONTO PARA ESCALAR OU SÓ PARA VENDER MAIS?", "6–8s — Leia a legenda ↓"],production:"Fábio: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Crescer e escalar não são exatamente a mesma coisa.\n\nVender mais pode exigir mais gente, dinheiro e improviso. Escalar com estrutura exige que processos, critérios e indicadores acompanhem a demanda.\n\nAntes de acelerar, pergunte: a equipe conhece limites de negociação? O financeiro acompanha recebíveis? A cobrança tem rotina? As decisões são documentadas?\n\nEssas perguntas mostram onde a estrutura precisa amadurecer.\n\nO Crédito que Escala reúne metodologia e capacitação para organizar decisões comerciais e financeiras conforme a realidade de cada empresa.\n\nQuer avaliar a aderência à sua operação? Pré-diagnóstico no link da bio.",cta:"Pré-diagnóstico no link da bio.",owner:"Fábio + equipe"},
 {day:45,format:"Reel · Leia a legenda",stage:"Conversão",headline:"CRESCER NÃO É VENDER MAIS A QUALQUER CUSTO.",aim:"O crescimento precisa ser sustentável.",scenes:["0–2s — Take vertical real de Renato (sem depender do áudio). Texto: ['CRESCER', 'NÃO', 'É', 'VENDER']", "2–6s — Headline completa em tela: CRESCER NÃO É VENDER MAIS A QUALQUER CUSTO.", "6–8s — Leia a legenda ↓"],production:"Renato: selecionar take autêntico de 8 segundos, mesmo sem fala aproveitável; áudio ambiente opcional, texto de alto contraste, sem inventar cenas ou dados. Usar a legenda integral abaixo como texto final do post.",caption:"Existe uma diferença entre vender muito e construir um negócio capaz de sustentar as próprias vendas.\n\nUma operação preparada entende suas margens, conhece os recebíveis, define critérios de prazo, acompanha riscos e integra comercial e financeiro.\n\nEla não depende apenas de uma boa negociação. Depende de processos que possam ser repetidos.\n\nÉ essa visão que orienta o Crédito que Escala, idealizado por Renato Junqueira: método, tecnologia e capacitação para estruturar decisões comerciais e financeiras.\n\nNão existe promessa de resultado igual para todas as empresas. Existe a necessidade de começar com diagnóstico, dados e responsabilidade.\n\nSua empresa está preparada para o próximo passo? Faça o pré-diagnóstico no link da bio.",cta:"Pré-diagnóstico gratuito no link da bio.",owner:"Renato + edição"}
];


// Preserva os três primeiros conteúdos e intercala os 15 Reels de leitura
// entre os conteúdos originais, sem remover ou alterar nenhum roteiro.
// sourceDay mantém os checks de produção/publicação vinculados ao conteúdo
// original mesmo após a renumeração visual da trilha.
const firstThree=sourceContentPlan.slice(0,3);
const remainingOriginals=sourceContentPlan.slice(3,30);
const readCaptionReels=sourceContentPlan.slice(30);
const interleaved:ContentPlan[]=[...firstThree];
let reelIndex=0;
for(let i=0;i<remainingOriginals.length;i++){
 interleaved.push(remainingOriginals[i]);
 // 15 inserções distribuídas nos 27 conteúdos originais restantes.
 const target=Math.floor((i+1)*readCaptionReels.length/remainingOriginals.length);
 while(reelIndex<target)interleaved.push(readCaptionReels[reelIndex++]);
}
export const contentPlan:ContentPlan[]=interleaved.map((content,index)=>({
 ...content,
 sourceDay:content.day,
 day:index+1
}));
