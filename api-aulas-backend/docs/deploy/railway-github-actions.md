# Deploy automatico no Railway com GitHub Actions

Este guia mostra, do zero, como:

1. criar contas (GitHub + Railway),
2. publicar a API no Railway pela primeira vez,
3. configurar deploy automatico com GitHub Actions,
4. manter deploys seguintes de forma simples.

> Stack deste projeto: Node.js + Express + MySQL.

---

## 1) Visao geral da automacao

Quando voce fizer `git push` na branch `main`, o GitHub Actions executa o workflow:

- instala Railway CLI,
- autentica com `RAILWAY_TOKEN`,
- executa `railway up --ci`,
- publica nova versao da API no Railway.

Workflow criado neste repositorio:

- `.github/workflows/deploy-railway.yml`

---

## 2) Criacao das contas (passo a passo)

## 2.1 Conta no GitHub

1. Acesse [https://github.com/signup](https://github.com/signup).
2. Crie usuario, email e senha.
3. Verifique o email.
4. Crie um repositorio para a API (ou use um existente).

O que isso faz:

- GitHub armazena seu codigo e dispara pipelines de CI/CD.

## 2.2 Conta no Railway

1. Acesse [https://railway.app](https://railway.app).
2. Clique em **Login / Sign up**.
3. Entre com GitHub (recomendado para facilitar integracao).
4. Conclua onboarding.

O que isso faz:

- Railway hospeda sua API e (se quiser) o banco dentro do mesmo projeto.

---

## 3) Criar projeto no Railway (primeiro deploy)

## 3.1 Criar projeto e servico da API

1. No Railway, clique em **New Project**.
2. Escolha uma destas opcoes:
   - **Deploy from GitHub Repo** (mais simples), ou
   - **Empty Project** (se quiser controlar tudo manualmente via Action).
3. Crie um servico para a API (nome sugerido: `api-aulas-backend`).

## 3.2 Criar banco MySQL no mesmo projeto (opcional, recomendado)

1. Dentro do mesmo projeto Railway, clique em **New** -> **Database** -> **MySQL**.
2. Aguarde provisionamento.
3. No servico da API, abra **Variables** e adicione referencias do MySQL para:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
4. Adicione tambem:
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN` (ex.: `1d`)
   - `PORT` (opcional; Railway normalmente injeta porta automaticamente)

O que isso faz:

- API passa a ler config direto das variaveis de ambiente do Railway.

## 3.3 Rodar script SQL inicial

No MySQL hospedado, execute o script:

- `sql/init.sql`

Esse script cria tabela(s) e usuario padrao para testes.

---

## 4) Configurar token do Railway para o GitHub Actions

## 4.1 Criar Project Token no Railway

1. Abra o projeto no Railway.
2. Va em **Settings** -> **Tokens**.
3. Gere um **Project Token**.
4. Copie o token.

O que isso faz:

- Permite deploy no projeto sem `railway login` interativo.
- Token e restrito ao projeto/ambiente, mais seguro para CI.

## 4.2 Criar Secret no GitHub

1. No GitHub, abra o repositorio.
2. **Settings** -> **Secrets and variables** -> **Actions**.
3. Clique em **New repository secret**:
   - Nome: `RAILWAY_TOKEN`
   - Valor: token copiado do Railway

## 4.3 (Opcional) Criar Variables no GitHub

Ainda em **Secrets and variables** -> **Actions**, aba **Variables**, voce pode criar:

- `RAILWAY_SERVICE` -> nome do servico da API no Railway (ex.: `api-aulas-backend`)
- `RAILWAY_DEPLOY_PATH` -> caminho do codigo a subir (use `.` neste repo)
- `RAILWAY_PROJECT_ID` -> ID do projeto Railway (opcional)
- `RAILWAY_ENVIRONMENT` -> nome do ambiente (ex.: `production`; obrigatorio se usar `RAILWAY_PROJECT_ID`)

Quando usar cada uma:

- **Somente `RAILWAY_TOKEN`**: caminho mais simples.
- **`RAILWAY_SERVICE`**: importante quando ha mais de um servico no projeto.
- **`RAILWAY_PROJECT_ID` + `RAILWAY_ENVIRONMENT`**: util para pipelines avancadas/multiambiente.

---

## 5) Workflow de deploy ja criado

Arquivo:

- `.github/workflows/deploy-railway.yml`

Disparos:

- `push` em `main`
- `workflow_dispatch` (manual pela aba Actions)

Resumo do que ele faz:

1. checkout do codigo
2. setup Node.js
3. instala `@railway/cli`
4. executa `railway up --ci` (com flags opcionais conforme variables)

---

## 6) Primeiro deploy (checklist)

1. Suba o codigo para o GitHub.
2. Garanta `RAILWAY_TOKEN` configurado nos secrets.
3. (Opcional) Configure `RAILWAY_SERVICE`.
4. Faça um commit na `main` (ou rode manualmente o workflow).
5. Acompanhe logs em:
   - GitHub Actions (pipeline)
   - Railway (build/deploy)
6. Teste URL publica da API:
   - `GET /`
   - `GET /health`

Se `health` responder, deploy inicial esta concluido.

---

## 7) Deploys seguintes (apos ja hospedado)

Fluxo normal do dia a dia:

1. Desenvolve localmente.
2. Commit + push para `main`.
3. GitHub Actions dispara automaticamente.
4. Railway publica nova versao.

Sem etapas manuais extras, a menos que mude variaveis de ambiente ou banco.

---

## 8) Troubleshooting rapido

## Erro: `Project Token not found`

- Verifique se `RAILWAY_TOKEN` existe nos secrets do GitHub.
- Confirme se o token e do projeto correto.

## Erro de servico incorreto

- Defina `RAILWAY_SERVICE` com o nome exato do servico no Railway.

## Build sobe, mas API cai em runtime

- Revisar variaveis (`DB_*`, `JWT_*`) no Railway.
- Confirmar que o banco esta acessivel e com schema aplicado (`sql/init.sql`).

## Monorepo (codigo da API em subpasta)

- Defina `RAILWAY_DEPLOY_PATH` com a pasta da API (ex.: `api-aulas-backend`).

---

## 9) Sugestao de boas praticas para aula

- Branch protegida para `main`.
- Deploy automatico apenas na `main`.
- Ambiente de homologacao (staging) para testes dos alunos.
- Sempre validar `GET /health` apos cada deploy.
