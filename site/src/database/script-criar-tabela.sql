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

select * from historico_hardware;

create table historico_reinicializacao (
    idhistorico_reinicializacao int unique auto_increment,
    fk_historico int,
    fk_componente int,
    data datetime default current_timestamp,
    primary key (idhistorico_reinicializacao, fk_historico, fk_componente)
) auto_increment = 10;


DELIMITER //

CREATE TRIGGER trigger_reinicializacao_ram
AFTER INSERT ON historico_hardware
FOR EACH ROW
BEGIN
    DECLARE ram_total DECIMAL(10, 2);
    DECLARE ram_porcentagem DECIMAL(10, 2);

    -- Inicialize as variáveis
    SET ram_total = 0;
    SET ram_porcentagem = 0;

    -- Obtenha o tamanho total de RAM para a máquina associada à nova entrada em historico_hardware
    SELECT tamanho_total_gb
    INTO ram_total
    FROM componente
    WHERE fk_maquina = NEW.fk_maquina
      AND tipo_componente = 'Memória Ram';

    -- Verifique se ram_total é válido (não nulo ou zero)
    IF ram_total IS NOT NULL AND ram_total > 0 THEN
        -- Calcule a porcentagem atual de RAM ocupada
        SET ram_porcentagem = (NEW.ram_ocupada / ram_total) * 100;

        -- Verifique se a porcentagem de RAM ocupada ultrapassa 80%
        IF ram_porcentagem > 80 THEN
            -- Insira um novo registro na tabela historico_reinicializacao
            INSERT INTO historico_reinicializacao (data, fk_historico, fk_componente)
            VALUES (NEW.data_hora, NEW.hardware_historico_id, NEW.fk_maquina);
        END IF;
    END IF;
END //

DELIMITER ;


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

create table historico_reinicialização (
    idhistorico_reinicialização int unique auto_increment,
    fk_historico int,
    fk_componente int,
    data datetime default current_timestamp,
    primary key (idhistorico_reinicialização, fk_historico, fk_componente)
) auto_increment = 10;

alter table historico_reinicialização add constraint foreign key (fk_historico) references historico_hardware(hardware_historico_id);
alter table historico_reinicialização add constraint foreign key (fk_componente) references componente(id_componente);

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
    fk_maquina int,
    data_hora datetime default current_timestamp,
    primary key(hardware_historico_id, fk_maquina)
) auto_increment = 900;

alter table historico_hardware add constraint fk_maquina foreign key (fk_maquina) references maquina(maquina_id);
