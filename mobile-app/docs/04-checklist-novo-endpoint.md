# Checklist - Consumir um novo endpoint no app

Use sempre o mesmo padrao para manter a aula organizada.

## 1) Backend

- [ ] Endpoint documentado (metodo, URL, corpo, resposta)
- [ ] Testado no Insomnia/Postman
- [ ] Se protegido: exige `Authorization: Bearer <token>`

## 2) Configuracao

- [ ] `EXPO_PUBLIC_URL_BASE_API` aponta para a maquina certa (emulador vs fisico)

## 3) Tipos (`src/types`)

- [ ] Criar tipo da entidade e do corpo (se houver)

## 4) Cliente HTTP (`src/services/api.ts`)

- [ ] Usar `requisicaoGet` / `requisicaoPost` (ou estender com `PUT`/`DELETE` se precisar)

## 5) Servico da entidade (`src/services/<nome>Service.ts`)

- [ ] Funcao pura que chama o cliente HTTP
- [ ] Buscar token com `obterToken()` quando necessario

## 6) Tela (`src/screens`)

- [ ] Estados: dados, loading, erro
- [ ] Lista: `FlatList` ou `ScrollView` para poucos itens

## 7) Rotas (`src/types/navegacao.ts` + `RotasApp.tsx`)

- [ ] Registrar nova rota
- [ ] Navegar a partir do menu ou de outra tela

## 8) Validacao em aula

- [ ] Mostrar erro amigavel (`ErroApi.message`)
- [ ] Logar resposta em desenvolvimento (`console.log` controlado)
