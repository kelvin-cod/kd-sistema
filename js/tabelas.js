$.ajax({
    url: 'https://kd-gerenciador.herokuapp.com/vendas/listar',
    // url: 'http://localhost:3000/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type

    success: function (response) {
        var tbHTML = '';
        objCategoria = {};
        let quantidade_total;
        $.each(response, function (i, item) {
            let data = new Date(item.data_venda);
            tbHTML +=
                '<tr><td>' + item.idPedido +
                '</td><td>' + item.Tipo_Pedido +
                '</td><td>' + item.Descricao +
                '</td><td>' + parseFloat(item.Desconto).toFixed(2) +
                '</td><td>' + item.Quantidade_item +
                '</td><td>' + item.Valor_Total +
                '</td><td>' + data.toLocaleString() +

                '</td><td>' + item.Cliente

            '</td></tr>';
        });
        $('#tabelaPedido').append(tbHTML);




    }
});