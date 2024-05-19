
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


    fetch("/cadastroEmpresa/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeEmpVar,
            cpnjServer: cnpjVar,
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

// function listar() {
//     fetch("/empresas/listar", {
//         method: "GET",
//     })
//         .then(function (resposta) {
//             resposta.json().then((empresas) => {
//                 empresas.forEach((empresa) => {
//                     listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
//                 });
//             });
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });
// }