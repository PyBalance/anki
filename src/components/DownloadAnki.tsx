import React from 'react';
import Papa from 'papaparse';
import combineCharactersData from './util_getHanzi';
import { Button } from 'antd';
import { saveAs } from 'file-saver';

interface CSVDownloadProps {
  data: { [key: string]: string };
  fileName?: string;
}

const CSVDownload: React.FC<CSVDownloadProps> = ({ data, fileName = 'data.csv' }) => {
  const downloadCSV = () => {
    // Convert the data object to an array of objects for PapaParse
    const dataArray = Object.entries(data).map(([char, pinyin]: [string, string]) => ({ 
        pinyin, 
        writer: combineCharactersData(char),
        hanzi: char 
    }));

    // Use PapaParse to convert the array of objects to a CSV string
    const csv = Papa.unparse(dataArray, {
      header: false,
      delimiter: '|',
    });

    // UTF-8 Byte Order Mark (BOM)
    const BOM = "\uFEFF";
    const csvContent = BOM + csv;

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Use file-saver's saveAs function to save the file
    saveAs(blob, fileName);
  };

  return <Button onClick={downloadCSV}>Download Anki CSV</Button>;
};

export default CSVDownload;
