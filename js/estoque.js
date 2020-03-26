var idProduto;
var combofornecedorNovo;
var combocategoriaNovo;
var user = JSON.parse(sessionStorage.user); // pega user do session
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
//var get_url_fornecedor = 'http://localhost:3000/produtos/fornecedor';
var get_url_fornecedor = 'https://kd-gerenciador.herokuapp.com/produtos/fornecedor';
var get_url = 'https://kd-gerenciador.herokuapp.com/categorias/listar';

$.ajax({
    url: get_url,
    type: 'GET',
}).done(function (response) { //
    let tblCategoria;
    var selectbox = $('#categoria');
    var selectbox3 = $('#categoriaum');

    selectbox.find('option').remove();
    selectbox3.find('option').remove();

    $.each(response, function (i, d) {
        $('<option>').val(d.idCategoria).text(d.Descricao).appendTo(selectbox);
        $('<option>').val(d.idCategoria).text(d.Descricao).appendTo(selectbox3);

    });

    //popula a tabela
    $.each(response, function (i, item) {

        tblCategoria +=
            '<tr><td>' + item.idCategoria +
            '</td><td>' + item.Descricao +
            '</td><td>' + item.Status + '</td>' +
            '<td>' +
            '<button type="button" onclick="teste(' + item.idCategoria +
            ')"  class="btn btn-info " data-toggle="modal" data-target="#atualizarModal">' +

            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M123.195,6.88c-0.86,0 -1.78719,0.38969 -2.4725,1.075l-89.44,89.44c-0.34937,0.34938 -0.645,0.60469 -0.645,1.29l-23.435,61.92c-0.68531,1.03469 -0.28219,2.40531 0.7525,3.44c0.68531,0.68531 1.33031,1.075 2.365,1.075c0.34938,0 0.71219,0.02688 1.3975,-0.3225l61.92,-23.435c0.34938,-0.34937 1.04813,-0.29562 1.3975,-0.645l5.4825,-5.4825l83.5275,-83.635c0.68531,-1.03469 1.075,-1.76031 1.075,-2.795c0,-1.03469 -0.38969,-1.67969 -1.075,-2.365l-38.485,-38.485c-0.68531,-0.68531 -1.505,-1.075 -2.365,-1.075zM38.1625,100.405c1.72,3.44 1.04813,7.22938 -0.3225,10.32c-0.68531,1.37063 0.02688,3.18469 1.3975,3.87c1.37063,1.03469 3.05031,0.68531 4.085,0c2.40531,-1.72 11.35469,-5.87219 15.48,-1.3975c4.12531,4.12531 0.7525,12.72531 -0.9675,15.48c-1.03469,1.03469 -1.03469,2.71438 0,4.085c1.03469,1.03469 2.39188,1.74688 3.7625,1.3975c4.47469,-1.37062 7.91469,-0.68531 10.32,0l-1.3975,1.3975l-38.27,14.2975l-9.89,-10.2125l14.405,-37.84z"></path></g></g></svg>' +
            '</button>' +
            '</td>' +

            '<td><button type="button" onclick="excluir(' + item.idProduto +
            ')"  class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M68.37,6.88c-0.63156,0.08063 -1.22281,0.34938 -1.72,0.7525l-24.1875,19.8875h-14.9425c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.63937,0.30906 -2.82187,1.76031 -2.795,3.44v13.76c0,1.89469 1.54531,3.44 3.44,3.44h0.645l10.105,54.18c-0.06719,0.71219 0.08063,1.42438 0.43,2.0425l4.6225,24.725c-0.02687,0.55094 0.08063,1.11531 0.3225,1.6125l2.4725,13.33c0,0.04031 0,0.06719 0,0.1075c1.69313,8.00875 8.65375,14.0825 16.8775,14.0825h46.01c8.19688,0 15.53375,-5.97969 16.8775,-14.19c0,-0.04031 0,-0.06719 0,-0.1075l2.4725,-13.2225c0,-0.04031 0,-0.06719 0,-0.1075l0.1075,-0.215c0.16125,-0.44344 0.24188,-0.92719 0.215,-1.3975l4.6225,-24.51c0.40313,-0.68531 0.55094,-1.47812 0.43,-2.2575l10.105,-54.0725h0.645c1.89469,0 3.44,-1.54531 3.44,-3.44v-13.76c0,-1.89469 -1.54531,-3.44 -3.44,-3.44h-10.32l-22.4675,-16.0175c-0.61812,-0.47031 -1.38406,-0.65844 -2.15,-0.5375c-0.18812,0.05375 -0.36281,0.12094 -0.5375,0.215l-22.0375,9.46l-16.0175,-13.0075c-0.72562,-0.59125 -1.65281,-0.86 -2.58,-0.7525zM68.8,14.7275l15.8025,12.7925h-31.2825zM109.7575,16.985l14.835,10.535h-29.1325l-3.5475,-2.9025zM30.96,34.4h110.08v6.88h-30.2075c-0.34937,-0.09406 -0.71219,-0.13437 -1.075,-0.1075c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075h-36.8725c-0.25531,-0.02687 -0.49719,-0.02687 -0.7525,0h-40.85zM42.785,48.16h10.75l-5.375,5.375zM63.425,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM80.625,48.16h10.75l-5.375,5.375zM101.265,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM118.465,48.16h10.75l-5.375,5.375zM35.5825,50.8475l7.6325,7.6325l-5.16,5.2675zM136.4175,50.8475l-2.365,13.0075l-5.2675,-5.375zM48.16,63.3175l14.0825,14.0825l-14.0825,14.0825l-5.4825,-5.4825c-0.16125,-0.16125 -0.34937,-0.30906 -0.5375,-0.43l-2.58,-13.6525zM86,63.425l14.0825,13.975l-14.0825,14.0825l-13.975,-14.0825zM123.84,63.425l8.6,8.4925l-2.4725,13.545c-0.24187,0.14781 -0.45687,0.33594 -0.645,0.5375l-5.4825,5.4825l-14.0825,-14.0825zM67.08,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM104.92,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM48.16,101.1575l14.0825,14.0825l-12.255,12.255l-4.4075,-23.7575zM86,101.1575l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM123.84,101.1575l2.58,2.58l-4.4075,23.7575l-12.255,-12.255zM67.08,120.0775l14.0825,14.0825l-12.3625,12.3625l-14.0825,-14.0825zM104.92,120.0775l12.3625,12.3625l-14.0825,14.0825l-12.3625,-12.3625zM86,138.9975l12.3625,12.3625h-24.725zM52.3525,139.75l11.61,11.61h-0.9675c-4.85094,0 -9.04344,-3.53406 -10.105,-8.6zM119.6475,139.75l-0.5375,3.01c0,0.04031 0,0.06719 0,0.1075c-0.76594,4.81063 -5.25406,8.4925 -10.105,8.4925h-0.9675z"></path></g></g></svg>' +
            '</button></td>' +

            '</tr>';

    });
    $('#tabelaCategoria').append(tblCategoria);

});
/*( função pegar fornecedor*/

