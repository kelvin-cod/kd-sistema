const sequelize = require('../db');

exports.listar = async (req, res) => {
    const sql = `SELECT P.*, C.descricao as 'categoria', F.nome  as 'nomeFornecedor'               
                 FROM produto as P 
                 INNER JOIN Categoria as C ON C.idCategoria = P.idCategoria 
                 INNER JOIN Fornecedor as F on F.idFornecedor = P.idFornecedor;`;

    const response = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    })
    return response;
}

exports.criar = async (req, res) => {

    const {
        Descricao,
        Valor,
        idFornecedor,
        idCategoria
    } = req.body;

    const sql = `INSERT INTO produto
                (Descricao,Valor,idFornecedor, idCategoria)
                VALUES (?, ?, ?, ?);`;

    const response = await sequelize.query(sql, {
        replacements: [Descricao, Valor, idFornecedor, idCategoria],
        type: sequelize.QueryTypes.INSERT
    })
    return response;
}
exports.atualizar = async (req, res) => {
 

    console.log(req.body)
    const {
        idProduto ,
        Descricao,
        Valor,
        idFornecedor,
        idCategoria
    } = req.body;

    const sql = `UPDATE produto SET Descricao= ?, Valor= ?, idFornecedor= ?, idCategoria= ?
    WHERE idProduto= ${idProduto};`;


    const response = await sequelize.query(sql, {
        replacements: [Descricao, Valor, idFornecedor, idCategoria],
        type: sequelize.QueryTypes.UPDATE
    })

    return response;
}