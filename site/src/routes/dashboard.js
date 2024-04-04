/** @format */

var express = require('express')
var router = express.Router()

var dashboardController = require(`../controllers/dashboardController`)

router.get('/listar/:idUsuario/:acesso', function (req, res) {
  dashboardController.listarMaquinas(req, res)
})
router.get('/cap_dados/:maquina_id', function (req, res) {
  dashboardController.cap_dados(req, res)
})
router.get('/atualizar_grafico_tempo_real/:maquina_id', function (req, res) {
  dashboardController.atualizar_grafico_tempo_real(req, res)
})

module.exports = router
