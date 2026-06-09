import { createTheme, type ThemeOptions } from '@mui/material/styles';

const typography: ThemeOptions['typography'] = {
  fontFamily: 'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif',
  h1: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1.1,
  },
  h2: {
    fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h3: { fontWeight: 700, letterSpacing: '-0.015em' },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  body1: { lineHeight: 1.7 },
  body2: { lineHeight: 1.65 },
  overline: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
  },
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#9d71f0' : '#7c3aed',
        light: '#b48df5',
        dark: '#6d28d9',
        contrastText: '#ffffff',
      },
      secondary: { main: '#06b6d4', contrastText: '#ffffff' },
      success: { main: '#10b981' },
      background: {
        default: isDark ? '#07070f' : '#f8f8fe',
        paper: isDark ? '#0d0d1a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#eeeef8' : '#09090f',
        secondary: isDark ? '#8080a8' : '#5a5a78',
      },
      divider: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
      action: {
        hover: isDark ? 'rgba(157,113,240,0.06)' : 'rgba(124,58,237,0.05)',
      },
    },
    typography,
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { boxSizing: 'border-box' },
          html: { scrollBehavior: 'smooth' },
          body: { overflowX: 'hidden' },
          '::selection': {
            backgroundColor: isDark
              ? 'rgba(157,113,240,0.3)'
              : 'rgba(124,58,237,0.2)',
          },
          '::-webkit-scrollbar': { width: '6px' },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(157,113,240,0.4)' : 'rgba(124,58,237,0.3)',
            borderRadius: '3px',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '10px 20px',
            transition: 'all 0.2s ease',
          },
          contained: {
            '&:hover': { transform: 'translateY(-1px)' },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
            '&:hover': { transform: 'translateY(-1px)' },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500, fontSize: '0.75rem' },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiAccordion: {
        defaultProps: { elevation: 0, disableGutters: true },
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
            borderRadius: '16px !important',
            '&:before': { display: 'none' },
            overflow: 'hidden',
          },
        },
      },
    },
  });
};
