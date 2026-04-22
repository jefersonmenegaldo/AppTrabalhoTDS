# Como usar estes roteiros

Este material foi pensado para aulas introdutorias, com foco em clareza.

## Ordem recomendada

1. `01-endpoint-post-pessoas.md`
2. `02-endpoint-get-pessoas.md`
3. `03-endpoints-complementares-pessoas.md`
4. `04-checklist-novo-modulo.md`

## Convencao usada nos exemplos

- Entidade: `pessoas`
- Prefixo da rota: `/api/pessoas`
- Fluxo: `route -> controller -> service -> repository -> banco`

## Como aplicar em aula

- Professor implementa primeiro e explica cada camada.
- Alunos repetem a mesma estrutura em outra entidade (ex.: `produtos`).
- No fim, revisar:
  - onde fica regra de negocio (service)
  - onde fica SQL (repository)
  - onde fica HTTP (controller + route)

## Requisito de banco para os tutoriais

Antes do tutorial 1, execute este SQL no MySQL:

```sql
CREATE TABLE IF NOT EXISTS pessoas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Pronto. Com essa tabela criada, voce pode seguir os proximos roteiros.
