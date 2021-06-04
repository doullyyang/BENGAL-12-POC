import domtoimage from 'dom-to-image';
import S3 from 'react-aws-s3';

export const uploadToS3 = (chart, accountNumber) => {
    let promise = domtoimage.toBlob(chart)
        .then(function (blob) {
            // console.log(process.env)
            const config = {
                bucketName: 'bengal-12-poc',
                region: 'us-east-1',
                // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                s3Url: 'https://bengal-12-poc.s3.amazonaws.com'
            }

            const ReactS3Client = new S3(config);

            const newFileName = `${accountNumber}_chart.png`;

            ReactS3Client
                .uploadFile(blob, newFileName)
                .then(data => console.log(data))
                .catch(err => console.error(err))
        });
    return promise;
}