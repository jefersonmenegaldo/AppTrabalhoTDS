const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repositorioUsuario = require("../repositories/userRepository");

async function cadastrar({ name, email, password }) {
  if (!name || !email || !password) {
    const erro = new Error("name, email e password sao obrigatorios");
    erro.statusCode = 400;
    throw erro;
  }
  if (password.length < 6) {
    const erro = new Error("A senha deve ter no minimo 6 caracteres");
    erro.statusCode = 400;
    throw erro;
  }

  const usuarioExistente = await repositorioUsuario.buscarPorEmail(email);
  if (usuarioExistente) {
    const erro = new Error("E-mail ja cadastrado");
    erro.statusCode = 409;
    throw erro;
  }

  const hashSenha = await bcrypt.hash(password, 10);
  return repositorioUsuario.criarUsuario({ name, email, passwordHash: hashSenha });
}

async function autenticar({ email, password }) {
  if (!email || !password) {
    const erro = new Error("email e password sao obrigatorios");
    erro.statusCode = 400;
    throw erro;
  }

  const usuario = await repositorioUsuario.buscarPorEmail(email);
  if (!usuario) {
    const erro = new Error("Credenciais invalidas");
    erro.statusCode = 401;
    throw erro;
  }

  const senhaValida = await bcrypt.compare(password, usuario.password_hash);
  if (!senhaValida) {
    const erro = new Error("Credenciais invalidas");
    erro.statusCode = 401;
    throw erro;
  }

  const token = jwt.sign(
    { sub: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email
    }
  };
}

module.exports = {
  cadastrar,
  autenticar
};
