import React from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import DangerousIcon from '@mui/icons-material/Dangerous';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const classes = {
    root: {
        width: "13rem",
        height: "13rem",
        borderRadius: "1rem",
        margin: "1rem 0",
        padding: "1rem",
    },
    miniCard:{
        width: "10rem",
        height: "4.5rem",
        borderRadius: "1rem",
        backgroundColor: "#1d1931",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px 30px"
    },
    header:{
        display: "flex"
    },
    main:{
        padding: "0.4rem 0"
    },
    approveIcon: {
        marginLeft: "auto"
    },
    sec1:{
        height: "60%"
    },  
    sec2:{
        height: "40%"
    }
}

const ThreatCard = ({location, date, index, icon, latitude, longitude}) => {

    var t = new Date(null);
    t.setTime(date * 1000);
    t = t.toLocaleString()

  const colors = ["#e1e9f7", "#ffefe2" , "#e6f5f9"]

  return (
    <Box sx={{...classes.root , backgroundColor:"#2a263e" }} >
        <Box sx={{...classes.sec1}}>
            <Typography variant="h5" sx={{color: "#c356cb", fontWeight: "700"}}>{location}</Typography>
            <Typography variant="h6" sx={{margin: "8px", color: "#bdbacc"}}>{t}</Typography>
        </Box>
        <Box sx={{...classes.sec2}}>
            <Box sx={{...classes.miniCard}}>
                <Typography variant='subtitle2' style={{color: "#bdbacc", fontSize: "1.2rem"}}>X: {latitude}</Typography>
                <Typography variant='subtitle2' style={{color: "#bdbacc", fontSize: "1.2rem"}}>Y: {longitude}</Typography>
            </Box>
        </Box>
    </Box>
  )
}


{/* <Box sx={{...classes.header}}>
            <Typography variant='h6' style={{fontWeight: "bold", fontSize: "1rem"}}>{location}</Typography>
            {icon}
        </Box>
        <Box sx={{...classes.main}}>
            <Typography variant='subtitle1'><span style={{fontWeight: "bold"}}>Time:</span> {t}</Typography>
        </Box>
        <Box sx={{...classes.footer}}>
            <IconButton style={{color: "rgb(90 164 90)"}}>
                
            </IconButton>
</Box> */}


export default ThreatCard