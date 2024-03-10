document.addEventListener('DOMContentLoaded', function() {
    let elementoHeader = document.getElementById('header'); 
    let quantidadePixelsDoTopo = 10; 
    window.addEventListener('scroll', function () { // Escuta se a tela vai scrola ou não
        if (window.scrollY > quantidadePixelsDoTopo) {
            elementoHeader.classList.remove('changeStyle');
        } else {
            elementoHeader.classList.add('changeStyle');
        }
    });
});