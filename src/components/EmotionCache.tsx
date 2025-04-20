'use client';

import { useState, ReactNode } from 'react';
import createCache, { EmotionCache as EmotionCacheType, Options as EmotionOptions } from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';

/**
 * Creates an Emotion cache with a unique key for the MUI styling system
 */
export function createEmotionCache() {
  return createCache({ key: 'mui-cache', prepend: true });
}

interface EmotionCacheProps {
  options?: EmotionOptions;
  children: ReactNode;
}

/**
 * EmotionCache component that provides emotion styling with proper 
 * handling for server-side rendering in Next.js 15.
 * 
 * This component ensures that emotion styles are properly injected into
 * the document during server-side rendering, preventing style flashing.
 */
export function EmotionCache({ options = { key: 'mui-cache' }, children }: EmotionCacheProps) {
  // Create a new cache on client-side rendering
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    
    // Create a flush function to extract and flush styles
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    
    return { cache, flush };
  });

  // Use next.js hook to inject styles during SSR
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <EmotionCacheProvider value={cache}>
      {children}
    </EmotionCacheProvider>
  );
} 