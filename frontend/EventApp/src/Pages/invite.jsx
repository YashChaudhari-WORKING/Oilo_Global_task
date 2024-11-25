import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const InviteUserPage = () => {
  const { eventid } = useParams(); // Get event ID from the URL
  const [username, setUsername] = useState(''); // State for the username
  const [loading, setLoading] = useState(false); // State for API call loading
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();
  const handleInviteUser = async () => {
    if (!username) {
      setErrorMessage('Username is required');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
   
      const token = localStorage.getItem("token"); 
      
      
     
      const response = await axios.post(
        `http://localhost:5000/api/events/invite/${eventid}`,
        { userId: username },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      
      setSuccessMessage(`User invited successfully: ${response.data.message}`);
      setTimeout(() => {
       navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to invite user. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5">Invite User</Typography>

      <Typography variant="body2" sx={{ marginTop: '10px' }}>
        Enter the username of the person you wish to invite to this event.
      </Typography>

      <TextField
        label="Username or User ID"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginTop: '20px', marginBottom: '20px' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleInviteUser}
        disabled={loading}
        sx={{ width: '100%' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Invitation'}
      </Button>

      {successMessage && (
        <Typography variant="body2" color="success.main" sx={{ marginTop: '10px' }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default InviteUserPage;
