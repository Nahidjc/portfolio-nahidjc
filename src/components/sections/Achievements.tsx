'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SectionHeader from '@/components/ui/SectionHeader';
import { achievements } from '@/data/achievements';

const typeConfig: Record<string, { icon: typeof EmojiEventsRoundedIcon; label: string; color: string }> = {
  award: { icon: EmojiEventsRoundedIcon, label: 'Award', color: '#f59e0b' },
  community: { icon: GroupsRoundedIcon, label: 'Community', color: '#06b6d4' },
  'open-source': { icon: CodeRoundedIcon, label: 'Open Source', color: '#10b981' },
  publication: { icon: ArticleRoundedIcon, label: 'Publication', color: '#8b5cf6' },
  speaking: { icon: ArticleRoundedIcon, label: 'Speaking', color: '#f43f5e' },
};

function fmt(d: string) {
  const [y, m] = d.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m - 1] + ' ' + y;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Achievements() {
  return (
    <Box component="section" id="achievements" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader label="Milestones" title="Achievements" description="Highlights from competitions, open source, and the broader tech community." />

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <Grid container spacing={2.5}>
            {achievements.map((ach) => {
              const cfg = typeConfig[ach.type] ?? typeConfig.community;
              const Icon = cfg.icon;
              return (
                <Grid key={ach.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <motion.div variants={fadeUp} style={{ height: '100%' }}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: '0 12px 40px rgba(157,113,240,0.1)' },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                          <Box sx={{ width: 44, height: 44, borderRadius: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: `${cfg.color}15` }}>
                            <Icon sx={{ color: cfg.color, fontSize: 22 }} />
                          </Box>
                          <Chip
                            label={cfg.label}
                            size="small"
                            sx={{ bgcolor: `${cfg.color}15`, color: cfg.color, fontSize: '0.65rem', height: 20, fontWeight: 600 }}
                          />
                        </Stack>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom>{ach.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>{ach.description}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">{fmt(ach.date)}</Typography>
                          {ach.url && ach.url !== '#' && (
                            <Link href={ach.url} target="_blank" variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
                              View <OpenInNewRoundedIcon sx={{ fontSize: 11 }} />
                            </Link>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
