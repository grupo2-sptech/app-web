SELECT s.*, f.email_funcionario as email, f.nome_funcionario as nome, f.funcionario_id as id, f.acesso_plataforma as permissao, f.permissao_total as permissao_total 
FROM setor AS s JOIN funcionario AS f ON s.setor_id = f.fk_setor where funcionario_id = 303;

SELECT m.*, p.hora_data_processador
FROM maquina AS m join processador p on p.id_processador = m.fk_processador 
JOIN setor AS s ON s.setor_id = m.fk_setor
WHERE m.fk_setor = 200;

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
