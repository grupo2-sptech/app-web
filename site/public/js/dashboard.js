/** @format */
let id_setor = sessionStorage.SETOR

function listar(id_setor, id_select, acesso_total) {
  let select = document.getElementById(id_select)

  if (acesso_total == 0) {
    fetch(`/empresas/listar/${id_setor}`, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(function (resposta) {
        resposta.json().then(tabelas => {
          titulo_setor.innerHTML += tabelas[0].nome_setor
          tabelas.forEach(tabela => {
            const option = document.createElement('option') // Cria uma nova opção em cada iteração
            option.value = tabela.id_maquina
            option.text = tabela.nome_maquina
            select.appendChild(option)
          })
        })
      })
      .catch(function (erro) {
        console.log(`#ERRO: ${erro}`)
      })
  } else {
    const select_setor = document.getElementById('inp_setor')
    const select_funcionario = document.getElementById('inp_maquina')
    const titulo_setor = document.getElementById('titulo_setor')
    titulo_setor.innerHTML = 'Todas as máquinas'

    fetch(`/empresas/listar_tudo`, {
      method: 'GET',
      cache: 'no-store'
    }).then(function (resposta) {
      resposta.json().then(data => {
        const setores = data.setores
        const funcionarios = data.funcionarios

        setores.forEach(setor => {
          const option = document.createElement('option')
          option.value = setor.id_setor
          option.text = setor.nome_setor
          select_setor.appendChild(option)
        })

        funcionarios.forEach(funcionario => {
          const option = document.createElement('option')
          option.value = funcionario.id_funcionario
          option.text = funcionario.nome_funcionario
          select_funcionario.appendChild(option)
        })
      })
    })
    return false
  }
}

function validarHoraComTolerancia(horaDB, toleranciaSegundos) {
  let agora = new Date()
  let horaBancoDados = new Date(horaDB)
  let diffMilissegundos = Math.abs(agora - horaBancoDados)
  let toleranciaMilissegundos = toleranciaSegundos * 1000
  valida = diffMilissegundos <= toleranciaMilissegundos

  return valida
}

function atualizar_maquina_tempo_real(
  id_maquina,
  id_bolinha_cpu,
  id_bolinha_ram,
  id_bolinha_disco
) {
  // Requisição para obter dados da máquina pelo ID
  fetch(`/dashboard/atualizar_grafico_tempo_real/${id_maquina}`, {
    method: 'GET',
    cache: 'no-store'
  }).then(resposta => {
    // Processa resposta em JSON
    resposta.json().then(result => {
      // Processa cada resultado da máquina
      result.forEach(result_maquina => {
        // Elementos da interface de usuário
        let bolinha_cpu = document.getElementById(id_bolinha_cpu)
        let bolinha_ram = document.getElementById(id_bolinha_ram)
        let bolinha_disco = document.getElementById(id_bolinha_disco)
        let status = document.getElementById(`status_maquina${id_maquina}`)
        let pc = document.getElementById(`maquina_${id_maquina}`)

        // Verifica se a hora está dentro da tolerância
        if (validarHoraComTolerancia(result_maquina.data_hora, 10)) {
          // Define o status como 'Ligado'
          status.innerHTML = 'Ligado'
          pc.style.color = '#144a00'
          pc.style.animation = 'none'
          verificaAtividadeMaquinas()
          // Atualiza cor e estilo do indicador de CPU
          atualizarCorIndicador(
            bolinha_cpu,
            result_maquina.cpu_ocupada * 2,
            [50, 75]
          )
          // Atualiza cor e estilo do indicador de RAM
          atualizarCorIndicador(
            bolinha_ram,
            (result_maquina.ram_ocupada / result_maquina.ram_total_gb) * 100,
            [50, 75]
          )
          let apoio =
            (result_maquina.disco_ocupado_gb /
              result_maquina.memoria_total_gb) *
            100
          atualizarCorIndicador(bolinha_disco, apoio, [50, 80])
        } else {
          // Configurações quando a máquina está desligada
          status.innerHTML = 'Desligado'
          pc.style.color = 'black'
          pc.style.animation = 'none'
            // Define todos os indicadores como inativos (cor cinza)
            ;[bolinha_cpu, bolinha_ram, bolinha_disco].forEach(bolinha => {
              bolinha.style.background = '#d2d2d2'
              bolinha.style.animation = 'none'
            })
        }
      })
    })
  })
}

function atualizarCorIndicador(element, percent, limits) {
  if (percent > limits[1]) {
    element.style.background = '#ff0000'
  } else if (percent > limits[0]) {
    element.style.background = '#ff9d00'
  } else {
    element.style.background = '#2bff00'
  }
  element.style.animation = 'none'
}

let cardsMaquinas = []
let id_maquinas = []
function listarMaquinas(fksetor, acesso) {
  var listaMaquinas = document.getElementById('div_funcaoMaquina')
  fetch(`/dashboard/listar/${fksetor}/${acesso}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      if (resposta.status == 204) {
        listaMaquinas.innerHTML = `Você ainda não possui nenhuma máquina cadastrada, cadastre a sua primeira máquina`
      } else {
        resposta.json().then(maquinas => {
          listaMaquinas.innerHTML = ''
          maquinas.forEach(maquinas => {
            let TodasMaquinas = {
              idMaquina: maquinas.id_maquina,
              card: `<div onclick="atualizar_grafico_tempo_real(${maquinas.id_maquina}); atualizarDadosDaMaquina(${maquinas.id_maquina}); cardSelecionado(${maquinas.id_maquina}); atualizarDadosAlerta(${maquinas.id_maquina})"  id = "${maquinas.id_maquina}" class="card-acao">
              <div class="icon-todos">
                <div class="lixeira-lapis">
                    <div class="icon-trash1" onclick="abrirExcluir(${maquinas.id_maquina}, '${maquinas.nome_maquina}'); event.stopPropagation(); event.preventDefault();"></div>
                    <div class="icon-pencil" onclick="abrirEditar(${maquinas.id_maquina}, '${maquinas.modelo_maquina}', '${maquinas.nome_maquina}'); event.stopPropagation(); event.preventDefault();"></div>
                </div>
               <div id="maquina_${maquinas.id_maquina}" class="icon-laptop1"></div>
            </div>
              <div class="descricao-laptop">
                <div class="descricao-titulo">
                  <p>Nome: ${maquinas.nome_maquina}</p>
                  <p>Modelo: ${maquinas.modelo_maquina}</p>
                  <p>Status: <strong id="status_maquina${maquinas.id_maquina}"></strong></p>
                </div>
                <div class="descricao-status">
                  <div class="descricao-componenete">
                    <div class="bolinha" id="icone-cpu${maquinas.id_maquina}"></div>
                    <p>CPU</p>
                  </div>
                  <div class="descricao-componenete">
                    <div class="bolinha" id="icone-ram${maquinas.id_maquina}"></div>
                    <p>Ram</p>
                  </div>
                  <div class="descricao-componenete">
                    <div class="bolinha" id="icone-disco${maquinas.id_maquina}"></div>
                    <p>Disco</p>
                  </div>
                </div>
              </div>
            </div>`
            }
            cardsMaquinas.push(TodasMaquinas)
            listaMaquinas.innerHTML += TodasMaquinas.card
            setInterval(() => {
              atualizar_maquina_tempo_real(
                maquinas.id_maquina,
                `icone-cpu${maquinas.id_maquina}`,
                `icone-ram${maquinas.id_maquina}`,
                `icone-disco${maquinas.id_maquina}`
              )
            }, 2000)
          })
        })
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`)
    })
}

