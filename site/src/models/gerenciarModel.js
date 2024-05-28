const { query } = require('express')
var database = require('../database/config')

function listarUsuarios(setor, empresa) {
  instrucaoSql = ''
  instrucaoSql = `SELECT 
  funcionario_id, 
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

  function editarUsuario(nome, email, senha, setor, empresa, cargo, permissao, permissao_total) {
  instrucaoSql = ''
  instrucaoSql = `UPDATE funcionario SET nome_funcionario = '${nome}', email_funcionario = '${email}', senha_acesso = '${senha}', fk_setor = ${setor}, fk_empresa = ${empresa}, cargo_funcionario = '${cargo}', acesso_plataforma = ${permissao}, permissao_total = ${permissao_total}
  WHERE email_funcionario = '${email}';
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

  function excluirUsuario(idUsuario) {
  instrucaoSql = ''
  instrucaoSql = `DELETE FROM funcionario WHERE funcionario_id = ${idUsuario};`
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    editarUsuario,
    excluirUsuario
}