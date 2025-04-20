'use client';

import { Grid, Box, useTheme } from '@mui/material';
import { type SxProps, type Theme } from '@mui/material/styles';

/**
 * Props for the GridContainer component
 * @param {ReactNode} children - Child components to render within the grid container
 * @param {number} spacing - Spacing between grid items (default: 2)
 * @param {boolean} fullWidth - Whether the container should take up the full width (default: false)
 * @param {object} sx - Additional sx props to pass to the Grid component
 */
interface GridContainerProps {
  /**
   * The content to be displayed within the grid container
   */
  children: React.ReactNode;
  
  /**
   * Spacing between grid items (default: 2)
   */
  spacing?: number;
  
  /**
   * Whether the grid should take up the full width of its container (default: false)
   */
  fullWidth?: boolean;
  
  /**
   * Custom styles to apply to the grid container
   */
  sx?: SxProps<Theme>;
}

/**
 * A responsive grid container that wraps grid items with proper spacing
 * 
 * @param {GridContainerProps} props - Component props
 * @param {ReactNode} props.children - Content to be rendered inside the container
 * @param {number} [props.spacing=2] - Spacing between grid items
 * @param {boolean} [props.fullWidth=false] - Whether the container should use full width
 * @param {object} [props.sx] - Additional styles for the container
 * 
 * @returns {JSX.Element} - Rendered component
 */
export default function GridContainer({
  children,
  spacing = 2,
  fullWidth = false,
  sx = {},
}: GridContainerProps): JSX.Element {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: '100%',
        p: fullWidth ? 0 : { xs: 1, sm: 2 },
        ...sx
      }}
    >
      <Grid 
        container
        spacing={spacing}
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Grid>
    </Box>
  );
} 