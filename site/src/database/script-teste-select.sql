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
maquina AS m JOIN  funcionario AS f ON f.funcionario_id = m.fk_Funcionario JOIN historico_hardware AS h ON m.maquina_id = h.fk_maquina order by ram_ocupada_gb desc
;
SELECT funcionario_id, nome_funcionario, maquina_id from funcionario join maquina on fk_funcionario = funcionario_id WHERE email_funcionario  = 'jonathanaparecido80@gmail.com' AND senha_acesso = '123' OR login_acesso = '${email}' AND senha_acesso = '${senha}';

update maquina set memoria_total_disco = 7583645696, memoria_ocupada = 3.6 where maquina_id = '502';

SELECT funcionario_id, nome_funcionario, maquina_id from
funcionario join maquina on fk_funcionario = funcionario_id WHERE email_funcionario  = 'pedro.souza' AND senha_acesso = '123' OR
login_acesso = 'pedro.souza' AND senha_acesso = '123';

update historico_hardware set ram_ocupada = 7610138624, cpu_ocupada = 5.2 where fk_maquina = '502';

select f.nome_funcionario, 
ROUND((m.memoria_total_disco - m.memoria_ocupada) / (1024 * 1024 * 1024), 2) AS memoria_disponivel_gb,
ROUND(m.memoria_ocupada / (1024 * 1024 * 1024), 2) AS disco_ocupado_gb,
ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb, h.cpu_ocupada from historico_hardware  as h
join maquina as m on fk_maquina= maquina_id join
funcionario as f on fk_funcionario = funcionario_id  where fk_maquina = 508;

update historico_hardware set ram_ocupada = 7224143872, cpu_ocupada = 2.91 where fk_maquina = 519;

update historico_hardware set ram_ocupada = 7430295552, cpu_ocupada = 9.01 where fk_maquina = 530;


SELECT m.maquina_id, m.modelo_maquina, m.memoria_total_disco, m.memoria_ocupada, f.nome_funcionario, f.cargo_funcionario, h.cpu_ocupada,
ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada
FROM maquina AS m JOIN funcionario AS f ON f.funcionario_id = m.fk_Funcionario 
join historico_hardware as h on maquina_id = fk_maquina where f.fk_setor = 300 order by cpu_ocupada desc, ram_ocupada desc;
select ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb, h.hardware_historico_id,  h.cpu_ocupada from historico_hardware as h where fk_maquina = 508;
select ROUND(h.ram_ocupada / (1024 * 1024 * 1024), 2) as ram_ocupada_gb, h.cpu_ocupada from historico_hardware as h where hardware_historico_id = 530;

SELECT funcionario_id, nome_funcionario, maquina_id from
funcionario join maquina on fk_funcionario


WHERE email_funcionario  = 'jonathan.carvalho' AND senha_acesso = '123' OR login_acesso = 'jonathan.carvalho' AND senha_acesso = '123';
update historico_hardware set ram_ocupada = '' and cpu_ocupada = '' where fk_maquina = '';

select * from historico_hardware;

update historico_hardware set ram_ocupada = 700000000, cpu_ocupada = 12.49 where fk_maquina = 519;

update historico_hardware set ram_ocupada = 700000000, cpu_ocupada = 12.49 where fk_maquina = 519;