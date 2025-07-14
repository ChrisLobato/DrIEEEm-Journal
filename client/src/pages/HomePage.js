import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';


import MenuIcon from '@mui/icons-material/Menu';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const drawerWidth = 240;

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [entryText, setEntryText] = useState('');

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNewEntry = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleEntrySubmit = () => {
    // TODO: send `entryText` and `selectedDate` to backend
    console.log(`Saving entry for ${selectedDate.format('YYYY-MM-DD')}:`, entryText);
    setModalOpen(false);
    setEntryText('');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DrIEEEm Journal Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }} open={drawerOpen}>
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Planner" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Entries" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Stats" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Planner</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar date={selectedDate} onChange={setSelectedDate} />
              </LocalizationProvider>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleNewEntry}>
                + New Entry
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Recent Entries</Typography>
              {/* Replace with dynamic list */}
              <Box mt={2}>
                <Typography variant="body2">July 1: "Had a great day learning React..."</Typography>
                <Typography variant="body2">June 30: "Felt tired, but accomplished some goals."</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Modal for Entry */}
      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
        <DialogTitle>New Journal Entry</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Date: {selectedDate.format('MMMM D, YYYY')}
          </Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            placeholder="Write your thoughts..."
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleEntrySubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
