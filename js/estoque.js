var idProduto;
var combofornecedorNovo;
var combocategoriaNovo;
var user = JSON.parse(sessionStorage.user); // pega user do session
var objProdutos = {};
var objCategoria = {};
let idExcluirFornecedor;
/**----------------------------------------------------------------- */
$('#fornecedor').change(function () {
    combofornecedorNovo = $(this).val()
});

$('#categoria').change(function () {
    combocategoriaNovo = $(this).val();
});

/**----------------------------------------------------------------- */

function fazerRequisicaoUM(id) {

    //  var post_url = 'http://localhost:3000/produtos/listarum/' + id;
    var post_url = 'https://kd-gerenciador.herokuapp.com/produtos/listarum/' + id;

    const obj = {
        idProduto: id
    }

    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //

        $('#DescricaoA').val(response[0].Descricao);
        $('#ValorA').val(response[0].Valor_Venda);
        $('#fornecedorum option[value= ' + response[0].idFornecedor + ' ]').attr('selected', 'selected');
        $('#categoriaum option[value= ' + response[0].idCategoria + ' ]').attr('selected', 'selected');
    })
}
/* funçao traz combo*/
//var get_url = 'http://localhost:3000/categorias/listar';
//var get_url_fornecedor = 'http://localhost:3000/produtos/fornecedores';
//var get_url_fornecedor = 'https://kd-gerenciador.herokuapp.com/produtos/fornecedor';
var get_url_fornecedor = 'https://kd-gerenciador.herokuapp.com/fornecedores/listar';
let get_url = 'https://kd-gerenciador.herokuapp.com/categorias/listar';
var vet_ativo_categoria = [];
var vet_inativo_categoria = [];

$.ajax({
    url: get_url,
    type: 'GET'
}).done(function (response) { //

    var selectbox = $('#categoria');

    selectbox.find('option').remove();
    objCategoria = response;
    $.each(response, function (i, d) {
        $('<option>').val(d.idCategoria).text(d.Descricao).appendTo(selectbox);

    });

    poupulaTabelaCategoria(response);
    //popula a tabela
    esconderInativos("tabelaCategoria", "hide", 2);

});

function esconderInativos(id_tabela, tipo, coluna) {
    let table = $(`#${id_tabela}`);
    //lembra que tabela começa com 0
    if (tipo == "hide") {
        table.find('tr').next('tr').each(function () {
            if ($(this).find('td').eq(coluna).text() == "Inativo") {
                $(this).css({
                    color: "#FF0000"
                });
                $(this).hide();
            } else {
                // $(this).find('td').eq(0).text(++i);      
            }
        });
    } else if (tipo == "show") {
        table.find('tr').next('tr').each(function () {
            if ($(this).find('td').eq(coluna).text() == "Inativo") {
                $(this).show();
            } else {
                // $(this).find('td').eq(0).text(++i);      
            }
        });
    }
}

