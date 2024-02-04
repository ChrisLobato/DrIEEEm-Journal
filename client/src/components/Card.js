import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const theme = createTheme({
  typography: {
    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  },
});

const card = (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <CardContent sx={{ backgroundColor: '#2e3a83', color: 'white' }}>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          Date
        </Typography>
        <Typography variant="h3" component="div">
          Journal Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          description
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 'auto' }}>
            <Typography variant="body2" style={{ color: 'white' }}>
              language
            </Typography>
          </div>
          <CardActions>
            <Button size="small" style={{ color: 'white' }}>Read</Button>
          </CardActions>
        </div>
      </CardContent>
    </React.Fragment>
  </ThemeProvider>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined" sx={{ width: 600, height: 200, borderColor: 'yellow', borderWidth: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
        {card}
      </Card>
    </Box>
  );
}
