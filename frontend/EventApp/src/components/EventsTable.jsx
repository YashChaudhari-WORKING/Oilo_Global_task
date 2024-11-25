import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Button, Typography, Box } from '@mui/material';

const DataTable = ({ data, handleCancelClick }) => (
  <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
    <Typography variant="h6" sx={{ marginBottom: '20px' }}>User Data</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user data table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleCancelClick(item.id)} 
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" align="center">No users available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default DataTable;