function poupulaTabelaCategoria(vetor) {
    let tblCategoria;
    $.each(vetor, function (i, item) {

        tblCategoria +=
            '<tr><td>' + item.idCategoria + '</td>' +
            '<td>' + item.Descricao + '</td>' +
            '<td>' + item.Status + '</td>' +
            '<td>' +
            '<button type="button" onclick="editarCategoria(' + item.idCategoria +
            ')"  class="btn btn-info " >' +
            '<i class="fas fa-pencil-alt"></i> ' +
            '</button>' +
            '</td></tr>';

        /* tblCategoria += '<td><button type="button" onclick="excluir(' + item.idCategoria + ',' + 2 +
             ')"  class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
             '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M68.37,6.88c-0.63156,0.08063 -1.22281,0.34938 -1.72,0.7525l-24.1875,19.8875h-14.9425c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.63937,0.30906 -2.82187,1.76031 -2.795,3.44v13.76c0,1.89469 1.54531,3.44 3.44,3.44h0.645l10.105,54.18c-0.06719,0.71219 0.08063,1.42438 0.43,2.0425l4.6225,24.725c-0.02687,0.55094 0.08063,1.11531 0.3225,1.6125l2.4725,13.33c0,0.04031 0,0.06719 0,0.1075c1.69313,8.00875 8.65375,14.0825 16.8775,14.0825h46.01c8.19688,0 15.53375,-5.97969 16.8775,-14.19c0,-0.04031 0,-0.06719 0,-0.1075l2.4725,-13.2225c0,-0.04031 0,-0.06719 0,-0.1075l0.1075,-0.215c0.16125,-0.44344 0.24188,-0.92719 0.215,-1.3975l4.6225,-24.51c0.40313,-0.68531 0.55094,-1.47812 0.43,-2.2575l10.105,-54.0725h0.645c1.89469,0 3.44,-1.54531 3.44,-3.44v-13.76c0,-1.89469 -1.54531,-3.44 -3.44,-3.44h-10.32l-22.4675,-16.0175c-0.61812,-0.47031 -1.38406,-0.65844 -2.15,-0.5375c-0.18812,0.05375 -0.36281,0.12094 -0.5375,0.215l-22.0375,9.46l-16.0175,-13.0075c-0.72562,-0.59125 -1.65281,-0.86 -2.58,-0.7525zM68.8,14.7275l15.8025,12.7925h-31.2825zM109.7575,16.985l14.835,10.535h-29.1325l-3.5475,-2.9025zM30.96,34.4h110.08v6.88h-30.2075c-0.34937,-0.09406 -0.71219,-0.13437 -1.075,-0.1075c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075h-36.8725c-0.25531,-0.02687 -0.49719,-0.02687 -0.7525,0h-40.85zM42.785,48.16h10.75l-5.375,5.375zM63.425,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM80.625,48.16h10.75l-5.375,5.375zM101.265,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM118.465,48.16h10.75l-5.375,5.375zM35.5825,50.8475l7.6325,7.6325l-5.16,5.2675zM136.4175,50.8475l-2.365,13.0075l-5.2675,-5.375zM48.16,63.3175l14.0825,14.0825l-14.0825,14.0825l-5.4825,-5.4825c-0.16125,-0.16125 -0.34937,-0.30906 -0.5375,-0.43l-2.58,-13.6525zM86,63.425l14.0825,13.975l-14.0825,14.0825l-13.975,-14.0825zM123.84,63.425l8.6,8.4925l-2.4725,13.545c-0.24187,0.14781 -0.45687,0.33594 -0.645,0.5375l-5.4825,5.4825l-14.0825,-14.0825zM67.08,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM104.92,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM48.16,101.1575l14.0825,14.0825l-12.255,12.255l-4.4075,-23.7575zM86,101.1575l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM123.84,101.1575l2.58,2.58l-4.4075,23.7575l-12.255,-12.255zM67.08,120.0775l14.0825,14.0825l-12.3625,12.3625l-14.0825,-14.0825zM104.92,120.0775l12.3625,12.3625l-14.0825,14.0825l-12.3625,-12.3625zM86,138.9975l12.3625,12.3625h-24.725zM52.3525,139.75l11.61,11.61h-0.9675c-4.85094,0 -9.04344,-3.53406 -10.105,-8.6zM119.6475,139.75l-0.5375,3.01c0,0.04031 0,0.06719 0,0.1075c-0.76594,4.81063 -5.25406,8.4925 -10.105,8.4925h-0.9675z"></path></g></g></svg>' +
             '</button></td></tr>'; */

    });
    $('#tabelaCategoria').append(tblCategoria);
} //final populatalbela

/*( função pegar fornecedor*/

