
function cadastrar() {

    var nomeEmpVar = nomeEmp.value;
    var cnpjVar = cnpj.value;
    var emailEmpVar = emailEmp.value;
    var ufEmpVar = ufEmp.value;
    var ufSiglaVar = ufSiglaEmp.value;
    var cidadeVar = cidadeEmp.value;
    var municipioVar = municipioEmp.value;
    var cepVar = cepEmp.value;
    var bairroVar = bairroEmp.value;
    var ruaVar = ruaEmp.value;
    var numeroVar = numEmp.value;
    var complementoVar = complementoEmp.value;

    console.log(cnpjVar)
    console.log(emailEmpVar)


    fetch("/cadastroEmpresa/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeEmpVar,
            cnpjServer: cnpjVar,
            emailEmpServer: emailEmpVar,
            ufEmpServer: ufEmpVar,
            ufSiglaServer: ufSiglaVar,
            cidadeServer: cidadeVar,
            municipioServer: municipioVar,
            cepServer: cepVar,
            bairroServer: bairroVar,
            ruaServer: ruaVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                window.location.href = "";
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function editarEmpresa(cnpjVar) {
    fetch("/cadastroEmpresa/editarEmpresa", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            nomeServer: nomeEmpVar,
            emailEmpServer: emailEmpVar,
            cnpjServer: cnpjVar,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Nome da empresa: ", data.nomeServer);
            console.log("Email da empresa: ", data.emailEmpServer);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function listarEmpresa() {
    fetch("/cadastroEmpresa/listarEmpresa", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Empresas: ", data);
        
        // Seleciona o tbody da tabela onde os dados serão inseridos
        const tbody = document.querySelector("tbody");

        // Limpa o tbody antes de adicionar novos dados
        tbody.innerHTML = '';

        // Itera sobre os dados recebidos e cria as linhas da tabela
        data.forEach(empresa => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td></td>
                <td>${empresa.nome_empresa}</td>
                <td>${empresa.email}</td>
                <td>
                    <div onclick="adicionarmaquina('${empresa.cnpj}')" class="icon-pencil"></div>
                </td>
                <td>
                    <div onclick="adicionarmaquina3('${empresa.cnpj}')" class="icon-trash"></div>
                </td>
            `;

            // Adiciona a linha criada ao tbody
            tbody.appendChild(tr);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// function listarEmpresa() {
//     fetch("/cadastroEmpresa/listarEmpresa", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Empresas: ", data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }



function deletarEmpresa(cnpjVar) {
    fetch("/cadastroEmpresa/deletarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cnpj: cnpjVar
        }),
    })
        .then(function (res){
            console.log('Empresa deletada com sucesso');
            window.location.href = "";
            })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function adicionarmaquina(cnpj) {
    document.getElementById('pop-add-maquinas').style.display = 'flex'
    document.querySelector('#pop-add-delete button').setAttribute('onclick', `deletarEmpresa('${cnpj}')`)
    let lista = document.getElementById('deletar_maquina')
    let deletar = document.getElementById('lista-processos')
    // lista.style.display = 'none';
    // deletar.style.display = 'none';
    }

  
  function adicionarmaquina3(cnpj) {
    document.getElementById('pop-add-delete').style.display = 'flex'
    document.querySelector('#pop-add-delete button').setAttribute('onclick', `deletarEmpresa('${cnpj}')`)
    let lista = document.getElementById('deletar_maquina')
    let deletar = document.getElementById('lista-processos')
    

    // lista.style.display = 'none';
    // deletar.style.display = 'none';
  }


  function fechar_tela_maquina() {
    let add_maquina = document.getElementById('pop-add-maquinas')
    let lista = document.getElementById('deletar_maquina')
    let deletar = document.getElementById('lista-processos')

    add_maquina.style.display = 'none';
    lista.style.display = 'none';
    deletar.style.display = 'none';
}


function fechar_tela_delete() {
    let add_maquina = document.getElementById('pop-add-delete')
    let lista = document.getElementById('deletar_maquina')
    let deletar = document.getElementById('lista-processos')
    
    add_maquina.style.display = 'none';
    lista.style.display = 'none';
    deletar.style.display = 'none';
  }
