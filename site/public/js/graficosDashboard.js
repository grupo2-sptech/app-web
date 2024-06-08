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
        max: 100,
        min: 0
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
        max: 100,
        min: 0
      }
    },
    elements: {
      line: {
        tension: 0
      }
    }
  }
}

const data3 = {

  datasets: [
    {
      label: 'Quantidade de ',
      fill: true,
      backgroundColor: '#2e4959',
      borderColor: 'black'
    }
  ]
}


const config3 = {
  type: 'bar',
  data: data3,
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: false,
          text: 'Quantidade de encerramentos no dia',
          font: {
            size: 13
          }
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categorias',
          font: {
            size: 13
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0
      }
    }
  }
};

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