var selectbox4 = $('#fornecedor');
var selectbox5 = $('#fornecedorum');
var objFornecedor
$.ajax({
    url: get_url_fornecedor,
    type: 'GET',
}).done(function (response) { //

    let tblFornecedor;
    selectbox4.find('option').remove();
    selectbox5.find('option').remove();
    $.each(response, function (i, d) {


        $('<option>').val(d.idFornecedor).text(d.nomeFornecedor).appendTo(selectbox4);

        $('<option>').val(d.idFornecedor).text(d.nomeFornecedor).appendTo(selectbox5);

    });
    objFornecedor = response;
   
    //popula a tabela
    $.each(response, function (i, item) {

        tblFornecedor +=
            '<tr><td>' + item.idFornecedor +
            '</td><td>' + item.nomeFornecedor + '</td>' +
            '<td>' + item.Fantasia + '</td>' +

            '<td>' + item.Celular + '</td>' +
            '<td>' + item.Telefone + '</td>' +
            // '<td>' + item.Email_Representante + '</td>' +
            '<td>' + item.Estatus_Fornecedor + '</td>' +
            '<td>' +
            '<button type="button" onclick="editarFornecedor(' + item.idFornecedor +
            ')"  class="btn btn-info " >' +

            '<i class="fas fa-pencil-alt"></i> ' +
            '</button>' +
            '</td>' +
            /*
                        '<td><button type="button" onclick="excluir(' + item.idProduto + ',' + 3 +
                        ')"  class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M68.37,6.88c-0.63156,0.08063 -1.22281,0.34938 -1.72,0.7525l-24.1875,19.8875h-14.9425c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.63937,0.30906 -2.82187,1.76031 -2.795,3.44v13.76c0,1.89469 1.54531,3.44 3.44,3.44h0.645l10.105,54.18c-0.06719,0.71219 0.08063,1.42438 0.43,2.0425l4.6225,24.725c-0.02687,0.55094 0.08063,1.11531 0.3225,1.6125l2.4725,13.33c0,0.04031 0,0.06719 0,0.1075c1.69313,8.00875 8.65375,14.0825 16.8775,14.0825h46.01c8.19688,0 15.53375,-5.97969 16.8775,-14.19c0,-0.04031 0,-0.06719 0,-0.1075l2.4725,-13.2225c0,-0.04031 0,-0.06719 0,-0.1075l0.1075,-0.215c0.16125,-0.44344 0.24188,-0.92719 0.215,-1.3975l4.6225,-24.51c0.40313,-0.68531 0.55094,-1.47812 0.43,-2.2575l10.105,-54.0725h0.645c1.89469,0 3.44,-1.54531 3.44,-3.44v-13.76c0,-1.89469 -1.54531,-3.44 -3.44,-3.44h-10.32l-22.4675,-16.0175c-0.61812,-0.47031 -1.38406,-0.65844 -2.15,-0.5375c-0.18812,0.05375 -0.36281,0.12094 -0.5375,0.215l-22.0375,9.46l-16.0175,-13.0075c-0.72562,-0.59125 -1.65281,-0.86 -2.58,-0.7525zM68.8,14.7275l15.8025,12.7925h-31.2825zM109.7575,16.985l14.835,10.535h-29.1325l-3.5475,-2.9025zM30.96,34.4h110.08v6.88h-30.2075c-0.34937,-0.09406 -0.71219,-0.13437 -1.075,-0.1075c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075h-36.8725c-0.25531,-0.02687 -0.49719,-0.02687 -0.7525,0h-40.85zM42.785,48.16h10.75l-5.375,5.375zM63.425,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM80.625,48.16h10.75l-5.375,5.375zM101.265,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM118.465,48.16h10.75l-5.375,5.375zM35.5825,50.8475l7.6325,7.6325l-5.16,5.2675zM136.4175,50.8475l-2.365,13.0075l-5.2675,-5.375zM48.16,63.3175l14.0825,14.0825l-14.0825,14.0825l-5.4825,-5.4825c-0.16125,-0.16125 -0.34937,-0.30906 -0.5375,-0.43l-2.58,-13.6525zM86,63.425l14.0825,13.975l-14.0825,14.0825l-13.975,-14.0825zM123.84,63.425l8.6,8.4925l-2.4725,13.545c-0.24187,0.14781 -0.45687,0.33594 -0.645,0.5375l-5.4825,5.4825l-14.0825,-14.0825zM67.08,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM104.92,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM48.16,101.1575l14.0825,14.0825l-12.255,12.255l-4.4075,-23.7575zM86,101.1575l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM123.84,101.1575l2.58,2.58l-4.4075,23.7575l-12.255,-12.255zM67.08,120.0775l14.0825,14.0825l-12.3625,12.3625l-14.0825,-14.0825zM104.92,120.0775l12.3625,12.3625l-14.0825,14.0825l-12.3625,-12.3625zM86,138.9975l12.3625,12.3625h-24.725zM52.3525,139.75l11.61,11.61h-0.9675c-4.85094,0 -9.04344,-3.53406 -10.105,-8.6zM119.6475,139.75l-0.5375,3.01c0,0.04031 0,0.06719 0,0.1075c-0.76594,4.81063 -5.25406,8.4925 -10.105,8.4925h-0.9675z"></path></g></g></svg>' +
                        '</button></td>' +
            */
            '</tr>';

    });
    $('#tabelaFornecedor').append(tblFornecedor);
    esconderInativos("tabelaFornecedor", "hide", 5);
});