var selectbox4 = $('#fornecedor');
var selectbox5 = $('#fornecedorum');

$.ajax({
    url: get_url_fornecedor,
    type: 'GET',
}).done(function (response) { //
    console.log(response)
    let tblFornecedor;
    selectbox4.find('option').remove();
    selectbox5.find('option').remove();
    $.each(response, function (i, d) {

        $('<option>').val(d.idFornecedor).text(d.nomeFornecedor).appendTo(selectbox4);

        $('<option>').val(d.idFornecedor).text(d.nomeFornecedor).appendTo(selectbox5);

    });

    //popula a tabela
    $.each(response, function (i, item) {

        tblFornecedor +=
            '<tr><td>' + item.idFornecedor +
            '</td><td>' + item.nomeFornecedor + '</td>' +
            '<td>' + item.Fantasia + '</td>' +

            '<td>' + item.Celular + '</td>' +
            '<td>' + item.Telefone + '</td>' +
            '<td>' + item.Email_Representante + '</td>' +
            '<td>' +
            '<button type="button" onclick="teste(' + item.idFornecedor +
            ')"  class="btn btn-info " data-toggle="modal" data-target="#atualizarModal">' +

            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M123.195,6.88c-0.86,0 -1.78719,0.38969 -2.4725,1.075l-89.44,89.44c-0.34937,0.34938 -0.645,0.60469 -0.645,1.29l-23.435,61.92c-0.68531,1.03469 -0.28219,2.40531 0.7525,3.44c0.68531,0.68531 1.33031,1.075 2.365,1.075c0.34938,0 0.71219,0.02688 1.3975,-0.3225l61.92,-23.435c0.34938,-0.34937 1.04813,-0.29562 1.3975,-0.645l5.4825,-5.4825l83.5275,-83.635c0.68531,-1.03469 1.075,-1.76031 1.075,-2.795c0,-1.03469 -0.38969,-1.67969 -1.075,-2.365l-38.485,-38.485c-0.68531,-0.68531 -1.505,-1.075 -2.365,-1.075zM38.1625,100.405c1.72,3.44 1.04813,7.22938 -0.3225,10.32c-0.68531,1.37063 0.02688,3.18469 1.3975,3.87c1.37063,1.03469 3.05031,0.68531 4.085,0c2.40531,-1.72 11.35469,-5.87219 15.48,-1.3975c4.12531,4.12531 0.7525,12.72531 -0.9675,15.48c-1.03469,1.03469 -1.03469,2.71438 0,4.085c1.03469,1.03469 2.39188,1.74688 3.7625,1.3975c4.47469,-1.37062 7.91469,-0.68531 10.32,0l-1.3975,1.3975l-38.27,14.2975l-9.89,-10.2125l14.405,-37.84z"></path></g></g></svg>' +
            '</button>' +
            '</td>' +

            '<td><button type="button" onclick="excluir(' + item.idProduto +
            ')"  class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M68.37,6.88c-0.63156,0.08063 -1.22281,0.34938 -1.72,0.7525l-24.1875,19.8875h-14.9425c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.63937,0.30906 -2.82187,1.76031 -2.795,3.44v13.76c0,1.89469 1.54531,3.44 3.44,3.44h0.645l10.105,54.18c-0.06719,0.71219 0.08063,1.42438 0.43,2.0425l4.6225,24.725c-0.02687,0.55094 0.08063,1.11531 0.3225,1.6125l2.4725,13.33c0,0.04031 0,0.06719 0,0.1075c1.69313,8.00875 8.65375,14.0825 16.8775,14.0825h46.01c8.19688,0 15.53375,-5.97969 16.8775,-14.19c0,-0.04031 0,-0.06719 0,-0.1075l2.4725,-13.2225c0,-0.04031 0,-0.06719 0,-0.1075l0.1075,-0.215c0.16125,-0.44344 0.24188,-0.92719 0.215,-1.3975l4.6225,-24.51c0.40313,-0.68531 0.55094,-1.47812 0.43,-2.2575l10.105,-54.0725h0.645c1.89469,0 3.44,-1.54531 3.44,-3.44v-13.76c0,-1.89469 -1.54531,-3.44 -3.44,-3.44h-10.32l-22.4675,-16.0175c-0.61812,-0.47031 -1.38406,-0.65844 -2.15,-0.5375c-0.18812,0.05375 -0.36281,0.12094 -0.5375,0.215l-22.0375,9.46l-16.0175,-13.0075c-0.72562,-0.59125 -1.65281,-0.86 -2.58,-0.7525zM68.8,14.7275l15.8025,12.7925h-31.2825zM109.7575,16.985l14.835,10.535h-29.1325l-3.5475,-2.9025zM30.96,34.4h110.08v6.88h-30.2075c-0.34937,-0.09406 -0.71219,-0.13437 -1.075,-0.1075c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075h-36.8725c-0.25531,-0.02687 -0.49719,-0.02687 -0.7525,0h-40.85zM42.785,48.16h10.75l-5.375,5.375zM63.425,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM80.625,48.16h10.75l-5.375,5.375zM101.265,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM118.465,48.16h10.75l-5.375,5.375zM35.5825,50.8475l7.6325,7.6325l-5.16,5.2675zM136.4175,50.8475l-2.365,13.0075l-5.2675,-5.375zM48.16,63.3175l14.0825,14.0825l-14.0825,14.0825l-5.4825,-5.4825c-0.16125,-0.16125 -0.34937,-0.30906 -0.5375,-0.43l-2.58,-13.6525zM86,63.425l14.0825,13.975l-14.0825,14.0825l-13.975,-14.0825zM123.84,63.425l8.6,8.4925l-2.4725,13.545c-0.24187,0.14781 -0.45687,0.33594 -0.645,0.5375l-5.4825,5.4825l-14.0825,-14.0825zM67.08,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM104.92,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM48.16,101.1575l14.0825,14.0825l-12.255,12.255l-4.4075,-23.7575zM86,101.1575l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM123.84,101.1575l2.58,2.58l-4.4075,23.7575l-12.255,-12.255zM67.08,120.0775l14.0825,14.0825l-12.3625,12.3625l-14.0825,-14.0825zM104.92,120.0775l12.3625,12.3625l-14.0825,14.0825l-12.3625,-12.3625zM86,138.9975l12.3625,12.3625h-24.725zM52.3525,139.75l11.61,11.61h-0.9675c-4.85094,0 -9.04344,-3.53406 -10.105,-8.6zM119.6475,139.75l-0.5375,3.01c0,0.04031 0,0.06719 0,0.1075c-0.76594,4.81063 -5.25406,8.4925 -10.105,8.4925h-0.9675z"></path></g></g></svg>' +
            '</button></td>' +

            '</tr>';

    });
    $('#tabelaFornecedor').append(tblFornecedor);
});

