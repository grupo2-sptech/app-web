-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

drop database hardware_security;

create database hardware_security;
use hardware_security;

create table usuario(
usuario_id int primary key auto_increment,
nome_usuario varchar(100),
email varchar(150) unique,
senha varchar(100)
);

insert into usuario values(null, "Jonathan", "jonathanaparecido80@gmail.com", "123");

create table maquina(
maquina_id int primary key auto_increment,
modelo_maquina varchar(100),
modelo_processador varchar(100),
total_ram double,
memoria_total_disco double,
memoria_ocupada double,
status_maquina int,
fk_usuario int
) auto_increment 100;

alter table maquina add
 constraint foreign key(fk_usuario) references usuario(usuario_id);
 
 select * from maquina;

insert into maquina values
(null, "Dell", "Intel core i5", 8259321856, 256052966400, 126138990592,  0, 1);

create table hitorico_hardware(
hardware_historico_id int primary key auto_increment,
cpu_ocupada double,
ram_ocupada double,
fk_maquina int
) auto_increment 1000;

alter table hitorico_hardware add
 constraint foreign key(fk_maquina) references maquina(maquina_id);
 
insert into hitorico_hardware values
(null,7.9,7.7, 100);



/*SELECT usuario_id, nome_usuario, email from usuario WHERE email = 'teste@gmail.com' AND senha = '123';*/


select * from usuario join maquina
      on usuario_id = fk_usuario join hitorico_hardware on maquina_id = fk_maquina
      where usuario_id = 1;

