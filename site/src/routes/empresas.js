/** @format */

var express = require('express')
var router = express.Router()

var empresaController = require('../controllers/empresaController')

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post('/cadastrar', function (req, res) {
  empresaController.cadastrar(req, res)
})

router.get('/buscar', function (req, res) {
  empresaController.buscarPorCnpj(req, res)
})

router.get('/buscar/:id', function (req, res) {
  empresaController.buscarPorId(req, res)
})

router.get('/listar/:id_setor', function (req, res) {
  empresaController.listar(req, res)
})

router.get('/listar_setores', function (req, res) {
  empresaController.listar_setores(req, res)
})
router.get('/listar_tudo', function (req, res) {
  empresaController.listar_tudo(req, res)
})

module.exports = router
