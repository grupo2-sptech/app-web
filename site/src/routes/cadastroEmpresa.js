const express = require('express');
const router = express.Router();
const cadastroEmpController = require('../controllers/cadastroEmpController');

router.get("/listarEmpresa", function (req, res){
    cadastroEmpController.listarEmpresa(req, res);
});

router.post("/autenticarEmpresa", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});
    
router.post("/cadastrarEmpresa", function (req, res){
    cadastroEmpController.cadastrarEmpresa(req, res);
});

// router.post("/autenticarEndereco", function (req, res){
//     cadastroEmpController.autenticarEmpresa(req, res);
// });

router.post("/cadastrarEndereco", function (req, res){
    cadastroEmpController.cadastrarEndereco(req, res);
});

// router.post("/autenticarUF", function (req, res){
//     cadastroEmpController.autenticarEmpresa(req, res);
// });

router.post("/cadastrarUF", function (req, res){
    cadastroEmpController.cadastrarUF(req, res);
});

router.post("/deletarEmpresa", function (req, res){
    cadastroEmpController.deletarEmpresa(req, res);
});

router.put("/editarEmpresa", function (req, res){
    cadastroEmpController.editarEmpresa(req, res);
});


module.exports = router; 