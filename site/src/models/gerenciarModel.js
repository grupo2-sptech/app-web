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

function cadastrarUsuario (nome, email, senha, setor, empresa, cargo, permissao) {
  instrucaoSql = ''
  instrucaoSql = `INSERT INTO funcionario (nome_funcionario, email_funcionario, senha_acesso, fk_setor, fk_empresa, cargo_funcionario, acesso_plataforma)
  VALUES ('${nome}', '${email}', '${senha}', ${setor}, ${empresa}, '${cargo}', ${permissao});
  `

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql) 
}

  function editarUsuario(id_funcionario, nome, email, setor, cargo) {
  instrucaoSql = ''
  instrucaoSql = `UPDATE funcionario SET nome_funcionario = '${nome}', email_funcionario = '${email}', fk_setor = ${setor}, cargo_funcionario = '${cargo}'
  WHERE id_funcionario = '${id_funcionario}';
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

  async function excluirUsuario(id_funcionario) {

    try {
      const query_acesso = `DELETE FROM acesso_usuario WHERE fk_funcionario = ${id_funcionario};`
      const query_usuario = `DELETE FROM funcionario WHERE id_funcionario = ${id_funcionario};`

      await database.executar(query_acesso, [id_funcionario])
      await database.executar(query_usuario, [id_funcionario])

      return { message: 'Usuário e dependências deletados com sucesso' }
    } catch (error) {
      console.log('Erro ao deletar usuário:', error)
      throw error
    }
  
}

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    editarUsuario,
    excluirUsuario
}