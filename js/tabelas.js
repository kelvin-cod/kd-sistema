$.ajax({
    url: 'https://kd-gerenciador.herokuapp.com/vendas/trazer',
    // url: 'http://localhost:3000/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type

    success: function (response) {
        $("#Numero_pedido").val(response[0].ultimo);
    }
});