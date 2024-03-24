-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database hardware_security;

-- drop database hardware;

use hardware_security;

create table usuario(
usuario_id int primary key auto_increment,
nome_usuario varchar(100),
email varchar(150) unique,
senha varchar(100)
);

insert into usuario values(null, "Jonathan", "teste@gmail.com", "123");

create table hardware(
hardware_id int primary key,
cpu_ocupada double,
ram_ocupada double,
memoria_total_disco double,
memoria_ocupada double,
modelo_processador varchar(100)
);

alter table hardware add column modell varchar(50);
alter table hardware add
 constraint foreign key(fk_usuario) references usuario(usuario_id);

SELECT usuario_id, nome_usuario, email from usuario WHERE email = 'teste@gmail.com' AND senha = '123';

 select * from usuario;

select * from usuario join hardware
      on usuario_id = fk_usuario
      where usuario_id = 1;

insert into hardware values
(0,  11.3, 6.8, 200000, 150000, "xxxxxxxxxxxxxxxxxx");

update hardware set fk_usuario = 1 where hardware_id = 0;

