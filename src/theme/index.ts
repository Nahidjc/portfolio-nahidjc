import { createTheme, type ThemeOptions } from '@mui/material/styles';

const typography: ThemeOptions['typography'] = {
  fontFamily: 'var(--font-inter), "Inter", system-ui, -apple-system, sans-serif',
  h1: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  },
  h2: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontWeight: 600,
  },
  h6: {
    fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.65,
  },
  button: {
    fontFamily: 'var(--font-inter), "Inter", sans-serif',
    fontWeight: 600,
    textTransform: 'none',
  },
  overline: {
    fontFamily: 'var(--font-inter), "Inter", sans-serif',
    fontSize: '0.725rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
  },
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#3B82F6' : '#2563EB',
        light: isDark ? '#60A5FA' : '#3B82F6',
        dark: isDark ? '#1D4ED8' : '#1D4ED8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDark ? '#8B5CF6' : '#7C3AED',
        light: isDark ? '#A78BFA' : '#8B5CF6',
        dark: isDark ? '#6D28D9' : '#6D28D9',
        contrastText: '#ffffff',
      },
      info: {
        main: isDark ? '#06B6D4' : '#0891B2',
      },
      success: {
        main: '#10B981',
      },
      background: {
        default: isDark ? '#0B1120' : '#F8FAFC',
        paper: isDark ? '#111827' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#475569',
      },
      divider: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      action: {
        hover: isDark ? 'rgba(59,130,246,0.06)' : 'rgba(37,99,235,0.05)',
      },
    },
    typography,
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { boxSizing: 'border-box' },
          html: { scrollBehavior: 'smooth' },
          body: {
            overflowX: 'hidden',
            fontFamily: 'var(--font-inter), "Inter", sans-serif',
            backgroundColor: isDark ? '#0B1120' : '#F8FAFC',
            color: isDark ? '#F8FAFC' : '#0F172A',
          },
          '::selection': {
            backgroundColor: isDark
              ? 'rgba(59,130,246,0.3)'
              : 'rgba(37,99,235,0.2)',
          },
          '::-webkit-scrollbar': { width: '6px' },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          '::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(59,130,246,0.3)' : 'rgba(37,99,235,0.2)',
            borderRadius: '3px',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            '&:hover': { transform: 'translateY(-1px)' },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            '&:hover': {
              transform: 'translateY(-1px)',
              borderColor: isDark ? '#3B82F6' : '#2563EB',
              backgroundColor: isDark ? 'rgba(59,130,246,0.04)' : 'rgba(37,99,235,0.03)',
            },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            transition: 'all 0.3s ease-in-out',
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 500, fontSize: '0.75rem' },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiAccordion: {
        defaultProps: { elevation: 0, disableGutters: true },
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            overflow: 'hidden',
          },
        },
      },
    },
  });
};
