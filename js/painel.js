const get_listar_url = "https://kd-gerenciador.herokuapp.com/painel/listar";

$.ajax({
    url: get_listar_url,
    type: 'GET'
}).then(function (response) { //
    let somaClientes = 0;
    let vet = []
    $.each(response, function (i, d) {
        somaClientes += d.Quantidade;

        vet.push(d.Quantidade)
    });



    $('#painel_clientes').text(somaClientes);
    populaGraficoClientes(vet);
    console.log(vet)

    console.log(response)
}).catch(function (err) {
    console.error(err)
});

function populaGraficoClientes(vetorDados) {
    try {
        //WidgetChart 1
        var ctx = document.getElementById("widgetChart1");
        if (ctx) {
            ctx.height = 130;
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
                type: 'line',
                datasets: [{
                  data: vetorDados,
                  label: 'Clientes',
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