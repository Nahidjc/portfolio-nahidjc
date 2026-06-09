'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { education } from '@/data/education';

function fmt(d: string) {
  const [y, m] = d.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + y;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const slideIn = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

export default function Education() {
  return (
    <Box component="section" id="education" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader label="Academic Background" title="Education" description="The foundation that shaped how I think about problems, systems, and engineering." />

        <Box sx={{ pl: { xs: 3, sm: 4 }, borderLeft: 2, borderColor: 'divider' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {education.map((edu) => (
              <motion.div key={edu.id} variants={slideIn}>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  
                  <Box sx={{
                    position: 'absolute', left: { xs: -22, sm: -24 }, top: 24,
                    width: 16, height: 16, borderRadius: '50%',
                    bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 3px rgba(157,113,240,0.15)',
                  }}>
                    <SchoolRoundedIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                  </Box>

                  <Card
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 32px rgba(157,113,240,0.1)', transform: 'translateY(-2px)' },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1.5} sx={{ mb: edu.achievements.length > 0 ? 2.5 : 0 }}>
                        <Box>
                          <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" sx={{ mb: 0.75 }}>
                            <Typography variant="subtitle1" fontWeight={700}>{edu.degree}</Typography>
                            <Chip
                              label={edu.major}
                              size="small"
                              sx={{ bgcolor: 'rgba(157,113,240,0.1)', color: 'primary.main', border: '1px solid rgba(157,113,240,0.2)', height: 20, fontSize: '0.68rem' }}
                            />
                          </Stack>
                          <Typography variant="body2" fontWeight={600} color="primary" sx={{ mb: 0.5 }}>{edu.institution}</Typography>
                          <Typography variant="caption" color="text.secondary">{fmt(edu.startDate)} – {fmt(edu.endDate)}</Typography>
                        </Box>
                      </Stack>

                      {edu.achievements.length > 0 && (
                        <Box sx={{ pt: 2.5, borderTop: 1, borderColor: 'divider' }}>
                          <Stack direction="row" alignItems="center" gap={0.75} sx={{ mb: 1.5 }}>
                            <EmojiEventsRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Achievements</Typography>
                          </Stack>
                          <Stack gap={1}>
                            {edu.achievements.map((a, i) => (
                              <Stack key={i} direction="row" gap={1} alignItems="flex-start">
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 0.8, flexShrink: 0 }} />
                                <Typography variant="body2" color="text.secondary">{a}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