setTimeout(() => {
  verificaAtividadeMaquinas()
}, 3500)

function filtrarMaquina() {
  var listaMaquinas = document.getElementById('div_funcaoMaquina')
  listaMaquinas.innerHTML = ''
  let id_maquina = document.getElementById('inp_maquina').value
  if (id_maquina == 'tudo') {
    cardsMaquinas.forEach(maquina => {
      listaMaquinas.innerHTML += maquina.card
    })
  } else {
    cardsMaquinas.forEach(maquina => {
      if (maquina.idMaquina == id_maquina) {
        listaMaquinas.innerHTML += maquina.card
      }
    })
  }
}

function verificaAtividadeMaquinas() {
  let totalMaquinas = document.getElementById('total_maquinas')
  let maquinasLigadas = document.getElementById('maquinas_ligadas')
  let maquinasDesligadas = document.getElementById('maquinas_desligadas')

  const cards = document.querySelectorAll('#div_funcaoMaquina .card-acao')
  let cardsAtivos = []
  let quantidadeTotalCards = cards.length

  cards.forEach(card => {
    const statusElement = card.querySelector(
      '.descricao-titulo strong[id^="status_maquina"]'
    )
    if (
      statusElement &&
      statusElement.textContent.trim().toLowerCase() === 'ligado'
    ) {
      cardsAtivos.push(card)
    }
  })
  totalMaquinas.innerHTML = quantidadeTotalCards
  maquinasLigadas.innerHTML = cardsAtivos.length
  maquinasDesligadas.innerHTML = quantidadeTotalCards - cardsAtivos.length
}

