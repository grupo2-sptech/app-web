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
            option.value = tabela.maquina_id
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
          option.value = funcionario.funcionario_id
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
  return diffMilissegundos <= toleranciaMilissegundos
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

          // Atualiza cor e estilo do indicador de CPU
          atualizarCorIndicador(
            bolinha_cpu,
            result_maquina.cpu_ocupada * 2,
            [50, 75]
          )
          // Atualiza cor e estilo do indicador de RAM
          atualizarCorIndicador(
            bolinha_ram,
            (result_maquina.ram_ocupada_gb / result_maquina.ram_total_gb) * 100,
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

let id_maquinas = []
function listarMaquinas(fksetor, acesso) {
  var listaMaquinas = document.getElementById('div_funcaoMaquina')
  fetch(`/dashboard/listar/${fksetor}/${acesso}`, {
    method: 'GET'
  })
    .then(function (resposta) {
      if (resposta.status == 204) {
        listaMaquinas.innerHTML = `Você ainda não possui nenhuma máquina cadastrada, cadastre a sua primeira máquina`
      } else {
        resposta.json().then(maquinas => {
          listaMaquinas.innerHTML = ''
          maquinas.forEach(maquinas => {
            listaMaquinas.innerHTML += `<div onclick="atualizar_grafico_tempo_real(${maquinas.maquina_id}); atualizarDadosDaMaquina(${maquinas.maquina_id}); cardSelecionado(${maquinas.maquina_id})"  id = "${maquinas.maquina_id}" class="card-acao">
          <div class="icon-todos">
            <div class="lixeira-lapis">
                <div class="icon-trash1" onclick="abrirExcluir(${maquinas.maquina_id}, '${maquinas.nome_maquina}'); event.stopPropagation(); event.preventDefault();"></div>
            </div>
           <div id="maquina_${maquinas.maquina_id}" class="icon-laptop1"></div>
        </div>
          <div class="descricao-laptop">
            <div class="descricao-titulo">
              <p>Modelo: ${maquinas.modelo_maquina}</p>
              <p>Nome: ${maquinas.nome_maquina}</p>
              <p>Status: <strong id="status_maquina${maquinas.maquina_id}"></strong></p>
              <p id = "user${maquinas.maquina_id}">Usuário: </p>
            </div>
            <div class="descricao-status">
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-cpu${maquinas.maquina_id}"></div>
                <p>CPU</p>
              </div>
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-ram${maquinas.maquina_id}"></div>
                <p>Ram</p>
              </div>
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-disco${maquinas.maquina_id}"></div>
                <p>Disco</p>
              </div>
            </div>
          </div>
        </div>`
            setInterval(() => {
              atualizar_maquina_tempo_real(
                maquinas.maquina_id,
                `icone-cpu${maquinas.maquina_id}`,
                `icone-ram${maquinas.maquina_id}`,
                `icone-disco${maquinas.maquina_id}`
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

function abrirExcluir(maquina_id, nome_maquina) {
  let nomeMaquina = document.getElementById('span_nomeMaquina')
  let popupExcluir = document.getElementById('deletar_maquina')
  let add_maquina = document.getElementById('pop-add-maquinas')
  let lista = document.getElementById('lista-processos')

  add_maquina.style.display = 'none'
  lista.style.display = 'none'

  popupExcluir.style.display = 'flex'
  nomeMaquina.innerHTML = nome_maquina

  sessionStorage.IDMAQUINA = maquina_id
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
    /*     console.log('Campos vazios:', { nome_maquina, modelo_maquina }) */
  } else {
    fetch(`/dashboard/cadastrar_maquina/${nome_maquina}/${modelo_maquina}`, {
      method: 'POST'
    })
      .then(function (resposta) {
        return resposta.json()
      })
      .then(function (dado) {
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

function deletarMaquina(id_maquina) {
  fetch(`/dashboard/deletar_maquina/${id_maquina}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      if (resposta.ok) {
        location.reload()
      } else if (resposta.status == 404) {
        window.alert('Deu 404!')
      } else {
        throw (
          'Houve um erro ao tentar realizar a postagem! Código da resposta: ' +
          resposta.status
        )
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`)
    })
}

let intervalo
let id_maquina_pesquisa


document.addEventListener('DOMContentLoaded', function () {
  let switchFlat1 = document.getElementById('switch-flat1');

  switchFlat1.checked = true

  if (switchFlat1) {
    switchFlat1.addEventListener('change', function (event) {
      let grafico_geral = document.getElementById('grafico_geral');
      if (!event.target.checked) {
        if (grafico_geral) {
          setTimeout(function () {
            grafico_geral.style.display = 'none';
          }, 500);
        }
      } else {
        setTimeout(function () {
          grafico_geral.style.display = 'flex';
        }, 500);
      }
    });
  }
});

function atualizar_grafico_tempo_real(id_maquina) {



  // Primeiro, selecione o elemento do botão usando seu ID
  let switchFlat1 = document.getElementById('switch-flat1');

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
  let dadosGraficoDisco = [0, 0];
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
              sessionStorage.TOTAL_RAM = informacoes[0].ram_total_gb
              myChartCpu.data.labels = label
              myChartRam.data.labels = label
              nome_usuario_maquina.innerHTML = `Monitoramento em tempo real da máquina de ${informacoes[0].nome_maquina}`
              dadoGraficoRam.shift()
              dadoGraficoRam.push(
                (informacoes[0].ram_ocupada_gb / informacoes[0].ram_total_gb) *
                100
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
          dados[0] = 7,
          dados[0] = 10,
          dados[0] = 11,
          dados[0] = 9,
          dados[0] = 10
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
      modelo.innerHTML = `Modelo do processador: ${informacoes[0].modelo_processador}`
      fabricante.innerHTML = `Fabricante: ${informacoes[0].fabricante_processador}`
      ram.innerHTML = `Volume total de Ram: ${informacoes[0].ram_total_gb}`
      disco.innerHTML = `Modelo: ${informacoes[0].modelo_disco}`
      volume.innerHTML = `Volume total: ${informacoes[0].memoria_total_gb}`
      sistema.innerHTML = `Sistema operacional: ${informacoes[0].sistema_operacional}`
      arquitetura.innerHTML = `Arquitetura: ${informacoes[0].arquitetura_sistema_operacional}`
    })
  })
}
let elementoSelecionado = null

function cardSelecionado(id_maquina) {
  const id = document.getElementById(`${id_maquina}`)

  if (elementoSelecionado !== null) {
    elementoSelecionado.style.background = ''
  }

  if (id.style.background === '') {
    id.style.background = 'rgb(223, 227, 230)'
    elementoSelecionado = id
  } else {
    id.style.background = ''
    elementoSelecionado = null
  }
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

