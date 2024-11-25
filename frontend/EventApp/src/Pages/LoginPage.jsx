import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Stack,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        
        localStorage.setItem('token', data.token);

    
        setSuccessMessage('User logged in successfully!');
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate('/');
        }, 2000); 
      } else {
        setError('Invalid credentials!');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong, please try again!');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        mt: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: 3,
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Welcome Back!
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: 3,
              '.MuiInputBase-root': {
                backgroundColor: '#fff',
                borderRadius: '12px',
              },
              '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 3,
              '.MuiInputBase-root': {
                backgroundColor: '#fff',
                borderRadius: '12px',
              },
              '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            }}
          />

          <Stack spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                padding: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/signup')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                padding: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Register Here
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={successMessage || error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: successMessage ? 'green' : 'red',
            borderRadius: '8px',
          },
        }}
      />
    </Box>
  );
}

export default LoginPage;
