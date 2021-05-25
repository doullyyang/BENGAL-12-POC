// import ChartDataLabels from 'chartjs-plugin-datalabels';
// debugger
// console.log(ChartDataLabels)
d3.csv('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/atp_wta.csv')
.then(makeChart);

function makeChart(players) {
var chart = new Chart('chart', {
  type: 'bar',
  data: {
    labels: ["February", "March", "April"],
    datasets: [
      {
        label: "Last Year",
        data: [1021, 1434, 1032],
        backgroundColor: "#9FE0F8",
        borderRadius: 5,
        borderSkipped: false
      },
      {
        label: "This Year",
        data: [1121, 1734, 1692],
        backgroundColor: "#093EDD",
        borderRadius: 5,
        borderSkipped: false

      }
    ]
  },
  options: {
    scales: {
      y: {
        display: false
      },
      x: {
        display: false
      },
    },
    plugins: {
      legend: {
        display: false
      },
      plugins: {
        datalabels: {
          color: 'blue',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
            value: {
              color: 'green'
            }
          }
        }
      }
    }
  }
});
}