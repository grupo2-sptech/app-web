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

function alertaConfirma(message, ico) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: ico,
      iconColor: "#9FC131",
      title: message
    });
  }


  function popUpDelete(id_funcionario) {
    Swal.fire({
        title: "Você tem certeza que deseja excluir o funcionário?",
        text: "Você não poderá reverter esta ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!"
    }).then((result) => {
        if (result.isConfirmed) {
            excluirUsuario(id_funcionario).then(() => {
                Swal.fire({
                    title: "",
                    text: "O funcionário foi excluído.",
                    icon: "warning",
                    confirmButtonText: "OK"
                }).then(() => {
                    // Recarrega a página após clicar no botão "OK" do popup de sucesso
                    location.reload();
                });
            });
        }
    });
}