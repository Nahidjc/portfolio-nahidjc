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

const roles = [
  'Software Engineer',
  'Node.js Backend Developer',
  'React Native Developer',
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
    const current = roles[idx];
    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 2200);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIdx((p) => (p + 1) % roles.length);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, deleting ? 35 : 65);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <Box component="span" sx={{ color: 'primary.main' }}>
      {text}
      <Box component="span" sx={{ animation: 'blink 1s step-end infinite', '@keyframes blink': { '50%': { opacity: 0 } } }}>|</Box>
    </Box>
  );
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        pt: 10,
        pb: 8,
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <Box sx={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        bgcolor: 'primary.main', opacity: 0.05, filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Grid bg */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)',
        backgroundSize: '48px 48px', pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <motion.div variants={container} initial="hidden" animate="show">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            {/* Avatar column — top on mobile */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, order: { xs: 1, md: 2 } }}>
              <motion.div variants={item}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute', inset: 0, borderRadius: 4,
                    bgcolor: 'primary.main', opacity: 0.2, filter: 'blur(24px)', transform: 'scale(1.1)',
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
                      border: '2px solid',
                      borderColor: 'primary.main',
                      display: 'block',
                    }}
                  />
                  <Box sx={{
                    position: 'absolute', bottom: -10, right: -10,
                    px: 1.5, py: 0.75, borderRadius: 2,
                    bgcolor: 'primary.main', color: 'primary.contrastText',
                    fontWeight: 800, fontSize: '0.75rem',
                    boxShadow: '0 8px 24px rgba(157,113,240,0.4)',
                  }}>
                    4+ yrs
                  </Box>
                </Box>
              </motion.div>

              {/* Stat cards */}
              <motion.div variants={item} style={{ width: '100%', maxWidth: 280 }}>
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
                        transition: 'border-color 0.2s',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      <Typography variant="h5" fontWeight={800} color="text.primary" lineHeight={1}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block', mt: 0.5 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Text column */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div variants={item}>
                <Chip
                  label="● Available for Opportunities"
                  size="small"
                  sx={{
                    mb: 3,
                    bgcolor: 'rgba(16,185,129,0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.25)',
                    fontWeight: 600,
                    '& .MuiChip-label': { px: 1.5 },
                  }}
                />
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="h1" sx={{ mb: 1.5 }}>
                  {profile.name}
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="h4" color="text.secondary" fontWeight={400} sx={{ mb: 2.5, minHeight: '2.2rem', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                  <TypingText />
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, maxWidth: { md: 520 }, mx: { xs: 'auto', md: 0 } }}>
                  {profile.bio}
                </Typography>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction="row" alignItems="center" gap={0.75} sx={{ mb: 3.5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <LocationOnRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
                </Stack>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mb: 3.5, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    href={profile.resumeUrl}
                    variant="contained"
                    size="large"
                    startIcon={<DownloadRoundedIcon />}
                    sx={{ boxShadow: '0 8px 32px rgba(157,113,240,0.3)' }}
                  >
                    Download Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<EmailRoundedIcon />}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={item}>
                <Stack direction="row" gap={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
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
                        size="small"
                        sx={{
                          width: 40, height: 40, borderRadius: 2.5,
                          border: 1, borderColor: 'divider', color: 'text.secondary',
                          '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'action.hover' },
                        }}
                      >
                        {Icon && <Icon size={16} />}
                      </IconButton>
                    );
                  })}
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
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
              <Typography variant="caption">Scroll down</Typography>
              <KeyboardArrowDownRoundedIcon sx={{ animation: 'bounce 2s infinite', '@keyframes bounce': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(4px)' } } }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
