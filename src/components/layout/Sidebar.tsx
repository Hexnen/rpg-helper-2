'use client';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TableViewIcon from '@mui/icons-material/TableView';
import CasinoIcon from '@mui/icons-material/Casino';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GamesIcon from '@mui/icons-material/Games';

const DRAWER_WIDTH = 240;

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 1),
  justifyContent: 'space-between',
  ...theme.mixins.toolbar,
}));

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  justifyContent: 'flex-start',
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(126, 87, 194, 0.1)' 
    : 'rgba(106, 60, 181, 0.08)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(126, 87, 194, 0.2)' 
      : 'rgba(106, 60, 181, 0.15)',
  },
}));

const UserSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

const StyledDrawerPaper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Sidebar({ open, onClose, onOpen }: SidebarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const menuItems = [
    { text: 'Kampanie', icon: <MenuBookIcon /> },
    { text: 'Tabele', icon: <TableViewIcon /> },
    { text: 'Roller', icon: <CasinoIcon /> },
    { text: 'Scheduler', icon: <CalendarMonthIcon /> },
  ];

  const drawer = (
    <StyledDrawerPaper>
      <StyledHeader>
        <Logo>
          <LogoContainer>
            <GamesIcon sx={{ color: 'white', fontSize: 22 }} />
          </LogoContainer>
          <Typography variant="h6" noWrap component="div">
            RPG Helper
          </Typography>
        </Logo>
        {!isDesktop && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </StyledHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          SZYBKIE AKCJE
        </Typography>
        <QuickActionButton
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
          fullWidth
        >
          Nowa sesja
        </QuickActionButton>
        <QuickActionButton
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
        >
          Nowa postać
        </QuickActionButton>
      </Box>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <UserSection>
        <Avatar>JD</Avatar>
        <Typography>John Doe</Typography>
      </UserSection>
    </StyledDrawerPaper>
  );
  
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { md: DRAWER_WIDTH } }}>
      {!isDesktop && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onOpen}
          sx={{ 
            mr: 2, 
            display: { md: 'none' }, 
            position: 'absolute', 
            top: 8, 
            left: 8, 
            zIndex: 1100,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.default,
              backgroundImage: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              backgroundColor: theme.palette.background.default,
              backgroundImage: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
} 