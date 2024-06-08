/** @format */

const { query } = require('express')
var database = require('../database/config')

function listaProcessos(id_setor) {
  let query

  /*     console.log("PASSEI AQUI, ID_SETOR: ", id_setor);
   */
  query = `SELECT pj.titulo_processo, pj.fk_categoria, ctp.ativo, ctp.fk_processo_card, ctp.fk_setor_card
             FROM card_tem_processo AS ctp
             JOIN processos_janelas AS pj
             ON ctp.fk_processo_card = pj.id_processo
             WHERE ctp.fk_setor_card = ${id_setor};`

  return database.executar(query)
}

function atualizaProcesso(ativo, id_setor, id_processo) {
  let query

  query = `update card_tem_processo set ativo = ${ativo} where fk_setor_card = ${id_setor} and fk_processo_card = ${id_processo};`

  return database.executar(query)
}

function sugerirProcesso(id_setor, nome_sugestao) {
  let query

  query = `insert into sugestao (status, fk_setor, nome_sugestao) values (0,${id_setor}, '${nome_sugestao}');`

  return database.executar(query)
}

function listarSugestoes(id_setor) {
  let query

  query = `SELECT nome_sugestao, status FROM sugestao WHERE fk_setor = ${id_setor};`

  return database.executar(query)
}

module.exports = {
  listaProcessos,
  atualizaProcesso,
  sugerirProcesso,
  listarSugestoes
}
