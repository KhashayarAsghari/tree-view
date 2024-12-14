import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { TreeNodeType } from '../types';

interface FileUploadProps {
  onFileUpload: (data: TreeNodeType[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { CSVReader } = useCSVReader();

  const handleFileLoad = (data: any) => {
    const treeData = data.map((row: any) => ({
      id: row[0],
      title: row[1],
      color: row[2],
      children: JSON.parse(row[3] || '[]'),
    }));
    onFileUpload(treeData);
  };

  return (
    <CSVReader onUploadAccepted={(results: any) => handleFileLoad(results.data)}>
      {({ getRootProps, acceptedFile }: any) => (
        <div>
          <button type="button" {...getRootProps()}>
            آپلود فایل CSV
          </button>
          {acceptedFile && <div>{acceptedFile.name}</div>}
        </div>
      )}
    </CSVReader>
  );
};

export default FileUpload;
