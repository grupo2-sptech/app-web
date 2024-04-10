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
  let query = `SELECT m.maquina_id, h.data_hora,
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
  let query = `select f.nome_funcionario,  h.data_hora,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb, h.cpu_ocupada, m.sistema_operacional, m.arquitetura_sistema_operacional,
  m.modelo_processador, m.fabricante_processador, m.modelo_disco,
    ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS memoria_total_gb
  from historico_hardware  as h join maquina as m on fk_maquina= maquina_id join
  funcionario as f on fk_funcionario = funcionario_id   where fk_maquina = ${id_maquina};
`
  
  return database.executar(query)
}

function buscarPorData(id_maquina, data) {
  let query = `SELECT
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_08_10,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_10_12,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_12_14,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_14_16,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_16_18,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_08_10,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_10_12,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_12_14,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_14_16,
  ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_16_18,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb
FROM
  todos_registros_hardware h join maquina as m on fk_maquina = maquina_id
WHERE
  DATE(h.data_hora) = '${data}' and fk_maquina = ${id_maquina};
  `
  return database.executar(query)
}

module.exports = {
  listarMaquinas,
  cap_dados,
  atualizar_grafico_tempo_real_model,
  buscarPorData
}