import React, { useState, useEffect } from "react";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { Event, EventNote, AccountCircle, Token } from "@mui/icons-material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [events1, setEvents1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const navigate = useNavigate();
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  useEffect(() => {
    const fetchEvents = async () => {
      if (selectedTab === 0) {
        setLoading(true);
        setError("");
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5000/api/users/gets", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents(response.data);
          console.log(events); 
        } catch (err) {
          setError("Failed to fetch events. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, [selectedTab]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (selectedTab === 1) {
        setLoading(true);
        setError("");
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5000/api/users/getcE", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents1(response.data); 
          console.log(events1);
        
        } catch (err) {
          setError("Failed to fetch events. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, [selectedTab]);
 
function handlenext(id,extra){
    navigate('/update-event', { state: { eventData: extra } });
}

function handlenext1(id){
    navigate(`/invite/${id}`);
}
    async function handledelete(id){
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:5000/api/events/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setEvents1((prevEvents) => prevEvents.filter((events1) => id !== events1._id));
        return response.data;
      } catch (error) {
        console.error('Error deleting event:', error.response?.data || error.message);
        throw error;
      }
  }



  const handleCancelEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <Box
    sx={{
        width: "100%",
        background: "rgba(255, 255, 255, 0)",
        minHeight: "100vh",
        padding: "50px 20px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Box  sx={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          sx={{
            backgroundColor: "#f4f6f8" ,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Event sx={{ marginRight: "8px" }} />
                <Typography variant="body2">Your Events</Typography>
              </Box>
            }
            sx={{
              "&:hover": { backgroundColor: "#f1f1f1", transition: "0.3s" },
              transition: "0.3s",
              borderRadius: "8px",
            }}
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EventNote sx={{ marginRight: "8px" }} />
                <Typography variant="body2">Your Created Events</Typography>
              </Box>
            }
            sx={{
              "&:hover": { backgroundColor: "#f1f1f1", transition: "0.3s" },
              transition: "0.3s",
              borderRadius: "8px",
            }}
          />
          
        </Tabs>
      </Box>

      <Box sx={{ width: "100%", margin: "30px auto" }}>
        {selectedTab === 0 && (
          <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h5">Your RSVP Events</Typography>
            <Typography variant="body2" sx={{ marginBottom: "20px" }}>
              Here you can manage your upcoming events.
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{new Date(event.date).toDateString()}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleCancelEvent(event.id)}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {selectedTab === 1 && (
          <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h5">Your Created Events</Typography>
            <Typography variant="body2">These are the events you have created.</Typography>




            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events1.length > 0 ? (
                      events1.map((event) => (
                        <TableRow key={event._id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{new Date(event.date).toDateString()}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={()=>{handledelete(event._id)}}
                            >
                              delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                             onClick={()=>{handlenext(event._id,event)}}
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                             onClick={()=>handlenext1(event._id)}
                            >
                              Invite
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            
          </Box>
        )}


      </Box>
    </Box>
  );
};

export default DashboardPage;
