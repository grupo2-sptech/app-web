/** @format */
let setor_id = sessionStorage.SETOR

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
            console.log(tabela)
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
          option.value = setor.setor_id
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
  fetch(`/dashboard/cap_dados/${id_maquina}`, {
    method: 'GET',
    cache: 'no-store'
  }).then(function (resposta) {
    resposta.json().then(result => {
      result.forEach(result_maquina => {
        let bolinha_cpu = document.getElementById(`${id_bolinha_cpu}`)
        let bolinha_ram = document.getElementById(`${id_bolinha_ram}`)
        let bolinha_disco = document.getElementById(`${id_bolinha_disco}`)
        let status = document.getElementById(`status_maquina${id_maquina}`)
        let pc = document.getElementById(`maquina_${id_maquina}`)
        if (validarHoraComTolerancia(result_maquina.data_hora, 10)) {
          status.innerHTML = 'Ligado'
          pc.style.color = '#144a00'
          pc.style.animation = 'none'
          if (result_maquina.cpu_ocupada * 2 > 75) {
            bolinha_cpu.style.background = '#ff0000'
            bolinha_cpu.style.animation = 'none'
          } else if (result_maquina.cpu_ocupada * 2 > 50) {
            bolinha_cpu.style.background = '#ff9d00'
            bolinha_cpu.style.animation = 'none'
          } else {
            bolinha_cpu.style.background = '#2bff00'
            bolinha_cpu.style.animation = 'none'
          }
          if (
            (result_maquina.ram_ocupada_gb / result_maquina.ram_total_gb) * 100 > 75
          ) {
            bolinha_ram.style.background = '#ff0000'
            bolinha_ram.style.animation = 'none'
          } else if (
            (result_maquina.ram_ocupada_gb / result_maquina.ram_total_gb) * 100 >
            50
          ) {
            bolinha_ram.style.background = '#ff9d00'
            bolinha_ram.style.animation = 'none'
          } else {
            bolinha_ram.style.background = '#2bff00'
            bolinha_ram.style.animation = 'none'
          }
          if (
            (result_maquina.memoria_disponivel_gb /
              result_maquina.disco_total_gb) *
            100 >
            80
          ) {
            bolinha_disco.style.background = '#ff0000'
            bolinha_disco.style.animation = 'none'
          } else if (
            (result_maquina.memoria_disponivel_gb /
              result_maquina.disco_total_gb) *
            100 >
            50
          ) {
            bolinha_disco.style.background = '#ff9d00'
            bolinha_disco.style.animation = 'none'
          } else {
            bolinha_disco.style.background = '#2bff00'
            bolinha_disco.style.animation = 'none'
          }
        } else {
          bolinha_cpu.style.background = '##d2d2d2'
          bolinha_ram.style.background = '##d2d2d2'
          bolinha_disco.style.background = '##d2d2d2'
          status.innerHTML = 'Desligado'
          pc.style.color = 'black'
          pc.style.animation = 'none'
          bolinha_disco.style.background = '#d2d2d2'
          bolinha_disco.style.animation = 'none'
          bolinha_ram.style.background = '#d2d2d2'
          bolinha_ram.style.animation = 'none'
          bolinha_cpu.style.background = '#d2d2d2'
          bolinha_cpu.style.animation = 'none'
        }
      })
    })
  })
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
                <div class="icon-trash1" onclick="deletarMaquina(${maquinas.maquina_id}); event.stopPropagation(); event.preventDefault();"></div>
                <div onclick="event.stopPropagation(); event.preventDefault();" class="icon-pencil"></div>
            </div>
           <div id="maquina_${maquinas.maquina_id}" class="icon-laptop1"></div>
        </div>
          <div class="descricao-laptop">
            <div class="descricao-titulo">
              <p>Modelo: ${maquinas.modelo_maquina}</p>
              <p>Nome: ${maquinas.nome_maquina}</p>
              <p id = "user${maquinas.maquina_id}"></p>
              <p>Status: <strong id="status_maquina${maquinas.maquina_id}"></strong></p>
            </div>
            <div class="descricao-status">
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-cpu${maquinas.maquina_id}"></div>
                <p>CPU</p>
              </div>
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-disco${maquinas.maquina_id}"></div>
                <p>Disco</p>
              </div>
              <div class="descricao-componenete">
                <div class="bolinha" id="icone-ram${maquinas.maquina_id}"></div>
                <p>Ram</p>
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

