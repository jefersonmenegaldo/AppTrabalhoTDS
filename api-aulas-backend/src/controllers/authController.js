const servicoAutenticacao = require("../services/authService");

async function cadastrar(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const usuario = await servicoAutenticacao.cadastrar({ name, email, password });
    return res.status(201).json(usuario);
  } catch (erro) {
    return next(erro);
  }
}

async function autenticar(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = await servicoAutenticacao.autenticar({ email, password });
    return res.json(resultado);
  } catch (erro) {
    return next(erro);
  }
}

module.exports = {
  cadastrar,
  autenticar
};
