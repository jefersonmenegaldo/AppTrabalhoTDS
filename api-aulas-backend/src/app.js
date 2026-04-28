const path = require("path");
const express = require("express");
const cors = require("cors");
const rotasAutenticacao = require("./routes/authRoutes");
const middlewareErro = require("./middlewares/errorMiddleware");

const app = express();

const pastaPublica = path.join(__dirname, "..", "public");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(pastaPublica, "landing.html"));
});

app.get("/api", (req, res) => {
  return res.status(200).sendFile(path.join(pastaPublica, "api-docs.html"));
});

app.use(express.static(pastaPublica));

app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

app.use("/api/auth", rotasAutenticacao);
app.use(middlewareErro);

module.exports = app;
