var express = require('express');
var router = express.Router();

var processosController = require('../controllers/processosController');

router.get('/listaProcessos/:id_setor', function (req, res) {
    console.log("PASSEI AQUI, ID_SETOR: ", req.params.id_setor);
    processosController.listaProcessos(req, res);
});

router.put('/atualizaProcesso', function (req, res) {
    processosController.atualizaProcesso(req, res);
});

module.exports = router;
