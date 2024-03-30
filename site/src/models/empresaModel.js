var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar(id_setor) {
  var query = `
  select f.nome_funcionario, f.funcionario_id, f.cargo_funcionario, s.nome_setor from funcionario f join setor s on fk_setor = setor_id where s.setor_id = ${id_setor};`;
  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
