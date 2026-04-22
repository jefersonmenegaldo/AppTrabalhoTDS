const jwt = require("jsonwebtoken");

function middlewareAutenticacao(req, res, next) {
  const cabecalhoAutorizacao = req.headers.authorization;
  if (!cabecalhoAutorizacao) {
    return res.status(401).json({ message: "Token nao enviado" });
  }

  const [esquema, token] = cabecalhoAutorizacao.split(" ");
  if (esquema !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token invalido" });
  }

  try {
    const cargaToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: cargaToken.sub, email: cargaToken.email };
    return next();
  } catch (erro) {
    return res.status(401).json({ message: "Token invalido ou expirado" });
  }
}

module.exports = middlewareAutenticacao;
