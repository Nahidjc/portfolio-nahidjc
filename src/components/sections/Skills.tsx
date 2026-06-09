'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as Si from 'react-icons/si';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillGroups } from '@/data/skills';

function getIcon(name: string) {
  const Icon = (Si as Record<string, React.ComponentType<{ size?: number }>>)[name];
  return Icon ? <Icon size={22} /> : <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{name.replace('Si', '').slice(0, 2)}</Typography>;
}

const ALL = 'All';
const categories = [ALL, ...skillGroups.map((g) => g.category)];

const card: any = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};
const grid = { hidden: {}, show: { transition: { staggerChildren: 0.03 } } };

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

        <Box sx={{
          display: 'flex',
          gap: 1.25,
          mb: 5,
          overflowX: 'auto',
          pb: 1,
          mx: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActive(cat)}
              variant={active === cat ? 'filled' : 'outlined'}
              sx={{
                flexShrink: 0,
                fontWeight: 700,
                fontSize: '0.75rem',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                ...(active === cat
                  ? {
                      bgcolor: 'primary.main',
                      color: 'white',
                      boxShadow: (theme) => `0 6px 20px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(37,99,235,0.2)'}`
                    }
                  : {
                      borderColor: 'divider',
                      color: 'text.secondary',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'action.hover' }
                    }),
              }}
            />
          ))}
        </Box>

        <motion.div key={active} variants={grid} initial="hidden" animate="show">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(4,1fr)', lg: 'repeat(5,1fr)' },
            gap: 2.5,
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
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'default',
                      transition: 'all 0.25s ease-in-out',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 10px 30px ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.1)' : 'rgba(37,99,235,0.04)'}`,
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap={1.5} sx={{ width: '100%' }}>
                      <Box sx={{
                        width: 38, height: 38, borderRadius: 1.5,
                        bgcolor: 'action.hover', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: 'primary.main',
                        border: 1,
                        borderColor: 'divider',
                        flexShrink: 0,
                      }}>
                        {getIcon(skill.icon)}
                      </Box>
                      <Typography variant="body2" fontWeight={800} sx={{ fontSize: '0.875rem', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {skill.name}
                      </Typography>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </motion.div>

        {active === ALL && (
          <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {skillGroups.map((g) => (
              <Button
                key={g.category}
                onClick={() => setActive(g.category)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  gap: 0.75,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.6 }} />
                {g.category} ({g.skills.length})
              </Button>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
