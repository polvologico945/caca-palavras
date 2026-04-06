const repository = require('../repositories/RankingRepository');

class RankingController {

    salvar(req, res) {
        const { nome, pontos } = req.body;

        if (!nome || pontos == null) {
            return res.status(400).send('Dados inválidos');
        }

        repository.salvar(nome, pontos);
        res.send('ok');
    }

    top10(req, res) {
        const dados = repository.listarTop10();
        res.json(dados);
    }
}

module.exports = new RankingController();