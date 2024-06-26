-- Inserções para fk_maquina de 500 até 531
	INSERT INTO endereco (estado, cidade, municipio, bairro, logradouro, numero, cep)
	VALUES ('SP', 'São Paulo', 'São Paulo', 'Centro', 'Rua Teste', '123', '01234567');

	insert into empresa values
	(null, "Flesh", "62173620009306", "11999999999", 1);

	insert into setor values
	(null, "TI", 100),
	(null, "Adimistração", 100),
	(null, "Logistica", 100),
	(null, "RH", 100),
	(null, "Finanças", 100);


	-- Inserindo mais dados na tabela processos_janelas
	insert into processos_janelas (titulo_processo) values
		("Facebook"),
		("Instagram"),
		("Twitter"),
		("TikTok"),
		("WhatsApp"),
		("Snapchat"),
		("Pinterest"),
		("LinkedIn"),
		("Twitch"),
		("Spotify"),
		("Apple Music"),
		("Google Play Music"),
		("Amazon Music"),
		("SoundCloud"),
		("Hulu"),
		("Amazon Prime Video"),
		("Disney+"),
		("Tinder"),
		("Badoo"),
		("Discord");
		
		select * from processos_janelas;


	insert into processos_bloqueados_no_setor values
	 (null ,203, 800),
	(null ,203, 801),
	(null ,203, 802),
	(null ,203, 803),
	(null ,203, 804);


	delete from processos_bloqueados_no_setor where fk_processo = 804;


	insert into funcionario values
	(null, "Fernanda", "fernanda@gmail.com", "fernanda.caramico", "123", "Gestor", 203,100, true, false);

	insert into funcionario values

	(null, "Jonathan Carvalho", "jonathanaparecido80@gmail.com", "jonathan.carvalho", "123", "Gerente", 200,100, true, true),
	(null, "Julia Silva", "julia@gmail.com", "julia.silva", "123", "Gestor", 201,100, true, false),
	(null, "Andre Pereira", "andre@gmail.com", "andre.pereira", "123", "Gestor", 202, 100, true, false),
	(null, "teste", "teste@gmail.com", "teste.teste", "123", "Gestor", 203, 100, true, false),
	(null, "João Santos", "joao.santos@gmail.com", "joao.santos", "123", "Gestor", 204, 100, true, false);


	insert into funcionario values
	(null, "Maria Oliveira", "maria.o@gmail.com", "maria.oliveira", "123", "Analista", 203, 100, false, false),
	(null, "Pedro Souza", "pedro.souza@gmail.com", "pedro.souza", "123", "Analista", 200, 100, false, false),
	(null, "Ana Costa", "ana.costa@gmail.com", "ana.costa", "123", "Desenvolvedor", 204, 100, false, false),
	(null, "Carlos Santos", "carlos.santos@gmail.com", "carlos.santos", "123", "Analista", 201, 100, false, false),
	(null, "Fernanda Lima", "fernanda.lima@gmail.com", "fernanda.lima", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Rafaela Oliveira", "rafaela.o@gmail.com", "rafaela.oliveira", "123", "Analista", 203, 100, false, false),
	(null, "Gabriel Almeida", "gabriel.almeida@gmail.com", "gabriel.almeida", "123", "Analista", 204, 100, false, false),
	(null, "Laura Martins", "laura.martins@gmail.com", "laura.martins", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Mariana Costa", "mariana.c@gmail.com", "mariana.costa", "123", "Analista", 201, 100, false, false),
	(null, "Rodrigo Pereira", "rodrigo.pereira@gmail.com", "rodrigo.pereira", "123", "Desenvolvedor", 200, 100, false, false),
	(null, "Camila Ferreira", "camila.f@gmail.com", "camila.ferreira", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Renato Oliveira", "renato.o@gmail.com", "renato.oliveira", "123", "Analista", 203, 100, false, false),
	(null, "Amanda Rodrigues", "amanda.r@gmail.com", "amanda.rodrigues", "123", "Desenvolvedor", 204, 100, false, false),
	(null, "Lucas Silva", "lucas.silva@gmail.com", "lucas.silva", "123", "Desenvolvedor", 200, 100, false, false),
	(null, "Isabela Souza", "isabela.souza@gmail.com", "isabela.souza", "123", "Analista", 201, 100, false, false),
	(null, "Felipe Santos", "felipe.santos@gmail.com", "felipe.santos", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Carolina Lima", "carolina.lima@gmail.com", "carolina.lima", "123", "Analista", 203, 100, false, false),
	(null, "Ricardo Pereira", "ricardo.pereira@gmail.com", "ricardo.pereira", "123", "Analista", 204, 100, false, false),
	(null, "Mariana Ferreira", "mariana.f@gmail.com", "mariana.ferreira", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Tiago Alves", "tiago.alves@gmail.com", "tiago.alves", "123", "Analista", 202, 100, false, false),
	(null, "Beatriz Lima", "beatriz.lima@gmail.com", "beatriz.lima", "123", "Desenvolvedor", 203, 100, false, false),
	(null, "Marcelo Silva", "marcelo.silva@gmail.com", "marcelo.silva", "123", "Analista", 204, 100, false, false),
	(null, "Luana Oliveira", "luana.o@gmail.com", "luana.oliveira", "123", "Analista", 200, 100, false, false),
	(null, "Daniel Pereira", "daniel.pereira@gmail.com", "daniel.pereira", "123", "Desenvolvedor", 202, 100, false, false),
	(null, "Gabriela Santos", "gabriela.santos@gmail.com", "gabriela.santos", "123", "Analista", 203, 100, false, false),
	(null, "Lucas Costa", "lucas.c@gmail.com", "lucas.costa", "123", "Desenvolvedor", 201, 100, false, false),
	(null, "Isabella Rodrigues", "isabella.r@gmail.com", "isabella.rodrigues", "123", "Analista", 200, 100, false, false);

	insert into maquina (modelo_maquina, nome_maquina, fk_setor) values 
	("Dell", "Máquina 01", 203),
	("Sansung", "Máquina 02", 203),
	("Acer", "Máquina 03", 203);

/*insert into maquina () values 
(null, "AAAAAAAA", "Dell", "Máquina 04", 256.00, 'Windows', '64', 203, 100),
(null, "BBBBBBBB", "Dell", "Máquina 05", 256.00, 'Windows', '64', 203, 100),
(null, "CCCCCCCC", "Dell", "Máquina 06", 256.00, 'Windows', '64', 203, 100),
(null, "DDDDDDDD", "Dell", "Máquina 07", 256.00, 'Windows', '64', 203, 100),
(null, "EEEEEEEE", "Dell", "Máquina 08", 256.00, 'Windows', '64', 203, 100);

INSERT INTO componente (modelo, tipo_componente, frequencia, fabricante, fk_maquina) VALUES
('13th Gen Intel(R) Core(TM) i5-1335U', 'Processador', '2496000000', 'GenuineIntel', 701),
('13th Gen Intel(R) Core(TM) i5-1335U', 'Processador', '2496000000', 'GenuineIntel', 702),
('13th Gen Intel(R) Core(TM) i5-1335U', 'Processador', '2496000000', 'GenuineIntel', 703),
('13th Gen Intel(R) Core(TM) i5-1335U', 'Processador', '2496000000', 'GenuineIntel', 704),
('13th Gen Intel(R) Core(TM) i5-1335U', 'Processador', '2496000000', 'GenuineIntel', 705);

insert into historico_hardware (ram_ocupada, fk_maquina) values 
(81,700);


INSERT INTO componente (tamanho_total_gb, tipo_componente, fk_maquina) values
(7.7, 'Memória Ram', 701),
(7.7, 'Memória Ram', 702),
(7.7, 'Memória Ram', 703),
(7.7, 'Memória Ram', 704),
(7.7, 'Memória Ram', 705);

INSERT INTO componente (tipo_componente, modelo, tamanho_total_gb, tamanho_disponivel_gb, fk_maquina) VALUES 
("Disco", "NVMe PC SN740 NVMe WD 256GB (Unidades de disco padrão)", 235.64, 79.9, 701),
("Disco", "NVMe PC SN740 NVMe WD 256GB (Unidades de disco padrão)", 235.64, 79.9, 702),
("Disco", "NVMe PC SN740 NVMe WD 256GB (Unidades de disco padrão)", 235.64, 79.9, 703),
("Disco", "NVMe PC SN740 NVMe WD 256GB (Unidades de disco padrão)", 235.64, 79.9, 704),
("Disco", "NVMe PC SN740 NVMe WD 256GB (Unidades de disco padrão)", 235.64, 79.9, 705);

insert into historico_hardware values 
(null, 1.1, 9.2, 701, now()),
(null, 1.1, 9.2, 702, now()),
(null, 1.1, 9.2, 703, now()),
(null, 1.1, 9.2, 704, now()),
(null, 1.1, 9.2, 705, now());


INSERT INTO historico_hardware (cpu_ocupada, ram_ocupada, fk_maquina, data_hora) VALUES
(18.52, 8.38, 700, '2024-04-26 08:45:15'),
(25.13, 9.09, 700, '2024-04-26 09:12:30'),
(14.74, 6.59, 700, '2024-04-26 09:47:45'),
(20.35, 7.95, 700, '2024-04-26 10:23:00'),
(21.86, 8.64, 700, '2024-04-26 10:57:15'),
(16.55, 7.23, 700, '2024-04-26 11:35:00'),
(19.24, 7.52, 700, '2024-04-26 12:10:30'),
(23.43, 9.35, 700, '2024-04-26 12:45:45'),
(17.62, 8.16, 700, '2024-04-26 13:23:00'),
(26.23, 9.58, 700, '2024-04-26 14:05:15'),
(15.32, 7.37, 700, '2024-04-26 14:40:00'),
(22.05, 8.86, 700, '2024-04-26 15:15:30'),
(24.78, 9.12, 700, '2024-04-26 15:50:45'),
(18.96, 7.64, 700, '2024-04-26 16:25:00'),
(27.55, 9.74, 700, '2024-04-26 17:05:15'),
(16.15, 7.47, 700, '2024-04-26 17:40:00'),
(19.84, 7.81, 700, '2024-04-26 08:00:00'),
(22.33, 8.53, 700, '2024-04-26 08:15:00'),
(16.71, 7.36, 700, '2024-04-26 08:30:00'),
(25.46, 9.13, 700, '2024-04-26 08:45:00'),
(14.57, 6.93, 700, '2024-04-26 09:00:00'),
(20.28, 8.22, 700, '2024-04-26 09:15:00'),
(23.66, 8.73, 700, '2024-04-26 09:30:00'),
(17.95, 7.55, 700, '2024-04-26 09:45:00'),
(28.14, 9.86, 700, '2024-04-26 10:00:00'),
(15.63, 7.27, 700, '2024-04-26 10:15:00'),
(19.16, 7.93, 700, '2024-04-26 10:30:00'),
(23.97, 8.42, 700, '2024-04-26 10:45:00'),
(21.45, 8.33, 700, '2024-04-26 11:00:00'),
(17.32, 7.45, 700, '2024-04-26 11:15:00'),
(16.24, 7.04, 700, '2024-04-26 11:30:00'),
(25.87, 9.27, 700, '2024-04-26 11:45:00'),
(20.78, 8.16, 700, '2024-04-26 12:00:00'),
(23.25, 8.52, 700, '2024-04-26 12:15:00'),
(19.44, 7.74, 700, '2024-04-26 12:30:00'),
(28.38, 9.55, 700, '2024-04-26 12:45:00'),
(15.27, 7.14, 700, '2024-04-26 13:00:00'),
(22.66, 8.41, 700, '2024-04-26 13:15:00'),
(20.95, 7.92, 700, '2024-04-26 13:30:00'),
(17.84, 7.63, 700, '2024-04-26 13:45:00'),
(25.34, 9.04, 700, '2024-04-26 14:00:00');*/

/*insert into processador (nome_processador, fabricante_processador, frequencia_processador, uso_processador) values
("Intel Core i7", "Intel", "3.6 GHz", 40.5),
("AMD Ryzen 9", "AMD", "3.8 GHz", 35.2),
("Intel Core i9", "Intel", "4.0 GHz", 45.8),
("AMD Ryzen 7", "AMD", "3.5 GHz", 37.6),
("Intel Core i5", "Intel", "3.4 GHz", 32.1),
("AMD Ryzen 5", "AMD", "3.2 GHz", 30.9),
("Intel Core i3", "Intel", "3.2 GHz", 25.4),
("AMD Ryzen 3", "AMD", "3.0 GHz", 20.3),
("Intel Core i7", "Intel", "3.6 GHz", 40.5),
("AMD Ryzen 9", "AMD", "3.8 GHz", 35.2),
("Intel Core i9", "Intel", "4.0 GHz", 45.8),
("AMD Ryzen 7", "AMD", "3.5 GHz", 37.6),
("Intel Core i5", "Intel", "3.4 GHz", 32.1),
("AMD Ryzen 5", "AMD", "3.2 GHz", 30.9),
("Intel Core i3", "Intel", "3.2 GHz", 25.4),
("AMD Ryzen 3", "AMD", "3.0 GHz", 20.3),
("Intel Core i7", "Intel", "3.6 GHz", 40.5),
("AMD Ryzen 9", "AMD", "3.8 GHz", 35.2),
("Intel Core i9", "Intel", "4.0 GHz", 45.8),
("AMD Ryzen 7", "AMD", "3.5 GHz", 37.6),
("Intel Core i5", "Intel", "3.4 GHz", 32.1),
("AMD Ryzen 5", "AMD", "3.2 GHz", 30.9),
("Intel Core i3", "Intel", "3.2 GHz", 25.4),
("AMD Ryzen 3", "AMD", "3.0 GHz", 20.3),
("Intel Core i7", "Intel", "3.6 GHz", 40.5),
("AMD Ryzen 9", "AMD", "3.8 GHz", 35.2),
("Intel Core i9", "Intel", "4.0 GHz", 45.8),
("AMD Ryzen 7", "AMD", "3.5 GHz", 37.6),
("Intel Core i5", "Intel", "3.4 GHz", 32.1),
("AMD Ryzen 5", "AMD", "3.2 GHz", 30.9),
("Intel Core i3", "Intel", "3.2 GHz", 25.4),
("AMD Ryzen 3", "AMD", "3.0 GHz", 20.3);

insert into memoria_ram (total_ram_gb, uso_ram_gb) values
(8, 4),
(16, 6),
(8, 3),
(32, 8),
(16, 5),
(8, 2),
(32, 7),
(64, 12),
(8, 4),
(16, 6),
(8, 3),
(32, 8),
(16, 5),
(8, 2),
(32, 7),
(64, 12),
(8, 4),
(16, 6),
(8, 3),
(32, 8),
(16, 5),
(8, 2),
(32, 7),
(64, 12),
(8, 4),
(16, 6),
(8, 3),
(32, 8),
(16, 5),
(8, 2),
(32, 7),
(64, 12);

insert into disco (modelo, tamanho_total, tamanho_disponivel) values
    ("NVMe PC SN740 NVMe WD 512GB", 512, 212),
    ("SSD Kingston A400 240GB", 256, 100),
    ("HDD Seagate Barracuda 2TB", 2000, 1500),
    ("NVMe PC SN740 NVMe WD 256GB", 512, 256),
    ("SSD Samsung 970 EVO Plus 1TB", 1024, 512),
    ("HDD Western Digital Blue 500GB", 500, 300),
    ("NVMe PC SN740 NVMe WD 1TB", 1000, 200),
    ("SSD Crucial MX500 500GB", 512, 300),
    ("HDD Toshiba P300 3TB", 3000, 2000),
    ("NVMe PC SN740 NVMe WD 2TB", 2000, 1200),
    ("SSD SanDisk SSD Plus 120GB", 128, 80),
    ("HDD HGST Ultrastar 4TB", 4000, 3000),
    ("NVMe PC SN740 NVMe WD 4TB", 4000, 3000),
    ("SSD Intel 660p Series 512GB", 512, 300),
    ("HDD Seagate IronWolf NAS 4TB", 4000, 3000),
    ("NVMe PC SN740 NVMe WD 4TB", 4000, 3000),
    ("SSD Western Digital WD Blue SN550 1TB", 1024, 500),
    ("HDD Western Digital Gold 8TB", 8000, 6000),
    ("NVMe PC SN740 NVMe WD 1TB", 1000, 299),
    ("SSD Kingston KC600 256GB", 256, 150),
    ("HDD Seagate SkyHawk Surveillance 1TB", 1000, 800),
    ("NVMe PC SN740 NVMe WD 2TB", 2000, 1200),
    ("SSD Crucial BX500 240GB", 256, 100),
    ("HDD Western Digital Red 1TB", 1000, 900),
    ("NVMe PC SN740 NVMe WD 2TB", 2000, 233),
    ("SSD Samsung 860 EVO 500GB", 512, 300),
    ("HDD Toshiba X300 1TB", 1000, 1000),
    ("NVMe PC SN740 NVMe WD 1TB", 1000, 100),
    ("NVMe PC SN740 NVMe WD 1TB", 1000, 100),
    ("SSD SanDisk Ultra 3D NAND 1TB", 1000, 600),
    ("HDD Seagate BarraCuda Pro 1TB", 1000, 200),
    ("NVMe PC SN740 NVMe WD 2TB", 2000, 262);

select count(*)from disco;
select count(*) from memoria_ram;
select count(*) from processador;
select * from maquina;

-- Inserindo dados nas máquinas com referências aos dados das tabelas processador, memoria_ram e disco
-- Inserindo dados nas máquinas com referências aos dados das tabelas processador, memoria_ram e disco
insert into maquina (modelo_maquina, sistema_operacional, arquitetura, fk_processador, fk_ram, fk_disco, fk_setor, fk_empresa) values
    ("Dell", "Windows 10", "64-bit", 400, 500, 600, 200, 100),
    ("Samsung", "Ubuntu 20.04", "64-bit", 401, 501, 601, 201, 100),
    ("Acer", "Windows 11", "64-bit", 402, 502, 602, 202, 100),
    ("Dell", "Windows 10", "64-bit", 403, 503, 603, 203, 100),
    ("Samsung", "macOS Big Sur", "64-bit", 404, 504, 604, 204, 100),
    ("Acer", "Windows 11", "64-bit", 405, 505, 605, 200, 100),
    ("Dell", "Windows 10", "64-bit", 406, 506, 606, 201, 100),
    ("Samsung", "Ubuntu 20.04", "64-bit", 407, 507, 607, 202, 100),
    ("Acer", "Windows 11", "64-bit", 408, 508, 608, 203, 100),
    ("Dell", "Windows 10", "64-bit", 409, 509, 609, 204, 100),
    ("Samsung", "macOS Monterey", "64-bit", 410, 510, 610, 200, 100),
    ("Acer", "Windows 11", "64-bit", 411, 511, 611, 201, 100),
    ("Dell", "Windows 10", "64-bit", 412, 512, 612, 202, 100),
    ("Samsung", "macOS Catalina", "64-bit", 413, 513, 613, 203, 100),
    ("Acer", "Windows 11", "64-bit", 414, 514, 614, 204, 100),
    ("Dell", "Windows 10", "64-bit", 415, 515, 615, 200, 100),
    ("Samsung", "Ubuntu 20.04", "64-bit", 416, 516, 616, 201, 100),
    ("Acer", "Windows 11", "64-bit", 417, 517, 617, 202, 100),
    ("Dell", "Windows 10", "64-bit", 418, 518, 618, 203, 100),
    ("Samsung", "macOS Big Sur", "64-bit", 419, 519, 619, 204, 100),
    ("Acer", "Windows 11", "64-bit", 420, 520, 620, 200, 100),
    ("Dell", "Windows 10", "64-bit", 421, 521, 621, 201, 100),
    ("Samsung", "macOS Monterey", "64-bit", 422, 522, 622, 202, 100),
    ("Acer", "Windows 11", "64-bit", 423, 523, 623, 203, 100),
    ("Dell", "Windows 10", "64-bit", 424, 524, 624, 204, 100),
    ("Samsung", "Ubuntu 20.04", "64-bit", 425, 525, 625, 200, 100),
    ("Acer", "Windows 11", "64-bit", 426, 526, 626, 201, 100),
    ("Dell", "Windows 10", "64-bit", 427, 527, 627, 202, 100),
    ("Samsung", "macOS Catalina", "64-bit", 428, 528, 628, 203, 100),
    ("Acer", "Windows 11", "64-bit", 429, 529, 629, 204, 100),
    ("Dell", "Windows 10", "64-bit", 430, 530, 630, 200, 100),
    ("Samsung", "Ubuntu 20.04", "64-bit", 431, 531, 631, 201, 100);




insert into historico_hardware(cpu_ocupada, ram_ocupada, fk_maquina, data_hora) values(1.09, 7.31, 700, now());


    INSERT INTO historico_hardware (cpu_ocupada, ram_ocupada, fk_maquina, data_hora)
VALUES
    (35.2, 5984628134, 700, '2024-04-07 08:00:00'),
    (29.8, 6523874198, 700, '2024-04-07 09:00:00'),
    (31.6, 7251093467, 700, '2024-04-07 10:00:00'),
    (28.4, 5162847956, 700, '2024-04-07 11:00:00'),
    (32.1, 7439501825, 700, '2024-04-07 12:00:00'),
    (33.7, 6743128953, 700, '2024-04-07 13:00:00'),
    (27.9, 5112374902, 700, '2024-04-07 14:00:00'),
    (36.5, 7824930685, 700, '2024-04-07 15:00:00'),
    (29.3, 6930152471, 700, '2024-04-07 16:00:00'),
    (34.8, 7378240632, 700, '2024-04-07 17:00:00'),
    (30.9, 7258092415, 700, '2024-04-07 18:00:00'),
    (34.1, 6184628134, 700, '2024-04-07 08:00:00'),
    (30.9, 6823874198, 700, '2024-04-07 08:15:00'),
    (33.0, 7551093467, 700, '2024-04-07 08:30:00'),
    (27.7, 5462847956, 700, '2024-04-07 08:45:00'),
    (32.5, 7739501825, 700, '2024-04-07 09:00:00'),
    (33.5, 7043128953, 700, '2024-04-07 09:15:00'),
    (28.2, 5412374902, 700, '2024-04-07 09:30:00'),
    (37.4, 8124930685, 700, '2024-04-07 09:45:00'),
    (29.1, 7230152471, 700, '2024-04-07 10:00:00'),
    (35.6, 7678240632, 700, '2024-04-07 10:15:00'),
    (32.0, 7558092415, 700, '2024-04-07 10:30:00'),
    (33.8, 7184628134, 700, '2024-04-07 10:45:00'),
    (31.2, 6823874198, 700, '2024-04-07 11:00:00'),
    (30.4, 7551093467, 700, '2024-04-07 11:15:00'),
    (28.9, 5462847956, 700, '2024-04-07 11:30:00'),
    (34.3, 7739501825, 700, '2024-04-07 11:45:00'),
    (33.7, 7043128953, 700, '2024-04-07 12:00:00'),
    (29.5, 5412374902, 700, '2024-04-07 12:15:00'),
    (37.8, 8124930685, 700, '2024-04-07 12:30:00'),
    (29.8, 7230152471, 700, '2024-04-07 12:45:00'),
    (35.2, 7678240632, 700, '2024-04-07 13:00:00'),
    (32.5, 7558092415, 700, '2024-04-07 13:15:00'),
    (31.3, 7184628134, 700, '2024-04-07 13:30:00'),
    (30.0, 6823874198, 700, '2024-04-07 13:45:00'),
    (29.7, 7551093467, 700, '2024-04-07 14:00:00'),
    (34.6, 5462847956, 700, '2024-04-07 14:15:00'),
    (32.8, 7739501825, 700, '2024-04-07 14:30:00'),
    (31.9, 7043128953, 700, '2024-04-07 14:45:00'),
    (28.1, 5412374902, 700, '2024-04-07 15:00:00'),
    (37.0, 8124930685, 700, '2024-04-07 15:15:00'),
    (29.9, 7230152471, 700, '2024-04-07 15:30:00'),
    (35.5, 7678240632, 700, '2024-04-07 15:45:00'),
    (32.2, 7558092415, 700, '2024-04-07 16:00:00'),
    (30.6, 7184628134, 700, '2024-04-07 16:15:00'),
    (28.7, 6823874198, 700, '2024-04-07 16:30:00'),
    (33.3, 7551093467, 700, '2024-04-07 16:45:00'),
    (31.7, 5462847956, 700, '2024-04-07 17:00:00'),
    (29.4, 7739501825, 700, '2024-04-07 17:15:00'),
    (36.2, 7043128953, 700, '2024-04-07 17:30:00'),
    (30.8, 5412374902, 700, '2024-04-07 17:45:00'),
    (37.3, 8124930685, 700, '2024-04-07 18:00:00');
    
select * from maquina;
select * from historico_hardware;

