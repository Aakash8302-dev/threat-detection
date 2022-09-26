import React, { useEffect, useState } from 'react'
import db from '../firebase'
import {Link} from 'react-router-dom'
import { Container,Typography, Box } from '@mui/material'
import ThreatCard from '../components/ThreatCard'
import Loader from '../components/Loader'

const classes = {
    root:{
        padding: "2rem 1rem",
    },
    link:{
        textDecoration: "none"
    }
}

const HomeScreen = () => {

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
        getData()
    },[])
    
    const [data, setData] = useState()
 
  return (
    <Container sx={{...classes.root}}>
        <Typography variant='h5' style={{fontWeight: "bold"}}>Recent Alerts</Typography>
        {
            data && data ? 
            <Box>
            {
                data.map((e, index) => (
                        <Link to={`/threat/${e.id}`} style={{textDecoration: "none", color: "#000"}}>
                             <ThreatCard key={index} index={index} date={e.data.date.seconds}  faces={e.data.faces} location={e.data.location} image={e.data.image}  />
                        </Link>
                    )
                )
            }
        </Box> 
        : <Loader />
        }
    </Container>
  )
}

export default HomeScreen