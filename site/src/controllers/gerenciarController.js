const { response } = require('express');
let gerenciarModel = require('../models/gerenciarModel');

function listarUsuarios(req, res) {
  var setor = req.params.setor;
  var empresa = req.params.empresa;
  gerenciarModel.listarUsuarios(setor, empresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send('Nenhum resultado encontrado!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

  function cadastrarUsuario(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var setor = req.body.setor;
  var empresa = req.body.empresa;
  var cargo = req.body.cargo;
  var permissao = req.body.permissao;
  var permissao_total = req.body.permissaoTotal;

  gerenciarModel.cadastrarUsuario(nome, email, senha, setor, empresa, cargo, permissao, permissao_total)
  .then(function (resultado) {
    if (resultado > 0) {
        res.status(201).send('Usuário cadastrado com sucesso!');
      } else {
        res.status(204).send('Nenhum usuário cadastrado!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao cadastrar o usuário: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

  function editarUsuario(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var setor = req.body.setor;
  var cargo = req.body.cargo;
  var id_funcionario = req.body.id_funcionario;

  gerenciarModel.editarUsuario(id_funcionario, nome, email, setor, cargo)
    .then(function (resultado) {
      if (resultado == 1) {
        res.status(201).send('Usuário editado com sucesso!');
      } else {
        res.status(204).send('Nenhum usuário editado!');
      }
    })
    .catch(function (erro) {
      console.log(nome, email, setor, cargo, id_funcionario);
      console.log('Houve um erro ao editar o usuário: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

  function excluirUsuario(req, res) {
  var id_funcionario = req.params.id_funcionario;

  gerenciarModel.excluirUsuario(id_funcionario)
    .then(function (resultado) {
      if (resultado.affectedRows > 0) {
        res.status(200).send('Usuário excluído com sucesso!');
      } else {
        res.status(204).send('Nenhum usuário excluído!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao excluir o usuário: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarUsuarios,
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario
}