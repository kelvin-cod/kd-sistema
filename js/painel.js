const get_listar_url = "https://kd-gerenciador.herokuapp.com/painel/listar";

$.ajax({
  url: get_listar_url,
  type: 'GET'
}).then(function (response) { //
  let somaClientes = 0;
  let vet = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somaClientes += d.Quantidade;
    vet.push(d.Quantidade);
    vetorBarra.push(d.Mes)
  });

  $('#painel_clientes').text(somaClientes);
  graficoLinhasSimples(vet, retornaMes(vetorBarra), "widgetChart1", 'Clientes');

}).catch(function (err) {
  console.error(err)
});
//------------------------------------------------------------------------------------------------------
//protudos
const get_produtos_url = "https://kd-gerenciador.herokuapp.com/painel/produtos";

$.ajax({
  url: get_produtos_url,
  type: 'GET'
}).then(function (response) { //
  let somarProdutos = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarProdutos += d.Quantidade;
    vetorDados.push(d.Quantidade);
    vetorBarra.push(d.Categoria);
  });

  $('#painel_produtos').text(somarProdutos);

  graficoLinhas(vetorDados, vetorBarra, 'widgetChart2', 'Produtos');

}).catch(function (err) {
  console.error(err)
});
///------------------------------------------------------------------------------------------------
//tipos de vendas
const get_vendas_url = "https://kd-gerenciador.herokuapp.com/painel/vendas";

$.ajax({
  url: get_vendas_url,
  type: 'GET'
}).then(function (response) { //
  let somarVendas = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarVendas += d.Quantidade;
    vetorDados.push(d.Quantidade);
    vetorBarra.push(d.Tipo_Pedido);
  });

  $('#painel_vendas').text(somarVendas);
  graficoLinhasSimples(vetorDados, vetorBarra, "widgetChart3", 'Pedidos');
}).catch(function (err) {
  console.error(err)
});

///------------------------------------------------------------------------------------------------
//total de vendas
const get_vendas_total_url = "https://kd-gerenciador.herokuapp.com/painel/vendas/total";

$.ajax({
  url: get_vendas_total_url,
  type: 'GET'
}).then(function (response) { //
  let somarTotalVendas = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarTotalVendas += parseFloat(d.Total);
    vetorDados.push(d.Quantidade);
    vetorBarra.push(d.Mes);
  })

  graficoLinhasSimples(vetorDados, retornaMes(vetorBarra), "widgetChart4", 'Vendas');
  $('#painel_vendas_total').text(somarTotalVendas)

}).catch(function (err) {
  console.error(err)
});


///------------------------------------------------------------------------------------------------
//total de vendas
const get_estoque_pago_url = "https://kd-gerenciador.herokuapp.com/painel/estoque";

$.ajax({
  url: get_estoque_pago_url,
  type: 'GET'
}).then(function (response) { //
  let somarPagoEstoque = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarPagoEstoque += d.ValorPago;
    vetorDados.push(d.ValorPago.toFixed(2));
    vetorBarra.push(d.Categoria);
  });

  $('#painel_valor_pago').text(somarPagoEstoque.toFixed(2));

  graficoLinhas(vetorDados, vetorBarra, "widgetChart5", 'Valor');
}).catch(function (err) {
  console.error(err)
});


///------------------------------------------------------------------------------------------------
//total a receber
const get_estoque_receber_url = "https://kd-gerenciador.herokuapp.com/painel/estoque/receber";

$.ajax({
  url: get_estoque_receber_url,
  type: 'GET'
}).then(function (response) { //
  let somarPagoEstoque = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarPagoEstoque += d.ValorReceber;
    vetorDados.push(d.ValorReceber.toFixed(2));
    vetorBarra.push(d.Categoria);
  });

  $('#painel_valor_receber').text(somarPagoEstoque.toFixed(2));

  graficoLinhas(vetorDados, vetorBarra, "widgetChart6", 'Valor');

}).catch(function (err) {
  console.error(err)
});


///------------------------------------------------------------------------------------------------
//estoque
const get_estoque_listar_url = "https://kd-gerenciador.herokuapp.com/painel/estoque/listar";

