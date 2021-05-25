// https://quickchart.io/documentation/chart-js/image-export/

import  fs  from 'fs';
import { CanvasRenderService } from 'chartjs-node-canvas'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js";

const run = async () => {
  const width = 800; //px
  const height = 700; //px
  const canvasRenderService = new CanvasRenderService(width, height);
  const configuration = {
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
          align: "end",
        }
      }
    }
  };

  const imageBuffer = await canvasRenderService.renderToBuffer(configuration);

  // Write image to file
  fs.writeFileSync('/Users/Jonathan.Kidd/scratch/BENGAL-12-POC/mychart_test.png', imageBuffer);

  // upload to s3 with something like
  // const params = {
  //   Bucket: "bengal-12-poc",
  //   Key: "TBD_accountid_filename.png", // The name of the object
  //   Body: imageBuffer, // The content of the object
  // };
  // try {
  //   const results = await s3Client.send(new PutObjectCommand(params));
  //   console.log(
  //       "Successfully created " +
  //       params.Key +
  //       " and uploaded it to " +
  //       params.Bucket +
  //       "/" +
  //       params.Key
  //   );
  //   return results; // For unit tests.
  // } catch (err) {
  //   console.log("Error", err);
  // }
};
run();