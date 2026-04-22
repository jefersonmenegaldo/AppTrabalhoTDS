import { URL_BASE_API } from "../config/apiConfig";

export class ErroApi extends Error {
  codigoStatus?: number;

  constructor(mensagem: string, codigoStatus?: number) {
    super(mensagem);
    this.name = "ErroApi";
    this.codigoStatus = codigoStatus;
  }
}

type OpcoesFetch = {
  token?: string;
};

function montarCabecalhos(opcoes?: OpcoesFetch): HeadersInit {
  const cabecalhos: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (opcoes?.token) {
    cabecalhos.Authorization = `Bearer ${opcoes.token}`;
  }
  return cabecalhos;
}

async function parseJsonSeguro(texto: string): Promise<unknown> {
  if (!texto.trim()) return null;
  try {
    return JSON.parse(texto) as unknown;
  } catch {
    return { message: texto };
  }
}

/**
 * Cliente HTTP didatico usando fetch.
 * Centraliza URL base, cabecalhos e tratamento basico de erro.
 */
export async function requisicaoPost<T>(
  caminho: string,
  corpo: object,
  opcoes?: OpcoesFetch
): Promise<T> {
  const resposta = await fetch(`${URL_BASE_API}${caminho}`, {
    method: "POST",
    headers: montarCabecalhos(opcoes),
    body: JSON.stringify(corpo),
  });

  const texto = await resposta.text();
  const dados = (await parseJsonSeguro(texto)) as { message?: string } | null;

  if (!resposta.ok) {
    const mensagem =
      dados && typeof dados === "object" && "message" in dados && dados.message
        ? String(dados.message)
        : `Erro HTTP ${resposta.status}`;
    throw new ErroApi(mensagem, resposta.status);
  }

  return dados as T;
}

export async function requisicaoGet<T>(
  caminho: string,
  opcoes?: OpcoesFetch
): Promise<T> {
  const resposta = await fetch(`${URL_BASE_API}${caminho}`, {
    method: "GET",
    headers: montarCabecalhos(opcoes),
  });

  const texto = await resposta.text();
  const dados = (await parseJsonSeguro(texto)) as { message?: string } | null;

  if (!resposta.ok) {
    const mensagem =
      dados && typeof dados === "object" && "message" in dados && dados.message
        ? String(dados.message)
        : `Erro HTTP ${resposta.status}`;
    throw new ErroApi(mensagem, resposta.status);
  }

  return dados as T;
}
