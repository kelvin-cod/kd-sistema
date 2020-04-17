const get_listar_url = "https://kd-gerenciador.herokuapp.com/painel/listar";

$.ajax({
  url: get_listar_url,
  type: 'GET'
}).then(function (response) { //
  let somaClientes = 0;
  let vet = [];
  let arrayMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];

  $.each(response, function (i, d) {
    somaClientes += d.Quantidade;
    vet.push(d.Quantidade);
  });

  $('#painel_clientes').text(somaClientes);
  graficoLinhasSimples(vet, arrayMes, "widgetChart1", 'Clientes');

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

  graficoLinhas(vetorDados, vetorBarra, 'widgetChart2');

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
  console.log(response);

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
            label: tipoLabel,//tipo de label
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

function graficoLinhas(vetorDados, vetorBarras, idGrafico) {

  var ctx = document.getElementById(idGrafico);
  if (ctx) {
    ctx.height = 110;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: vetorBarras, //atribui a quantidade de barras
        datasets: [{
          label: "Produtos",
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
}