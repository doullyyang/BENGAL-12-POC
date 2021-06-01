var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  var options = {
    lastYearData: [1051, 1434, 1032],
    thisYearData: [1121, 1734, 1692],
    month1Label: 'Febuary',
    month1LastYearTemp: 46,
    month1CurrentYearTemp: 41,
    month2Label: 'March',
    month2LastYearTemp: 47,
    month2CurrentYearTemp: 45,
    month3Label: 'April',
    month3LastYearTemp: 55,
    month3CurrentYearTemp: 58
  };
  res.render('home.ejs', options);
});

module.exports = router;
