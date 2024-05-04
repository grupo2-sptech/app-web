var express = require('express')
var router = express.Router()


var gerenciarController = require(`../controllers/gerenciarController`);

router.get('/listar/:idUsuario/:acesso', function (req, res) {
  gerenciarController.listarUsuarios(req, res)
})



module.exports = router