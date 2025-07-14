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
import Modal from '@mui/material/Modal';
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
  const [openModal, setModalOpen] = React.useState(false);
  const [modalText,setModalText] = React.useState("")
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
  function formatDate(date){
    let aDate = new Date(date);
    let MonthMap = { 0:"Jan", 1:"Feb", 2:"Mar", 3: "Apr", 4:"May", 5:"Jun", 6:"Jul", 7: "Aug", 8:"Sep", 9:"Oct", 10: "Nov", 11: "Dec"};

    return MonthMap[aDate.getMonth()] + " " + aDate.getDate() + ", " + aDate.getFullYear();
  }

  //
  const [openModalImg, setModalImgOpen] = React.useState(false);
  const [modalSrc,setModalSrc] = React.useState("")
    const handleImgModalOpen = () => setModalImgOpen(true);
    const handleImgModalClose = () => setModalImgOpen(false);
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
      setDreamsToDisplay([...res.data].reverse())
      // setAdding(true);
      setActivePage('JournalPage');
    }

    )
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function BasicModal() {
  
    return (
      <div>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Interpretation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalText}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  function ImageModal() {
  
    return (
      <div>
        <Modal
          open={openModalImg}
          onClose={handleImgModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Image of Dream
            </Typography>
            <img src={modalSrc}></img>
          </Box>
        </Modal>
      </div>
    );
  }

    function handleRightArrow(){
    if(currentIndex < dreamsToDisplay.length-1){
        setCurrentIndex(currentIndex+1);
    }
  }

  function handleLeftArrow(){
    if(currentIndex > 0){
        setCurrentIndex(currentIndex - 1);
    }
  }

  function handleDreamInterpretation(){

    axios.post("http://localhost:8000/journals/Interpretation",{text: dreamsToDisplay[currentIndex].Text})
    .then( res =>{
      console.log(res.data);
      setModalText(res.data.data);
      handleModalOpen();
    })
  }

  function handleDreamImage(){

    axios.post("http://localhost:8000/journals/Image",{text: dreamsToDisplay[currentIndex].Text})
    .then( res =>{
      console.log(res.data);
      setModalSrc(res.data.data);
      handleImgModalOpen();
    })
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
            <DialogTitle>Create Dream Entry</DialogTitle>
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
          gutterBottom style={{ color: 'white' }}>{formatDate(dateCreated)}</Typography>
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
          > {dreamsToDisplay.length ? dreamsToDisplay[currentIndex].Text : ""} </Typography>

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
          <Button variant="contained" onClick={handleDreamImage} sx={{ backgroundColor: 'yellow', color: 'black' }}
          >Image Generator</Button>
          <Button variant="contained" onClick={handleDreamInterpretation} sx={{ backgroundColor: 'yellow', color: 'black' }}
          >Dream Interpretation</Button>
          <BasicModal/>
          <ImageModal/>
          <IconButton id="leftArrow" onClick={handleLeftArrow}
          style={{ color: 'white', fontSize: '40px', marginRight: '10px' }}>
            <ArrowBackIcon/>
          </IconButton>

          <IconButton id="rightArrow" onClick={handleRightArrow}
          style={{ color: 'white', fontSize: '40px', marginRight: '70px' }}>
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