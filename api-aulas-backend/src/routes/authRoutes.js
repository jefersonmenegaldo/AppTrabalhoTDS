const express = require("express");
const controladorAutenticacao = require("../controllers/authController");

const roteador = express.Router();

roteador.post("/register", controladorAutenticacao.cadastrar);
roteador.post("/login", controladorAutenticacao.autenticar);
roteador.post("/cadastro", controladorAutenticacao.cadastrar);
roteador.post("/entrar", controladorAutenticacao.autenticar);

module.exports = roteador;
