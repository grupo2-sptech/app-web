const { query } = require('express')
var database = require('../database/config')

function listarUsuarios(setor, empresa) {
  instrucaoSql = ''
  instrucaoSql = `SELECT 
  id_funcionario,
  nome_funcionario,
  email_funcionario,
  cargo_funcionario,
  acesso_plataforma
  FROM funcionario
  WHERE fk_setor = ${setor} AND fk_empresa = ${empresa};
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function cadastrarUsuario (nome, email, senha, setor, empresa, cargo, permissao, permissao_total) {
  instrucaoSql = ''
  instrucaoSql = `INSERT INTO funcionario (nome_funcionario, email_funcionario, senha_acesso, fk_setor, fk_empresa, cargo_funcionario, acesso_plataforma, permissao_total)
  VALUES ('${nome}', '${email}', '${senha}', ${setor}, ${empresa}, '${cargo}', ${permissao}, ${permissao_total});
  `

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql) 
}

  function editarUsuario(nome, email, setor, cargo) {
  instrucaoSql = ''
  instrucaoSql = `UPDATE funcionario SET nome_funcionario = '${nome}', email_funcionario = '${email}', fk_setor = ${setor}, cargo_funcionario = '${cargo}'
  WHERE email_funcionario = '${email}';
  `
  console.log('model')
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

  function excluirUsuario(id_funcionario) {
  instrucaoSql = ''
  instrucaoSql = `DELETE FROM funcionario WHERE id_funcionario = ${id_funcionario};`
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    editarUsuario,
    excluirUsuario
}