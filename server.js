const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('ranking.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS ranking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        pontos INTEGER
    )
`).run();

// salvar
app.post('/salvar', (req, res) => {
    const { nome, pontos } = req.body;

    db.prepare('INSERT INTO ranking (nome, pontos) VALUES (?, ?)')
        .run(nome, pontos);

    res.send('ok');
});

// top 10
app.get('/top10', (req, res) => {
    const dados = db.prepare(
        'SELECT * FROM ranking ORDER BY pontos DESC LIMIT 10'
    ).all();

    res.json(dados);
});

app.listen(3000, () => console.log('Servidor rodando :)'));