/** @format */

var database = require('../database/config')

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`

  return database.executar(query)
}

function listar(id_setor, permissao) {
  let query1
  var query = `
  select f.nome_funcionario, f.funcionario_id, f.cargo_funcionario,f.fk_empresa_func, f.permissao_total,  s.nome_setor from funcionario f join setor s on fk_setor = setor_id where s.setor_id = ${id_setor};`

  if (permissao == 1) {
    query1 = `select s.nome_setor, s.setor_id from setor s;`
  }
  return database.executar(query, query1)
}

function listar_setores() {
  var query = `
  select s.nome_setor, s.setor_id from setor s;`
  return database.executar(query)
}
function listar_funcionario() {
  var query = `
  select f.nome_funcionario, f.funcionario_id from funcionario f;`
  return database.executar(query)
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`

  return database.executar(query)
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`

  return database.executar(query)
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  listar_setores,
  listar_funcionario
}
