/** @format */

const dashboardModel = require('../models/dashboardModels')

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

module.exports = {
  listarMaquinas
}
