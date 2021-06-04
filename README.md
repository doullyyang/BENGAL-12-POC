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
- you may encounter a bug with how the style renders in chrome, related to how dom-to-image library works. Firefox works fine
- if you upload files with the same name, it will overwrite what is already in the s3 bucket (on dev, bengal-12-poc is the bucket name)
- only jacob's AWS keys work currently