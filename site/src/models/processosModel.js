const { query } = require('express');
var database = require('../database/config');

function listaProcessos(id_setor) {
    let query;

    console.log("PASSEI AQUI, ID_SETOR: ", id_setor);

    query = `SELECT pj.titulo_processo, pj.fk_categoria, ctp.ativo
             FROM card_tem_processo AS ctp
             JOIN processos_janelas AS pj
             ON ctp.fk_processo_card = pj.id_processo
             WHERE ctp.fk_setor_card = ${id_setor};`;

    return database.executar(query);
}

function atualizaProcesso(ativo, id_setor,id_categoria) {
    let query;

    query = `update card_tem_processo set ativo = ${ativo} where fk_setor_card = ${id_setor} and fk_categoria_card = ${id_categoria};`;

    return database.executar(query);
}

module.exports = {
    listaProcessos
};
