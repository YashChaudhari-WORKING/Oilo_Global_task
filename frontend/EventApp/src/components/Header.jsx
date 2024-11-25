import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); 
  const isSmallScreen = useMediaQuery('(max-width:600px)'); 


  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
  
    setLoggedIn(false);
    localStorage.removeItem('token'); 
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        borderRadius: '8px',
        padding: '0 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
        backdropFilter: 'blur(10px)',
        marginTop:'8px',
        marginLeft:'15px',
        
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
   
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://t3.ftcdn.net/jpg/04/75/78/54/240_F_475785478_r4vZ4DydgWeyFtqzPqkdndONspyNYenO.jpg"
            alt="Logo"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '100%',
              marginRight: '10px',
              animation: 'spin 3s infinite linear',
            }}
          />
          <Typography variant="h6" sx={{ color: '#333' }}> 
            Events
          </Typography>
        </Box>

        
        {isSmallScreen ? (
          <>
      
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton component={Link} to="/" text="Home" />
            {loggedIn ? (
              <>
                <StyledButton component={Link} to="/DashBoard" text="DashBoard" />
                <StyledButton component={Link} to="/Notificationpage" text="Notification" />
                <StyledButton component={Link} to="/CreateEvent" text="Create Event" />
                <StyledButton onClick={handleLogout} text="Logout" />
              </>
            ) : (
              <StyledButton component={Link} to="/login" text="Login" />
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button component={Link} to="/" onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            {!loggedIn && (
              <ListItem button component={Link} to="/login" onClick={() => toggleDrawer(false)}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
            {loggedIn && (
              <>
                <ListItem button component={Link} to="/DashBoard" onClick={() => toggleDrawer(false)}>
                  <ListItemText primary="DashBoard" />
                </ListItem>
                <ListItem button component={Link} to="/CreateEvent" onClick={() => toggleDrawer(false)}>
                  <ListItemText primary="Create Event" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
                <ListItem button component={Link} to="/Notificationpage" onClick={() => toggleDrawer(false)}>
                  <ListItemText primary="Notification" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

function StyledButton({ component, to, onClick, text }) {
  return (
    <Button
      color="inherit"
      component={component}
      to={to}
      onClick={onClick}
      sx={{
        marginLeft: '20px',
        borderRadius: '30px',
        padding: '8px 20px',
        border: '2px solid transparent',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        backgroundColor: '#1565c0', 
        color: '#fff', 
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: '#ffffff33', 
          transition: 'left 0.3s ease',
          zIndex: -1,
        },
        '&:hover': {
          borderColor: '#ffffff', 
          backgroundColor: '#005bb5', 
          '&::before': {
            left: 0,
          },
        },
      }}
    >
      {text}
    </Button>
  );
}

export default Header;
