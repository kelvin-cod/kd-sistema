var Produtos = [];
var Comanda = {
    idProduto: 0,
    Descricao: "",
    Obs: "",
    Valor_venda: 0,
    Quantidade: 0,
    SubTotal: 0
};
var quantidade = 0;
var soma = 0;
var valor = 0;
var idProduto = 0;
var Pedidos = [];
var Quantidade_total = 0;
var Total = 0;
$.ajax({
    url: 'https://kd-gerenciador.herokuapp.com/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type
}).done(function (response) { //

    var selectbox = $('#Produto_vendas');
    var selectbox2 = $('#Valor_vendas');
    //selectbox.find('option').remove();


    response = response.sort(function compare(a, b) {
        if (a.Descricao < b.Descricao) return -1;
        if (a.Descricao > b.Descricao) return 1;
        return 0;
    })

    Produtos = response
    $.each(response, function (i, d) {
        $('<option>').val(d.idProduto).text(d.Descricao).appendTo(selectbox);
        $('<option>').val(d.idProduto).text(d.Valor_Venda).appendTo(selectbox2);
    });

});


$('#Produto_vendas').change(function () {
    idProduto = ($(this).val());


    $("#Valor_vendas").val(($(this).val()));
    quantidade = parseFloat($("#Quantidade_vendas").val());
    valor = parseFloat($("#Valor_vendas :selected").text());
    soma = (quantidade * valor).toFixed(2)

    $("#Subtotal_vendas").val(soma)
});



$('#Quantidade_vendas').change(function () {

    quantidade = $("#Quantidade_vendas").val();
    valor = parseFloat($("#Valor_vendas :selected").text());
    soma = (quantidade * valor).toFixed(2);
    $("#Subtotal_vendas").val(soma);
});

var trHTML = '';
$('#Add_item').click(function () {

    if ($('#Produto_vendas  :selected').text() == "") {
        return alert("Selecione um Item");
    }
    Comanda.idProduto = parseInt(idProduto);
    Comanda.Descricao = $('#Produto_vendas  :selected').text();
    Comanda.Obs = $('#Obs_vendas').val();
    Comanda.Valor_venda = valor;
    Comanda.Quantidade = parseInt(quantidade);
    Comanda.SubTotal = soma;
    Pedidos.push(Comanda);
    Total += parseFloat(soma)
    Quantidade_total += parseInt(quantidade);

    salvar(Comanda);
    Comanda = new Object();

    console.log(Pedidos);

    $('#Produto_vendas').val("");
    $('#Quantidade_vendas').val(1);
    $("#Valor_vendas").val("");
    $("#Subtotal_vendas").val("");
    $("#Total_vendas").val(Total.toFixed(2));
    $("#Quantidade_total").val(Quantidade_total);
});

function salvar(item) {
    trHTML =
        '<tr></tr><td>' + item.idProduto +
        '</td><td>' + item.Descricao +
        '</td><td>' + item.Obs +
        '</td><td>' + parseFloat(item.Valor_venda).toFixed(2) +
        '</td><td>' + item.Quantidade +
        '</td><td>' + item.SubTotal +
        '</td><td><div class="table-data-feature">' +
        '<p class="item" data-toggle="tooltip" data-placement="top" title="Edit">' +
        '<i class="zmdi zmdi-edit"></i>' +
        '</p></div></td>' +
        '<td> <div class="table-data-feature"><p class="item" data-toggle="tooltip" data-placement="top" title="Delete">' +
        '<i class="zmdi zmdi-delete"></i>' +
        '</p> </div></td>' +
        '</tr>';
    return $('#TabelaComanda').append(trHTML);
}

function editar(id) {

}