/* funçao traz combo*/
$.ajax({
    url: 'https://kd-gerenciador.herokuapp.com/produtos/listar',
    // url: 'http://localhost:3000/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type

    success: function (response) {
        var trHTML = '';
        let produto = "produto";
        /*Organiza o Arrya */
        response = response.sort(function compare(a, b) {
            if (a.idProduto < b.idProduto) return -1;
            if (a.idProduto > b.idProduto) return 1;
            return 0;
        })

        objProdutos = response; // atribui o obje de resposta
        //Popula a tabela com a respostas
        //console.log(objProdutos)

        $.each(response, function (i, item) {
            trHTML +=
                '<tr><td>' + item.idProduto + '</td>' +
                '<td>' + item.Descricao + '</td>' +
                '<td>' + parseFloat(item.Valor_Venda).toFixed(2) + '</td>'

            if (item.Estoque < 10) {
                trHTML += '<td class="bg-abaixo  ">' + item.Estoque + '</td>'
            } else {
                trHTML += '<td class="bg-acima  ">' + item.Estoque + '</td>'
            }

            trHTML += '<td>' + item.categoria +
                '</td><td>' + item.nomeFornecedor +
                '</td><td>' + item.Unidade_Medida + '</td>' +

                '<td>' +
                '<button type="button" onclick="editarProduto(' + item.idProduto +
                ')"  class="btn btn-info " >' +

                '<i class="fas fa-pencil-alt"></i> ' +
                '</button>' +
                '</td>' +

                '<td><button type="button" onclick="excluir(' + item.idProduto + ',' + 1 + ')" ' +
                'class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
                '<i class="fas fa-trash"></i>' +
                '</button></td>' +

                '</tr>';
        });
        $('#tabelaProduto').append(trHTML);



    }

});