function filtrarMaquina() {
  var listaMaquinas = document.getElementById('div_funcaoMaquina')
  listaMaquinas.innerHTML = ''
  let id_maquina = document.getElementById('inp_maquina').value
  if (id_maquina == 'tudo') {
    cardsMaquinas.forEach(maquina => {
      listaMaquinas.innerHTML += maquina.card
    })
  } else {
    cardsMaquinas.forEach(maquina => {
      if (maquina.idMaquina == id_maquina) {
        listaMaquinas.innerHTML += maquina.card
      }
    })
  }
}

function abrirExcluir(id_maquina, nome_maquina) {
  let nomeMaquina = document.getElementById('span_nomeMaquina')
  let popupExcluir = document.getElementById('deletar_maquina')
  let popuoEditar = document.getElementById('editar_maquina')
  let add_maquina = document.getElementById('pop-add-maquinas')
  let lista = document.getElementById('lista-processos')

  add_maquina.style.display = 'none'
  lista.style.display = 'none'
  popuoEditar.style.display = 'none'

  popupExcluir.style.display = 'flex'
  nomeMaquina.innerHTML = nome_maquina

  sessionStorage.IDMAQUINA = id_maquina
}

function abrirEditar(id_maquina, nome_maquina, modelo_maquina) {
  let nomeMaquina = document.getElementById('span_nomeMaquina')
  let popupExcluir = document.getElementById('deletar_maquina')
  let popuoEditar = document.getElementById('editar_maquina')
  let add_maquina = document.getElementById('pop-add-maquinas')
  let lista = document.getElementById('lista-processos')

  editar_modelo_maquina.value = nome_maquina
  editar_nome_maquina.value = modelo_maquina

  add_maquina.style.display = 'none'
  lista.style.display = 'none'
  popupExcluir.style.display = 'none'

  popuoEditar.style.display = 'flex'
  nomeMaquina.innerHTML = nome_maquina

  sessionStorage.IDMAQUINA = id_maquina
}

