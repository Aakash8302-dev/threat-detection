import React, { useEffect, useState } from 'react'
import db from '../firebase'
import {Link} from 'react-router-dom'
import { Container,Typography, Box, Grid } from '@mui/material'
import ThreatCard from '../components/ThreatCard'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import History from '../components/Home/History'
import ThreatCardScreen from './ThreatCardScreen'
import ThreatScreen from './ThreatScreen'
import PreviousThreatScreen from './PreviousThreatScreen'

const classes = {
    root:{
        padding: "2rem 1rem",
        backgroundColor: "#1d1931",
        height: "95vh"
    },
    link:{
        textDecoration: "none"
    },
    cards:{
        display: "flex",
        padding: "0rem 3rem",
        justifyContent: "space-between"
    }
}

const HomeScreen = () => {

    const currpath = window.location.href;
    var params = currpath.split("?")[1];
    params = params.split("&")

    let screen = params[0] ? params[0].split("=")[1] : null;
    let id = params[1] ? params[1].split("=")[1] : null;

    // let screen = params[0] ? params[0].split("=")[1] : null;
    // let id = params[1] ? params[1].split("=")[1] : null;

    const getData = () => {
        db.collection("Information").onSnapshot((snapshot) => {
          setData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
        );
        });
    }

    useEffect(() => {
        getData();
        
    },[screen, id])
    
    const [data, setData] = useState()

    const renderSwitch = (param) => {
        switch (param) {
            case 'a1':
                return <ThreatCardScreen data={data} />
            case 'a2':
                return <ThreatScreen id={id} />
            case 'a3':
                return <PreviousThreatScreen />
            default:
                return <div>Not Found</div>
        }
    }
 
  return (
    <Box sx={{...classes.root}}>
        <Grid container>
               <Grid item sx={2} md={2} style={{height: "95vh"}}>
                    <Sidebar />           
               </Grid>
               <Grid item sx={8} md={8} style={{height: "95vh"}}>
                    <Box sx={{...classes.cards}}>
                        {
                            renderSwitch(screen)        
                        }
                    </Box>
                    <Box>

                    </Box>
               </Grid>
               <Grid item sx={2} md={2} style={{height: "95vh"}}>
                    <History hitem={data && data ? data : null} />
                </Grid> 
        </Grid>
    </Box>
  )
}

export default HomeScreen




// data.map((e, index) => (
//     <Link to={`/threat/${e.id}`} style={{textDecoration: "none", color: "#000"}}>
//          <ThreatCard key={index} index={index} date={e.data.date.seconds}  faces={e.data.faces} location={e.data.location} image={e.data.image}  />
//     </Link>
// )
// )