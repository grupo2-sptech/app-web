/**
 * const { dadosEmpresa } = require('../controllers/cadastroEmpController');
 *
 * @format
 */

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

async function cadastrarEmpresa(nome, cnpj, email, enderecoId) {
  try {
    const query = `
      INSERT INTO empresa (nome_empresa, cnpj, email, fk_endereco)
      VALUES (@param1, @param2, @param3, @param4);
    `
    await database.executar(query, [nome, cnpj, email, enderecoId])
  } catch (error) {
    throw error
  }
}

function deletarEmpresa(cnpj) {
  let query_empresa = `
    DELETE FROM empresa WHERE cnpj = @param1;
  `
  console.log(query_empresa)
  return database.executar(query_empresa, [cnpj])
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
  editarEmpresa
}
