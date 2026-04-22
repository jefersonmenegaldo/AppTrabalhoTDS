# Build Android nativo (somente APK para download)

Este fluxo e separado do EAS cloud e foi criado para o cenario:

- gerar **somente APK** para instalacao manual em celulares proprios,
- sem publicacao em loja.

Workflow:

- `../.github/workflows/build-android-native-apk.yml` (na raiz do repositorio)

## O que esse workflow faz

1. Instala Node, Java 17 e Android SDK no runner
2. Instala dependencias do app
3. Executa `expo prebuild --platform android` (gera pasta `android/`)
4. Executa Gradle nativo: `./gradlew assembleDebug`
5. Publica artifact do GitHub Actions:
   - `app-debug.apk`

## Como disparar

### Manual

1. Abra aba **Actions** no GitHub
2. Escolha workflow **Build Android Native APK**
3. Clique **Run workflow**

### Por tag

Use tag:

```bash
git tag mobile-native-apk-v1.0.0
git push origin mobile-native-apk-v1.0.0
```

## Como baixar o APK

1. Abra o run concluido na aba Actions
2. Em **Artifacts**, baixe `app-debug-apk`
3. Extraia e instale no Android

## Observacoes importantes

- Este APK e **debug**, assinado com chave de debug.
- Ideal para testes internos e uso proprio.
- Nao e o formato recomendado para Play Store.

## Sobre token Expo

- Este workflow **nao usa `EXPO_TOKEN`**.
- O token continua sendo necessario apenas no fluxo EAS (build cloud e publicacao em loja).
