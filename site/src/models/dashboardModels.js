/** @format */

const { query } = require('express')
var database = require('../database/config')

async function cadastrar_maquina(nome, modelo, id_setor, id_empresa) {
  try {
    const query = `
      INSERT INTO maquina (nome_maquina, modelo_maquina, fk_setor, fk_empresa)
      OUTPUT INSERTED.id_maquina
      VALUES (@param1, @param2, @param3, @param4);
    `
    const result = await database.executar(query, [
      nome,
      modelo,
      id_setor,
      id_empresa
    ])
    return result[0].id_maquina
  } catch (error) {
    throw error
  }
}

function listarMaquinas(fk_setor, acesso) {
  /* var query = `SELECT
  m.id_maquina,
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
  historico_hardware AS h ON m.id_maquina = h.fk_maquina
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
  let query = `SELECT
  m.id_maquina,
  m.nome_maquina,
  m.modelo_maquina,
  m.sistema_operacional,
  m.arquitetura,
  m.fk_setor,
  m.fk_empresa,
  m.processador_id,
  m.memoria_total_maquina,
  MAX(h.data_hora) AS data_hora
FROM
  historico_hardware AS h
JOIN
  maquina AS m ON m.id_maquina = h.fk_maquina
JOIN
  setor AS s ON s.id_setor = m.fk_setor
WHERE
  m.fk_setor = ${fk_setor}
GROUP BY
  m.id_maquina,
  m.nome_maquina,
  m.modelo_maquina,
  m.sistema_operacional,
  m.arquitetura,
  m.fk_setor,
  m.fk_empresa,
  m.processador_id,
  m.memoria_total_maquina
ORDER BY
  data_hora DESC;
`

  console.log(query)

  if (acesso == 1) {
    query = `SELECT m.*, h.data_hora
    FROM maquina AS m join historico_hardware as h on m.id_maquina = h.fk_maquina
    JOIN setor AS s ON s.id_setor = m.fk_setor
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
  from maquina as m join componente as r on r.fk_maquina = m.id_maquina and r.tipo_componente = "Memória Ram"
  join componente as d on d.fk_maquina = m.id_maquina and d.tipo_componente = "Disco"
  join componente as p on p.fk_maquina = m.id_maquina and p.tipo_componente = "Processador"
  join historico_hardware as h on h.fk_maquina = m.id_maquina
  where id_maquina = '${id_maquina}'
  ORDER BY h.data_hora DESC
  LIMIT 1;`
  return database.executar(query)
}

async function deletarMaquina(id_maquina) {
  try {
    const query_hardware = `DELETE FROM historico_hardware WHERE fk_maquina = @param1;`
    const query_rede = `DELETE FROM rede WHERE fk_maquina = @param1;`
    const query_componente = `DELETE FROM componente WHERE fk_maquina = @param1;`
    const query_alerta = `DELETE FROM alerta WHERE fk_maquina = @param1;`
    const query_uso_maquina = `DELETE FROM uso_maquina WHERE fk_maquina = @param1;`
    const query_reinicio = `DELETE FROM historico_reinicializacao WHERE fk_maquina = @param1;`
    const query_dispositivo = `DELETE FROM dispositivos_conectados WHERE fk_maquina = @param1;`
    const query_maquina = `DELETE FROM maquina WHERE id_maquina = @param1;`
    

    await database.executar(query_hardware, [id_maquina])
    await database.executar(query_rede, [id_maquina])
    await database.executar(query_componente, [id_maquina])
    await database.executar(query_alerta, [id_maquina])
    await database.executar(query_uso_maquina, [id_maquina])
    await database.executar(query_reinicio, [id_maquina])
    await database.executar(query_dispositivo, [id_maquina])
    await database.executar(query_maquina, [id_maquina])
    return { message: 'Máquina e dependências deletadas com sucesso' }
  } catch (error) {
    console.error('Erro ao deletar máquina:', error)
    throw error
  }
}

function editarMaquina(id_maquina, nome_maquina, modelo_maquina) {
  let query = `Update maquina set nome_maquina = '${nome_maquina}', modelo_maquina = '${modelo_maquina}' where id_maquina = ${id_maquina}`

  return database.executar(query)
}

function validarSenha(id_usuario, senha) {
  let query = `SELECT * from funcionario WHERE id_funcionario = ${id_usuario} AND senha_acesso = ${senha};`

  return database.executar(query)
}

function listar_processos_bloqueados(id_setor) {
  let query = ` select pb.id_processos, p.titulo_processo from processos_bloqueados_no_setor as pb
  join processos_janelas as p on p.processo_id = fk_processo where fk_setor = ${id_setor};`

  return database.executar(query)
}

function listar_processos() {
  let query = `select p.processo_id, p.titulo_processo from processos_janelas as p;`

  return database.executar(query)
}

function atualizar_grafico_tempo_real_model(id_maquina) {
  let query = `WITH LastCPUHistory AS (
    SELECT TOP 1 *
    FROM historico_hardware
    WHERE fk_maquina = ${id_maquina} AND cpu_ocupada IS NOT NULL
    ORDER BY data_hora DESC
),
LastRAMHistory AS (
    SELECT TOP 1 *
    FROM historico_hardware
    WHERE fk_maquina = ${id_maquina} AND ram_ocupada IS NOT NULL
    ORDER BY data_hora DESC
)
SELECT
TOP 1
lch.data_hora,
lch.cpu_ocupada,
lrh.ram_ocupada,
m.sistema_operacional,
m.nome_maquina,
m.arquitetura,
c_disco.tamanho_disponivel_gb AS memoria_disponivel_gb,
(c_disco.tamanho_total_gb - c_disco.tamanho_disponivel_gb) AS disco_ocupado_gb,
c_ram.tamanho_total_gb AS ram_total_gb,
c_cpu.fabricante as fabricante_processador,
c_cpu.modelo as modelo_processador,
c_disco.modelo AS modelo_disco,
m.memoria_total_maquina AS memoria_total_gb
FROM setor AS s
JOIN funcionario AS f ON s.id_setor = f.fk_setor
JOIN maquina AS m ON s.id_setor = m.fk_setor
JOIN componente AS c_cpu ON m.id_maquina = c_cpu.fk_maquina AND c_cpu.tipo_componente = 'Processador'
JOIN componente AS c_ram ON m.id_maquina = c_ram.fk_maquina AND c_ram.tipo_componente = 'Memória Ram'
JOIN componente AS c_disco ON m.id_maquina = c_disco.fk_maquina AND c_disco.tipo_componente LIKE 'Disco%'
LEFT JOIN LastCPUHistory AS lch ON m.id_maquina = lch.fk_maquina
LEFT JOIN LastRAMHistory AS lrh ON m.id_maquina = lrh.fk_maquina
WHERE m.id_maquina = ${id_maquina};`
  return database.executar(query)
}

function buscarPorData(id_maquina, data) {
  let query = `SELECT
  AVG(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_08_10,
  AVG(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_10_12,
  AVG(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_12_14,
  AVG(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_14_16,
  AVG(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_16_18,
  AVG(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_08_10,
  AVG(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_10_12,
  AVG(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_12_14,
  AVG(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_14_16,
  AVG(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_16_18
FROM
  historico_hardware h join maquina as m on fk_maquina = id_maquina
WHERE
  DATE(h.data_hora) = '${data}' and fk_maquina = ${id_maquina};
  `
  return database.executar(query)
}

function atualizar_geral(id_setor) {
  let query

  query = `
  SELECT
  c.id_categoria,
  c.nome, -- Supondo que a tabela de categorias tenha um campo nome_categoria
  COUNT(h.fk_categoria) AS quantidade_bloqueios
FROM
  categoria c
LEFT JOIN
  historico_bloqueios h
ON
  c.id_categoria = h.fk_categoria
AND
  CAST(h.data_hora AS DATE) >= CAST(GETDATE() - 7 AS DATE)
AND
  CAST(h.data_hora AS DATE) < CAST(GETDATE() + 1 AS DATE)
AND
  h.fk_setor = ${id_setor}
GROUP BY
  c.id_categoria,
  c.nome;
`

  return database.executar(query)
}

function alerta(id_setor) {
  let query

  query = `
  SELECT m.nome_maquina, a.id_alerta, a.descricao_alerta, a.data_hora, a.titulo
  FROM alerta AS a
  JOIN maquina AS m ON m.id_maquina = a.fk_maquina
  WHERE m.fk_setor = ${id_setor}
    AND a.data_hora >= DATEADD(hour, -1, GETDATE())
  ORDER BY a.data_hora DESC;
  `

  return database.executar(query)
}

function atualizarDadosAlerta(id_maquina) {
  let query = `SELECT 
    (SELECT COUNT(*) 
     FROM alerta 
     WHERE titulo LIKE '%RAM%' 
       AND fk_maquina = ${id_maquina} 
       AND CONVERT(DATE, data_hora) = CONVERT(DATE, GETDATE())) AS ram,
       
    (SELECT COUNT(*) 
     FROM alerta 
     WHERE titulo LIKE '%CPU%' 
       AND fk_maquina = ${id_maquina} 
       AND CONVERT(DATE, data_hora) = CONVERT(DATE, GETDATE())) AS cpu,

    (SELECT COUNT(*) 
     FROM alerta 
     WHERE titulo LIKE '%Processo%' 
       AND fk_maquina = ${id_maquina} 
       AND CONVERT(DATE, data_hora) = CONVERT(DATE, GETDATE())) AS processo;`;

  return database.executar(query);
}

function alertaCadastro(id) {
  let query = `insert into alerta (fk_maquina, descricao_alerta, data_hora, titulo) values (${id}, 'Pré cadastro realizado com sucesso, código de cadastro gerado: ${id}', GETDATE(), 'Máquina cadastrada com sucesso!');
`

  return database.executar(query);
}

function alertaEdit(id_maquina, responsavel) {
  let query = `insert into alerta (fk_maquina, descricao_alerta, data_hora, titulo) values (${id_maquina}, 'Informamos que o funcionario ${responsavel} editou a Máquina com o codigo: ${id_maquina}', GETDATE(), 'Máquina editada com sucesso!');
`

  return database.executar(query);
}

module.exports = {
  listarMaquinas,
  cap_dados,
  atualizar_grafico_tempo_real_model,
  buscarPorData,
  deletarMaquina,
  validarSenha,
  listar_processos_bloqueados,
  listar_processos,
  cadastrar_maquina,
  atualizar_geral,
  editarMaquina,
  atualizarDadosAlerta,
  alertaCadastro,
  alertaEdit,
  alerta
}
