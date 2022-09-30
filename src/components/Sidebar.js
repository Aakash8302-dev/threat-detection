import React from 'react'
import { useNavigate} from 'react-router-dom';
import {Box, Typography, Grid, Button} from '@mui/material'
import RecommendIcon from '@mui/icons-material/Recommend';
import WarningIcon from '@mui/icons-material/Warning';
import LogoutIcon from '@mui/icons-material/Logout';

const style ={
    root:{
       height: "100%",
       width: "100%",
       padding: "1rem",
       borderRadius: "20px",
       backgroundColor: "#2a263e"
    },
    header:{

    },
    main:{
        margin: "2rem 0"
    }
}

const sideList = [
    {
        title: "Alerts",
        icon: <WarningIcon sx={{fontSize: 30, color: "#7f7b92"}} />
    },
    {
        title: "Approved",
        icon: <RecommendIcon sx={{fontSize: 30, color: "#7f7b92"}} />
    },
    {
        title: "Logout",
        icon: <LogoutIcon sx={{fontSize: 30, color: "#7f7b92"}} />
    }
]

const Sidebar = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{...style.root}}>
        <Box sx={{...style.header}}>
            <Typography variant='h4' style={{color: "#c356cb", fontWeight: "600"}}>AiVision</Typography>
        </Box>
        <Box sx={{...style.main}}>
            <Grid container sx={{margin: "2rem 0"}}>
                <Button onClick={() => {
                            navigate('/home?screen=a1')  
                            window.location.reload() 
                }}>
                <Grid item sx={2} style={{marginRight: "1rem"}}>
                    <WarningIcon sx={{fontSize: 30, color: "#7f7b92"}} />
                </Grid>
                <Grid item sx={2}>
                    <Typography variant='h6' style={{fontWeight: "600",color: "#7f7b92"}}>Alerts</Typography>
                </Grid>
                </Button>
            </Grid>
            <Grid container sx={{margin: "2rem 0"}}>
                <Button onClick={() =>{ 
                            navigate('/home?screen=a3')
                            window.location.reload()  
                        }}>
                <Grid item sx={2} style={{marginRight: "1rem"}}>
                    <RecommendIcon sx={{fontSize: 30, color: "#7f7b92"}} />
                </Grid>
                <Grid item sx={2}>
                    <Typography variant='h6' style={{fontWeight: "600",color: "#7f7b92"}}>Approved</Typography>
                </Grid>
                </Button>
            </Grid>
            <Grid container sx={{margin: "2rem 0"}}>
                <Button onClick={()=> navigate('/')}>
                <Grid item sx={2} style={{marginRight: "1rem"}}>
                    <LogoutIcon sx={{fontSize: 30, color: "#7f7b92"}} />
                </Grid>
                <Grid item sx={2}>
                    <Typography variant='h6' style={{fontWeight: "600",color: "#7f7b92"}}>Logout</Typography>
                </Grid>
                </Button>
            </Grid>
        </Box>
    </Box>
  )
}

export default Sidebar