uploadToS3 = function() {
    let accountNumber = 1;
    let chart = document.getElementById("month-by-month-chart");
// let theNode = document.getElementById("another-wrapper");

// domtoimage.toBlob(theNode, { height: 590, width: 800 })
// only properly renders in firefox
    domtoimage.toBlob(chart)
        .then(function (blob) {
            blob.arrayBuffer().then(function (buffer) {
                const params = {
                    Bucket: "bengal-12-poc",
                    Key: `${getAccountNumber}_chart.png`, // The name of the object
                    Body: buffer, // The content of the object
                    ACL: "bucket-owner-full-control",
                    // ACL: "public-read",
                    ContentType: "image/png"
                };

                //TODO: npm install aws sdk
                let s3 = new AWS.S3({
                    apiVersion: "2006-03-01",
                    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    accessKeyId: `${"<%= accessKeyId %>"}`,
                    secretAccessKey: `${"<%= secretAccessKey %>"}`
                });

                s3.upload(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    }
                    if (data) {
                        console.log("Upload Success", data.Location);
                    }
                })
            });

            // window.saveAs(blob, "test.png");
        });
}