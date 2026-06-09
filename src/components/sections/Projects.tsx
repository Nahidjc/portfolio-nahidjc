'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useColorMode } from '@/providers/MuiProvider';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { projects } from '@/data/projects';

const allTech = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech))).slice(0, 9)];

const statusChip: Record<string, { bgcolor: string; color: string }> = {
  Live: { bgcolor: 'rgba(16,185,129,0.08)', color: '#10b981' },
  'In Progress': { bgcolor: 'rgba(245,158,11,0.08)', color: '#f59e0b' },
  Archived: { bgcolor: 'rgba(100,100,120,0.08)', color: '#8888aa' },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Projects() {
  const [search, setSearch] = useState('');
  const [tech, setTech] = useState('All');
  const router = useRouter();
  const { setLoading } = useColorMode();

  const handleDetailsClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/projects/${slug}/`);
    }, 600);
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (tech === 'All' || p.tech.includes(tech))
    );
  });

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader label="Portfolio" title="Featured Projects" description="A selection of projects that demonstrate depth across the stack — from real-time analytics to developer tooling." />

        <Stack gap={2} sx={{ mb: 5 }}>
          <TextField
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ maxWidth: 360 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ overflowX: 'auto', pb: 0.5, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, '&::-webkit-scrollbar': { display: 'none' } }}>
            <ToggleButtonGroup
              value={tech}
              exclusive
              onChange={(_, v) => { if (v) setTech(v); }}
              sx={{ gap: 1, display: 'flex', flexWrap: { xs: 'nowrap', sm: 'wrap' }, minWidth: 'max-content' }}
            >
              {allTech.map((t) => (
                <ToggleButton
                  key={t}
                  value={t}
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px !important',
                    px: 1.75,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' }
                    },
                  }}
                >
                  {t}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Stack>

        <motion.div
          key={`${search}-${tech}`}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Grid container spacing={3.5}>
            {filtered.map((p) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <motion.div variants={fadeUp} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      borderColor: p.featured ? 'primary.main' : 'divider',
                      boxShadow: p.featured
                        ? (theme) => `0 0 0 1px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.2)' : 'rgba(37,99,235,0.15)'}`
                        : 'none',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 16px 48px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)'}`,
                        '& .project-img': { transform: 'scale(1.04)' },
                      },
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 190 }}>
                      <CardMedia
                        component="img"
                        image={p.coverImage}
                        alt={p.title}
                        className="project-img"
                        sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease-in-out' }}
                      />
                      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,17,32,0.6), transparent)' }} />
                      <Stack direction="row" gap={0.75} sx={{ position: 'absolute', top: 12, left: 12, right: 12, justifyContent: 'space-between' }}>
                        {p.featured && (
                          <Chip label="Featured" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 800, height: 20, fontSize: '0.65rem', borderRadius: 1.5 }} />
                        )}
                        <Box sx={{ ml: 'auto' }}>
                          <Chip
                            label={p.status}
                            size="small"
                            sx={{ ...statusChip[p.status], border: '1px solid', borderColor: 'inherit', height: 20, fontSize: '0.65rem', fontWeight: 700, borderRadius: 1.5 }}
                          />
                        </Box>
                      </Stack>
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3, pb: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.5} sx={{ mb: 1.5 }}>
                        <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.3, fontSize: '1rem' }}>{p.title}</Typography>
                        <Chip label={p.category} size="small" sx={{ bgcolor: 'action.hover', fontSize: '0.65rem', height: 18, flexShrink: 0, fontWeight: 600, borderRadius: 1.5 }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.65, fontSize: '0.85rem' }}>{p.description}</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.75}>
                        {p.tech.slice(0, 4).map((t) => (
                          <Chip
                            key={t}
                            label={t}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(59,130,246,0.06)',
                              color: 'primary.main',
                              border: '1px solid rgba(59,130,246,0.12)',
                              fontSize: '0.65rem',
                              height: 20,
                              borderRadius: 1.5,
                              fontWeight: 600,
                            }}
                          />
                        ))}
                        {p.tech.length > 4 && <Chip label={`+${p.tech.length - 4}`} size="small" sx={{ fontSize: '0.65rem', height: 20, borderRadius: 1.5, fontWeight: 600 }} />}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ px: 3, pb: 2.5, pt: 1.5, borderTop: 1, borderColor: 'divider', gap: 1 }}>
                      {p.liveUrl && (
                        <Button component="a" href={p.liveUrl} target="_blank" size="small" startIcon={<OpenInNewRoundedIcon sx={{ fontSize: '0.9rem' }} />} sx={{ fontSize: '0.75rem', p: 0.5 }}>Live</Button>
                      )}
                      {p.githubUrl && (
                        <Button component="a" href={p.githubUrl} target="_blank" size="small" startIcon={<GitHubIcon sx={{ fontSize: '0.9rem' }} />} sx={{ fontSize: '0.75rem', p: 0.5 }}>Code</Button>
                      )}
                      <Box sx={{ flex: 1 }} />
                      <Button
                        onClick={(e) => handleDetailsClick(e, p.slug)}
                        size="small"
                        endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '0.9rem' }} />}
                        color="primary"
                        sx={{ fontSize: '0.75rem', fontWeight: 700, p: 0.5 }}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="text.secondary" gutterBottom>No projects match your search.</Typography>
            <Button onClick={() => { setSearch(''); setTech('All'); }} color="primary">Clear filters</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
