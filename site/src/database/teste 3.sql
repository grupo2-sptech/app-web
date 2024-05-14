SELECT s.*, f.email_funcionario as email, f.nome_funcionario as nome, f.funcionario_id as id, f.acesso_plataforma as permissao, f.permissao_total as permissao_total 
FROM setor AS s JOIN funcionario AS f ON s.setor_id = f.fk_setor where funcionario_id = 303;

SELECT m.*, p.hora_data_processador
FROM maquina AS m join processador p on p.id_processador = m.fk_processador 
JOIN setor AS s ON s.setor_id = m.fk_setor
WHERE m.fk_setor = 200;

SELECT  pj.titulo_processo from processos_bloqueados_no_setor as pb join setor on pb.fk_setor = setor.setor_id
                    JOIN processos_janelas as pj ON pj.processo_id = pb.fk_processo
                    WHERE setor_id = 203;

select mr.uso_ram_gb as ram_ocupada_gb,
 mr.total_ram_gb as ram_total_gb,
 p.uso_processador as cpu_ocupada,
 d.tamanho_total as disco_total_gb,
 d.tamanho_disponivel as memoria_disponivel_gb,
 p.hora_data_processador as data_hora
 from maquina as m join processador as p on p.id_processador = m.fk_processador
 join memoria_ram as mr on mr.id_memoria_ram = m.fk_ram
 join disco as d on d.id_disco = m.fk_disco where maquina_id = 700;

SELECT funcionario_id, nome_funcionario, email_funcionario, acesso_plataforma, permissao_total, setor.setor_id, fk_empresa_func from funcionario join setor on fk_setor = setor_id WHERE email_funcionario  = 'teste.teste' AND senha_acesso = '123' OR login_acesso = 'teste.teste' AND senha_acesso = '123';


select maquina.*, historico_hardware.* from funcionario join maquina on funcionario_id = fk_funcionario join historico_hardware on maquina_id = fk_maquina where fk_funcionario = 203;

select * from processador;
select * from memoria_ram;
select * from disco;

SELECT funcionario_id, nome_funcionario from
funcionario WHERE
email_funcionario  = 'teste.teste' AND senha_acesso = '123' OR
login_acesso = 'teste.teste' AND senha_acesso = '123';

SELECT m.maquina_id, m.modelo_maquina, m.memoria_total_disco, m.memoria_ocupada, f.nome_funcionario, f.cargo_funcionario, h.cpu_ocupada,
ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada FROM maquina AS m 
JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario
JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina 
WHERE f.fk_setor = 303 ORDER BY h.data_hora DESC;

select mr.uso_ram_gb as ram_ocupada_gb,
mr.total_ram_gb as ram_total_gb,
p.uso_processador as cpu_ocupada,
d.tamanho_total as disco_total_gb,
d.tamanho_disponivel as memoria_disponivel_gb,
p.hora_data_processador as data_hora
from maquina as m join processador as p on p.id_processador = m.fk_processador
 join memoria_ram as mr on mr.id_memoria_ram = m.fk_ram  join disco as d on d.id_disco = m.fk_disco where maquina_id = 'BFEBFBFF000B06A3';

select * from funcionario;
select * from maquina;
select * from setor;


SELECT m.*, MAX(h.data_hora) AS data_hora
FROM maquina AS m
JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina
JOIN setor AS s ON s.setor_id = m.fk_setor
WHERE m.fk_setor = 203
GROUP BY m.maquina_id, m.nome_maquina, m.fk_setor
ORDER BY data_hora DESC;

SELECT m.*, h.data_hora
  FROM maquina AS m join historico_hardware as h on m.maquina_id = h.fk_maquina
  JOIN setor AS s ON s.setor_id = m.fk_setor
  WHERE m.fk_setor = 203
  ORDER BY h.data_hora DESC;
  
  SELECT f.nome_funcionario,
  h.data_hora,
  h.cpu_ocupada,
  m.sistema_operacional,
  m.nome_maquina,
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
WHERE m.maquina_id = 700
ORDER BY h.data_hora DESC
LIMIT 1;

SELECT
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
  historico_hardware h join maquina as m on fk_maquina = maquina_id
WHERE
  DATE(h.data_hora) = '2024-04-21' and fk_maquina = 706;
  
select * from historico_hardware;


SELECT funcionario_id, nome_funcionario, setor.setor_id, pj.titulo_processo from
funcionario
JOIN setor ON setor.setor_id = funcionario.fk_setor
JOIN processos_bloqueados_no_setor as pb ON pb.fk_setor = setor.setor_id
JOIN processos_janelas as pj ON pj.processo_id = pb.fk_processo
WHERE email_funcionario  = 'teste.teste' AND senha_acesso = '123' OR
login_acesso = 'teste.teste' AND senha_acesso = '123';
select * from processador;
select * from memoria_ram;
select * from disco;
select * from maquina;
select * from componente;

