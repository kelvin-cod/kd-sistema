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
    now = new Date;
    var trHTML = '';


    /************************************************************************************************************************* */

    $("#Data_vendas").val(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear());

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
        $("#Obs_vendas").val("");
        $("#Total_vendas").val(Total.toFixed(2));
        $("#Quantidade_total").val(Quantidade_total);
    });

    function salvar(item) {
        trHTML =
            '<tr><td>' + item.idProduto +
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
            ' data-placement="top" title="Delete" onclick="excluir( ' + item.idProduto + ') ;rowElim(this);">' +
            '<i class="zmdi zmdi-delete"></i>' +
            '</p> </div></td>' +
            '</tr>';
        return $('#TabelaComanda').append(trHTML);
    }
    /*
        $('#TabelaComanda').change(function () {
            console.log('aloooooooo');
            let posicao = 4;
            let total = 0;
            $('table tbody td').each(function (a, b) {
                if (a == posicao) {
                    console.log($(b).text())
                    total += parseInt($(b).text());
                    posicao += 11;
                }
            });
            console.log(total)
        })
    */
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


    function excluir(id) {
        let quantidade_Coluna = parseInt($(`#tbl_${id}`).text());
        let subtotal_Coluna = parseFloat($(`#tbl_subtotal_${id}`).text());

        for (let i = 0; i < Pedidos.length; i++) {
            if (Pedidos[i].idProduto == parseInt(id)) {
                //retira da quantidade total o valor excluido
                Quantidade_total -= quantidade_Coluna;

                //retira do total o valor excluido
                Total -= subtotal_Coluna;

                //atribui os novos valores
                $("#Quantidade_total").val(Quantidade_total);
                $("#Total_vendas").val(Total.toFixed(2));
            }

        }
    }