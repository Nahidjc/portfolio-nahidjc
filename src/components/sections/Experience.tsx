'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { experiences } from '@/data/experience';

function fmt(d: string | null) {
  if (!d) return 'Present';
  const [y, m] = d.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + y;
}

function dur(start: string, end: string | null) {
  const s = new Date(start), e = end ? new Date(end) : new Date();
  const mo = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
  const yr = Math.floor(mo / 12), rm = mo % 12;
  if (yr === 0) return `${rm} mo`;
  if (rm === 0) return `${yr} yr`;
  return `${yr} yr ${rm} mo`;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const slideIn = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

export default function Experience() {
  const [expanded, setExpanded] = useState<string | false>(experiences[0]?.id ?? false);

  return (
    <Box component="section" id="experience" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader label="Work History" title="Professional Experience" description="A track record of building systems that scale and teams that thrive." />

        <Box sx={{ position: 'relative', pl: { xs: 3, sm: 4 }, borderLeft: 2, borderColor: 'divider' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {experiences.map((exp) => (
              <motion.div key={exp.id} variants={slideIn}>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  
                  <Box sx={{
                    position: 'absolute', left: { xs: -32, sm: -34 }, top: 20,
                    width: 14, height: 14, borderRadius: '50%',
                    bgcolor: 'background.default', border: '2px solid', borderColor: 'primary.main',
                    boxShadow: (theme) => `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.18)' : 'rgba(37,99,235,0.1)'}`,
                    zIndex: 2,
                  }} />

                  <Accordion
                    expanded={expanded === exp.id}
                    onChange={(_, isOpen) => setExpanded(isOpen ? exp.id : false)}
                    sx={{
                      borderColor: expanded === exp.id ? 'primary.main' : 'divider',
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: expanded === exp.id
                        ? (theme) => `0 12px 32px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.03)'}`
                        : 'none',
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ py: 1, px: 3.5 }}>
                      <Box sx={{ flex: 1, pr: 2 }}>
                        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" sx={{ mb: 0.5 }}>
                          <Typography variant="subtitle1" fontWeight={800} sx={{ fontSize: '1rem' }}>{exp.role}</Typography>
                          <Chip label={exp.type} size="small" sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 600, height: 20, fontSize: '0.68rem', borderRadius: 1.5 }} />
                          {!exp.endDate && (
                            <Chip label="Current" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', height: 20, fontSize: '0.68rem', borderRadius: 1.5 }} />
                          )}
                        </Stack>
                        <Typography variant="body2" color="primary" fontWeight={700} sx={{ mb: 1 }}>{exp.company}</Typography>
                        <Stack direction="row" flexWrap="wrap" gap={2.5}>
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            <LocationOnRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>{exp.location}</Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            <CalendarTodayRoundedIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={500} suppressHydrationWarning>
                              {fmt(exp.startDate)} – {fmt(exp.endDate)} · {dur(exp.startDate, exp.endDate)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 3.5, pb: 3.5, pt: 1 }}>
                      
                      <Box sx={{
                        bgcolor: 'action.hover',
                        border: '1px solid',
                        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(37,99,235,0.1)',
                        borderRadius: 2,
                        p: 2.5,
                        mb: 3.5,
                      }}>
                        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                          <TrendingUpRoundedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography variant="caption" fontWeight={800} color="primary" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>Business Impact</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.65 }}>{exp.impact}</Typography>
                      </Box>

                      <Grid container spacing={3.5} sx={{ mb: 3.5 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.75 }}>Responsibilities</Typography>
                          <Stack gap={1.25}>
                            {exp.responsibilities.map((r, i) => (
                              <Stack key={i} direction="row" gap={1.25} alignItems="flex-start">
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 0.8, flexShrink: 0 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>{r}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.75 }}>Key Achievements</Typography>
                          <Stack gap={1.25}>
                            {exp.achievements.map((a, i) => (
                              <Stack key={i} direction="row" gap={1} alignItems="flex-start">
                                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.25, flexShrink: 0 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>{a}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Grid>
                      </Grid>

                      <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>Tech Stack</Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {exp.tech.map((t) => (
                          <Chip
                            key={t}
                            label={t}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: 'divider',
                              fontSize: '0.725rem',
                              bgcolor: 'background.default',
                              '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
                            }}
                          />
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
