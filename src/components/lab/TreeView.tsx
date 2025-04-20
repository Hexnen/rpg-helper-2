'use client';

import React, { useState, ReactNode, createContext, useContext } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, styled, SxProps, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// TreeView Context to track expanded nodes
interface TreeViewContextType {
  expanded: string[];
  selected: string[];
  toggleNode: (nodeId: string) => void;
  selectNode: (nodeId: string) => void;
  multiSelect: boolean;
}

const TreeViewContext = createContext<TreeViewContextType>({
  expanded: [],
  selected: [],
  toggleNode: () => {},
  selectNode: () => {},
  multiSelect: false,
});

// Types
export interface TreeViewProps {
  /**
   * The tree node data to render
   */
  children: ReactNode;
  
  /**
   * Array of node IDs that should be expanded by default
   */
  defaultExpanded?: string[];
  
  /**
   * Array of node IDs that should be selected by default
   */
  defaultSelected?: string[];
  
  /**
   * Allow multiple nodes to be selected
   */
  multiSelect?: boolean;
  
  /**
   * Callback when selected nodes change
   */
  onNodeSelect?: (nodeIds: string[]) => void;
  
  /**
   * Callback when expanded nodes change
   */
  onNodeToggle?: (nodeIds: string[]) => void;
  
  /**
   * Custom SX styles
   */
  sx?: SxProps<Theme>;
}

export interface TreeItemProps {
  /**
   * Unique ID for this node
   */
  nodeId: string;
  
  /**
   * Content of the tree item
   */
  label: string | ReactNode;
  
  /**
   * The icon to display next to the tree item label
   */
  icon?: ReactNode;
  
  /**
   * Child nodes
   */
  children?: ReactNode;
  
  /**
   * Custom SX styles
   */
  sx?: SxProps<Theme>;
}

// Styled components
const StyledTreeItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  margin: 0,
}));

const StyledTreeItemContent = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: 2,
  ...(isSelected && {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  }),
}));

/**
 * Custom TreeView component using MUI v7 core components
 * Replaces the @mui/lab TreeView component
 */
export function TreeView({
  children,
  defaultExpanded = [],
  defaultSelected = [],
  multiSelect = false,
  onNodeSelect,
  onNodeToggle,
  sx = {},
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  
  const toggleNode = (nodeId: string) => {
    const newExpanded = expanded.includes(nodeId)
      ? expanded.filter(id => id !== nodeId)
      : [...expanded, nodeId];
    
    setExpanded(newExpanded);
    if (onNodeToggle) {
      onNodeToggle(newExpanded);
    }
  };
  
  const selectNode = (nodeId: string) => {
    let newSelected: string[];
    
    if (multiSelect) {
      newSelected = selected.includes(nodeId)
        ? selected.filter(id => id !== nodeId)
        : [...selected, nodeId];
    } else {
      newSelected = selected.includes(nodeId) && selected.length === 1
        ? []
        : [nodeId];
    }
    
    setSelected(newSelected);
    if (onNodeSelect) {
      onNodeSelect(newSelected);
    }
  };
  
  return (
    <TreeViewContext.Provider value={{ expanded, selected, toggleNode, selectNode, multiSelect }}>
      <List component="nav" sx={{ ...sx, padding: 0 }}>
        {children}
      </List>
    </TreeViewContext.Provider>
  );
}

/**
 * TreeItem component for using with TreeView
 * Replaces the @mui/lab TreeItem component
 */
TreeView.Item = function TreeItem({
  nodeId,
  label,
  icon,
  children,
  sx = {},
}: TreeItemProps) {
  const { expanded, selected, toggleNode, selectNode } = useContext(TreeViewContext);
  const isExpanded = expanded.includes(nodeId);
  const isSelected = selected.includes(nodeId);
  const hasChildren = Boolean(children);
  
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleNode(nodeId);
    }
  };
  
  const handleSelectClick = () => {
    selectNode(nodeId);
  };
  
  return (
    <StyledTreeItem sx={sx}>
      <Box component="div" sx={{ width: '100%' }}>
        <StyledTreeItemContent
          onClick={handleSelectClick}
          isSelected={isSelected}
        >
          {hasChildren && (
            <ListItemIcon
              onClick={handleExpandClick}
              sx={{ minWidth: 32, cursor: 'pointer' }}
            >
              {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
          )}
          {icon && (
            <ListItemIcon sx={{ minWidth: 32 }}>
              {icon}
            </ListItemIcon>
          )}
          {typeof label === 'string' ? (
            <ListItemText primary={label} />
          ) : (
            label
          )}
        </StyledTreeItemContent>
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              {children}
            </List>
          </Collapse>
        )}
      </Box>
    </StyledTreeItem>
  );
};

export default TreeView; 