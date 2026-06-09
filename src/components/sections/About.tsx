'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { profile } from '@/data/profile';

const features = [
  { icon: StorageRoundedIcon, title: 'Backend & APIs', description: 'Scalable REST APIs with Node.js, Express, Koa, and NestJS. Clean architecture, reliability, and high performance.' },
  { icon: SmartphoneRoundedIcon, title: 'Mobile (React Native)', description: 'Cross-platform mobile apps with React Native — OTP auth, real-time Socket.IO, biometric security.' },
  { icon: CloudRoundedIcon, title: 'Cloud & Serverless', description: 'AWS Lambda, API Gateway, S3, CloudFront, and microservices. Scaling services in the cloud cost-efficiently.' },
  { icon: AccountBalanceRoundedIcon, title: 'Fintech Systems', description: 'Payment flows, subscription modules, gift card services, and financial microservices. Security non-negotiable.' },
];

const timeline = [
  { year: '2018', event: 'Started BSc in Computer Science & Engineering at Daffodil International University.' },
  { year: '2019', event: 'Competed in ICPC Preliminary Regional Dhaka and DIU Programming Contest. Started competitive programming.' },
  { year: '2021', event: 'Competed in ICPC 2021. Completed Full Stack Web Dev certification.' },
  { year: '2022', event: 'Graduated with CGPA 3.91. Joined Spring Rain Pvt Ltd as Software Engineer in fintech.' },
  { year: '2024', event: 'Completed 2.5 years at Spring Rain. Shipped recurring subscription module and AWS SNS integrations.' },
  { year: '2025', event: 'Joined C3bit as Full Stack Engineer. Leading telemedicine and video banking platforms.' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function About() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader label="About Me" title="Engineering with purpose" description={profile.bio} />

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <Grid container spacing={2.5} sx={{ mb: 8 }}>
            {features.map((f) => (
              <Grid key={f.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                <motion.div variants={fadeUp} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(37,99,235,0.06)'}`
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main', opacity: 0.12, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <f.icon sx={{ color: 'primary.main', fontSize: 22 }} />
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" fontWeight={700} gutterBottom>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: '1.75rem', mb: 2.5 }}>Engineering Philosophy</Typography>
              <Box sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 3, mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.8, fontSize: '1.025rem' }}>
                  "Good software isn't just about making things work — it's about making them work reliably, securely, and in a way the next engineer can understand."
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.925rem' }}>
                My current focus is on fintech systems, serverless microservices, and real-time communication platforms. I care about clean API design and payment infrastructure users can trust.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.925rem' }}>
                When I'm not coding, I explore system design concepts and contribute to making that knowledge accessible to the Bangladeshi developer community.
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 3.5, fontSize: '1.75rem' }}>Career Journey</Typography>
              <Box sx={{ pl: 2.5, borderLeft: 2, borderColor: 'divider' }}>
                {timeline.map((t) => (
                  <Box key={t.year} sx={{ position: 'relative', mb: 3, '&:last-child': { mb: 0 } }}>
                    <Box sx={{
                      position: 'absolute', left: -32, top: 4,
                      width: 12, height: 12, borderRadius: '50%',
                      bgcolor: 'primary.main', border: '2px solid', borderColor: 'background.default',
                    }} />
                    <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 0.25, fontWeight: 700 }}>{t.year}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>{t.event}</Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
