import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import { Dialog } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from '../AppContext';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  },
});

export default function JournalScreen() {
  const {activeJournal, currentUser,setActivePage} = React.useContext(AppContext);
  const {dreams,dateCreated, title} = activeJournal;
  const [currentIndex,setCurrentIndex] = React.useState(0);
  const [dreamsToDisplay,setDreamsToDisplay] = React.useState([...dreams].reverse());
  const [currentText, setCurrentText] = React.useState("")
  // const [adding,setAdding] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleUpdateDream =(event)=>{
    setCurrentText(event.target.value);
  }

  function handleSubmit(someText){
    axios.post('http://localhost:8000/journals/'+ activeJournal._id,{Text: someText})
    .then( res =>{
      setDreamsToDisplay([...res.data])
      // setAdding(true);
      setActivePage('JournalPage');
    }

    )
  }

  function handleAdd(){
    setCurrentText("");
    setCurrentIndex(0);
    // setAdding(true);
  }
  function handleArrow(){
    // setAdding(false)
  }

  function DreamModal(){
    return (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                // const email = formJson.email;

                handleSubmit(formJson.text);
                
                // console.log(email);
                handleClose();
              },
            }}
          >
            <DialogTitle>Create Journal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the appropriate fields for the Dream
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="text"
                name="text"
                label="text"
                fullWidth
                variant="standard"
                multiline
            rows={10}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: '#2e3a83',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#2e3a83',
            color: 'white',
            width: '70%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px',
          }}
        >
          <Typography variant="h3" 
          gutterBottom style={{ color: 'white' }}>{dateCreated}</Typography>
          <Typography variant="h5" 
          gutterBottom style={{ color: 'white' }}>{title}</Typography>
       
        
          <Typography
            fullWidth
            label="Write Journal"
            id="fullWidth"
            multiline
            rows={20}
            defaultValue={""}
            onChange={handleUpdateDream}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: { color: 'white' },
            }}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiOutlinedInput-input': {
                color: 'white',
                lineHeight: '1.5em',
              },
              '& .MuiOutlinedInput-root': {
                borderColor: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
          > {dreamsToDisplay[currentIndex].Text} </Typography>

        </Box>
        <DreamModal/>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
            padding: '20px',
          }}
        >
          <Button variant="contained" sx={{ backgroundColor: 'yellow', color: 'black' }}
          >Image Generator</Button>
          <Button variant="contained" sx={{ backgroundColor: 'yellow', color: 'black' }}
          >Dream Interpretation</Button>

          <IconButton id="leftArrow" style={{ color: 'white', fontSize: '40px', marginRight: '10px' }}>
            <ArrowBackIcon/>
          </IconButton>

          <IconButton id="rightArrow" style={{ color: 'white', fontSize: '40px', marginRight: '70px' }}>
            <ArrowForwardIcon/>
          </IconButton>
          
          <Button variant="outlined" onClick={handleClickOpen} sx={{ color: 'white', borderColor: 'yellow' }}>
            Add
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}
