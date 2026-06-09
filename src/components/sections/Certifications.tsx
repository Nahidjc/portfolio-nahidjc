'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { certifications } from '@/data/certifications';

function fmt(d: string) {
  const [y, m] = d.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + y;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Certifications() {
  return (
    <Box component="section" id="certifications" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeader label="Credentials" title="Certifications" description="Continuous learning and professional development milestones." />

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <Grid container spacing={2.5}>
            {certifications.map((cert) => (
              <Grid key={cert.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeUp} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: (theme) => `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(37,99,235,0.06)'}` },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                        <WorkspacePremiumRoundedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                      </Box>
                      <Typography variant="subtitle1" fontWeight={700} gutterBottom>{cert.name}</Typography>
                      <Typography variant="body2" color="primary" fontWeight={600} sx={{ mb: 0.5 }}>{cert.provider}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>{fmt(cert.date)}</Typography>
                      {cert.credentialUrl && (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Link href={cert.credentialUrl} target="_blank" variant="caption" color="primary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            View Credential <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
                          </Link>
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
