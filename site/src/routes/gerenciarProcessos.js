/** @format */

var express = require('express')
var router = express.Router()

var processosController = require('../controllers/processosController')

router.get('/listaProcessos/:id_setor', function (req, res) {
  /*     console.log("PASSEI AQUI, ID_SETOR: ", req.params.id_setor);
   */ processosController.listaProcessos(req, res)
})

router.put(
  '/atualizaProcesso/:ativo/:id_setor/:id_processo',
  function (req, res) {
    processosController.atualizaProcesso(req, res)
  }
)

router.post(
  '/sugerirProcesso/:id_setor/:nome_sugestao',
  function (req, res) {
    processosController.sugerirProcesso(req, res)
  }
)

router.get('/listarSugestoes/:id_setor', function (req, res) {
  processosController.listarSugestoes(req, res)
})

module.exports = router
