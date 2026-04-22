/** Resposta do backend em `POST /api/auth/login` (ou `/api/auth/entrar`). */
export type RespostaAutenticacao = {
  token: string;
  usuario: {
    id: number;
    name: string;
    email: string;
  };
};

/** Corpo enviado no login (campos iguais ao backend). */
export type CorpoLogin = {
  email: string;
  password: string;
};

/** Corpo enviado no cadastro de usuario. */
export type CorpoCadastro = {
  name: string;
  email: string;
  password: string;
};

/** Resposta do backend no cadastro. */
export type RespostaCadastro = {
  id: number;
  name: string;
  email: string;
};
