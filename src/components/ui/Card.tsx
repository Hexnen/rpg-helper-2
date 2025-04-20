'use client';

import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(29, 34, 53, 0.8)' 
    : theme.palette.background.paper,
  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.divider}` : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' ? theme.shadows[8] : '0 8px 16px rgba(0,0,0,0.08)',
  },
}));

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  elevation?: number;
  sx?: any;
}

export default function Card({ 
  title,
  subtitle,
  children,
  action,
  footer,
  elevation = 2,
  sx = {}
}: CardProps) {
  return (
    <StyledCard elevation={elevation} sx={sx}>
      {(title || subtitle) && (
        <CardHeader
          title={title && <Typography variant="h6">{title}</Typography>}
          subheader={subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
          action={action || (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardActions sx={{ padding: 2, pt: 0 }}>
          {footer}
        </CardActions>
      )}
    </StyledCard>
  );
} 