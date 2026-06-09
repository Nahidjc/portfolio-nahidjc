'use client';
import { useEffect } from 'react';
import { useColorMode } from '@/providers/MuiProvider';

export default function PageLoaderCloser() {
  const { setLoading } = useColorMode();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null;
}
