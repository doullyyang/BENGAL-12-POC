// const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
// // import Chart from 'chart.js';
// // const {Chart} = require('chart.js')
// const ChartDataLabels = require('chartjs-plugin-datalabels');
// // import ChartDataLabels from 'chartjs-plugin-datalabels';

// const width = 400;
// const height = 400;
// const chartCallback = (ChartJS) => {
// // debugger
//     // Global config example: https://www.chartjs.org/docs/latest/configuration/
//     // ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
//     // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
//     ChartJS.register({
//         ChartDataLabels
//         // plugin implementation
//     });
//     // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
//     // ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
//     //     // chart implementation
//     // });
//     // debugger
// };
// const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

// (async () => {
//     const configuration = {
//         type: 'bar',
//         data: {
//           labels: ["February", "March", "April"],
//           datasets: [
//             {
//               label: "Year 1",
//               data: [1021, 1434, 1032],
//               backgroundColor: "#9FE0F8",
//               borderRadius: 5,
//               borderSkipped: false
//             },
//             {
//               label: "Year 2",
//               data: [1121, 1734, 1692],
//               backgroundColor: "#093EDD",
//               borderRadius: 5,
//               borderSkipped: false

//             }
//           ]
//         },
//         options: {
//           plugins: {
//             legend: {
//               align: "end",
//             },
//             plugins: {
//               datalabels: {
//                 color: 'blue',
//                 labels: {
//                   title: {
//                     font: {
//                       weight: 'bold'
//                     }
//                   },
//                   value: {
//                     color: 'green'
//                   }
//                 }
//               }
//             }
//           }
//         }
//       };
//     const image = await chartJSNodeCanvas.renderToBuffer(configuration);
//     const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
//     // debugger;
//     const stream = chartJSNodeCanvas.renderToStream(configuration);
// })();