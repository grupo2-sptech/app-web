/** @format */

const { query } = require('express')
var database = require('../database/config')

function listarMaquinas(fk_setor, acesso) {
  var query = `SELECT m.maquina_id, m.modelo_maquina, m.memoria_total_disco, m.memoria_ocupada, f.nome_funcionario, f.cargo_funcionario, h.cpu_ocupada,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada
  FROM maquina AS m JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario 
  join historico_hardware as h on maquina_id = fk_maquina where f.fk_setor = ${fk_setor} order by cpu_ocupada desc, ram_ocupada desc;`

  if (acesso == 1) {
    query = `SELECT m.maquina_id, m.modelo_maquina, m.memoria_total_disco, m.memoria_ocupada, f.nome_funcionario, f.cargo_funcionario, h.cpu_ocupada, h.ram_ocupada
    FROM maquina AS m
    JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario join historico_hardware as h on maquina_id = fk_maquina order by ram_ocupada desc;`
  }

  return database.executar(query)
}

function cap_dados(id_maquina) {
  let query = `SELECT m.maquina_id, MINUTE(h.data_hora) as minuto_uso, m.modelo_maquina,  
  ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
  ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_total_gb,
  round(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND((m.total_ram - h.ram_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_ram_gb,
  f.nome_funcionario, f.cargo_funcionario,  h.cpu_ocupada,  h.ram_ocupada, m.total_ram FROM   
  maquina AS m JOIN  funcionario AS f ON f.funcionario_id = m.fk_Funcionario JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina
  where fk_maquina = ${id_maquina};`

  return database.executar(query)
}

function atualizar_grafico_tempo_real_model(id_maquina) {
  let query = `select f.nome_funcionario, minute(h.data_hora) as minuto, day(h.data_hora) as dia,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb, h.cpu_ocupada from historico_hardware  as h
  join maquina as m on fk_maquina= maquina_id join
  funcionario as f on fk_funcionario = funcionario_id   where fk_maquina = ${id_maquina};`
  return database.executar(query);
}

module.exports = {
  listarMaquinas,
  cap_dados,
  atualizar_grafico_tempo_real_model
}
