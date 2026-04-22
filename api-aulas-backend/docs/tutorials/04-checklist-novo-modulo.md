# Checklist - Criar novo modulo e endpoints

Use este checklist para qualquer entidade nova (`produtos`, `clientes`, etc.).

## 1) Banco de dados

- [ ] Criar tabela no MySQL
- [ ] Definir campos obrigatorios
- [ ] Definir `UNIQUE` onde fizer sentido
- [ ] Definir `created_at`

## 2) Repository

- [ ] Criar arquivo em `src/repositories`
- [ ] Implementar SQL de `create`
- [ ] Implementar SQL de `list`
- [ ] Implementar SQL de `findById`
- [ ] Implementar SQL de `update`
- [ ] Implementar SQL de `delete`

## 3) Service

- [ ] Validar payload
- [ ] Tratar regras de negocio
- [ ] Tratar conflitos (`409`)
- [ ] Tratar nao encontrado (`404`)

## 4) Controller

- [ ] Criar funcoes async para cada endpoint
- [ ] Encaminhar erros para `next(error)`
- [ ] Retornar status corretos (`201`, `200`, `204`)

## 5) Routes

- [ ] Criar `router.post("/")`
- [ ] Criar `router.get("/")`
- [ ] Criar `router.get("/:id")`
- [ ] Criar `router.put("/:id")`
- [ ] Criar `router.delete("/:id")`

## 6) Registro no app

- [ ] Importar route no `src/app.js`
- [ ] Registrar com `app.use("/api/<recurso>", <route>)`

## 7) Testes manuais

- [ ] Testar sucesso de cada endpoint
- [ ] Testar payload invalido (`400`)
- [ ] Testar id inexistente (`404`)
- [ ] Testar conflito de dado unico (`409`)

## 8) Fechamento didatico

- [ ] Revisar fluxo de camadas
- [ ] Mostrar porque SQL nao fica no controller
- [ ] Mostrar porque validacao fica no service