function teste(id) {
    idProduto = id
    fazerRequisicaoUM(idProduto);
    return idProduto;
}
/**------------------------------------------------------------------------------------------------------------ */
function editarProduto(_id) {
    let produto;
    idProduto = _id;
    $("#botaoEnviar").html(''); //limpa div
    //seleciona no objteto o elemento da linha 
    $.each(objProdutos, function (i, item) {
        if (item.idProduto == _id) {
            produto = (item);
        }
    });


    $("#idProduto").val(produto.idProduto);
    $("#Descricao").val(produto.Descricao);
    $("#Valor_compra").val(parseFloat(produto.Valor_Compra).toFixed(2));
    $("#Valor_venda").val(parseFloat(produto.Valor_Venda).toFixed(2));
    $("#Quantidade").val(parseInt(produto.Estoque));
    $("#Tipo").val(produto.Tipo);
    $('#fornecedor option[value= ' + produto.idFornecedor + ']').attr('selected', 'selected');
    $('#categoria option[value= ' + produto.idCategoria + ' ]').attr('selected', 'selected');
    $('#Unidade_medida option[value= "' + produto.Unidade_Medida + '" ]').attr('selected', 'selected');

    let botao = '<button type="button" class="btn btn-success font-weight-bold ml-5"' +
        ' onclick="atualizarProduto()"  name="button">  ' +
        '  <i class = "fas fa-check"> </i> Atualizar </button>';

    $("#botaoEnviar").append(botao);
    $('#modal_Produto').modal('show');
    return idProduto;
}


var objexcluir = {
    idProduto: ''
};


function excluirSim() {
    // var post_url = "http://localhost:3000/produtos/excluirum/" + objexcluir.idProduto;

    $.ajax({
        url: post_url,
        type: 'POST',
        data: objexcluir
    }).done(function (response) { //

        objexcluir.idProduto = '';
        document.location.reload();

    });


}

function excluir(id, tipo) {
    objexcluir.idProduto = id;

    $('#modalExcluir').modal('show');

    switch (tipo) {
        case 1:
            let post_url = "https://kd-gerenciador.herokuapp.com/produtos/excluirum/";

            $("#modal-btn-sim").click(() => {
                $.ajax({
                    url: `${post_url + id}`,
                    type: 'POST',
                    data: objexcluir
                }).done(function (response) { //

                    objexcluir.idProduto = '';
                    document.location.reload();

                });
            })
            break;
        case 2:
            // let delete_url_categoria = "http://localhost:3000/categorias/excluir/";
            let delete_url_categoria = "https://kd-gerenciador.herokuapp.com/categorias/excluir/";
            $("#modal-btn-sim").click(() => {

                $.ajax({
                    url: `${delete_url_categoria  + id}`,
                    type: 'POST',
                    // data: objexcluir
                }).then(function (response) { //

                    //  objexcluir.idProduto = '';
                    document.location.reload();

                }).catch(function (err) {
                    alert(err)
                });
            })
            break;
        case 3:
            let delete_url_fornecedor = "https://kd-gerenciador.herokuapp.com/fornecedores/excluir/";
            $("#modal-btn-sim").click(() => {
                // console.log(`${delete_url_categoria  + id}`);

                $.ajax({
                    url: `${delete_url_fornecedor + id}`,
                    type: 'POST',
                    // data: objexcluir
                }).then(function (response) { //

                    //  objexcluir.idProduto = '';
                    // document.location.reload();

                }).catch(function (err) {
                    alert(err)
                });
            })
            break;
        default:
            break;
    }

}


function atualizarProduto() {

    var obj = {
        idProduto: 0,
        Descricao: '',
        Valor_compra: '',
        Valor_venda: '',
        Unidade_Medida: '',
        Quantidade: '',
        Tipo: '',
        Validade: '',
        idUsuario: '',
        idFornecedor: '',
        idCategoria: ''
    }

    obj.idProduto = idProduto;
    obj.Descricao = $("#Descricao").val();
    obj.Valor_compra = parseFloat($("#Valor_compra").val());
    obj.Valor_venda = parseFloat($("#Valor_venda").val());
    obj.Quantidade = parseInt($("#Quantidade").val());
    obj.Tipo = $("#Tipo").val();
    obj.Validade = $("#Validade").val();
    obj.Unidade_Medida = $("#Unidade_medida").val();
    obj.idUsuario = user.idUsuario;
    obj.idFornecedor = parseInt($("#fornecedor").val());
    obj.idCategoria = parseInt($("#categoria").val());

    // var post_url = 'http://localhost:3000/produtos/atualizar/' + idProduto;
    var post_url = 'https://kd-gerenciador.herokuapp.com/produtos/atualizar/' + idProduto;
    $.ajax({
        url: post_url,
        type: 'PUT',
        data: obj
    }).done(function (response) { //
        // $("#resposta").html(response);
        document.location.reload();
    });
};


