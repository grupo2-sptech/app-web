/** @format */

let interuptor = 1

function sumirMenu() {
  let menu = document.getElementById('menu')
  let dash = document.getElementById('tela_principal')
  let itens_menu = document.getElementById('itens_menu')
  let seta = document.getElementById('seta')
  let logo = document.getElementById('logotipo')

  if (interuptor == 0) {
    menu.style.width = '20vw'
    dash.style.width = '80vw'
    dash.style.marginLeft = '20vw'
    itens_menu.style.display = 'flex'
    seta.style.rotate = '0deg'
    logo.style.display = 'block'
    interuptor = 1
  } else {
    menu.style.width = '5vw'
    dash.style.width = '95vw'
    dash.style.marginLeft = '5vw'
    itens_menu.style.display = 'none'
    logo.style.display = 'none'
    seta.style.rotate = '180deg'
    interuptor = 0
  }
}

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
