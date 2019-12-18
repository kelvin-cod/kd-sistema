const sequelize = require('../db');
exports.pegaCat = async (req, res) => {

    const sql = 'SELECT C.idCategoria , C.Descricao FROM categoria as C;'
console.log(sql)

    const response = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    })

    return response;
}