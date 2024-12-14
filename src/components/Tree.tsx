import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view';
import TreeNodeComponent from './TreeNodeComponent';
import { TreeNodeType } from '../types';

interface TreeProps {
  data: TreeNodeType[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <SimpleTreeView>
      {data.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </SimpleTreeView>
  );
};

export default Tree;