$.ajax({
  url: get_estoque_listar_url,
  type: 'GET'
}).then(function (response) { //
  let somarTotalEstoque = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarTotalEstoque += d.Estoque;
    vetorDados.push(d.Estoque);
    vetorBarra.push(d.Descricao);
  });

  $('#painel_estoque_listar').text(somarTotalEstoque);

  graficoLinhasSimples(vetorDados, vetorBarra, "widgetChart7", 'Produto');

}).catch(function (err) {
  console.error(err)
});

///------------------------------------------------------------------------------------------------
//lucro
const get_estoque_lucro_url = "https://kd-gerenciador.herokuapp.com/painel/estoque/lucro";

$.ajax({
  url: get_estoque_lucro_url,
  type: 'GET'
}).then(function (response) { //
  let somarTotalLucro = 0;
  let vetorDados = [];
  let vetorBarra = [];

  $.each(response, function (i, d) {
    somarTotalLucro += d.Lucro;
    vetorDados.push(parseFloat(d.Lucro.toFixed(2)));
    vetorBarra.push(d.Categoria);
  });

  $('#painel_estoque_lucro').text(somarTotalLucro.toFixed(2));

  graficoLinhas(vetorDados, vetorBarra, "widgetChart8", 'Produtos');

}).catch(function (err) {
  console.error(err)
});

//--------------------------------------------------------------------------------------------------------

function graficoLinhasSimples(vetorDados, vetorLabels, idGrafico, tipoLabel) {
  try {
    //WidgetChart 1
    var ctx = document.getElementById(idGrafico);
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: vetorLabels, //popula eixo y
          type: 'line',
          datasets: [{
            data: vetorDados, //vetor de dados
            label: tipoLabel, //tipo de label
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          }, ]
        },
        options: {

          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              tension: 0.00001,
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

};

function graficoLinhas(vetorDados, vetorBarras, idGrafico, label) {

  var ctx = document.getElementById(idGrafico);
  if (ctx) {
    ctx.height = 110;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: vetorBarras, //atribui a quantidade de barras
        datasets: [{
          label: label, //popula a label
          data: vetorDados, //popula o grafico com dados
          borderColor: "transparent",
          borderWidth: "0",
          backgroundColor: "rgba(255,255,255,.3)",
          barPercentage: 1,

        }]
      },
      options: {

        maintainAspectRatio: false,
        legend: {
          display: false
        },
        responsive: true,
        tooltips: {
          mode: 'index',
          titleFontSize: 12,
          titleFontColor: '#000',
          bodyFontColor: '#000',
          backgroundColor: '#fff',
          titleFontFamily: 'Montserrat',
          bodyFontFamily: 'Montserrat',
          cornerRadius: 3,
          intersect: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
            }
          }]
        },
        title: {
          display: false,
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    });
  }
};

function graficoBarras(vetorDados, vetorBarras, idGrafico, label) {
  try {
    //WidgetChart 5
    var ctx = document.getElementById(idGrafico); //atribui no id do grafico
    if (ctx) {
      ctx.height = 120;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: vetorBarras, //popula com barras
          datasets: [{
            label: label, //atribui nome das colunas
            data: vetorDados, //popula com dados
            borderColor: "transparent",
            borderWidth: "0",
            backgroundColor: "#ccc",
          }]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.50
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

};

function retornaMes(vetor) {
  let meses = [
    "",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  let vet = []

  for (let i = 0; i < meses.length; i++) {

    if (vetor[i] == 1) {
      vet.push(meses[1]);
    }
    if (vetor[i] == 2) {
      vet.push(meses[2])
    }
    if (vetor[i] == 3) {
      vet.push(meses[3])
    }
    if (vetor[i] == 4) {
      vet.push(meses[4])
    }
    if (vetor[i] == 5) {
      vet.push(meses[5])
    }
    if (vetor[i] == 6) {
      vet.push(meses[6])
    }
    if (vetor[i] == 7) {
      vet.push(meses[7])
    }
    if (vetor[i] == 8) {
      vet.push(meses[8])
    }
    if (vetor[i] == 9) {
      vet.push(meses[9])
    }
    if (vetor[i] == 10) {
      vet.push(meses[10])
    }
    if (vetor[i] == 11) {
      vet.push(meses[11])
    }
    if (vetor[i] == 12) {
      vet.push(meses[12])
    }

  }

  return vet;
};
