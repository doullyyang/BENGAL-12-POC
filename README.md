# Bengal-12-poc

## Prerequisites
- Ensure you have Firefox installed (see note below)
- Get awsKeys.js file from another dev and place in src/ directory, or create the same and add contents as below. This allows uploads to get to the S3 bucket.
```js
// Jacob's keys are the only that work
const awsKey = "accessKey";

const awsSAKey = "secretAccessKey";

export { awsKey, awsSAKey }
```
- Update the csvData const in sampleData.js with the list of accounts to be created (including header row)
- `npm install`
- `npm start` will start the app on port 3000
- The chart creation and uploading kicks off as soon as MonthByMonthChart component is rendered (ie when you visit http://localhost:3000/ in Firefox)

## Background
- The MonthByMonthChart component renders with the first row of data, then loops through the remaining rows and renders the chart. A promise ensures the previous chart is uploaded before the next starts, and a generator keeps track of remaining rows as it re-renders, saves DOM node as png, and uploads to S3.

## To note
- The chartjs version used here is 2.9.3, very different than current 3.x, which is important to note if you need to make updates to the style of the chart.
- The app reads the csv string in sampleData.js, not sample.csv
- You may encounter a bug with how the style renders in Chrome, related to how dom-to-image library works. Firefox works fine.
- If you upload files with the same name, it will overwrite what is already in the S3 bucket (the bucket is "bengal-12-poc" on the dev instance of S3)
- Only jacob's AWS keys work currently
