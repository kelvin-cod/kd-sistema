const repository = require('../repository/categorias');

exports.pegarCategoria = async (req, res) => {
    console.log('alo')
    try {
        const resposta = await repository.pegaCat(req, res);
        res.status(200).send(resposta);
    } catch (e) {
        res.status(500).send(e.message);
    }
}