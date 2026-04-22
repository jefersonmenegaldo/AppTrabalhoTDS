import type {
  CorpoCadastro,
  CorpoLogin,
  RespostaAutenticacao,
  RespostaCadastro,
} from "../types/autenticacao";
import { ErroApi, requisicaoPost } from "./api";

const CAMINHOS_LOGIN = ["/api/auth/login", "/api/auth/entrar"] as const;
const CAMINHOS_CADASTRO = ["/api/auth/register", "/api/auth/cadastro"] as const;

/**
 * Chama o endpoint de login da API.
 * Tenta primeiro `/api/auth/login` e depois `/api/auth/entrar` (alias em portugues no backend).
 */
export async function autenticarNaApi(
  corpo: CorpoLogin
): Promise<RespostaAutenticacao> {
  let ultimoErro: unknown;

  for (const caminho of CAMINHOS_LOGIN) {
    try {
      return await requisicaoPost<RespostaAutenticacao>(caminho, corpo);
    } catch (erro) {
      ultimoErro = erro;
      if (erro instanceof ErroApi && erro.codigoStatus === 404) {
        continue;
      }
      throw erro;
    }
  }

  throw ultimoErro instanceof Error
    ? ultimoErro
    : new Error("Nao foi possivel autenticar");
}

export async function cadastrarNaApi(
  corpo: CorpoCadastro
): Promise<RespostaCadastro> {
  let ultimoErro: unknown;

  for (const caminho of CAMINHOS_CADASTRO) {
    try {
      return await requisicaoPost<RespostaCadastro>(caminho, corpo);
    } catch (erro) {
      ultimoErro = erro;
      if (erro instanceof ErroApi && erro.codigoStatus === 404) {
        continue;
      }
      throw erro;
    }
  }

  throw ultimoErro instanceof Error
    ? ultimoErro
    : new Error("Nao foi possivel cadastrar usuario");
}
