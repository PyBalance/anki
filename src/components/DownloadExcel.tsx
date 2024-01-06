import { Button } from 'antd';
import React from 'react';
import * as XLSX from 'xlsx';

interface ExcelDownloadProps {
  data: { [key: string]: string };
  fileName?: string;
}

const ExcelDownload: React.FC<ExcelDownloadProps> = ({ data, fileName = 'data.xlsx' }) => {
  const downloadExcel = () => {
    // Convert object to array of objects for XLSX
    const dataArray = Object.entries(data).map(([key, value]) => ({ char: key, pinyin: value }));

    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Write and save the file
    XLSX.writeFile(workbook, fileName);
  };

  return <Button className='no-print' onClick={downloadExcel}>Download Excel</Button>;
};

export default ExcelDownload;
