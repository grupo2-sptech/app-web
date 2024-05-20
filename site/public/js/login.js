/** @format */

function openPop() {
  document.getElementById('pop-up').style.display = 'block'
}

function closePopUp() {
  pop = document.getElementById('pop-up')
  pop.style.display = 'none'
  texto_erro_2.style.visibility = 'hidden'
}

function voltar() {
  mensagem_senha_incorreta.innerHTML = ''
  event.preventDefault()
  carregar.style.display = 'block'
  setInterval(() => {
    window.location.href = 'index.html'
  }, 1000)
}

function entrar() {
  event.preventDefault()
  mensagem_senha_incorreta.innerHTML = ''
  var senha = input_senha.value
  var email = input_email.value
  var div_carregar = document.getElementById('carregar')

  if (senha == '' || email == '') {
    mensagem_senha_incorreta.innerHTML = `Preencha todos os campos!`
    return false
  } else {
    fetch('/usuarios/autenticar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailServer: email,
        senhaServer: senha
      })
    })
      .then(function (resposta) {
        if (resposta.ok) {
          div_carregar.style.display = 'block'

          resposta.json().then(json => {
            sessionStorage.EMAIL_USUARIO = json.email
            sessionStorage.NOME_USUARIO = json.nome
            sessionStorage.ID_USUARIO = json.id
            sessionStorage.ACESSO = json.permissao
            sessionStorage.ACESSO_TOTAL = json.permissao_total
            sessionStorage.SETOR = json.setor
            sessionStorage.ID_EMPRESA = json.fk_empresa
            if (json.permissao == 1) {
              setTimeout(() => {
                if (json.permissao_total = 1) {
                  window.location.href = './cadastroEmpresa.html'
                } else {
                  window.location.href = './dashboard/dashboard.html'
                }
              }, 2000)
            } else {
              setTimeout(() => {
                div_carregar.style.display = 'none'
                mensagem_senha_incorreta.innerHTML = 'Acesso Negado!'
              }, 2000)
            }
          })
        } else {
          resposta.text().then(texto => {
            div_carregar.style.display = 'block'
            setTimeout(() => {
              mensagem_senha_incorreta.innerHTML = texto
              div_carregar.style.display = 'none'
            }, 2000)
            console.error(texto)
          })
        }
      })
      .catch(function (erro) {
        console.log(erro)
      })
    return false
  }
}
