drop database hardware_security;
create database hardware_security;
use hardware_security;

create table UF (
    id_uf int primary key,
    nome varchar(20),
    sigla char(2)
);

create table endereco (
    id_endereco int primary key auto_increment,
    fk_uf int,
    municipio varchar(100),
    bairro varchar(100),
    logradouro varchar(100),
    numero varchar(45),
    complemento varchar(45),
    cep char(8),
    constraint fk_endereco_uf foreign key (fk_uf) references UF(id_uf)
);

-- Tabela: empresa
create table empresa (
    id_empresa int primary key auto_increment,
    nome_empresa varchar(200),
    cnpj char(14) unique,
    email varchar(100),
    fk_endereco int,
    constraint fk_empresa_endereco foreign key (fk_endereco) references endereco(id_endereco)
) auto_increment = 100;

-- Tabela: setor
create table setor (
    id_setor int primary key auto_increment,
    nome_setor varchar(100),
    fk_empresa int,
    constraint fk_setor_empresa foreign key (fk_empresa) references empresa(id_empresa)
) auto_increment = 200;

-- Tabela: funcionario
create table funcionario (
    id_funcionario int primary key auto_increment,
    nome_funcionario varchar(100),
    email_funcionario varchar(200),
    login_acesso varchar(100),
    senha_acesso varchar(100),
    cargo_funcionario varchar(100),
    fk_setor int,
    fk_empresa int,
    acesso_plataforma boolean,
    permissao_total char(1),
    constraint fk_funcionario_setor foreign key (fk_setor) references setor(id_setor),
    constraint fk_funcionario_empresa foreign key (fk_empresa) references empresa(id_empresa)
) auto_increment = 300;

-- Tabela: maquina
create table maquina (
    id_maquina int primary key auto_increment,
    processador_id varchar(20),
    modelo_maquina varchar(100),
    nome_maquina varchar(100),
    sistema_operacional varchar(100),
    arquitetura varchar(10),
    fk_setor int,
    fk_empresa int,
    constraint fk_maquina_setor foreign key (fk_setor) references setor(id_setor),
    constraint fk_maquina_empresa foreign key (fk_empresa) references empresa(id_empresa)
) auto_increment = 700;

create table componente (
    id_componente int primary key auto_increment,
    tipo_componente varchar(100),
    tamanho_total_gb double,
    tamanho_disponivel_gb double,
    modelo varchar(100),
    frequencia varchar(30),
    fabricante varchar(100),
    fk_maquina int,
    constraint fk_componente_maquina foreign key (fk_maquina) references maquina(id_maquina)
) auto_increment = 400;

-- Tabela: uso_maquina
create table uso_maquina (
    fk_funcionario int,
    fk_maquina int,
    hora_data_entrada datetime default current_timestamp,
    hora_data_saida datetime,
    primary key (fk_funcionario, fk_maquina),
    constraint fk_uso_maquina_funcionario foreign key (fk_funcionario) references funcionario(id_funcionario),
    constraint fk_uso_maquina_maquina foreign key (fk_maquina) references maquina(id_maquina)
);

create table categoria (
id_categoria int primary key auto_increment,
nome varchar(45)
);

-- Tabela: processos_janelas
create table processos_janelas (
    id_processo int primary key auto_increment,
    titulo_processo varchar(100),
    fk_categoria int,
    constraint fk_categoria foreign key (fk_categoria) references categoria (id_categoria)
) auto_increment = 800;


create table setor_tem_categoria (
	id_card int auto_increment,
    fk_setor int,
    fk_empresa int,
    fk_categoria int,
    ativo boolean,
    primary key (id_card,fk_setor, fk_empresa, fk_categoria),
    constraint fk_setor_tem_categoria_setor foreign key (fk_setor) references setor(id_setor),
    constraint fk_setor_tem_categoria_empresa foreign key (fk_empresa) references empresa(id_empresa),
    constraint fk_setor_tem_categoria_categoria foreign key (fk_categoria) references categoria(id_categoria)
);

create table card_tem_processo (
    fk_setor_card int,
    fk_empresa_card int,
    fk_processo_card int,
    fk_categoria_card int,
    fk_card int,
    ativo boolean,
    primary key (fk_card,fk_setor_card, fk_empresa_card, fk_processo_card, fk_categoria_card),
    constraint fk_card foreign key (fk_card) references setor_tem_categoria(id_card),
    constraint fk_card_setor foreign key (fk_setor_card) references setor(id_setor),
    constraint fk_card_empresa foreign key (fk_empresa_card) references empresa(id_empresa),
    constraint fk_card_processo foreign key (fk_processo_card) references processos_janelas(id_processo),
    constraint fk_card_categoria foreign key (fk_categoria_card) references categoria(id_categoria)
);


-- Tabela: historico_hardware
create table historico_hardware (
    id_hardware_historico int auto_increment,
    cpu_ocupada double,
    ram_ocupada double,
    fk_componente int,
    data_hora datetime default current_timestamp,
    primary key(id_hardware_historico, fk_componente),
    constraint fk_historico_hardware_maquina foreign key (fk_componente) references componente(id_componente)
) auto_increment = 900;

create table acesso_usuario (
    id_acesso int primary key auto_increment,
    fk_funcionario int,
    data_entrada datetime,
    data_saida datetime,
    constraint fk_acesso_usuario foreign key (fk_funcionario) references funcionario(id_funcionario)
) auto_increment = 1000;

create table historico_bloqueios (
    id_historico_bloqueio int primary key auto_increment,
    fk_setor_hardware int,
    fk_processo_historico int,
    fk_empresa_historico int,
    fk_categoria_historico int,
    date datetime default current_timestamp,
    constraint fk_historico_bloqueios_setor foreign key (fk_setor_hardware) references setor(id_setor),
    constraint fk_historico_bloqueios_processo foreign key (fk_processo_historico) references processos_janelas(id_processo),
    constraint fk_historico_bloqueios_empresa foreign key (fk_empresa_historico) references empresa(id_empresa),
    constraint fk_historico_bloqueios_categoria foreign key (fk_categoria_historico) references categoria(id_categoria)
);

create table rede (
id_rede int primary key auto_increment,
hostname varchar(45),
pacotes_enviados mediumtext,
pacotes_recebidos mediumtext);

create table ipv4 (
id_ipv4 int primary key auto_increment,
fk_rede int,
ip varchar(45),
constraint fk_rede foreign key (fk_rede) references rede(id_rede));

create table historico_reinicializacao (
    id_historico_reinicializacao int primary key auto_increment,
    fk_historico int,
    fk_componente int,
    date datetime default current_timestamp,
    constraint fk_historico_reinicializacao foreign key (fk_historico) references historico_hardware (id_hardware_historico),
    constraint fk_componente_reinicializacao foreign key (fk_componente) references componente (id_componente)
);


