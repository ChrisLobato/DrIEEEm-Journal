import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

const drawerWidth = 240;

export default function Sidebar(){
 
    return(
        <Drawer variant="permanent" sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }} open={true}>
        <Toolbar />
        <List>
            <ListItem >
            <ListItemButton>
                <ListItemText primary="Planner ✅" />
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton>
                <ListItemText primary="Entries 📓" />
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton>
                <ListItemText primary="Stats 🧠" />
            </ListItemButton>
            </ListItem>
        </List>
        </Drawer>
    );
}