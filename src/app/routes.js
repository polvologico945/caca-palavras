const express = require('express');
const router = express.Router();

const controller = require('./controllers/RankingController');

router.post('/salvar', (req, res) => controller.salvar(req, res));
router.get('/top10', (req, res) => controller.top10(req, res));

module.exports = router;