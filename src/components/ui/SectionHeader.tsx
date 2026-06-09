'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: centered ? 'center' : 'left' }}>
        {label && (
          <Typography
            variant="overline"
            color="primary"
            sx={{ display: 'block', mb: 1.5 }}
          >
            {label}
          </Typography>
        )}
        <Typography variant="h2" sx={{ mb: 1.5, color: 'text.primary' }}>
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, ...(centered && { mx: 'auto' }) }}
          >
            {description}
          </Typography>
        )}
        <Box
          sx={{
            mt: 2.5,
            height: 3,
            width: 48,
            borderRadius: 2,
            bgcolor: 'primary.main',
            ...(centered && { mx: 'auto' }),
          }}
        />
      </Box>
    </motion.div>
  );
}