function verificarSenha() {
  var senha = document.getElementById('senha').value

  fetch(`/dashboard/validarSenha/${sessionStorage.ID_USUARIO}/${senha}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        deletarMaquina(sessionStorage.IDMAQUINA)
      } else {
        texto_erro.style.visibility = 'visible'
      }
    })
    .catch(error => {
      console.error('Erro ao verificar senha:', error)
    })
}

function cadastrarMaquina() {
  let nome_maquina = document.getElementById('nome_maquina').value
  let modelo_maquina = document.getElementById('modelo_maquina').value
  let campo = document.getElementById('preecha_campos_maquina')

  if (!nome_maquina || !modelo_maquina) {
    campo.style.display = 'block'
    campo.innerHTML = 'Preencha todos os campos'
  } else {
    fetch(
      `/dashboard/cadastrar_maquina/${nome_maquina}/${modelo_maquina}/${sessionStorage.SETOR}/${sessionStorage.ID_EMPRESA}`,
      {
        method: 'POST'
      }
    )
      .then(resposta => resposta.json())
      .then(dado => {
        if (dado.id !== undefined) {
          campo.innerHTML = `Cadastro realizado com sucesso!<br>Código de cadastro da máquina: <strong>${dado.id}</strong>`
          campo.style.display = 'block'
          campo.style.color = 'black'
        } else {
          campo.innerHTML = 'Erro ao obter o Código de cadastro.'
          campo.style.display = 'block'
        }
      })
      .catch(err => {
        campo.innerHTML = `Erro: ${err.message}`
        console.error('Erro ao cadastrar máquina:', err)
      })
  }
}

function listar_processos(id_setor) {
  let id_div_processos = document.getElementById('lista_bloqueios')
  id_div_processos.innerHTML = ``
  fetch(`/dashboard/listar_processos_bloqueados/${id_setor}`, {
    method: 'GET'
  }).then(function name(resposta) {
    resposta.json().then(lista => {
      lista.forEach(itens => {
        id_div_processos.innerHTML += `
      <div class="processo">
        <span>${itens.titulo_processo}</span>
        <div  onclick="deletar_processo(${itens.id_processos})" class="icon-trash"></div>
      </div>`
      })
    })
  })
}

function abir_lista() {
  let div_processos = document.getElementById('lista-processos')
  div_processos.style.display = 'flex'
  let add_maquina = document.getElementById('pop-add-maquinas')
  let deletar = document.getElementById('deletar_maquina')

  add_maquina.style.display = 'none'
  deletar.style.display = 'none'
  listar_processos(sessionStorage.SETOR)
  listar_todos_processos()
}

function listar_todos_processos() {
  let select = document.getElementById('selec-processo')
  select.innerHTML = ''
  fetch(`/dashboard/listar_processos`, {
    method: 'GET'
  }).then(function name(resposta) {
    resposta.json().then(lista => {
      lista.forEach(itens => {
        let option = document.createElement('option')
        option.value = itens.processo_id
        option.text = itens.titulo_processo
        select.appendChild(option)
      })
    })
  })
}

function confirmacaoAcao(confirmacao) {
  let div_confirma = document.getElementById('confirmacao')
  let div_carregar = document.getElementById('carregar')

  div_confirma.innerHTML = confirmacao
  div_carregar.style.display = 'none';
  div_confirma.style.display = 'flex';
}

function exibirCarregar() {
  let div_carregar = document.getElementById('carregar')
  div_carregar.style.display = 'block';
}

function deletarMaquina(id_maquina) {
  exibirCarregar()
  fetch(`/dashboard/deletar_maquina/${id_maquina}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      if (resposta.ok) {
        confirmacaoAcao('Máquina deletada!')
        setTimeout(() => {
          location.reload()
        }, 1000);
      } else if (resposta.status == 404) {
        window.alert('Máquina não encontrada (404).')
      } else {
        resposta.json().then(erro => {
          throw new Error(
            'Houve um erro ao tentar deletar a máquina: ' + erro.error
          )
        })
      }
    })
    .catch(function (erro) {
      console.error('#ERRO: ', erro)
      window.alert('Erro ao deletar máquina: ' + erro.message)
    })
}

