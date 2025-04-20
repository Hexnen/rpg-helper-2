'use client';

import { Grid } from '@mui/material';
import { type SxProps, type Theme } from '@mui/material/styles';

/**
 * Props for the GridItem component
 */
interface GridItemProps {
  /**
   * The content to be displayed within the grid item
   */
  children: React.ReactNode;
  
  /**
   * Breakpoint sizes for the Grid item (xs, sm, md, lg, xl)
   */
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  
  /**
   * Custom styles to apply to the grid item
   */
  sx?: SxProps<Theme>;
}

/**
 * Responsive grid item with configurable breakpoints.
 * Uses Material UI v7's Grid component.
 */
export default function GridItem({
  children,
  xs = 12,
  sm = 6,
  md = 4,
  lg = 4,
  xl = 3,
  sx = {},
}: GridItemProps) {
  return (
    <Grid
      size={{ xs, sm, md, lg, xl }}
      sx={sx}
    >
      {children}
    </Grid>
  );
} 