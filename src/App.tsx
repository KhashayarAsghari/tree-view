import React, { useState } from 'react';
import Tree from './components/Tree';
import ExportButtons from './components/ExportButtons';
import { TreeNodeType } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<TreeNodeType[]>([
    { id: '1', title: 'Root', color: 'black', children: [] },
  ]);

  return (
    <div>
      <Tree data={data} />
      <ExportButtons data={data} />
    </div>
  );
};

export default App;
