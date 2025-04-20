'use client';

import { ReactNode } from 'react';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';

// Load Inter for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Load Playfair Display for headings
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Load Montserrat for buttons
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

interface FontLoaderProps {
  children: ReactNode;
}

/**
 * FontLoader component that loads and applies fonts with Font CSS Variables
 *
 * This component leverages next/font to optimize font loading performance
 * by enabling size-adjust, preloading, and CSS variable support
 */
export default function FontLoader({ children }: FontLoaderProps) {
  return (
    <div className={`${inter.variable} ${playfairDisplay.variable} ${montserrat.variable}`}>
      {children}
    </div>
  );
} 