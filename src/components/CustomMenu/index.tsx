import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { customMenuSx } from '../../styles/customSx';

export interface MenuItemData {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

interface CustomMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuItems: MenuItemData[];
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  className?: string;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  anchorEl,
  open,
  onClose,
  menuItems,  
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  className
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={customMenuSx}
      MenuListProps={{ autoFocusItem: false }}
      className={className}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={item.onClick}
          className={item.className}
          disabled={item.disabled}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomMenu;
