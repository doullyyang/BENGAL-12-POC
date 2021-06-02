var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
const csv = require('@fast-csv/parse');

// fs.createReadStream(path.resolve('public', 'sample.csv'))
//   .pipe(csv.parse({ headers: true }))
//   .on('error', error => console.error(error))
//   .on('data', row => console.log(row))
//   .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

// on server start, csv is read and rows saved as array of objects passed to ejs template
const csvOptions = []
fs.createReadStream(path.resolve('public', 'sample.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', function(row) {
    console.log(row)
    const options = {
      accountNumber: row['Account Number'],
      lastYearData: [row['Last Year Cost($)_1'], row['Last Year Cost($)_2'], row['Last Year Cost($)_3']],
      thisYearData: [row['This Year Cost($)_1'], row['This Year Cost($)_2'], row['This Year Cost($)_3']],
      month1Label: row.Month_1,
      month1LastYearTemp: row.Last_year_avg_temp_1,
      month1CurrentYearTemp: row.This_year_avg_temp_1,
      month2Label: row.Month_2,
      month2LastYearTemp: row.Last_year_avg_temp_2,
      month2CurrentYearTemp: row.This_year_avg_temp_2,
      month3Label: row.Month_3,
      month3LastYearTemp: row.Last_year_avg_temp_3,
      month3CurrentYearTemp: row.This_year_avg_temp_3
    }

    csvOptions.push(options)
  })
  .on('end', function () {

  })

router.get('/home', function (req, res, next) {

  // this just pulls the first row and sends to ejs template
  var options = csvOptions[0]
  res.render('home.ejs', options);
  // res.send(csvOptions)
});


module.exports = router;
