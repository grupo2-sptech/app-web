/** @format */

var express = require('express')
var router = express.Router()

var dashboardController = require(`../controllers/dashboardController`)

router.get('/listar/:idUsuario/:acesso', function (req, res) {
  dashboardController.listarMaquinas(req, res)
})
router.get('/cap_dados/:id_maquina', function (req, res) {
  dashboardController.cap_dados(req, res)
})
router.get('/atualizar_grafico_tempo_real/:id_maquina', function (req, res) {
  dashboardController.atualizar_grafico_tempo_real(req, res)
})
router.get('/buscarPorData/:id_maquina/:data', function (req, res) {
  dashboardController.buscarPorData(req, res)
})
router.delete('/deletar_maquina/:id_maquina', function (req, res) {
  dashboardController.deletarMaquina(req, res)
})
router.get('/validarSenha/:id_usuario/:senha', function (req, res) {
  dashboardController.validarSenha(req, res)
})
router.get('/listar_processos_bloqueados/:id_setor', function (req, res) {
  dashboardController.listar_processos_bloqueados(req, res)
})
router.get('/listar_processos', function (req, res) {
  dashboardController.listar_processos(req, res)
})
router.get('/grafico_geral/:id_setor', function (req, res) {
  dashboardController.atualizar_geral(req, res)
})
router.get('/alerta/:id_setor', function (req, res) {
  dashboardController.alerta(req, res)
})
router.post(
  '/cadastrar_maquina/:nome_maquina/:modelo_maquina/:id_setor/:id_empresa',
  function (req, res) {
    dashboardController.cadastrar_maquina(req, res)
  }
)

module.exports = router
