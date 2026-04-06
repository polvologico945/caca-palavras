const Database = require('better-sqlite3');

const db = new Database('ranking.db');

// cria tabela se não existir
db.prepare(`
    CREATE TABLE IF NOT EXISTS ranking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        pontos INTEGER
    )
`).run();

module.exports = db;