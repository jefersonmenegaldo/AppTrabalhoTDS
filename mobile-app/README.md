# App mobile (Expo + TypeScript) - Aulas API

Aplicativo didatico em React Native (Expo) que consome a API Node.js do projeto
[`api-aulas-backend`](../api-aulas-backend).

## Objetivo pedagogico

- Separar **configuracao** (`src/config`), **servicos HTTP** (`src/services`), **telas** (`src/screens`) e **rotas** (`src/routes`).
- Mostrar login real com `fetch`, persistencia do JWT e navegacao entre telas.
- Servir de base para os tutoriais em `docs/` (incluindo consumo de endpoints de **pessoas**).

## Pre-requisitos

- Node.js LTS
- Conta Expo (opcional, para build na nuvem)
- API rodando localmente (veja README do backend)

## Instalacao

```bash
cd mobile-app
npm install
```

## URL da API (importante)

O app usa a variavel **`EXPO_PUBLIC_URL_BASE_API`** (sem barra no final).

1. Copie o exemplo:

```bash
copy .env.example .env
```

2. Ajuste o `.env` conforme onde o app roda:

| Onde o app roda | URL tipica |
|-----------------|------------|
| **Navegador (Expo Web)** | `http://localhost:3000` (mesma maquina que a API) |
| Android Emulator | `http://10.0.2.2:3000` (IP especial do emulador para o PC) |
| Dispositivo fisico (mesma rede Wi-Fi) | `http://SEU_IP_LOCAL:3000` (ex.: `http://192.168.1.10:3000`) |
| iOS Simulator (Mac) | `http://localhost:3000` costuma funcionar |

**Reinicie o Metro** (`npm start` de novo) apos alterar `.env`.

## Rodar o projeto

Na pasta `mobile-app`:

```bash
npm start
```

O `npm start` foi configurado para **offline** (evita erro `TypeError: fetch failed` quando a rede bloqueia validacoes do Expo).

Se quiser iniciar em modo online:

```bash
npm run start:online
```

### Rodar no navegador (sem emulador)

Dependencias `react-dom` e `react-native-web` ja estao no `package.json` (instaladas com `npm install`, sem precisar de `expo install`).

```bash
npm run web
```

Abre o bundler web na porta **19006** por padrao (`http://localhost:19006`), para nao conflitar com o Metro em `8082`. A API deve estar em `http://localhost:3000` e o `.env` com `EXPO_PUBLIC_URL_BASE_API=http://localhost:3000`.

### Celular / emulador

Escaneie o QR no Expo Go ou use `a` (Android) / `i` (iOS) no terminal apos `npm start`.

## Fluxo do app

1. **Tela de login** chama `POST /api/auth/login` (ou `POST /api/auth/entrar` como fallback).
2. A API devolve `{ token, usuario }` (veja backend).
3. O token e salvo com **AsyncStorage**; o usuario e salvo para exibir nome na tela inicial.
4. **Tela inicial** mostra um menu de exemplos e **Sair** remove token e usuario.

## Endpoints usados hoje

- `POST /api/auth/login` — corpo: `{ "email", "password" }` (mesmos nomes do backend)

## Tutoriais (passo a passo)

- [01 - Conectar login a API](docs/01-login-api.md)
- [02 - Menu na tela inicial](docs/02-menu-home.md)
- [03 - Consumir endpoints de pessoas](docs/03-consumo-endpoint-pessoas.md)
- [04 - Checklist para novo endpoint](docs/04-checklist-novo-endpoint.md)
- [05 - Build Android release + publicacao na loja (EAS)](docs/05-build-android-release-github-actions.md)
- [06 - Build Android nativo (APK para download)](docs/06-build-android-nativo-apk.md)

## Backend relacionado

Implementacao da API: [../api-aulas-backend/README.md](../api-aulas-backend/README.md)

Tutoriais de endpoints no servidor (incluindo pessoas): pasta
`../api-aulas-backend/docs/tutorials/`.
