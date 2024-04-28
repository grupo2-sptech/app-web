select * from maquina;
select * from funcionario;
select * from setor;
select * from empresa;

use hardware_security;

select h.hardware_historico_id, h.cpu_ocupada from historico_hardware as h where hardware_historico_id = 802; 

SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*, s.nome_setor
    FROM maquina AS m
    JOIN funcionario AS f ON f.funcionario_id join setor s on setor_id = fk_setor = m.fk_Funcionario where f.fk_setor = 300;


SELECT m.maquina_id, m.modelo_maquina, m.memoria_total_disco, m.memoria_ocupada, f.nome_funcionario, f.cargo_funcionario, h.cpu_ocupada, h.ram_ocupada
      FROM maquina AS m
      JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario join historico_hardware as h on maquina_id = fk_maquina order by ram_ocupada desc;
      
SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*
      FROM maquina AS m
      JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario;
      

      
select * from historico_todos_registros_hardware where date(data_hora) = '2024-04-06' and fk_maquina = 501;
      
      
SELECT 
    m.maquina_id,
    m.modelo_maquina,
    ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
    f.nome_funcionario,
    f.cargo_funcionario,
    h.cpu_ocupada,
    h.ram_ocupada
FROM 
    maquina AS m
JOIN 
    funcionario AS f ON f.funcionario_id = m.fk_Funcionario 
JOIN 
    historico_hardware AS h ON m.maquina_id = h.fk_maquina  where fk_maquina = 500
ORDER BY 
    h.ram_ocupada DESC;

SELECT m.maquina_id, m.modelo_maquina,  
ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb, 
ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_total_gb,
round(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb,
ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
ROUND((m.total_ram - h.ram_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_ram_gb,
f.nome_funcionario, f.cargo_funcionario,  h.cpu_ocupada,  h.ram_ocupada, m.total_ram FROM   
maquina AS m JOIN  funcionario AS f ON f.funcionario_id = m.fk_Funcionario JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina
;

update maquina set memoria_total_disco = 256052966400, memoria_ocupada = 11856928768 where maquina_id = 530;

update historico_hardware set ram_ocupada = 7453138944, cpu_ocupada = 12.49 where fk_maquina = 530;

update historico_hardware set ram_ocupada = 7224143872, cpu_ocupada = 2.91 where fk_maquina = 519;

update historico_hardware set ram_ocupada = 7533887488, cpu_ocupada = 3.74 where fk_maquina = 530;



SELECT m.maquina_id, MINUTE(h.data_hora) as minuto_uso, sec_to_time(h.data_hora), m.modelo_maquina,
  ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
  ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_total_gb,
  round(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND((m.total_ram - h.ram_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_ram_gb,
  f.nome_funcionario, f.cargo_funcionario,  h.cpu_ocupada,  h.ram_ocupada, m.total_ram FROM
  maquina AS m JOIN  funcionario AS f ON f.funcionario_id = m.fk_Funcionario JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina
  where fk_maquina = 502;
  
SELECT
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_08_10,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_10_12,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_12_14,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_14_16,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.ram_ocupada_tempo_real / (1024 * 1024 * 1024) ELSE 0 END) / 6 , 2) AS ram_ocupada_16_18,
	ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_08_10,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_10_12,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_12_14,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_14_16,
    ROUND(SUM(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.cpu_ocupada_tempo_real  ELSE 0 END) / 6 , 2) AS cpu_ocupada_16_18
FROM
    todos_registros_hardware h join maquina as m on fk_maquina = maquina_id
WHERE
    DATE(h.data_hora) = '2024-04-07' and fk_maquina = 503;
    
    
SELECT
  AVG(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_08_10,
  AVG(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_10_12,
  AVG(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_12_14,
  AVG(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_14_16,
  AVG(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.ram_ocupada  ELSE 0 END) AS ram_ocupada_16_18,
  AVG(CASE WHEN TIME(h.data_hora) >= '08:00:00' AND TIME(h.data_hora) < '10:0s0:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_08_10,
  AVG(CASE WHEN TIME(h.data_hora) >= '10:00:00' AND TIME(h.data_hora) < '12:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_10_12,
  AVG(CASE WHEN TIME(h.data_hora) >= '12:00:00' AND TIME(h.data_hora) < '14:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_12_14,
  AVG(CASE WHEN TIME(h.data_hora) >= '14:00:00' AND TIME(h.data_hora) < '16:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_14_16,
  AVG(CASE WHEN TIME(h.data_hora) >= '16:00:00' AND TIME(h.data_hora) < '18:00:00' THEN h.cpu_ocupada  ELSE 0 END) AS cpu_ocupada_16_18
FROM
  historico_hardware h join maquina as m on fk_maquina = maquina_id
WHERE
  DATE(h.data_hora) = '2024-04-26' and fk_maquina = 700;
  


select f.nome_funcionario,  h.data_hora,
  ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
  ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
    ROUND(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
  ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as  ram_ocupada_gb, h.cpu_ocupada, m.sistema_operacional, m.arquitetura_sistema_operacional,
  m.modelo_processador, m.fabricante_processador, m.modelo_disco,
    ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS memoria_total_gb
  from historico_hardware  as h join maquina as m on fk_maquina= maquina_id join
  funcionario as f on fk_funcionario = funcionario_id   where fk_maquina = 503;
  
  
  update maquina set total_ram = "8000000000" where maquina_id = 503;
  
  select * from maquina;
  
  
  select pb.id_processos, p.titulo_processo from processos_bloqueados_no_setor as pb 
  join processos_janelas as p on p.processo_id = fk_processo where fk_setor = ${};
  
  select p.processo_id, p.titulo_processo from processos_janelas as p;


select * from  historico_hardware;