drop database hardware_security;
create database hardware_security;
use hardware_security;

-- Tabela: endereco
create table endereco (
    endereco_id int primary key auto_increment,
    estado char(2),
    cidade varchar(100),
    municipio varchar (100),
    bairro varchar(100),
    logradouro varchar(100),
    numero varchar(45),
    complemento varchar (45),
    cep char(8)
);

-- Tabela: empresa
create table empresa (
    empresa_id int primary key auto_increment,
    nome_empresa varchar(200),
    cnpj char(14) unique,
    telefone_contato char(11),
    fk_endereco int,
    unique(fk_endereco)
) auto_increment = 100;

alter table empresa add constraint foreign key(fk_endereco) references endereco(endereco_id);

-- Tabela: setor
create table setor (
    setor_id int primary key auto_increment,
    nome_setor varchar (100),
    fk_empresa int
) auto_increment = 200;

alter table setor add constraint foreign key(fk_empresa) references empresa(empresa_id);

-- Tabela: funcionario
create table funcionario (
    funcionario_id int primary key auto_increment,
    nome_funcionario varchar(100),
    email_funcionario varchar(200),
    login_acesso varchar(100),
    senha_acesso varchar(100),
    cargo_funcionario varchar(100),
    fk_setor int,
    fk_empresa int,
    acesso_plataforma boolean,
    permissao_total boolean
) auto_increment = 300;

alter table funcionario add constraint foreign key (fk_setor) references setor(setor_id);
alter table funcionario add constraint foreign key (fk_empresa) references empresa(empresa_id);

-- Tabela: maquina
create table maquina (
    maquina_id int primary key auto_increment,
    processador_id varchar(20),
    modelo_maquina varchar(100),
    nome_maquina varchar(100),
    memoria_total_maquina long,
    sistema_operacional varchar(100),
    arquitetura int,
    fk_setor int,
    fk_empresa int
) auto_increment = 700;

alter table maquina add constraint foreign key (fk_setor) references setor(setor_id);
alter table maquina add constraint foreign key(fk_empresa) references empresa(empresa_id);

create table componente(
id_componente int primary key auto_increment,
tipo_componente varchar (100),
tamanho_total_gb double,
tamanho_disponivel_gb double,
modelo varchar (100),
frequencia varchar(30),
fabricante varchar (100),
fk_maquina int
)auto_increment = 400;

alter table componente add constraint foreign key (fk_maquina) references maquina(maquina_id);

-- Tabela: uso_maquina
create table uso_maquina (
    fk_funcionario int,
    fk_maquina int,
    hora_data_entrada datetime default current_timestamp,
    hora_data_saida datetime,
    primary key (fk_funcionario, fk_maquina)
);

alter table uso_maquina add constraint foreign key (fk_funcionario) references funcionario(funcionario_id);
alter table uso_maquina add constraint foreign key (fk_maquina) references maquina(maquina_id);

-- Tabela: processos_janelas
create table processos_janelas (
    processo_id int primary key auto_increment,
    titulo_processo varchar (100)
) auto_increment = 800;

-- Tabela: processos_bloqueados_no_setor
create table processos_bloqueados_no_setor (
    id_processos int auto_increment,
    fk_setor int,
    fk_processo int,
    primary key(fk_processo, fk_setor),
    unique(id_processos)
) auto_increment = 1000;

alter table processos_bloqueados_no_setor add constraint foreign key (fk_processo) references processos_janelas(processo_id);
alter table processos_bloqueados_no_setor add constraint foreign key (fk_setor) references setor(setor_id);

-- Tabela: historico_hardware
create table historico_hardware (
    hardware_historico_id int auto_increment,
    cpu_ocupada double,
    ram_ocupada double,
    uso_disco long,
    fk_componente int,
    data_hora datetime default current_timestamp,
    primary key(hardware_historico_id, fk_componente)
) auto_increment = 900;

alter table historico_hardware add constraint fk_componente foreign key (fk_componente) references componente(id_componente);