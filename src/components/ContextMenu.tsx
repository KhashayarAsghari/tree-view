import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ContextMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddChild: () => void;
  onColorChange: (color: string) => void;
  onFileUpload: (file: File) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ anchorEl, onClose, onEdit, onDelete, onAddChild, onColorChange, onFileUpload }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(event.target.files[0]);
    }
    onClose();
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(event.target.value);
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onEdit}>ویرایش</MenuItem>
      <MenuItem onClick={onDelete}>حذف</MenuItem>
      <MenuItem onClick={onAddChild}>اضافه کردن نود</MenuItem>
      <MenuItem onClick={() => setShowColorPicker(true)}>انتخاب رنگ</MenuItem>
      {showColorPicker && (
        <MenuItem>
          <input type="color" onChange={handleColorChange} />
        </MenuItem>
      )}
      <MenuItem>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
