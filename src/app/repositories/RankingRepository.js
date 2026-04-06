const db = require('../../config/database/connection');

class RankingRepository {

    salvar(nome, pontos) {
        db.prepare(
            'INSERT INTO ranking (nome, pontos) VALUES (?, ?)'
        ).run(nome, pontos);
    }

    listarTop10() {
        return db.prepare(
            'SELECT nome, pontos FROM ranking ORDER BY pontos DESC LIMIT 10'
        ).all();
    }
}

module.exports = new RankingRepository();