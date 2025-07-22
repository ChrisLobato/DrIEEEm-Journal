import { 
    Box,
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    CardHeader, 
    Toolbar,
    Typography,
    Button,
    CardActionArea
} from "@mui/material"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { AppContext } from "../AppContext";
axios.defaults.withCredentials = true;


export default function EntriesPage(){
    const [entries, setEntries] = useState([]);
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const [dialogText, setDialogText] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const descriptionElementRef = useRef(null);
    
    useEffect(() => {
        async function fetchData(){
            if(!currentUser){
                const userLoggedIn = await axios.get("http://localhost:8000/api/auth/loggedIn")
                const {email, username} = userLoggedIn.data;
                setCurrentUser({email,username});
                await axios.get("http://localhost:8000/api/journal/entries/" + email)
                .then((res) =>{
                    setEntries(res.data.userEntries);
                });
            }
            else{
                await axios.get("http://localhost:8000/api/journal/entries/" + currentUser.email)
                .then((res) =>{
                    setEntries(res.data.userEntries);
                });
            }
        }
        fetchData();
    },[]);

    useEffect(()=>{
        if(dialogOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [dialogOpen]);


    const handleClickOpen = (text,title) => () => {
        setDialogText(text);
        setDialogTitle(title)
        setDialogOpen(true);
        // setScroll('paper');
    }
    const handleClose = () => {
        setDialogOpen(false);
    }

    function generateEntryCards(){
        return(
            entries.map((entry) =>{
                const createdAtDayjs = dayjs(entry.createdAt).format('MMMM D, YYYY')
                return(
                <Grid size = {{xs: 12, sm: 6, md: 4}} key = {entry.createdAt}>
                    <Card>
                        <CardActionArea onClick={handleClickOpen(entry.text, createdAtDayjs)}>                        
                            {/* Unusued components for now but plan to implement image generation which will take up this space */}
                            <CardHeader title= {createdAtDayjs}/>
                            {/* <CardMedia/> */}
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {entry.text.slice(0,50) + "..."}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                );
            })
        );
          
    }

    return(
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar/>
                <Grid container spacing={4} columns={12}>
                    {generateEntryCards()}
                </Grid>
            </Box>
            <>
                <Dialog
                    open = {dialogOpen}
                    onClose={handleClose}
                    scroll= {"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle> {dialogTitle} </DialogTitle>
                    <DialogContent dividers = { true }>
                        <DialogContentText
                            id = "scroll-dialog-description"
                            ref = {descriptionElementRef}
                            tabIndex = {-1}
                        >
                            {dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}> Close </Button>
                        <Button onClick={handleClose}> Edit </Button>
                    </DialogActions>
                </Dialog>
            </>
        </>
    )

}