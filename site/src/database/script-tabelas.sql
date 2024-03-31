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
fk_endereco int
) auto_increment = 100;

alter table empresa add constraint foreign key(fk_endereco) references endereco(endereco_id);

insert into empresa values
(null, "Flesh", "62173620009306", "11999999999", 1);

select * from empresa;


create table setor(
setor_id int primary key auto_increment,
nome_setor varchar (100),
fk_empresa int
) auto_increment = 300;

insert into setor values
(null, "TI", 100),
(null, "Adimistração", 100),
(null, "Logistica", 100),
(null, "RH", 100),
(null, "Finanças", 100);

select * from setor;

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

 insert into funcionario values
(null, "Jonathan Carvalho", "jonathanaparecido80@gmail.com", "jonathan.carvalho", "123", "Gerente", 300,100, true, true),
(null, "Julia Silva", "julia@gmail.com", "julia.silva", "123", "Gestor", 301,100, true, false),
(null, "Andre Pereira", "andre@gmail.com", "andre.pereira", "123", "Gestor", 302, 100, true, false),
(null, "teste", "teste@gmail.com", "teste.teste", "123", "Gestor", 303, 100, true, false),
(null, "João Santos", "joao.santos@gmail.com", "joao.santos", "123", "Gestor", 304, 100, true, false);