function editarMaquina(id_maquina) {
  exibirCarregar()
  let nome_maquina = document.getElementById('editar_nome_maquina').value
  let modelo_maquina = document.getElementById('editar_modelo_maquina').value

  if (nome_maquina == '' || modelo_maquina == '') {
    preecha_campos_editar.style.display = 'block'
  } else {
    fetch(
      `/dashboard/editar_maquina/${id_maquina}/${nome_maquina}/${modelo_maquina}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(function (resposta) {
        if (resposta.ok) {
          confirmacaoAcao('Máquina Editada!')
          setTimeout(() => {
            location.reload()
          }, 1000);
        } else if (resposta.status == 404) {
          window.alert('Máquina não encontrada (404).')
        } else {
          resposta.json().then(erro => {
            throw new Error(
              'Houve um erro ao tentar editar a máquina: ' + erro.error
            )
          })
        }
      })
      .catch(function (erro) {
        console.error('#ERRO: ', erro)
        window.alert('Erro ao editar máquina: ' + erro.message)
      })
  }
}

let intervalo
let id_maquina_pesquisa

document.addEventListener('DOMContentLoaded', function () {
  let switchFlat1 = document.getElementById('switch-flat1')

  switchFlat1.checked = true

  if (switchFlat1) {
    switchFlat1.addEventListener('change', function (event) {
      let grafico_geral = document.getElementById('grafico_geral')
      if (!event.target.checked) {
        if (grafico_geral) {
          setTimeout(function () {
            grafico_geral.style.display = 'none'
          }, 500)
        }
      } else {
        setTimeout(function () {
          grafico_geral.style.display = 'flex'
          atualizarGraficoGeral(sessionStorage.SETOR)
        }, 500)
      }
    })
  }
})

function atualizarGraficoGeral(id_setor) {
  fetch(`/dashboard/grafico_geral/${id_setor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    if (res.ok) {
      res.json().then(dados => {
        let labels = dados.map(dado => dado.nome)
        let data = dados.map(dado => dado.quantidade_bloqueios)

        console.log(labels) // Log para verificar os labels extraídos
        console.log(data)

        myChartGeral.data.labels = labels
        myChartGeral.data.datasets[0].data = data

        // Atualiza o gráfico
        myChartGeral.update()
      })
    } else {
      console.log('Erro no fecth')
    }
  })
}

let ultimaNotificacaoId = null // Variável para armazenar o ID da última notificação recebida
let notificacoesAntigas = []

let temnoficica = true
let interrope = true // Variável para armazenar notificações antigas

function contadorNotifica(quantidade_notifica) {
  let div_contador = document.getElementById('contaNotifica')
  div_contador.textContent = quantidade_notifica // Atualiza o contador
}

function abrirNotifica() {
  let div_notifica = document.getElementById('div_notifica')

  // Alternar a visibilidade da div de notificações
  if (div_notifica.style.display === 'flex') {
    div_notifica.style.display = 'none'
  } else {
    div_notifica.style.display = 'flex'
    contadorNotifica(0) // Zerar o contador
    exibirNotificacoes() // Exibir notificações quando a div é aberta
  }
}

/**
 * Atualiza alertas e o contador de novas notificações.
 * @param {number} id_setor - O ID do setor para obter alertas. */
function atualizarAlertas(id_setor) {
  fetch(`/dashboard/alerta/${id_setor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    if (res.ok) {
      res.json().then(dados => {
        // Variáveis para armazenar notificações novas e antigas
        let notificacoesNovas = []

        // Mapear as novas notificações do banco de dados
        let novasNotificacoes = dados.map(dado => ({
          id: dado.id_alerta, // Supondo que cada notificação tem um ID único
          nome_maquina: dado.nome_maquina,
          descricao_alerta: dado.descricao_alerta,
          data_hora: dado.data_hora,
          titulo: dado.titulo
        }))

        novasNotificacoes.forEach(nova => {
          notificacoesNovas.push(nova)
        })

        if (temnoficica) {
          notificacoesAntigas = novasNotificacoes
          temnoficica = false
        }

        if (interrope) {
          notificacoesNovas.forEach(exibir => {
            adicionarNotificacaoNaInterface(exibir)
          })
          contadorNotifica(notificacoesNovas.length)
          interrope = false
        }

        if (notificacoesAntigas.length != notificacoesNovas.length) {
          let qtnnotifica =
            notificacoesNovas.length - notificacoesAntigas.length
          contadorNotifica(qtnnotifica)
          temnoficica = true

          // Atualizar as notificações antigas
          notificacoesAntigas = [...notificacoesNovas]

          // Pegar os últimos qtnnotifica itens de notificacoesNovas
          let novasNotificacoes = notificacoesNovas.slice(-qtnnotifica)
          novasNotificacoes.forEach(exibir => {
            adicionarNotificacaoNaInterface(exibir)
          })
        }
      })
    }
  })
}

// Função para adicionar uma notificação na interface
function adicionarNotificacaoNaInterface(novaNotificacao) {
  let dataHora = new Date(novaNotificacao.data_hora)
  let dia = String(dataHora.getDate()).padStart(2, '0')
  let mes = String(dataHora.getMonth() + 1).padStart(2, '0') // Meses começam do 0
  let ano = dataHora.getFullYear()
  let horas = String(dataHora.getHours()).padStart(2, '0')
  let minutos = String(dataHora.getMinutes()).padStart(2, '0')
  let segundos = String(dataHora.getSeconds()).padStart(2, '0')

  let dataHoraFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`
  let notifica = document.getElementById('notificacao')
  if (novaNotificacao.titulo.includes('Processo')) {
    color_alerta = 'orange'
  } else {
    color_alerta = 'red'
  }
  notifica.innerHTML += `
  <div class="alertas">
      <div class="mensagem_alerta">
          <div style="color: ${color_alerta};" class="icon-warning"></div>
          <div>
              <p class="nome_maquina">${novaNotificacao.titulo} da ${novaNotificacao.nome_maquina}</p>
              <p class="descricao_alerta">${novaNotificacao.descricao_alerta}</p>
              <i class="data_hora">${dataHoraFormatada}</i>
          </div>
      </div>
  </div>`
}

// Verificação contínua a cada segundo para atualizações de alertas
setInterval(() => {
  atualizarAlertas(sessionStorage.SETOR)
}, 1000)

function limparNotificacao() {
  let notifica = document.getElementById('notificacao')
  notifica.innerHTML = ''
}

function atualizar_grafico_tempo_real(id_maquina) {
  // Primeiro, selecione o elemento do botão usando seu ID
  let switchFlat1 = document.getElementById('switch-flat1')

  switchFlat1.checked = false

  let grafico_geral = document.getElementById('grafico_geral')
  grafico_geral.style.display = 'none'

  let dadoGraficoCpu = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]
  let dadoGraficoRam = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]
  let dadosGraficoDisco = [0, 0]
  clearInterval(intervalo)

  intervalo = setInterval(() => {
    fetch(`/dashboard/atualizar_grafico_tempo_real/${id_maquina}`, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(function (resposta) {
        resposta
          .json()
          .then(informacoes => {
            id_maquina_pesquisa = id_maquina
            if (validarHoraComTolerancia(informacoes[0].data_hora, 10)) {
              sessionStorage.TOTAL_RAM = informacoes[0].ram_ocupada
              myChartCpu.data.labels = label
              myChartRam.data.labels = label
              nome_usuario_maquina.innerHTML = `Monitoramento em tempo real da máquina de ${informacoes[0].nome_maquina}`
              dadoGraficoRam.shift()
              dadoGraficoRam.push(
                (informacoes[0].ram_ocupada / informacoes[0].ram_total_gb) * 100
              )
              myChartRam.data.datasets[0].data = dadoGraficoRam
              myChartRam.update()

              dadoGraficoCpu.shift()
              dadoGraficoCpu.push(informacoes[0].cpu_ocupada * 2)
              myChartCpu.data.datasets[0].data = dadoGraficoCpu
              myChartCpu.update()

              if (dadosGraficoDisco[0] == 0 || dadosGraficoDisco[1] == 0) {
                dadosGraficoDisco[0] = informacoes[0].memoria_disponivel_gb
                dadosGraficoDisco[1] = informacoes[0].disco_ocupado_gb
                myChartDisco.data.datasets[0].data = dadosGraficoDisco
                myChartDisco.update()
              }
            } else {
              nome_usuario_maquina.innerHTML = `A ${informacoes[0].nome_maquina} está inativa.`
              dadoGraficoCpu = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
              ]
              dadoGraficoRam = [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
              ]
              dadosGraficoDisco = [0, 0]
              myChartRam.data.datasets[0].data = dadoGraficoRam
              myChartRam.update()
              myChartCpu.data.datasets[0].data = dadoGraficoCpu
              myChartCpu.update()
              myChartDisco.data.datasets[0].data = dadosGraficoDisco
              myChartDisco.update()
            }
          })
          .catch(erro => {
            console.error('Erro ao converter resposta para JSON:', erro)
          })
      })
      .catch(erro => {
        console.error('Erro na requisição fetch:', erro)
      })
  }, 1000)
}

