'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { profile } from '@/data/profile';

const contactInfo = [
  { Icon: EmailRoundedIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { Icon: PhoneRoundedIcon, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { Icon: LocationOnRoundedIcon, label: 'Location', value: profile.location, href: '#' },
  { Icon: GitHubIcon, label: 'GitHub', value: 'github.com/nahidjc', href: 'https://github.com/nahidjc' },
  { Icon: LinkedInIcon, label: 'LinkedIn', value: 'linkedin.com/in/nahidjc', href: 'https://www.linkedin.com/in/nahidjc' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader label="Let's Talk" title="Ready to build something great?" description="Whether you have a project in mind, a question, or just want to say hello — my inbox is always open." centered />

        <Grid container spacing={4}>
          {/* Contact info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Contact Information</Typography>
              <Stack gap={1.5}>
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <Card
                    key={label}
                    component={Link}
                    href={href}
                    underline="none"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 2, p: 2,
                      cursor: 'pointer', transition: 'all 0.2s',
                      color: 'text.primary',
                      '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(157,113,240,0.1)', transform: 'translateY(-1px)', color: 'primary.main' },
                    }}
                  >
                    <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(157,113,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">{label}</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>{value}</Typography>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card>
                <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>Send a message</Typography>
                  <Box component="form" onSubmit={handle} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required size="small" />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required size="small" />
                      </Grid>
                      <Grid size={12}>
                        <TextField fullWidth label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required size="small" />
                      </Grid>
                      <Grid size={12}>
                        <TextField fullWidth label="Message" multiline rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                      </Grid>
                      <Grid size={12}>
                        {sent && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Message sent! I'll get back to you soon.</Alert>}
                        <Button type="submit" variant="contained" size="large" fullWidth endIcon={<SendRoundedIcon />} sx={{ boxShadow: '0 8px 24px rgba(157,113,240,0.25)' }}>
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
