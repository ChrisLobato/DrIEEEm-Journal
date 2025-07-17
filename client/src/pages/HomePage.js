import { useContext, useEffect, useState, useRef } from 'react';
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
  ListItemButton,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import CreateIcon from '@mui/icons-material/Create';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import dayjs from 'dayjs';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
axios.defaults.withCredentials = true;
const drawerWidth = 240;

export default function HomePage() {
  const requestAbortController = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [entryText, setEntryText] = useState('');
  const [entries, setEntries] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); //TODO add for some conditional rendering of modal

  useEffect(()=>{
    //possible alternative is to decouple into 2 useEffects where second one depends on currentUser being updated
    const fetchData = async () =>{
      const userLoggedIn = await axios.get("http://localhost:8000/api/auth/loggedIn")
      const {email, username} = userLoggedIn.data;
      setCurrentUser({email, username})
      fetchHighlightedDays(selectedDate,email);
    }
    fetchData();
  },[]);



  const handleNewEntry = () => {
    //triggered when someone clicks the new Entry button
    //TODO input old text in there if there is text
    const selectedEntry = entries.find((entry) =>{
      const formattedDate = dayjs(entry.createdAt);
      //use dayjs.isSame() to compare?
      if (formattedDate.date() === selectedDate.date()){
        return entry
      }
      return null;
    });
    if (selectedEntry)
      setEntryText(selectedEntry.text);
      setIsEditing(true);
      setModalOpen(true);
  }
  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEntryText("");
  };
  const handleEntrySubmit = () => {
    // TODO: send `entryText` and `selectedDate` to backend
    try{
      axios.post("http://localhost:8000/api/journal/entry/" + currentUser.email,{
        text: entryText,
        date: selectedDate.$d
      }).then((res) => {fetchHighlightedDays(selectedDate,currentUser.email)});
    }catch (err) {
      // console.log("problem sending request " + err)
    }
    // console.log(`Saving entry for ${selectedDate.format('YYYY-MM-DD')}:`, entryText);
    setModalOpen(false);
    setIsEditing(false);
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

  async function fetchEntriesByMonth(date, email, { signal }) {
    //get the year and month selected
    const year = date.year();
    const month = date.month() + 1; //dayjs months 0 indexed

    const entriesQuery = await axios.get("http://localhost:8000/api/journal/entriesbymonth/" + email,{
      params: {
        year: year,
        month: month 
      }
    });

    return entriesQuery.data.userEntriesByMonth;
  }

  const fetchHighlightedDays = (date, email) =>{
    //TODO Add abort controller to avoid too many quick queries if user swaps between the months quickly

    const controller = new AbortController(); //to help stop too many quick requests since switching month will send a new request for journal entries
    fetchEntriesByMonth(date, email, {signal: controller.signal})
    .then((entries)=>{

      const mappedEntries = entries.map((entry) =>{
        return dayjs(entry.createdAt).date(); //creates the dayjs object and then gets the day number these remove a day likely because 0 indexed
      });
      setEntries(entries);
      setHighlightedDays(mappedEntries);
      setIsLoading(false);
    })
    .catch((err) =>{ 
      if (err.name!== 'AbortError'){
        throw err;
      }
    });


    requestAbortController.current = controller
  }

  //TODO function to render days on the calendar with icons depending on if they have been filled out
  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

    //check if current day is in the days that a entry was written
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    //return badge
    return (
      <Badge
        key = {props.day.toString()}
        overlap = "circular"
        badgeContent = {isSelected ? '🌚' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth = {outsideCurrentMonth} day = {day}/>
      </Badge>
    )
  }
  
  const handleMonthChange = (date) =>{
    if(requestAbortController.current){
      //abort a useless request
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date,currentUser.email);
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
                <DateCalendar 
                  value= {selectedDate} 
                  loading = {isLoading}
                  shouldDisableDate={(day) => day.isAfter(dayjs())}
                  onChange={setSelectedDate}
                  onMonthChange={handleMonthChange}
                  renderLoading={()=> <DayCalendarSkeleton/>} 
                  slots={{day: ServerDay}}
                  slotProps={{day: {highlightedDays}}}
                />
              </LocalizationProvider>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleNewEntry}>
                <CreateIcon/>
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
        <DialogTitle>{isEditing ? "Update Journal Entry " : "New Journal Entry "}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Date: {selectedDate.format('MMMM D, YYYY')}
          </Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            placeholder="Last night I dreamt that..."
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
