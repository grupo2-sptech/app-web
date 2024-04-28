/** @format */

document.addEventListener('DOMContentLoaded', function () {
  let elementoHeader = document.getElementById('header')
  let quantidadePixelsDoTopo = 80
  window.addEventListener('scroll', function () {
    // Escuta se a tela vai scrola ou não
    if (window.scrollY > quantidadePixelsDoTopo) {
      elementoHeader.classList.add('changeStyle')
    } else {
      elementoHeader.classList.remove('changeStyle')
    }
  })
})

function abrirAtendimento() {
  containerAtendimento.style.display = `flex`

  Atendimento.innerHTML = `
<iframe width='500' height='620'
src='https://app.pipefy.com/public/form/fQkn3YmF?embedded=true'
frameborder='0'
></iframe>`

  fecharAbaAtendimento.classList.add('fecharAbaAtendimento')
  header.classList.add('blur')
  home.classList.add('blur')
  nossosprodutos.classList.add('blur')
  sobrenos.classList.add('blur')
  footer.classList.add('blur')
}

function fecharAtendimento() {
  containerAtendimento.style.display = `none`

  fecharAbaAtendimento.classList.add('fecharAbaAtendimento')
  header.classList.remove('blur')
  home.classList.remove('blur')
  nossosprodutos.classList.remove('blur')
  sobrenos.classList.remove('blur')
  footer.classList.remove('blur')
}
