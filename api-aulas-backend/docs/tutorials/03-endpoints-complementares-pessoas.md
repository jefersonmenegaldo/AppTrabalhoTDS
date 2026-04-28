# Tutorial 3 - Endpoints complementares de pessoas

Objetivo: completar CRUD da entidade `pessoas`.

## Endpoints alvo

- `GET /api/pessoas/:id` (buscar por id)
- `PUT /api/pessoas/:id` (atualizar)
- `DELETE /api/pessoas/:id` (remover)

---

## 1) GET por ID

### Repository

```js
async function findById(id) {
  const [rows] = await db.query(
    "SELECT id, nome, email, idade, created_at FROM pessoas WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}
```

### Service

```js
async function getPessoaById(id) {
  const pessoa = await pessoaRepository.findById(id);
  if (!pessoa) {
    const error = new Error("Pessoa nao encontrada");
    error.statusCode = 404;
    throw error;
  }
  return pessoa;
}
```

### Controller

```js
async function getPessoaById(req, res, next) {
  try {
    const pessoa = await pessoaService.getPessoaById(Number(req.params.id));
    return res.json(pessoa);
  } catch (error) {
    return next(error);
  }
}
```

### Route

```js
router.get("/:id", pessoaController.getPessoaById);
```

---

## 2) PUT (atualizar pessoa)

### Repository

```js
async function updatePessoa(id, { nome, email, idade }) {
  await db.query(
    "UPDATE pessoas SET nome = ?, email = ?, idade = ? WHERE id = ?",
    [nome, email, idade, id]
  );
}
```

### Service

```js
async function updatePessoa(id, data) {
  validatePayload(data);

  const existing = await pessoaRepository.findById(id);
  if (!existing) {
    const error = new Error("Pessoa nao encontrada");
    error.statusCode = 404;
    throw error;
  }

  await pessoaRepository.updatePessoa(id, data);
  return pessoaRepository.findById(id);
}
```

### Controller

```js
async function updatePessoa(req, res, next) {
  try {
    const pessoa = await pessoaService.updatePessoa(Number(req.params.id), req.body);
    return res.json(pessoa);
  } catch (error) {
    return next(error);
  }
}
```

### Route

```js
router.put("/:id", pessoaController.updatePessoa);
```

---

## 3) DELETE (remover pessoa)

### Repository

```js
async function deletePessoa(id) {
  const [result] = await db.query("DELETE FROM pessoas WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
```

### Service

```js
async function deletePessoa(id) {
  const deleted = await pessoaRepository.deletePessoa(id);
  if (!deleted) {
    const error = new Error("Pessoa nao encontrada");
    error.statusCode = 404;
    throw error;
  }
}
```

### Controller

```js
async function deletePessoa(req, res, next) {
  try {
    await pessoaService.deletePessoa(Number(req.params.id));
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
```

### Route

```js
router.delete("/:id", pessoaController.deletePessoa);
```

---

## Testes sugeridos (roteiro de aula)

1. Criar 3 pessoas (`POST`)
2. Listar todas (`GET /api/pessoas`)
3. Buscar uma por id (`GET /api/pessoas/1`)
4. Atualizar (`PUT /api/pessoas/1`)
5. Deletar (`DELETE /api/pessoas/1`)
6. Tentar buscar a removida e validar `404`

Esse fluxo fecha o ciclo CRUD completo para fixacao.
