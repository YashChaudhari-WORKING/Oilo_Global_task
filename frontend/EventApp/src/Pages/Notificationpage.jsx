import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, Button, CircularProgress, Alert } from "@mui/material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/users/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      setNotifications(response.data.notifications);
    } catch (err) {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Notifications
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && notifications.length === 0 && (
        <Typography>No notifications to display.</Typography>
      )}

      {!loading && notifications.length > 0 && (
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification._id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: notification.isRead ? "#f5f5f5" : "#e3f2fd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {notification.message}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {new Date(notification.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.href = `/events/${notification.eventId}`; 
                }}
              >
                View Event
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notifications;
