# Tutorial 03 - Consumir endpoints de pessoas no app

Este guia assume que o backend ja expoe rotas REST de pessoas, no padrao dos tutoriais do servidor:

- Pasta do backend: `../api-aulas-backend/docs/tutorials/`
- Exemplos la usam prefixo `POST /api/people` e `GET /api/people`

Se os caminhos no seu backend forem diferentes, ajuste as strings abaixo.

## Pre-requisito no MySQL

Execute a criacao da tabela `people` conforme o arquivo
`../api-aulas-backend/docs/tutorials/00-como-usar-roteiros.md`.

## Passo 1 - Tipos TypeScript

Crie `src/types/pessoa.ts`:

```ts
export type Pessoa = {
  id: number;
  name: string;
  email: string;
  age: number;
  created_at?: string;
};

export type CorpoCriarPessoa = {
  name: string;
  email: string;
  age: number;
};
```

## Passo 2 - Servico de API

Crie `src/services/pessoaService.ts`:

```ts
import type { CorpoCriarPessoa, Pessoa } from "../types/pessoa";
import { requisicaoGet, requisicaoPost } from "./api";
import { obterToken } from "./armazenamentoToken";

export async function listarPessoas(nomeFiltro?: string): Promise<Pessoa[]> {
  const token = await obterToken();
  const query = nomeFiltro
    ? `?name=${encodeURIComponent(nomeFiltro)}`
    : "";
  return requisicaoGet<Pessoa[]>(`/api/people${query}`, { token: token ?? undefined });
}

export async function cadastrarPessoa(corpo: CorpoCriarPessoa): Promise<Pessoa> {
  const token = await obterToken();
  return requisicaoPost<Pessoa>("/api/people", corpo, {
    token: token ?? undefined,
  });
}
```

**Observacao didatica:** se o endpoint de pessoas **nao** exigir JWT no backend, o `token` pode ser omitido. Se exigir, o backend precisa validar o header `Authorization: Bearer ...` com o mesmo middleware do curso.

## Passo 3 - Nova tela (lista)

Crie `src/screens/TelaPessoas.tsx`:

- `useState` para lista, loading e erro
- `useEffect` ou `useFocusEffect` para chamar `listarPessoas()`
- `FlatList` para renderizar `item.name`, `item.email`, `item.age`

## Passo 4 - Navegacao

1. Adicione a rota em `src/types/navegacao.ts`:

```ts
export type ListaRotasRaiz = {
  Login: undefined;
  Inicial: undefined;
  Pessoas: undefined;
};
```

2. Registre em `src/routes/RotasApp.tsx` um novo `Pilha.Screen` com nome `Pessoas`.
3. No menu da `TelaInicial`, troque o `Alert` de **Pessoas** por:

```ts
navigation.navigate("Pessoas");
```

## Passo 5 - Cadastro (opcional)

- Formulario simples (nome, email, idade)
- Botao chama `cadastrarPessoa` e depois atualiza a lista

## Teste manual

1. `GET /api/people` no Insomnia com token (se protegido).
2. Mesma chamada pelo app apos login.
3. `POST /api/people` e conferir se aparece na lista.

## Erros comuns

- **401**: token ausente ou rota protegida sem enviar `Authorization`.
- **404**: caminho errado (`/api/people` vs outro prefixo).
- **JSON parse**: backend retornou HTML (API caiu ou URL aponta para lugar errado).
