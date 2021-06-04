import { readString } from 'react-papaparse';
import { csvData } from './sampleData.js';

const str = csvData

const csvResults = readString(str, {
  header: true
});

export default csvResults;