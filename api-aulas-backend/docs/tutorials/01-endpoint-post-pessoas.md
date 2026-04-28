# Tutorial 1 - Criar endpoint de cadastro de pessoas (POST)

Objetivo: criar `POST /api/pessoas` para cadastrar uma pessoa no MySQL.

## Resultado esperado

- Recebe JSON com `nome`, `email`, `idade`
- Valida campos basicos
- Salva no banco
- Retorna `201 Created` com pessoa criada

## Passo 1 - Repository (SQL)

Crie o arquivo `src/repositories/pessoaRepository.js`:

```js
const db = require("../config/db");

async function createPessoa({ nome, email, idade }) {
  const [result] = await db.query(
    "INSERT INTO pessoas (nome, email, idade) VALUES (?, ?, ?)",
    [nome, email, idade]
  );

  return { id: result.insertId, nome, email, idade };
}

async function findByEmail(email) {
  const [rows] = await db.query("SELECT * FROM pessoas WHERE email = ?", [email]);
  return rows[0] || null;
}

module.exports = { createPessoa, findByEmail };
```

Por que aqui? Porque SQL deve ficar na camada `repository`.

## Passo 2 - Service (regra de negocio)

Crie `src/services/pessoaService.js`:

```js
const pessoaRepository = require("../repositories/pessoaRepository");

function validatePayload({ nome, email, idade }) {
  if (!nome || !email || idade === undefined) {
    const error = new Error("nome, email e idade sao obrigatorios");
    error.statusCode = 400;
    throw error;
  }

  if (typeof idade !== "number" || idade < 0) {
    const error = new Error("idade deve ser numero maior ou igual a zero");
    error.statusCode = 400;
    throw error;
  }
}

async function createPessoa(data) {
  validatePayload(data);

  const existing = await pessoaRepository.findByEmail(data.email);
  if (existing) {
    const error = new Error("Ja existe pessoa com este email");
    error.statusCode = 409;
    throw error;
  }

  return pessoaRepository.createPessoa(data);
}

module.exports = { createPessoa };
```

Por que aqui? Validacoes e regras ficam no `service`.

## Passo 3 - Controller (HTTP)

Crie `src/controllers/pessoaController.js`:

```js
const pessoaService = require("../services/pessoaService");

async function createPessoa(req, res, next) {
  try {
    const pessoa = await pessoaService.createPessoa(req.body);
    return res.status(201).json(pessoa);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createPessoa };
```

Por que aqui? Controller so recebe `req`, chama service e devolve `res`.

## Passo 4 - Route

Crie `src/routes/pessoaRoutes.js`:

```js
const express = require("express");
const pessoaController = require("../controllers/pessoaController");

const router = express.Router();

router.post("/", pessoaController.createPessoa);

module.exports = router;
```

## Passo 5 - Registrar rota no app

No `src/app.js`, adicione:

```js
const pessoaRoutes = require("./routes/pessoaRoutes");
app.use("/api/pessoas", pessoaRoutes);
```

## Passo 6 - Teste no Insomnia/Postman

Request:

- Metodo: `POST`
- URL: `http://localhost:3000/api/pessoas`
- Body JSON:

```json
{
  "nome": "Maria",
  "email": "maria@email.com",
  "idade": 22
}
```

Resposta esperada:

- Status `201`
- JSON com `id`, `nome`, `email`, `idade`

## Erros que devem acontecer (didatica)

- Campo faltando -> `400`
- `idade` invalido -> `400`
- Email repetido -> `409`

Esses testes ajudam a explicar regra de negocio para os alunos.
