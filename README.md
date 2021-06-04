# Bengal-12-poc

## Prerequisites
- if you want uploads to actually go to s3, get awsKeys.js file from another dev and place in src directory
- `npm install`
- `npm start` will start the app on port 3000
- the chart creating and uploading kicks off as soon as MonthByMonthChart componenet is rendered

## Background
- component renders with the first row of data, then loops through the remaining rows and renders the chart. A promise ensures the previous chart is uploaded before the next starts, and a generator keeps track of remaining rows.

## To note
- chart js version is 2.9.3, very different than 3.x
- currently reads from csv string in sampleData.js, not sample.csv