'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { blogPosts } from '@/data/blogs';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-');
  const date = new Date(+y, +m - 1, +d);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blog() {
  return (
    <Box component="section" id="blog" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Writing"
          title="Latest Articles"
          description="Deep dives into engineering concepts, systems architecture, and TypeScript best practices."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <Grid container spacing={3.5}>
            {blogPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <motion.div variants={fadeUp} style={{ height: '100%' }}>
                  <Card
                    component="a"
                    href={post.url}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(37,99,235,0.06)'}`,
                        '& .blog-img': { transform: 'scale(1.04)' },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 160, flexShrink: 0 }}>
                      <CardMedia
                        component="img"
                        image={post.coverImage}
                        alt={post.title}
                        className="blog-img"
                        sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease-in-out' }}
                      />
                    </Box>

                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                      {/* Meta */}
                      <Stack direction="row" gap={2} sx={{ mb: 1.5 }}>
                        <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: 'text.secondary' }}>
                          <CalendarTodayRoundedIcon sx={{ fontSize: 11 }} />
                          <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                            {formatDate(post.date)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: 'text.secondary' }}>
                          <AccessTimeRoundedIcon sx={{ fontSize: 11 }} />
                          <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                            {post.readTime}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="text.primary"
                        sx={{
                          fontSize: '0.95rem',
                          lineHeight: 1.4,
                          mb: 1.25,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Summary */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '0.825rem',
                          lineHeight: 1.6,
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.summary}
                      </Typography>

                      {/* Tags */}
                      <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: 'action.hover',
                              color: 'text.secondary',
                              fontSize: '0.625rem',
                              height: 18,
                              fontWeight: 600,
                              borderRadius: 1,
                            }}
                          />
                        ))}
                      </Box>
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
