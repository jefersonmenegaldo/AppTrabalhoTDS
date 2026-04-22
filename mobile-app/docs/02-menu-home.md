# Tutorial 02 - Menu na tela inicial

A tela `TelaInicial.tsx` mostra como montar um menu simples sem biblioteca extra.

## Componente reutilizavel

`src/components/ItemMenu.tsx` recebe:

- `titulo` — texto principal
- `descricao` — texto menor (opcional)
- `aoPressionar` — funcao executada ao tocar

Isso evita repetir estilo de `Pressable` para cada item.

## Navegacao e sessao

- Ao abrir o app, `RotasApp.tsx` le o token; se existir, inicia em **Inicial**.
- **Sair** chama `removerToken` e `removerUsuario` e faz `navigation.reset` para **Login**.

## Exercicios

1. Adicione um novo `ItemMenu` com titulo **Sobre** e um `Alert` explicando o projeto.
2. Troque cores em `StyleSheet` da `TelaInicial` para personalizar a aula.
3. (Avancado) Passe o objeto `usuario` por **Context** em vez de AsyncStorage na tela inicial.

## Proximo passo

Ir para `03-consumo-endpoint-pessoas.md` para consumir listagem/cadastro na API.
