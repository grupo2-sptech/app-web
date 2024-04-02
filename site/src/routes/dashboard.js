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

module.exports = router
