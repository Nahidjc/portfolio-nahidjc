'use client';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useColorMode } from '@/providers/MuiProvider';
import { profile } from '@/data/profile';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

function useScrollSpy() {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return activeId;
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleColorMode } = useColorMode();
  const activeId = useScrollSpy();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 40 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? 'rgba(7,7,15,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid transparent',
          transition: 'all 0.3s ease',
          ...(mode === 'light' && {
            bgcolor: scrolled ? 'rgba(248,248,254,0.85)' : 'transparent',
            borderBottomColor: scrolled ? 'rgba(0,0,0,0.07)' : 'transparent',
          }),
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, sm: 3 } }}>
          {/* Logo */}
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', mr: 4 }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.8rem',
                color: 'primary.contrastText',
                flexShrink: 0,
              }}
            >
              MN
            </Box>
            <Typography
              fontWeight={700}
              sx={{ display: { xs: 'none', sm: 'block' }, letterSpacing: '-0.01em' }}
            >
              MD.NAHID
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flex: 1 }}>
            {navItems.map(({ label, id }) => (
              <Button
                key={id}
                onClick={() => scrollTo(id)}
                size="small"
                sx={{
                  color: activeId === id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeId === id ? 'action.hover' : 'transparent',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  px: 1.5,
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <IconButton onClick={toggleColorMode} size="small" sx={{ color: 'text.secondary' }}>
              {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>

            <Button
              href={profile.resumeUrl}
              variant="contained"
              size="small"
              startIcon={<DownloadRoundedIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '0.8rem', px: 2 }}
            >
              Resume
            </Button>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' }, color: 'text.secondary' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem',
                color: 'white',
              }}
            >
              MN
            </Box>
            <Typography fontWeight={700}>MD.NAHID</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ px: 1.5, pt: 1 }}>
          {navItems.map(({ label, id }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => scrollTo(id)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: activeId === id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeId === id ? 'action.hover' : 'transparent',
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2.5, borderTop: 1, borderColor: 'divider' }}>
          <Button
            href={profile.resumeUrl}
            variant="contained"
            fullWidth
            startIcon={<DownloadRoundedIcon />}
          >
            Download Resume
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
