import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';


const theme = createTheme({
  typography: {
    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  },
});

export default function OutlinedCard() {
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
          gutterBottom style={{ color: 'white' }}>Date</Typography>
          <Typography variant="h5" 
          gutterBottom style={{ color: 'white' }}>Enter Your Journal:</Typography>
          
          {/* {Array(20).fill('').map((_, index) => (
            <hr key={index} style={{ width: '100%', borderTop: '1px solid white' }} />
          ))} */}
        
          <TextField
            fullWidth
            label="Write Journal"
            id="fullWidth"
            multiline
            rows={20}
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
            defaultValue={Array(20).fill('\n').join('')}
          />

        </Box>
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

          <Button variant="outlined" sx={{ color: 'white', borderColor: 'yellow' }}>
            Add
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}