function buscarPorData() {
  if (id_maquina_pesquisa != undefined) {
    clearInterval(intervalo)
    let dataPesquisa = document.getElementById('filtro_date')
    fetch(
      `/dashboard/buscarPorData/${id_maquina_pesquisa}/${dataPesquisa.value}`,
      {
        method: 'GET',
        cache: 'no-store'
      }
    ).then(function (resposta) {
      resposta.json().then(dados => {
        myChartCpu.data.labels = label_hist
        myChartRam.data.labels = label_hist

        myChartCpu.data.datasets[0].data = [
          (dados[0] = 7),
          (dados[0] = 10),
          (dados[0] = 11),
          (dados[0] = 9),
          (dados[0] = 10)
        ]
        myChartCpu.update()
        myChartRam.data.datasets[0].data = [
          (dados[0] = 80),
          (dados[0] = 91),
          (dados[0] = 80),
          (dados[0] = 84),
          (dados[0] = 86)
        ]
        myChartRam.update()
        myChartDisco.data.datasets[0].data = [12.3, 243.21]
        myChartDisco.update()
      })
    })
  }
}

let interuptor = 1

function sumirMenu() {
  let menu = document.getElementById('menu')
  let dash = document.getElementById('tela_principal')
  let acao = document.querySelectorAll('.nome-acao')
  let ico = document.querySelectorAll('.ico')

  if (interuptor == 1) {
    menu.style.width = '10vw'
    dash.style.width = '100vw'
    dash.style.marginLeft = '5vw'
    acao.forEach(function (acao) {
      acao.style.display = 'block'
    })
    ico.forEach(function (ico) {
      ico.style.display = 'none'
    })
    interuptor = 0
  } else {
    menu.style.width = '5vw'
    dash.style.width = '100vw'
    dash.style.marginLeft = '0vw'
    acao.forEach(function (acao) {
      acao.style.display = 'none'
    })
    ico.forEach(function (ico) {
      ico.style.display = 'block'
    })
    interuptor = 1
  }
}

