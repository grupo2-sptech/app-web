/** @format */
let setor_id = sessionStorage.SETOR

let id_setor = [];

function listar(id_setor, id_select) {

  let select = document.getElementById(id_select);
  fetch(`/empresas/listar/${id_setor}`, {
    method: "GET",
    cache: 'no-store'
  })
    .then(function (resposta) {
      resposta.json().then((tabelas) => {
        tabelas.forEach((tabela) => {
          console.log(tabela)
          var option = document.createElement("option");
          option.value = tabela.setor_id == undefined ? tabela.maquina_id : tabela.setor_id;
          option.text = tabela.nome_funcionario == undefined ? tabela.nome_setor : tabela.nome_funcionario;
          select.appendChild(option);
        });
      });
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}






let interuptor = 1

function sumirMenu() {
  let menu = document.getElementById('menu')
  let dash = document.getElementById('tela_principal')
  let acao = document.querySelectorAll('.nome-acao');
  let ico = document.querySelectorAll('.ico');


  if (interuptor == 1) {
    menu.style.width = '10vw'
    dash.style.width = '90vw'
    dash.style.marginLeft = '10vw'
    acao.forEach(function (acao) {
      acao.style.display = 'block';
    })
    ico.forEach(function (ico) {
      ico.style.display = 'none';
    })
    interuptor = 0
  } else {
    menu.style.width = '5vw'
    dash.style.width = '95vw'
    dash.style.marginLeft = '5vw'
    acao.forEach(function (acao) {
      acao.style.display = 'none';
    })
    ico.forEach(function (ico) {
      ico.style.display = 'block';
    })
    interuptor = 1
  }
}

function mostrarAcao(id) {
  if (interuptor == 1) {
    var nome_acao = document.getElementById(id);
    if (nome_acao) {
      nome_acao.style.display = 'block';
    }
  }
}
function ocultarAcao(id) {
  if (interuptor == 1) {
    var nome_acao = document.getElementById(id);
    if (nome_acao) {
      nome_acao.style.display = 'none';
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
