'use client';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ThemeToggle from '../ThemeToggle';

const DRAWER_WIDTH = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2.5,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 24, 36, 0.9)' : 'rgba(0, 0, 0, 0.04)',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(1),
    width: 'auto',
  },
  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ViewButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 24, 36, 0.9)' : 'rgba(0, 0, 0, 0.04)',
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(1),
  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
  color: theme.palette.text.primary,
}));

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = 'Kampanie', subtitle }: HeaderProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        backgroundColor: 'background.default',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/" underline="hover">
              {title}
            </Link>
            {subtitle && (
              <Typography color="text.primary">{subtitle}</Typography>
            )}
          </Breadcrumbs>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isDesktop && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Szukaj…"
                inputProps={{ 'aria-label': 'szukaj' }}
              />
            </Search>
          )}
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <ViewButton aria-label="lista">
              <ViewListIcon />
            </ViewButton>
            <ViewButton aria-label="siatka">
              <ViewModuleIcon />
            </ViewButton>
            <ThemeToggle variant="icon" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 