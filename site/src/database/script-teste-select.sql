select * from maquina;
select * from funcionario;
select * from setor;
select * from empresa;

use hardware_security;



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
  
  select 
