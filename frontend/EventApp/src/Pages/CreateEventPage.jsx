import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/api";

function CreateEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "Public",
    coverImage: "",
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await createEvent(eventData, token);
      if (response.success) {
        setSuccessDialogOpen(true); 
        setErrorMessage(""); 
      } else {
        setErrorMessage(response.message || "Failed to create event.");
        setSuccessDialogOpen(false); 
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setSuccessDialogOpen(false); 
    }
  };

  const handleDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate("/"); 
  };

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontFamily: "Roboto, sans-serif",
        background: "linear-gradient(135deg, #f3e5f5, #e1f5fe)", 
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          multiline
          rows={4}
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Time"
          name="time"
          type="time"
          value={eventData.time}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          required
          variant="outlined"
        />
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="event-type-label">Event Type</InputLabel>
          <Select
            labelId="event-type-label"
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            required
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Cover Image URL"
          name="coverImage"
          value={eventData.coverImage}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: "12px 0",
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#45a049" },
            fontWeight: "bold",
          }}
        >
          Create Event
        </Button>
      </form>
      {errorMessage && (
        <Typography
          color="red"
          sx={{
            marginTop: "15px",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {errorMessage}
        </Typography>
      )}

 
      <Dialog
        open={successDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "1.5rem",
            }}
          >
            <CheckCircleOutline color="success" fontSize="large" />
            Event Created Successfully!
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography id="success-dialog-description" sx={{ textAlign: "center" }}>
            Your event has been created and is now live. You will be redirected to the home page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45a049" },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateEventPage;
