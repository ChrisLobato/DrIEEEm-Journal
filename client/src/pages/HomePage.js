import { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
  DialogActions,
  ListItemButton
} from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import axios from 'axios';
import { AppContext } from '../AppContext';
axios.defaults.withCredentials = true;
const drawerWidth = 240;

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [entryText, setEntryText] = useState('');
  const [entries, setEntries] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext)

  useEffect(()=>{
    //possible alternative is to decouple into 2 useEffects where second one depends on currentUser being updated
    const fetchData = async () =>{
      const userLoggedIn = await axios.get("http://localhost:8000/api/auth/loggedIn")
      const {email, username} = userLoggedIn.data;
      setCurrentUser({email, username})
      await axios.get("http://localhost:8000/api/journal/entries/" + email)
      .then((res) =>{
        const userEntries = res.data.userEntries;
        setEntries(userEntries); 
      });
    }
    fetchData();
  },[]);



  const handleNewEntry = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleEntrySubmit = () => {
    // TODO: send `entryText` and `selectedDate` to backend
    try{
      axios.post("http://localhost:8000/api/journal/entry/" + currentUser.email,{
        text: entryText,
      }).then((res) => {setEntries(res.data.entries)});
    }catch (err) {
      console.log("problem sending request " + err)
    }
    console.log(`Saving entry for ${selectedDate.format('YYYY-MM-DD')}:`, entryText);
    setModalOpen(false);
    setEntryText('');
  };
  //function to crudely generate a list of typography components that display the most recent entries
  function generateListOfEntries(){
    return(
      entries.map((entry) =>{
        const entryDate = new Date(entry.createdAt);
        const formattedDate = entryDate.toDateString();
        return(
          <Typography key = {entryDate}>
          {formattedDate}: {entry.text}
        </Typography>
        );
      })
    );
  } 
  //TODO function to render days on the calendar with icons depending on if they have been filled out
  function ServerDay(props) {

    //check if current day is in the days that a entry was written
    

    //return badge
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            DrIEEEm Journal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer variant="permanent" sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }} open={true}>
        <Toolbar />
        <List>
          <ListItem >
            <ListItemButton>
              <ListItemText primary="Planner" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Entries" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Stats" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid size = {{xs: 12, sm:6}}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Planner</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* Can add an MUI badge to a custom component for the calendar days*/}
                <DateCalendar value= {selectedDate} onChange={setSelectedDate} />
              </LocalizationProvider>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleNewEntry}>
                + New Entry
              </Button>
            </Paper>
          </Grid>

          <Grid size = {{xs: 12, sm:6}}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Recent Entries</Typography>
              {/* Replace with dynamic list */}
              <Box mt={2}>
                {generateListOfEntries()}
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
