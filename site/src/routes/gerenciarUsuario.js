var express = require("express");
var router = express.Router();


var gerenciarController = require("../controllers/gerenciarController");

router.get('/listarUsuarios/:setor/:empresa', function (req, res) {
  gerenciarController.listarUsuarios(req, res)
})

router.post('/cadastrarUsuario', function (req, res) {
  gerenciarController.cadastrarUsuario(req, res)
})

router.put('/editarUsuario', function (req, res) {
  gerenciarController.editarUsuario(req, res)
})

router.delete('/excluirUsuario/:id_funcionario', function (req, res) {
  gerenciarController.excluirUsuario(req, res)
})


module.exports = router;