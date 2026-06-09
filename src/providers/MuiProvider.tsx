'use client';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import { createAppTheme } from '@/theme';

interface ColorModeContextType {
  mode: 'dark' | 'light';
  toggleColorMode: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
  loading: false,
  setLoading: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('color-mode') as 'dark' | 'light' | null;
    if (saved) setMode(saved);
  }, []);

  const colorMode = useMemo<ColorModeContextType>(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'dark' ? 'light' : 'dark';
          localStorage.setItem('color-mode', next);
          return next;
        });
      },
      loading,
      setLoading,
    }),
    [mode, loading]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  if (!mounted) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={createAppTheme('dark')}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading && (
          <LinearProgress
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              zIndex: 99999,
              bgcolor: 'transparent',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'primary.main',
                boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
              },
            }}
          />
        )}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
