CREATE DATABASE IF NOT EXISTS api_aulas;
USE api_aulas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (name, email, password_hash)
SELECT
  'Admin Padrao',
  'admin@aulas.com',
  '$2b$10$vKjehvdqVtu8horHXsf6IuaAu8.vZmjHIz8wn2Gzy5Tz81JMZPj9S'
WHERE NOT EXISTS (
  SELECT 1 FROM usuarios WHERE email = 'admin@aulas.com'
);
