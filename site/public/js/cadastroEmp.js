
function cadastrar() {
    var nomeEmpVar = nomeEmp.value;
    var cnpjVar = cnpj.value;
    var emailEmpVar = emailEmp.value;
    var ufEmpVar = ufEmp.value;
    var municipioVar = municipioEmp.value;
    var cepVar = cepEmp.value;
    var bairroVar = bairroEmp.value;
    var ruaVar = ruaEmp.value;
    var numeroVar = numEmp.value;
    var complementoVar = complementoEmp.value;

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
            municipioServer: municipioVar,
            cepServer: cepVar,
            bairroServer: bairroVar,
            ruaServer: ruaVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar,
        }),
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                alert("Essa empresa já foi cadastrada")
            }
            return resposta.json();
        })
        .then(function (data) {
            console.log("Resposta do servidor:", data);
            window.onload();
            ocultarAdicionarUsuario()
            nomeEmp.value = ""
            cnpj.value = ""
            emailEmp.value = ""
            ufEmp.value = ""
            municipioEmp.value = ""
            cepEmp.value = ""
            bairroEmp.value = ""
            ruaEmp.value = ""
            numEmp.value = ""
            complementoEmp.value = "" // Talvez seja melhor chamar outra função aqui, dependendo do que você deseja fazer após o cadastro ser realizado com sucesso
        })
        .catch(function (erro) {
            window.onload();
            ocultarAdicionarUsuario()
            nomeEmp.value = ""
            cnpj.value = ""
            emailEmp.value = ""
            ufEmp.value = ""
            municipioEmp.value = ""
            cepEmp.value = ""
            bairroEmp.value = ""
            ruaEmp.value = ""
            numEmp.value = ""
            complementoEmp.value = ""// Talvez seja melhor chamar outra função aqui, dependendo do que você deseja fazer após o cadastro ser realizado com sucesso
        });
    return false; // Isso previne que o formulário seja submetido
}


function editarEmpresa(cnpjVar, nome, email, canal, token) {
    let nome_input = nome_empresa.value;
    let email_input = email_empresa.value;
    let canal_input = canal_empresa.value;
    let token_input = token_empresa.value;


    if (nome_empresa.value == "" & email_empresa.value == "") {
        alert("Preencha todos os campos!");
        return;
    }
    if (nome_input == "") {
        nome_input = nome
    }
    if (email_input == "") {
        email_input = email
    }
    if (canal_input = "") {
        canal_input = canal
    }
    if (token_input = "") {
        token_input = token
    }
    fetch("/cadastroEmpresa/editarEmpresa", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            nomeServer: nome_input,
            emailEmpServer: email_input,
            canalServer: canal_input,
            tokenServer: token_input,
            cnpj: cnpjVar,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Nome da empresa: ", data.nomeServer);
            console.log("Email da empresa: ", data.emailEmpServer);
            window.onload();
            nome_empresa.value = ""
            email_empresa.value = ""
            canal_empresa.value = ""
            token_empresa.value = ""
        })
        .catch((error) => {
            console.error('Error:', error);
            window.onload();
            nome_empresa.value = ""
            email_empresa.value = ""
            canal_empresa.value = ""
            token_empresa.value = ""
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
                <td><div class="icon-office"></div></td>
                <td>${empresa.nome_empresa}</td>
                <td>${empresa.email}</td>
                <td>
                    <div onclick="adicionarmaquina('${empresa.cnpj}', '${empresa.nome_empresa}', '${empresa.email}', '${empresa.canal_slack}', '${empresa.token_slack}')" class="icon-pencil"></div>
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
        .then(function (res) {
            console.log('Empresa deletada com sucesso');
            window.location.href = "";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function adicionarmaquina(cnpj, nome, email, canal, token) {
    let nome_empresa = document.getElementById('nome_empresa')
    let email_empresa = document.getElementById('email_empresa')
    let canal_empresa = document.getElementById('canal_empresa')
    let token_empresa = document.getElementById('token_empresa')

    nome_empresa.value = nome;
    email_empresa.value = email;
    canal_empresa.value = canal;
    token_empresa.value = token;
    
    document.getElementById('pop-add-maquinas').style.display = 'flex'
    document.querySelector('#pop-add-maquinas button').setAttribute('onclick', `editarEmpresa('${cnpj}', '${nome}', '${email}', '${canal}', '${token}')`)
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
