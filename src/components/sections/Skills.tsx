'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import * as Si from 'react-icons/si';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillGroups } from '@/data/skills';

function getIcon(name: string) {
  const Icon = (Si as Record<string, React.ComponentType<{ size?: number }>>)[name];
  return Icon ? <Icon size={22} /> : <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{name.replace('Si', '').slice(0, 2)}</Typography>;
}

const ALL = 'All';
const categories = [ALL, ...skillGroups.map((g) => g.category)];

const card = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};
const grid = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };

export default function Skills() {
  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL
      ? skillGroups.flatMap((g) => g.skills)
      : skillGroups.find((g) => g.category === active)?.skills ?? [];

  return (
    <Box component="section" id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <SectionHeader
          label="Technical Skills"
          title="What I work with"
          description="Technologies I use to build production-ready services, mobile apps, and cloud-native systems."
        />

        {/* Filter chips — horizontally scrollable on mobile */}
        <Box sx={{ display: 'flex', gap: 1, mb: 5, overflowX: 'auto', pb: 0.5, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 }, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActive(cat)}
              variant={active === cat ? 'filled' : 'outlined'}
              sx={{
                flexShrink: 0,
                fontWeight: 600,
                fontSize: '0.8rem',
                borderRadius: 3,
                cursor: 'pointer',
                ...(active === cat
                  ? { bgcolor: 'primary.main', color: 'white', boxShadow: '0 4px 16px rgba(157,113,240,0.3)' }
                  : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }),
              }}
            />
          ))}
        </Box>

        {/* Skill cards */}
        <motion.div key={active} variants={grid} initial="hidden" animate="show">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(3,1fr)', sm: 'repeat(4,1fr)', md: 'repeat(5,1fr)', lg: 'repeat(6,1fr)' },
            gap: { xs: 1.5, sm: 2 },
          }}>
            <AnimatePresence mode="popLayout">
              {visible.map((skill) => (
                <motion.div key={skill.name} variants={card} layout>
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 3,
                      p: { xs: 1.5, sm: 2 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1.25,
                      cursor: 'default',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 20px rgba(157,113,240,0.12)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box sx={{
                      width: 40, height: 40, borderRadius: 2,
                      bgcolor: 'primary.main', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: 'white', opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 },
                    }}>
                      {getIcon(skill.icon)}
                    </Box>
                    <Typography variant="caption" fontWeight={500} textAlign="center" sx={{ lineHeight: 1.3 }}>
                      {skill.name}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </motion.div>

        {/* Category legend (All view) */}
        {active === ALL && (
          <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {skillGroups.map((g) => (
              <Button
                key={g.category}
                onClick={() => setActive(g.category)}
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, fontSize: '0.75rem', gap: 0.75 }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.6 }} />
                {g.category} ({g.skills.length})
              </Button>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
