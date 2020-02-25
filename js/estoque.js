var idProduto;
$("#submit").click(function () {
    var obj = {
        Descricao: '',
        Valor: '',
        Quantidade: '',
        idFornecedor: 1,
        idCategoria: 1
    }

    obj.Descricao = $("#Descricao").val();
    obj.Valor = $("#Valor").val();

    var post_url = "http://localhost:3000/produtos/criar";
    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //
        $("#resposta").html(response);
        document.location.reload();

    });
});



function fazerRequisicao() {

    var url = 'http://localhost:3000/produtos/listar';

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'Http://localhost:3000/produtos/listar', false);

    xhttp.send(); //A execução do script pára aqui até a requisição retornar do servidor
    xhttp.onreadystatechange = (e) => {
        console.log(xhttp.responseText)
    }
    document.getElementById("resposta").innerHTML = xhttp.responseText;
}

$.ajax({
    url: 'http://localhost:3000/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type
    success: function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {


            trHTML +=
                '<tr><td>' + item.idProduto +
                '</td><td>' + item.Descricao +
                '</td><td>' + parseFloat(item.Valor).toFixed(2) +
                '</td><td>' + item.quantidade +
                '</td><td>' + item.categoria +
                '</td><td>' + item.nomeFornecedor +
                '</td><td>' +
                '<button type="button" onclick="teste(' + item.idProduto +
                ')"  class="btn btn-info" data-toggle="modal" data-target="#atualizarModal">Editar</button>' +
                '</td></tr>';
        });
        $('#tabelaProduto').append(trHTML);
    }

});

function teste(id) {
    idProduto = id
    return idProduto;
}

$("#atualizar").click(function () {
    var obj = {
        idProduto: '',
        Descricao: '',
        Valor: '',
        idFornecedor: 1,
        idCategoria: 1
    }
    obj.idProduto = idProduto;
    obj.Descricao = $("#DescricaoA").val();
    obj.Valor = $("#ValorA").val();

    var post_url = 'http://localhost:3000/produtos/atualizar/' + idProduto;
    $.ajax({
        url: post_url,
        type: 'PUT',
        data: obj
    }).done(function (response) { //
        $("#resposta").html(response);
        document.location.reload();

    });
});