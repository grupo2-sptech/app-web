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


module.exports = {
    listarUsuarios
}