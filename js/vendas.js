    var Produtos = [];
    var Comanda = {
        idComanda: 0,
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
    now = new Date;
    var trHTML = '';

    var Venda = {
        idUsuario: 0,
        idCliente: 0,
        data_venda: '',
        desconto: 0,
        pedido_venda: 0,
        total_venda: 0,
        cliente_venda: '',
        tipo_venda: '',
        Pedidos: []
    }

    /************************************************************************************************************************* */
    Array.prototype.duplicates = function () {
        return this.filter(function (x, y, k) {
            return y !== k.lastIndexOf(x);
        });
    }

    $("#Data_vendas").val(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear());
    $.ajax({
        url: 'https://kd-gerenciador.herokuapp.com/vendas/ultimo',
        // url: 'http://localhost:3000/produtos/listar',
        type: 'GET',
        dataType: 'json', // added data type

        success: function (response) {
            let aux = parseInt(response[0].ultimo) + 1;
            $("#Numero_pedido").val(aux);
        }
    });

    $.ajax({
        url: 'https://kd-gerenciador.herokuapp.com/produtos/listar',
        type: 'GET',
        dataType: 'json', // added data type
    }).done(function (response) { //
        let vet_categoria = [];
        // let selectbox = $('#Produto_vendas');
        var selectbox2 = $('#Valor_vendas');
        var selectbox3 = $('#Adicional_vendas');
        //selectbox.find('option').remove();
        response = response.sort(function compare(a, b) {
            if (a.Descricao < b.Descricao) return -1;
            if (a.Descricao > b.Descricao) return 1;
            return 0;
        })

        Produtos = response; //popula array de produtos
        $.each(response, function (i, d) {
            vet_categoria.push(d.categoria)
        });
        const novoArray = [...new Set(vet_categoria)]; //remove categorias repetidas

        var $optgroup; // cria as o grupo de opçoes

        $.each(novoArray, function (i, optgroups) { // para cada valor no vetor joga em um grupo

            $optgroup = $('<optgroup>', {
                label: novoArray[i],
                id: i
            });

            $optgroup.appendTo('#Produto_vendas'); // atribuui
            $.each(response, function (j, d) {
                if (d.categoria == novoArray[i]) {
                    $('<option>').val(d.idProduto).text(d.Descricao).appendTo($optgroup);
                }
                if (d.Descricao == "Ovo") {
                    $('<option>').val(d.idProduto).text(d.Descricao).appendTo(selectbox3);
                }

                $('<option>').val(d.idProduto).text(d.Valor_Venda).appendTo(selectbox2);
            });
        });

        $.each(response, function (i, d) {

            if (d.Descricao == "Ovo") {
                $('<option>').val(d.idProduto).text(d.Descricao).appendTo(selectbox3);
            }


        });
    });


    /**----------------------------------------------------------------------------------------------------- */

    $('#Produto_vendas').change(function () {
        idProduto = ($(this).val());

        $("#Valor_vendas").val(($(this).val()));

        quantidade = parseFloat($("#Quantidade_vendas").val());
        valor = parseFloat($("#Valor_vendas :selected").text());

        soma = (quantidade * valor).toFixed(2);

        $("#Subtotal_vendas").val(soma);

        var selected = $("option:selected", this);

        if (selected.parent()[0].label == "Lanche") {
            $(".adicional").css("display", "block");
        }

    });

    /**----------------------------------------------------------------------------------------------------- */
    $("#fecharBalcao").click(() => {
        localStorage.removeItem("venda");
        $(window.document.location).attr('href', "index.html");
    })

    /**----------------------------------------------------------------------------------------------------- */
    $('#Quantidade_vendas').change(function () {

        quantidade = $("#Quantidade_vendas").val();
        valor = parseFloat($("#Valor_vendas :selected").text());
        soma = (quantidade * valor).toFixed(2);
        $("#Subtotal_vendas").val(soma);
    });
    /**----------------------------------------------------------------------------------------------------- */
    let cont = 0;
    $('#Add_item').click(function () {

        if ($('#Produto_vendas  :selected').text() == "") {
            return alert("Selecione um Item");
        }
        Comanda.idComanda = cont;

        cont++;

        Comanda.idProduto = parseInt(idProduto);
        Comanda.Descricao = $('#Produto_vendas  :selected').text();
        Comanda.Obs = $('#Obs_vendas').val();
        Comanda.Valor_venda = valor;
        Comanda.Quantidade = parseInt(quantidade);
        Comanda.SubTotal = soma;
        Pedidos.push(Comanda);

        Venda.Pedidos.push(Comanda);
        localStorage.setItem("venda", Venda)

        Total += parseFloat(soma)
        Quantidade_total += parseInt(quantidade);

        salvar(Comanda);
        Comanda = new Object();

        console.log(Pedidos);

        $('#Produto_vendas').val("");
        $('#Quantidade_vendas').val(1);
        $("#Valor_vendas").val("");
        $("#Subtotal_vendas").val("");
        $("#Obs_vendas").val("");
        $("#Total_vendas").val(Total.toFixed(2));
        $("#Quantidade_total").val(Quantidade_total);
    });
    /**----------------------------------------------------------------------------------------------------- */
    function salvar(item) {
        trHTML =
            '<tr id="tbl_tr_' + item.idComanda + '"><td>' + item.idProduto +
            '</td><td>' + item.Descricao +
            '</td><td id="tbl_obs_' + item.idProduto + '">' + item.Obs +
            '</td><td>' + parseFloat(item.Valor_venda).toFixed(2) +
            '</td><td id="tbl_' + item.idProduto + '">' + item.Quantidade +
            '</td><td id="tbl_subtotal_' + item.idProduto + '">' + item.SubTotal +
            '</td><td> ' +
            '<div class="table-data-feature">' +
            /*
            '<p class="item btn" data-toggle="tooltip" onclick="editar(' + item.idProduto + ')" ' +
            ' data-placement="top" title="Edit" id="bEdit" >' +
            */
            '<p class="item btn" data-toggle="tooltip" onclick="rowEdit(this)" ' +
            'data-placement="top" title="Edit" id="bEdit" >' +
            '<i class="zmdi zmdi-edit"></i></p>' +
            ' <p id="bAcep" class="btn  item"data-toggle="tooltip"  ' +
            'style="display:none;" onclick="rowAcep(this); editar(' + item.idProduto + ') "> ' +
            '<i class="zmdi zmdi-save"></i> ' +
            '</p> ' +

            '</div></td>' +
            '<td> <div class="table-data-feature">' +
            '<p class="item btn" id="bElim" data-toggle="tooltip" ' +
            ' data-placement="top" title="Delete" onclick="excluir( ' + item.idComanda + ', ' + item.idProduto + ');rowElim(this);">' +
            '<i class="zmdi zmdi-delete"></i>' +
            '</p> </div></td>' +
            '</tr>';
        return $('#TabelaComanda').append(trHTML);
    }
    /**----------------------------------------------------------------------------------------------------- */
    $(Pedidos).change(function () {
        console.log('aloooooooo');

    })
    /**----------------------------------------------------------------------------------------------------- */
    function editar(id) {

        let quantidade_Coluna = parseInt($(`#tbl_${id}`).text());
        let aux = 0;
        let nova_soma = 0;
        let obs_Coluna = $(`#tbl_obs_${id}`).text();

        for (let i = 0; i < Pedidos.length; i++) {
            if (Pedidos[i].idProduto == parseInt(id)) {

                if (quantidade_Coluna < 0) {
                    $(`#tbl_${id}`).text(Pedidos[i].Quantidade);
                    return alert("Quantidade inválida!");
                }
                if (Pedidos[i].Quantidade < quantidade_Coluna) {
                    //quantidade
                    aux = parseInt(Pedidos[i].Quantidade);
                    Quantidade_total -= aux; // tira o valor da linha do total
                    Quantidade_total += quantidade_Coluna; // acrecenta o valor da lina no total
                    Pedidos[i].Quantidade = quantidade_Coluna; //insere o novo valor no obj pedido

                    //soma coluna
                    nova_soma = Pedidos[i].Valor_venda * quantidade_Coluna;

                    //valor total
                    Total -= parseFloat(Pedidos[i].SubTotal); // tira o valor da linha do total
                    Total += nova_soma; // acrecenta o valor da lina no total
                    Pedidos[i].SubTotal = nova_soma;

                    //atribuiçoes
                    $("#Total_vendas").val(Total.toFixed(2));
                    $(`#tbl_subtotal_${id}`).text(nova_soma.toFixed(2));
                    $("#Quantidade_total").val(Quantidade_total);
                } else if (Pedidos[i].Quantidade > quantidade_Coluna) {
                    //Quantidade menor
                    Quantidade_total -= parseInt(Pedidos[i].Quantidade);
                    Quantidade_total += quantidade_Coluna;
                    Pedidos[i].Quantidade = quantidade_Coluna;
                    //soma linha menor
                    nova_soma = Pedidos[i].Valor_venda * quantidade_Coluna;
                    //Valor total
                    Total -= parseFloat(Pedidos[i].SubTotal); // tira o valor da linha do total
                    Total += nova_soma; // acrecenta o valor da lina no total
                    Pedidos[i].SubTotal = nova_soma;

                    $("#Quantidade_total").val(Quantidade_total);
                    $("#Total_vendas").val(Total.toFixed(2));
                    $(`#tbl_subtotal_${id}`).text(nova_soma.toFixed(2));
                } else if (obs_Coluna != Pedidos[i].Obs) {
                    Pedidos[i].Obs = obs_Coluna;
                }
            }
        }
    }
    /**----------------------------------------------------------------------------------------------------- */

    function excluir(id, id_linha) {
        let quantidade_Coluna = parseInt($(`#tbl_${id_linha}`).text());
        let subtotal_Coluna = parseFloat($(`#tbl_subtotal_${id_linha}`).text());

        for (let i = 0; i < Pedidos.length; i++) {

            if (Pedidos[i].idComanda == parseInt(id)) {

                //retira da quantidade total o valor excluido
                Quantidade_total -= quantidade_Coluna;

                //retira do total o valor excluido
                Total -= subtotal_Coluna;

                // remove do vetor o item excluido
                Pedidos.splice(i, 1);
                Venda.Pedidos.splice(i, 1);
                console.log(Pedidos)
                // console.log(Pedidos)
                //atribui os novos valores
                $("#Quantidade_total").val(Quantidade_total);
                $("#Total_vendas").val(Total.toFixed(2));
            }

        }
    }
    /**----------------------------------------------------------------------------------------------------- */
    //Função para desconto de vendas
    $("#Desconto_vendas").change(() => {
        let valor = parseFloat($("#Desconto_vendas").val());
        let valor_total = $("#Total_vendas").val();
        let desconto = valor_total - valor;
        Venda.desconto = desconto;

        if (valor < 0 || isNaN(valor)) {
            $("#Desconto_vendas").val(0)
            return alert("Desconto Inválido")
        } else {
            return $("#Total_vendas").val(desconto.toFixed(2))
        }
    })
    /**----------------------------------------------------------------------------------------------------- */
    $("#Concluir_vendas").click(() => {
        let cliente = $("#Nome_cliente").val();
        Venda.cliente_venda = $("#Nome_cliente").val();
        if (cliente === "") {
            Venda.idCliente = 1;
            Venda.cliente_venda = "Cliente Padrao";
        }
        if (Pedidos.length == 0) {
            return alert("Ação inválida!!");
        } else {

            let numeroPedido = parseFloat($("#Numero_pedido").val());
            let var_name = $("input[name='exampleRadios']:checked").val();
            let user = JSON.parse(sessionStorage.getItem("user"));
            let total_venda = $("#Total_vendas").val();

            Venda.idUsuario = user.idUsuario;
            Venda.data_venda = $("#Data_vendas").val();

            Venda.tipo_venda = var_name;
            Venda.pedido_venda = numeroPedido + 1;
            Venda.total_venda = parseFloat(total_venda);

            $('#Modal').modal('show');

        }
    });
    /**----------------------------------------------------------------------------------------------------- */
    $("#modal-btn-sim").click(() => {
        const post_url = "https://kd-gerenciador.herokuapp.com/vendas/concluir";
        var gif = '<img src="../images/carregando-gif-animado-9.gif" >'
        $("#gif").append(gif)

        $.ajax({
            url: post_url,
            type: 'POST',
            data: Venda,
            dataType: 'json',
            complete: function () {
                location.reload();
            }

        })
    })