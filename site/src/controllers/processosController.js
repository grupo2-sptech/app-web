let processosModel = require('../models/processosModel');

function listaProcessos(req, res) {
    var id_setor = req.params.id_setor;
/*     console.log("PASSEI AQUI, ID_SETOR: ", id_setor);
 */    processosModel
      .listaProcessos(id_setor)
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
}

function atualizaProcesso(req, res) {
    var ativo = req.params.ativo;
    var id_setor = req.params.id_setor;
    var id_processo = req.params.id_processo;

    processosModel
      .atualizaProcesso(ativo,id_setor, id_processo)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(erro => {
        console.log(erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
}

function sugerirProcesso(req, res) {
    var id_setor = req.params.id_setor;
    var nome_sugestao = req.params.nome_sugestao;
    processosModel
      .sugerirProcesso(id_setor, nome_sugestao)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(erro => {
        console.log(erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
      });
}

function listarSugestoes(req, res) {
  var id_setor = req.params.id_setor;
    processosModel
      .listarSugestoes(id_setor)
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
}

module.exports = {
    listaProcessos,
    atualizaProcesso,
    sugerirProcesso,
    listarSugestoes
};
