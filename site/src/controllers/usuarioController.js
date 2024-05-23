/** @format */

var usuarioModel = require('../models/usuarioModel')
var medidaModel = require('../models/medidaModel')
var nodemailer = require('nodemailer')
const { response } = require('express')

function enviarEmail(req, res) {
  var email = req.body.emailServer
  var senha = req.body.senhaServer
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hardware.recuperasenha@gmail.com',
      pass: 'yanhdfljbkppyzob'
    }
  })
  debugger
  transport
    .sendMail({
      from: 'Hardware Security <hardware.recuperasenha@gmail.com>',
      to: email,
      subject: 'Recuperação de senha',
      text: `Senha provisoria de acesso ${senha}`
    })
    .then(response => console.log(response))
    .catch(err => res.status(403))
}

async function autenticar(req, res) {
  try {
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    debugger
    if (email == undefined) {
      res.status(400).send('Seu email está undefined!')
    } else if (senha == undefined) {
      res.status(400).send('Sua senha está indefinida!')
    }

    const resultadoAutenticar = await usuarioModel.autenticar(email, senha)

    if (resultadoAutenticar && resultadoAutenticar.length == 1) {
      const usuario_id = resultadoAutenticar[0].id_funcionario

      const [resultHardware] = await Promise.all([
        medidaModel.buscarMedidasEmTempoReal(usuario_id)
      ])

      if (resultadoAutenticar.length >= 0) {
        res.json({
          id: usuario_id,
          email: resultadoAutenticar[0].email,
          nome: resultadoAutenticar[0].nome_funcionario,
          permissao: resultadoAutenticar[0].acesso_plataforma,
          permissao_total: resultadoAutenticar[0].permissao_total,
          setor: resultadoAutenticar[0].id_setor,
          hardware: resultHardware,
          empresa: resultadoAutenticar[0].fk_empresa_func
        })
      } else {
        res.status(200)
      }
    } else if (!resultadoAutenticar || resultadoAutenticar.length == 0) {
      res.status(403).send('Email e/ou senha inválido(s)')
    } else {
      res.status(403).send('Mais de um usuário com o mesmo login e senha!')
    }
  } catch (erro) {
    console.log(erro)
    res.status(500).json(erro.sqlMessage)
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer
  var email = req.body.emailServer
  var senha = req.body.senhaServer
  var empresaId = req.body.empresaServer

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!')
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!')
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!')
  } else if (empresaId == undefined) {
    res.status(400).send('Sua empresa está undefined!')
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, empresaId)
      .then(function (resultado) {
        res.json(resultado)
      })
      .catch(function (erro) {
        console.log(erro)
        console.log(
          '\nHouve um erro ao realizar o cadastro! Erro: ',
          erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function updatePassword(req, res) {
  var email = req.body.emailServer
  var senha = req.body.senhaServer

  if (email == undefined) {
    res.status(400).send('Seu email está undefined!')
  } else {
    usuarioModel.updatePassword(email, senha).then(function (resultado) {
      res.json(resultado)
    })
  }
}

module.exports = {
  autenticar,
  cadastrar,
  updatePassword,
  enviarEmail
}
