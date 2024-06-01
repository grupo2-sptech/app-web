let processosdModel = require('../models/processosModel');

function listaProcessos(req, res) {
    var id_setor = req.params.id_setor;
    console.log("PASSEI AQUI, ID_SETOR: ", id_setor);
    processosdModel
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

module.exports = {
    listaProcessos
};
