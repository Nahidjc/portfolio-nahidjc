'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: '8rem', fontWeight: 800, color: 'primary.main', lineHeight: 1 }}
        >
          404
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" size="large" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
