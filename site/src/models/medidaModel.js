/** @format */

var database = require('../database/config')

function buscarUltimasMedidas(idAquario, limite_linhas) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoReal(usuario_id) {
  instrucaoSql = ''
  instrucaoSql = `SELECT s.*, f.email_funcionario as email, f.nome_funcionario as nome, f.id_funcionario as id, f.acesso_plataforma as permissao, f.permissao_total as permissao_total 
  FROM setor AS s JOIN funcionario AS f ON s.id_setor = f.fk_setor where id_funcionario = ${usuario_id};
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal
}
