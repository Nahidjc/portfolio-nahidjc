'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <Box component="section" id="testimonials" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader label="Recommendations" title="What colleagues say" description="Genuine LinkedIn recommendations from team members and mentors." centered />

        {/* Desktop: side-by-side */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Grid container spacing={3}>
            {testimonials.map((test, i) => (
              <Grid key={test.id} size={{ md: 6 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <TestimonialCard testimonial={test} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mobile: carousel */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          </AnimatePresence>
          <Stack direction="row" justifyContent="center" alignItems="center" gap={2} sx={{ mt: 3 }}>
            <IconButton onClick={prev} size="small" sx={{ border: 1, borderColor: 'divider' }}><ChevronLeftRoundedIcon /></IconButton>
            <Typography variant="caption" color="text.secondary">{idx + 1} / {testimonials.length}</Typography>
            <IconButton onClick={next} size="small" sx={{ border: 1, borderColor: 'divider' }}><ChevronRightRoundedIcon /></IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: typeof testimonials[number] }) {
  return (
    <Card sx={{ height: '100%', p: 0.5, transition: 'all 0.3s ease-in-out', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: (theme) => `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(37,99,235,0.06)'}` } }}>
      <CardContent sx={{ p: 3 }}>
        <FormatQuoteRoundedIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.3, mb: 1.5, mt: -0.5 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            mb: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            minHeight: '8.5em',
          }}
        >
          "{t.content}"
        </Typography>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar src={t.avatar} alt={t.name} sx={{ width: 48, height: 48, border: '2px solid', borderColor: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>{t.name}</Typography>
            <Typography variant="caption" color="text.secondary" display="block">{t.role}</Typography>
            <Typography variant="caption" color="primary" display="block" fontWeight={600}>{t.company}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
