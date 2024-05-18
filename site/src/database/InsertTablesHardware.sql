INSERT INTO UF (id_uf, nome, sigla) VALUES
(1, 'Acre', 'AC'),
(2, 'Alagoas', 'AL'),
(3, 'Amapá', 'AP'),
(4, 'Amazonas', 'AM'),
(5, 'Bahia', 'BA'),
(6, 'Ceará', 'CE'),
(7, 'Distrito Federal', 'DF'),
(8, 'Espírito Santo', 'ES'),
(9, 'Goiás', 'GO'),
(10, 'Maranhão', 'MA'),
(11, 'Mato Grosso', 'MT'),
(12, 'Mato Grosso do Sul', 'MS'),
(13, 'Minas Gerais', 'MG'),
(14, 'Pará', 'PA'),
(15, 'Paraíba', 'PB'),
(16, 'Paraná', 'PR'),
(17, 'Pernambuco', 'PE'),
(18, 'Piauí', 'PI'),
(19, 'Rio de Janeiro', 'RJ'),
(20, 'Rio Grande do Norte', 'RN'),
(21, 'Rio Grande do Sul', 'RS'),
(22, 'Rondônia', 'RO'),
(23, 'Roraima', 'RR'),
(24, 'Santa Catarina', 'SC'),
(25, 'São Paulo', 'SP'),
(26, 'Sergipe', 'SE'),
(27, 'Tocantins', 'TO');


INSERT INTO endereco (fk_uf, municipio, bairro, logradouro, numero, complemento, cep) VALUES
(1, 'Rio Branco', 'Centro', 'Rua Principal', '123', 'Apto 1', '69900000'),
(2, 'Maceió', 'Pajuçara', 'Avenida Atlântica', '456', 'Bloco B', '57000000'),
(3, 'Macapá', 'Trem', 'Rua da Praia', '789', 'Casa 2', '68900000'),
(4, 'Manaus', 'Adrianópolis', 'Avenida Brasil', '101', 'Sala 101', '69000000'),
(5, 'Salvador', 'Pelourinho', 'Largo do Pelourinho', '202', 'Cobertura', '40000000'),
(6, 'Fortaleza', 'Meireles', 'Rua das Flores', '303', 'Loja A', '60000000'),
(7, 'Brasília', 'Asa Norte', 'Setor Comercial', '404', 'Sala 404', '70000000'),
(8, 'Vitória', 'Praia do Canto', 'Avenida Dante Michelini', '505', 'Apartamento 5', '29000000'),
(9, 'Goiânia', 'Setor Bueno', 'Rua T-63', '606', 'Cobertura 6', '74000000'),
(10, 'São Luís', 'Renascença', 'Rua das Acácias', '707', 'Bloco C', '65000000');


INSERT INTO empresa (nome_empresa, cnpj, email, fk_endereco) VALUES
('Tech Innovators', '00000000000101', 'contato@techinnovators.com', 1),
('Green Solutions', '00000000000202', 'contato@greensolutions.com', 2),
('Blue Ocean Corp', '00000000000303', 'contato@blueocean.com', 3),
('Alpha Dynamics', '00000000000404', 'contato@alphadynamics.com', 4),
('Quantum Leap', '00000000000505', 'contato@quantumleap.com', 5),
('Bright Future Ltd', '00000000000606', 'contato@brightfuture.com', 6),
('Innovative Minds', '00000000000707', 'contato@innovativeminds.com', 7),
('Pioneer Tech', '00000000000808', 'contato@pioneertechnologies.com', 8),
('Future Horizons', '00000000000909', 'contato@futurehorizons.com', 9),
('Visionary Solutions', '00000000001010', 'contato@visionarysolutions.com', 10);



