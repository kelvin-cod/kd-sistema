exports.concluirVenda = async (req, res) => {
    const pd = req.body.Pedidos; // pega o numero do pedido
    const {
        idUsuario,
        idCliente,
        desconto,
        pedido_venda,
        total_venda,
        tipo_venda
    } = req.body; // pega valores do json

    const sql = `INSERT INTO Pedido(Numero_Pedido, Tipo_Pedido, Desconto, Valor_Total, idUsuario, idCliente) 
                  VALUES (?,?,?,?,?,?);`;
    const sql2 = `INSERT INTO ItemPedido(Observacao, Quantidade_item, SubTotal, idProduto, idPedido) 
                  VALUES (?,?,?,?,?);`;

    const response = await sequelize.transaction(t => {

            // chain all your queries here. make sure you return them.
            return sequelize.query(sql, {
                replacements: [pedido_venda, tipo_venda, desconto, total_venda, idUsuario, idCliente],
                type: sequelize.QueryTypes.INSERT
            }, {
                transaction: t
            }).then(venda => {

                for (let i = 0; i < pd.length; i++) {
                    sequelize.query(sql2, {
                        replacements: [pd[i].Obs, pd[i].Quantidade, pd[i].SubTotal, pd[i].idProduto, venda[0]],
                        type: sequelize.QueryTypes.INSERT
                    }), {
                        transaction: t
                    }
                }
            })
        })
        .then(res => {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            return res;

        }).catch(err => {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
            console.log(err);
            return err
        });
    return response;
}