const { query } = require('express')
var database = require('../database/config')

function listarUsuarios(idUsuario, acesso) {
  instrucaoSql = ''
  instrucaoSql = `SELECT s.*, f.email_funcionario as email, f.nome_funcionario as nome, f.funcionario_id as id, f.acesso_plataforma as permissao, f.permissao_total as permissao_total 
  FROM setor AS s JOIN funcionario AS f ON s.setor_id = f.fk_setor where funcionario_id = ${idUsuario};
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}


module.exports = {
    listarUsuarios
}