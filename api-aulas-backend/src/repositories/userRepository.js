const db = require("../config/db");

async function buscarPorEmail(email) {
  const [linhas] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return linhas[0] || null;
}

async function criarUsuario({ name, email, passwordHash }) {
  const [resultado] = await db.query(
    "INSERT INTO usuarios (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );

  return {
    id: resultado.insertId,
    name,
    email
  };
}

module.exports = {
  buscarPorEmail,
  criarUsuario
};
