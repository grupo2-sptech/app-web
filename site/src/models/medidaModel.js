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
  instrucaoSql = `select maquina.*, hitorico_hardware.* from funcionario join maquina on funcionario_id = fk_funcionario join hitorico_hardware on maquina_id = fk_maquina where fk_funcionario = ${usuario_id};
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal
}