/* funçao traz combo*/
$.ajax({
    url: 'https://kd-gerenciador.herokuapp.com/produtos/listar',
    // url: 'http://localhost:3000/produtos/listar',
    type: 'GET',
    dataType: 'json', // added data type

    success: function (response) {
        var trHTML = '';
        objCategoria = {};

        response = response.sort(function compare(a, b) {
            if (a.idProduto < b.idProduto) return -1;
            if (a.idProduto > b.idProduto) return 1;
            return 0;
        })

        $.each(response, function (i, item) {
            trHTML +=
                '<tr><td>' + item.idProduto +
                '</td><td>' + item.Descricao +
                '</td><td>' + parseFloat(item.Valor_Venda).toFixed(2) + '</td>'

            if (item.Estoque < 10) {
                trHTML += '<td class="bg-abaixo text-dark ">' + item.Estoque + '</td>'
            } else {
                trHTML += '<td class="bg-acima text-dark font-weight-bold">' + item.Estoque + '</td>'
            }

            trHTML += '<td>' + item.categoria +
                '</td><td>' + item.nomeFornecedor +
                '</td><td>' + item.Unidade_Medida + '</td>' +

                '<td>' +
                '<button type="button" onclick="teste(' + item.idProduto +
                ')"  class="btn btn-info " data-toggle="modal" data-target="#atualizarModal">' +

                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M123.195,6.88c-0.86,0 -1.78719,0.38969 -2.4725,1.075l-89.44,89.44c-0.34937,0.34938 -0.645,0.60469 -0.645,1.29l-23.435,61.92c-0.68531,1.03469 -0.28219,2.40531 0.7525,3.44c0.68531,0.68531 1.33031,1.075 2.365,1.075c0.34938,0 0.71219,0.02688 1.3975,-0.3225l61.92,-23.435c0.34938,-0.34937 1.04813,-0.29562 1.3975,-0.645l5.4825,-5.4825l83.5275,-83.635c0.68531,-1.03469 1.075,-1.76031 1.075,-2.795c0,-1.03469 -0.38969,-1.67969 -1.075,-2.365l-38.485,-38.485c-0.68531,-0.68531 -1.505,-1.075 -2.365,-1.075zM38.1625,100.405c1.72,3.44 1.04813,7.22938 -0.3225,10.32c-0.68531,1.37063 0.02688,3.18469 1.3975,3.87c1.37063,1.03469 3.05031,0.68531 4.085,0c2.40531,-1.72 11.35469,-5.87219 15.48,-1.3975c4.12531,4.12531 0.7525,12.72531 -0.9675,15.48c-1.03469,1.03469 -1.03469,2.71438 0,4.085c1.03469,1.03469 2.39188,1.74688 3.7625,1.3975c4.47469,-1.37062 7.91469,-0.68531 10.32,0l-1.3975,1.3975l-38.27,14.2975l-9.89,-10.2125l14.405,-37.84z"></path></g></g></svg>' +
                '</button>' +
                '</td>' +
                /*
                '<td><button type="button" onclick="excluir(' + item.idProduto +
                ')"  class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">' +
                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M68.37,6.88c-0.63156,0.08063 -1.22281,0.34938 -1.72,0.7525l-24.1875,19.8875h-14.9425c-0.1075,0 -0.215,0 -0.3225,0c-0.1075,0 -0.215,0 -0.3225,0c-1.63937,0.30906 -2.82187,1.76031 -2.795,3.44v13.76c0,1.89469 1.54531,3.44 3.44,3.44h0.645l10.105,54.18c-0.06719,0.71219 0.08063,1.42438 0.43,2.0425l4.6225,24.725c-0.02687,0.55094 0.08063,1.11531 0.3225,1.6125l2.4725,13.33c0,0.04031 0,0.06719 0,0.1075c1.69313,8.00875 8.65375,14.0825 16.8775,14.0825h46.01c8.19688,0 15.53375,-5.97969 16.8775,-14.19c0,-0.04031 0,-0.06719 0,-0.1075l2.4725,-13.2225c0,-0.04031 0,-0.06719 0,-0.1075l0.1075,-0.215c0.16125,-0.44344 0.24188,-0.92719 0.215,-1.3975l4.6225,-24.51c0.40313,-0.68531 0.55094,-1.47812 0.43,-2.2575l10.105,-54.0725h0.645c1.89469,0 3.44,-1.54531 3.44,-3.44v-13.76c0,-1.89469 -1.54531,-3.44 -3.44,-3.44h-10.32l-22.4675,-16.0175c-0.61812,-0.47031 -1.38406,-0.65844 -2.15,-0.5375c-0.18812,0.05375 -0.36281,0.12094 -0.5375,0.215l-22.0375,9.46l-16.0175,-13.0075c-0.72562,-0.59125 -1.65281,-0.86 -2.58,-0.7525zM68.8,14.7275l15.8025,12.7925h-31.2825zM109.7575,16.985l14.835,10.535h-29.1325l-3.5475,-2.9025zM30.96,34.4h110.08v6.88h-30.2075c-0.34937,-0.09406 -0.71219,-0.13437 -1.075,-0.1075c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075h-36.8725c-0.25531,-0.02687 -0.49719,-0.02687 -0.7525,0h-40.85zM42.785,48.16h10.75l-5.375,5.375zM63.425,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM80.625,48.16h10.75l-5.375,5.375zM101.265,48.16h7.31l10.32,10.32l-13.975,13.975l-13.975,-13.975zM118.465,48.16h10.75l-5.375,5.375zM35.5825,50.8475l7.6325,7.6325l-5.16,5.2675zM136.4175,50.8475l-2.365,13.0075l-5.2675,-5.375zM48.16,63.3175l14.0825,14.0825l-14.0825,14.0825l-5.4825,-5.4825c-0.16125,-0.16125 -0.34937,-0.30906 -0.5375,-0.43l-2.58,-13.6525zM86,63.425l14.0825,13.975l-14.0825,14.0825l-13.975,-14.0825zM123.84,63.425l8.6,8.4925l-2.4725,13.545c-0.24187,0.14781 -0.45687,0.33594 -0.645,0.5375l-5.4825,5.4825l-14.0825,-14.0825zM67.08,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM104.92,82.2375l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM48.16,101.1575l14.0825,14.0825l-12.255,12.255l-4.4075,-23.7575zM86,101.1575l14.0825,14.0825l-14.0825,14.0825l-14.0825,-14.0825zM123.84,101.1575l2.58,2.58l-4.4075,23.7575l-12.255,-12.255zM67.08,120.0775l14.0825,14.0825l-12.3625,12.3625l-14.0825,-14.0825zM104.92,120.0775l12.3625,12.3625l-14.0825,14.0825l-12.3625,-12.3625zM86,138.9975l12.3625,12.3625h-24.725zM52.3525,139.75l11.61,11.61h-0.9675c-4.85094,0 -9.04344,-3.53406 -10.105,-8.6zM119.6475,139.75l-0.5375,3.01c0,0.04031 0,0.06719 0,0.1075c-0.76594,4.81063 -5.25406,8.4925 -10.105,8.4925h-0.9675z"></path></g></g></svg>' +
                '</button></td>' + 
                */
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
var objexcluir = {
    idProduto: ''
};


function excluirSim() {
    // var post_url = "http://localhost:3000/produtos/excluirum/" + objexcluir.idProduto;
    var post_url = "https://kd-gerenciador.herokuapp.com/produtos/excluirum/" + objexcluir.idProduto;
    $.ajax({
        url: post_url,
        type: 'POST',
        data: objexcluir
    }).done(function (response) { //

        objexcluir.idProduto = ''
        document.location.reload();

    });


}

function excluir(id) {
    objexcluir.idProduto = id
    return objexcluir;
}



var combofornecedor;
var combocategoria;
$('#fornecedorum').change(function () {
    combofornecedor = $(this).val();
});

$('#categoriaum').change(function () {
    combocategoria = $(this).val();
});

$("#atualizar").click(function () {
    var obj = {
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

    console.log(obj);
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
});


/**----------------------------------------------------------------------------------/ */

$("#produto_modal").click(() => {
    $('#modal_Fornecedor').modal('show');
})

/*--------------ENVIAR MODAL PRODUTO */


$("#enviar_Produto").click(function () {

    var obj = {
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
    console.log(obj);

    // var post_url = "http://localhost:3000/produtos/criar";
    var post_url = "https://kd-gerenciador.herokuapp.com/produtos/criar";
    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //

        //  document.location.reload();

    });
});