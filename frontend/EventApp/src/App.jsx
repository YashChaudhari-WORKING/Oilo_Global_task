import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './Pages/LoginPage'; 
import SignupPage from './Pages/SignupPage'; 
import Home from './Pages/Home';
import Details from './Pages/EventDetails';
import CreateEvent from './Pages/CreateEventPage';    
import Dashboard from './Pages/DashboardPage'; 
import Update from './Pages/update'; 
import Invite from './Pages/invite'; 
import Notification from './Pages/Notificationpage'
import { Container } from '@mui/material';

const App = () => {

  return (
    <Router>
      <Header  />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/events/:eventId" element={<Details />} />
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-event" element={<Update />} />
          <Route path="/invite/:eventid" element={<Invite />} />
          <Route path="/notificationpage" element={<Notification />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