/**----------------------------------------------------------------------------------/ */
//abre a modal para novo Produto
$("#produto_modal").click(() => {
    $("#botaoEnviar").html('');

    let botao = '<button type="button" class="btn btn-success ml-5"' +
        ' onclick="enviarProduto()"  name="button">  ' +
        '  <i class="fas fa-check"></i> Enviar </button>';

    $("#idProduto").val("");
    $("#Descricao").val("");
    $("#Valor_compra").val("");
    $("#Valor_venda").val("");
    $("#Quantidade").val("");
    $("#Tipo").val("");
    $("#Validade").val("");
    $('#fornecedor option[value= ' + 1 + ']').attr('selected', 'selected');
    $('#categoria option[value= ' + 1 + ' ]').attr('selected', 'selected');
    $('#Unidade_medida option[value= "' + 1 + '" ]').attr('selected', 'selected');
    $("#botaoEnviar").append(botao);
    $('#modal_Produto').modal('show');

})

/*--------------ENVIAR MODAL PRODUTO */
function enviarProduto() {

    var obj = {
        Descricao: '',
        Valor_compra: '',
        Valor_venda: '',
        Unidade_Medida: '',
        Quantidade: '',
        Tipo: '',
        idUsuario: '',
        idFornecedor: '',
        idCategoria: ''
    }

    obj.Descricao = $("#Descricao").val();
    obj.Valor_compra = parseFloat($("#Valor_compra").val());
    obj.Valor_venda = parseFloat($("#Valor_venda").val());
    obj.Quantidade = parseInt($("#Quantidade").val());
    obj.Tipo = $("#Tipo").val();
    obj.Unidade_Medida = $("#Unidade_medida").val();
    obj.idUsuario = user.idUsuario;
    obj.idFornecedor = parseInt($("#fornecedor").val());
    obj.idCategoria = parseInt($("#categoria").val());

    // var post_url = "http://localhost:3000/produtos/criar";
    var post_url = "https://kd-gerenciador.herokuapp.com/produtos/criar";
    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //
        document.location.reload();
    });
};
/*------------------------MODAL CATEGORIA*/

var idExcluirCategoria = 0;

function editarCategoria(_id) {
    let categoria;

    $("#botaoEnviarCategoria").html(''); //limpa div
    $("#checkboxCategoria").show();
    //seleciona no objteto o elemento da linha 
    $.each(objCategoria, function (i, item) {
        if (item.idCategoria == _id) {
            categoria = (item);
        }
    });

    idExcluirCategoria = categoria.idCategoria; //atribui valor para excluisão

    $("#idCategoria").val(categoria.idCategoria);
    $("#DescricaoCategoria").val(categoria.Descricao);
    $('#Estatus option[value= ' + categoria.Status + ' ]').attr('selected', 'selected');

    let botao = '<button type="button" class="btn btn-success font-weight-bold ml-5"' +
        ' onclick="atualizarCategoria(' + _id + ')"  name="button">  ' +
        '  <i class = "fas fa-check"> </i> Atualizar </button>';

    $("#botaoEnviarCategoria").append(botao);
    //  $("#checkboxCategoria").append(botaoexcluir);
    $('#modal_Categoria').modal('show', 'focus');

}

$("#excluir_Categoria").click(() => {

    $("#botao_excluir").html(""); //zera div

    let botaoExcluir = '<button type="button" class="btn btn-success font-weight-bold" id="modal-btn-sim" onclick="excluirCategoria()">Sim</button>';

    $("#modalExcluir").modal('show'); //abre modal

    $("#botao_excluir").append(botaoExcluir);
})

