import React from 'react'
import { Box, Typography, IconButton} from '@mui/material'
import { Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from '@mui/lab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const style = {
    root:{
        height: "100%",
        width: "95%",
        padding: "1rem",
        borderRadius: "20px",
        backgroundColor: "#2a263e"
    }
}


const History = ({hitem}) => {

  console.log(hitem)

  return (
    <Box sx={{...style.root}}>
        <Box style={{display: "flex", alignItems: "center"}}>   
            <Typography variant='h5' style={{color: "#bdbacc", marginRight: "auto", fontWeight: "700"}}>History</Typography>
            <MoreVertIcon sx={{color: "#fff"}} />
        </Box>
        <Box style={{alignItems: "left"}}>
        <Timeline
            sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.7,
            },
            margin: "2rem 0"
            }}
        >
        {
            hitem && hitem.map((e) => {
                
                let date = e.data.date.seconds
                var t = new Date(null);
                t.setTime(date * 1000);
                t = t.toLocaleString()

                return (
                <TimelineItem>
                    <TimelineOppositeContent color="textSecondary" style={{color: "#7f7b92"}}>
                        <Typography variant="subtitle2" sx={{fontWeight: "700"}}>{e.data.location}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot sx={{padding: "0.7rem", backgroundColor: "#b845de"}} />
                        <TimelineConnector sx={{width: "5px",height: "4rem", backgroundColor: "#623e7b"}} />
                    </TimelineSeparator>
                    <TimelineContent style={{color: "#7f7b92" }}>
                        <h4>{t}</h4>
                    </TimelineContent>
                </TimelineItem>
                )
            })
        }
        </Timeline>        
        </Box>
    </Box>
  )
}

export default History