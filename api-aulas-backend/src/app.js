const express = require("express");
const cors = require("cors");
const rotasAutenticacao = require("./routes/authRoutes");
const middlewareErro = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send(`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Aulas Backend</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #f5f7fb;
        color: #1f2937;
      }
      .container {
        max-width: 920px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }
      .card {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 30px;
      }
      p {
        margin: 0;
        line-height: 1.5;
      }
      .status {
        display: inline-block;
        margin-top: 12px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #dcfce7;
        color: #166534;
        font-size: 14px;
        font-weight: 700;
      }
      ul {
        margin: 8px 0 0;
        padding-left: 20px;
      }
      li {
        margin-bottom: 8px;
      }
      code {
        background: #eef2ff;
        color: #312e81;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 90%;
      }
      .footer {
        color: #6b7280;
        font-size: 13px;
        margin-top: 4px;
      }
      a {
        color: #2563eb;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="card">
        <h1>API Aulas Backend</h1>
        <p>
          Projeto didatico para aulas introdutorias de backend com Node.js + MySQL.
        </p>
        <span class="status">API online</span>
      </section>

      <section class="card">
        <h2>Endpoints principais</h2>
        <ul>
          <li><code>GET /health</code> - status da aplicacao</li>
          <li><code>POST /api/auth/register</code> - cadastro de usuario</li>
          <li><code>POST /api/auth/login</code> - login</li>
          <li><code>POST /api/auth/cadastro</code> - alias em portugues</li>
          <li><code>POST /api/auth/entrar</code> - alias em portugues</li>
        </ul>
      </section>

      <section class="card">
        <h2>Exemplo rapido de login</h2>
        <p>Requisicao JSON para <code>POST /api/auth/login</code>:</p>
        <ul>
          <li><code>{ "email": "aluno@escola.com", "password": "123456" }</code></li>
        </ul>
      </section>

      <section class="card">
        <h2>Documentacao</h2>
        <p>
          Consulte o arquivo <code>README.md</code> do backend e os tutoriais em
          <code>docs/tutorials</code>.
        </p>
      </section>

      <p class="footer">API para aulas - versao 1.0</p>
    </main>
  </body>
</html>`);
});

app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

app.use("/api/auth", rotasAutenticacao);
app.use(middlewareErro);

module.exports = app;
