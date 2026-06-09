import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { profile } from '@/data/profile';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        py: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: 'white',
                }}
              >
                MN
              </Box>
              <Typography fontWeight={700}>MD.NAHID</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260, lineHeight: 1.7 }}>
              Building scalable systems. Shipping clean code. Open to exciting opportunities.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 6, sm: 3.5 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mb: 2 }}
            >
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navLinks.map(({ label, id }) => (
                <Link
                  key={id}
                  component="button"
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  underline="none"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'left',
                    transition: 'color 0.2s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Connect */}
          <Grid size={{ xs: 6, sm: 3.5 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', mb: 2 }}
            >
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                    }}
                  >
                    {Icon && <Icon size={15} />}
                  </IconButton>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} MD.NAHID · Built with Next.js + MUI
          </Typography>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            size="small"
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
            aria-label="Back to top"
          >
            <KeyboardArrowUpRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
