# API Backend para Aulas (Node.js + MySQL)

Projeto didatico para aulas introdutorias de backend com Node.js.

## Objetivo

Este projeto foi montado para ensinar uma API simples com:

- Express para rotas HTTP
- MySQL para persistencia de dados
- Login com JWT
- Senha com hash usando bcrypt
- Estrutura em camadas facil de entender e expandir

## Estrutura do projeto

```txt
src/
  config/        # Configuracoes (ex.: conexao com banco)
  controllers/   # Entrada e saida HTTP (req/res)
  middlewares/   # Regras transversais (auth e erro)
  repositories/  # Acesso ao banco e SQL
  routes/        # Definicao das rotas da API
  services/      # Regras de negocio
  app.js         # Configura app Express
  server.js      # Sobe o servidor
public/
  landing.html   # Pagina inicial (landing do produto) em GET /
  api-docs.html  # Documentacao rapida da API em GET /api
  css/landing.css
sql/
  init.sql       # Script de criacao do banco/tabela
```

Fluxo principal: `rota -> controller -> service -> repository -> banco`.

## Como rodar

1) Instale dependencias:

```bash
npm install
```

2) Configure o arquivo `.env` com os dados do seu MySQL.

3) Execute o SQL de inicializacao:

```sql
source sql/init.sql;
```

4) Rode em modo desenvolvimento:

```bash
npm run dev
```

## Paginas web (HTML)

- `GET /` — landing page do produto (app mobile + API); edite `public/landing.html` e `public/css/landing.css`
- `GET /api` — documentacao rapida dos endpoints (antiga pagina inicial)

## Endpoints disponiveis

### Health check

- `GET /health`

Resposta:

```json
{ "status": "ok" }
```

### Registro de usuario

- `POST /api/auth/register`

Body:

```json
{
  "name": "Aluno 1",
  "email": "aluno1@escola.com",
  "password": "123456"
}
```

### Login

- `POST /api/auth/login`

Body:

```json
{
  "email": "aluno1@escola.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt-aqui",
  "usuario": {
    "id": 1,
    "name": "Aluno 1",
    "email": "aluno1@escola.com"
  }
}
```

## Como criar um novo modulo (modelo + endpoint)

Exemplo para `produtos`:

1) Crie `src/repositories/productRepository.js` com as queries SQL.
2) Crie `src/services/productService.js` com regra de negocio.
3) Crie `src/controllers/productController.js` para req/res.
4) Crie `src/routes/productRoutes.js` com rotas REST.
5) Registre rota no `src/app.js` com `app.use("/api/products", productRoutes)`.

Esse padrao permite evoluir rapido sem perder a didatica.

## App mobile (React Native / Expo)

Projeto irmão que consome esta API (login + tutoriais de consumo de endpoints):

- Pasta: `../mobile-app`
- Documentacao: `../mobile-app/README.md`

## Deploy automatico (Railway + GitHub Actions)

- Guia completo: `docs/deploy/railway-github-actions.md`
- Workflow (na raiz do repositorio): `../.github/workflows/deploy-railway.yml`

## Tutoriais praticos (passo a passo)

- Guia inicial dos roteiros: `docs/tutorials/00-como-usar-roteiros.md`
- Tutorial 1 - Cadastrar pessoas (POST): `docs/tutorials/01-endpoint-post-pessoas.md`
- Tutorial 2 - Listar pessoas (GET): `docs/tutorials/02-endpoint-get-pessoas.md`
- Tutorial 3 - GET por ID, PUT e DELETE: `docs/tutorials/03-endpoints-complementares-pessoas.md`
- Checklist para criar novos modulos: `docs/tutorials/04-checklist-novo-modulo.md`
