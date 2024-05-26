/** @format */

var mysql = require('mysql2')
var sql = require('mssql')

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)

var sqlServerConfig = {
  server: 'localhost',
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
};

// CONEXÃO DO MYSQL WORKBENCH
var mySqlConfig = {
  host: 'localhost',
  database: 'hardware_security',
  user: 'aluno1',
  password: '123'
}

//var mySqlConfig = {
// host: 'hardware.cevi7rtakcex.us-east-1.rds.amazonaws.com',
// database: 'hardware_security',
// user: 'hardwareSecurity',
// password: 'Urubu100'
//}

function executar(instrucao) {
  // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    return new Promise(function (resolve, reject) {
      sql
        .connect(sqlServerConfig)
        .then(function () {
          return sql.query(instrucao)
        })
        .then(function (resultados) {
          console.log(resultados)
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
      conexao.query(instrucao, function (erro, resultados) {
        conexao.end()
        if (erro) {
          reject(erro)
        }
         console.log(resultados) 
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
