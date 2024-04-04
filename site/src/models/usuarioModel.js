/** @format */

var database = require('../database/config')

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  )

  var instrucao = `
  SELECT funcionario_id, nome_funcionario, email_funcionario, acesso_plataforma, permissao_total, setor.setor_id, fk_empresa_func from funcionario join setor on fk_setor = setor_id WHERE email_funcionario  = '${email}' AND senha_acesso = '${senha}' OR login_acesso = '${email}' AND senha_acesso = '${senha}';
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, empresaId) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  )

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${empresaId}');
    `
  console.log('Executando a instrução SQL: \n' + instrucao)
  return database.executar(instrucao)
}

function listar() {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
      SELECT * FROM usuario 
          JOIN hardware
              ON usuario_id = fk_usuario
                  WHERE usuario_id = 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function updatePassword(email, senhaAleatoria) {
  var instrucao = `
    UPDATE usuario SET senha = ${senhaAleatoria}
      WHERE email = "${email}"`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao)
}

module.exports = {
  autenticar,
  cadastrar,
  listar,
  updatePassword
}
