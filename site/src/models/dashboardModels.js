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

  let query = `SELECT m.*, h.data_hora
  FROM maquina AS m join historico_hardware as h on m.maquina_id = h.fk_maquina 
  JOIN setor AS s ON s.setor_id = m.fk_setor
  WHERE m.fk_setor = ${fk_setor}
  ORDER BY h.data_hora DESC LIMIT 1;
`;

  if (acesso == 1) {
    query = `SELECT m.*, h.data_hora
    FROM maquina AS m join historico_hardware as h on m.maquina_id = h.fk_maquina 
    JOIN setor AS s ON s.setor_id = m.fk_setor
    ORDER BY h.data_hora DESC LIMIT 1;
  `
  }

  return database.executar(query)
}

function cap_dados(id_maquina) {
  let query = `select h.ram_ocupada as ram_ocupada_gb,
  r.tamanho_total_gb as ram_total_gb,
  h.cpu_ocupada as cpu_ocupada,
  d.tamanho_total_gb as disco_total_gb,
  d.tamanho_disponivel_gb as memoria_disponivel_gb, p.*,
  h.data_hora as data_hora
  from maquina as m join componente as r on r.fk_maquina = m.maquina_id and r.tipo_componente = "Memória Ram"
  join componente as d on d.fk_maquina = m.maquina_id and d.tipo_componente = "Disco"
  join componente as p on p.fk_maquina = m.maquina_id and p.tipo_componente = "Processador"
  join historico_hardware as h on h.fk_maquina = m.maquina_id
  where maquina_id = '${id_maquina}'
  ORDER BY h.data_hora DESC
  LIMIT 1;`
  return database.executar(query)
}

function deletarMaquina(id_maquina) {
  let query_hardware = `DELETE FROM historico_hardware WHERE fk_maquina = ${id_maquina};`;
  let query_componete = `DELETE FROM componente WHERE fk_maquina = ${id_maquina};`;
  let query_maquina = `DELETE FROM maquina WHERE maquina_id = ${id_maquina};`;

  return Promise.all([
    database.executar(query_hardware),
    database.executar(query_componete),
    database.executar(query_maquina).catch(error => {
      console.error("Erro ao deletar máquina:", error);
    })
  ]);
}



function atualizar_grafico_tempo_real_model(id_maquina) {
  let query = `SELECT f.nome_funcionario,
  h.data_hora,
  h.cpu_ocupada,
  m.sistema_operacional,
  m.arquitetura as arquitetura_sistema_operacional,
  h.ram_ocupada as ram_ocupada_gb,
  c_disco.tamanho_disponivel_gb AS memoria_disponivel_gb,
  (c_disco.tamanho_total_gb - c_disco.tamanho_disponivel_gb) AS disco_ocupado_gb,
  c_ram.tamanho_total_gb AS ram_total_gb,
  c_cpu.modelo AS modelo_processador,
  c_cpu.fabricante AS fabricante_processador,
  c_disco.modelo AS modelo_disco,
  c_disco.tamanho_total_gb as memoria_total_gb
FROM maquina AS m
JOIN componente AS c_cpu ON m.maquina_id = c_cpu.fk_maquina AND c_cpu.tipo_componente = 'Processador'
JOIN componente AS c_ram ON m.maquina_id = c_ram.fk_maquina AND c_ram.tipo_componente = 'Memória Ram'
JOIN componente AS c_disco ON m.maquina_id = c_disco.fk_maquina AND c_disco.tipo_componente = 'Disco'
JOIN historico_hardware AS h ON h.fk_maquina = m.maquina_id
JOIN setor AS s ON s.setor_id = m.fk_setor
JOIN funcionario AS f ON f.fk_setor = s.setor_id
WHERE m.maquina_id = ${id_maquina}
ORDER BY h.data_hora DESC
LIMIT 1;
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
  buscarPorData,
  deletarMaquina
}
