import { AppContext } from "../AppContext";
import { useContext, useEffect, useState } from "react";
import Banner from "./Banner";
import { Button, Grid, Typography, Box, Dialog, TextField, Card } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import OutlinedCard from "./JournalCard";
axios.defaults.withCredentials = true;

export default function HomePage() {
    const { setIsLoggedIn, setActivePage, currentUser, setCurrentUser } = useContext(AppContext);
    
    const [listOfJournals, setListOfJournals] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [open, setOpen] = useState(false);
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
const handleClickOpen = () => {
    setOpen(true);
  };
  


useEffect(()=>{
    axios.get('http://localhost:8000/journals/' + currentUser.username)
    .then(res =>{
        setListOfJournals([...res.data])
    });

},[])

function generateCards(){
    return listOfJournals.map(journal =>{
        return(
            <OutlinedCard 
                key = {journal._id + "journal"}
                aJournal = {journal}
            />
        )

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
                    let journalToAdd = {
                        username: currentUser.username,
                        title: formJson.title,
                        description: formJson.description,
                        language: formJson.language,
                    }
                    axios.post('http://localhost:8000/journals',journalToAdd)
                    .then((res) => {
                        setListOfJournals([...res.data]);
                    }
                    )
    .then(res => {
        console.log(res);
    })
                    // console.log(email);
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Create Journal</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the appropriate fields for the Dream Journal
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="language"
                    name="language"
                    label="Language"
                    fullWidth
                    variant="standard"
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
        <>
            <Banner />
            <Grid justify="center" alignItems="center">
                <Typography variant="h6" color="inherit" noWrap>
                    My Journals
                </Typography>
                <Button onClick={handleClickOpen}>
                    <AddIcon/>
                </Button>
                {generateCards()}
                <JournalModal/>

            </Grid>


        </>

    );
}
