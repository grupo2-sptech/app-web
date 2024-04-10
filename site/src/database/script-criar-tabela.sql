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

create table empresa (
empresa_id int primary key auto_increment,
nome_empresa varchar(200),
cnpj char(14) unique,
telefone_contato char(11),
fk_endereco int
) auto_increment = 100;

alter table empresa add constraint foreign key(fk_endereco) references endereco(endereco_id);

create table setor(
setor_id int primary key auto_increment,
nome_setor varchar (100),
fk_empresa int
) auto_increment = 300;

alter table setor add constraint foreign key(fk_empresa) references empresa(empresa_id);

create table funcionario(
funcionario_id int primary key auto_increment,
nome_funcionario varchar(100),
email_funcionario varchar(200),
login_acesso varchar(100),
senha_acesso varchar(100),
cargo_funcionario varchar(100),
fk_setor int,
fk_empresa_func int,
acesso_plataforma boolean,
permissao_total boolean
 ) auto_increment = 200;

alter table funcionario add constraint foreign key (fk_setor) references setor(setor_id);
alter table funcionario add constraint foreign key (fk_empresa_func) references empresa(empresa_id);

create table maquina(
maquina_id int primary key auto_increment,
modelo_maquina varchar(100),
sistema_operacional varchar(100),
arquitetura_sistema_operacional varchar(100),
modelo_processador varchar(100),
fabricante_processador varchar(100),
modelo_disco varchar(100),
total_ram long,
memoria_total_disco long,
memoria_ocupada long,
status_maquina int,
fk_funcionario int,
-- fk_setor int,
 fk_empresa int
) auto_increment = 500;

-- alter table maquina add constraint foreign key (fk_setor) references setor(setor_id);

alter table maquina add constraint foreign key(fk_funcionario) references funcionario(funcionario_id);
alter table maquina add constraint foreign key(fk_empresa) references empresa(empresa_id);

create table processos_bloqueados(
processo_id int primary key auto_increment,
nome_imagem_processo varchar (100)
)auto_increment = 600;

create table processos_bloqueados_nas_maquinas(
id_processos_bloqueados_maquinas int auto_increment,
fk_maquina int,
fk_processo int,
primary key(id_processos_bloqueados_maquinas, fk_processo, fk_maquina)
) auto_increment = 700;

alter table processos_bloqueados_nas_maquinas add constraint foreign key (fk_processo) references processos_bloqueados(processo_id);
alter table processos_bloqueados_nas_maquinas add constraint foreign key (fk_maquina) references maquina(maquina_id);

create table historico_hardware(
hardware_historico_id int auto_increment,
cpu_ocupada double,
ram_ocupada double,
fk_maquina int,
data_hora datetime default current_timestamp,
primary key(hardware_historico_id, fk_maquina)
) auto_increment = 800;

alter table historico_hardware add constraint fk_maquina foreign key (fk_maquina) references maquina(maquina_id);

create table todos_registros_hardware(
hardware_historico_id int auto_increment,
cpu_ocupada_tempo_real double,
ram_ocupada_tempo_real double,
fk_maquina int,
data_hora datetime default current_timestamp,
primary key(hardware_historico_id, fk_maquina)
) auto_increment 1000;

alter table todos_registros_hardware add constraint foreign key(fk_maquina) references maquina(maquina_id);


      