function deletarMaquina(id_maquina) {
  fetch(`/dashboard/deletar_maquina/${id_maquina}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    if (resposta.ok) {
      location.reload();
    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}

let intervalo
let id_maquina_pesquisa

function atualizar_grafico_tempo_real(id_maquina) {
  let dadoGraficoCpu = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  let dadoGraficoRam = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
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
              myChartCpu.data.labels = label
              myChartRam.data.labels = label
              nome_usuario_maquina.innerHTML = `Monitoramento em tempo real da máquina de ${informacoes[0].nome_funcionario}`
              dadoGraficoRam.shift()
              dadoGraficoRam.push(informacoes[0].ram_ocupada_gb)
              myChartRam.options.scales.y.max = informacoes[0].ram_total_gb
              ;
              myChartRam.data.datasets[0].data = dadoGraficoRam
              myChartRam.update()

              dadoGraficoCpu.shift()
              dadoGraficoCpu.push(informacoes[0].cpu_ocupada * 2)
              myChartCpu.data.datasets[0].data = dadoGraficoCpu
              myChartCpu.update()

              if (dadosGraficoDisco[0] == 0 || dadosGraficoDisco[1] == 0) {
                dadosGraficoDisco[0] = informacoes[0].disco_ocupado_gb
                dadosGraficoDisco[1] = informacoes[0].memoria_disponivel_gb
                myChartDisco.data.datasets[0].data = dadosGraficoDisco
                myChartDisco.update()
              }
            } else {
              nome_usuario_maquina.innerHTML = `A máquina associada ao usuário ${informacoes[0].nome_funcionario}  está inativa.`
              dadoGraficoCpu = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
              dadoGraficoRam = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
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
          dados[0].cpu_ocupada_10_12,
          dados[0].cpu_ocupada_08_10,
          dados[0].cpu_ocupada_12_14,
          dados[0].cpu_ocupada_14_16,
          dados[0].cpu_ocupada_16_18
        ]
        myChartCpu.update()
        myChartRam.data.datasets[0].data = [
          dados[0].ram_ocupada_08_10,
          dados[0].ram_ocupada_10_12,
          dados[0].ram_ocupada_12_14,
          dados[0].ram_ocupada_14_16,
          dados[0].ram_ocupada_16_18
        ]
        myChartRam.update()
        myChartDisco.data.datasets[0].data = [
          dados[0].disco_ocupado_gb,
          dados[0].memoria_disponivel_gb
        ]
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
  let amostragem = document.getElementById('amostragem')
  let detalhes = document.getElementById('detathes');


  if (interuptor == 1) {
    amostragem.style.width = '100%'
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
    amostragem.style.width = '100%'
    amostragem.style.marginRight = '0%'
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
let elementoSelecionado = null;

function cardSelecionado(id_maquina) {
  const id = document.getElementById(`${id_maquina}`);

  if (elementoSelecionado !== null) {
    elementoSelecionado.style.background = "";
  }

  if (id.style.background === "") {
    id.style.background = "rgb(223, 227, 230)";
    elementoSelecionado = id;
  } else {
    id.style.background = "";
    elementoSelecionado = null;
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

const label = [
  '0s',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  '60s'
]

const label_hist = ['08 ás 10', '10 ás 12', '12 ás 14', '14 ás 16', '16 ás 18']

const data = {
  labels: label,
  datasets: [
    {
      label: 'My First Dataset',
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      hoverOffset: 4,
      pointRadius: 0,
      backgroundColorColor: 'black',
      borderWidth: 1.5
    }
  ]
}

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 1,
        max: 100
      }
    },
    elements: {
      line: {
        tension: 0
      }
    },
    // Definindo a cor de fundo do gráfico
    backgroundColor: 'rgba(0, 0, 0, 0.1)' // Ajuste o último valor para mudar a transparência (0 é completamente transparente, 1 é completamente opaco)
  }
}

const data1 = {
  labels: label,
  datasets: [
    {
      label: 'Uso de Memória RAM',
      fill: true,
      backgroundColor: 'rgba(000, 99, 132, 0.5)',
      borderColor: 'rgba(000, 99, 132, 1)',
      borderWidth: 1,
      pointRadius: 0, // Definindo o tamanho do ponto como zero
      hoverOffset: 4,
      borderWidth: 1.5

    }
  ]
}

const config1 = {
  type: 'line',
  data: data1,
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 5
      }
    },
    elements: {
      line: {
        tension: 0
      }
    }
  }
}
const data2 = {
  labels: ['Livre', 'Ocupado'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [],
      backgroundColor: ['green', 'red'],
      hoverOffset: 4
    }
  ]
}
const config2 = {
  type: 'pie',
  data: data2
}
