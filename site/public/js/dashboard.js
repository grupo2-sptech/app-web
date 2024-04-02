/** @format */
let setor_id = sessionStorage.SETOR

let id_setor = []

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
            option.value = tabela.funcionario_id
            option.text = tabela.nome_funcionario
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

function atualizar_maquina_tempo_real(id_maquina, id_bolinha_cpu, id_bolinha_ram, id_bolinha_disco) {


  fetch(`/dashboard/cap_dados/${id_maquina}`, {
    method: 'GET',
    cache: 'no-store'
  }).then(function (resposta) {

    resposta.json().then(result => {
      result.forEach(result_maquina => {
        let bolinha_cpu = document.getElementById(`${id_bolinha_cpu}`)
        let bolinha_ram = document.getElementById(`${id_bolinha_ram}`)
        let bolinha_disco = document.getElementById(`${id_bolinha_disco}`)
        console.log(result)
        debugger
        if (result_maquina.cpu_ocupada > 80) {
          bolinha_cpu.style.background = '#ff0000'
          bolinha_cpu.style.animation = 'piscar 1s infinite'
        } else if (result_maquina.cpu_ocupada > 50) {
          bolinha_cpu.style.background = '#ff9d00'
          bolinha_cpu.style.animation = 'none'
        } else {
          bolinha_cpu.style.background = '#2bff00'
          bolinha_cpu.style.animation = 'none'
        }

        if (result_maquina.ram_ocupada_gb / result_maquina.ram_total_gb * 100 > 80) {
          bolinha_ram.style.background = '#ff0000';
          bolinha_ram.style.animation = 'piscar 1s infinite'
        } else if (result_maquina.ram_ocupada_gb / result_maquina.ram_total_gb * 100 > 50) {
          bolinha_ram.style.background = '#ff9d00';
          bolinha_ram.style.animation = 'none'
        } else {
          bolinha_ram.style.background = '#2bff00';
          bolinha_ram.style.animation = 'none'
        }
        if (result.disco_ocupado_gb / result_maquina.memoria_disponivel_gb * 100 > 80) {
          bolinha_disco.style.background = '#ff0000';
          bolinha_disco.style.animation = 'piscar 1s infinite'
        } else if (result.disco_ocupado_gb / result_maquina.memoria_disponivel_gb * 100 > 50) {
          bolinha_disco.style.background = '#ff9d00';
          bolinha_disco.style.animation = 'none'
        } else {
          bolinha_disco.style.background = '#2bff00';
          bolinha_disco.style.animation = 'none'
        }

      })
    })
  })
}

let interuptor = 1

function sumirMenu() {
  let menu = document.getElementById('menu')
  let dash = document.getElementById('tela_principal')
  let acao = document.querySelectorAll('.nome-acao')
  let ico = document.querySelectorAll('.ico')
  const amostragem = document.getElementById('amostragem')

  if (interuptor == 1) {
    amostragem.style.width = '95%'
    amostragem.style.marginRight = '4%'
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

/* let lista_maquina = [];
let lista_setor = [];

lista_maquina.forEach(function (select_maquina) {
  option.value = select_maquina[i];
  option.text = select_maquina[i];
  selectMaquina.appendChild(option);
}) */

/* lista_setor.forEach(function (select_setor) {
  option.value = select_setor[i];
  option.text = select_setor[i];
  selectSetor.appendChild(option);
}) */

const data = {
  labels: ['Grupo Cárdio'],
  datasets: [
    {
      data: [1, 2],
      label: 'My First Dataset',
      backgroundColor: ['red', '#ded9d9f0'],
      borderWidth: 0,
      hoverOffset: 4
    }
  ]
}

const config = {
  type: 'doughnut',
  data: data,
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    circumference: 210,
    rotation: 255
  }
}
