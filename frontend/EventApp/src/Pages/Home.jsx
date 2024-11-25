import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material'; 
import { rsvpEvent, fetchEvents } from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Silder';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successDialog, setSuccessDialog] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const eventData = await fetchEvents(token);
        setEvents(eventData);
      } catch (error) {
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [token]);


  const handleRSVP = async (eventId) => {
    try {
      await rsvpEvent(eventId, token); 
      setSuccessDialog(true); 
    } catch (error) {
      alert('Failed to RSVP. Please try again later.');
    }
  };

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`); 
  };

  const closeDialog = () => setSuccessDialog(false);

  if (loading) {
    return <Typography variant="h6">Loading events...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <>
      <Slider />
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card
                onClick={() => handleCardClick(event._id)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={event.coverImage}
                  alt={event.title}
                  sx={{ borderRadius: '15px 15px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{event.title}</Typography>
                  <Typography variant="body2">{new Date(event.date).toDateString()} at {event.time}</Typography>
                  <Typography variant="body2">{event.location}</Typography>
                  <Typography variant="body2" sx={{ marginTop: '10px', color: '#1976d2', fontWeight: 'bold' }}>
                    Attendance: {event.attendees ? event.attendees.length : 0}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRSVP(event._id);
                    }}
                    sx={{ borderRadius: '20px', '&:hover': { backgroundColor: '#1565c0' } }}
                  >
                    RSVP
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

 
      <Dialog
        open={successDialog}
        onClose={closeDialog}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            width: '400px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in-out',
          },
        }}
      >
        <DialogContent>
          <CheckCircle
            sx={{
              fontSize: '100px',
              color: 'green',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
            Success!
          </Typography>
          <Typography>You are registered for this event!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
