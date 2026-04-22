function middlewareErro(error, req, res, next) {
  const codigoStatus = error.statusCode || 500;

  return res.status(codigoStatus).json({
    message: error.message || "Erro interno do servidor"
  });
}

module.exports = middlewareErro;