function excluirCategoria() {

    let delete_url_categoria = "https://kd-gerenciador.herokuapp.com/categorias/excluir/";

    $.ajax({
        url: `${delete_url_categoria + idExcluirCategoria}`,
        type: 'POST'

    }).then(function (response) { //

        document.location.reload();

    }).catch(function (err) {
        alert(err)
    });
} //função para excluir categoria

function abrirModalCat() {
    $("#botaoEnviarCategoria").html(''); //limpa div
    $("#checkboxCategoria").hide();

    let botao = '<button type="button" class="btn btn-success ml-5 font-weight-bold" onclick="enviarCategoria()">  ' +
        '  <i class="fas fa-check"></i> Enviar </button>';

    $("#DescricaoCategoria").val("");
    $("#idCategoria").val("");

    $("#botaoEnviarCategoria").append(botao);
    $('#modal_Categoria').modal('show');

}

function enviarCategoria() {

    var obj = {
        Descricao: '',
        Estatus: '',
        idUsuario: 0
    } //cria o objeto

    obj.Descricao = $("#DescricaoCategoria").val();
    obj.Estatus = $("#Estatus").val();
    obj.idUsuario = user.idUsuario;

    // var post_url = "http://localhost:3000/categorias/criar";
    var post_url = "https://kd-gerenciador.herokuapp.com/categorias/criar";
    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //
        document.location.reload();
    });
}

$("#inativosCategoria").click(() => {
    let checkbox_categoria = $("input[name='inativosCategoria']:checked").val();

    if (checkbox_categoria == true) {
        esconderInativos("tabelaCategoria", "show", 2);
    } else {
        esconderInativos("tabelaCategoria", "hide", 2);
    }

})

function atualizarCategoria(_id) {

    let obj = {
        idCategoria: 0,
        Descricao: '',
        Estatus: '',
        idUsuario: 0
    }

    obj.idCategoria = _id;
    obj.Descricao = $("#DescricaoCategoria").val();
    obj.Estatus = $("#Estatus").val();
    obj.idUsuario = user.idUsuario;

    // var post_url = 'http://localhost:3000/produtos/atualizar/' + idProduto;
    var post_url = 'https://kd-gerenciador.herokuapp.com/categorias/atualizar/' + _id;
    $.ajax({
        url: post_url,
        type: 'PUT',
        data: obj
    }).done(function (response) {

        document.location.reload();
    });
};
/*---------------------------------------------------------------------------------------------------*/

$("#fornecedor_modal").click(() => {
    $("#botaoEnviarFornecedor").html('');
    $("#checkboxFornecedor").hide(); //esconde botao excluir

    let botao = '<button type="button" class="btn btn-success ml-4 Font-weight-bold"' +
        ' onclick="enviarFornecedor()"  name="button">  ' +
        '  <i class="fas fa-check"></i> Enviar </button>';

    $("#razaoSocial").val("");
    $("#celular").val("");
    $("#telefone").val("");
    $("#email").val("");
    $("#represetante").val("");
    $("#fantasia").val("");

    //atribui botao a div no html
    $("#botaoEnviarFornecedor").append(botao);

    $('#modal_Fornecedor').modal('show');
});

function enviarFornecedor() {
    let post_url_fornecedor = "https://kd-gerenciador.herokuapp.com/fornecedores/criar";

    let objFornecedor = {
        razaoSocial: "",
        fantasia: "",
        telefone: "",
        celular: "",
        email: "",
        representante: "",
        idUsuario: 0
    }

    objFornecedor.razaoSocial = $("#razaoSocial").val();
    objFornecedor.representante = $("#representante").val();
    objFornecedor.celular = $("#celular").val();
    objFornecedor.telefone = $("#telefone").val();
    objFornecedor.email = $("#email").val();
    objFornecedor.fantasia = $("#fantasia").val();
    objFornecedor.idUsuario = user.idUsuario;
    //console.log(objFornecedor)

    $.ajax({
        url: post_url_fornecedor,
        type: 'POST',
        data: objFornecedor
    }).done(function (response) {

        document.location.reload();
    });
}

