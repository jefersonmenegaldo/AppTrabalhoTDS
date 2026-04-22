# Tutorial 01 - Conectar o login ao backend

Este roteiro explica o que o app ja faz na tela de login e onde mexer.

## O que o aluno precisa entender

1. **URL base** da API vem de `EXPO_PUBLIC_URL_BASE_API` (arquivo `.env`).
2. O **servico** `autenticacaoService.ts` chama o backend.
3. A **tela** `TelaLogin.tsx` so coleta dados e mostra erro/loading.

## Fluxo (camadas)

```txt
TelaLogin -> autenticarNaApi -> requisicaoPost -> fetch(URL_BASE + caminho)
```

## Endpoint no servidor

- `POST /api/auth/login`
- Corpo JSON (igual ao backend):

```json
{
  "email": "aluno@escola.com",
  "password": "123456"
}
```

Resposta esperada (backend atual):

```json
{
  "token": "jwt...",
  "usuario": {
    "id": 1,
    "name": "Aluno 1",
    "email": "aluno@escola.com"
  }
}
```

## Arquivos principais

| Arquivo | Papel |
|---------|--------|
| `src/config/apiConfig.ts` | Define `URL_BASE_API` |
| `src/services/api.ts` | `fetch` + tratamento de erro (`ErroApi`) |
| `src/services/autenticacaoService.ts` | Chama `/api/auth/login` (e fallback `/api/auth/entrar`) |
| `src/services/armazenamentoToken.ts` | Salva token no AsyncStorage |
| `src/services/armazenamentoUsuario.ts` | Salva dados basicos do usuario |
| `src/screens/TelaLogin.tsx` | UI + navegacao para `Inicial` |

## Exercicio sugerido

1. Coloque um `console.log(URL_BASE_API)` em `apiConfig.ts` e confira no Metro.
2. Force um erro (senha errada) e veja a mensagem vinda do backend (`message`).
3. No Insomnia, teste o mesmo endpoint e compare com o app.

## Problemas comuns

- **Network request failed**: URL errada ou API parada. Confira `.env` e `npm run dev` no backend.
- **Android emulator**: use `http://10.0.2.2:3000` no `.env`.
- **Celular na rede**: use o IP da maquina, nao `localhost`.
