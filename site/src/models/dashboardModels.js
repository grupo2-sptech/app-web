var database = require("../database/config");

function listarMaquinas(fk_empresa) {
    
    var query = `SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*
    FROM maquina AS m
    JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario where m.fk_empresa = ${fk_empresa} ;`;

  return database.executar(query);
}

module.exports = {
    listarMaquinas
}