import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';

export default function Banner() {
// Navbar 
  return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
          <Typography variant="h6" noWrap>
          Dream Journal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Logout</Button>
      </Toolbar>
      </AppBar>
  );
}