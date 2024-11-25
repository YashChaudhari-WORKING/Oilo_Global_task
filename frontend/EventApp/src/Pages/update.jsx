import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const UpdateEventPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  
  useEffect(() => {
    if (location.state && location.state.eventData) {
      setEvent(location.state.eventData);
    } else {
      setError('Event data is missing');
    }
  }, [location.state]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const token = localStorage.getItem("token"); 
    const updatedEvent = {
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString(), 
        time: event.time,
        location: event.location
      };
    
    try {
      await axios.put(`http://localhost:5000/api/events/update/${event._id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      setUpdating(false);
      navigate('/dashboard');


    } catch (error) {
      setError('Error updating event');
      setUpdating(false);
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5">Update Event</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleUpdateEvent}>
        <TextField
          label="Event Name"
          fullWidth
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Event Date"
          type="date"
          fullWidth
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          sx={{ marginBottom: '10px' }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Event Time"
          type="time"
          fullWidth
          value={event.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Location"
          fullWidth
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Description"
          fullWidth
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          sx={{ marginBottom: '20px' }}
        />

        <Button variant="contained" color="primary" type="submit" disabled={updating}>
          {updating ? <CircularProgress size={24} color="inherit" /> : 'Update Event'}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateEventPage;
