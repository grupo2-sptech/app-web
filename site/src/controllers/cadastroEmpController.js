var empresaModel = require('../models/cadastroEmpresaModel');

function listarEmpresa(req, res) {
    empresaModel.listarEmpresa().then(function(resultado) {
        res.json(resultado);
    }).catch(function(erro) {
        console.log(erro);
        res.status(500).send("Erro ao buscar dados da empresa.");
    });
}

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
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailEmpServer;
    var cidade = req.body.cidadeServer;
    var municipio = req.body.municipioServer;
    var cep = req.body.cepServer;
    var bairro = req.body.bairroServer;
    var logradouro = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var ufEmp = req.body.ufEmpServer;
    var ufSigla = req.body.ufSiglaServer;

    console.log(email)
    console.log(cnpj)

    empresaModel.cadastrarEmpresa(nome, cnpj, email)
        .then(function(resultado) {
            empresaModel.cadastrarUF(ufEmp, ufSigla)
            .then(function(resultado){
                console.log(resultado)
                empresaModel.cadastrarEndereco(municipio, bairro, logradouro, numero, complemento, cep, resultado.insertId)
                .then(function(resultado){
                    res.status(201).send("Empresa cadastrada com sucesso.");
                }).catch(function(erro){
                    console.log(erro)
                    console.log("Erro ao cadastrar endereço")
                })
            }).catch(function(erro){
                console.log(erro)
                console.log("Erro ao cadastrar UF")
            })
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao cadastrar empresa.");
        });
}

// function autenticarEndereco(req, res) {
//     var cep = req.body.cep;
//     empresaModel.autenticarEndereco(cep)
//         .then(function(resultado) {
//             if (resultado.length > 0) {
//                 res.json(resultado[0]);
//             } else {
//                 res.status(404).send("Endereço não encontrado.");
//             }
//         })
//         .catch(function(erro) {
//             console.log(erro);
//             res.status(500).send("Erro ao autenticar endereço.");
//         });
// }

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

// function autenticarUF(req, res) {
//     var sigla = req.body.sigla;
//     empresaModel.autenticarUF(sigla)
//         .then(function(resultado) {
//             if (resultado.length > 0) {
//                 res.json(resultado[0]);
//             } else {
//                 res.status(404).send("UF não encontrada.");
//             }
//         })
//         .catch(function(erro) {
//             console.log(erro);
//             res.status(500).send("Erro ao autenticar UF.");
//         });
// }

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


function editarEmpresa(req, res) {
    var cnpj = req.body.cnpj;
    var nome = req.body.nomeServer;
    var email = req.body.emailEmpServer;
    empresaModel.editarEmpresa(cnpj, nome, email)
        .then(function() {
            res.status(200).send("Empresa e endereço associado deletados com sucesso.");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send("Erro ao deletar empresa.");
        });
}

module.exports = {
    listarEmpresa,
    autenticarEmpresa,
    cadastrarEmpresa,
    // autenticarEndereco,
    cadastrarEndereco,
    // autenticarUF,
    cadastrarUF,
    deletarEmpresa,
    editarEmpresa
};