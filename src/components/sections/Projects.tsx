'use client';
import { useState } from 'react';
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
  Live: { bgcolor: 'rgba(16,185,129,0.12)', color: '#10b981' },
  'In Progress': { bgcolor: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  Archived: { bgcolor: 'rgba(100,100,120,0.12)', color: '#8888aa' },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Projects() {
  const [search, setSearch] = useState('');
  const [tech, setTech] = useState('All');

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

        {/* Search + filter */}
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
                    borderRadius: '99px !important',
                    px: 1.75,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    color: 'text.secondary',
                    '&.Mui-selected': { bgcolor: 'primary.main', color: 'white', borderColor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } },
                  }}
                >
                  {t}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Stack>

        {/* Cards grid */}
        <motion.div
          key={`${search}-${tech}`}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Grid container spacing={2.5}>
            {filtered.map((p) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <motion.div variants={fadeUp} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      borderColor: p.featured ? 'primary.main' : 'divider',
                      boxShadow: p.featured ? '0 0 0 1px rgba(157,113,240,0.2)' : 'none',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                        '& .project-img': { transform: 'scale(1.05)' },
                      },
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                      <CardMedia
                        component="img"
                        image={p.coverImage}
                        alt={p.title}
                        className="project-img"
                        sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                      <Stack direction="row" gap={0.75} sx={{ position: 'absolute', top: 10, left: 10, right: 10, justifyContent: 'space-between' }}>
                        {p.featured && (
                          <Chip label="Featured" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, height: 20, fontSize: '0.65rem' }} />
                        )}
                        <Box sx={{ ml: 'auto' }}>
                          <Chip
                            label={p.status}
                            size="small"
                            sx={{ ...statusChip[p.status], border: '1px solid', borderColor: 'inherit', height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                          />
                        </Box>
                      </Stack>
                    </Box>

                    <CardContent sx={{ flex: 1, p: 2.5, pb: 1.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1} sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>{p.title}</Typography>
                        <Chip label={p.category} size="small" sx={{ bgcolor: 'action.hover', fontSize: '0.65rem', height: 18, flexShrink: 0 }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>{p.description}</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.75}>
                        {p.tech.slice(0, 4).map((t) => (
                          <Chip
                            key={t}
                            label={t}
                            size="small"
                            sx={{ bgcolor: 'rgba(157,113,240,0.08)', color: 'primary.main', border: '1px solid rgba(157,113,240,0.2)', fontSize: '0.65rem', height: 20 }}
                          />
                        ))}
                        {p.tech.length > 4 && <Chip label={`+${p.tech.length - 4}`} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ px: 2.5, pb: 2, pt: 1, borderTop: 1, borderColor: 'divider', gap: 1 }}>
                      {p.liveUrl && (
                        <Button component="a" href={p.liveUrl} target="_blank" size="small" startIcon={<OpenInNewRoundedIcon fontSize="small" />} sx={{ fontSize: '0.75rem', p: 0.5 }}>Live</Button>
                      )}
                      {p.githubUrl && (
                        <Button component="a" href={p.githubUrl} target="_blank" size="small" startIcon={<GitHubIcon fontSize="small" />} sx={{ fontSize: '0.75rem', p: 0.5 }}>Code</Button>
                      )}
                      <Box sx={{ flex: 1 }} />
                      <Button component="a" href={`/projects/${p.slug}/`} size="small" endIcon={<ArrowForwardRoundedIcon fontSize="small" />} color="primary" sx={{ fontSize: '0.75rem', fontWeight: 600, p: 0.5 }}>Details</Button>
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
