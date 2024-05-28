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
    }
    )
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao buscar os usuários: ', erro.sqlMessage);
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

  console.log('Chegou na função Controller de cadastro de usuário!');
  gerenciarModel.cadastrarUsuario(nome, email, senha, setor, empresa, cargo, permissao, permissao_total)
    .then(function (resultado) {
      if (resultado.affectedRows > 0) {
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
  var senha = req.body.senha;
  var setor = req.body.setor;
  var empresa = req.body.empresa;
  var cargo = req.body.cargo;
  var permissao = req.body.permissao;
  var permissao_total = req.body.permissaoTotal;

  gerenciarModel.editarUsuario(nome, email, senha, setor, empresa, cargo, permissao, permissao_total)
    .then(function (resultado) {
      if (resultado.affectedRows > 0) {
        res.status(201).send('Usuário editado com sucesso!');
      } else {
        res.status(204).send('Nenhum usuário editado!');
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao editar o usuário: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

  function excluirUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  gerenciarModel.excluirUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.affectedRows > 0) {
        res.status(201).send('Usuário excluído com sucesso!');
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