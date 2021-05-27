d3.csv('/sample_2.csv')
  .then(makeChart);

d3.csv('/sample_2.csv')
  .then(handleCsv);

function handleCsv(accountData) {

  let months = [1, 2, 3]

  for (let index = 0; index < months.length; index++) {
    let monthNumber = months[index]
    let lastYearTemp = 'Last_year_avg_temp_' + monthNumber
    let thisYearTemp = 'This_year_avg_temp_' + monthNumber
    let monthName = 'Month_' + monthNumber

    document.getElementById(lastYearTemp).innerHTML = accountData[0][lastYearTemp]
    document.getElementById(thisYearTemp).innerHTML = accountData[0][thisYearTemp]
    document.getElementById(monthName).innerHTML = accountData[0][monthName]
  }

}

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