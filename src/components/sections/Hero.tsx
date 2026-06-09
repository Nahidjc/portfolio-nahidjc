'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { profile } from '@/data/profile';

const displayRoles = profile.roles || [
  'Software Engineer',
  'Node.js Backend Developer',
  'AWS & Serverless Engineer',
  'Fintech Systems Builder',
];

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
};

function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = displayRoles[idx];
    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIdx((p) => (p + 1) % displayRoles.length);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, deleting ? 30 : 60);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
      {text}
      <Box component="span" sx={{ animation: 'blink 1.5s step-end infinite', '@keyframes blink': { '50%': { opacity: 0 } } }}>|</Box>
    </Box>
  );
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Hero() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        pt: { xs: 12, md: 10 },
        pb: 8,
        overflow: 'hidden',
      }}
    >
      
      <Box sx={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
        width: { xs: 400, md: 600 }, height: { xs: 400, md: 600 }, borderRadius: '50%',
        bgcolor: 'primary.main', opacity: { xs: 0.04, md: 0.06 }, filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.02,
        backgroundImage: 'linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)',
        backgroundSize: '48px 48px', pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <motion.div variants={container} initial="hidden" animate="show">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, order: { xs: 1, md: 2 } }}>
              <motion.div variants={item}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute', inset: 0, borderRadius: 4,
                    bgcolor: 'primary.main', opacity: 0.15, filter: 'blur(24px)', transform: 'scale(1.08)',
                  }} />
                  <Box
                    component="img"
                    src={profile.avatar}
                    alt={profile.name}
                    sx={{
                      width: { xs: 160, sm: 200, md: 240 },
                      height: { xs: 160, sm: 200, md: 240 },
                      borderRadius: 4,
                      objectFit: 'cover',
                      position: 'relative',
                      border: '1.5px solid',
                      borderColor: 'primary.main',
                      display: 'block',
                    }}
                  />
                  {profile.availableForWork && (
                    <Box sx={{
                      position: 'absolute', bottom: -8, right: -8,
                      px: 1.5, py: 0.75, borderRadius: 2,
                      bgcolor: 'primary.main', color: 'primary.contrastText',
                      fontWeight: 800, fontSize: '0.725rem',
                      boxShadow: (theme) => `0 6px 20px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(37,99,235,0.2)'}`,
                    }}>
                      4+ Yrs Exp
                    </Box>
                  )}
                </Box>
              </motion.div>

              <motion.div variants={item} style={{ width: '100%', maxWidth: 300 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  {profile.stats.map((stat) => (
                    <Box
                      key={stat.label}
                      sx={{
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 3,
                        p: 2,
                        textAlign: 'center',
                        transition: 'all 0.25s ease-in-out',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: (theme) => `0 8px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'}`,
                        },
                      }}
                    >
                      <Typography variant="h5" fontWeight={800} color="text.primary" lineHeight={1}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block', mt: 0.75 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div variants={item}>
                <Chip
                  label="Available for Opportunities"
                  size="small"
                  sx={{
                    mb: 3,
                    bgcolor: 'rgba(16,185,129,0.08)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.2)',
                    fontWeight: 700,
                    fontSize: '0.725rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    '& .MuiChip-label': { px: 1.5 },
                  }}
                />
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="h1" sx={{ mb: 2, fontWeight: 800 }}>
                  {profile.name}
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="h4" color="text.secondary" fontWeight={400} sx={{ mb: 2.5, minHeight: '2.4rem', fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.65rem' } }}>
                  <TypingText />
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: { md: 520 }, mx: { xs: 'auto', md: 0 }, fontSize: '1.05rem', lineHeight: 1.75 }}>
                  {profile.tagline}
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction="row" alignItems="center" gap={0.75} sx={{ mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <LocationOnRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>{profile.location}</Typography>
                </Stack>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mb: 4, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    href={profile.resumeUrl}
                    variant="contained"
                    size="large"
                    startIcon={<DownloadRoundedIcon />}
                    sx={{
                      boxShadow: (theme) => `0 8px 30px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.25)' : 'rgba(37,99,235,0.15)'}`,
                      px: 3.5,
                      py: 1.25,
                    }}
                  >
                    Download Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<EmailRoundedIcon />}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    sx={{ px: 3.5, py: 1.25 }}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction="row" gap={1.25} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {profile.social.map((s) => {
                    const Icon = iconMap[s.icon];
                    return (
                      <IconButton
                        key={s.platform}
                        component="a"
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        size="medium"
                        sx={{
                          width: 42, height: 42, borderRadius: 2,
                          border: 1, borderColor: 'divider', color: 'text.secondary',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'action.hover' },
                        }}
                      >
                        {Icon && <Icon size={18} />}
                      </IconButton>
                    );
                  })}
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Box
              component="button"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
                color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s',
              }}
            >
              <Typography variant="caption" fontWeight={600}>Scroll down</Typography>
              <KeyboardArrowDownRoundedIcon sx={{ animation: 'bounce 2s infinite', '@keyframes bounce': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(4px)' } } }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
