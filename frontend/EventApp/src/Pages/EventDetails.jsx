import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  CircularProgress,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchEventDetails, rsvpEvent } from "../services/api"; 
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

function EventDetailPage() {
  const { eventId } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRsvp, setIsRsvp] = useState(false); 
  const [dialogOpen, setDialogOpen] = useState(false); 

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchEventDetails(eventId); 
        setEvent(response.event);
        setIsRsvp(response.event.isRsvp); 
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId]);

  const handleRsvp = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await rsvpEvent(eventId, token); 
      setIsRsvp(true);
      setDialogOpen(true);
    } catch (err) {
      alert("Failed to RSVP. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false); 
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <ErrorOutlineIcon color="error" sx={{ marginRight: "10px" }} />
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card
        sx={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="300"
            image={event.coverImage}
            alt={event.title}
          />
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "white",
            }}
          >
            <Chip label={event.eventType} color="primary" sx={{ fontSize: "16px", marginBottom: "5px" }} />
            <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {event.location}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ textAlign: "center", padding: "20px" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: "10px", fontSize: "32px" }}
          >
            {event.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", marginBottom: "5px", fontSize: "18px" }}
          >
            {new Date(event.date).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", marginBottom: "20px", fontSize: "18px" }}
          >
            {event.time}
          </Typography>
        </CardContent>
<Box sx={{ padding: "20px" }}>           <Typography             variant="h6"             sx={{ fontWeight: "bold", marginBottom: "10px", fontSize: "20px" }}           >             Description           </Typography>           <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "16px" }}>             {event.description}           </Typography>         </Box>          {/* Event Creator Section */}         <Box sx={{ padding: "20px" }}>           <Typography             variant="h6"             sx={{ fontWeight: "bold", marginBottom: "10px", fontSize: "20px" }}           >             Event Creator           </Typography>           <Typography variant="body2" sx={{ marginBottom: "5px", fontSize: "16px" }}>             {event.creator.name}           </Typography>           <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "16px" }}>             {event.creator.email}           </Typography>         </Box>          {/* Attendees Section */}         <Box sx={{ padding: "20px" }}>           <Typography             variant="h6"             sx={{ fontWeight: "bold", marginBottom: "10px", fontSize: "20px" }}           >             Attendees           </Typography>           <Grid container spacing={2}>             {event.attendees.map((attendee) => (               <Grid item xs={4} sm={3} md={2} key={attendee._id}>                 <Box                   sx={{                     textAlign: "center",                     display: "flex",                     flexDirection: "column",                     alignItems: "center",                   }}                 >                   <Avatar                     sx={{ bgcolor: "#10B981", width: 56, height: 56 }}                     alt={attendee.name}                   >                     {attendee.name.charAt(0)}                   </Avatar>                   <Typography                     variant="body2"                     sx={{ marginTop: "5px", fontSize: "14px" }}                   >                     {attendee.name}                   </Typography>                 </Box>               </Grid>             ))}           </Grid>         </Box>          {/* Additional Information Section */}         <Box sx={{ padding: "20px" }}>           <Typography             variant="h6"             sx={{ fontWeight: "bold", marginBottom: "10px", fontSize: "20px" }}           >             Additional Info           </Typography>           <Typography variant="body2" sx={{ marginBottom: "5px", fontSize: "16px" }}>             Created At: {new Date(event.createdAt).toDateString()}           </Typography>           <Typography variant="body2" sx={{ marginBottom: "5px", fontSize: "16px" }}>             Updated At: {new Date(event.updatedAt).toDateString()}           </Typography>           <Typography variant="body2" sx={{ fontSize: "16px" }}>             Revisions: {event.revisions}           </Typography>         </Box>       
        <Box
          sx={{
            padding: "20px",
            borderTop: "1px solid #E0E0E0",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {isRsvp ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "#b30000" },
              }}
            >
              Cancel Event
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#10B981",
                "&:hover": { backgroundColor: "#0F9F6E" },
              }}
              onClick={handleRsvp}
            >
              Join Event
            </Button>
          )}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <FacebookIcon sx={{ color: "#1877F2", cursor: "pointer" }} />
            <TwitterIcon sx={{ color: "#1DA1F2", cursor: "pointer" }} />
          </Box>
        </Box>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>You have successfully RSVP'd to the event!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}

export default EventDetailPage;
