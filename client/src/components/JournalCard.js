import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppContext } from '../AppContext';

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
// const card = (
  
// );

export default function OutlinedCard({aJournal}) {
  const {title, description, dreams, dateCreated, language} = aJournal;
  const {setActiveJournal,setActivePage} = React.useContext(AppContext);

  function handleClick(){
    setActiveJournal(aJournal);
    setActivePage("JournalPage");
    
  }
  
  function formatDate(date){
    let aDate = new Date(date);
    let MonthMap = { 0:"Jan", 1:"Feb", 2:"Mar", 3: "Apr", 4:"May", 5:"Jun", 6:"Jul", 7: "Aug", 8:"Sep", 9:"Oct", 10: "Nov", 11: "Dec"};

    return MonthMap[aDate.getMonth()] + " " + aDate.getDate() + ", " + aDate.getFullYear();
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '41vh' }}>
      <Card variant="outlined" sx={{ width: 600, height: 200, borderColor: 'yellow', borderWidth: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
      <ThemeProvider theme={theme}>
    <React.Fragment>
      <CardContent sx={{ backgroundColor: '#2e3a83', color: 'white' }}>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {formatDate(dateCreated)}
        </Typography>
        <Typography variant="h3" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          {description}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 'auto' }}>
            <Typography variant="body2" style={{ color: 'white' }}>
              {language}
            </Typography>
          </div>
          <CardActions>
            <Button size="small" style={{ color: 'white' }} onClick={handleClick}>Read</Button>
          </CardActions>
        </div>
      </CardContent>
    </React.Fragment>
  </ThemeProvider>
      </Card>
    </Box>
  );
}
