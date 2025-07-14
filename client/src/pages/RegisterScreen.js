import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from "axios";
import ErrorMsg from '../components/ErrorMsg';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


export default function SignUp() {
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try{
        axios.post("http://localhost:8000/api/auth/register",{
        username: data.get('username'),
        password: data.get('password'),
        email: data.get('email')
      }).then((res)=> {
        if(res.data.message === "success"){
          setErrorMsg("")
          handleSwitchToLogin();
        }
      }).catch((err) =>{
        if(err.response.status === 400){
          setErrorMsg(err.response.data.ErrorMsg);
          setErrorOpen(true);
        }
      });
      } catch (err) {
      setErrorMsg("Server error. Try again.");
    } finally {
      // setloading
    }
      

    };

    function handleSwitchToLogin(){
      navigate("/login");
    }
  
    return (
      <Container
      component="main"
      maxWidth="xs"
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        backgroundImage: `url(${process.env.PUBLIC_URL}/backgrnd.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'linear-gradient(45deg, #7b84e8 0%, #0714a8 100%)',
      }}
    >
         
          <ErrorMsg errorOpen={errorOpen} errorMsg={errorMsg} setErrorOpen={setErrorOpen}/>
          
          <CssBaseline />

          


          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    
                    //css part bellow
                    InputProps={{style:{borderColor: 'white',color:'white'}}}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                  borderRadius: '20px',
                  borderWidth: '2px', 
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address/Account Name"
                    name="email"
                    autoComplete="email"

                    InputProps={{style:{borderColor: 'white',color:'white'}}}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                  borderRadius: '20px',
                  borderWidth: '2px',
              
                  
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"

                  //css part 
                  InputProps={{style:{borderColor: 'white',color:'white'}}}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                  borderRadius: '20px',
                  borderWidth: '2px',
                 
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component= "button" variant="body2" onClick={handleSwitchToLogin}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    );
  }