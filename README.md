# Crédito que Escala

Projeto da página de apresentação, calculadora de vendas a prazo e painel do funil digital.

**Site em produção:** https://creditoqueescala.higgsfield.app/

## Código-fonte

Esta cópia do GitHub contém arquivos centrais da aplicação. **A migração dos arquivos para a árvore Git ainda é parcial.** O pacote completo exportado do repositório original no Higgsfield (incluindo os arquivos e assets rastreados) está disponível no arquivo:

[Baixar o código-fonte completo em ZIP](https://d2ol7oe51mr4n9.cloudfront.net/user_3JpSqGKJkvhjIC903owkI3HCc1l/9b543e42-3914-42f2-a4e0-84799d8c7eca.zip)

Para importar tudo na árvore do GitHub: baixe o ZIP, extraia seu conteúdo na raiz de uma cópia deste repositório e faça commit e push dos arquivos. Verifique alterações antes de sobrescrever arquivos existentes.

## Estrutura

- `app/src/routes/index.tsx`: página principal
- `app/src/routes/calculadora.tsx`: calculadora financeira
- `app/src/routes/funil.tsx`: mapa do funil digital
- `app/src/components/funnel/content-calendar.ts`: calendário de 45 conteúdos
- `app/src/routes/api/`: APIs administrativas, leads e progresso
- `app/migrations/`: migrações de banco de dados
- `app/public/`: recursos visuais e estáticos (no pacote completo)

## Execução

O projeto original é uma aplicação TanStack Start / React com dependências locais em `app/packages`, gerenciada por Bun, compilada para Cloudflare Workers. Para uma instalação funcional, importe **todo o ZIP** (e não apenas os arquivos já presentes na árvore deste repositório).

Este repositório não inclui os dados persistidos no ambiente de produção, como leads, registros de acompanhamento, senhas ou segredos. Publicar os arquivos não migra automaticamente o banco nem reconfigura o domínio.

> Repositório criado como público no GitHub. Revise a visibilidade e as permissões de acesso antes de acrescentar código ou dados confidenciais.
