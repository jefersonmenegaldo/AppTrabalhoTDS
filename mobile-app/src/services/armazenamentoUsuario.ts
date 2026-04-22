import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RespostaAutenticacao } from "../types/autenticacao";

const CHAVE_USUARIO = "@aulas_api:usuario";

export type DadosUsuario = RespostaAutenticacao["usuario"];

export async function salvarUsuario(usuario: DadosUsuario): Promise<void> {
  await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function obterUsuario(): Promise<DadosUsuario | null> {
  const texto = await AsyncStorage.getItem(CHAVE_USUARIO);
  if (!texto) return null;
  try {
    return JSON.parse(texto) as DadosUsuario;
  } catch {
    return null;
  }
}

export async function removerUsuario(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_USUARIO);
}
