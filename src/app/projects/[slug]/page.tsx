import Link from 'next/link';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import { projects } from '@/data/projects';

const statusChip: Record<string, { bgcolor: string; color: string }> = {
  Live: { bgcolor: 'rgba(16,185,129,0.08)', color: '#10b981' },
  'In Progress': { bgcolor: 'rgba(245,158,11,0.08)', color: '#f59e0b' },
  Archived: { bgcolor: 'rgba(100,100,120,0.08)', color: '#8888aa' },
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: 8 }}>
      {/* Hero Header */}
      <Box sx={{ position: 'relative', bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider', py: { xs: 6, md: 8 }, overflow: 'hidden', mb: 6 }}>
        {/* Glow */}
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          bgcolor: 'primary.main', opacity: 0.04, filter: 'blur(100px)', pointerEvents: 'none',
        }} />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                <Chip label={project.category} size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }} />
                <Chip
                  label={project.status}
                  size="small"
                  sx={{ ...statusChip[project.status], border: '1px solid', borderColor: 'inherit', fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' }, letterSpacing: '-0.03em' }}>
                {project.title}
              </Typography>
              <Typography variant="h5" color="text.secondary" fontWeight={400} sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 600 }}>
                {project.description}
              </Typography>
              <Stack direction="row" gap={2} flexWrap="wrap">
                {project.liveUrl && (
                  <Button
                    component="a"
                    href={project.liveUrl}
                    target="_blank"
                    variant="contained"
                    startIcon={<OpenInNewRoundedIcon />}
                  >
                    Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    component="a"
                    href={project.githubUrl}
                    target="_blank"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                  >
                    Source Code
                  </Button>
                )}
              </Stack>
            </Grid>

            {project.coverImage && (
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{
                  borderRadius: 4, overflow: 'hidden', border: 1, borderColor: 'divider',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
                }}>
                  <Box
                    component="img"
                    src={project.coverImage}
                    alt={project.title}
                    sx={{ width: '100%', display: 'block', objectFit: 'cover', height: { xs: 220, sm: 280, md: 320 } }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Stack direction="row" alignItems="center" gap={1.25} sx={{ mb: 5, color: 'text.secondary', fontSize: '0.875rem', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover-primary">
            Home
          </Link>
          <Typography color="divider">/</Typography>
          <Link href="/#projects" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} className="hover-primary">
            Projects
          </Link>
          <Typography color="divider">/</Typography>
          <Typography color="text.primary" fontWeight={700}>{project.title}</Typography>
        </Stack>

        <Grid container spacing={5}>
          {/* Detailed Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack gap={5}>
              {/* Overview */}
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <InfoRoundedIcon color="primary" sx={{ fontSize: 22 }} /> Overview
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.975rem', lineHeight: 1.8 }}>
                  {project.overview}
                </Typography>
              </Box>

              {/* Problem & Solution */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ height: '100%', borderColor: 'divider', bgcolor: 'action.hover' }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HelpOutlineRoundedIcon sx={{ color: 'secondary.main', fontSize: 20 }} /> The Problem
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        {project.problem}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ height: '100%', borderColor: 'divider', bgcolor: 'action.hover' }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleRoundedIcon sx={{ color: '#10b981', fontSize: 20 }} /> The Solution
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        {project.solution}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Key Features */}
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <CheckCircleRoundedIcon color="success" sx={{ fontSize: 22 }} /> Key Features
                </Typography>
                <Stack gap={1.5}>
                  {project.features.map((feature, idx) => (
                    <Stack key={idx} direction="row" gap={1.5} alignItems="flex-start">
                      <CheckCircleRoundedIcon sx={{ color: '#10b981', fontSize: 18, mt: 0.25, flexShrink: 0 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.925rem', lineHeight: 1.6 }}>{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* Architecture */}
              {project.architecture && (
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <SettingsSuggestRoundedIcon color="primary" sx={{ fontSize: 22 }} /> Architecture
                  </Typography>
                  <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Box sx={{
                      p: 2.5,
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.825rem',
                      lineHeight: 1.6,
                      color: 'primary.main',
                      overflowX: 'auto',
                      bgcolor: 'action.hover'
                    }}>
                      {project.architecture}
                    </Box>
                  </Card>
                </Box>
              )}

              {/* Technical Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <ErrorOutlineRoundedIcon sx={{ color: 'secondary.main', fontSize: 22 }} /> Technical Challenges
                  </Typography>
                  <Stack gap={2}>
                    {project.challenges.map((challenge, idx) => (
                      <Stack key={idx} direction="row" gap={2} alignItems="flex-start">
                        <Box sx={{
                          width: 22, height: 22, borderRadius: '50%',
                          bgcolor: 'secondary.main', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, mt: 0.25
                        }}>
                          {idx + 1}
                        </Box>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.925rem', lineHeight: 1.65 }}>{challenge}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Lessons Learned */}
              {project.lessons && project.lessons.length > 0 && (
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <LightbulbRoundedIcon sx={{ color: '#f59e0b', fontSize: 22 }} /> Lessons Learned
                  </Typography>
                  <Stack gap={1.75}>
                    {project.lessons.map((lesson, idx) => (
                      <Stack key={idx} direction="row" gap={1.5} alignItems="flex-start">
                        <LightbulbRoundedIcon sx={{ color: '#f59e0b', fontSize: 18, mt: 0.25, flexShrink: 0 }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.925rem', lineHeight: 1.65 }}>{lesson}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.5rem', mb: 2.5 }}>Screenshots</Typography>
                  <Grid container spacing={2}>
                    {project.screenshots.map((src, idx) => (
                      <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                        <Box sx={{
                          borderRadius: 3, overflow: 'hidden', border: 1, borderColor: 'divider',
                          bgcolor: 'action.hover', p: 0.5
                        }}>
                          <Box
                            component="img"
                            src={src}
                            alt={`${project.title} Screenshot ${idx + 1}`}
                            sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }}
                            loading="lazy"
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Sidebar Info */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack gap={3.5} sx={{ position: 'sticky', top: 90 }}>
              {/* Tech Stack */}
              <Card sx={{ p: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, mb: 2.5, fontSize: '0.725rem' }}>
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tech.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{
                          bgcolor: 'action.hover',
                          color: 'text.primary',
                          border: '1px solid',
                          borderColor: 'divider',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          px: 0.5,
                          borderRadius: 1.5,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card sx={{ p: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, mb: 2.5, fontSize: '0.725rem' }}>
                    Project Information
                  </Typography>
                  <Stack gap={2}>
                    <Stack direction="row" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider', pb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Status</Typography>
                      <Typography variant="body2" fontWeight={700} color={project.status === 'Live' ? '#10b981' : 'text.primary'}>{project.status}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider', pb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Category</Typography>
                      <Typography variant="body2" fontWeight={700}>{project.category}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ pb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Client/Repo</Typography>
                      <Typography variant="body2" fontWeight={700}>{project.githubUrl ? 'Open Source' : 'Internal'}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Back to Home */}
              <Button
                component={Link}
                href="/#projects"
                variant="outlined"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ py: 1.25, fontWeight: 700 }}
              >
                Back to Projects
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
