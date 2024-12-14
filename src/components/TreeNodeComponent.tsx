import React, { useState } from 'react';
import { TreeItem } from '@mui/x-tree-view';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import ContextMenu from './ContextMenu';
import { useCSVReader } from 'react-papaparse';
import { TreeNodeType } from '../types';

interface TreeNodeProps {
  node: TreeNodeType;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
  const [children, setChildren] = useState<TreeNodeType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [color, setColor] = useState<string | undefined>(node.color);
  const [title, setTitle] = useState<string>(node.title);

  const handleToggle = async () => {
    if (!children) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/children/${node.id}`);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = async (newColor: string) => {
    setColor(newColor);
    await axios.post(`/api/updateColor/${node.id}`, { color: newColor });
  };

  const handleFileUpload = async (file: File) => {
    const { CSVReader } = useCSVReader();
    CSVReader().readAsText(file, {
      complete: async (results: any) => {
        const newChildren = results.data.map((row: any) => ({
          id: row[0],
          title: row[1],
          color: row[2],
          children: JSON.parse(row[3] || '[]'),
        }));
        setChildren(newChildren);
        await axios.post(`/api/uploadChildren/${node.id}`, { children: newChildren });
      },
    });
  };

  const handleEdit = async () => {
    const newTitle = prompt('عنوان جدید را وارد کنید:', title);
    if (newTitle) {
      setTitle(newTitle);
      await axios.post(`/api/updateTitle/${node.id}`, { title: newTitle });
    }
  };

  const handleDelete = async () => {
    await axios.delete(`/api/deleteNode/${node.id}`);
  };

  const handleAddChild = async () => {
    const newChild = { id: `${node.id}-${Date.now()}`, title: 'نود جدید', color: 'black', children: [] };
    setChildren((prevChildren) => (prevChildren ? [...prevChildren, newChild] : [newChild]));
    await axios.post(`/api/addChild/${node.id}`, { child: newChild });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <TreeItem
        itemId={node.id}
        label={<span style={{ color }}>{title}</span>}
        onClick={handleToggle}
      >
        {loading ? <CircularProgress size={20} /> : children?.map((child) => (
          <TreeNodeComponent key={child.id} node={child} />
        ))}
      </TreeItem>
      <ContextMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddChild={handleAddChild}
        onColorChange={handleColorChange}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default TreeNodeComponent;
