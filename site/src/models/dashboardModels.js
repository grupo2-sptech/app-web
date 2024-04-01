/** @format */

var database = require('../database/config')

function listarMaquinas(fk_setor, acesso) {
  var query = `SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*
    FROM maquina AS m
    JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario where f.fk_setor = ${fk_setor};`

  if (acesso == 1) {
    query = `SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*
      FROM maquina AS m
      JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario;`
  }

  return database.executar(query)
}

module.exports = {
  listarMaquinas
}
