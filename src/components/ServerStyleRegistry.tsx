'use server';

import * as React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createStyleRegistry, StyleRegistry } from '@mui/material-nextjs/v15-cache';

/**
 * ServerStyleRegistry component for Material UI v7 with Next.js 15
 * 
 * This component handles server-side rendering of styles to prevent
 * flashes of unstyled content. It's used in the server component part of 
 * the application rendering.
 */
export default function ServerStyleRegistry({ children }: { children: React.ReactNode }) {
  // Create a new style registry for each request
  const registry = createStyleRegistry();
  
  return (
    <StyleRegistry registry={registry}>
      {children}
    </StyleRegistry>
  );
} 