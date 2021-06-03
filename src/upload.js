import domtoimage from 'dom-to-image';
// import AWS from 'aws-sdk';
import S3 from 'react-aws-s3';

export const uploadToS3 = (chart, accountNumber) => {
    domtoimage.toBlob(chart)
        .then(function (blob) {
            blob.arrayBuffer().then(function (buffer) {
                // const params = {
                //     Bucket: "bengal-12-poc",
                //     Key: `${accountNumber}_chart.png`, // The name of the object
                //     Body: buffer, // The content of the object
                //     ACL: "bucket-owner-full-control",
                //     // ACL: "public-read",
                //     ContentType: "image/png"
                // };

                const config = {
                    bucketName: 'bengal-12-poc',
                    region: 'us-east-1',
                    accessKeyId: '123',
                    secretAccessKey: '12345',
                    s3Url: 'https://bengal-12-poc.s3.amazonaws.com/'
                }

                const ReactS3Client = new S3(config);

                const newFileName = `${accountNumber}_chart.png`;

                ReactS3Client
                    .uploadFile(buffer, newFileName)
                    .then(data => console.log(data))
                    .catch(err => console.error(err))
            });

        });
}