INSERT INTO setor (nome_setor, fk_empresa)
SELECT nome_setor, id_empresa
FROM (
    SELECT 'Recursos Humanos' AS nome_setor, id_empresa FROM empresa UNION ALL
    SELECT 'Financeiro', id_empresa FROM empresa UNION ALL
    SELECT 'Tecnologia da Informação', id_empresa FROM empresa UNION ALL
    SELECT 'Vendas', id_empresa FROM empresa UNION ALL
    SELECT 'Marketing', id_empresa FROM empresa UNION ALL
    SELECT 'Produção', id_empresa FROM empresa UNION ALL
    SELECT 'Logística', id_empresa FROM empresa UNION ALL
    SELECT 'Atendimento ao Cliente', id_empresa FROM empresa UNION ALL
    SELECT 'Desenvolvimento de Produto', id_empresa FROM empresa UNION ALL
    SELECT 'Qualidade', id_empresa FROM empresa
) AS setores_empresas;



Insert into categoria (nome) values
("Redes Sociais"), ("Plataforma de Comunicação"),("Plataforma de Streaming"),("Plataforma de Noticias"), ("Jogos");

INSERT INTO processos_janelas (titulo_processo, fk_categoria) VALUES
('Facebook', 1),              -- Redes Sociais
('Instagram', 1),             -- Redes Sociais
('Twitter', 1),               -- Redes Sociais
('LinkedIn', 1),              -- Redes Sociais
('WhatsApp', 2),              -- Plataforma de Comunicação
('Slack', 2),                 -- Plataforma de Comunicação
('Zoom', 2),                  -- Plataforma de Comunicação
('Skype', 2),                 -- Plataforma de Comunicação
('Netflix', 3),               -- Plataforma de Streaming
('YouTube', 3),               -- Plataforma de Streaming
('Twitch', 3),                -- Plataforma de Streaming
('Spotify', 3),               -- Plataforma de Streaming
('Globo', 4),                 -- Plataforma de Noticias
('CNN', 4),                   -- Plataforma de Noticias
('BBC', 4),                   -- Plataforma de Noticias
('Folha de São Paulo', 4),    -- Plataforma de Noticias
('League of Legends', 5),     -- Jogos
('Fortnite', 5),              -- Jogos
('Among Us', 5);              -- Jogos

INSERT INTO processos_janelas (titulo_processo, fk_categoria) VALUES
('Reddit', 1),                      -- Redes Sociais
('Snapchat', 1),                    -- Redes Sociais
('Pinterest', 1),                   -- Redes Sociais
('Discord', 2),                     -- Plataforma de Comunicação
('Microsoft Teams', 2),             -- Plataforma de Comunicação
('Google Meet', 2),                 -- Plataforma de Comunicação
('WhatsApp Business', 2),           -- Plataforma de Comunicação
('HBO Max', 3),                     -- Plataforma de Streaming
('Amazon Prime Video', 3),          -- Plataforma de Streaming
('Apple Music', 3),                 -- Plataforma de Streaming
('Disney+', 3),                     -- Plataforma de Streaming
('The New York Times', 4),          -- Plataforma de Noticias
('Reuters', 4),                     -- Plataforma de Noticias
('The Guardian', 4),                -- Plataforma de Noticias
('Bloomberg', 4),                   -- Plataforma de Noticias
('Minecraft', 5),                   -- Jogos
('Call of Duty', 5),                -- Jogos
('Valorant', 5),                    -- Jogos
('Chess.com', 5);                   -- Jogos

INSERT INTO setor_tem_categoria (fk_setor, fk_empresa, fk_categoria, ativo) VALUES
(200, 100, 1, true),  -- Redes Sociais
(200, 100, 2, false),  -- Plataforma de Comunicação
(200, 100, 3, true),  -- Plataforma de Streaming
(200, 100, 4,false),  -- Plataforma de Noticias
(200, 100, 5, true);  -- Jogos

INSERT INTO setor_tem_categoria (fk_setor, fk_empresa, fk_categoria, ativo) VALUES
(200, 101, 1, true),  -- Redes Sociais
(200, 101, 2, true),  -- Plataforma de Comunicação
(200, 101, 3, false),  -- Plataforma de Streaming
(200, 101, 4, false),  -- Plataforma de Noticias
(200, 101, 5, false);  -- Jogos

