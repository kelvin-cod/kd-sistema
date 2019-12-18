const repository = require('../repository/produtos');

exports.criar = async (req, res) => {
    try {
        const resposta = await repository.criar(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.atualizar = async (req, res) => {
    try {
        const resposta = await repository.atualizar(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.listar = async (req, res) => {
    try {
        const resposta = await repository.listar(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.listarUm = async (req, res) => {
    try {
        const resposta = await repository.listarUm(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.excluirUm = async (req, res) => {
    try {
        await repository.atualizarUm(req, res);
        const resposta = await repository.excluirUm(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.pegarFornecedor= async (req, res) => {
    try {
        const resposta = await repository.pegarFornecedor(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

