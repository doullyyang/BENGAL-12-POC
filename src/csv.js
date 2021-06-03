import { readString } from 'react-papaparse';
// import CsvData from './sample.csv';

const str = `Account Number,Monthly Bill Date,Month_1,Last Year Cost($)_1,This Year Cost($)_1,Last_year_avg_temp_1,This_year_avg_temp_1,Month_2,Last Year Cost($)_2,This Year Cost($)_2,Last_year_avg_temp_2,This_year_avg_temp_2,Month_3,Last Year Cost($)_3,This Year Cost($)_3,Last_year_avg_temp_3,This_year_avg_temp_3
12345,03/12/21,February,1021,1121,46,41,March,1434,1734,47,45,April,1032,1692,55,58
12346,03/13/21,February,1111,2222,44,44,March,1444,1145,48,46,April,1033,1222,56,57`
// const str = `${CsvData}`
// console.log("data " + CsvData)
// data /static/media/sample.c12acce6.csv

const csvResults = readString(str, {
  header: true
});

export default csvResults;