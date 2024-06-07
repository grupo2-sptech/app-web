/** @format */

var database = require('../database/config')

function listarEmpresa() {
  console.log('Buscando dados da empresa.')
  var instrucao = `
    SELECT nome_empresa, email, cnpj, canal_slack, token_slack FROM empresa;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function autenticarEmpresa(cnpj) {
  console.log('Autenticando empresa com CNPJ:', cnpj)
  var instrucao = `
    SELECT nome_empresa, email, cnpj FROM empresa WHERE cnpj = @param1;
  `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao, [cnpj])
}

async function cadastrarEndereco(
  municipio,
  bairro,
  logradouro,
  numero,
  complemento,
  cep,
  ufEmp
) {
  try {
    const query = `
      INSERT INTO endereco (municipio, bairro, logradouro, numero, complemento, cep, fk_uf)
      VALUES (@param1, @param2, @param3, @param4, @param5, @param6, @param7);
      SELECT SCOPE_IDENTITY() AS enderecoId;
    `
    const result = await database.executar(query, [
      municipio,
      bairro,
      logradouro,
      numero,
      complemento,
      cep,
      ufEmp
    ])
    return result[0].enderecoId // Retorna o ID do endereço inserido
  } catch (error) {
    throw error
  }
}


async function cadastrarStores(setor, id_empresa) {
  try {
    const queries = [
      { query: `INSERT INTO setor (nome_setor, fk_empresa) VALUES ('Produção', @param1)`, params: [id_empresa] },
      { query: `INSERT INTO setor (nome_setor, fk_empresa) VALUES ('Financeiro', @param1)`, params: [id_empresa] },
      { query: `INSERT INTO setor (nome_setor, fk_empresa) VALUES ('Recursos Humanos', @param1)`, params: [id_empresa] },
      { query: `INSERT INTO setor (nome_setor, fk_empresa) VALUES ('Qualidade', @param1)`, params: [id_empresa] },
      { query: `INSERT INTO setor (nome_setor, fk_empresa) VALUES ('Logística', @param1)`, params: [id_empresa] },
    ];

    for (let { query, params } of queries) {
      await database.executar(query, params);
    }

    const querySetor = `
      SELECT id_setor FROM setor WHERE nome_setor = @param1 AND fk_empresa = @param2;
    `;
    const result = await database.executar(querySetor, [setor, id_empresa]);

    return result[0].id_setor;
  } catch (error) {
    throw error;
  }
}


async function cadastrarFuncionario(nomeUser, emailUser, login, senha, cargo, setorId, empresaId) {
  try {
    const query = `
      INSERT INTO funcionario (nome_funcionario, email_funcionario, login_acesso, senha_acesso, fk_setor, fk_empresa, cargo_funcionario, acesso_plataforma)
      VALUES (@param1, @param2, @param3, @param4, @param5, @param6, @param7, 1);
    `;
    await database.executar(query, [nomeUser, emailUser, login, senha, setorId, empresaId, cargo]);
  } catch (error) {
    throw error;
  }
}



async function cadastrarEmpresa(nome, cnpj, email, enderecoId) {
  try {
    const query = `
      INSERT INTO empresa (nome_empresa, cnpj, email, fk_endereco)
      VALUES (@param1, @param2, @param3, @param4);
      SELECT SCOPE_IDENTITY() AS empresaId;
    `;
    const result = await database.executar(query, [nome, cnpj, email, enderecoId]);
    return result[0].empresaId; // Retorna o ID da empresa inserida
  } catch (error) {
    throw error;
  }
}


async function deletarEmpresa(cnpj) {
  try {
    // Queries para deletar as dependências
    const query_funcionario = `
      DELETE FROM funcionario 
      WHERE fk_empresa = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;
    const query_maquina = `
      DELETE FROM maquina 
      WHERE fk_empresa = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;
    const query_setor = `
      DELETE FROM setor 
      WHERE fk_empresa = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;
    const query_setor_tem_categoria = `
      DELETE FROM setor_tem_categoria 
      WHERE fk_empresa = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;
    const query_card_tem_processo = `
      DELETE FROM card_tem_processo 
      WHERE fk_empresa_card = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;
    const query_historico_bloqueios = `
      DELETE FROM historico_bloqueios 
      WHERE fk_empresa = (SELECT id_empresa FROM empresa WHERE cnpj = @param1);
    `;

    // Deletar a empresa
    const query_empresa = `
      DELETE FROM empresa WHERE cnpj = @param1;
    `;

    // Executar as queries na ordem correta
    await database.executar(query_funcionario, [cnpj]);
    await database.executar(query_maquina, [cnpj]);
    await database.executar(query_setor_tem_categoria, [cnpj]);
    await database.executar(query_card_tem_processo, [cnpj]);
    await database.executar(query_historico_bloqueios, [cnpj]);
    await database.executar(query_setor, [cnpj]);
    await database.executar(query_empresa, [cnpj]);

    return { message: 'Empresa e dependências deletadas com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar empresa:', error);
    throw error;
  }
}


function editarEmpresa(cnpj, nome, email, token, canal) {
  let query_editar = `
    UPDATE empresa SET nome_empresa = @param1, email = @param2, token_slack = @param3, canal_slack = @param4 WHERE cnpj = @param5;
  `
  console.log(query_editar)
  return database.executar(query_editar, [nome, email, token, canal, cnpj])
}

module.exports = {
  listarEmpresa,
  autenticarEmpresa,
  cadastrarEmpresa,
  cadastrarEndereco,
  deletarEmpresa,
  editarEmpresa,
  cadastrarStores,
  cadastrarFuncionario
}
