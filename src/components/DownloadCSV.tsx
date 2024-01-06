import { Button } from 'antd';
import React from 'react';

// Define the props using TypeScript interface
interface CSVDownloadProps {
  data: { [key: string]: string }; // Define the shape of the data object
  fileName?: string; // Optional fileName prop
}

const CSVDownload: React.FC<CSVDownloadProps> = ({ data, fileName = 'data.csv' }) => {
  const downloadCSV = () => {
    const BOM = "\uFEFF"; // UTF-8 Byte Order Mark
    let csvContent = BOM + "char,pinyin\n"; // Add BOM and column headers
    Object.entries(data).forEach(([key, value]) => {
      csvContent += `${key},${value}\n`; // Add each row
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <Button className='no-print' onClick={downloadCSV}>Download CSV</Button>;
};

export default CSVDownload;
