const { query } = require('express')
var database = require('../database/config')

function listarUsuarios(idUsuario, acesso) {
  instrucaoSql = ''
  instrucaoSql = `SELECT 
  s.*, 
  f.email_funcionario AS email, 
  f.nome_funcionario AS nome, 
  f.id_funcionario AS id, 
  f.acesso_plataforma AS permissao, 
  f.permissao_total AS permissao_total
FROM 
  setor AS s 
JOIN 
  funcionario AS f ON s.id_setor = f.fk_setor 
WHERE 
  f.id_funcionario = ${idUsuario};
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