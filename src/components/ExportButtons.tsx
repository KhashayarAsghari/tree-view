import React from 'react';
import * as XLSX from 'xlsx';
import { TreeNodeType } from '../types';

interface ExportButtonsProps {
  data: TreeNodeType[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  const handleExportCSV = () => {
    const csvData = data.map((node) => ({
      id: node.id,
      title: node.title,
      color: node.color,
      children: JSON.stringify(node.children || []),
    }));
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TreeData');
    XLSX.writeFile(workbook, 'tree_data.csv');
  };

  const handleExportExcel = () => {
    const excelData = data.map((node) => ({
      id: node.id,
      title: node.title,
      color: node.color,
      children: JSON.stringify(node.children || []),
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TreeData');
    XLSX.writeFile(workbook, 'tree_data.xlsx');
  };

  return (
    <div>
      <button onClick={handleExportCSV}>خروجی CSV</button>
      <button onClick={handleExportExcel}>خروجی Excel</button>
    </div>
  );
};

export default ExportButtons;
