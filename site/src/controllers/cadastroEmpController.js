var empresaModel = require('../models/empresaModel');

function autenticarEmpresa(req, res) {
    var cnpj = req.body.cnpj;
    empresaModel.autenticarEmpresa(cnpj)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Empresa não encontrada.");
            }
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao autenticar empresa.");
        });
}

function cadastrarEmpresa(req, res) {
    var nome = req.body.nome;
    var cnpj = req.body.cnpj;
    var email = req.body.email;
    empresaModel.cadastrarEmpresa(nome, cnpj, email)
        .then(function(resultado) {
            res.status(201).send("Empresa cadastrada com sucesso.");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao cadastrar empresa.");
        });
}

function autenticarEndereco(req, res) {
    var cep = req.body.cep;
    empresaModel.autenticarEndereco(cep)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Endereço não encontrado.");
            }
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao autenticar endereço.");
        });
}

function cadastrarEndereco(req, res) {
    var { municipio, bairro, logradouro, numero, complemento, cep, fk_uf } = req.body;
    empresaModel.cadastrarEndereco(municipio, bairro, logradouro, numero, complemento, cep, fk_uf)
        .then(function(resultado) {
            res.status(201).send("Endereço cadastrado com sucesso.");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao cadastrar endereço.");
        });
}

function autenticarUF(req, res) {
    var sigla = req.body.sigla;
    empresaModel.autenticarUF(sigla)
        .then(function(resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("UF não encontrada.");
            }
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao autenticar UF.");
        });
}

function cadastrarUF(req, res) {
    var { nome, sigla } = req.body;
    empresaModel.cadastrarUF(nome, sigla)
        .then(function(resultado) {
            res.status(201).send("UF cadastrada com sucesso.");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao cadastrar UF.");
        });
}

function deletarEmpresa(req, res) {
    var cnpj = req.body.cnpj;
    empresaModel.deletarEmpresa(cnpj)
        .then(function() {
            res.status(200).send("Empresa e endereço associado deletados com sucesso.");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao deletar empresa.");
        });
}

module.exports = {
    autenticarEmpresa,
    cadastrarEmpresa,
    autenticarEndereco,
    cadastrarEndereco,
    autenticarUF,
    cadastrarUF,
    deletarEmpresa
};