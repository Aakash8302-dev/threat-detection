import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Typography, Toolbar, IconButton, AppBar } from '@mui/material';
import { Menu as MenuIcon } from "@mui/icons-material"
import RecommendIcon from '@mui/icons-material/Recommend';
import WarningIcon from '@mui/icons-material/Warning';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { useLocation } from 'react-router-dom';



export default function SwipeableTemporaryDrawer() {

  const location = useLocation()

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

          <ListItem key={"Alerts"} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText primary={"Alerts"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Approved"} disablePadding>
            <ListItemButton onClick={() => navigate('/approved')}>
              <ListItemIcon>
                <RecommendIcon />
              </ListItemIcon>
              <ListItemText primary={"Approved"} />
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


const classes = {
  header: {
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center"
  }
}

let {pathname} = location

  return (
    <>
      {
        pathname === "/login" ? <>
          {/* <Box>
          <AppBar position="static" >
            <Toolbar sx={{...classes.header}}>
              <Typography variant="h6">
                THREAT DETECTION
              </Typography>
            </Toolbar>
          </AppBar>
        </Box> */}
        
        </> :
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" >
            <Toolbar sx={{...classes.header}}>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer("left", true)}
              >
                <BlurOnIcon style={{color:"#fff"}} />
              </IconButton>
              <Typography variant="h6" >
                THREAT DETECTION
              </Typography>
            </Toolbar>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
            </SwipeableDrawer>
          </AppBar>
        </Box>
      }
    </>
    
  );
}