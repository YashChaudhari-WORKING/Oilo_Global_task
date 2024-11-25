import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';
const API_EURL = 'http://localhost:5000/api/events';
const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; 
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;  
  } catch (error) {
    console.error('Signup failed:', error);
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};


export const fetchEvents = async (token) => {
    try {
      const response = await axios.get(API_EURL, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  };

  export const rsvpEvent = async (eventId, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/rsvp`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };


  export const fetchEventDetails = async (eventId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch event details.");
    }
  
    return response.json();
  };


  export const createEvent = async (eventData, token) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/events/create`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      return { success: false, message: error.message };
    }
  };


  export const getUsers = async (jwtToken) => {
    try {
      const response = await axios.get(`${API_URL}/gets`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  };


  export const getcreatedevent = async (jwtToken) => {
    try {
      const response = await axios.get(`${API_URL}/getcE`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  };


export const deleteEvent = async (eventId, jwtToken) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/events/delete/${eventId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error deleting event:', error.response?.data || error.message);
    throw error; 
  }
};