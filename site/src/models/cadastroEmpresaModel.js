var database = require("../database/config");

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

function autenticarEndereco(cep) {
    console.log("Autenticando endereço com CEP:", cep);
    var instrucao = `
        SELECT id_endereco, municipio, bairro, logradouro, numero, complemento, cep FROM endereco WHERE cep = '${cep}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEndereco(municipio, bairro, logradouro, numero, complemento, cep, fk_uf) {
    console.log("Cadastrando novo endereço com CEP:", cep);
    var instrucao = `
        INSERT INTO endereco (municipio, bairro, logradouro, numero, complemento, cep, fk_uf) VALUES ('${municipio}', '${bairro}', '${logradouro}', '${numero}', '${complemento}', '${cep}', '${fk_uf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarUF(sigla) {
    console.log("Autenticando UF com sigla:", sigla);
    var instrucao = `
        SELECT id_uf, nome, sigla FROM uf WHERE sigla = '${sigla}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUF(nome, sigla) {
    console.log("Cadastrando nova UF com sigla:", sigla);
    var instrucao = `
        INSERT INTO uf (nome, sigla) VALUES ('${nome}', '${sigla}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarEmpresa(cnpj) {
    console.log("Iniciando processo de deleção para empresa com CNPJ:", cnpj);

    var instrucao = `
        SELECT fk_endereco FROM empresa WHERE cnpj = '${cnpj}';
    `;
    database.executar(instrucao).then(resultado => {
        if (resultado.length > 0) {
            var id_endereco = resultado[0].fk_endereco;

            var instrucaoUF = `
                SELECT fk_uf FROM endereco WHERE id_endereco = ${id_endereco};
            `;
            database.executar(instrucaoUF).then(resultadoUF => {
                if (resultadoUF.length > 0) {
                    var fk_uf = resultadoUF[0].fk_uf;

                    var instrucaoDeleteEmpresa = `
                        DELETE FROM empresa WHERE cnpj = '${cnpj}';
                    `;
                    database.executar(instrucaoDeleteEmpresa).then(() => {
                        console.log("Empresa deletada.");


                        var instrucaoDeleteEndereco = `
                            DELETE FROM endereco WHERE id_endereco = ${id_endereco};
                        `;
                        database.executar(instrucaoDeleteEndereco).then(() => {
                            console.log("Endereço associado deletado.");

                            var instrucaoCheckUF = `
                                SELECT * FROM endereco WHERE fk_uf = ${fk_uf};
                            `;
                            database.executar(instrucaoCheckUF).then(resultadoCheckUF => {
                                if (resultadoCheckUF.length === 0) {
                                    var instrucaoDeleteUF = `
                                        DELETE FROM uf WHERE id_uf = ${fk_uf};
                                    `;
                                    database.executar(instrucaoDeleteUF).then(() => {
                                        console.log("UF associada deletada.");
                                    }).catch(erro => console.error("Erro ao deletar UF:", erro));
                                }
                            }).catch(erro => console.error("Erro ao verificar outras UFs:", erro));
                        }).catch(erro => console.error("Erro ao deletar endereço:", erro));
                    }).catch(erro => console.error("Erro ao deletar empresa:", erro));
                }
            }).catch(erro => console.error("Erro ao buscar UF do endereço:", erro));
        } else {
            console.log("Empresa não encontrada.");
        }
    }).catch(erro => console.error("Erro ao buscar empresa:", erro));
}

module.exports = {
    autenticarEmpresa,
    cadastrarEmpresa,
    autenticarEndereco,
    cadastrarEndereco,
    autenticarUF,
    cadastrarUF,
    deletarEmpresa
};