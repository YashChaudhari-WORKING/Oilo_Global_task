import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api'; 

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser({ name, email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsSuccess(true); 
      } else {
        setError('Something went wrong!');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong, please try again!');
      setOpenSnackbar(true);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login'); 
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
          Create an Account
        </Typography>

        {isSuccess ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              User Created Successfully!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToLogin}
              sx={{
                borderRadius: '20px',
                padding: 1.5,
                textTransform: 'none',
              }}
            >
              Go to Login Page
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSignup}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Sign Up
            </Button>
          </form>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'red',
            borderRadius: '8px',
          },
        }}
      />
    </Box>
  );
}

export default SignupPage;
