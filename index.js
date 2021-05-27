d3.csv('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2814973/atp_wta.csv')
  .then(makeChart);

Chart.plugins.register(ChartDataLabels);

function makeChart() {
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
          borderSkipped: false,
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        },
        {
          label: "This Year",
          data: [1121, 1734, 1692],
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


window.onload = function () {
  document.getElementById("download-btn").onclick = function () {
    domtoimage.toBlob(document.getElementById("month-by-month-chart"))
      .then(function (blob) {
        //image as 'blob' https://developer.mozilla.org/en-US/docs/Web/API/Blob)
        blob.arrayBuffer().then(function (buffer) {
          //'buffer' is image in ArrayBuffer containing blob's data in binary form - probably what you wanna use.
          console.log(buffer);
        });

        window.saveAs(blob, "test.png");
      });
  }
}