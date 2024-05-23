/** @format */

var database = require('../database/config')

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`

  return database.executar(query)
}

function listar(id_setor, permissao) {
  let query1
  var query = `
  select m.nome_maquina, m.modelo_maquina, m.id_maquina, s.nome_setor
  from maquina m join setor s on m.fk_setor = s.id_setor where s.id_setor = ${id_setor};`

  if (permissao == 1) {
    query1 = `select s.nome_setor, s.id_setor from setor s;`
  }
  return database.executar(query, query1)
}

function listar_setores() {
  var query = `
  select s.nome_setor, s.id_setor from setor s;`
  return database.executar(query)
}
function listar_funcionario() {
  var query = `
  select m.nome_maquina, m.id_maquina from maquina m;`
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
