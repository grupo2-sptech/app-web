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
router.get('/buscarPorData/:maquina_id/:data', function (req, res) {
  dashboardController.buscarPorData(req, res)
})
router.delete('/deletar_maquina/:maquina_id', function (req, res) {
  dashboardController.deletarMaquina(req, res)
})
router.get('/listar_processos_bloqueados/:id_setor', function (req, res) {
  dashboardController.listar_processos_bloqueados(req, res)
})
router.get('/listar_processos', function (req, res) {
  dashboardController.listar_processos(req, res)
})

module.exports = router
