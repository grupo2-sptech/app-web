/** @format */

let dashboardModel = require('../models/dashboardModels')

function listarMaquinas(req, res) {
  var idUsuario = req.params.idUsuario
  var acesso = req.params.acesso
  dashboardModel
    .listarMaquinas(idUsuario, acesso)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}
function listar_processos_bloqueados(req, res) {
  var id_setor = req.params.id_setor
  dashboardModel
    .listar_processos_bloqueados(id_setor)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function listar_processos(req, res) {
  dashboardModel
    .listar_processos()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function cap_dados(req, res) {
  let id_maquina = req.params.id_maquina
  if (id_maquina == undefined) {
    console.log('Variavel Undefined')
  } else {
    dashboardModel
      .cap_dados(id_maquina)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado)
        } else {
          res.status(204).send('Nenhum resultado encontrado!')
        }
      })
      .catch(function (erro) {
        console.log(erro)
        console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function atualizar_grafico_tempo_real(req, res) {
  let id_maquina = req.params.id_maquina
  dashboardModel
    .atualizar_grafico_tempo_real_model(id_maquina)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}
function buscarPorData(req, res) {
  let id_maquina = req.params.id_maquina
  let data = req.params.data
  dashboardModel
    .buscarPorData(id_maquina, data)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function validarSenha(req, res) {
  var idUsuario = req.params.id_usuario
  var acesso = req.params.senha
  dashboardModel
    .validarSenha(idUsuario, acesso)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).send('Nenhum resultado encontrado!')
      }
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Houve um erro ao buscar os avisos: ', erro.sqlMessage)
      res.status(500).json(erro.sqlMessage)
    })
}

function deletarMaquina(req, res) {
  let id_maquina = req.params.id_maquina

  if (id_maquina != undefined) {
    dashboardModel
      .deletarMaquina(id_maquina)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log('Houve um erro ao deletar o post: ', erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
      })
  } else {
    console.log('Requisição undefined')
  }
}

function cadastrar_maquina(req, res) {
  let nome_maquina = req.params.nome_maquina;
  let modelo_maquina = req.params.modelo_maquina;

  if (nome_maquina != undefined && modelo_maquina != undefined) {
    dashboardModel
      .cadastrar_maquina(nome_maquina, modelo_maquina)
      .then(resp => {
        res.json({ id: resp.id });
      })
      .catch(erro => {
        console.log(erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
  } else {
    res.status(400).json({ error: 'Parâmetros inválidos' });
  }
}


function atualizar_geral(req, res) {
  let id_setor = req.params.id_setor;

  if (id_setor != undefined) {
    dashboardModel
      .atualizar_geral(id_setor)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send('Nenhum resultado encontrado!');
        }
      })
      .catch(erro => {
        console.log(erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
  } else {
    res.status(400).json({ error: 'Parâmetros inválidos' });
  }
}

function alerta(req, res) {
  let id_setor = req.params.id_setor;

  if (id_setor != undefined) {
    dashboardModel
      .alerta(id_setor)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send('Nenhum resultado encontrado!');
        }
      })
      .catch(erro => {
        console.log(erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
  } else {
    res.status(400).json({ error: 'Parâmetros inválidos' });
  }
}




module.exports = {
  listarMaquinas,
  cap_dados,
  atualizar_grafico_tempo_real,
  buscarPorData,
  deletarMaquina,
  validarSenha,
  listar_processos_bloqueados,
  listar_processos,
  cadastrar_maquina,
  atualizar_geral,
  alerta
}