SELECT funcionario_id, nome_funcionario, setor.setor_id, pj.titulo_processo from
funcionario
    JOIN setor ON setor.setor_id = funcionario.fk_setor
    JOIN processos_bloqueados_no_setor as pb ON pb.fk_setor = setor.setor_id
    JOIN processos_janelas as pj ON pj.processo_id = pb.fk_processo
    WHERE email_funcionario  = 'teste.teste' AND senha_acesso = '123' OR
    login_acesso = 'teste.teste' AND senha_acesso = '123';

truncate historico_hardware;
truncate componente;

SELECT m.*, h.data_hora
  FROM maquina AS m join historico_hardware as h on m.maquina_id = h.fk_maquina 
  JOIN setor AS s ON s.setor_id = m.fk_setor
  WHERE m.fk_setor = 203
  ORDER BY h.data_hora DESC;
  
  SELECT h.ram_ocupada AS ram_ocupada_gb,
       r.tamanho_total_gb AS ram_total_gb,
       h.cpu_ocupada AS cpu_ocupada,
       d.tamanho_total_gb AS disco_total_gb,
       d.tamanho_disponivel_gb AS memoria_disponivel_gb,
       p.*,
       h.data_hora AS data_hora
FROM maquina AS m 
JOIN componente AS r ON r.fk_maquina = m.maquina_id AND r.tipo_componente = "Memória Ram"
JOIN componente AS d ON d.fk_maquina = m.maquina_id AND d.tipo_componente = "Disco"
JOIN componente AS p ON p.fk_maquina = m.maquina_id AND p.tipo_componente = "Processador"
JOIN historico_hardware AS h ON h.fk_maquina = m.maquina_id
WHERE m.maquina_id = 701 
ORDER BY h.data_hora DESC
LIMIT 1;

SELECT f.nome_funcionario,
	   m.sistema_operacional,
       m.arquitetura as arquitetura_sistema_operacional,
       h.data_hora,
       h.cpu_ocupada,
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
WHERE m.maquina_id = 700
ORDER BY h.data_hora DESC
LIMIT 1;

select m.nome_maquina, m.modelo_maquina, m.maquina_id, s.nome_setor
from maquina m join setor s on m.fk_setor = s.setor_id where s.setor_id = 203;

delete from historico_hardware where fk_maquina = 704;
delete from componente where fk_maquina = 704;
delete from maquina where maquina_id = 707;

select * from historico_hardware;
select * from componente;

truncate table historico_hardware;

SELECT maquina_id from
maquina where processador_id = 'BFEBFBFF000B06A3';
  
select * from maquina;

use hardware_security;
select * from funcionario;

select f.nome_funcionario,  p.hora_data_processador as data_hora,
  d.tamanho_disponivel AS memoria_disponivel_gb,
  d.tamanho_total - d.tamanho_disponivel AS disco_ocupado_gb,
  mr.total_ram_gb AS ram_total_gb,
  mr.uso_ram_gb as  ram_ocupada_gb,
  p.uso_processador as cpu_ocupada,
  m.sistema_operacional, m.arquitetura as arquitetura_sistema_operacional,
  p.nome_processador as modelo_processador,
  p.fabricante_processador,
  d.modelo as modelo_disco
  from maquina  as m join processador as p on m.fk_processador = p.id_processador
  join disco as d on d.id_disco = m.fk_disco
  join memoria_ram as mr on mr.id_memoria_ram = m.fk_ram
  join setor as s on s.setor_id = m.fk_setor
  join funcionario as f on f.fk_setor = s.setor_id
  where maquina_id = 700;

SELECT fk_ram, fk_processador, fk_disco from
maquina where maquina_id = 'BFEBFBFF000B06A3';


select f.nome_funcionario,  h.data_hora,
ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
ROUND(m.total_ram / (1024 * 1024 * 1024), 2) AS ram_total_gb,
ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as  ram_ocupada_gb,
h.cpu_ocupada, m.sistema_operacional, m.arquitetura_sistema_operacional,
m.modelo_processador, m.fabricante_processador, m.modelo_disco,
ROUND(m.memoria_total_disco / (1024 * 1024 * 1024), 2) AS memoria_total_gb
from historico_hardware  as h 
join maquina as m on fk_maquina = maquina_id 
join funcionario as f on fk_funcionario = funcionario_id  where fk_maquina = [object HTMLDivElement];
