import React from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import DangerousIcon from '@mui/icons-material/Dangerous';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const classes = {
    root: {
        width: "100%",
        height: "fitContent",
        borderRadius: "1rem",
        margin: "1rem 0",
        padding: "1rem"
    },
    header:{
        display: "flex"
    },
    main:{
        padding: "0.4rem 0"
    },
    approveIcon: {
        marginLeft: "auto"
    }
}

const ThreatCard = ({location, date, index, icon}) => {

    var t = new Date(null);
    t.setTime(date * 1000);
    t = t.toLocaleString()

  const colors = ["#e1e9f7", "#ffefe2" , "#e6f5f9"]

  return (
    <Box sx={{...classes.root , backgroundColor: colors[3%(index + 1)] }} >
        <Box sx={{...classes.header}}>
            <Typography variant='h6' style={{fontWeight: "bold", fontSize: "1rem"}}>{location}</Typography>
            {icon}
        </Box>
        <Box sx={{...classes.main}}>
            <Typography variant='subtitle1'><span style={{fontWeight: "bold"}}>Time:</span> {t}</Typography>
        </Box>
        <Box sx={{...classes.footer}}>
            <IconButton style={{color: "rgb(90 164 90)"}}>
                
            </IconButton>
        </Box>
    </Box>
  )
}

export default ThreatCard