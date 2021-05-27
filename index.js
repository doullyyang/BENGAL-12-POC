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

          const params = {
            Bucket: "bengal-12-poc",
            Key: "TBD_accountid_filename5.png", // The name of the object
            Body: buffer, // The content of the object
            ACL: "bucket-owner-full-control",
            // ACL: "public-read",
            ContentType: "image/png"

          };

          let s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            // accessKeyId: "<access key>",
            // secretAccessKey: "<secret key>",
          });

          s3.upload(params, function (err, data) {
            if (err) {
              console.log("Error", err);
            } if (data) {
              console.log("Upload Success", data.Location);
            }
          })
        });

        // window.saveAs(blob, "test.png");
      });
  }
}