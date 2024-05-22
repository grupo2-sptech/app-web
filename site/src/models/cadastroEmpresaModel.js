const { dadosEmpresa } = require("../controllers/cadastroEmpController");
var database = require("../database/config");


function listarEmpresa() {
    console.log("Buscando dados da empresa.");
    var instrucao = `
        SELECT nome_empresa, email, cnpj FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function autenticarEmpresa(cnpj) {
    console.log("Autenticando empresa com CNPJ:", cnpj);
    var instrucao = `
        SELECT nome_empresa, email, cnpj FROM empresa WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(nome, cnpj, email) {
    console.log("Cadastrando nova empresa com nome:", nome);
    var instrucao = `
        INSERT INTO empresa (nome_empresa, cnpj, email) VALUES ('${nome}', '${cnpj}', '${email}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function autenticarEndereco(cep) {
//     console.log("Autenticando endereço com CEP:", cep);
//     var instrucao = `
//         SELECT id_endereco, municipio, bairro, logradouro, numero, complemento, cep FROM endereco WHERE cep = '${cep}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function cadastrarEndereco(municipio, bairro, logradouro, numero, complemento, cep, fk_uf) {
    console.log("Cadastrando novo endereço com CEP:", cep);
    var instrucao = `
        INSERT INTO endereco (municipio, bairro, logradouro, numero, complemento, cep, fk_uf) VALUES ('${municipio}', '${bairro}', '${logradouro}', '${numero}', '${complemento}', '${cep}', '${fk_uf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function autenticarUF(sigla) {
//     console.log("Autenticando UF com sigla:", sigla);
//     var instrucao = `
//         SELECT id_uf, nome, sigla FROM uf WHERE sigla = '${sigla}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function cadastrarUF(nome, sigla) {
    console.log("Cadastrando nova UF com sigla:", sigla);
    var instrucao = `
        INSERT INTO uf (nome, sigla) VALUES ('${nome}', '${sigla}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarEmpresa(cnpj) {
    let query_empresa = `DELETE FROM empresa WHERE cnpj = ${cnpj};`

    console.log(query_empresa)
    return database.executar(query_empresa)

}


function editarEmpresa(cnpj ,nome, email) {
    let query_editar = `UPDATE empresa SET nome_empresa = '${nome}', email = '${email}' WHERE cnpj = '${cnpj}';`

    console.log(query_editar)
    return database.executar(query_editar)

}


module.exports = {
    listarEmpresa,
    autenticarEmpresa,
    cadastrarEmpresa,
    // autenticarEndereco,
    cadastrarEndereco,
    // autenticarUF,
    cadastrarUF,
    deletarEmpresa,
    editarEmpresa
};