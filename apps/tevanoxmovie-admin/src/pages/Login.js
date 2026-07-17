import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#0a0a1a',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(255,71,87,0.1) 0%, rgba(0,0,0,0) 70%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: '#1a1a2e',
            borderRadius: 2,
            border: '1px solid #2a2a3e',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
              🎬 TevanoxMovie
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#888', mt: 1 }}>
              Admin Dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#888' }} />
                  </InputAdornment>
                ),
                sx: {
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF4757' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF4757' },
                },
              }}
              InputLabelProps={{ sx: { color: '#888' } }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#888' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff sx={{ color: '#888' }} /> : <Visibility sx={{ color: '#888' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF4757' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF4757' },
                },
              }}
              InputLabelProps={{ sx: { color: '#888' } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: '#FF4757',
                '&:hover': { bgcolor: '#CC1A2C' },
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#666' }}>
              © 2024 Tevanox. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;