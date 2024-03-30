-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

drop database hardware_security;

create database hardware_security;
use hardware_security;

-- SELECT usuario_id, nome_usuario, email from usuario WHERE email = 'jonathanaparecido80@gmail.com' AND senha = '92315503';
 
create table endereco (
endereco_id int primary key auto_increment,
estado char(2),
cidade varchar(100),
municipio varchar (100),
bairro varchar(100),
rua varchar(100),
numero varchar(45),
cep char(15));

INSERT INTO endereco (estado, cidade, municipio, bairro, rua, numero, cep)
VALUES ('SP', 'São Paulo', 'São Paulo', 'Centro', 'Rua Teste', '123', '01234-567');


create table empresa (
empresa_id int primary key auto_increment,
nome_empresa varchar(200),
cnpj char(14) unique,
telefone_contato char(11),
fk_endereco int) auto_increment = 100;

alter table empresa add constraint foreign key(fk_endereco) references endereco(endereco_id);

insert into empresa values
(null, "Flesh", "62173620009306", "11999999999", 1);
 
/*reate table usuario(
usuario_id int primary key auto_increment,
nome_usuario varchar(100),
email varchar(150) unique,
senha varchar(100),
fk_empresa int
) auto_increment = 200;

alter table usuario add constraint foreign key(fk_empresa) references empresa(empresa_id);


insert into usuario values
(null, "Jonathan", "jonathanaparecido80@gmail.com", "123", 100); */


 
create table setor(
setor_id int primary key auto_increment,
nome_setor varchar (100),
fk_empresa int
) auto_increment = 300;

insert into setor values 
(null, "TI", 100),
(null, "Adimistrativo", 100);

alter table setor add constraint foreign key(fk_empresa) references empresa(empresa_id);

create table funcionario(
funcionario_id int primary key auto_increment,
nome_funcionario varchar(100),
email_funcionario varchar(200),
login_acesso varchar(100),
senha_acesso varchar(100),
cargo_funcionario varchar(100),
fk_setor int,
acesso_plataforma boolean,
permissao_total boolean
 ) auto_increment = 200;

insert into funcionario values
(null, "Jonathan Carvalho", "jonathanaparecido80@gmail.com", "jonathan.carvalho", "123", "Gerente", 300, true, true),
(null, "Julia Silva", "julia@gmail.com", "julia.silva", "123", "Analista", 301, true, false),
(null, "Andre Pereira", "andre@gmail.com", "andre.pereira", "123", "Gerente", 300, true, false),
(null, "teste", "teste@gmail.com", "teste.teste", "123", "Analista", 301, false, false);

 alter table funcionario add constraint foreign key (fk_setor) references setor(setor_id);
 
create table maquina(
maquina_id int primary key auto_increment,
modelo_maquina varchar(100),
modelo_processador varchar(100),
total_ram double,
memoria_total_disco double,
memoria_ocupada double,
status_maquina int,
fk_funcionario int,
fk_setor int
) auto_increment = 500;

alter table maquina add constraint foreign key (fk_setor) references setor(setor_id);

alter table maquina add constraint foreign key(fk_funcionario) references funcionario(funcionario_id);
 
-- select * from maquina;

insert into maquina values
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592,  0, 200, 300);

create table processos_bloqueados(
processo_id int primary key auto_increment,
nome_imagem_processo varchar (100)
)auto_increment = 600;

insert into processos_bloqueados values
(null, "Discord"),
(null, "You Tube"),
(null, "Net Flix");

create table processos_bloqueados_nas_maquinas(
id_processos_bloqueados_maquinas int auto_increment,
fk_maquina int,
fk_processo int,
primary key(id_processos_bloqueados_maquinas, fk_processo, fk_maquina)
) auto_increment = 700;

alter table processos_bloqueados_nas_maquinas add constraint foreign key (fk_processo) references processos_bloqueados(processo_id);
alter table processos_bloqueados_nas_maquinas add constraint foreign key (fk_maquina) references maquina(maquina_id);

-- select * from maquina;

insert into processos_bloqueados_nas_maquinas values 
(null, 500, 600),
(null, 500, 601),
(null, 500, 602);

create table hitorico_hardware(
hardware_historico_id int primary key auto_increment,
cpu_ocupada double,
ram_ocupada double,
fk_maquina int
) auto_increment = 800;

alter table hitorico_hardware add constraint foreign key(fk_maquina) references maquina(maquina_id);

insert into hitorico_hardware values
(null,7.9,7.7, 500);

create table hitorico_hardware_tempo_real(
hardware_historico_id int primary key auto_increment,
cpu_ocupada_tempo_real double,
media_ram_ocupada_tempo_real double,
fk_maquina int
) auto_increment 1000;
 
alter table hitorico_hardware_tempo_real add constraint foreign key(fk_maquina) references maquina(maquina_id);

insert into hitorico_hardware_tempo_real values
(null,7.9,7.7, 500);


-- select * from usuario;
SELECT funcionario_id, nome_funcionario, email_funcionario, acesso_plataforma, permissao_total, setor.setor_id from funcionario join setor on fk_setor = setor_id WHERE email_funcionario  = 'jonathanaparecido80@gmail.com' AND senha_acesso = '123' OR login_acesso = '' AND senha_acesso = '123';

select maquina.*, hitorico_hardware.* from funcionario join maquina on funcionario_id = fk_funcionario join hitorico_hardware on maquina_id = fk_maquina where fk_funcionario = 200;

select f.nome_funcionario, f.funcionario_id, f.cargo_funcionario, s.nome_setor from funcionario f join setor s on fk_setor = setor_id where s.setor_id = 301;


/*select f.nome_funcionario, f.funcionario_id, f.cargo_funcionario, f.permissao_total, e.*, maquina.*, hitorico_hardware.*,  endereco.*, s.* 
from funcionario as f left join setor as s on s.fk_empresa = s.setor_id
join empresa as e on e.empresa_id = s.fk_empresa
left join maquina on fk_setor = setor_id 
left join hitorico_hardware on maquina_id = fk_maquina 
left join endereco on fk_endereco = endereco_id 
	where funcionario_id = 200;*/
    
    select * from funcionario;
    select * from setor;
      
select * from maquina join setor on setor_id = fk_setor;
-- select * from usuario;
-- select setor.nome_setor from setor join empresa on empresa_id = fk_empresa join usuario on ;
select * from setor;




