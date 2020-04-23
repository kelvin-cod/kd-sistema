//------------------------------------------------------------------------------------------------------
//protudos
const get_cliente_url = "https://kd-gerenciador.herokuapp.com/cliente/listar";
let objClientes = [];
let user = JSON.parse(sessionStorage.user);

$.ajax({
    url: get_cliente_url,
    type: 'GET'
}).then(function (response) { //
    let tblCliente;
    objClientes = response; //atribui no obj para manipular

    $.each(response, function (i, item) {

        let data = new Date(item.data_cadastro);
        tblCliente +=
            '<tr><td>' + item.idCliente +
            '</td><td>' + item.Nome + '</td>' +
            '<td>' + item.Celular + '</td>' +
            '<td>' + item.Telefone + '</td>' +

            '<td>' + data.toLocaleString() + '</td>' +
            '<td>' +
            '<button type="button" onclick="editarCliente(' + item.idCliente +
            ')"  class="btn btn-info " >' +

            '<i class="fas fa-pencil-alt"></i> ' +
            '</button>' +
            '</td>' +

            '</tr>';

    });
    $('#tabelaCliente').append(tblCliente);

}).catch(function (err) {
    console.error(err);
});
//limpar form
$("#limpar_form").click(function () {
    $('#formCliente').each(function () {
        this.reset();
    });


});

/*--------------ENVIAR CLIENTE*/
function enviarCliente() {

    var obj = {
        nome: '',
        email: '',
        cep: '',
        bairro: '',
        cidade: '',
        endereco: '',
        numero: '',
        telefone: '',
        celular: '',
        uf: '',
        complemento: '',
        idUsuario: null
    };
    obj.nome = $("#nome").val();
    obj.email = $("#email").val();
    obj.cep = $("#cep").val();
    obj.bairro = $("#bairro").val();
    obj.cidade = $("#cidade").val();
    obj.endereco = $("#endereco").val();
    obj.numero = $("#numero").val();
    obj.telefone = $("#telefone").val();
    obj.celular = $("#celular").val();
    obj.uf = $("#uf").val();
    obj.complemento = $("#complemento").val();
    obj.idUsuario = user.id;

    // var post_url = "http://localhost:3000/produtos/criar";
    var dpost_cliente_url = "https://kd-gerenciador.herokuapp.com/cliente/criar";
    console.log(JSON.stringify(obj))
    $.ajax({
        url: post_cliente_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //
        document.location.reload();
    });
};

//editar-update cliente
function editarCliente(id) {
    let cliente;
    let data;
    $.each(objClientes, function (i, item) {
        if (item.idCliente == id) {
            cliente = (item);
            data = new Date(item.data_cadastro);
        }
    });
    console.log(objClientes);
    $("#modalNomeCliente").val(cliente.Nome);
    $("#modalEmail").val(cliente.email_Cliente);
    $("#modalRua").val(cliente.Rua);
    $("#modalComplemento").val(cliente.Complemento);
    $("#modalBairro").val(cliente.Bairro);
    $("#modalCidade").val(cliente.Cidade);
    $("#modalNumero").val(cliente.Numero);
    $("#modalTelefone").val(cliente.Telefone);
    $("#modalCelular").val(cliente.Celular);
    $("#modalCep").val(cliente.Cep);

    $("#modalData_cadastro").val(data.toLocaleString());
    $("#modal_cliente").modal("show");
};