function editarFornecedor(_id) {
    let data;
    idFornecedor = _id;
    $("#botaoEnviarFornecedor").html(''); //limpa div
    $("#checkboxFornecedor").show(); //esconde botao excluir
    //seleciona no objteto o elemento da linha 
    $.each(objFornecedor, function (i, item) {
        if (item.idFornecedor == _id) {
            data = (item);
        }
    });
    idExcluirFornecedor = data.idFornecedor
    $("#razaoSocial").val(data.Razao);
    $("#representante").val(data.nomeFornecedor);
    $("#celular").val(data.Celular);
    $("#telefone").val(data.Telefone);
    $("#email").val(data.Email_Representante);
    $("#fantasia").val(data.Fantasia);
    $("#idFornecedor").val(data.idFornecedor);
    $('#statusFornecedor option[value= ' + data.Estatus_Fornecedor + ']').attr('selected', 'selected');

    let botao = '<button type="button" class="btn btn-success font-weight-bold ml-5"' +
        ' onclick="atualizarFornecedor(' + _id + ')"  name="button">  ' +
        '  <i class = "fas fa-check"> </i> Atualizar </button>';

    $("#botaoEnviarFornecedor").append(botao);
    $('#modal_Fornecedor').modal('show');
    return idCategoria;
}

function atualizarFornecedor(_id) {

    let objFornecedor = {
        razaoSocial: "",
        fantasia: "",
        telefone: "",
        celular: "",
        email: "",
        representante: "",
        EstatusFornecedor: "",
        idUsuario: 0
    }

    objFornecedor.razaoSocial = $("#razaoSocial").val();
    objFornecedor.representante = $("#representante").val();
    objFornecedor.celular = $("#celular").val();
    objFornecedor.telefone = $("#telefone").val();
    objFornecedor.email = $("#email").val();
    objFornecedor.fantasia = $("#fantasia").val();
    objFornecedor.EstatusFornecedor = $("#statusFornecedor").val();
    objFornecedor.idUsuario = user.idUsuario;

    //let put_url_fornecedor = 'http://localhost:3000/fornecedores/atualizar/' + _id;
    let put_url_fornecedor = 'https://kd-gerenciador.herokuapp.com/fornecedores/atualizar/' + _id;

    $.ajax({
        url: put_url_fornecedor,
        type: 'PUT',
        data: objFornecedor
    }).done(function (response) {

        document.location.reload();
    });
};

$("#inativosFornecedores").click(() => {
    let checkbox_fornecedor = $("input[name='inativosFornecedores']:checked").val();

    if (checkbox_fornecedor == true) {
        esconderInativos("tabelaFornecedor", "show", 5);
    } else {
        esconderInativos("tabelaFornecedor", "hide", 5);
    }

});

$('#excluir_Fornecedor').click(() => {
    $("#botao_excluir").html(""); //zera div

    let botaoExcluir = '<button type="button" class="btn btn-success font-weight-bold" id="modal-btn-sim" onclick="excluirFornecedor()">Sim</button>';

    $("#modalExcluir").modal('show'); //abre modal

    $("#botao_excluir").append(botaoExcluir);
});

function excluirFornecedor() {
    let delete_url_fornecedor = "https://kd-gerenciador.herokuapp.com/fornecedores/excluir/";

    $.ajax({
        url: `${delete_url_fornecedor + idExcluirFornecedor}`,
        type: 'POST'

    }).then(function (response) { //

        document.location.reload();

    }).catch(function (err) {
        alert(err)
    });
}