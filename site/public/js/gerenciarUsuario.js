document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('botaoAdicionar').addEventListener('click', mostrarAdicionarUsuario);
    document.getElementById('botaoCancelar').addEventListener('click', ocultarAdicionarUsuario);
});


function mostrarAdicionarUsuario() {
    let divAdicionarUsuario = document.getElementById('adicionarUsuario');
    divAdicionarUsuario.style.display = "flex";

    let divGerenciarUsuario = document.getElementById('menuGerenciar');
    divGerenciarUsuario.style.filter = "blur(5px)";

    let divTitulo = document.getElementById('tituloGerenciar');
    divTitulo.style.filter = "blur(5px)";

    let menu = document.getElementById('menu');
    menu.style.filter = "blur(5px)";    
}

function ocultarAdicionarUsuario() {   
    let divAdicionarUsuario = document.getElementById('adicionarUsuario');
    divAdicionarUsuario.style.display = "none";
    
    let divGerenciarUsuario = document.getElementById('menuGerenciar');
    divGerenciarUsuario.style.filter = "blur(0px)";

    let divTitulo = document.getElementById('tituloGerenciar');
    divTitulo.style.filter = "blur(0px)";

    let menu = document.getElementById('menu');
    menu.style.filter = "blur(0px)";    
}