function atualizarDadosDaMaquina(id_maquina) {
  let modelo = document.getElementById('modelo')
  let fabricante = document.getElementById('fabricante')
  let ram = document.getElementById('ram')
  let disco = document.getElementById('disco')
  let volume = document.getElementById('volume')
  let sistema = document.getElementById('sistema')
  let arquitetura = document.getElementById('arquitetura')

  fetch(`/dashboard/atualizar_grafico_tempo_real/${id_maquina}`, {
    method: 'GET',
    cache: 'no-store'
  }).then(function (resposta) {
    resposta.json().then(informacoes => {
      modelo.innerHTML = `  ${informacoes[0].modelo_processador == ''
        ? 'Indefinido'
        : informacoes[0].modelo_processador
        }`
      fabricante.innerHTML = `  ${informacoes[0].fabricante_processador}`
      ram.innerHTML = ` ${informacoes[0].ram_total_gb}`
      disco.innerHTML = ` ${informacoes[0].modelo_disco}`
      volume.innerHTML = ` ${informacoes[0].memoria_total_gb}`
      sistema.innerHTML = `  ${informacoes[0].sistema_operacional}`
      arquitetura.innerHTML = `  ${informacoes[0].arquitetura}`
    })
  })
}
let elementoSelecionado = null

function cardSelecionado(id_maquina) {
  const id = document.getElementById(id_maquina)

  if (elementoSelecionado !== null) {
    elementoSelecionado.style.border = ''
  }

  if (elementoSelecionado === id) {
    elementoSelecionado = null
  } else {
    id.style.border = '3px solid #2e4959'
    elementoSelecionado = id
  }
}

function atualizarDadosAlerta(idMaquina){
  let ramLimite = document.getElementById('ram_limite')
  let cpuLimite = document.getElementById('cpu_limite')
  let bloqueio = document.getElementById('bloqueio')

  fetch(`/dashboard/atualizarDadosAlerta/${idMaquina}`,{
    method: 'GET'
  }).then(function (result){
    result.json().then(alertas =>{
      ramLimite.innerHTML = alertas[0].ram
      cpuLimite.innerHTML = alertas[0].cpu
      bloqueio.innerHTML = alertas[0].processo
    })
  })
}

function mostrarAcao(id) {
  if (interuptor == 1) {
    var nome_acao = document.getElementById(id)
    if (nome_acao) {
      nome_acao.style.display = 'block'
    }
  }
}
function ocultarAcao(id) {
  if (interuptor == 1) {
    var nome_acao = document.getElementById(id)
    if (nome_acao) {
      nome_acao.style.display = 'none'
    }
  }
}

function listaProcessos(id_setor) {
  var cardRedeSocial = document.getElementById('cardRedeSocial')
  var cardPlataforma = document.getElementById('cardPlataforma')
  var cardStreaming = document.getElementById('cardStreaming')
  var cardNoticias = document.getElementById('cardNoticias')
  var cardJogos = document.getElementById('cardJogos')

  fetch(`listaProcesos/${id_setor}`, {
    method: 'GET'
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Network response was not ok')
      }
      return resposta.json()
    })
    .then(function (data) {
      data.forEach(function (pj) {
        if (pj.fk_categoria == 1) {
          cardRedeSocial.innerHTML += `<div class="processo">
          <p style="margin-left: 5%;">${pj.nome}</p>
          <div class="switch__container" style="margin-right: 0;">
            <input id="switch-flat${pj.nome}" class="switch switch--flat" type="checkbox">
            <label for="switch-flat${pj.nome}"></label>
          </div>
        </div>`
        }
      })
    })
    .catch(function (error) {
      console.error('Houve um problema com a solicitação fetch: ', error)
    })
}
