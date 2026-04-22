# Build Android release e publicacao na loja com GitHub Actions + EAS

Este guia configura automacao para:

- gerar build Android com EAS,
- publicar na Play Store (track internal) quando voce desejar.

Arquivos criados para automacao:

- `.github/workflows/build-android-release.yml`
- `eas.json`

## O que a automacao faz

- Executa quando:
  - voce dispara manualmente em **Actions** (`workflow_dispatch`), ou
  - voce cria push de tag `mobile-v*` (ex.: `mobile-v1.0.0`)
- Instala dependencias do app
- Autentica no Expo/EAS com token
- Roda `eas build` para Android com perfil:
  - `preview` (APK)
  - `production` (AAB release)
- Opcionalmente executa `eas submit` para publicar na Play Store (internal track)

## Pre-requisitos (uma vez so)

1. Conta Expo: [https://expo.dev/signup](https://expo.dev/signup)
2. Projeto no GitHub com a pasta `mobile-app`
3. Rodar uma vez localmente para vincular o projeto ao EAS:

```bash
cd mobile-app
npx eas-cli login
npx eas-cli project:init
```

> Se o `project:init` atualizar metadados do projeto, commit essas alteracoes.

## Secret obrigatorio no GitHub

No repositorio:

1. `Settings` -> `Secrets and variables` -> `Actions`
2. `New repository secret`
3. Nome: `EXPO_TOKEN`
4. Valor: token pessoal do Expo (obrigatorio para build e submit)

Como gerar token do Expo:

1. Acesse [https://expo.dev/accounts/%5Bseu-usuario%5D/settings/access-tokens](https://expo.dev)
2. Crie um token de acesso
3. Copie e cole no secret `EXPO_TOKEN`

## Perfis de build (eas.json)

- `preview`:
  - Android `apk` (mais facil para testes diretos)
- `production`:
  - Android `app-bundle` (AAB release para Play Store)
  - `autoIncrement` ligado

## Como rodar build manual no GitHub

1. Aba **Actions**
2. Workflow **Build Android Release (EAS)**
3. Clique **Run workflow**
4. Escolha `profile`:
   - `preview` -> APK
   - `production` -> AAB release
5. `submit_to_store`:
   - `false` -> somente build
   - `true` -> publica na Play Store (somente com `production`)

## Como rodar build por tag

No seu terminal:

```bash
git tag mobile-v1.0.0
git push origin mobile-v1.0.0
```

Isso dispara o mesmo workflow automaticamente com perfil `production` e sem submit.

## Onde pegar o artefato

No final do job, o log mostra URL do build no Expo/EAS.
Voce baixa o arquivo (APK/AAB) pelo link da build no painel do Expo.

## Publicacao na Play Store (EAS Submit)

Para publicar com `submit_to_store=true`:

1. Sua conta Expo precisa estar vinculada ao app no EAS.
2. Configure credenciais Android no EAS (keystore).
3. Configure acesso da Play Console no EAS Submit.
4. Rode o workflow com:
   - `profile=production`
   - `submit_to_store=true`

Configuracao de destino no `eas.json`:

- `submit.production.android.track = internal`

Assim o envio vai para a trilha interna da Play Store.

## Scripts locais (opcional)

Na pasta `mobile-app`:

```bash
npm run build:android:preview
npm run build:android:release
```

Esses scripts sao para build manual local via EAS (fora do GitHub Actions).

## Troubleshooting rapido

### Erro de autenticacao

- Verifique se `EXPO_TOKEN` existe e nao expirou.

### Erro no submit para Play

- Confira integracao do EAS Submit com Play Console.
- Valide que o build foi `production` (AAB).
- Valide permissao da conta de servico da Play.

### Erro de projeto nao vinculado

- Rode localmente `npx eas-cli project:init` e commit as alteracoes.

### Erro de package Android

- Este projeto ja define `android.package` em `app.json`.
- Se voce mudar, mantenha formato valido (ex.: `com.suaempresa.seuapp`).
