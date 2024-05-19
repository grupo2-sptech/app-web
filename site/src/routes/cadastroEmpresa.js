const express = require('express');
const router = express.Router();
const cadastroEmpController = require('../controllers/cadastroEmpController');


router.post("/autenticarEmpresa", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});

router.post("/cadastrarEmpresa", function (req, res){
    cadastroEmpController.cadastrarEmpresa(req, res);
});

router.post("/autenticarEndereco", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});

router.post("/cadastrarEndereco", function (req, res){
    cadastroEmpController.cadastrarEndereco(req, res);
});

router.post("/autenticarUF", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});

router.post("/cadastrarUF", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});

router.post("/deletarEmpresa", function (req, res){
    cadastroEmpController.autenticarEmpresa(req, res);
});


module.exports = router;