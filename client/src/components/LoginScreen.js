import * as React from 'react';
//import yourImage from 'C:\Users\조은아\Downloads\dreamSpider.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import ErrorMsg from './ErrorMsg.js';
import { AppContext } from '../AppContext.js';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

axios.defaults.withCredentials = true;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {
  const {setActivePage,setIsLoggedIn,setCurrentUser} = React.useContext(AppContext);
  const [loginUsernameError,setLoginUsernameError] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [errorOpen, setErrorOpen] = React.useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Http Request
    axios.post("http://localhost:8000/loginUser",{
        username: data.get('email'),
        password: data.get('password'),
        email: data.get('email')
      }).then((res)=> {
        if(res.status === 200){
          console.log("Finished submitting")
          setIsLoggedIn(true);
          setErrorMsg("");
          setErrorOpen(false);
          setActivePage("HomePage");
          setCurrentUser(res.data);
        }
        else{
          console.log("failed Login put some kind of error here like with useState similar to old askquestion errors")
        }
      }
      ).catch((err)=>{
        if(err.response.status === 400){
          setErrorMsg(err.response.data.ErrorMsg);
          setErrorOpen(true);
        }
      });
    };
    

  function handleContinueAsGuest(){
    setActivePage("HomePage");
  }
  function handleSwitchToRegister(){
    axios.post("http://localhost:8000/journals/" + "65bf10a62c68adcc8ae1c8f1",{
      Text: "New Entry",
      Hours: 2
    })
    setActivePage("SignUp");

  }

  function handleContinueAsGuest(){
    setActivePage("UsernameScreen");
  }

  return (
    //<ThemeProvider theme={defaultTheme}>
    <Container component="main" sx={{
    width: '100%',
    height: '100vh', 
    backgroundColor: '#2a3e83', 
  }}>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              //style={{color:'white'}}
              InputProps={{style:{borderColor: 'white',color:'white'}}}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white', 
                },
                '& .MuiInputLabel-root': {
                  color: 'white', 
                },
              }}
              variant="outlined"
            />
            {loginUsernameError? <p>{loginUsernameError}</p> :<></>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{style:{color:'white'}}}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white', 
                },
                '& .MuiInputLabel-root': {
                  color: 'white', 
                },
              }}
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                  <Link component= "button" variant="body2" onClick={handleContinueAsGuest}>
                    {"Login as a Guest"}
                  </Link>
                </Grid>
              <Grid item>
              <Link component= "button" variant="body2" onClick={handleSwitchToRegister}>
                    {"Don't have an account? Sign Up"}
                  </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />

        <img
          src={process.env.PUBLIC_URL + '/mountain.png'}
          alt="Mountain"
          style={{
            width: '500px', // Set the desired width
            height: 'auto', // Maintain aspect ratio
            position: 'absolute', // Set the position to absolute
            bottom: '0', // Position it at the bottom
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Adjust horizontal centering
          }}
          />

      </Container>
    //</ThemeProvider>
  );
}


