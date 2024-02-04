import { AppContext } from "../AppContext";
import { useContext, useState } from "react";
import Banner from "./Banner";
import { Button, Grid, Typography, Box, Modal, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
axios.defaults.withCredentials = true;

export default function HomePage() {
    const { setIsLoggedIn, setActivePage, currentUser, setCurrentUser } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
const handleUpdateTitle = (event) => {
    setTitle(event.target.value)
}
const handleUpdateDescription = (event) => {
    setDescription(event.target.value)
}
const handleUpdateLanguage = (event) => {
    setLanguage(event.target.value)
}
function handleSubmit(){
    let journalToAdd = {
        username: currentUser,
        title: title,
        description: description,
        language: language,
    }

    axios.post('http://localhost:8000/journals',journalToAdd)
    .then(res => {
        console.log(res);
    })

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

    function JournalModal(){
        return(
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Journal
          </Typography>
          <TextField id="filled-Title" label="Title" variant="filled" onChange={handleUpdateTitle}/>
            <br/>
          <TextField id="filled-Description" label="Description" variant="filled" onChange={handleUpdateDescription}/>
          <TextField id="filled-Language" label="Language" variant="filled" onChange={handleUpdateLanguage} />
          <Button onClick={handleSubmit}>
            <Typography> Submit </Typography>
        </Button>
          
        </Box>
        
        
      </Modal>);

    }

    return (
        <>
            <Banner />
            <Grid justify="center" alignItems="center">
                <Typography variant="h6" color="inherit" noWrap>
                    My Journals
                </Typography>
                <Button onClick={handleOpen}>
                    <AddIcon/>
                </Button>
                <JournalModal/>

            </Grid>


        </>

    );
}