INSERT INTO card_tem_processo (fk_setor_card, fk_empresa_card, fk_processo_card, fk_categoria_card, fk_card, ativo) VALUES
(200, 100, 800, 1, 1, false),    -- Facebook (Redes Sociais)
(200, 100, 801, 1, 1, false),    -- Instagram (Redes Sociais)
(200, 100, 802, 1, 1, false),    -- Twitter (Redes Sociais)
(200, 100, 803, 1, 1, true),    -- LinkedIn (Redes Sociais)
(200, 100, 804, 2, 2, true),    -- WhatsApp (Plataforma de Comunicação)
(200, 100, 805, 2, 2, false),    -- Slack (Plataforma de Comunicação)
(200, 100, 806, 2, 2, true),    -- Zoom (Plataforma de Comunicação)
(200, 100, 807, 2, 2, true),    -- Skype (Plataforma de Comunicação)
(200, 100, 808, 3, 3, true),    -- Netflix (Plataforma de Streaming)
(200, 100, 809, 3, 3, true),    -- YouTube (Plataforma de Streaming)
(200, 100, 810, 3, 3, true),    -- Twitch (Plataforma de Streaming)
(200, 100, 811, 3, 3, true),    -- Spotify (Plataforma de Streaming)
(200, 100, 812, 4, 4, true),    -- Globo (Plataforma de Noticias)
(200, 100, 813, 4, 4, false),    -- CNN (Plataforma de Noticias)
(200, 100, 814, 4, 4, false),    -- BBC (Plataforma de Noticias)
(200, 100, 815, 4, 4, true),    -- Folha de São Paulo (Plataforma de Noticias)
(200, 100, 816, 5, 5, true),    -- League of Legends (Jogos)
(200, 100, 817, 5, 5, true),    -- Fortnite (Jogos)
(200, 100, 818, 5, 5, true),    -- Among Us (Jogos)
(200, 100, 819, 1, 1, true),    -- Reddit (Redes Sociais)
(200, 100, 820, 1, 1, true),    -- Snapchat (Redes Sociais)
(200, 100, 821, 1, 1, true),    -- Pinterest (Redes Sociais)
(200, 100, 822, 2, 2, true),    -- Discord (Plataforma de Comunicação)
(200, 100, 823, 2, 2, true),    -- Microsoft Teams (Plataforma de Comunicação)
(200, 100, 824, 2, 2, true),    -- Google Meet (Plataforma de Comunicação)
(200, 100, 825, 2, 2, true),    -- WhatsApp Business (Plataforma de Comunicação)
(200, 100, 826, 3, 3, true),    -- HBO Max (Plataforma de Streaming)
(200, 100, 827, 3, 3, true),    -- Amazon Prime Video (Plataforma de Streaming)
(200, 100, 828, 3, 3, true),    -- Apple Music (Plataforma de Streaming)
(200, 100, 829, 3, 3, true),    -- Disney+ (Plataforma de Streaming)
(200, 100, 830, 4, 4, true),    -- The New York Times (Plataforma de Noticias)
(200, 100, 831, 4, 4, true),    -- Reuters (Plataforma de Noticias)
(200, 100, 832, 4, 4, true),    -- The Guardian (Plataforma de Noticias)
(200, 100, 833, 4, 4, true),    -- Bloomberg (Plataforma de Noticias)
(200, 100, 834, 5, 5, true),    -- Minecraft (Jogos)
(200, 100, 835, 5, 5, true),    -- Call of Duty (Jogos)
(200, 100, 836, 5, 5, true),    -- Valorant (Jogos)
(200, 100, 837, 5, 5, true);    -- Chess.com (Jog





INSERT INTO funcionario (nome_funcionario, email_funcionario, login_acesso, senha_acesso, cargo_funcionario, fk_setor, fk_empresa, acesso_plataforma, permissao_total) VALUES
('Jonathan Carvalho', 'jonathanaparecido80@gmail.com', 'jonathan.carvalho', '123', 'Gerente', 200, 100, true, true),
('Julia Silva', 'julia@gmail.com', 'julia.silva', '123', 'Gestor', 201, 100, true, false),
('Andre Pereira', 'andre@gmail.com', 'andre.pereira', '123', 'Gestor', 202, 100, true, false),
('teste', 'teste@gmail.com', 'teste.teste', '123', 'Gestor', 200, 100, true, false),
('João Santos', 'joao.santos@gmail.com', 'joao.santos', '123', 'Gestor', 204, 100, true, false),
('Maria Oliveira', 'maria.o@gmail.com', 'maria.oliveira', '123', 'Analista', 203, 100, false, false),
('Pedro Souza', 'pedro.souza@gmail.com', 'pedro.souza', '123', 'Analista', 200, 100, false, false),
('Ana Costa', 'ana.costa@gmail.com', 'ana.costa', '123', 'Desenvolvedor', 204, 100, false, false),
('Carlos Santos', 'carlos.santos@gmail.com', 'carlos.santos', '123', 'Analista', 201, 100, false, false),
('Fernanda Lima', 'fernanda.lima@gmail.com', 'fernanda.lima', '123', 'Desenvolvedor', 202, 100, false, false),
('Rafaela Oliveira', 'rafaela.o@gmail.com', 'rafaela.oliveira', '123', 'Analista', 203, 100, false, false),
('Gabriel Almeida', 'gabriel.almeida@gmail.com', 'gabriel.almeida', '123', 'Analista', 204, 100, false, false),
('Laura Martins', 'laura.martins@gmail.com', 'laura.martins', '123', 'Desenvolvedor', 202, 100, false, false),
('Mariana Costa', 'mariana.c@gmail.com', 'mariana.costa', '123', 'Analista', 201, 100, false, false),
('Rodrigo Pereira', 'rodrigo.pereira@gmail.com', 'rodrigo.pereira', '123', 'Desenvolvedor', 200, 100, false, false),
('Camila Ferreira', 'camila.f@gmail.com', 'camila.ferreira', '123', 'Desenvolvedor', 202, 100, false, false),
('Renato Oliveira', 'renato.o@gmail.com', 'renato.oliveira', '123', 'Analista', 203, 100, false, false),
('Amanda Rodrigues', 'amanda.r@gmail.com', 'amanda.rodrigues', '123', 'Desenvolvedor', 204, 100, false, false),
('Lucas Silva', 'lucas.silva@gmail.com', 'lucas.silva', '123', 'Desenvolvedor', 200, 100, false, false),
('Isabela Souza', 'isabela.souza@gmail.com', 'isabela.souza', '123', 'Analista', 201, 100, false, false),
('Felipe Santos', 'felipe.santos@gmail.com', 'felipe.santos', '123', 'Desenvolvedor', 202, 100, false, false),
('Carolina Lima', 'carolina.lima@gmail.com', 'carolina.lima', '123', 'Analista', 203, 100, false, false),
('Ricardo Pereira', 'ricardo.pereira@gmail.com', 'ricardo.pereira', '123', 'Analista', 204, 100, false, false),
('Mariana Ferreira', 'mariana.f@gmail.com', 'mariana.ferreira', '123', 'Desenvolvedor', 202, 100, false, false),
('Tiago Alves', 'tiago.alves@gmail.com', 'tiago.alves', '123', 'Analista', 202, 100, false, false),
('Beatriz Lima', 'beatriz.lima@gmail.com', 'beatriz.lima', '123', 'Desenvolvedor', 203, 100, false, false),
('Marcelo Silva', 'marcelo.silva@gmail.com', 'marcelo.silva', '123', 'Analista', 204, 100, false, false),
('Luana Oliveira', 'luana.o@gmail.com', 'luana.oliveira', '123', 'Analista', 200, 100, false, false),
('Daniel Pereira', 'daniel.pereira@gmail.com', 'daniel.pereira', '123', 'Desenvolvedor', 202, 100, false, false),
('Gabriela Santos', 'gabriela.santos@gmail.com', 'gabriela.santos', '123', 'Analista', 203, 100, false, false),
('Lucas Costa', 'lucas.c@gmail.com', 'lucas.costa', '123', 'Desenvolvedor', 201, 100, false, false),
('Isabella Rodrigues', 'isabella.r@gmail.com', 'isabella.rodrigues', '123', 'Analista', 200, 100, false, false);


