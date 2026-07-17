import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 120, fontWeight: 700, color: '#FF4757' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600, mt: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#888', mt: 1, maxWidth: 500 }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{
            mt: 4,
            bgcolor: '#FF4757',
            '&:hover': { bgcolor: '#CC1A2C' },
            px: 4,
            py: 1.5,
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;