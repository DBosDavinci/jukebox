import * as React from 'react';
import {Typography, Toolbar, Box, AppBar, Button, IconButton} from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src='/images/Jukebox.png'/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jukebox
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}