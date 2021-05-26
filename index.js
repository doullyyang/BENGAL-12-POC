d3.csv('/sample_2.csv')
  .then(makeChart);

Chart.plugins.register(ChartDataLabels);

function makeChart(accountData) {
  var chart = new Chart('chart', {
    type: 'bar',
    data: {
      labels: [accountData[0]["Month_1"], accountData[0]["Month_2"], accountData[0]["Month_3"]],
      datasets: [
        {
          label: "Last Year",
          data: [accountData[0]["Last Year Cost($)_1"], accountData[0]["Last Year Cost($)_2"], accountData[0]["Last Year Cost($)_3"]],
          backgroundColor: "#9FE0F8",
          borderRadius: 5,
          borderSkipped: false,
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        },
        {
          label: "This Year",
          data: [accountData[0]["This Year Cost($)_1"], accountData[0]["This Year Cost($)_2"], accountData[0]["This Year Cost($)_3"]],
          backgroundColor: "#093EDD",
          borderRadius: 5,
          borderSkipped: false,
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        }
      ]
    },
    options: {
      cornerRadius: 20,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        yAxes: [{
          display: false,
        }],
        xAxes: [{
          display: false,
        }],
      },
      plugins: {
        datalabels: {
          borderRadius: 4,
          color: 'black',
          font: {
            weight: 'bold',
            size: 25
          },
          // can use formatter to make any other adjustments to the label
          formatter: function (value, context) {
            return "$" + value;
          },
          padding: 6
        }
      }
    }
  });
}