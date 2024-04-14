/** @format */

const { query } = require('express')
var database = require('../database/config')

function listarMaquinas(fk_setor, acesso) {
  /* var query = `SELECT 
  m.maquina_id, 
  m.modelo_maquina, 
  m.memoria_total_disco, 
  m.memoria_ocupada, 
  f.nome_funcionario, 
  f.cargo_funcionario, 
  h.cpu_ocupada,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada
FROM 
  maquina AS m 
JOIN 
  funcionario AS f ON f.funcionario_id = m.fk_Funcionario
JOIN 
  historico_hardware AS h ON m.maquina_id = h.fk_maquina 
JOIN
  (SELECT 
      fk_maquina, 
      MAX(cpu_ocupada) AS max_cpu_ocupada,
      MAX(ram_ocupada) AS max_ram_ocupada
  FROM 
      historico_hardware
  GROUP BY 
      fk_maquina) AS max_values ON h.fk_maquina = max_values.fk_maquina
JOIN
  (SELECT 
      fk_maquina, 
      MAX(data_hora) AS max_data_hora
  FROM 
      historico_hardware
  GROUP BY 
      fk_maquina) AS max_datetime ON h.fk_maquina = max_datetime.fk_maquina
WHERE 
  f.fk_setor = ${fk_setor} AND
  h.cpu_ocupada = max_values.max_cpu_ocupada AND
  h.ram_ocupada = max_values.max_ram_ocupada AND
  h.data_hora = max_datetime.max_data_hora
ORDER BY 
  max_datetime.max_data_hora DESC;
` */

  let query = `SELECT m.*, p.hora_data_processador
  FROM maquina AS m join processador p on p.id_processador = m.fk_processador 
  JOIN setor AS s ON s.setor_id = m.fk_setor
  WHERE m.fk_setor = ${fk_setor}
  ORDER BY p.hora_data_processador DESC;
`;

  if (acesso == 1) {
    query = `SELECT m.*, p.hora_data_processador
    FROM maquina AS m join processador p on p.id_processador = m.fk_processador 
    JOIN setor AS s ON s.setor_id = m.fk_setor
    ORDER BY p.hora_data_processador DESC;
  `
  }

  return database.executar(query)
}

function cap_dados(id_maquina) {
  let query = `select mr.uso_ram_gb as ram_ocupada_gb,
  mr.total_ram_gb as ram_total_gb,
  p.uso_processador as cpu_ocupada,
  d.tamanho_total as disco_total_gb,
  d.tamanho_disponivel as memoria_disponivel_gb,
  p.hora_data_processador as data_hora
  from maquina as m join processador as p on p.id_processador = m.fk_processador
  join memoria_ram as mr on mr.id_memoria_ram = m.fk_ram
  join disco as d on d.id_disco = m.fk_disco where maquina_id = '${id_maquina}';`
  return database.executar(query)
}

function atualizar_grafico_tempo_real_model(id_maquina) {
  let query = `select f.nome_funcionario,  h.data_hora,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
    ROUND(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as  ram_ocupada_gb, h.cpu_ocupada, m.sistema_operacional, m.arquitetura_sistema_operacional,
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
