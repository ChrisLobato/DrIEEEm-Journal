import { 
    Box,
    Grid, 
    Card, 
    CardContent, 
    // CardMedia,
    Pagination,
    CardHeader, 
    Toolbar,
    Typography,
    Button,
    CardActionArea,
    InputLabel,
    MenuItem,
    Select,
    FormControl
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
import SearchBar from "../components/Searchbar";
import CalendarPicker from "../components/CalendarPickerRange";
axios.defaults.withCredentials = true;


export default function EntriesPage(){
    const [entries, setEntries] = useState([]);
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const [dialogText, setDialogText] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [totalEntries, setTotalEntries] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sort,setSort] = useState("desc");
    const [dateRange, setDateRange] = useState({start: null, end: null});
    const descriptionElementRef = useRef(null);
    
    useEffect(() => {
        async function fetchData(){
            if(!currentUser){
                const userLoggedIn = await axios.get("http://localhost:8000/api/auth/loggedIn")
                const {email, username} = userLoggedIn.data;
                setCurrentUser({email,username});
                await axios.get("http://localhost:8000/api/journal/entries",{
                    params: {
                        email,
                        page:1,
                        limit:9,
                        sort: "desc"
                    }
                })
                .then((res) =>{
                    setTotalEntries(Number(res.data.totalReturned));
                    setEntries(res.data.entries);
                });
            }
            else{
                await axios.get("http://localhost:8000/api/journal/entries/",{
                    params: {
                        email: currentUser.email,
                        page: 1,
                        limit: 9,
                        sort: "desc"
                    }
                })
                .then((res) =>{
                    setTotalEntries(Number(res.data.totalReturned));
                    setEntries(res.data.entries);
                });
            }
        }
        fetchData();
    },[]);

    useEffect(() => {
        //TODO new request to make once user moves to next page
        async function fetchNewPage(){
            await axios.get("http://localhost:8000/api/journal/entries/",{
                    params: {
                        email: currentUser.email,
                        page: currentPage,
                        limit: 9,
                        search:searchText,
                        sort: sort,
                        startDate: dateRange.start,
                        endDate: dateRange.end
                    }
                })
                .then((res) =>{
                    setTotalEntries(Number(res.data.totalReturned));//for page switching might not require updating total count cuz it might cause unneccessary rerender
                    setEntries(res.data.entries);
                });
        }
        fetchNewPage();
    },[currentPage]);

    useEffect(()=>{
        if(dialogOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [dialogOpen]);

    const handleSearch = async () => {
        //TODO insert axios request for getting entries based off the search text
        await axios.get("http://localhost:8000/api/journal/entries/",{
            params: {
                email: currentUser.email,
                page: 1,
                limit: 9,
                search:searchText,
                sort: sort,
                startDate: dateRange.start,
                endDate: dateRange.end
            }
        })
        .then((res) =>{
            setCurrentPage(1);// reset us back to the first page
            setTotalEntries(Number(res.data.totalReturned));
            setEntries(res.data.entries);
        });
    }

    const handlePageSwitch = (event,page) =>{
        setCurrentPage(page);
    }

    const handleClickOpen = (text,title) => () => {
        setDialogText(text);
        setDialogTitle(title)
        setDialogOpen(true);
    }
    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleSortDropDown = (e) =>{
        setSort(e.target.value);
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
                <SearchBar sx = {{p:15}} searchText ={searchText} setSearchText={setSearchText} handleSearch={handleSearch}/>
                <FormControl>
                    <InputLabel id = "sort-by-select-label">Sort by</InputLabel>
                    <Select fullWidth
                    labelId="sort-by-select-label"
                    id="sortby-select"
                    value={sort}
                    label="Sort by"
                    onChange={handleSortDropDown}
                    >
                    <MenuItem value={"desc"}>Oldest</MenuItem>
                    <MenuItem value={"asc"}>Newest</MenuItem>
                    </Select>
                </FormControl>
                <CalendarPicker start={dateRange.start} end = {dateRange.end} setDateRange={setDateRange}/>
                <Grid sx = {{minHeight: 450}} container spacing={3} columns={12} alignItems={"flex-start"}>
                    {generateEntryCards()}
                </Grid>
                <Pagination count={Math.ceil(totalEntries / 9)} color="secondary" onChange={handlePageSwitch}/> 
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