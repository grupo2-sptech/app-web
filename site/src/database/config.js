/** @format */

var mysql = require('mysql2')
var sql = require('mssql')

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
var sqlServerConfig = {
  // server: '44.213.9.204', // IP JONATHAN
  // server: '52.4.7.29',  // IP JOÂO
  server: 'localhost',   // PRODUCÃO
  database: 'hardware_security2',
  user: 'sa',
  password: 'urubu100',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // Ignora erros de certificado autoassinado
  }
}

// CONEXÃO DO MYSQL WORKBENCH
var mySqlConfig = {
  host: 'localhost',
  database: 'hardware_security',
  user: 'aluno1',
  password: '123'
}

// Função para executar consultas
function executar(instrucao, parametros = []) {
  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    return new Promise(function (resolve, reject) {
      sql
        .connect(sqlServerConfig)
        .then(function () {
          const request = new sql.Request()
          parametros.forEach((param, index) => {
            request.input(`param${index + 1}`, param)
          })
          return request.query(instrucao)
        })
        .then(function (resultados) {
          // console.log(resultados)
          resolve(resultados.recordset)
        })
        .catch(function (erro) {
          reject(erro)
          console.log('ERRO: ', erro)
        })
      sql.on('error', function (erro) {
        return 'ERRO NO SQL SERVER (Azure): ', erro
      })
    })
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    return new Promise(function (resolve, reject) {
      var conexao = mysql.createConnection(mySqlConfig)
      conexao.connect()
      conexao.query(instrucao, parametros, function (erro, resultados) {
        conexao.end()
        if (erro) {
          reject(erro)
        }
        // console.log(resultados)
        resolve(resultados)
      })
      conexao.on('error', function (erro) {
        return 'ERRO NO MySQL WORKBENCH: ', erro.sqlMessage
      })
    })
  } else {
    return new Promise(function (resolve, reject) {
      console.log(
        '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
      )
      reject('AMBIENTE NÃO CONFIGURADO EM app.js')
    })
  }
}

module.exports = {
  executar
}
