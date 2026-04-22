# Tutorial 2 - Criar endpoint de listagem de pessoas (GET)

Objetivo: criar `GET /api/pessoas` para listar todas as pessoas.

## Resultado esperado

- Retorna lista de pessoas em JSON
- Aceita query opcional `name` para filtro simples

## Passo 1 - Repository

Atualize `src/repositories/pessoaRepository.js` com:

```js
async function listpessoas({ name }) {
  if (name) {
    const [rows] = await db.query(
      "SELECT id, name, email, age, created_at FROM pessoas WHERE name LIKE ? ORDER BY id DESC",
      [`%${name}%`]
    );
    return rows;
  }

  const [rows] = await db.query(
    "SELECT id, name, email, age, created_at FROM pessoas ORDER BY id DESC"
  );
  return rows;
}
```

E no `module.exports`, adicione `listpessoas`.

## Passo 2 - Service

Atualize `src/services/pessoaService.js`:

```js
async function listpessoas(filters) {
  return pessoaRepository.listpessoas(filters);
}
```

No `module.exports`, adicione `listpessoas`.

## Passo 3 - Controller

Atualize `src/controllers/pessoaController.js`:

```js
async function listpessoas(req, res, next) {
  try {
    const pessoas = await pessoaService.listpessoas({ name: req.query.name });
    return res.json(pessoas);
  } catch (error) {
    return next(error);
  }
}
```

No `module.exports`, adicione `listpessoas`.

## Passo 4 - Route

Atualize `src/routes/pessoaRoutes.js`:

```js
router.get("/", pessoaController.listpessoas);
```

## Passo 5 - Testes

### Listagem completa

- Metodo: `GET`
- URL: `http://localhost:3000/api/pessoas`

### Listagem com filtro

- Metodo: `GET`
- URL: `http://localhost:3000/api/pessoas?name=mar`

## Observacao didatica

Este endpoint e bom para ensinar:

- Query params (`req.query`)
- Busca no SQL com `LIKE`
- Ordem de retorno (`ORDER BY`)