insert into funcionario values
(null, "Maria Oliveira", "maria.o@gmail.com", "maria.oliveira", "123", "Analista", 303, 100, false, false),
(null, "Pedro Souza", "pedro.souza@gmail.com", "pedro.souza", "123", "Analista", 300, 100, false, false),
(null, "Ana Costa", "ana.costa@gmail.com", "ana.costa", "123", "Desenvolvedor", 304, 100, false, false),
(null, "Carlos Santos", "carlos.santos@gmail.com", "carlos.santos", "123", "Analista", 301, 100, false, false),
(null, "Fernanda Lima", "fernanda.lima@gmail.com", "fernanda.lima", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Rafaela Oliveira", "rafaela.o@gmail.com", "rafaela.oliveira", "123", "Analista", 303, 100, false, false),
(null, "Gabriel Almeida", "gabriel.almeida@gmail.com", "gabriel.almeida", "123", "Analista", 304, 100, false, false),
(null, "Laura Martins", "laura.martins@gmail.com", "laura.martins", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Mariana Costa", "mariana.c@gmail.com", "mariana.costa", "123", "Analista", 301, 100, false, false),
(null, "Rodrigo Pereira", "rodrigo.pereira@gmail.com", "rodrigo.pereira", "123", "Desenvolvedor", 300, 100, false, false),
(null, "Camila Ferreira", "camila.f@gmail.com", "camila.ferreira", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Renato Oliveira", "renato.o@gmail.com", "renato.oliveira", "123", "Analista", 303, 100, false, false),
(null, "Amanda Rodrigues", "amanda.r@gmail.com", "amanda.rodrigues", "123", "Desenvolvedor", 304, 100, false, false),
(null, "Lucas Silva", "lucas.silva@gmail.com", "lucas.silva", "123", "Desenvolvedor", 300, 100, false, false),
(null, "Isabela Souza", "isabela.souza@gmail.com", "isabela.souza", "123", "Analista", 301, 100, false, false),
(null, "Felipe Santos", "felipe.santos@gmail.com", "felipe.santos", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Carolina Lima", "carolina.lima@gmail.com", "carolina.lima", "123", "Analista", 303, 100, false, false),
(null, "Ricardo Pereira", "ricardo.pereira@gmail.com", "ricardo.pereira", "123", "Analista", 304, 100, false, false),
(null, "Mariana Ferreira", "mariana.f@gmail.com", "mariana.ferreira", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Tiago Alves", "tiago.alves@gmail.com", "tiago.alves", "123", "Analista", 302, 100, false, false),
(null, "Beatriz Lima", "beatriz.lima@gmail.com", "beatriz.lima", "123", "Desenvolvedor", 303, 100, false, false),
(null, "Marcelo Silva", "marcelo.silva@gmail.com", "marcelo.silva", "123", "Analista", 304, 100, false, false),
(null, "Luana Oliveira", "luana.o@gmail.com", "luana.oliveira", "123", "Analista", 300, 100, false, false),
(null, "Daniel Pereira", "daniel.pereira@gmail.com", "daniel.pereira", "123", "Desenvolvedor", 302, 100, false, false),
(null, "Gabriela Santos", "gabriela.santos@gmail.com", "gabriela.santos", "123", "Analista", 303, 100, false, false),
(null, "Lucas Costa", "lucas.c@gmail.com", "lucas.costa", "123", "Desenvolvedor", 301, 100, false, false),
(null, "Isabella Rodrigues", "isabella.r@gmail.com", "isabella.rodrigues", "123", "Analista", 300, 100, false, false);

 alter table funcionario add constraint foreign key (fk_setor) references setor(setor_id);
 alter table funcionario add constraint foreign key (fk_empresa_func) references empresa(empresa_id);

create table maquina(
maquina_id int primary key auto_increment,
modelo_maquina varchar(100),
modelo_processador varchar(100),
total_ram double,
memoria_total_disco double,
memoria_ocupada double,
status_maquina int,
fk_funcionario int,
-- fk_setor int,
 fk_empresa int
) auto_increment = 500;

-- alter table maquina add constraint foreign key (fk_setor) references setor(setor_id);

alter table maquina add constraint foreign key(fk_funcionario) references funcionario(funcionario_id);
 alter table maquina add constraint foreign key(fk_empresa) references empresa(empresa_id);


/*insert into maquina values
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 200, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 201, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 202, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 203, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 204, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 205, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 206, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 207, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 208, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 209, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 210, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 211, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 212, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 213, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 214, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 215, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 216, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 217, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 218, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 219, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 220, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 221, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 222, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 223, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 224, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 225, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 226, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 227, 300, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 228, 300, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 229, 300, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 230, 300, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 231, 300, 100);*/


insert into maquina values
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 200, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 201, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 202, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 203, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 204, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 205, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 206, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 207, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 208, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 209, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 210, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 211, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 212, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 213, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 214, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 215, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 216, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 217, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 218, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 219, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 220, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 221, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 222, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 223, 100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 224, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 225,  100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 226,  100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 227,  100),
(null, "Samsung", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 228, 100),
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 229, 100),
(null, "HP", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 230, 100),
(null, "Lenovo", "Intel core i5", 8259321856, 256052966400, 126138990592, 0, 231, 100);


select * from maquina;
select * from funcionario;

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


insert into processos_bloqueados_nas_maquinas values
(null, 500, 600),
(null, 500, 601),
(null, 500, 602);

create table historico_hardware(
hardware_historico_id int primary key auto_increment,
cpu_ocupada double,
ram_ocupada double,
fk_maquina int
) auto_increment = 800;

alter table historico_hardware add constraint foreign key(fk_maquina) references maquina(maquina_id);

insert into historico_hardware values
(null,7.9,7.7, 500);

create table historico_hardware_tempo_real(
hardware_historico_id int primary key auto_increment,
cpu_ocupada_tempo_real double,
media_ram_ocupada_tempo_real double,
fk_maquina int
) auto_increment 1000;

alter table historico_hardware_tempo_real add constraint foreign key(fk_maquina) references maquina(maquina_id);

insert into historico_hardware_tempo_real values
(null,7.9,7.7, 500);


SELECT m.modelo_maquina, m.total_ram, m.memoria_total_disco, f.*, s.nome_setor
    FROM maquina AS m
    JOIN funcionario AS f ON f.funcionario_id join setor s on setor_id = fk_setor = m.fk_Funcionario where f.fk_setor = 300;
