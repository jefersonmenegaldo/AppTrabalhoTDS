# Aulas de backend + mobile (monorepo)

Repositorio didatico com:

- **API** em Node.js + Express + MySQL (`api-aulas-backend/`)
- **App mobile** em Expo + React Native + TypeScript (`mobile-app/`)
- **Documentacao** compartilhada (`docs/`)
- **Automacao** GitHub Actions na **raiz** (`.github/workflows/`)

Cada subprojeto tem o proprio `package.json` e README detalhado. Na raiz existe um `package.json` orquestrador para instalar dependencias e, se quiser, subir API + app juntos.

---

## Pre-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [MySQL](https://dev.mysql.com/downloads/) rodando localmente (para a API)
- (Opcional) [Git](https://git-scm.com/) e conta [GitHub](https://github.com/) para clonar o repositorio
- (Opcional) [Expo Go](https://expo.dev/go) no celular para testar o mobile

---

## Estrutura do repositorio

| Pasta / arquivo | Conteudo |
|-----------------|----------|
| `api-aulas-backend/` | API REST, autenticacao JWT, MySQL, pagina inicial em `/` |
| `mobile-app/` | App Expo: login, cadastro, tela inicial, integracao com a API |
| `docs/` | Roteiro de aulas, figuras e textos de apoio |
| `.github/workflows/` | Deploy Railway (API), build Android EAS, build APK nativo |
| `package.json` (raiz) | Scripts para instalar tudo e rodar API + mobile em paralelo |

---

## Instalacao rapida (pela raiz)

Na pasta raiz do repositorio:

```bash
npm install
```

Isso instala a dependencia `concurrently` usada pelos scripts da raiz.

Em seguida, instale as dependencias de **ambos** os projetos de uma vez:

```bash
npm run install:all
```

Equivale a rodar `npm install` em `api-aulas-backend` e em `mobile-app`.

> **Dica:** se for a primeira vez no mobile, ainda e preciso configurar `.env` (veja `mobile-app/.env.example`).

---

## Como rodar o ambiente (API + app)

### 1) API (obrigatorio para login/cadastro no app)

1. Copie o exemplo de ambiente: em `api-aulas-backend` use o `.env` (há `.env.example` de referencia).
2. Crie banco e tabelas com o script SQL em `api-aulas-backend/sql/init.sql`.
3. Sobe a API:

```bash
cd api-aulas-backend
npm run dev
```

Padrao: API em `http://localhost:3000` (ajuste se mudar a porta no `.env`).

Detalhes: [api-aulas-backend/README.md](api-aulas-backend/README.md)

### 2) App mobile

Em outro terminal:

```bash
cd mobile-app
npm start
```

Ou web (sem emulador):

```bash
npm run web
```

Defina `EXPO_PUBLIC_URL_BASE_API` no `.env` do mobile (veja [mobile-app/README.md](mobile-app/README.md) — tabela de URLs para emulador, navegador, etc.).

### 3) Subir API + app juntos (pela raiz)

Apos `npm install` e `npm run install:all` na raiz:

```bash
npm run run:all
```

Sobe a API em modo `dev` e o **Expo em modo web** em paralelo.

Alternativa (API + Metro do Expo, nao web):

```bash
npm run run:all:native
```

> Interrompa com `Ctrl+C` no terminal (para ambos os processos gerenciados pelo `concurrently`).

---

## Onde encontrar mais informacoes

| Assunto | Onde |
|---------|------|
| API: endpoints, tutoriais de modulos, deploy Railway | [api-aulas-backend/README.md](api-aulas-backend/README.md) e `api-aulas-backend/docs/` |
| Mobile: login, build Android, EAS, APK nativo | [mobile-app/README.md](mobile-app/README.md) e `mobile-app/docs/` |
| Roteiro de 4 aulas com a turma | [docs/roteiro-4-aulas-api-mobile.md](docs/roteiro-4-aulas-api-mobile.md) |
| GitHub Actions (workflows na raiz) | Pasta [.github/workflows](.github/workflows) |

### Deploy e CI

- **Railway (API):** [api-aulas-backend/docs/deploy/railway-github-actions.md](api-aulas-backend/docs/deploy/railway-github-actions.md)  
- **Build Android (EAS / loja):** [mobile-app/docs/05-build-android-release-github-actions.md](mobile-app/docs/05-build-android-release-github-actions.md)  
- **APK nativo (uso proprio):** [mobile-app/docs/06-build-android-nativo-apk.md](mobile-app/docs/06-build-android-nativo-apk.md)  

---

## Resumo dos scripts da raiz (`package.json`)

| Script | O que faz |
|--------|------------|
| `npm run install:all` | `npm install` em `api-aulas-backend` e `mobile-app` |
| `npm run run:all` | API (`npm run dev`) + Expo **web** em paralelo |
| `npm run run:all:native` | API (`npm run dev`) + Metro do Expo em paralelo |

---

## Contribuindo / boas praticas didaticas

- Mantenha uma branch por aula ou por entrega, se usar Git com os alunos.
- Documente endpoints novos com exemplo de JSON no README do backend ou em `docs/`.

Duvidas: comece pelos READMEs de `api-aulas-backend` e `mobile-app`; o roteiro em `docs/` descreve o encadeamento das aulas com o repositorio.
